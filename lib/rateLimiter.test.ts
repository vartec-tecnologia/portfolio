import { describe, expect, it } from 'vitest';

import { createRateLimiter } from './rateLimiter';

describe('createRateLimiter', () => {
  it('permite até o limite máximo dentro da janela', () => {
    const isRateLimited = createRateLimiter({ max: 5, windowMs: 60 * 60 * 1000 });
    const now = Date.now();

    for (let i = 0; i < 5; i += 1) {
      expect(isRateLimited('1.2.3.4', now)).toBe(false);
    }
  });

  it('bloqueia a 6ª tentativa dentro da mesma janela de 1h', () => {
    const isRateLimited = createRateLimiter({ max: 5, windowMs: 60 * 60 * 1000 });
    const now = Date.now();

    for (let i = 0; i < 5; i += 1) {
      isRateLimited('1.2.3.4', now);
    }

    expect(isRateLimited('1.2.3.4', now)).toBe(true);
  });

  it('não bloqueia IPs diferentes entre si', () => {
    const isRateLimited = createRateLimiter({ max: 5, windowMs: 60 * 60 * 1000 });
    const now = Date.now();

    for (let i = 0; i < 5; i += 1) {
      isRateLimited('1.2.3.4', now);
    }

    expect(isRateLimited('5.6.7.8', now)).toBe(false);
  });

  it('libera novamente depois que a janela de 1h expira', () => {
    const isRateLimited = createRateLimiter({ max: 5, windowMs: 60 * 60 * 1000 });
    const start = Date.now();

    for (let i = 0; i < 5; i += 1) {
      isRateLimited('1.2.3.4', start);
    }

    expect(isRateLimited('1.2.3.4', start + 60 * 60 * 1000 + 1)).toBe(false);
  });
});
