import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function TabBar() {
  const nav = useNavigate()
  const loc = useLocation()

  const active = (path: string) => loc.pathname === path

  const NavItem = ({ path, icon, label, isActive }: { path: string, icon: React.ReactNode, label: string, isActive: boolean }) => {
    if (isActive) {
      return (
        <button onClick={() => nav(path)} className="border-[1.5px] border-manulife-primary rounded-full px-4 h-12 flex items-center justify-center gap-2 text-manulife-primary font-bold text-[11px] tracking-wider bg-white shadow-sm">
          {icon}
          <span className="uppercase">{label}</span>
        </button>
      )
    }
    return (
      <button onClick={() => nav(path)} className="w-12 h-12 rounded-full bg-[#F5F7F5] flex items-center justify-center text-slate-400 hover:text-slate-500 transition-colors">
        {icon}
      </button>
    )
  }

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[calc(100%-3rem)] max-w-sm z-40">
      <div className="bg-white rounded-[32px] px-2 py-2 flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
        <NavItem 
          path="/main" 
          label="Home" 
          isActive={active('/main')} 
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>} 
        />
        <NavItem 
          path="/progression" 
          label="Game" 
          isActive={active('/progression') || active('/camera-calibration')} 
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 7.5 19.5 7.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>} 
        />
        <NavItem 
          path="/rewards" 
          label="Reward" 
          isActive={active('/rewards')} 
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>} 
        />
        <NavItem 
          path="/achievements" 
          label="Profile" 
          isActive={active('/achievements')} 
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>} 
        />
      </div>
    </nav>
  )
}
