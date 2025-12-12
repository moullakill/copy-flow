// Configuration centralisée de l'API backend
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

// Helper pour construire les URLs d'API
export const apiUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
};

// Client API avec configuration par défaut
export const apiFetch = async (
  path: string,
  options: RequestInit = {}
): Promise<Response> => {
  const url = apiUrl(path);
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Ajouter le token d'authentification si présent
  const token = localStorage.getItem('submity_auth_token');
  if (token) {
    (defaultHeaders as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
};
