import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CameraCalibration() {
  const nav = useNavigate()
  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Camera Calibration</h2>
      <div className="bg-black/10 rounded h-56 flex items-center justify-center text-slate-600">Mock camera preview</div>
      <p className="text-sm text-slate-500">Position your device and ensure the camera can see you.</p>
      <div className="mt-4">
        <button data-testid="start-calibration-btn" onClick={() => nav('/active-game')} className="w-full py-3 bg-manulife-primary text-surface-card rounded-lg animate-rhythm-pulse">Start Camera Calibration</button>
      </div>
    </div>
  )
}
