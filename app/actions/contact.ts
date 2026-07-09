'use server';

import { headers } from 'next/headers';
import { z } from 'zod';

import { createRateLimiter } from '@/lib/rateLimiter';
import { contactFormSchema } from '@/lib/validations/contact';

export interface ContactFormState {
  success: boolean;
  message?: string;
  fieldErrors?: Partial<Record<'nome' | 'email' | 'empresa' | 'assunto' | 'mensagem', string[]>>;
}

// Em memória — reseta a cada deploy/cold start. Aceitável para v1 (ver docs/specs/05-contato.md).
const isContactRateLimited = createRateLimiter({ max: 5, windowMs: 60 * 60 * 1000 });

async function getClientIp(): Promise<string> {
  const headersList = await headers();
  const forwardedFor = headersList.get('x-forwarded-for');
  return forwardedFor?.split(',')[0]?.trim() ?? 'unknown';
}

const GENERIC_ERROR_MESSAGE = 'Não foi possível enviar, tente novamente.';

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const ip = await getClientIp();

  if (isContactRateLimited(ip)) {
    return {
      success: false,
      message: 'Muitas tentativas de envio. Tente novamente em algumas horas.',
    };
  }

  const raw = {
    nome: formData.get('nome')?.toString() ?? '',
    email: formData.get('email')?.toString() ?? '',
    empresa: formData.get('empresa')?.toString() || undefined,
    assunto: formData.get('assunto')?.toString() ?? '',
    mensagem: formData.get('mensagem')?.toString() ?? '',
  };

  const parsed = contactFormSchema.safeParse(raw);

  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error);
    const fieldErrors: ContactFormState['fieldErrors'] = {};

    (['nome', 'email', 'empresa', 'assunto', 'mensagem'] as const).forEach((field) => {
      const errors = tree.properties?.[field]?.errors;
      if (errors?.length) {
        fieldErrors[field] = errors;
      }
    });

    return {
      success: false,
      message: 'Verifique os campos destacados.',
      fieldErrors,
    };
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('[contact] CONTACT_WEBHOOK_URL não configurada.');
    return { success: false, message: GENERIC_ERROR_MESSAGE };
  }

  const payload = {
    ...parsed.data,
    origem: 'home' as const,
    timestamp: new Date().toISOString(),
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`[contact] Webhook respondeu ${response.status} ${response.statusText}`);
      return { success: false, message: GENERIC_ERROR_MESSAGE };
    }
  } catch (error) {
    console.error('[contact] Erro ao enviar para o webhook:', error);
    return { success: false, message: GENERIC_ERROR_MESSAGE };
  }

  return { success: true, message: 'Mensagem enviada! Retornamos em breve.' };
}
