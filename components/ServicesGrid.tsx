const services = [
  {
    title: 'Desenvolvimento sob medida',
    description: 'Sistemas e sites construídos para o seu processo, não o contrário.',
    example: 'Ex: sistema interno de ordens de serviço para pequenas indústrias.',
  },
  {
    title: 'Integrações e Automações',
    description: 'Conectamos os sistemas que você já usa e eliminamos o copiar-e-colar manual.',
    example: 'Ex: confirmação e lembrete de consulta via WhatsApp para clínicas.',
  },
  {
    title: 'Dashboards',
    description: 'Visão clara dos dados que importam, sem depender de planilha manual.',
    example: 'Ex: painel de estoque e vendas para lojas e varejo.',
  },
  {
    title: 'Aplicativos',
    description: 'Apps que resolvem um fluxo específico do seu negócio.',
    example: 'Ex: app de vistoria com fotos para empresas de engenharia.',
  },
  {
    title: 'APIs',
    description: 'Integrações sob medida entre os sistemas que sua empresa já usa.',
    example: 'Ex: API entre portal imobiliário e CRM para imobiliárias.',
  },
];

export default function ServicesGrid() {
  return (
    <section id="servicos" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800">Nossas Soluções</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.title} className="p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition">
            <h3 className="text-gray-800 text-xl font-semibold mb-3">{service.title}</h3>
            <p className="text-gray-600 mb-3">{service.description}</p>
            <p className="text-gray-500 text-sm">{service.example}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
