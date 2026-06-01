import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameState } from '../context/GameState'

export default function GameHub() {
  const nav = useNavigate()
  const { persona, energy, stars, currentLevel } = useGameState()
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="p-[1px] rounded-3xl bg-gradient-to-r from-white to-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
        <div className="bg-[#F5F5F5] rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-manulife-darkest">Game Hub</h2>
            <div className="text-sm text-manulife-dark mt-1">Persona (secret): <span className="font-medium">{persona ?? '—'}</span></div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-manulife-primary">{stars}</div>
            <div className="text-xs text-manulife-dark">Stars</div>
          </div>
        </div>
        <div className="mt-4 text-sm text-manulife-dark">Energy: <span className="font-semibold">{energy}</span> • Level: <span className="font-semibold">{currentLevel}</span></div>
        </div>
      </div>

      <div data-testid="leaderboard-container" className="p-[1px] rounded-3xl bg-gradient-to-r from-white to-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
        <div className="bg-[#F5F5F5] rounded-2xl p-4">
        <h3 className="font-semibold text-manulife-darkest mb-2">Social Leaderboard (placeholder)</h3>
        <p className="text-sm text-manulife-dark">Phase 3: social leaderboard will appear here. (Mock)</p>
        <ul className="mt-3 space-y-2">
          <li data-testid="leaderboard-row-1" className="flex items-center justify-between"> <span className="font-medium">You</span> <span className="text-sm text-amber-400">★ 12</span> </li>
          <li data-testid="leaderboard-row-2" className="flex items-center justify-between"> <span className="font-medium">Friend</span> <span className="text-sm text-amber-400">★ 9</span> </li>
        </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div className="p-[1px] rounded-3xl bg-gradient-to-r from-manulife-primary via-manulife-primary/50 to-transparent shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
          <motion.button whileTap={{ scale: 0.95 }} data-testid="back-to-main-btn" onClick={() => nav('/main-dashboard')} className="w-full rounded-3xl px-4 py-3 bg-white text-manulife-darkest">Back to Main Dashboard</motion.button>
        </div>
      </div>
    </div>
  )
}
