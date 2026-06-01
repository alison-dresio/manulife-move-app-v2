// Reward Points API client (placeholder)
import { getAccessToken } from '../auth/oidc/oidcClient'

const API_BASE = '/api/v1'

export async function getRewardPoints(userId: string) {
  const token = getAccessToken()
  const res = await fetch(`${API_BASE}/rewards/${encodeURIComponent(userId)}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })
  if (!res.ok) throw new Error('Failed to fetch reward points')
  return res.json()
}

export async function awardPoints(userId: string, points: number) {
  const token = getAccessToken()
  const res = await fetch(`${API_BASE}/rewards/${encodeURIComponent(userId)}/award`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ points }),
  })
  if (!res.ok) throw new Error('Failed to award points')
  return res.json()
}

export default { getRewardPoints, awardPoints }
