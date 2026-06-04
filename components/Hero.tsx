export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
        Soluções Digitais que <span className="text-blue-600">Impulsionam</span> seu Negócio.
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mb-8">
        Desenvolvemos sites, SaaS e automações inteligentes para otimizar seus processos e aumentar sua escala.
      </p>
      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Ver Portfólio
        </button>
        <button className="text-gray-600 border border-gray-400 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Falar com um especialista
        </button>
      </div>
    </section>
  );
}
