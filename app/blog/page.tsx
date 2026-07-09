import type { Metadata } from 'next';
import Link from 'next/link';

import { getAllPosts } from '@/lib/posts';
import { buildMetadata } from '@/lib/seo';

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'Radar Tech — Blog da VarTec',
    description: 'Opinião técnica sobre tecnologia, automação e integrações para pequenas e médias empresas.',
    path: '/blog',
  });
}

export default function BlogPage() {
  const allPosts = getAllPosts();

  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-10">Radar Tech</h1>
      <div className="grid gap-8">
        {allPosts.map((post) => (
          <article key={post.slug} className="border-b pb-6">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl text-gray-800 font-semibold hover:text-gray-600">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-500 text-sm mt-1">{post.date}</p>
            <p className="mt-2 text-gray-600">{post.description}</p>
            {post.tags.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
