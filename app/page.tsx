import ContactForm from '@/components/ContactForm';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import { getSortedPostsData } from '@/lib/posts';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <main>
      <Hero />
      <Services />
      
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Novidades Tech</h2>
        <div className="grid gap-6">
          {allPostsData.map(({ id, title, date, description }) => (
            <div key={id} className="border-b pb-4">
              <h3 className="text-xl font-semibold">{title}</h3>
              <small className="text-gray-500">{date}</small>
              <p className="mt-2">{description}</p>
              <a href={`/blog/${id}`} className="text-primary-500 font-medium">Ler mais →</a>
            </div>
          ))}
        </div>
      </section>
      <ContactForm />
    </main>
  );
}