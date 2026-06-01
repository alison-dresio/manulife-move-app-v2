import React, { useEffect, useState } from 'react'
import * as api from '../api'

function getDurationsForPersona(persona?: string | null) {
  // Default durations per persona (Phase 1)
  switch (persona) {
    case 'Gentle Restarter':
      return {
        foundation: '5-10 mins',
        daily: '3-5 mins',
      }
    case 'Steady Mover':
      return {
        foundation: '10-15 mins',
        daily: '5-7 mins',
      }
    case 'Active Challenger':
      return {
        foundation: '15-25 mins',
        daily: '7-10 mins',
      }
    case 'Social Competitor':
      return {
        foundation: '8-12 mins',
        daily: '5-8 mins',
      }
    default:
      return {
        foundation: '5-10 mins',
        daily: '3-7 mins',
      }
  }
}

function renderGameCard(title: string, profile: any) {
  const persona = profile.assignedPersona ?? profile.persona ?? null
  const durations = getDurationsForPersona(persona)
  const duration = title === 'Foundation Flow' ? durations.foundation : durations.daily
  return (
    <div className="p-4 border rounded bg-white flex flex-col justify-between gap-3">
      <div className="flex flex-col gap-2">
        <div className="font-medium break-words whitespace-normal">{title}</div>
        <div className="text-xs text-slate-500 break-words whitespace-normal">{title === 'Foundation Flow' ? 'Foundational mobility and balance' : 'Short daily reset to recover and energize'}</div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600 break-words whitespace-normal">Duration: {duration}</div>
        <div>
          <button className="px-3 py-1 bg-emerald-500 text-white rounded">Start</button>
        </div>
      </div>
    </div>
  )
}

type UserProfile = {
  userId: string
  name: string
  persona: string
  assignedPersona?: string
  locale: string
  region: string
}

export default function GameDashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [points, setPoints] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const userId = 'user-123'
        const p = await api.userApi.getUserProfile(userId)
        const r = await api.rewardsApi.getRewardPoints(userId)
        if (!mounted) return
        setProfile(p)
        setPoints(r.points ?? null)
      } catch (err: any) {
        setError(err?.message || 'Failed to load data')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Game Dashboard</h2>
      {loading && <p className="text-slate-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && profile && (
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-white rounded shadow flex flex-col gap-4">
            <div>
              <h3 className="font-semibold">Welcome, {profile.name}</h3>
              <p className="text-sm text-slate-500">Locale: {profile.locale}</p>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-sm text-slate-500">Current Points</h4>
                <div className="text-3xl font-bold break-words whitespace-normal">{points ?? '—'}</div>
              </div>

              <aside className="w-36 p-3 bg-surface-elevated rounded">
                <div className="text-sm font-medium">Account</div>
                <div className="text-xs text-slate-500 break-words whitespace-normal">{profile.userId}</div>
                <div className="text-xs text-slate-500">{profile.region}</div>
              </aside>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Phase 1 Games</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {renderGameCard('Foundation Flow', profile)}
                {renderGameCard('Daily Reset', profile)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-white rounded shadow">
              <h3 className="font-semibold">Launcher</h3>
              <p className="text-sm text-slate-600 break-words whitespace-normal">List of available games will appear here.</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h3 className="font-semibold">Recent Scores</h3>
              <p className="text-sm text-slate-600 break-words whitespace-normal">Recent plays and leaderboard links (placeholder).</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
