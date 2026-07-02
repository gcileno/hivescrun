import { useEffect, useState } from 'react'
import * as organizationsService from '../service/organizationsService'
import { organizationInput, organizationResponse } from '../models/organizationModel.js'

export const useOrganization = (id) => {
  const [organizations, setOrganizations] = useState([])
  const [selectedOrganization, setSelectedOrganization] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchOrganizationsMember = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await organizationsService.getMemberOrganizations()
      const normalizedOrganizations = Array.isArray(data)
        ? data.map((organization) => organizationResponse(organization))
        : data
          ? [organizationResponse(data)]
          : []

      setOrganizations(normalizedOrganizations)
      return normalizedOrganizations
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Erro ao buscar organização'
      setError(errorMessage)
      return []
    } finally {
      setLoading(false)
    }
  }
  
  const fetchOrganizationById = async (organizationId) => {
    try {
      setLoading(true)
      setError(null)
      const data = await organizationsService.getOrganizationById(organizationId)
      const normalizedOrganization = organizationResponse(data)
      setSelectedOrganization(normalizedOrganization)
      return normalizedOrganization
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Erro ao buscar organização'
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }

  const handleCreateOrganization = async (formData) => {
    try {
      setLoading(true)
      setError(null)
      const payload = organizationInput(formData)
      console.log('Payload for creating organization:', payload)
      const newOrganization = await organizationsService.createOrganization(payload)
      const normalized = organizationResponse(newOrganization)
      setOrganizations((currentOrganizations) => [...currentOrganizations, normalized])
      return { success: true, data: normalized }
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Erro ao criar organização'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateOrganization = async (id, formData) => {
    try {
      setLoading(true)
      setError(null)
      const payload = organizationInput(formData)
      const updatedOrganization = await organizationsService.updateOrganization(id, payload)
      const normalized = organizationResponse(updatedOrganization)

      setOrganizations((currentOrganizations) =>
        currentOrganizations.map((organization) => (organization.id === id ? normalized : organization))
      )

      if (selectedOrganization?.id === id) {
        setSelectedOrganization(normalized)
      }

      return { success: true, data: normalized }
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Erro ao atualizar organização'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteOrganization = async (id) => {
    try {
      setLoading(true)
      setError(null)
      await organizationsService.deleteOrganization(id)
      setOrganizations((currentOrganizations) => currentOrganizations.filter((organization) => organization.id !== id))

      if (selectedOrganization?.id === id) {
        setSelectedOrganization(null)
      }

      return { success: true }
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Erro ao deletar organização'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!id) {
      setOrganizations([])
      return
    }

    fetchOrganizationById(id)
  }, [id])

  return {
    organizations,
    selectedOrganization,
    loading,
    error,
    fetchOrganizationById,
    handleCreateOrganization,
    handleUpdateOrganization,
    handleDeleteOrganization,
    setSelectedOrganization,
  }
}

export default useOrganization
