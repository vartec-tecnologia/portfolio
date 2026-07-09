export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
        Um parceiro técnico para o <span className="text-blue-600">ciclo completo</span> da sua tecnologia.
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mb-8">
        Da automação mais simples ao produto mais complexo — contato direto com quem desenvolve, com soluções sob medida em vez de pacote pronto.
      </p>
      <div className="flex gap-4">
        <a
          href="#contato"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Falar com a gente
        </a>
        <a
          href="#servicos"
          className="text-gray-600 border border-gray-400 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Ver soluções
        </a>
      </div>
    </section>
  );
}
