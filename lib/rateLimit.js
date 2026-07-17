const store = new Map(); // "bucket:ip" → { count, resetAt }

const WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX       = 5;

export function checkRateLimit(ip, bucket = 'default', { max = MAX, windowMs = WINDOW_MS } = {}) {
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1 };
  }

  if (entry.count >= max) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: max - entry.count };
}

export function getClientIp(req) {
  return (
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    '127.0.0.1'
  );
}
