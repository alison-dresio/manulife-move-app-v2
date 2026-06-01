import React, { createContext, useContext, useState, ReactNode } from 'react'
import type { Persona } from '../utils/personaEngine'

type UserContextType = {
  secretPersona: Persona | null
  setSecretPersona: (p: Persona) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [secretPersona, setSecretPersona] = useState<Persona | null>(null)
  return (
    <UserContext.Provider value={{ secretPersona, setSecretPersona }}>{children}</UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}

export default UserContext
