'use client';

import { useActionState } from 'react';

import { submitContactForm, type ContactFormState } from '@/app/actions/contact';

const initialState: ContactFormState = { success: false };

const inputClass = 'p-3 text-ink border border-line rounded-lg bg-paper';
const errorClass = 'text-red-600 text-sm -mt-2';

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <section id="contato" className="py-20 px-6">
      <div className="max-w-xl mx-auto">
        <h2 className="text-ink text-2xl font-display font-semibold mb-8">Vamos construir algo?</h2>
        <form action={formAction} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1">
            <input name="nome" type="text" placeholder="Seu nome" className={inputClass} required minLength={2} />
            {state.fieldErrors?.nome && <p className={errorClass}>{state.fieldErrors.nome[0]}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <input name="email" type="email" placeholder="Seu melhor e-mail" className={inputClass} required />
            {state.fieldErrors?.email && <p className={errorClass}>{state.fieldErrors.email[0]}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <input name="empresa" type="text" placeholder="Empresa (opcional)" className={inputClass} />
            {state.fieldErrors?.empresa && <p className={errorClass}>{state.fieldErrors.empresa[0]}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <select name="assunto" className={inputClass} required defaultValue="">
              <option value="" disabled>
                Qual o assunto?
              </option>
              <option value="orcamento">Pedido de orçamento</option>
              <option value="agendamento">Agendamento de call</option>
              <option value="duvida">Dúvida geral</option>
            </select>
            {state.fieldErrors?.assunto && <p className={errorClass}>{state.fieldErrors.assunto[0]}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <textarea
              name="mensagem"
              placeholder="Como posso te ajudar?"
              className={`${inputClass} h-32`}
              required
              minLength={10}
            />
            {state.fieldErrors?.mensagem && <p className={errorClass}>{state.fieldErrors.mensagem[0]}</p>}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="bg-primary text-paper p-3 rounded-lg font-body font-semibold hover:bg-primary-dark transition disabled:opacity-60"
          >
            {isPending ? 'Enviando...' : 'Enviar Proposta'}
          </button>

          {state.message && (
            <p className={state.success ? 'text-green-600 text-sm' : 'text-red-600 text-sm'}>{state.message}</p>
          )}
        </form>
      </div>
    </section>
  );
}
