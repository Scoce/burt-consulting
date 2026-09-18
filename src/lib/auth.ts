export const ADMIN_COOKIE_NAME = 'bc_admin_session';
export const SESSION_MAX_AGE_SECONDS = 30 * 24 * 60 * 60; // 30 days

export function getAdminSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('ADMIN_SECRET environment variable is missing in production.');
    }
    return 'burt-growth-2026-9d02e42a';
  }
  return secret;
}

export async function createSessionToken(): Promise<string> {
  const secret = getAdminSecret();
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const ts = Date.now().toString();
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(`${ts}:burt-admin`));
  const sigHex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `${ts}.${sigHex}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [tsStr, sigHex] = parts;
  const ts = parseInt(tsStr, 10);
  if (isNaN(ts)) return false;

  // Check expiration (30 days)
  const ageMs = Date.now() - ts;
  if (ageMs < 0 || ageMs > SESSION_MAX_AGE_SECONDS * 1000) {
    return false;
  }

  try {
    const secret = getAdminSecret();
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const expectedSig = await crypto.subtle.sign(
      'HMAC',
      key,
      enc.encode(`${tsStr}:burt-admin`)
    );
    const expectedHex = Array.from(new Uint8Array(expectedSig))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    if (sigHex.length !== expectedHex.length) return false;
    let result = 0;
    for (let i = 0; i < sigHex.length; i++) {
      result |= sigHex.charCodeAt(i) ^ expectedHex.charCodeAt(i);
    }
    return result === 0;
  } catch (err) {
    console.error('[auth] Token verification error:', err);
    return false;
  }
}

export function verifyPassword(inputPassword: string): boolean {
  const secret = getAdminSecret();
  if (inputPassword.length !== secret.length) return false;
  let result = 0;
  for (let i = 0; i < inputPassword.length; i++) {
    result |= inputPassword.charCodeAt(i) ^ secret.charCodeAt(i);
  }
  return result === 0;
}
