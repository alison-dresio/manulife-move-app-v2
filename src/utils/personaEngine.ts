export type Answers = {
  q1: '0' | '1-2' | '3-4' | '5+'
  q2: 'Light' | 'Moderate' | 'Vigorous'
  q3: number // BREQ-3 Intrinsic (1-5)
  q4: number // BREQ-3 Introjected (1-5)
  q5: number // BREQ-3 Identified (1-5)
  q6: 'Fitness' | 'Health' | 'Appearance' | 'Social' | 'Fun' | 'Competition'
  q7: 'Low' | 'Medium' | 'High' // Confidence per master_spec
  q8: 'Start/restart exercising' | 'Stay active' | 'Improve performance' | 'Recover from injury or condition'
}

export type Persona = 'Gentle Restarter' | 'Steady Mover' | 'Active Challenger' | 'Social Competitor'

export function calculatePersona(a: Answers): { persona: Persona; scores: Record<Persona, number> } {
  const scores: Record<Persona, number> = {
    'Gentle Restarter': 0,
    'Steady Mover': 0,
    'Active Challenger': 0,
    'Social Competitor': 0,
  }

  // Apply weights from master_spec.md

  // Q1 Frequency
  if (a.q1 === '0') {
    scores['Gentle Restarter'] += 3
  } else if (a.q1 === '1-2') {
    scores['Gentle Restarter'] += 2
    scores['Steady Mover'] += 1
  } else if (a.q1 === '3-4') {
    scores['Steady Mover'] += 2
    scores['Active Challenger'] += 1
  } else if (a.q1 === '5+') {
    scores['Active Challenger'] += 3
  }

  // Q2 Intensity
  if (a.q2 === 'Light') scores['Gentle Restarter'] += 2
  if (a.q2 === 'Moderate') scores['Steady Mover'] += 2
  if (a.q2 === 'Vigorous') scores['Active Challenger'] += 3

  // Q3 Intrinsic (BREQ-3)
  if (a.q3 <= 2) scores['Gentle Restarter'] += 1
  else if (a.q3 === 3) scores['Steady Mover'] += 1
  else if (a.q3 >= 4) scores['Active Challenger'] += 2

  // Q4 Introjected
  if (a.q4 <= 2) scores['Active Challenger'] += 1
  else if (a.q4 === 3) scores['Steady Mover'] += 1
  else if (a.q4 >= 4) scores['Gentle Restarter'] += 2

  // Q5 Identified
  if (a.q5 === 3) scores['Gentle Restarter'] += 1
  else if (a.q5 === 4) scores['Steady Mover'] += 2
  else if (a.q5 === 5) scores['Active Challenger'] += 1

  // Q6 Motivation (MPAM-R)
  switch (a.q6) {
    case 'Fitness':
      scores['Steady Mover'] += 2
      break
    case 'Health':
      scores['Gentle Restarter'] += 2
      break
    case 'Appearance':
      scores['Active Challenger'] += 2
      break
    case 'Social':
      scores['Social Competitor'] += 3
      break
    case 'Fun':
      scores['Steady Mover'] += 1
      scores['Social Competitor'] += 1
      break
    case 'Competition':
      scores['Social Competitor'] += 3
      scores['Active Challenger'] += 1
      break
  }

  // Q7 Confidence
  if (a.q7 === 'Low') scores['Gentle Restarter'] += 3
  else if (a.q7 === 'Medium') scores['Steady Mover'] += 2
  else if (a.q7 === 'High') scores['Active Challenger'] += 2

  // Q8 Goal
  if (a.q8 === 'Start/restart exercising') scores['Gentle Restarter'] += 3
  else if (a.q8 === 'Stay active') scores['Steady Mover'] += 2
  else if (a.q8 === 'Improve performance') scores['Active Challenger'] += 3
  else if (a.q8 === 'Recover from injury or condition') scores['Gentle Restarter'] += 2

  // Special: if frequency 0 or intensity Light but motivation is Competition, keep safety bias
  if ((a.q1 === '0' || a.q2 === 'Light') && a.q6 === 'Competition') {
    scores['Gentle Restarter'] += 2
  }

  // Normalize negative values
  ;(Object.keys(scores) as Persona[]).forEach((p) => {
    if (scores[p] < 0) scores[p] = 0
  })

  // Use helper to choose persona with safety-first tie-breaker
  const persona = choosePersonaFromScores(scores)
  return { persona, scores }
}

export default calculatePersona

export function choosePersonaFromScores(scores: Record<Persona, number>): Persona {
  // Determine max score
  const entries = Object.entries(scores) as [Persona, number][]
  let max = Math.max(...entries.map(([, v]) => v))
  // Collect personas with max
  const tied = entries.filter(([, v]) => v === max).map(([k]) => k)
  if (tied.length === 1) return tied[0]

  // Safety-first tie-breaker: prefer Gentle Restarter when tied
  if (tied.includes('Gentle Restarter')) return 'Gentle Restarter'

  // Fallback priority order
  const priority: Persona[] = ['Steady Mover', 'Active Challenger', 'Social Competitor']
  for (const p of priority) if (tied.includes(p)) return p

  // As a final fallback, return Gentle Restarter
  return 'Gentle Restarter'
}
