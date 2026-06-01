import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Good morning — Alex</h2>
          <p className="text-sm text-slate-500">Your daily plan based on your Gentle Restarter persona</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-xs text-slate-500">Energy</div>
            <div className="text-lg font-semibold">1 / day</div>
          </div>
          <button className="px-3 py-2 bg-white border rounded shadow-sm text-sm">Profile</button>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 bg-gradient-to-r from-green-50 to-white rounded-lg shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold">Today's Focus</h3>
                <p className="text-sm text-slate-600">Try a short, gentle routine — no timer, just movement.</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">Streak</div>
                <div className="text-lg font-semibold">3 days</div>
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-3">
              <button className="px-4 py-2 bg-white text-green-700 font-semibold rounded shadow">Start Trial</button>
              <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded shadow">Play Arcade</button>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <h4 className="font-semibold mb-2">Recommended Games</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Balance Beacon</div>
                    <div className="text-xs text-slate-500">Low impact • 5 min</div>
                  </div>
                  <div className="text-sm text-slate-600">Energy: 0</div>
                </div>
                <div className="mt-3 flex justify-end">
                  <button className="px-3 py-1 bg-green-50 text-green-700 rounded">Trial</button>
                </div>
              </div>
              <div className="p-4 border rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Step Sprint</div>
                    <div className="text-xs text-slate-500">Cardio • 3 min</div>
                  </div>
                  <div className="text-sm text-slate-600">Energy: 1</div>
                </div>
                <div className="mt-3 flex justify-end">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded">Arcade</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-500">Daily Challenge</div>
                <div className="font-medium">Walk 500 steps</div>
              </div>
              <div>
                <div className="text-sm text-slate-600">Progress</div>
                <div className="text-sm font-semibold">0%</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <div className="text-xs text-slate-500">Recent Activity</div>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              <li>Balance Beacon — Trial — 2 days ago</li>
              <li>Step Sprint — Arcade — 4 days ago</li>
            </ul>
          </div>
        </aside>
      </section>

      <div className="mt-6 flex justify-end">
        <Link to="/dashboard" className="px-4 py-2 bg-slate-700 text-white rounded">Open Game Dashboard</Link>
      </div>
    </div>
  )
}
