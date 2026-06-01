import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Onboarding from './screens/Onboarding'
import Layout from './components/Layout'
import Login from './screens/Login'
import MainDashboard from './screens/MainDashboard'
import ActiveGame from './screens/ActiveGame'
import Results from './screens/Results'
import CameraCalibration from './screens/CameraCalibration'
import ProgressionMap from './screens/ProgressionMap'
import RewardCentre from './screens/RewardCentre'
import Achievements from './screens/Achievements'
import TabBar from './components/TabBar'

export default function App() {
  const loc = useLocation()
  const showTabBar = ['/main', '/progression', '/rewards', '/achievements'].includes(loc.pathname)

  return (
    <div className="mobile-frame relative shadow-2xl overflow-hidden rounded-2xl select-none overscroll-none touch-action-manipulation bg-surface-calm">
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/main" element={<MainDashboard />} />
          <Route path="/progression" element={<ProgressionMap />} />
          <Route path="/rewards" element={<RewardCentre />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/camera" element={<CameraCalibration />} />
          <Route path="/active-game" element={<ActiveGame />} />
          <Route path="/results" element={<Results />} />
        </Routes>

        {showTabBar && <TabBar />}
      </Layout>
    </div>
  )
}
