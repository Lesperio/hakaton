const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
/** International-style phone: digits and common separators, 10–20 significant digits */
const PHONE_RE = /^[+()\s.\-0-9]{10,32}$/;
const URL_RE = /^https?:\/\/\S+$/i;
const MAX_BODY_CHARS = 24_000;

export const LIMITS = {
  teamName: 120,
  captainName: 120,
  captainGroup: 40,
  email: 254,
  phone: 32,
  projectLink: 500,
  memberField: { fullName: 120, group: 40, role: 80 },
  maxMembers: 4,
} as const;

export function parseJsonBody(raw: string): { ok: true; value: unknown } | { ok: false; message: string } {
  if (raw.length > MAX_BODY_CHARS) {
    return { ok: false, message: 'Слишком большой запрос' };
  }
  try {
    return { ok: true, value: JSON.parse(raw) as unknown };
  } catch {
    return { ok: false, message: 'Некорректные данные' };
  }
}

export function isValidEmail(s: string): boolean {
  return s.length <= LIMITS.email && EMAIL_RE.test(s);
}

export function isValidPhone(s: string): boolean {
  if (s.length > LIMITS.phone || !PHONE_RE.test(s)) return false;
  const digits = s.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

export function isValidProjectLink(s: string): boolean {
  return s.length <= LIMITS.projectLink && URL_RE.test(s);
}
