import { describe, expect, it } from 'vitest';

import { buildArticleJsonLd, buildMetadata, SITE_URL } from './seo';

describe('buildMetadata', () => {
  it('produz title, description e canonical corretos sem imagem', () => {
    const metadata = buildMetadata({
      title: 'Título de teste',
      description: 'Descrição de teste',
      path: '/blog/post-teste',
    });

    expect(metadata.title).toBe('Título de teste');
    expect(metadata.description).toBe('Descrição de teste');
    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/blog/post-teste`);
    expect(metadata.openGraph?.images).toBeUndefined();
    expect(metadata.twitter?.card).toBe('summary');
  });

  it('inclui imagem no Open Graph e Twitter Card quando informada', () => {
    const metadata = buildMetadata({
      title: 'Título com imagem',
      description: 'Descrição com imagem',
      path: '/blog/post-com-imagem',
      image: '/capa.png',
    });

    expect(metadata.openGraph?.images).toEqual([{ url: `${SITE_URL}/capa.png` }]);
    expect(metadata.twitter?.card).toBe('summary_large_image');
    expect(metadata.twitter?.images).toEqual([`${SITE_URL}/capa.png`]);
  });
});

describe('buildArticleJsonLd', () => {
  it('usa a imagem OG default e o nome da empresa quando o post não define image/author', () => {
    const jsonLd = buildArticleJsonLd({
      title: 'Post sem imagem',
      description: 'Descrição',
      date: '2026-01-01',
      slug: 'post-sem-imagem',
    });

    expect(jsonLd['@type']).toBe('Article');
    expect(jsonLd.headline).toBe('Post sem imagem');
    expect(jsonLd.url).toBe(`${SITE_URL}/blog/post-sem-imagem`);
    expect(jsonLd.image).toBe(`${SITE_URL}/opengraph-image`);
    expect(jsonLd.author).toEqual({ '@type': 'Organization', name: 'VarTec Soluções em Tecnologia' });
  });

  it('usa a imagem e o autor do post quando informados', () => {
    const jsonLd = buildArticleJsonLd({
      title: 'Post com imagem',
      description: 'Descrição',
      date: '2026-01-02',
      slug: 'post-com-imagem',
      image: '/capa-post.png',
      author: 'Rafael',
    });

    expect(jsonLd.image).toBe(`${SITE_URL}/capa-post.png`);
    expect(jsonLd.author).toEqual({ '@type': 'Organization', name: 'Rafael' });
  });
});
