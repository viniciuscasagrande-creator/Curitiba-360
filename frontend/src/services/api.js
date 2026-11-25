const API_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:3000/api'

export async function apiRequest(
  endpoint,
  options = {}
) {
  const token =
    localStorage.getItem('curitiba360_token')

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token
          ? {
              Authorization: `Bearer ${token}`
            }
          : {}),
        ...options.headers
      }
    }
  )

  if (!response.ok) {
    throw new Error(
      'Erro ao comunicar com a API.'
    )
  }

  return response.json()
}

const api = {
  get: (url, config) => apiRequest(url, { method: 'GET', ...config }),
  post: (url, data, config) => apiRequest(url, { method: 'POST', body: JSON.stringify(data), ...config }),
  put: (url, data, config) => apiRequest(url, { method: 'PUT', body: JSON.stringify(data), ...config }),
  delete: (url, config) => apiRequest(url, { method: 'DELETE', ...config })
}

export default api;