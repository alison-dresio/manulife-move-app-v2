import { describe, it, expect } from 'vitest'
import { choosePersonaFromScores } from './personaEngine'

describe('PersonaEngine tie-breaker (Safety First)', () => {
  it('prefers Gentle Restarter when tied with another persona', () => {
    const scores = {
      'Gentle Restarter': 10,
      'Steady Mover': 10,
      'Active Challenger': 5,
      'Social Competitor': 2,
    }
    const persona = choosePersonaFromScores(scores as any)
    expect(persona).toBe('Gentle Restarter')
  })

  it('falls back to priority when Gentle Restarter not in tie', () => {
    const scores = {
      'Gentle Restarter': 3,
      'Steady Mover': 8,
      'Active Challenger': 8,
      'Social Competitor': 2,
    }
    const persona = choosePersonaFromScores(scores as any)
    // priority: Steady Mover before Active Challenger
    expect(persona).toBe('Steady Mover')
  })
})
