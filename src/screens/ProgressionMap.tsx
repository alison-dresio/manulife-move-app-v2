import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameState } from '../context/GameState'

const LEVEL_COUNT = 50
const ROW_HEIGHT = 120
const AMPLITUDE = 110

function xOffsetForIndex(i: number) {
  // sine wave offset
  const freq = 0.6
  return Math.round(Math.sin(i * freq) * AMPLITUDE)
}

export default function ProgressionMap() {
  const nav = useNavigate()
  const isTest = typeof window !== 'undefined' && (window as any).__TEST__ === true
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { currentLevel, levelStars, getLevelStars, stars, energy, addArchiveThemes, addStars, setCurrentLevel } = useGameState()
  const [showArchiveModal, setShowArchiveModal] = useState(false)

  const nodes = useMemo(() => Array.from({ length: LEVEL_COUNT }, (_, i) => i + 1), [])

  useEffect(() => {
    // Auto-scroll to current level
    const el = containerRef.current?.querySelector(`[data-level="${currentLevel}"]`) as HTMLElement | null
    if (el) {
      try {
        el.scrollIntoView({ behavior: isTest ? 'auto' : 'smooth', block: 'center' })
      } catch (e) {
        // fallback
        el.scrollIntoView(true)
      }
    }
  }, [currentLevel])

  // Archive detection
  useEffect(() => {
    const thrLevels = Object.entries(levelStars || {}).filter(([, s]) => s === 3).length
    if (thrLevels >= 3) {
      // award once per app session if not already applied in state
      const archiveApplied = (levelStars as any)?.__archive_applied
      if (!archiveApplied) {
        // apply rewards: +9 stars, +3 archive themes
        addStars(9)
        addArchiveThemes(3)
        // mark applied flag in localStorage via GameState persistence
        try {
          const ls = { ...(levelStars as any), __archive_applied: true }
          localStorage.setItem('levelStars', JSON.stringify(ls))
        } catch (e) {}
        setShowArchiveModal(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelStars])

  function isSoftGateLocked(level: number) {
    if (![5, 15, 25].includes(level)) return false
    const start = level - 5
    for (let i = start; i < level; i++) {
      if ((getLevelStars(i) ?? 0) < 1) return true
    }
    return false
  }

  function isHardGateLocked(level: number) {
    if (![10, 20, 30].includes(level)) return false
    const blockStart = level - 10
    let sum = 0
    for (let i = blockStart; i < level; i++) sum += getLevelStars(i) ?? 0
    return sum < 25
  }

  return (
    <div className="relative h-full overflow-auto py-8" ref={containerRef}>
      <div className="sticky top-0 z-20 bg-surface-card/90 backdrop-blur-sm p-3 border-b">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="font-medium text-manulife-darkest">Energy</div>
            <div className="text-2xl font-bold text-manulife-primary">{energy}</div>
            <div className="font-medium text-manulife-darkest">Stars</div>
            <div className="text-2xl font-bold text-amber-400">{stars}</div>
          </div>
          <div className="text-sm text-manulife-dark">7-day streak: <span className="font-semibold">★</span></div>
        </div>
      </div>

      <div style={{ height: LEVEL_COUNT * ROW_HEIGHT + 200 }} className="relative">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <defs>
            <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          <path d={(() => {
            // build path through centers
            let d = ''
            for (let i = 0; i < nodes.length; i++) {
              const y = i * ROW_HEIGHT + 80
              const x = (window.innerWidth / 2) + xOffsetForIndex(i)
              if (i === 0) d += `M ${x} ${y}`
              else d += ` L ${x} ${y}`
            }
            return d
          })()} stroke="rgba(16,185,129,0.9)" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {nodes.map((lvl, idx) => {
          const y = idx * ROW_HEIGHT + 40
          const x = `calc(50% + ${xOffsetForIndex(idx)}px)`
          const starsForLevel = getLevelStars(lvl) ?? 0
          const isCurrent = lvl === currentLevel
          const softLocked = isSoftGateLocked(lvl)
          const hardLocked = isHardGateLocked(lvl)

          return (
            <div key={lvl} data-level={lvl} style={{ position: 'absolute', top: y, left: x, transform: 'translateX(-50%)' }}>
              <div className="flex flex-col items-center">
                <div className="mb-2 text-xs text-slate-500">{softLocked || hardLocked ? 'Locked' : ''}</div>
                <div className={`p-[1px] rounded-full ${starsForLevel > 0 || isCurrent ? 'bg-gradient-to-r from-manulife-primary via-manulife-primary/50 to-transparent' : 'bg-gradient-to-r from-white to-white/70'} shadow-[0_8px_30px_rgb(0,0,0,0.05)]`}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    data-testid={`level-node-${lvl}`}
                    data-locked={softLocked || hardLocked}
                    onClick={() => {
                      if (softLocked || hardLocked) return
                      setCurrentLevel(lvl)
                      nav('/camera-calibration')
                    }}
                    aria-current={isCurrent}
                    aria-label={`Level ${lvl} ${softLocked || hardLocked ? 'locked' : 'unlocked'}`}
                    className={`w-20 h-20 rounded-full flex items-center justify-center ${starsForLevel > 0 || isCurrent ? 'bg-white' : 'bg-[#F5F5F5]'} ${!(softLocked || hardLocked) ? (!isTest ? 'animate-rhythm-pulse' : '') : ''}`}
                  >
                    <div className="text-sm font-semibold">{lvl}</div>
                  </motion.button>
                </div>

                <div className="mt-2 flex gap-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-full ${i < starsForLevel ? 'bg-amber-400' : 'bg-surface-elevated'}`}></div>
                  ))}
                </div>

                {hardLocked && <div className="mt-2 text-xs text-slate-500">Hard Gate</div>}
                {softLocked && <div className="mt-2 text-xs text-slate-500">Soft Gate</div>}
              </div>
            </div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showArchiveModal ? 1 : 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ pointerEvents: showArchiveModal ? 'auto' : 'none' }}
      >
        {showArchiveModal && (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h3 className="text-xl font-semibold mb-2">Flawless!</h3>
            <p className="text-sm text-slate-600 mb-4">You've unlocked 3 new Archive Themes and earned 9 bonus stars.</p>
            <div className="flex gap-2">
              <button data-testid="archive-nice-btn" onClick={() => setShowArchiveModal(false)} className="ml-auto px-4 py-2 bg-manulife-green text-white rounded">Nice</button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
