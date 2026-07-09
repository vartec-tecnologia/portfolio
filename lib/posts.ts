import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { z } from 'zod';

import { postFrontmatterSchema, type PostFrontmatter } from './validations/post';

const postsDirectory = path.join(process.cwd(), 'content');

export interface Post extends PostFrontmatter {
  content: string;
}

function readPost(dir: string, fileName: string): Post | null {
  const fullPath = path.join(dir, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const parsed = postFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    console.warn(
      `[posts] Frontmatter inválido em "${fileName}", post ignorado:`,
      z.treeifyError(parsed.error)
    );
    return null;
  }

  return { ...parsed.data, content };
}

export function getAllPosts(dir: string = postsDirectory): Post[] {
  const fileNames = fs.readdirSync(dir).filter((name) => name.endsWith('.md') || name.endsWith('.mdx'));

  const posts = fileNames
    .map((fileName) => readPost(dir, fileName))
    .filter((post): post is Post => post !== null)
    .filter((post) => (process.env.NODE_ENV === 'production' ? !post.draft : true));

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string, dir: string = postsDirectory): Post | null {
  return getAllPosts(dir).find((post) => post.slug === slug) ?? null;
}

export function getAllTags(dir: string = postsDirectory): string[] {
  const tags = new Set<string>();
  getAllPosts(dir).forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}
