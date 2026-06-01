import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../context/GameState'

export default function ActiveGame() {
  const nav = useNavigate()
  const { addStars, setEnergy, currentLevel, setLevelStars, energy } = useGameState()
  const [selected, setSelected] = useState<number>(1)

  function finishRun() {
    // apply earned stars and deduct energy
    addStars(selected)
    setLevelStars(currentLevel, selected)
    setEnergy(Math.max(0, energy - 1))
    nav('/results')
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Active Game</h2>
      <p className="text-slate-600">Camera / pose detection placeholder. Choose stars earned for this demo.</p>

      <div className="flex items-center gap-3">
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            onClick={() => setSelected(n)}
            className={`w-12 h-12 rounded-full flex items-center justify-center ${selected === n ? 'bg-manulife-green text-white' : 'bg-surface-elevated'}`}
            aria-pressed={selected === n}
          >
            {n}★
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <button data-testid="finish-workout-btn" onClick={finishRun} className="w-full py-3 bg-manulife-primary text-surface-card rounded-lg animate-rhythm-pulse">Finish</button>
        <button data-testid="back-to-hub-btn" onClick={() => nav('/game-hub')} className="w-full py-3 bg-surface-card text-manulife-dark rounded-lg">Back to Hub</button>
      </div>
    </div>
  )
}
