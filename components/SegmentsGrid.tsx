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
    <section id="segmentos" className="py-20 px-6 max-w-6xl mx-auto bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-4 text-neutral-800">Quem a gente atende</h2>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
        Sem cliente ideal único — se um desses desafios é seu, provavelmente já sabemos por onde começar.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {segments.map((segment) => (
          <div key={segment.name} className="p-6 border border-gray-200 rounded-2xl bg-white">
            <h3 className="text-gray-800 font-semibold mb-3">{segment.name}</h3>
            <ul className="space-y-1">
              {segment.pains.map((pain) => (
                <li key={pain} className="text-gray-500 text-sm">
                  • {pain}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
