const services = [
  { title: "Desenvolvimento Web", desc: "Sites institucionais e plataformas focadas em performance." },
  { title: "SaaS & Aplicações", desc: "Sistemas complexos escaláveis com arquitetura moderna." },
  { title: "Automação", desc: "Redução de tarefas manuais com integrações inteligentes." },
];

export default function Services() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800">Nossas Soluções</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <div key={i} className="p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition">
            <h3 className="text-gray-600 text-xl font-semibold mb-4">{s.title}</h3>
            <p className="text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}