import { ConnectorMotif } from './ConnectorMotif';

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] overflow-hidden px-6 text-center">
      <ConnectorMotif className="pointer-events-none absolute inset-0 h-full w-full text-line/60" />
      <h1 className="relative text-3xl md:text-4xl font-display font-semibold text-ink mb-6">
        Um parceiro técnico para o <span className="text-primary">ciclo completo</span> da sua tecnologia.
      </h1>
      <p className="relative text-lg text-muted max-w-2xl mb-8">
        Da automação mais simples ao produto mais complexo — contato direto com quem desenvolve, com soluções sob medida em vez de pacote pronto.
      </p>
      <div className="relative flex gap-4">
        <a
          href="#contato"
          className="bg-primary text-paper px-8 py-3 rounded-lg font-body font-semibold hover:bg-primary-dark transition"
        >
          Falar com a gente
        </a>
        <a
          href="#servicos"
          className="text-ink border border-line px-8 py-3 rounded-lg font-body font-semibold hover:bg-line/30 transition"
        >
          Ver soluções
        </a>
      </div>
    </section>
  );
}
