# Spec 02 — SEO Base

## Objetivo
Infraestrutura de SEO reutilizável por todas as páginas: metadata, JSON-LD, sitemap e robots. Nenhuma página de conteúdo deve implementar SEO "na mão" — tudo passa pelos helpers desta spec.

## Escopo

### `/lib/seo.ts`
- `buildMetadata({ title, description, path, image? })` → retorna objeto `Metadata` do Next.js (title, description, canonical via `NEXT_PUBLIC_SITE_URL` + path, Open Graph, Twitter Card).
- `buildOrganizationJsonLd()` → JSON-LD estático da empresa (nome, url, logo — usar placeholders até Rafael confirmar dados legais da empresa).
- `buildArticleJsonLd(post)` → JSON-LD de post do blog (headline, datePublished, author, image).

### `/components/JsonLd.tsx`
Componente simples que injeta `<script type="application/ld+json">` a partir de um objeto passado por prop.

### `/app/sitemap.ts`
- Gera entradas para rotas fixas (Home, Serviços, Blog, Contato) + todos os posts publicados (`draft: false`) via `getAllPosts()`.

### `/app/robots.ts`
- Permite todos os crawlers, referencia o sitemap.

### `/app/opengraph-image.tsx`
- Imagem OG default (usada quando um post não define `coverImage`). Pode ser gerada via `next/og` com nome da empresa.

### Layout raiz (`/app/layout.tsx`)
- Injeta `buildOrganizationJsonLd()` uma única vez (JSON-LD global, não repetir por página).

## Critérios de Aceite
- [ ] Qualquer página que chame `buildMetadata` produz title, description e canonical corretos.
- [ ] `/sitemap.xml` lista todas as rotas fixas + posts publicados (drafts excluídos).
- [ ] `/robots.txt` acessível e aponta para o sitemap.
- [ ] JSON-LD de `Organization` presente no HTML de qualquer página (verificar via view-source).
- [ ] JSON-LD de `Article` presente apenas em páginas de post.
- [ ] Teste unitário cobrindo `buildMetadata` e `buildArticleJsonLd` (casos com e sem imagem).

## Fora de Escopo
- Dados legais reais da empresa (CNPJ, endereço) — usar placeholder, Rafael preenche depois.
- Analytics/tracking (não solicitado no product.md).

## Dependências
Spec 01 (Setup) concluída.