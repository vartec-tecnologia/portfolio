interface RateLimiterOptions {
  max: number;
  windowMs: number;
}

export function createRateLimiter({ max, windowMs }: RateLimiterOptions) {
  const submissionsByKey = new Map<string, number[]>();

  return function isRateLimited(key: string, now: number = Date.now()): boolean {
    const recent = (submissionsByKey.get(key) ?? []).filter((timestamp) => now - timestamp < windowMs);

    if (recent.length >= max) {
      submissionsByKey.set(key, recent);
      return true;
    }

    recent.push(now);
    submissionsByKey.set(key, recent);
    return false;
  };
}
