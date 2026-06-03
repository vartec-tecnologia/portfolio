export default function ContactForm() {
  async function submitForm(formData: FormData) {
    "use server";
    const data = {
      nome: formData.get("nome"),
      email: formData.get("email"),
      mensagem: formData.get("mensagem"),
      date: new Date().toISOString(),
    };

    try {
      const webhookUrl = "https://hook.us2.make.com/ijgyku6ub35g1iibvhc7g9nyop9pk6k1";
      
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      console.log("Lead enviado para o Make com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar para o Webhook:", error);
    }
  }

  return (
    <section id="contato" className="py-20 bg-gray-50 px-6">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Vamos construir algo?</h2>
        <form action={submitForm} className="flex flex-col gap-4">
          <input name="nome" type="text" placeholder="Seu nome" className="p-3 border rounded-lg" required />
          <input name="email" type="email" placeholder="Seu melhor e-mail" className="p-3 border rounded-lg" required />
          <textarea name="mensagem" placeholder="Como posso te ajudar?" className="p-3 border rounded-lg h-32" required />
          <button type="submit" className="bg-primary-500 text-white p-3 rounded-lg font-bold hover:bg-primary-600">
            Enviar Proposta
          </button>
        </form>
      </div>
    </section>
  );
}