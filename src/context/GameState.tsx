import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type GameStateType = {
  persona: string | null
  energy: number
  stars: number
  currentLevel: number
  levelStars: Record<number, number>
  archiveThemes: number
  streakDays: number
  weeklyChallenges: number
  setPersona: (p: string) => void
  setEnergy: (n: number) => void
  addStars: (n: number) => void
  setLevelStars: (level: number, s: number) => void
  getLevelStars: (level: number) => number
  addArchiveThemes: (n: number) => void
  setStreakDays: (n: number) => void
  setWeeklyChallenges: (n: number) => void
  setCurrentLevel: (n: number) => void
}

const GameStateContext = createContext<GameStateType | undefined>(undefined)

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [persona, setPersona] = useState<string | null>(() => {
    try {
      return localStorage.getItem('assignedPersona')
    } catch (e) {
      return null
    }
  })
  const [energy, setEnergyState] = useState<number>(() => {
    try {
      const v = localStorage.getItem('energy')
      return v ? Number(v) : 1
    } catch (e) {
      return 1
    }
  })
  const [stars, setStars] = useState<number>(() => {
    try {
      const v = localStorage.getItem('stars')
      return v ? Number(v) : 0
    } catch (e) {
      return 0
    }
  })
  const [currentLevel, setCurrentLevelState] = useState<number>(() => {
    try {
      const v = localStorage.getItem('currentLevel')
      return v ? Number(v) : 1
    } catch (e) {
      return 1
    }
  })
  const [levelStars, setLevelStarsState] = useState<Record<number, number>>(() => {
    try {
      const v = localStorage.getItem('levelStars')
      return v ? JSON.parse(v) : {}
    } catch (e) {
      return {}
    }
  })
  const [archiveThemes, setArchiveThemes] = useState<number>(() => {
    try {
      const v = localStorage.getItem('archiveThemes')
      return v ? Number(v) : 0
    } catch (e) {
      return 0
    }
  })
  const [streakDays, setStreakDaysState] = useState<number>(() => {
    try {
      const v = localStorage.getItem('streakDays')
      return v ? Number(v) : 0
    } catch (e) {
      return 0
    }
  })
  const [weeklyChallenges, setWeeklyChallengesState] = useState<number>(() => {
    try {
      const v = localStorage.getItem('weeklyChallenges')
      return v ? Number(v) : 0
    } catch (e) {
      return 0
    }
  })

  function setPersonaWrapper(p: string) {
    setPersona(p)
  }
  function setEnergy(n: number) {
    setEnergyState(n)
    try {
      localStorage.setItem('energy', String(n))
    } catch (e) {
      // ignore
    }
  }
  function addStars(n: number) {
    setStars((s) => {
      const v = s + n
      try {
        localStorage.setItem('stars', String(v))
      } catch (e) {}
      return v
    })
  }
  function setLevelStars(level: number, s: number) {
    setLevelStarsState((prev) => {
      const next = { ...prev, [level]: s }
      try {
        localStorage.setItem('levelStars', JSON.stringify(next))
      } catch (e) {}
      return next
    })
  }
  function getLevelStars(level: number) {
    return levelStars[level] ?? 0
  }
  function addArchiveThemes(n: number) {
    setArchiveThemes((v) => {
      const nv = v + n
      try {
        localStorage.setItem('archiveThemes', String(nv))
      } catch (e) {}
      return nv
    })
  }
  function setStreakDays(n: number) {
    setStreakDaysState(n)
    try {
      localStorage.setItem('streakDays', String(n))
    } catch (e) {}
  }
  function setWeeklyChallenges(n: number) {
    setWeeklyChallengesState(n)
    try {
      localStorage.setItem('weeklyChallenges', String(n))
    } catch (e) {}
  }
  function setCurrentLevel(n: number) {
    setCurrentLevelState(n)
    try {
      localStorage.setItem('currentLevel', String(n))
    } catch (e) {}
  }

  // keep persona persisted
  useEffect(() => {
    try {
      if (persona) localStorage.setItem('assignedPersona', persona)
    } catch (e) {}
  }, [persona])

  return (
    <GameStateContext.Provider
      value={{
        persona,
        energy,
        stars,
        currentLevel,
        levelStars,
        archiveThemes,
        streakDays,
        weeklyChallenges,
        setPersona: setPersonaWrapper,
        setEnergy,
        addStars,
        setLevelStars,
        getLevelStars,
        addArchiveThemes,
        setStreakDays,
        setWeeklyChallenges,
        setCurrentLevel,
      }}
    >
      {children}
    </GameStateContext.Provider>
  )
}

export function useGameState() {
  const ctx = useContext(GameStateContext)
  if (!ctx) throw new Error('useGameState must be used within GameStateProvider')
  return ctx
}

export default GameStateContext
