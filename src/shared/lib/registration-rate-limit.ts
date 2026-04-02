const buckets = new Map<string, number[]>();

const MAX_TRACKED_IPS = 5000;

function pruneBuckets() {
  if (buckets.size <= MAX_TRACKED_IPS) return;
  buckets.clear();
}

/** Returns false if the IP exceeded maxHits within windowMs. */
export function allowRegistrationSubmit(ip: string, maxHits: number, windowMs: number): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;

  let hits = buckets.get(ip) ?? [];
  hits = hits.filter((t) => t > windowStart);

  if (hits.length >= maxHits) {
    buckets.set(ip, hits);
    return false;
  }

  hits.push(now);
  buckets.set(ip, hits);
  pruneBuckets();
  return true;
}

export function clientIpFromRequest(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;
  return 'unknown';
}
