import { z } from 'zod';

export const contactFormSchema = z.object({
  nome: z.string().min(2, 'Informe seu nome completo.'),
  email: z.email('Informe um e-mail válido.'),
  empresa: z.string().optional(),
  assunto: z.enum(['orcamento', 'agendamento', 'duvida'], {
    error: 'Selecione um assunto.',
  }),
  mensagem: z.string().min(10, 'Conte um pouco mais (mínimo 10 caracteres).'),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
