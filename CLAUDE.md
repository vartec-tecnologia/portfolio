# CLAUDE.md

## Visão Geral do Projeto
Site de portfólio para a empresa de tecnologia de Rafael. Objetivo: apresentar serviços de desenvolvimento, automação e SaaS, e manter um blog técnico para gerar autoridade e SEO orgânico. O blog é canal primário de aquisição — decisões de arquitetura devem priorizar indexação e performance.

## Stack Tecnológica
- **Framework:** Next.js 16 (App Router, Turbopack como bundler padrão)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS (com `@tailwindcss/typography`)
- **Renderização:** Server Components (SSG para páginas estáticas e posts; SSR apenas onde necessário)
- **Conteúdo:** Markdown/MDX (`/content`), parseado com `gray-matter` e `next-mdx-remote`
- **Validação:** Zod (formulários e frontmatter)
- **Deploy:** Vercel
- **Node:** 20+ (requisito do Next.js 16)

## Arquitetura de Pastas
- `/app`: Rotas e páginas (UI).
- `/components`: Componentes reutilizáveis (Hero, Navbar, Services, ContactForm, SEO/JsonLd).
- `/content`: Arquivos Markdown/MDX do blog.
- `/lib`: Utilitários — leitura de arquivos (`posts.ts`), schemas Zod (`validations/`), helpers de SEO (`seo.ts`).
- `/public`: Assets estáticos (favicons, og-images, robots.txt).
- `/docs/design-tokens.md`: Paleta de cores, tipografia e tokens da marca (referência única, evita hardcode de valores no Tailwind config).

## Padrões de Código
- **Mobile-first:** Uso de classes Tailwind `md:` para breakpoints.
- **Componentes:** Sempre usar caminhos baseados no alias `@/` (ex: `@/components/Navbar`).
- **Data Fetching:** Toda lógica de acesso a arquivos reside em `/lib` e é chamada apenas em Server Components.
- **Validação:** Toda entrada de usuário (formulário) e todo frontmatter de post passam por schema Zod antes de uso. Falha de validação não deve quebrar o build — posts inválidos são ignorados com log de aviso.
- **Automação:** Formulário de contato tratado via Server Action, com validação Zod, rate limiting básico (ex: por IP/sessão) e integração via webhook externo (Make/Zapier). Erros de rede no webhook não devem expor detalhes internos ao usuário.

## SEO e Metadata
- Toda rota pública implementa `generateMetadata` (title, description, canonical).
- Open Graph e Twitter Card obrigatórios em todas as páginas e posts (imagem, título, descrição).
- `sitemap.ts` e `robots.ts` nativos do App Router — atualizados automaticamente com novos posts.
- JSON-LD (schema.org) para: `Organization` (global) e `Article` (cada post do blog).
- Core Web Vitals como critério de aceite: imagens via `next/image`, fontes via `next/font`, sem client components desnecessários acima da dobra.

## Schema do Frontmatter (Blog)
Todo arquivo em `/content` deve seguir:
```yaml
title: string (obrigatório)
description: string (obrigatório, usado em meta description e OG)
date: string ISO 8601 (obrigatório)
slug: string (obrigatório, único)
tags: string[] (opcional)
coverImage: string (opcional, path em /public)
author: string (default: nome da empresa)
draft: boolean (default: false — posts draft não aparecem em produção)
```
Validado via schema Zod em `/lib/validations/post.ts`.

## Design Tokens
Referência obrigatória antes de estilizar qualquer componente: `/docs/design-tokens.md`. Cores, tipografia e espaçamentos customizados devem ser declarados no `tailwind.config.ts`, nunca hardcoded inline (`text-[#123456]` é proibido).

## Testes
- `/lib`: cobertura de testes unitários obrigatória (parsing de posts, schemas Zod, helpers de SEO).
- Componentes de UI: testes opcionais, priorizar os que têm lógica (ex: `ContactForm`).
- Antes de qualquer entrega: `next build` deve passar sem erros e sem warnings de tipo.

## Regras para o Claude Code
- Rodar `next build` (ou `next lint`, se disponível) antes de considerar uma tarefa concluída.
- Nunca commitar automaticamente — apresentar o diff e aguardar confirmação.
- Seguir Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`) nas mensagens sugeridas.
- Não introduzir novas dependências sem justificar a escolha frente às já presentes no stack.
- Ao criar/editar posts de exemplo, sempre respeitar o schema do frontmatter acima.

## Planejamento de Funcionalidades
1. **Home:** Hero, Grid de Serviços, Lista de posts recentes do Blog, Formulário de contato.
2. **Blog:** Listagem (`/blog`) e rota dinâmica (`/blog/[slug]`), lendo `/content` com `gray-matter` + `next-mdx-remote`, metadata e JSON-LD por post.
3. **Contato:** Server Action com validação Zod, rate limiting e webhook (Make/Zapier).

## Regras de Configuração (Turbopack/Build)
- Turbopack é o bundler padrão no Next.js 16 — sem necessidade de flag manual.
- Em monorepos ou builds com root ambíguo, configurar `turbopack.root` em `next.config.ts`.
- A pasta `/content` deve existir (mesmo vazia com `.gitkeep`) para o build não falhar.