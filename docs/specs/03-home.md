# Spec 03 — Home

## Objetivo
Página inicial que funciona como vitrine dos 5 serviços conectados aos segmentos-alvo (conforme `product.md`), com prova de conteúdo (posts recentes) e caminho direto para conversão (form de contato).

## Escopo

### Seções (em ordem)
1. **Hero** — proposta de valor central (baseada no diferencial do `product.md`: parceiro técnico único para o ciclo completo). CTA principal aponta para o form de contato (âncora na própria página, conforme decisão de manter form só na Home).
2. **Grid de Serviços** — os 5 serviços (`Desenvolvimento sob medida`, `Integrações/Automações`, `Dashboards`, `Aplicativos`, `APIs`), sem hierarquia visual entre eles (nenhum é "carro-chefe").
3. **Segmentos** — grid ou carrossel dos 8 segmentos do `product.md`, cada um com 1-2 dores mapeadas como bullet curto. Objetivo: visitante se reconhece rápido (decisão já tomada no `product.md`).
4. **Posts Recentes** — 3 últimos posts publicados (`getAllPosts().slice(0,3)`), cada card linkando para `/blog/[slug]`.
5. **Formulário de Contato** — componente `<ContactForm />` (implementado na Spec 04), com campo de assunto (orçamento / agendamento / dúvida) conforme `product.md`.

### Componentes novos
- `/components/Hero.tsx`
- `/components/ServicesGrid.tsx`
- `/components/SegmentsGrid.tsx`
- `/components/RecentPosts.tsx`

## Critérios de Aceite
- [ ] Todas as 5 seções renderizam com dados reais (não lorem ipsum) do `product.md`.
- [ ] Grid de Serviços não sugere hierarquia (mesmo tamanho/peso visual entre os 5 itens).
- [ ] Segmentos exibem pelo menos 1 dor mapeada por item.
- [ ] Posts recentes puxam de `getAllPosts()` — se não houver posts publicados ainda, seção não quebra (estado vazio tratado, ex: seção oculta ou placeholder discreto).
- [ ] `generateMetadata` da Home usa `buildMetadata` (Spec 01).
- [ ] Mobile-first: grids colapsam para 1 coluna em telas pequenas (`md:` breakpoint conforme `CLAUDE.md`).
- [ ] Lighthouse SEO score ≥ 95 em ambiente local.

## Fora de Escopo
- Página `/contato` dedicada (decisão tomada: form só na Home para v1).
- Depoimentos/cases de clientes (fora de escopo conforme `product.md`).

## Dependências
Spec 02 (SEO Base) concluída — **e Spec 06 (Design System) aplicada retroativamente, ver nota abaixo.** Spec 05 (Contato) precisa do componente `<ContactForm />` disponível — pode ser desenvolvida em paralelo, mas a Home só fica 100% funcional após ambas.