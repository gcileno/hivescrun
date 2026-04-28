import api from '../api/client'

export const getAllProjects = async () => {
  const response = await api.get('/api/projects/')
  return response.data
}

export const getProjectById = async (id) => {
  const response = await api.get(`/api/projects/${id}/`)
  return response.data
}

export const createProject = async (data) => {
  const response = await api.post('/api/projects/', data)
  return response.data
}

export const updateProject = async (id, data) => {
  const response = await api.put(`/api/projects/${id}/`, data)
  return response.data
}

export const deleteProject = async (id) => {
  await api.delete(`/api/projects/${id}/`)
}

export const getAllOrganizations = async () => {
  const response = await api.get('/api/organizations/')
  return response.data
}

