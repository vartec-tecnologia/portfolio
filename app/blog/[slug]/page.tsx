import Link from 'next/link';
import { compileMDX } from 'next-mdx-remote/rsc';

import { getPostData, getSortedPostsData } from '@/lib/posts';

export function generateStaticParams() {
  return getSortedPostsData().map((post) => ({ slug: post.id }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { content: rawContent, title, date } = getPostData(slug);

  const { content } = await compileMDX({ source: rawContent });

  return (
    <main className="max-w-3xl mx-auto py-20 px-6">
      <Link href="/blog" className="text-primary-500 hover:underline text-sm mb-8 inline-block">
        ← Voltar ao Blog
      </Link>
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-gray-500 text-sm mb-10">{date}</p>
      <article className="prose max-w-none">
        {content}
      </article>
    </main>
  );
}
