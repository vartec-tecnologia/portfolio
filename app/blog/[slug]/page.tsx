import Link from 'next/link';

import { getSortedPostsData } from '@/lib/posts';

export default function BlogPage() {
  const allPosts = getSortedPostsData();

  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-10">Radar Tech</h1>
      <div className="grid gap-8">
        {allPosts.map((post) => (
          <article key={post.id} className="border-b pb-6">
            <Link href={`/blog/${post.id}`}>
              <h2 className="text-2xl font-semibold hover:text-primary-500">{post.title}</h2>
            </Link>
            <p className="text-gray-500">{post.date}</p>
            <p className="mt-2 text-neutral-600">{post.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}