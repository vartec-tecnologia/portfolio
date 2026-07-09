# design-tokens.md

Fonte única de verdade para cores, tipografia e espaçamento. Nenhum valor deve ser hardcoded fora deste sistema — declarar tudo em `tailwind.config.ts` a partir daqui.

## Direção
Minimalista, light mode, tom técnico-confiável (não "SaaS genérico", não corporativo pesado). A marca conecta sistemas diferentes para negócios diferentes — a identidade deve sugerir precisão e conexão, sem apelar para clichês de "inovação" (gradientes, glassmorphism, ícones 3D).

## Cor
| Token | Hex | Uso |
|---|---|---|
| `ink` | `#0B1220` | Texto primário, headlines |
| `paper` | `#FAFBFC` | Background base (não branco puro) |
| `primary` | `#2563EB` | CTAs, links, elementos de destaque (cor herdada da logo VarTec) |
| `primary-dark` | `#1D4ED8` | Hover/active de elementos primary |
| `line` | `#E4E8F0` | Bordas, divisores (site é mais "linha" que "sombra") |
| `muted` | `#5B6478` | Texto secundário, legendas, dados de apoio |

Nota: `#2563EB` coincide com `blue-600` do Tailwind — normalmente evitaríamos por ser o azul mais comum em SaaS genérico, mas aqui a cor já é a identidade visual da logo VarTec, então a prioridade é consistência de marca sobre diferenciação teórica. A distinção fica por conta da tipografia, do motivo de linha/nó e do layout, não da cor.

Superfícies escuras (se necessário em footer ou seção de contraste): `#0F1729`, sempre com `paper`/`primary` claros por cima — não criar um segundo sistema de cor para dark mode nesta fase (site é light-only, conforme decisão de produto).

## Tipografia
| Papel | Família | Uso |
|---|---|---|
| Display | **Space Grotesk** | Headlines, H1/H2 — usar com peso 500-600, nunca 700+ (evita parecer "grito") |
| Corpo | **IBM Plex Sans** | Parágrafos, UI, botões |
| Utilitário | **IBM Plex Mono** | Eyebrows, labels, tags, dados/números (reforça o tom técnico sem precisar de ícone) |

Escala tipográfica (rem, base 16px):
```
--text-xs: 0.75rem    (labels, mono)
--text-sm: 0.875rem   (legendas, muted)
--text-base: 1rem     (corpo)
--text-lg: 1.125rem   (corpo destacado)
--text-xl: 1.5rem     (H3)
--text-2xl: 2rem      (H2)
--text-3xl: 2.75rem   (H1 desktop)
--text-4xl: 3.5rem    (Hero, apenas desktop ≥ md)
```
Line-height do corpo: 1.6. Line-height de display: 1.1–1.15 (apertado, característico de headline confiante).

## Espaçamento e Layout
- Escala base 4px (`4, 8, 12, 16, 24, 32, 48, 64, 96`).
- Container máximo: `1200px`, padding lateral `24px` mobile / `48px` desktop.
- Radius: `8px` para cards/botões (não `rounded-full`, não `rounded-xl` grande — precisão, não "app fofo").
- Sombra: evitar `box-shadow` pesado. Separação por `border: 1px solid var(--line)` como padrão; sombra sutil (`0 1px 2px rgba(11,18,32,0.04)`) só em elementos flutuantes (dropdown, toast).

## Elemento de Assinatura
Um motivo de **linha fina conectando nós** (pontos pequenos ligados por traços de 1px, cor `line` ou `primary` em opacidade reduzida) aparece em exatamente dois lugares: atrás do Hero (sutil, quase imperceptível, não decorativo demais) e como separador visual entre a seção de Serviços e a de Segmentos — reforçando literalmente "conectar pontos diferentes" sem precisar dizer isso em palavras. Não repetir esse motivo em mais nenhum outro lugar do site — é assinatura, não papel de parede.

## Aplicação por Seção (referência rápida)
- **Hero:** fundo `paper`, headline em Space Grotesk `text-4xl`/`text-3xl` mobile, motivo de linha sutil atrás do texto.
- **Grid de Serviços:** cards com `border: 1px solid line`, sem sombra, título em Plex Sans 600, ícone opcional apenas se vetorial simples (sem ilustração 3D/gradiente).
- **Segmentos:** formato de lista/índice (não card grid genérico) — nome do segmento em mono `text-xs` uppercase como eyebrow, dor mapeada em `muted`. Estrutura de lista comunica "isto é uma referência", não "isto é uma vitrine".
- **Blog:** títulos de post em Space Grotesk, meta (data/tags) em Plex Mono `text-xs` — reforça consistência com o resto do site.
- **Contato:** botão primário sólido `primary`, nunca outline como CTA principal.

## Acessibilidade
- Contraste `ink` sobre `paper`: AAA. `primary` sobre `paper`: validar AA mínimo para texto (usar `primary-dark` se texto pequeno sobre fundo claro).
- Focus visível obrigatório em todo elemento interativo (`outline: 2px solid var(--primary)`, nunca `outline: none` sem substituto).