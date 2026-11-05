const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
async function backendToken(): Promise<string | undefined> {
  try { const response = await fetch('/api/backend-token', { cache: 'no-store', credentials: 'include' }); if (!response.ok) return undefined; const data = await response.json(); return data.token as string; } catch { return undefined; }
}
export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await backendToken();
  const response = await fetch(`${API}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) }, cache: 'no-store' });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || `Request failed (${response.status})`);
  return data as T;
}
export type Book = { _id:string; title:string; author:string; category:string; image:string; description:string; copies:number; addedByName:string; addedByEmail:string; createdAt:string };
export type Borrow = { _id:string; bookId:string; bookTitle:string; bookImage:string; userEmail:string; borrowDate:string; returnDate:string };
