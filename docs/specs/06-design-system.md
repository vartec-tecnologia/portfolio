# Spec 06 — Design System

## Objetivo
Formalizar no código o que está em `docs/design-tokens.md`: fontes carregadas corretamente, tokens de cor/espaçamento no Tailwind, e a `Logo.tsx` revisada substituindo a atual. Nenhuma spec de UI nova deve estilizar componentes antes desta spec estar concluída — evita retrabalho de trocar cor/fonte hardcoded depois.

## Nota de Retrofit
Esta spec foi criada **depois** das Specs 03 (Home), 04 (Blog) e 05 (Contato) já terem sido implementadas — nessa época, `docs/design-tokens.md` era um placeholder com valores antigos (`Inter`, `#2563eb` como token genérico `primary-500`, cinzas `neutral-800/600`). Ou seja, esses três specs foram construídos sobre um sistema visual diferente do que definimos depois (Space Grotesk/Plex, tokens `ink/paper/primary/line/muted`, motivo de conexão, logo flat).

Antes de aplicar o escopo abaixo, rodar a auditoria de consistência visual (`docs/design-audit-report.md`) para saber exatamente o que precisa mudar em cada um dos três. Esta spec cobre tanto os componentes novos quanto a correção retroativa apontada nesse relatório — não é só "código daqui pra frente".

## Escopo

### Fontes (`next/font`)
Em `/app/layout.tsx`, carregar via `next/font/google`:
```ts
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-display' });
const body = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });
```
Aplicar as variáveis na tag `<html>` ou `<body>` (`className={\`${display.variable} ${body.variable} ${mono.variable}\`}`). Isso evita FOUT/CLS e elimina a dependência de `<link>` do Google Fonts usada nos protótipos de preview.

### Tailwind Config
`tailwind.config.ts` deve declarar, a partir de `docs/design-tokens.md`:
- `colors`: `ink`, `paper`, `primary` (`#2563EB`), `primary-dark` (`#1D4ED8`), `line`, `muted`.
- `fontFamily`: `display` (var `--font-display`), `body` (var `--font-body`, default `sans`), `mono` (var `--font-mono`).
- `fontSize`: escala `xs` a `4xl` conforme tabela do `design-tokens.md`.
- `borderRadius`: default ajustado para `8px` onde o Tailwind usa `rounded` (ou token customizado `rounded-brand`).

### Logo
- Substituir `/components/Logo.tsx` atual pela versão revisada (gerada nesta sessão): hexágono flat `#2563EB`, motivo de nós conectados no lugar do raio, wordmark em `font-display` (Space Grotesk), tagline em `font-mono`.
- Componente não deve ter estilos hardcoded fora dos tokens acima — se o SVG usar hex diretamente (caso de ícones/SVG, que não herdam Tailwind facilmente), os valores devem bater exatamente com `docs/design-tokens.md`, comentado no código de onde vêm.

### Elemento de Assinatura (linha/nós)
- Extrair o motivo de linha/nó usado no Hero (protótipo desta sessão) e na Logo para um componente compartilhado `/components/ConnectorMotif.tsx` (SVG puro, aceita `className` para posicionamento), evitando duplicar o path SVG em dois lugares.

## Critérios de Aceite
- [ ] Fontes carregam via `next/font`, sem `<link>` externo no HTML final.
- [ ] `tailwind.config.ts` expõe `bg-primary`, `text-ink`, `font-display`, `font-mono` etc. — testável rodando qualquer componente com essas classes.
- [ ] `Logo.tsx` atualizado, sem gradiente, cores batendo com os tokens.
- [ ] `ConnectorMotif.tsx` criado e reutilizado (não há SVG de linha/nó duplicado em mais de um arquivo).
- [ ] Nenhum valor de cor/fonte hardcoded fora do Tailwind config em componentes novos a partir desta spec (validar por busca de hex literal em `/components` e `/app`, exceto no próprio `Logo.tsx`/`ConnectorMotif.tsx`, que são a fonte).

## Fora de Escopo
- Dark mode (site é light-only por decisão de produto).
- Ilustrações/ícones adicionais além do motivo de linha/nó e da logo.

## Dependências
Spec 01 (Setup) concluída. **Retrofit: Specs 03 (Home), 04 (Blog) e 05 (Contato) já foram implementadas antes desta spec existir e usam tokens antigos (Inter, azul genérico, sem motivo de conexão). Esta spec deve reaplicar os tokens corretos nelas, não só em código novo.**