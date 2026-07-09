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
      <h1 className="text-3xl font-display font-semibold text-ink mb-10">Radar Tech</h1>
      <div className="grid gap-8">
        {allPosts.map((post) => (
          <article key={post.slug} className="border-b border-line pb-6">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-display font-semibold text-ink hover:text-primary transition">
                {post.title}
              </h2>
            </Link>
            <p className="font-mono text-xs text-muted mt-1">{post.date}</p>
            <p className="mt-2 text-muted">{post.description}</p>
            {post.tags.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {post.tags.map((tag) => (
                  <span key={tag} className="font-mono text-xs text-muted bg-line/40 px-2 py-1 rounded-lg">
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
