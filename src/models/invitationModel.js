export const invitationInput = (data) => {
  if (!data) return null

  return {
    email: data.email || '',
    organization: data.organization || null,
  }
}

export const invitationResponse = (data) => {
  if (!data) return null

  return {
    id: data.id || null,
    email: data.email || '',
    invitedBy: data.invited_by || null,
    organization: data.organization || null,
    project: data.project || null,
    role: data.role || null,
    status: data.status || 'PENDING',
    token: data.token || '',
    createdAt: data.created_at || null,
    expiresAt: data.expires_at || null,
  }
}