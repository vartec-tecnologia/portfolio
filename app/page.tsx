import Link from 'next/link';

import ContactForm from '@/components/ContactForm';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import { getSortedPostsData } from '@/lib/posts';

export default function Home() {
  const recentPosts = getSortedPostsData().slice(0, 3);

  return (
    <main>
      <Hero />
      <Services />

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold">Novidades Tech</h2>
          <Link href="/blog" className="text-primary-500 font-medium hover:underline text-sm">
            Ver todos →
          </Link>
        </div>
        <div className="grid gap-6">
          {recentPosts.map(({ id, title, date, description }) => (
            <div key={id} className="border-b pb-4">
              <h3 className="text-xl font-semibold">{title}</h3>
              <small className="text-gray-500">{date}</small>
              <p className="mt-2">{description}</p>
              <Link href={`/blog/${id}`} className="text-primary-500 font-medium">Ler mais →</Link>
            </div>
          ))}
        </div>
      </section>
      <ContactForm />
    </main>
  );
}