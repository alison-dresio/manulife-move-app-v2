import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function MainDashboard() {
  const nav = useNavigate()
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="bg-surface-card rounded-2xl shadow-soft p-6">
        <h2 className="text-3xl font-bold text-manulife-primary">Welcome back</h2>
        <p className="text-sm text-manulife-darkest mt-2">Ready to play? Choose a mode below.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="p-[1px] rounded-3xl bg-gradient-to-r from-manulife-primary via-manulife-primary/50 to-transparent shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
          <motion.button whileTap={{ scale: 0.95 }} data-testid="preview-mode-btn" onClick={() => nav('/progression')} className="w-full rounded-3xl px-5 py-5 bg-white text-manulife-darkest text-left shadow-none">
            <div className="font-semibold text-lg">Preview Mode</div>
            <div className="text-sm text-manulife-dark mt-1">Preview upcoming Level Gate challenges to try future difficulty.</div>
          </motion.button>
        </div>

        <div className="p-[1px] rounded-3xl bg-gradient-to-r from-white to-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
          <motion.button whileTap={{ scale: 0.95 }} data-testid="progression-mode-btn" onClick={() => nav('/progression')} className="w-full rounded-3xl px-5 py-5 bg-[#F5F5F5] text-manulife-dark text-left shadow-none border border-transparent">
            <div className="font-semibold text-lg">Progression Mode</div>
            <div className="text-sm text-manulife-dark mt-1">Complete levels sequentially. Pass soft gates to advance.</div>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
