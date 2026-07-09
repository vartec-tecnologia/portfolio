# Spec 00 — Auditoria do Projeto Existente

## Objetivo
O site já foi iniciado antes da criação destes documentos. Antes de qualquer implementação nova, mapear o estado atual do código contra `CLAUDE.md`, `product.md`, `architecture.md` e as specs 01-05, produzindo um relatório de gaps que direciona o que precisa ser criado, ajustado ou refeito — em vez de tratar o projeto como greenfield.

## Escopo

### 1. Inventário estrutural
- Comparar `/app`, `/components`, `/content`, `/lib`, `/public` reais contra a "Arquitetura de Pastas" do `CLAUDE.md`.
- Listar arquivos/pastas que existem mas não estão documentados (podem indicar decisão tomada informalmente — perguntar a Rafael antes de remover).
- Listar arquivos/pastas esperados que não existem.

### 2. Conformidade de stack
- Confirmar versões reais (Next.js, TypeScript, Tailwind) via `package.json` contra o que está no `CLAUDE.md`. Divergência de versão major → reportar, não corrigir sem confirmação.
- Verificar se Zod, `gray-matter`, `next-mdx-remote` já estão instalados e em uso.

### 3. Gap report por spec
Para cada spec (01-setup, 02-seo-base, 03-home, 04-blog, 05-contato), avaliar os "Critérios de Aceite" um a um contra o código existente e classificar:
- ✅ **Implementado e conforme** — nada a fazer.
- ⚠️ **Implementado mas divergente** — existe, mas não segue o padrão documentado (ex: metadata hardcoded em vez de usar `buildMetadata`). Registrar o que precisa mudar.
- ❌ **Não implementado** — segue normalmente para a spec correspondente.

### 4. Dívidas técnicas específicas a verificar
- Formulário de contato: já valida input? Já trata erro do webhook sem expor detalhe ao usuário? (ponto que Rafael mencionou estar mexendo antes desta sessão — provável fonte de gaps).
- SEO: existe algum `generateMetadata`, sitemap ou JSON-LD hoje? Ou é a maior lacuna?
- Design tokens: cores/tipografia já seguem algum padrão consistente ou estão espalhadas/inconsistentes pelo código?

## Entregável
Arquivo `docs/audit-report.md`, com uma seção por spec listando ✅/⚠️/❌ e, para cada ⚠️/❌, uma linha de ação objetiva (ex: "Extrair metadata hardcoded de `/app/page.tsx` para `buildMetadata`").

## Critérios de Aceite
- [ ] `docs/audit-report.md` criado e cobre as 5 specs + inventário estrutural.
- [ ] Nenhuma alteração de código feita nesta etapa — auditoria é só leitura/diagnóstico.
- [ ] `tasks.md` atualizado com o status real de cada spec (Concluído / Parcial / Não iniciado) a partir do gap report, substituindo o status genérico inicial.
- [ ] Itens ⚠️ (divergentes) sinalizados explicitamente para decisão de Rafael antes de refatorar — não corrigir silenciosamente.

## Fora de Escopo
- Qualquer correção de código (é insumo para as specs 01-05, não parte desta).
- Decidir sozinho se um gap é "aceitável" — reportar e deixar a decisão de priorização com Rafael.

## Dependências
Nenhuma — primeira spec.