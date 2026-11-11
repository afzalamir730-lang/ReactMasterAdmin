// All API requests are kept here so pages do not repeat fetch() code.
const API_URL = 'http://localhost:3001';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!response.ok) throw new Error(`API request failed (${response.status})`);
  if (response.status === 204) return null;
  return response.json();
}

export const studentApi = {
  getAll: () => request('/students'),
  create: (student) => request('/students', { method: 'POST', body: JSON.stringify(student) }),
  update: (id, student) => request(`/students/${id}`, { method: 'PUT', body: JSON.stringify(student) }),
  remove: (id) => request(`/students/${id}`, { method: 'DELETE' }),
};

export const courseApi = {
  getAll: () => request('/courses'),
};
