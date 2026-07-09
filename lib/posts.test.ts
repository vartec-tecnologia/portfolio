import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { getAllPosts, getAllTags, getPostBySlug } from './posts';

let fixtureDir: string;

beforeAll(() => {
  fixtureDir = fs.mkdtempSync(path.join(os.tmpdir(), 'posts-test-'));

  fs.writeFileSync(
    path.join(fixtureDir, 'post-a.md'),
    `---
title: "Post A"
description: "Descrição do post A"
date: "2026-01-01"
slug: "post-a"
tags: ["Automação"]
---
Conteúdo do post A.
`
  );

  fs.writeFileSync(
    path.join(fixtureDir, 'post-b-draft.md'),
    `---
title: "Post B (draft)"
description: "Descrição do post B"
date: "2026-03-01"
slug: "post-b-draft"
tags: ["IA", "Automação"]
draft: true
---
Conteúdo do post B.
`
  );

  fs.writeFileSync(
    path.join(fixtureDir, 'post-c.md'),
    `---
title: "Post C"
description: "Descrição do post C"
date: "2026-02-01"
slug: "post-c"
---
Conteúdo do post C.
`
  );

  fs.writeFileSync(
    path.join(fixtureDir, 'post-invalido.md'),
    `---
title: "Post sem slug nem date"
description: "Frontmatter incompleto"
---
Não deveria ser incluído.
`
  );
});

afterAll(() => {
  fs.rmSync(fixtureDir, { recursive: true, force: true });
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe('getAllPosts', () => {
  it('ordena por data desc e inclui drafts fora de produção', () => {
    vi.stubEnv('NODE_ENV', 'development');

    const posts = getAllPosts(fixtureDir);

    expect(posts.map((post) => post.slug)).toEqual(['post-b-draft', 'post-c', 'post-a']);
  });

  it('filtra posts com draft: true em produção', () => {
    vi.stubEnv('NODE_ENV', 'production');

    const posts = getAllPosts(fixtureDir);

    expect(posts.map((post) => post.slug)).toEqual(['post-c', 'post-a']);
  });

  it('exclui posts com frontmatter inválido e loga aviso, sem quebrar', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const posts = getAllPosts(fixtureDir);

    expect(posts.find((post) => post.title === 'Post sem slug nem date')).toBeUndefined();
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('post-invalido.md'),
      expect.anything()
    );
  });

  it('aplica o default draft: false quando o campo não é definido', () => {
    vi.stubEnv('NODE_ENV', 'production');

    const posts = getAllPosts(fixtureDir);
    const postC = posts.find((post) => post.slug === 'post-c');

    expect(postC?.draft).toBe(false);
  });
});

describe('getPostBySlug', () => {
  it('retorna o post quando o slug existe', () => {
    const post = getPostBySlug('post-a', fixtureDir);
    expect(post?.title).toBe('Post A');
  });

  it('retorna null quando o slug não existe', () => {
    const post = getPostBySlug('slug-que-nao-existe', fixtureDir);
    expect(post).toBeNull();
  });
});

describe('getAllTags', () => {
  it('retorna tags únicas e ordenadas dos posts', () => {
    vi.stubEnv('NODE_ENV', 'development');

    expect(getAllTags(fixtureDir)).toEqual(['Automação', 'IA']);
  });
});
