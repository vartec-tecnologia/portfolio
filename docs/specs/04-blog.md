# Spec 04 — Blog

## Objetivo
Listagem e leitura de posts técnicos/opinativos (conforme `product.md`: opinião sobre tecnologia, não tutorial nem case de cliente), servindo como motor de SEO de cauda longa.

## Escopo

### `/lib/posts.ts`
- `getAllPosts()` → lê `/content/*.mdx`, parseia com `gray-matter`, valida frontmatter com schema Zod (Spec do `CLAUDE.md`), filtra `draft: true` em produção, ordena por `date` desc. Posts com frontmatter inválido são excluídos com `console.warn`, nunca quebram o build.
- `getPostBySlug(slug)` → retorna post único ou `null`.
- `getAllTags()` → lista de tags únicas usadas nos posts publicados (para filtro futuro, se necessário).

### `/lib/validations/post.ts`
Schema Zod conforme definido no `CLAUDE.md` (title, description, date, slug, tags, coverImage, author, draft).

### `/app/blog/page.tsx`
- Lista todos os posts publicados, cards com título, descrição, data, tags.
- `generateMetadata` via `buildMetadata` (Spec 01).

### `/app/blog/[slug]/page.tsx`
- `generateStaticParams` a partir de `getAllPosts()`.
- Renderiza MDX via `next-mdx-remote`.
- `generateMetadata` via `buildMetadata` + imagem do post (ou fallback OG default).
- Injeta `<JsonLd data={buildArticleJsonLd(post)} />`.
- Slug inexistente → `notFound()`.

### Conteúdo de exemplo
- Criar 2-3 posts de exemplo em `/content` respeitando o schema, para validar o fluxo ponta a ponta (Rafael substitui pelo conteúdo real depois).

## Critérios de Aceite
- [ ] `/blog` lista apenas posts publicados, ordenados por data desc.
- [ ] `/blog/[slug]` renderiza MDX corretamente (formatação, código, listas).
- [ ] Slug inválido retorna 404.
- [ ] Post com frontmatter inválido não aparece na listagem e não quebra o build (validar com 1 post de teste propositalmente inválido).
- [ ] Metadata e JSON-LD (`Article`) presentes em cada post.
- [ ] Testes unitários: `getAllPosts` (ordenação, filtro de draft, exclusão de inválido), schema Zod (casos válidos/inválidos).

## Fora de Escopo
- Categorização por segmento vertical (definido como v2 no `product.md`).
- Comentários, curtidas, ou qualquer interação social nos posts.
- Busca/filtro por tag na UI (dado disponível via `getAllTags()`, mas UI é opcional para v1).

## Dependências
Spec 02 (SEO Base) concluída — **e Spec 06 (Design System) aplicada retroativamente, ver nota abaixo.**