import { useState, useEffect } from 'react'
import * as projectService from '../service/projectService'

export const useProjects = () => {
  const [projects, setProjects] = useState([])
  const [organizations, setOrganizations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await projectService.getAllProjects()
      setProjects(data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Erro ao buscar projetos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchOrganizations = async () => {
    try {
      const data = await projectService.getAllOrganizations()
      setOrganizations(data)
    } catch (err) {
      console.error('Erro ao buscar organizações:', err)
    }
  }


  const handleCreateProject = async (formData) => {
    try {
      setLoading(true)
      setError(null)
      const newProject = await projectService.createProject(formData)
      setProjects([...projects, newProject])
      return { success: true, data: newProject }
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Erro ao criar projeto'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProject = async (id, formData) => {
    try {
      setLoading(true)
      setError(null)
      const updated = await projectService.updateProject(id, formData)
      setProjects(projects.map(p => p.id === id ? updated : p))
      return { success: true, data: updated }
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Erro ao atualizar projeto'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProject = async (id) => {
    try {
      setLoading(true)
      setError(null)
      await projectService.deleteProject(id)
      setProjects(projects.filter(p => p.id !== id))
      return { success: true }
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Erro ao deletar projeto'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  return {
    projects,
    organizations,
    loading,
    error,
    fetchProjects,
    fetchOrganizations,
    handleCreateProject,
    handleUpdateProject,
    handleDeleteProject
  }
}
