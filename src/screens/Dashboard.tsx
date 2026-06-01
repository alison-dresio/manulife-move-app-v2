import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getUserProfile } from '../api/user'
import { getUserProfile as getUser } from '../api/user'

type User = {
  userId: string
  name?: string
  persona?: string
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [points, setPoints] = useState<number | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const u = await getUser('user-123')
        if (!mounted) return
        setUser(u)
        // fetch rewards simple inline (mock server available at /api/v1/rewards/:id)
        try {
          const r = await fetch(`/api/v1/rewards/user-123`)
          if (r.ok) {
            const json = await r.json()
            if (mounted) setPoints(json.points ?? null)
          }
        } catch (e) {
          // ignore
        }
      } catch (e) {
        console.warn('Failed to load user', e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  // persona -> suggested durations
  const personaDurations: Record<string, { foundation: string; reset: string }> = {
    'Gentle Restarter': { foundation: '5–10 min', reset: '4–8 min' },
    'Busy Go-Getter': { foundation: '3–7 min', reset: '2–5 min' },
    'Default': { foundation: '4–8 min', reset: '3–6 min' },
  }

  const personaKey = user?.persona ?? 'Default'
  const durations = personaDurations[personaKey] ?? personaDurations['Default']

  const container: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  }

  const card: any = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } },
  }

  return (
    <div className="h-full min-h-screen bg-surface-calm select-none overscroll-none touch-action-manipulation">
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-sm border-b border-slate-100 px-4 py-3">
        <div className="max-w-full mx-auto flex items-center justify-between">
          <div>
            <div className="text-sm text-text-muted">Welcome back</div>
            <div className="text-base font-semibold text-text-primary">Let's move at your pace.</div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="text-xs text-text-muted">Stars</div>
              <motion.div initial={{ scale: 1 }} animate={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} className="px-3 py-2 rounded-pill bg-manulife-accent/10 text-manulife-green font-medium shadow-soft">
                <motion.span>{points ?? 0}</motion.span>
                <span className="text-xs text-text-muted ml-1">/150</span>
              </motion.div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="text-xs text-text-muted">Energy</div>
              <div className="px-3 py-2 rounded-pill bg-manulife-green text-white font-medium shadow-elevated">1/1</div>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4">
        <motion.section variants={container} initial="hidden" animate="show" className="grid gap-4">
          <motion.div variants={card} className="w-full bg-white rounded-lg shadow-soft p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-text-muted">Foundation Flow</div>
                <div className="text-lg font-semibold text-text-primary">{durations.foundation}</div>
              </div>
              <div className="text-sm text-text-muted">Gentle movement</div>
            </div>
          </motion.div>

          <motion.div variants={card} className="w-full bg-white rounded-lg shadow-soft p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-text-muted">Daily Reset</div>
                <div className="text-lg font-semibold text-text-primary">{durations.reset}</div>
              </div>
              <div className="text-sm text-text-muted">Breath & reset</div>
            </div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  )
}
