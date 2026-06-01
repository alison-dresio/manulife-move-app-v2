import React, { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-calm flex items-center justify-center py-8">
      <div className="mobile-frame mx-auto min-h-screen relative shadow-2xl overflow-hidden bg-transparent rounded-2xl">
        <header className="sticky top-0 z-50">
          <div className="p-4 flex items-center justify-between bg-surface-card rounded-t-2xl shadow-soft">
            <h1 className="text-lg font-semibold text-manulife-darkest">Manulife Move</h1>
            <div>
              <button className="px-3 py-2 rounded-lg bg-surface-calm text-manulife-dark">Profile</button>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
