import React from 'react'
import { useNavigate } from 'react-router-dom'

const SAMPLE = [
  { id: 'user-123', name: 'Alex Chen', points: 120 },
  { id: 'user-2', name: 'Maya Li', points: 98 },
  { id: 'user-3', name: 'Samir Patel', points: 72 },
]

export default function Leaderboard() {
  const nav = useNavigate()

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
      <ol className="space-y-2">
        {SAMPLE.map((s, idx) => (
          <li key={s.id} className="flex justify-between p-3 bg-white rounded-lg shadow-sm">
            <div>
              <div className="font-medium">#{idx + 1} {s.name}</div>
              <div className="text-sm text-slate-500">{s.id}</div>
            </div>
            <div className="text-emerald-600 font-semibold">{s.points} pts</div>
          </li>
        ))}
      </ol>
      <div className="mt-4">
        <button onClick={() => nav('/main-dashboard')} className="w-full py-3 bg-slate-100 rounded-lg">Back</button>
      </div>
    </div>
  )
}
