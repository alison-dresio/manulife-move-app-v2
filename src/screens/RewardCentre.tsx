import React, { useState } from 'react'

export default function RewardCentre() {
  const [activeTab, setActiveTab] = useState<'daily'|'gifts'>('daily')

  return (
    <div className="flex flex-col gap-6 -mt-2 pb-24">
      <h1 className="text-[28px] font-bold text-[#1a2b22]">Reward</h1>

      {/* Streak Section */}
      <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🔥</span>
          <span className="font-bold text-[#1a2b22] text-lg">Streak</span>
        </div>
        
        <div className="bg-[#F5F7F5] rounded-full p-2 flex justify-between items-center relative">
          {[1,2,3,4,5,6,7].map(day => {
            const isCompleted = day <= 3;
            return (
              <div 
                key={day} 
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold z-10 transition-colors ${
                  isCompleted ? 'bg-manulife-primary text-white shadow-sm' : 'text-slate-400'
                }`}
              >
                {day}
              </div>
            )
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-full p-1 flex shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <button 
          className={`flex-1 py-3 rounded-full text-sm font-semibold transition-colors ${activeTab === 'daily' ? 'bg-manulife-primary text-white' : 'text-slate-600 bg-transparent'}`}
          onClick={() => setActiveTab('daily')}
        >
          Daily task
        </button>
        <button 
          className={`flex-1 py-3 rounded-full text-sm font-semibold transition-colors ${activeTab === 'gifts' ? 'bg-manulife-primary text-white' : 'text-slate-600 bg-transparent'}`}
          onClick={() => setActiveTab('gifts')}
        >
          Gifts
        </button>
      </div>

      {/* Task List */}
      {activeTab === 'daily' && (
        <div className="flex flex-col gap-4">
          {/* Task 1 */}
          <div className="bg-white rounded-[24px] p-5 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="w-12 h-12 rounded-full border-[2.5px] border-manulife-primary flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00A455" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#1a2b22] text-[15px]">Finish 1 level</h3>
              <p className="text-xs text-slate-500 mt-0.5">Completed today</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#F5F7F5] flex items-center justify-center shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#00A455"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
          </div>

          {/* Task 2 */}
          <div className="bg-white rounded-[24px] p-5 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="w-12 h-12 rounded-full shrink-0 relative flex items-center justify-center">
               <svg className="w-full h-full absolute inset-0 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#F5F7F5]"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-manulife-primary"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeDasharray="25, 100"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="text-xs font-bold text-manulife-primary relative z-10">1/4</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#1a2b22] text-[15px]">Get 4 stars in 2 levels</h3>
              <p className="text-xs text-slate-500 mt-0.5">Keep it up!</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#F5F7F5] flex items-center justify-center shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#00A455"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
          </div>

          {/* Task 3 */}
          <div className="bg-white rounded-[24px] p-5 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="w-12 h-12 rounded-full bg-[#F5F7F5] flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00A455" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#1a2b22] text-[15px]">Share to social media</h3>
              <p className="text-xs text-slate-500 mt-0.5">Show your progress</p>
            </div>
            <button className="px-5 py-2 bg-[#F5F7F5] rounded-full text-sm font-bold text-[#1a2b22] shrink-0">
              Go
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
