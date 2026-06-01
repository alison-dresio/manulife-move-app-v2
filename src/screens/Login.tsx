import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const nav = useNavigate()
  function handleLogin() {
    nav('/onboarding')
  }
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Welcome to Manulife Move</h2>
      <p className="text-slate-600 mb-6">Sign in to continue. (Mocked login for walking skeleton)</p>
      <button
        data-testid="login-btn"
        onClick={handleLogin}
        className="w-full py-4 rounded-lg bg-manulife-green text-white font-semibold shadow-md hover:opacity-95 animate-rhythm-pulse"
      >
        Start onboarding
      </button>
    </div>
  )
}
