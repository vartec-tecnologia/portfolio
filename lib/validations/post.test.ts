import { describe, expect, it } from 'vitest';

import { postFrontmatterSchema } from './post';

describe('postFrontmatterSchema', () => {
  it('aceita um frontmatter válido completo', () => {
    const result = postFrontmatterSchema.safeParse({
      title: 'Título',
      description: 'Descrição',
      date: '2026-01-01',
      slug: 'titulo',
      tags: ['Automação'],
      coverImage: '/covers/titulo.png',
      author: 'Rafael',
      draft: true,
    });

    expect(result.success).toBe(true);
  });

  it('aceita frontmatter mínimo e aplica os defaults documentados no CLAUDE.md', () => {
    const result = postFrontmatterSchema.safeParse({
      title: 'Título',
      description: 'Descrição',
      date: '2026-01-01',
      slug: 'titulo',
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.tags).toEqual([]);
      expect(result.data.draft).toBe(false);
      expect(result.data.author).toBe('VarTec Soluções em Tecnologia');
    }
  });

  it('rejeita quando falta um campo obrigatório (slug)', () => {
    const result = postFrontmatterSchema.safeParse({
      title: 'Título',
      description: 'Descrição',
      date: '2026-01-01',
    });

    expect(result.success).toBe(false);
  });

  it('rejeita quando date não é uma data válida', () => {
    const result = postFrontmatterSchema.safeParse({
      title: 'Título',
      description: 'Descrição',
      date: 'não é uma data',
      slug: 'titulo',
    });

    expect(result.success).toBe(false);
  });

  it('rejeita quando title está vazio', () => {
    const result = postFrontmatterSchema.safeParse({
      title: '',
      description: 'Descrição',
      date: '2026-01-01',
      slug: 'titulo',
    });

    expect(result.success).toBe(false);
  });
});
