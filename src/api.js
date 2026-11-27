const API_URL = 'http://localhost:3001'

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  if (response.status === 204) return null
  return response.json()
}

export const api = {
  getTasks: () => request('/tasks?_sort=dueDate'),
  getTask: (id) => request(`/tasks/${id}`),
  createTask: async (task) => {
    const created = await request('/tasks', { method: 'POST', body: JSON.stringify(task) })
    window.dispatchEvent(new Event('tasks:changed'))
    return created
  },
  updateTask: async (id, task) => {
    const updated = await request(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(task) })
    window.dispatchEvent(new Event('tasks:changed'))
    return updated
  },
  deleteTask: async (id) => {
    const deleted = await request(`/tasks/${id}`, { method: 'DELETE' })
    window.dispatchEvent(new Event('tasks:changed'))
    return deleted
  },
  getProjects: () => request('/projects'),
  getProject: (id) => request(`/projects/${id}`),
}
