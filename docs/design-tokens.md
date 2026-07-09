# Design Tokens

Referência única de cores, tipografia e espaçamentos do projeto. Qualquer valor customizado usado em `tailwind.config.ts` deve estar documentado aqui — nunca hardcoded inline nos componentes (`text-[#123456]` é proibido, conforme `CLAUDE.md`).

**Status: placeholder provisório.** Rafael ainda não definiu a paleta final da marca — os valores abaixo são os que já estavam em uso em `tailwind.config.ts` antes desta spec, apenas documentados aqui como ponto de partida. Devem ser substituídos quando a identidade visual for definida.

## Cores

| Token | Valor | Uso |
|---|---|---|
| `primary-500` | `#2563eb` | Cor de destaque (links, CTAs) |
| `primary-600` | `#1d4ed8` | Hover de destaque |
| `neutral-800` | `#1f2937` | Texto principal |
| `neutral-600` | `#4b5563` | Texto secundário |

## Tipografia

| Token | Valor |
|---|---|
| `fontFamily.sans` | `Inter, sans-serif` |

## Espaçamento

Nenhum token customizado de espaçamento definido ainda — usar a escala padrão do Tailwind até haver necessidade documentada aqui.

## Como atualizar

1. Definir o novo valor aqui primeiro.
2. Refletir o mesmo valor em `tailwind.config.ts` (`theme.extend`).
3. Nunca declarar o valor direto em um componente — sempre via classe Tailwind que referencia o token.
