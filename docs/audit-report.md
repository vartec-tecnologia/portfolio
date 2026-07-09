# Audit Report — Estado Atual vs. CLAUDE.md / product.md / architecture.md / Specs 01-05

Gerado em 2026-07-09. Auditoria somente leitura (Spec 00) — nenhuma alteração de código foi feita nesta etapa.

## ⚠️ Achado crítico (fora do escopo de "gap", mas bloqueante)

**Webhook do Make.com hardcoded e já commitado no histórico do Git.**
`components/ContactForm.tsx` contém `https://hook.us2.make.com/ijgyku6ub35g1iibvhc7g9nyop9pk6k1` direto no código, em vez de `process.env.CONTACT_WEBHOOK_URL`. Está presente nos commits `5351455` e `00bbd85`, já enviados para `origin` (`github.com/vartec-tecnologia/portfolio`).
- Viola diretamente `CLAUDE.md` ("integração via webhook externo") e `architecture.md` ("Variável de ambiente `CONTACT_WEBHOOK_URL` — nunca hardcoded").
- **Ação recomendada para Rafael:** confirmar visibilidade do repositório no GitHub; se pública (ou mesmo privada), considerar rotacionar a URL do webhook no Make e mover para `.env`/`CONTACT_WEBHOOK_URL`. Reescrever histórico do Git é opcional e disruptivo — decisão de Rafael, não tomada aqui.

**Chaves SSH soltas na raiz do projeto.**
`varteckey` / `varteckey.pub` (par de chaves OpenSSH) estão na raiz do repo. Estão listadas no `.gitignore`, então não foram commitadas — mas não há referência a elas em nenhum script/config do projeto. Não é um gap de spec, mas vale confirmar com Rafael se ainda são necessárias aí ou se podem ser movidas para fora do diretório do projeto.

**Documentação fora do lugar.**
`architecture.md`, `product.md` e `tasks.md` estão soltos na raiz do repo (não em `/docs`), enquanto `docs/specs/*.md` já segue a estrutura esperada e os próprios documentos se referenciam via `docs/specs/...`. Isso pode ser reorganização em andamento — não tratado como gap de código, só sinalizado.

---

## 1. Inventário Estrutural

| Esperado (CLAUDE.md) | Situação |
|---|---|
| `/app` | ✅ Existe. Rotas atuais: `/`, `/blog`, `/blog/[slug]`. |
| `/components` | ✅ Existe, mas com nomes/composição diferente do esperado (ver Spec 03/05 abaixo). |
| `/content` | ✅ Existe, com **1 único post** de teste (`primeiro-post.md`, corpo = `"S"`). |
| `/lib` | ⚠️ Só contém `posts.ts`. Falta `/lib/validations/` inteiro (sem `post.ts` nem `contact.ts`) e `/lib/seo.ts`. |
| `/public` | ✅ Existe, mas ainda com boilerplate do `create-next-app` não removido (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) ao lado do logo real. |
| `/docs/design-tokens.md` | ❌ Não existe. `tailwind.config.ts` tem cores/fontes hardcoded diretamente (`primary`, `neutral`, `Inter`) sem essa referência única. |

Componentes existentes vs. documentados (`CLAUDE.md` cita: Hero, Navbar, Services, ContactForm, SEO/JsonLd):
- ✅ `Hero.tsx`, `Navbar.tsx`, `Footer.tsx`, `ContactForm.tsx` existem.
- ⚠️ `Services.tsx` existe mas só com 3 dos 5 serviços do `product.md`.
- ❌ `JsonLd.tsx` não existe.
- ❓ Não documentados em `CLAUDE.md` (decisão informal — confirmar com Rafael antes de mexer): `Logo.tsx`, `BackgroundPattern.tsx`.
- Specs 03/05 esperam também `ServicesGrid.tsx`, `SegmentsGrid.tsx`, `RecentPosts.tsx` e `/app/actions/contact.ts` — nenhum existe.

## 2. Conformidade de Stack (`package.json`)

| Pacote | Esperado (CLAUDE.md/specs) | Situação |
|---|---|---|
| Next.js | 16 | ✅ `16.2.6` |
| TypeScript | sim | ✅ `^5` |
| Tailwind + typography plugin | sim | ✅ `tailwindcss ^4`, `@tailwindcss/typography ^0.5` |
| `gray-matter` | sim | ✅ instalado e em uso (`lib/posts.ts`) |
| `next-mdx-remote` | sim | ✅ instalado e em uso (`compileMDX`) |
| `zod` | sim | ❌ **não instalado** — nenhuma validação de schema existe hoje |
| Vitest (dev) | sim (Spec 01) | ❌ **não instalado**, sem config, zero testes no projeto |
| `lucide-react` + `react-icons` | não mencionados | ❓ duas libs de ícones para o mesmo propósito — redundância a confirmar com Rafael |

`npm run build` executa sem erros nem warnings de tipo (verificado nesta auditoria, sem alterar código).

## 3. Gap Report por Spec

### Spec 01 — Setup
- ✅ `npm run build` passa.
- ✅ Estrutura básica de pastas existe.
- ❌ `.env.example` não existe (nem `.env`) — `CONTACT_WEBHOOK_URL` e `NEXT_PUBLIC_SITE_URL` não documentadas em lugar nenhum.
- ❌ Vitest não configurado.
- ❌ `/lib/validations` não existe.
- ⚠️ `/docs/design-tokens.md` não existe — tokens estão direto no `tailwind.config.ts`.

**Status real: Parcial.**

### Spec 02 — SEO Base
- ❌ `/lib/seo.ts` não existe (`buildMetadata`, `buildOrganizationJsonLd`, `buildArticleJsonLd` — nenhum implementado).
- ❌ `/components/JsonLd.tsx` não existe.
- ❌ `/app/sitemap.ts` não existe.
- ❌ `/app/robots.ts` não existe.
- ❌ `/app/opengraph-image.tsx` não existe.
- ⚠️ `app/layout.tsx` define `metadata` estático hardcoded (title "VarTec", description fixa) em vez de usar `buildMetadata` — e nenhuma outra rota (`/`, `/blog`, `/blog/[slug]`) implementa `generateMetadata` própria.
- ❌ Nenhum JSON-LD (`Organization` ou `Article`) presente em qualquer página hoje.

**Status real: Não iniciado.** Confirma a suspeita da própria Spec 00: SEO é a maior lacuna do projeto.

### Spec 03 — Home
- ✅ Hero, Services (grid) e lista de posts recentes renderizam.
- ⚠️ Copy do Hero é genérica ("Soluções Digitais que Impulsionam seu Negócio") e não reflete o diferencial específico do `product.md` ("parceiro técnico único para o ciclo completo").
- ⚠️ Grid de Serviços mostra só 3 itens (Desenvolvimento Web, SaaS & Aplicações, Automação) em vez dos 5 do `product.md` (faltam Dashboards, Aplicativos, APIs) e não linka aos segmentos.
- ❌ Seção de Segmentos-Alvo (8 segmentos + dores, `SegmentsGrid.tsx`) **não existe** — seção inteira ausente.
- ⚠️ Posts recentes funcionam mas estão inline em `app/page.tsx`, não como componente `RecentPosts.tsx` dedicado.
- ❌ `generateMetadata` da Home via `buildMetadata` — não existe (depende da Spec 02).
- ✅ Mobile-first (`md:`) aplicado no grid de serviços.

**Status real: Parcial.**

### Spec 04 — Blog
- ⚠️ `lib/posts.ts` implementa `getSortedPostsData`/`getPostData` — nomes diferentes do especificado (`getAllPosts`/`getPostBySlug`), e `getAllTags()` não existe.
- ❌ Frontmatter **não passa por validação Zod** (cast direto via `as {...}`) — viola diretamente `CLAUDE.md`. `lib/validations/post.ts` não existe.
- ❌ Campo `slug` do frontmatter não existe — o `id` é derivado do nome do arquivo. Campos `tags`, `coverImage`, `author`, `draft` também ausentes no post de exemplo e não tratados no parsing.
- ❌ Filtro de `draft: true` em produção não implementado (não há como, já que o campo nem existe no schema atual).
- ❌ Slug inexistente não retorna `notFound()` — `getPostData` vai lançar erro de `fs` (não tratado) em vez de 404 gracioso.
- ✅ `generateStaticParams` e renderização MDX via `next-mdx-remote` funcionam.
- ❌ `generateMetadata` e JSON-LD (`Article`) — ausentes em `/blog` e `/blog/[slug]`.
- ⚠️ Só 1 post de exemplo, com corpo de teste (`"S"`) — não há caso de post inválido para validar exclusão graciosa (mas validação nem existe ainda).
- ❌ Nenhum teste unitário (Vitest não instalado).

**Status real: Parcial** (fluxo básico funciona, mas quase nenhum critério de aceite documentado é atendido).

### Spec 05 — Contato
Esta é a spec que Rafael mencionou estar mexendo antes desta sessão — confirmado, é a maior fonte de gaps junto com SEO.

- ❌ `/lib/validations/contact.ts` não existe — **nenhuma validação Zod** no fluxo de contato.
- ⚠️ `ContactForm.tsx` é Server Component com Server Action inline (`"use server"` dentro da própria função), não Client Component como pede a spec — logo não há estado de loading/sucesso/erro nem mensagens de erro por campo.
- ❌ Campo `assunto` (orçamento/agendamento/dúvida) **não existe** no formulário — apenas nome, email e mensagem. Campo `empresa` também ausente.
- ❌ `/app/actions/contact.ts` dedicado não existe — action está inline no componente.
- ❌ Rate limiting (5 envios/hora por IP) não implementado.
- ❌ Payload enviado ao webhook não segue o contrato de `architecture.md`: envia `{nome, email, mensagem, date}` em vez de `{nome, email, empresa, assunto, mensagem, origem, timestamp}`.
- 🔴 **Webhook hardcoded no código-fonte** (ver achado crítico no topo) em vez de `process.env.CONTACT_WEBHOOK_URL`.
- ❌ Erro de webhook só faz `console.error` — não há retorno de mensagem genérica ao usuário (nem como retornaria, já que não há estado de UI de erro).
- ❌ Nenhum teste unitário do schema (schema nem existe).

**Status real: Parcial** — existe um formulário funcional que envia lead, mas nenhum critério de aceite da spec está de fato atendido; a base terá que ser refeita, não só complementada.

## 4. Dívidas Técnicas Específicas (conforme pedido na Spec 00)

- **Formulário de contato:** não valida input, não trata erro do webhook sem expor detalhe (hoje simplesmente não expõe nada ao usuário porque não há feedback nenhum na UI — nem de sucesso nem de erro). Webhook exposto em texto plano no código e no histórico do Git.
- **SEO:** confirmado como a maior lacuna — zero `generateMetadata` por rota, zero sitemap/robots, zero JSON-LD.
- **Design tokens:** cores usadas de forma relativamente consistente (`primary`/`neutral` no `tailwind.config.ts`), mas sem o arquivo de referência `/docs/design-tokens.md` exigido pelo `CLAUDE.md` — hoje a fonte da verdade é só o próprio `tailwind.config.ts`, sem documentação separada.

## 5. Atualização de `tasks.md`

| # | Spec | Status anterior | Status real (pós-auditoria) |
|---|---|---|---|
| 00 | Auditoria | Não iniciado | **Concluído** (este relatório) |
| 01 | Setup do Projeto | Aguardando auditoria | **Parcial** |
| 02 | SEO Base | Aguardando auditoria | **Não iniciado** |
| 03 | Home | Aguardando auditoria | **Parcial** |
| 04 | Blog | Aguardando auditoria | **Parcial** |
| 05 | Contato | Aguardando auditoria | **Parcial** (refazer a base, não só complementar) |

`tasks.md` (raiz do projeto) foi atualizado com esses status.
