## Decisões Arquiteturais

### Renderização
- **Home, páginas institucionais (Serviços, Sobre):** SSG (`generateStaticParams` não se aplica — são rotas fixas, renderizadas em build time).
- **Blog (`/blog` e `/blog/[slug]`):** SSG com revalidação (`revalidate` no fetch/route, ex: a cada deploy ou via `on-demand revalidation` se o conteúdo mudar sem novo deploy).
- **Formulário de contato:** único ponto de SSR real — Server Action é executada sob demanda, o resto da página permanece estática.
- Justificativa: site institucional + blog não tem dado dinâmico por usuário — maximizar SSG reduz custo e maximiza performance/SEO.

### Estrutura de Rotas (`/app`)
```
/app
  /page.tsx                 → Home
  /servicos/page.tsx        → Grid de serviços (detalhamento)
  /blog/page.tsx            → Listagem de posts
  /blog/[slug]/page.tsx     → Post individual
  /contato/page.tsx         → Página dedicada de contato (além do form na Home)
  /sitemap.ts               → Sitemap dinâmico (gera a partir dos posts + rotas fixas)
  /robots.ts                → Robots.txt
  /opengraph-image.tsx      → OG image default (fallback quando post não define coverImage)
```

### Fluxo de Dados do Blog
1. Build/request lê `/content/*.mdx` via `fs` em `/lib/posts.ts`.
2. Cada arquivo é parseado com `gray-matter` → frontmatter validado contra schema Zod (`/lib/validations/post.ts`).
3. Posts com `draft: true` são filtrados em produção (`process.env.NODE_ENV === 'production'`), mas visíveis em dev.
4. Posts inválidos (frontmatter fora do schema) são **excluídos da listagem com log de warning no build** — nunca quebram o build inteiro.
5. Conteúdo MDX é renderizado via `next-mdx-remote` em Server Component.

### Contrato do Webhook (Contato)
Server Action → validação Zod → POST para webhook (Make/Zapier), payload padronizado:
```json
{
  "nome": "string",
  "email": "string",
  "empresa": "string (opcional)",
  "assunto": "orcamento | agendamento | duvida",
  "mensagem": "string",
  "origem": "home | contato",
  "timestamp": "ISO 8601"
}
```
- **Erro no webhook:** logar server-side, retornar mensagem genérica ao usuário ("Não foi possível enviar, tente novamente"). Nunca expor status code ou detalhe da integração no client.
- **Rate limiting:** simples, em memória ou via header de IP (ex: máx. 5 submissões/hora por IP) — suficiente para v1, sem necessidade de Redis/DB externo.
- Variável de ambiente `CONTACT_WEBHOOK_URL` — nunca hardcoded.

### Variáveis de Ambiente
```
CONTACT_WEBHOOK_URL=       # URL do Make/Zapier
NEXT_PUBLIC_SITE_URL=      # usado em metadata, OG, sitemap
```
Documentar em `.env.example` (nunca commitar `.env`).

### SEO — Implementação
- `generateMetadata` por rota, usando `NEXT_PUBLIC_SITE_URL` para URLs absolutas (canonical, OG).
- JSON-LD injetado via componente `<JsonLd data={...} />` em cada página (Organization global no layout raiz, Article em cada post).
- `sitemap.ts` itera `/lib/posts.ts` (via `getAllPosts()`) + rotas estáticas fixas.

### Testes
- **Unitários (Vitest ou Jest — a definir na primeira spec técnica):**
  - `/lib/posts.ts`: parsing correto, filtro de drafts, exclusão de posts inválidos.
  - `/lib/validations/*.ts`: schemas Zod (casos válidos e inválidos).
  - `/lib/seo.ts`: geração correta de metadata/JSON-LD.
- **Não coberto em v1:** testes E2E (Playwright) — considerar se o site ganhar fluxos mais complexos além do form.

### CI/Build
- Deploy via Vercel (build automático em push para `main`).
- Antes de merge: `next build` deve passar sem erros de tipo/lint.
- Preview deployments do Vercel usados para revisar posts/conteúdo antes de produção.

## Decisões em Aberto (revisar durante specs)
- Biblioteca de teste (Vitest vs Jest) — recomendo Vitest por integração mais leve com Turbopack/ESM, mas não é bloqueante.
- Se `/contato` como página dedicada é necessária ou se o form na Home é suficiente para v1 (produto.md não deixou isso explícito).