# Spec 01 — Setup do Projeto

## Objetivo
Scaffolding inicial funcional: build passa, estrutura de pastas criada, variáveis de ambiente documentadas.

## Escopo
- `create-next-app` com Next.js 16, TypeScript, App Router, Tailwind CSS.
- Instalar: `@tailwindcss/typography`, `gray-matter`, `next-mdx-remote`, `zod`.
- Instalar dev deps: Vitest + `@testing-library/react` (se necessário para componentes) ou apenas Vitest puro para `/lib`.
- Criar estrutura de pastas conforme `CLAUDE.md`: `/components`, `/content` (com `.gitkeep`), `/lib`, `/lib/validations`, `/docs`.
- Criar `.env.example` com `CONTACT_WEBHOOK_URL` e `NEXT_PUBLIC_SITE_URL`.
- Configurar `tailwind.config.ts` com tokens do `/docs/design-tokens.md` (placeholder até esse arquivo existir — usar paleta neutra provisória).
- Configurar `next.config.ts` (placeholder, ajustar `turbopack.root` apenas se necessário).

## Critérios de Aceite
- [ ] `npm run build` executa sem erros.
- [ ] `npm run dev` sobe a aplicação localmente.
- [ ] Estrutura de pastas bate com o `CLAUDE.md`.
- [ ] `.env.example` existe e está documentado no README.
- [ ] Vitest configurado e rodando (mesmo que com zero testes ainda).

## Fora de Escopo
- Conteúdo real de páginas (specs seguintes).
- Design tokens finais (usar placeholder até Rafael definir a paleta da marca).

## Dependências
Spec 00 (Auditoria) concluída. **Escopo desta spec deve ser ajustado conforme o gap report da auditoria** — pular/adaptar itens já implementados corretamente no projeto existente.