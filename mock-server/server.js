const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// In-memory data store (mock)
const USERS = {
  'user-123': {
    userId: 'user-123',
    name: 'Alex Chen',
    persona: 'Gentle Restarter',
    locale: 'en-HK',
    region: 'ap-east-1',
  },
}

const REWARDS = {
  'user-123': { userId: 'user-123', points: 120, region: 'ap-east-1' },
}

// Region-specific behaviour example: if region is ap-east-1, add residency flag
function applyRegionHeaders(res, region) {
  if (region === 'ap-east-1') {
    res.setHeader('x-data-residency', 'ap-east-1')
  }
}

app.get('/api/v1/users/:userId', (req, res) => {
  const { userId } = req.params
  const user = USERS[userId]
  if (!user) return res.status(404).json({ error: 'User not found' })
  applyRegionHeaders(res, user.region)
  res.json(user)
})

app.put('/api/v1/users/:userId', (req, res) => {
  const { userId } = req.params
  const data = req.body || {}
  const existing = USERS[userId]
  if (!existing) return res.status(404).json({ error: 'User not found' })
  USERS[userId] = { ...existing, ...data }
  applyRegionHeaders(res, USERS[userId].region)
  res.json(USERS[userId])
})

app.get('/api/v1/rewards/:userId', (req, res) => {
  const { userId } = req.params
  const entry = REWARDS[userId]
  if (!entry) return res.status(404).json({ error: 'No rewards for user' })
  applyRegionHeaders(res, entry.region)
  res.json(entry)
})

app.post('/api/v1/rewards/:userId/award', (req, res) => {
  const { userId } = req.params
  const { points } = req.body || {}
  if (typeof points !== 'number') return res.status(400).json({ error: 'Invalid points' })
  if (!REWARDS[userId]) REWARDS[userId] = { userId, points: 0, region: 'ap-east-1' }
  REWARDS[userId].points += points
  applyRegionHeaders(res, REWARDS[userId].region)
  res.json(REWARDS[userId])
})

const PORT = process.env.MOCK_PORT || 4000
app.listen(PORT, () => {
  console.log(`Mock server listening on http://localhost:${PORT}`)
})
