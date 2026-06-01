import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'
import { UserProvider } from './context/UserContext'
import { GameStateProvider } from './context/GameState'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <GameStateProvider>
          <App />
        </GameStateProvider>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
)
