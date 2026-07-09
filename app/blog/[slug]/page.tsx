import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';

import JsonLd from '@/components/JsonLd';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { buildArticleJsonLd, buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { content } = await compileMDX({ source: post.content });

  return (
    <main className="max-w-3xl mx-auto py-20 px-6">
      <Link href="/blog" className="text-primary hover:underline text-sm mb-8 inline-block">
        ← Voltar ao Blog
      </Link>
      <h1 className="text-3xl font-display font-semibold text-ink mb-2">{post.title}</h1>
      <p className="font-mono text-xs text-muted mb-10">{post.date}</p>
      <article className="prose max-w-none prose-headings:font-display prose-headings:text-ink prose-a:text-primary prose-strong:text-ink">
        {content}
      </article>
      <JsonLd
        data={buildArticleJsonLd({
          title: post.title,
          description: post.description,
          date: post.date,
          slug: post.slug,
          image: post.coverImage,
          author: post.author,
        })}
      />
    </main>
  );
}
