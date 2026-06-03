# CLAUDE.md

## Visão Geral do Projeto

Site de portfólio para a empresa de tecnologia de Rafael. O objetivo é apresentar serviços de desenvolvimento, automação e SaaS, além de manter uma seção de blog para autoridade técnica.

## Stack Tecnológica

- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS (com `@tailwindcss/typography`)
- **Renderização:** Server Components (SSG/SSR)
- **Conteúdo:** Markdown/MDX (armazenado na pasta `/content`)
- **Deploy:** Vercel

## Arquitetura de Pastas

- `/app`: Rotas e páginas (UI).
- `/components`: Componentes reutilizáveis (Hero, Navbar, Services, ContactForm).
- `/content`: Arquivos Markdown para o blog.
- `/lib`: Utilitários (ex: `posts.ts` para leitura de arquivos).
- `/public`: Assets estáticos.

## Padrões de Código

- **Mobile-first:** Uso de classes Tailwind `md:` para breakpoints.
- **Componentes:** Sempre usar caminhos baseados no alias `@/` (ex: `@/components/Navbar`).
- **Data Fetching:** Toda lógica de acesso a arquivos deve residir em `/lib` e ser chamada apenas em Server Components.
- **Automação:** O formulário de contato deve ser tratado via Server Actions, integrando com webhooks externos (ex: Make/Zapier).

## Planejamento de Funcionalidades

1. **Home:** Hero, Grid de Serviços, Lista de posts do Blog, Formulário de contato.
2. **Blog:** Sistema de roteamento dinâmico `[slug]` lendo arquivos `/content` com `gray-matter` e `next-mdx-remote`.
3. **Contato:** Server Action para processamento de leads.

## Regras de Configuração (Turbopack/Build)

- O projeto usa `turbopack`. Caso surjam erros de root, verificar `next.config.ts` com a propriedade `turbopack.root`.
- A pasta `/content` deve existir para que o build não falhe.
