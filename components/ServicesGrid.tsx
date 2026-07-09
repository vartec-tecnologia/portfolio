import { ConnectorMotif } from './ConnectorMotif';

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
      <h2 className="text-2xl font-display font-semibold text-center mb-12 text-ink">Nossas Soluções</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.title} className="p-8 border border-line rounded-lg">
            <h3 className="text-ink text-xl font-body font-semibold mb-3">{service.title}</h3>
            <p className="text-muted mb-3">{service.description}</p>
            <p className="text-muted text-sm">{service.example}</p>
          </div>
        ))}
      </div>
      {/* Separador — segundo (e último) uso do ConnectorMotif previsto em design-tokens.md */}
      <div className="relative mt-16 h-12 w-full overflow-hidden" aria-hidden="true">
        <ConnectorMotif className="absolute inset-0 h-full w-full text-primary/10" />
      </div>
    </section>
  );
}
