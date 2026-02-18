// 認証ユーティリティ（localStorageベース）

const AUTH_KEY = 'enpitsu_admin_auth';
const CREDENTIALS = { id: 'admin', password: 'enpitsu2026' };

export function login(id: string, password: string): boolean {
  if (id === CREDENTIALS.id && password === CREDENTIALS.password) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ id, loggedInAt: Date.now() }));
    }
    return true;
  }
  return false;
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(AUTH_KEY) !== null;
}

export function getUser(): { id: string; loggedInAt: number } | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(AUTH_KEY);
  if (!data) return null;
  try { return JSON.parse(data); } catch { return null; }
}
