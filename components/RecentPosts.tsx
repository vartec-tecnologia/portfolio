import Link from 'next/link';

import { getAllPosts } from '@/lib/posts';

export default function RecentPosts() {
  const recentPosts = getAllPosts().slice(0, 3);

  if (recentPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold">Novidades Tech</h2>
        <Link href="/blog" className="text-primary-500 font-medium hover:underline text-sm">
          Ver todos →
        </Link>
      </div>
      <div className="grid gap-6">
        {recentPosts.map((post) => (
          <div key={post.slug} className="border-b pb-4">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <small className="text-gray-500">{post.date}</small>
            <p className="mt-2">{post.description}</p>
            <Link href={`/blog/${post.slug}`} className="text-primary-500 font-medium">
              Ler mais →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
