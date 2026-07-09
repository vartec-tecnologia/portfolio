import { describe, expect, it } from 'vitest';

import { contactFormSchema } from './contact';

const validInput = {
  nome: 'Rafael Souza',
  email: 'rafael@example.com',
  empresa: 'VarTec',
  assunto: 'orcamento' as const,
  mensagem: 'Gostaria de um orçamento para automatizar meu processo.',
};

describe('contactFormSchema', () => {
  it('aceita um envio válido completo', () => {
    expect(contactFormSchema.safeParse(validInput).success).toBe(true);
  });

  it('aceita envio válido sem empresa (campo opcional)', () => {
    const withoutEmpresa = {
      nome: validInput.nome,
      email: validInput.email,
      assunto: validInput.assunto,
      mensagem: validInput.mensagem,
    };
    expect(contactFormSchema.safeParse(withoutEmpresa).success).toBe(true);
  });

  it('rejeita nome com menos de 2 caracteres', () => {
    const result = contactFormSchema.safeParse({ ...validInput, nome: 'R' });
    expect(result.success).toBe(false);
  });

  it('rejeita e-mail inválido', () => {
    const result = contactFormSchema.safeParse({ ...validInput, email: 'não-é-email' });
    expect(result.success).toBe(false);
  });

  it('rejeita assunto fora do enum permitido', () => {
    const result = contactFormSchema.safeParse({ ...validInput, assunto: 'suporte' });
    expect(result.success).toBe(false);
  });

  it('rejeita mensagem com menos de 10 caracteres', () => {
    const result = contactFormSchema.safeParse({ ...validInput, mensagem: 'curta' });
    expect(result.success).toBe(false);
  });

  it.each(['orcamento', 'agendamento', 'duvida'] as const)('aceita assunto "%s"', (assunto) => {
    expect(contactFormSchema.safeParse({ ...validInput, assunto }).success).toBe(true);
  });
});
