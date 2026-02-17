// src/lib/api.ts
const API_BASE_URL = 'https://library-pro-backend-production.up.railway.app';

// সব API কলের জন্য একটা হেল্পার ফাংশন
export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

// উদাহরণ: সদস্য লিস্ট ফেচ করা
export async function getMembers() {
  return apiFetch<{ id: number; name: string }[]>('/members');
}

// বই লিস্ট
export async function getBooks() {
  return apiFetch<{ id: number; title: string; author: string }[]>('/books');
}

// ধার লিস্ট
export async function getBorrows() {
  return apiFetch<any[]>('/borrows');
}