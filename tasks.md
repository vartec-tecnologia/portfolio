# tasks.md

Índice de specs do portfólio. **O projeto já foi iniciado** — a spec 00 (Auditoria) é obrigatória antes de qualquer outra, para não recriar o que já existe nem ignorar divergências no código atual.

| # | Spec | Descrição | Status |
|---|---|---|---|
| 00 | [Auditoria](docs/specs/00-auditoria.md) | Mapear código existente vs. CLAUDE.md/architecture.md/specs, gerar gap report | Concluído — ver [docs/audit-report.md](docs/audit-report.md) |
| 01 | [Setup do Projeto](docs/specs/01-setup.md) | Scaffolding/ajustes conforme gap report da auditoria | Concluído — não commitado, aguardando revisão de Rafael |
| 02 | [SEO Base](docs/specs/02-seo-base.md) | Helpers de metadata, JSON-LD, sitemap, robots | Concluído — não commitado, aguardando revisão de Rafael |
| 03 | [Home](docs/specs/03-home.md) | Hero, grid de serviços por segmento, lista de posts, form de contato | Concluído — não commitado, aguardando revisão de Rafael |
| 04 | [Blog](docs/specs/04-blog.md) | Listagem e página de post individual (MDX) | Concluído — não commitado, aguardando revisão de Rafael |
| 05 | [Contato](docs/specs/05-contato.md) | Server Action, validação, webhook, rate limiting | Concluído — não commitado, aguardando revisão de Rafael |

## Convenção de Status
- **Aguardando auditoria** — status provisório, será substituído por um dos abaixo assim que a spec 00 gerar `docs/audit-report.md`.
- **Não iniciado** — confirmado pela auditoria que nada foi implementado.
- **Parcial** — auditoria encontrou implementação divergente do documentado (ver `docs/audit-report.md` para detalhes).
- **Concluído** — critérios de aceite validados (implementado conforme spec, `next build` passa, testes de `/lib` cobrindo o escopo). Não implica commit — CLAUDE.md proíbe commit automático, então "Concluído" pode significar diff pronto no working tree aguardando revisão de Rafael.

## Notas de Sequenciamento
- Spec 00 (Auditoria) é bloqueante — nenhuma outra spec deve começar antes do gap report existir, mesmo que pareça óbvio que algo falta.
- Spec 02 (SEO Base) precisa existir/estar conforme antes de 03 e 04, pois ambas consomem os helpers de metadata/JSON-LD.
- Spec 05 (Contato) pode ser desenvolvida em paralelo a 04 (Blog) — não há dependência direta, só compartilham a Home como ponto de entrada visual.

## Próximo Passo
Specs 00-05 implementadas nesta sessão (working tree, nada commitado). Rafael precisa revisar o diff acumulado e decidir o que commitar — em especial confirmar a rotação do webhook do Make exposto no histórico do Git (achado crítico do `docs/audit-report.md`) antes de dar push em qualquer coisa relacionada ao contato.
