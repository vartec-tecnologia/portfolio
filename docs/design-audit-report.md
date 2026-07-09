# Design Audit Report

Auditoria de consistência visual comparando `docs/design-tokens.md` e `docs/specs/06-design-system.md` (fonte de verdade, já atualizados) contra o código implementado hoje. Gerado em 2026-07-09.

**Diagnóstico geral:** o código foi construído inteiramente sobre o sistema visual antigo (placeholder pré-retrofit: `Inter`, paleta `primary-500/600` + `neutral-800/600`, sem motivo de conexão). Nenhum arquivo do site hoje reflete os tokens atuais (`ink/paper/primary/line/muted`, Space Grotesk/IBM Plex, `ConnectorMotif`). Isso bate exatamente com o que a "Nota de Retrofit" da Spec 06 já previa.

---

## `tailwind.config.ts`
**Status:** ❌ não implementado

- Cores: declara `primary.500/600` e `neutral.800/600` (sistema antigo) — não existem os tokens `ink`, `paper`, `primary`/`primary-dark`, `line`, `muted` exigidos pela Spec 06.
- Fonte: `fontFamily.sans` aponta para `Inter`, não há `display`/`body`/`mono` mapeados para as variáveis `--font-display`/`--font-body`/`--font-mono`.
- Não há `fontSize` customizado (escala `xs`–`4xl` do `design-tokens.md` ausente) nem ajuste de `borderRadius` para 8px.
- **Ação:** reescrever `theme.extend` com os tokens de `docs/design-tokens.md` (cores, fontFamily ligado às variáveis de `next/font`, fontSize da escala, borderRadius) conforme escopo da Spec 06.

## `components/Logo.tsx`
**Status:** ✅ conforme

- Já é a versão flat revisada: hexágono sólido `#2563EB` (sem gradiente), motivo de nós conectados no lugar do raio genérico, wordmark em Space Grotesk, tagline em IBM Plex Mono.
- Hex hardcoded (`#2563EB`, `#0B1220`, `#5B6478`, `#FFFFFF`) bate exatamente com os tokens `primary`, `ink`, `muted` — uso aceitável pois `Logo.tsx` é uma das exceções documentadas em `CLAUDE.md`/`design-tokens.md` para hex literal em SVG.
- Nenhuma ação necessária.

## `components/ContactForm.tsx`
**Status:** ❌ não implementado

- Cores 100% do sistema antigo/Tailwind padrão: `text-gray-600`, `border-gray-400`, `bg-gray-50`, `bg-neutral-600`, `hover:bg-blue-600`, `text-red-600`, `text-green-600`. Nenhuma classe usa os tokens `ink`/`paper`/`primary`/`line`/`muted`.
- Fonte: nenhuma classe `font-display`/`font-body`/`font-mono` — usa o `font-sans` herdado do body (que também não carrega Space Grotesk/Plex, ver `app/layout.tsx` abaixo).
- Botão de submit usa `bg-neutral-600` com hover `bg-blue-600` — inconsistente mesmo dentro do próprio arquivo (deveria ser `primary` sólido conforme "Aplicação por Seção" do `design-tokens.md`: "botão primário sólido `primary`, nunca outline como CTA principal").
- **Ação:** trocar todas as classes de cor por tokens (`border-line`, `text-muted`, `bg-primary`, `hover:bg-primary-dark`, etc.) e aplicar `font-body`/`font-mono` onde cabível.

## Home — `components/Hero.tsx`
**Status:** ❌ não implementado

- Cores: `text-gray-900`, `text-blue-600`, `text-gray-600`, `bg-blue-600`, `border-gray-400`, `hover:bg-gray-100` — todas classes Tailwind padrão, nenhum token.
- Fonte: `font-bold` sem `font-display`; headline deveria estar em Space Grotesk peso 500–600 ("nunca 700+", conforme `design-tokens.md`) e hoje usa `font-bold` (700).
- Motivo de linha/nó "atrás do Hero" (previsto no design-tokens.md e na Spec 06) não existe no componente.
- **Ação:** trocar cores por tokens, aplicar `font-display` com peso ≤600 na headline, e inserir `ConnectorMotif` sutil de fundo (após esse componente ser criado).

## Home — `components/ServicesGrid.tsx`
**Status:** ❌ não implementado

- Cores: `text-neutral-800`, `border-gray-200`, `text-gray-800`, `text-gray-600`, `text-gray-500` — sistema antigo.
- Cards usam `hover:shadow-lg` — contraria a diretriz do `design-tokens.md` de evitar `box-shadow` pesado e usar `border: 1px solid line` como separação padrão.
- Fonte: `font-bold`/`font-semibold` sem vínculo a `font-display`/`font-body`.
- **Ação:** trocar para tokens (`border-line`, `text-ink`, `text-muted`), remover `hover:shadow-lg` (manter só borda), aplicar `font-body font-semibold` no título do card conforme spec ("título em Plex Sans 600").

## Home — `components/SegmentsGrid.tsx`
**Status:** ❌ não implementado

- Mesmo padrão de cores antigas (`text-neutral-800`, `bg-gray-50`, `border-gray-200`, `text-gray-800`, `text-gray-500`).
- Layout atual é grid de cards (`grid ... gap-6` com `border` + `bg-white` por item) — a Spec/design-tokens pede formato de **lista/índice**, não "card grid genérico", com nome do segmento como eyebrow em mono `text-xs` uppercase. Divergência estrutural, não só de cor.
- **Ação:** revisar tanto os tokens de cor quanto o layout (migrar de card grid para lista/índice com eyebrow em `font-mono text-xs uppercase`).

## Home — `components/RecentPosts.tsx`
**Status:** ⚠️ divergente (parcial)

- Já referencia `text-primary-500` (mais próximo do sistema novo que os demais, mas `primary-500` é o token **antigo** do `tailwind.config.ts` atual — não existe mais uma vez os tokens sejam migrados para `primary`/`primary-dark` sem escala numérica).
- Restante usa `font-bold`, `text-gray-500` — sem tokens/fonte do sistema novo.
- **Ação:** trocar `text-primary-500` por `text-primary` (novo token), aplicar `font-display` no título da seção e `font-mono text-xs` na data do post (conforme "Blog: meta em Plex Mono text-xs" do design-tokens.md).

## Home — `components/Navbar.tsx`
**Status:** ⚠️ divergente (parcial)

- Usa `hover:text-primary-500`, `bg-neutral-800`, `hover:bg-primary-500` — tokens antigos (`primary-500`, `neutral-800`), não os novos (`primary`, `ink`).
- Logo já é a versão correta (ver acima), então a divergência aqui é só de classes de cor da navegação/CTA, não estrutural.
- **Ação:** atualizar para `text-primary`, `bg-ink`, `hover:bg-primary-dark` conforme tokens novos.

## Home — `components/Footer.tsx`
**Status:** ⚠️ divergente (parcial)

- `text-neutral-600`, `border-gray-100` — tokens antigos; ícones sociais usam cores de marca de terceiros (`hover:text-pink-500`, `hover:text-blue-600`, `hover:text-sky-700`, `hover:text-green-500`), o que é aceitável (cores de identidade de cada rede social, não da paleta do site) mas vale confirmar essa exceção explicitamente no design-tokens.md.
- **Ação:** trocar `text-neutral-600`/`border-gray-100` por `text-muted`/`border-line`; manter cores das redes sociais como estão (não fazem parte do sistema de tokens do site).

## Home — `components/BackgroundPattern.tsx` (usado globalmente via `app/layout.tsx`)
**Status:** ❌ não implementado

- É um motivo completamente diferente do previsto: padrão repetido de fundo com ícone `{"</>"}` e círculos, cor `#0EA5E9` (azul-céu) e `#7B2FFF` (roxo) — **nenhum dos dois hex existe em `docs/design-tokens.md`** e é exatamente o tipo de "clichê de inovação" que o design-tokens.md pede para evitar.
- O `design-tokens.md` prevê o motivo de linha/nó em **exatamente dois lugares** (atrás do Hero e entre Serviços/Segmentos), não como wallpaper de fundo em todas as páginas via layout global.
- `ConnectorMotif.tsx` (componente exigido pela Spec 06) não existe no projeto — este arquivo é um resquício de protótipo anterior, não uma implementação parcial do motivo correto.
- **Ação:** remover `BackgroundPattern.tsx` do `layout.tsx` (ou do projeto) e criar `components/ConnectorMotif.tsx` conforme Spec 06, usando-o apenas atrás do Hero e como separador Serviços/Segmentos.

## `app/page.tsx`
**Status:** ✅ conforme

- Apenas compõe os componentes da Home (`Hero`, `ServicesGrid`, `SegmentsGrid`, `RecentPosts`, `ContactForm`); não tem estilo próprio, então não há divergência neste arquivo especificamente — os problemas estão nos componentes filhos (listados acima).

## Blog — `app/blog/page.tsx`
**Status:** ❌ não implementado

- Cores antigas: `text-gray-800`, `hover:text-gray-600`, `text-gray-500`, `bg-gray-100 text-gray-600` (tags).
- Título do post em `font-semibold` sem `font-display`; data do post em `text-sm` sem `font-mono` (spec pede "meta (data/tags) em Plex Mono text-xs").
- **Ação:** aplicar tokens (`text-ink`, `text-muted`, `bg-line`), `font-display` nos títulos de post e `font-mono text-xs` na data/tags.

## Blog — `app/blog/[slug]/page.tsx`
**Status:** ❌ não implementado

- `text-primary-500` (token antigo), `text-gray-500` na data — mesmo padrão do restante do blog.
- `<article className="prose ...">` depende do plugin `@tailwindcss/typography`, que por sua vez herda `fontFamily.sans` do Tailwind config (`Inter`, não carregada) — corpo do post não está usando IBM Plex Sans.
- **Ação:** trocar `text-primary-500` → `text-primary`, `text-gray-500` → `text-muted`, e configurar o tema do plugin `typography` (`theme.extend.typography`) para usar as fontes/tokens novos no conteúdo MDX renderizado.

---

## Achados adicionais relevantes (fora da lista original, mas bloqueiam a Spec 06)

### `app/layout.tsx`
**Status:** ❌ não implementado

- Não há nenhum `import` de `next/font/google` — nem Inter (sistema antigo) nem Space Grotesk/IBM Plex (sistema novo) são carregadas via `next/font`. O `<body>` usa `className="font-sans"`, que resolve para a fonte padrão do navegador porque nenhum arquivo de fonte é de fato carregado.
- Confirma achado do critério de aceite da Spec 06 ("Fontes carregam via next/font, sem link externo") — hoje nem isso, nem o sistema antigo, está implementado; é o estado mais básico possível (fonte do sistema).
- **Ação:** implementar o bloco de `next/font/google` exatamente como descrito na Spec 06 (Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono) e aplicar as variáveis no `<body>`.

### `app/globals.css`
**Status:** ❌ não implementado

- Ainda é o boilerplate padrão do `create-next-app`: variáveis `--font-geist-sans`/`--font-geist-mono` (fonte Geist, nunca usada/carregada no projeto), `font-family: Arial, Helvetica, sans-serif` direto no `body`, e um bloco `@media (prefers-color-scheme: dark)` que contradiz a decisão de produto "site é light-only" registrada em `design-tokens.md`.
- **Ação:** remover o boilerplate Geist/dark-mode e substituir pelas variáveis de cor (`--color-ink`, `--color-paper` etc., se for essa a abordagem) e pela declaração de fonte body vinda de `next/font`.

### `app/opengraph-image.tsx`
**Status:** ⚠️ divergente (parcial)

- Hex hardcoded `#1f2937` (background) e `#ffffff` (texto) fora do `tailwind.config.ts` — este arquivo não está na lista de exceções (`Logo.tsx`/`ConnectorMotif.tsx`) do `CLAUDE.md`.
- `ImageResponse` do `next/og` não consegue consumir classes Tailwind diretamente, então algum hardcode é tecnicamente necessário — mas os valores devem bater com os tokens (`ink` `#0B1220`/`paper` `#FAFBFC`), não com um cinza arbitrário do Tailwind padrão.
- **Ação:** trocar `#1f2937`/`#ffffff` pelos valores exatos de `ink`/`paper` (ou `primary`), com comentário indicando a origem em `design-tokens.md` (mesmo padrão de justificativa usado em `Logo.tsx`).

---

## Resumo

| Arquivo | Status |
|---|---|
| `tailwind.config.ts` | ❌ |
| `components/Logo.tsx` | ✅ |
| `components/ContactForm.tsx` | ❌ |
| `components/Hero.tsx` | ❌ |
| `components/ServicesGrid.tsx` | ❌ |
| `components/SegmentsGrid.tsx` | ❌ |
| `components/RecentPosts.tsx` | ⚠️ |
| `components/Navbar.tsx` | ⚠️ |
| `components/Footer.tsx` | ⚠️ |
| `components/BackgroundPattern.tsx` | ❌ |
| `app/page.tsx` | ✅ |
| `app/blog/page.tsx` | ❌ |
| `app/blog/[slug]/page.tsx` | ❌ |
| `app/layout.tsx` (fontes) | ❌ |
| `app/globals.css` | ❌ |
| `app/opengraph-image.tsx` | ⚠️ |
| `components/ConnectorMotif.tsx` | ❌ não existe |

**Conclusão:** o retrofit previsto na Spec 06 ainda não começou. Recomenda-se seguir a ordem: (1) `tailwind.config.ts` + `next/font` em `layout.tsx` primeiro (desbloqueiam todo o resto), (2) `Logo.tsx`/`ConnectorMotif.tsx` (base visual/motivo), (3) reaplicar tokens em Home, Blog e ContactForm, (4) remover `BackgroundPattern.tsx` e o boilerplate de `globals.css`.
