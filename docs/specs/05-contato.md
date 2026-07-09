# Spec 05 — Contato

## Objetivo
Capturar leads qualificados (orçamento, agendamento ou dúvida geral, conforme `product.md`) via Server Action, com validação e envio confiável para o webhook externo.

## Escopo

### `/lib/validations/contact.ts`
Schema Zod:
```ts
{
  nome: string (min 2),
  email: string (email válido),
  empresa: string opcional,
  assunto: enum ["orcamento", "agendamento", "duvida"],
  mensagem: string (min 10)
}
```

### `/components/ContactForm.tsx`
- Client Component (interatividade de formulário) que invoca a Server Action.
- Campos: nome, email, empresa (opcional), assunto (select/radio com as 3 opções), mensagem.
- Estado de loading, sucesso e erro tratados na UI (sem reload de página).
- Mensagens de erro de validação exibidas por campo.

### `/app/actions/contact.ts` (Server Action)
- Recebe `FormData`, valida com o schema Zod.
- Rate limiting simples (in-memory, por IP — ex: `Map` com timestamp, máx. 5 envios/hora). Documentar limitação: reseta a cada deploy/cold start, aceitável para v1.
- Monta payload conforme contrato definido em `architecture.md` (inclui `origem: "home"` e `timestamp`).
- POST para `process.env.CONTACT_WEBHOOK_URL`.
- Em caso de erro (rede, webhook fora do ar): log server-side detalhado, retorno genérico ao client (`{ success: false, message: "Não foi possível enviar, tente novamente." }`).
- Sucesso: retorno `{ success: true }`.

## Critérios de Aceite
- [ ] Envio válido dispara POST ao webhook com payload no formato definido em `architecture.md`.
- [ ] Campos inválidos bloqueiam envio e mostram erro específico por campo (client-side, refletindo o schema).
- [ ] 6ª tentativa de envio no mesmo IP dentro de 1h é bloqueada com mensagem apropriada.
- [ ] Falha simulada do webhook (ex: URL inválida em teste) não expõe detalhe técnico ao usuário.
- [ ] Formulário funciona sem JavaScript no envio inicial (progressive enhancement via Server Action) — validar que ao menos o submit básico funciona.
- [ ] Teste unitário do schema Zod (casos válidos/inválidos por campo).

## Fora de Escopo
- Página `/contato` dedicada (form vive só na Home, decisão da Spec 02).
- Envio de e-mail de confirmação automático ao lead (pode ser feito pelo próprio Make/Zapier do lado externo).
- CAPTCHA (reavaliar se houver spam real após lançamento).

## Dependências
Spec 01 (Setup) concluída — precisa de `CONTACT_WEBHOOK_URL` configurada em `.env`.