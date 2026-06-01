import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../context/GameState'

export default function Results() {
  const nav = useNavigate()
  const { stars, energy } = useGameState()

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Results</h2>
      <p className="mb-2">Total Stars: <strong>{stars}</strong></p>
      <p className="mb-4">Energy: <strong>{energy}</strong></p>
      <div className="space-y-3">
        <button data-testid="back-to-hub-btn" onClick={() => nav('/main')} className="w-full py-3 bg-indigo-600 text-white rounded-lg">View Stats</button>
        <button onClick={() => nav('/main')} className="w-full py-3 bg-slate-100 text-slate-800 rounded-lg">Back to Dashboard</button>
      </div>
    </div>
  )
}
