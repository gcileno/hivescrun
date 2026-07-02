import api from '../api/client'
import {organizationInput, organizationResponse } from '../models/organizationModel.js'
import { invitationInput } from '../models/invitationModel.js'

export const getMemberOrganizations = async () => {
  const response = await api.get('/api/members/organizations/')
  return response.data.map(organizationResponse)
}

export const getOrganizationById = async (id) => {
  const response = await api.get(`/api/members/organizations/${id}/`)
  return organizationResponse(response.data)
}

export const createOrganization = async (data) => {
  const response = await api.post('/api/members/organizations/', organizationInput(data))
  return organizationResponse(response.data)
}

export const updateOrganization = async (id, data) => {
  const response = await api.put(`/api/members/organizations/${id}/`, organizationInput(data))
  return organizationResponse(response.data)
}

export const deleteOrganization = async (id) => {
  const response = await api.delete(`/api/members/organizations/${id}/`)
  return response.data
}

export const createOrganizationInvitation = async (data) => {
  const response = await api.post('/api/invitations/', invitationInput(data))
  return response.data
}
