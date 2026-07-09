const segments = [
  { name: 'Clínicas', pains: ['Confirmação manual de consultas', 'Lembretes via WhatsApp'] },
  { name: 'Escritórios de advocacia', pains: ['Organização de documentos', 'Automação de contratos'] },
  { name: 'Imobiliárias', pains: ['Cadastro de imóveis', 'Atendimento via WhatsApp'] },
  { name: 'Lojas e Varejo', pains: ['Integração com estoque e ERP', 'Emissão de nota fiscal'] },
  { name: 'Empresas de engenharia', pains: ['Formulários e relatórios em campo', 'Fluxo de aprovações'] },
  { name: 'Contabilidades', pains: ['Processos repetitivos', 'Dependência de Excel'] },
  { name: 'Pequenas indústrias', pains: ['Controle de produção e estoque', 'Ordens de serviço'] },
  { name: 'Agências de marketing', pains: ['Parte técnica de sites e landing pages', 'Integrações com CRM'] },
];

export default function SegmentsGrid() {
  return (
    <section id="segmentos" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-display font-semibold text-center mb-4 text-ink">Quem a gente atende</h2>
      <p className="text-muted text-center max-w-2xl mx-auto mb-12">
        Sem cliente ideal único — se um desses desafios é seu, provavelmente já sabemos por onde começar.
      </p>
      <ul className="divide-y divide-line border-y border-line">
        {segments.map((segment, index) => (
          <li key={segment.name} className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:gap-8">
            <span className="font-mono text-xs uppercase tracking-wider text-primary sm:w-64 sm:shrink-0">
              {String(index + 1).padStart(2, '0')} — {segment.name}
            </span>
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {segment.pains.map((pain) => (
                <li key={pain} className="text-muted text-sm">
                  {pain}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
