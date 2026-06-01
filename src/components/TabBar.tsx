import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function TabBar() {
  const nav = useNavigate()
  const loc = useLocation()

  const active = (path: string) => loc.pathname === path

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-transparent z-40">
      <div className="bg-white/80 backdrop-blur rounded-3xl px-4 py-2 flex gap-4 shadow-soft">
        <button data-testid="tab-main" onClick={() => nav('/main')} className={`px-3 py-2 rounded-lg ${active('/main') ? 'bg-white text-manulife-darkest' : 'bg-[#F5F5F5] text-manulife-dark'}`}>
          Main
        </button>
        <button data-testid="tab-progression" onClick={() => nav('/progression')} className={`px-3 py-2 rounded-lg ${active('/progression') ? 'bg-white text-manulife-darkest' : 'bg-[#F5F5F5] text-manulife-dark'}`}>
          Game
        </button>
        <button data-testid="tab-rewards" onClick={() => nav('/rewards')} className={`px-3 py-2 rounded-lg ${active('/rewards') ? 'bg-white text-manulife-darkest' : 'bg-[#F5F5F5] text-manulife-dark'}`}>
          Rewards
        </button>
        <button data-testid="tab-achievements" onClick={() => nav('/achievements')} className={`px-3 py-2 rounded-lg ${active('/achievements') ? 'bg-white text-manulife-darkest' : 'bg-[#F5F5F5] text-manulife-dark'}`}>
          Achievements
        </button>
      </div>
    </nav>
  )
}
