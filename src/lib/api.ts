// Thin fetch wrapper used by module services (escrow, users, notifications,
// organizations, documents, reports, etc). Centralizes base URL, auth header
// injection, and JSON handling so individual services stay declarative.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

type QueryParams = Record<string, string | number | boolean | undefined>

function buildUrl(path: string, params?: QueryParams): string {
  const url = new URL(
    path.startsWith('http') ? path : `${API_BASE_URL}${path}`,
    window.location.origin,
  )

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.set(key, String(value))
    })
  }

  return url.toString()
}

function authHeaders(): HeadersInit {
  const token = localStorage.getItem('buildos_auth_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request<T>(
  method: string,
  path: string,
  options: { params?: QueryParams; body?: unknown } = {},
): Promise<T> {
  const response = await fetch(buildUrl(path, options.params), {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  })

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText)
    throw new Error(`API ${method} ${path} failed (${response.status}): ${message}`)
  }

  if (response.status === 204) return undefined as T

  return (await response.json()) as T
}

export const apiClient = {
  get: <T>(path: string, params?: QueryParams) => request<T>('GET', path, { params }),
  post: <T>(path: string, body?: unknown) => request<T>('POST', path, { body }),
  patch: <T>(path: string, body?: unknown) => request<T>('PATCH', path, { body }),
  put: <T>(path: string, body?: unknown) => request<T>('PUT', path, { body }),
  delete: <T>(path: string) => request<T>('DELETE', path),
}