const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

export async function api<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...init } = options;

  let url = `${API_BASE}${path}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail ?? `API error: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// Service-specific API functions
export const productsApi = {
  list: (params?: Record<string, string>) => api('/products', { params }),
  get: (id: string) => api(`/products/${id}`),
  variants: (id: string) => api(`/products/${id}/variants`),
  search: (query: string) => api('/products/search/autocomplete', { params: { q: query } }),
};

export const subscriptionsApi = {
  create: (data: unknown) => api('/subscriptions', { method: 'POST', body: JSON.stringify(data) }),
  get: (id: string) => api(`/subscriptions/${id}`),
  skip: (id: string) => api(`/subscriptions/${id}/skip`, { method: 'POST' }),
  swap: (id: string, data: unknown) => api(`/subscriptions/${id}/swap`, { method: 'POST', body: JSON.stringify(data) }),
  pause: (id: string) => api(`/subscriptions/${id}/pause`, { method: 'POST' }),
};

export const cartApi = {
  get: () => api('/cart'),
  addItem: (data: unknown) => api('/cart/items', { method: 'POST', body: JSON.stringify(data) }),
  checkout: (data: unknown) => api('/cart/checkout', { method: 'POST', body: JSON.stringify(data) }),
};

export const recommendationsApi = {
  quizQuestions: () => api('/recommendations/quiz-questions'),
  submitQuiz: (answers: unknown) => api('/recommendations/taste-quiz', { method: 'POST', body: JSON.stringify(answers) }),
  personalized: () => api('/recommendations/personalized'),
};
