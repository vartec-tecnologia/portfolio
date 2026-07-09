import type { Metadata } from 'next';

export const SITE_NAME = 'VarTec Soluções em Tecnologia';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

interface BuildMetadataParams {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function buildMetadata({ title, description, path, image }: BuildMetadataParams): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const ogImage = image ? new URL(image, SITE_URL).toString() : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: new URL('/barbaetec-logo-log.png', SITE_URL).toString(),
  };
}

interface ArticleJsonLdInput {
  title: string;
  description: string;
  date: string;
  slug: string;
  image?: string;
  author?: string;
}

export function buildArticleJsonLd(post: ArticleJsonLdInput) {
  const url = new URL(`/blog/${post.slug}`, SITE_URL).toString();
  const image = post.image
    ? new URL(post.image, SITE_URL).toString()
    : new URL('/opengraph-image', SITE_URL).toString();

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    image,
    url,
    mainEntityOfPage: url,
    author: {
      '@type': 'Organization',
      name: post.author ?? SITE_NAME,
    },
  };
}
