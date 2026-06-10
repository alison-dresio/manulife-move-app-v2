import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CameraCalibration(): JSX.Element {
  const navigate = useNavigate()
  const [isCalibrating, setIsCalibrating] = useState(false)

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined
    if (isCalibrating) {
      t = setTimeout(() => {
        // Simulate game finishing and route to rewards
        navigate('/rewards')
      }, 2000)
    }
    return () => {
      if (t) clearTimeout(t)
    }
  }, [isCalibrating, navigate])

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-start bg-[#0f1a12] text-white">
      {/* Glassmorphism header */}
      <div className="bg-white/20 backdrop-blur-md text-white rounded-3xl p-4 mx-6 mt-12 text-center shadow-lg">
        <h1 className="font-semibold text-lg">Step Back. Align your full body within the frame.</h1>
      </div>

      {/* Camera visual area */}
      <div className="flex-1 w-full flex items-center justify-center px-6 mt-8">
        <div className="relative w-full max-w-lg h-[56vh] rounded-2xl overflow-hidden flex items-center justify-center">
          {/* dark camera-like background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f1a12] via-[#07120b] to-[#07120b]" />

          {/* dashed silhouette SVG */}
          <svg width="260" height="420" viewBox="0 0 260 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
            {/* Head */}
            <circle cx="130" cy="70" r="32" stroke="white" strokeWidth="3" strokeDasharray="6 6" fill="rgba(255,255,255,0.02)" />
            {/* Body */}
            <path d="M130 110 C130 110 170 140 170 200 C170 300 165 330 130 330 C95 330 90 300 90 200 C90 140 130 110 130 110 Z" stroke="white" strokeWidth="3" strokeDasharray="8 6" fill="rgba(255,255,255,0.02)" />
            {/* Arms (suggestion) */}
            <path d="M90 150 L30 210" stroke="white" strokeWidth="3" strokeDasharray="6 6" />
            <path d="M170 150 L230 210" stroke="white" strokeWidth="3" strokeDasharray="6 6" />
            {/* Legs */}
            <path d="M115 330 L90 390" stroke="white" strokeWidth="3" strokeDasharray="6 6" />
            <path d="M145 330 L170 390" stroke="white" strokeWidth="3" strokeDasharray="6 6" />
          </svg>

          {/* subtle vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 80px 120px rgba(0,0,0,0.6)' }} />
        </div>
      </div>

      {/* Action button */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <motion.button
          data-testid="start-calibration-btn"
          className="w-[342px] py-4 rounded-2xl text-white font-semibold shadow-lg flex items-center justify-center gap-3"
          style={{ backgroundColor: '#00A455' }}
          onClick={() => {
            if (!isCalibrating) setIsCalibrating(true)
          }}
          disabled={isCalibrating}
          animate={isCalibrating ? {} : { scale: [1, 1.03, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {isCalibrating ? (
            <>
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <span>Calibrating...</span>
            </>
          ) : (
            <span>Start Calibration</span>
          )}
        </motion.button>
      </div>
    </div>
  )
}
