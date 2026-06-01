// User Data API client (placeholder)
import { getAccessToken } from '../auth/oidc/oidcClient'

const API_BASE = '/api/v1'

export async function getUserProfile(userId: string) {
  const token = getAccessToken()
  const res = await fetch(`${API_BASE}/users/${encodeURIComponent(userId)}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })
  if (!res.ok) throw new Error('Failed to fetch user profile')
  return res.json()
}

export async function updateUserProfile(userId: string, data: Record<string, any>) {
  const token = getAccessToken()
  const res = await fetch(`${API_BASE}/users/${encodeURIComponent(userId)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update profile')
  return res.json()
}

export default { getUserProfile, updateUserProfile }
