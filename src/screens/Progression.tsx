import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../context/GameState'

export default function Progression() {
  const nav = useNavigate()
  const { currentLevel, setCurrentLevel } = useGameState()
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Progression (Levels 1-50)</h2>
      <p className="text-slate-600 mb-4">Current level: {currentLevel}</p>
      <div className="space-y-3">
        <button
          onClick={() => {
            setCurrentLevel(Math.min(50, currentLevel + 1))
          }}
          className="w-full py-3 bg-emerald-500 text-white rounded-lg"
        >
          Increase Level
        </button>
        <button onClick={() => nav('/active-game')} className="w-full py-3 bg-blue-600 text-white rounded-lg">Play Level</button>
      </div>
    </div>
  )
}
