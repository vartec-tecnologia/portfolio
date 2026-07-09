# tasks.md

Índice de specs do portfólio. Numeração = ordem de criação, não necessariamente ordem de execução (a Spec 06 nasceu depois de 03-05 já terem sido implementadas — ver nota de retrofit nela).

| # | Spec | Descrição | Status |
|---|---|---|---|
| 00 | [Auditoria](docs/specs/00-auditoria.md) | Mapear código existente vs. CLAUDE.md/architecture.md/specs, gerar gap report | **Concluído** |
| 01 | [Setup do Projeto](docs/specs/01-setup.md) | Scaffolding/ajustes conforme gap report da auditoria | **Concluído** |
| 02 | [SEO Base](docs/specs/02-seo-base.md) | Helpers de metadata, JSON-LD, sitemap, robots | **Concluído** |
| 03 | [Home](docs/specs/03-home.md) | Hero, grid de serviços por segmento, lista de posts, form de contato | Concluído (visual desatualizado — ver Spec 06) |
| 04 | [Blog](docs/specs/04-blog.md) | Listagem e página de post individual (MDX) | Concluído (visual desatualizado — ver Spec 06) |
| 05 | [Contato](docs/specs/05-contato.md) | Server Action, validação, webhook, rate limiting | Concluído |
| 06 | [Design System](docs/specs/06-design-system.md) | Fontes (next/font), tokens no Tailwind, Logo revisada, motivo de conexão, **retrofit de 03/04/05** | Não iniciado |

## Convenção de Status
- **Não iniciado** — nada implementado.
- **Parcial** — implementação diverge do documentado.
- **Concluído** — critérios de aceite validados (implementado conforme spec, `next build` passa, testes de `/lib` cobrindo o escopo).
- **Concluído (visual desatualizado)** — funcionalmente pronto, mas usa o sistema visual antigo (pré-Spec 06); precisa de retrofit, não de reimplementação.

## Próximo Passo
1. Atualizar `docs/design-tokens.md` no repo (substituir o placeholder pela versão com os tokens reais).
2. Adicionar `docs/specs/06-design-system.md` ao repo.
3. Rodar a auditoria de consistência visual → gera `docs/design-audit-report.md`.
4. Revisar o relatório antes de decidir o que a Spec 06 precisa corrigir em 03/04/05.