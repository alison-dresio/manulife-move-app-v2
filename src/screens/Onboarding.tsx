import React, { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import calculatePersona from '../utils/personaEngine'
import { useUser } from '../context/UserContext'

type Answers = Record<string, any>

const questions = [
  {
    id: 'q1',
    text: 'How many days per week do you currently engage in physical activity?',
    type: 'choice',
    choices: ['0', '1-2', '3-4', '5+'],
  },
  { id: 'q2', text: 'What best describes the intensity of your typical exercise?', type: 'choice', choices: ['Light', 'Moderate', 'Vigorous'] },
  { id: 'q3', text: 'I exercise because I enjoy the activity itself.', type: 'likert' },
  { id: 'q4', text: 'I exercise because I would feel bad about myself if I didn’t.', type: 'likert' },
  { id: 'q5', text: 'I exercise because I value the benefits to my health.', type: 'likert' },
  { id: 'q6', text: 'What primarily motivates your physical activity?', type: 'choice', choices: ['Fitness', 'Health', 'Appearance', 'Social', 'Fun', 'Competition'] },
  { id: 'q7', text: 'How confident are you in your ability to maintain a regular exercise routine?', type: 'choice', choices: ['Low', 'Medium', 'High'] },
  { id: 'q8', text: 'What is your main fitness goal right now?', type: 'choice', choices: ['Start/restart exercising', 'Stay active', 'Improve performance', 'Recover from injury or condition'] },
]

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const { setSecretPersona } = useUser()

  const q = questions[step]

  // Animated number for calm roll-up (Framer Motion + spring)
  function AnimatedNumber({ value, duration = 600 }: { value: number; duration?: number }) {
    const mv = useMotionValue(value)
    const spring = useSpring(mv, { stiffness: 120, damping: 20, mass: 0.6 })
    const [display, setDisplay] = useState(value)

    useEffect(() => {
      // animate to new value
      mv.set(value)
    }, [value])

    useEffect(() => {
      const unsub = spring.on('change', (v: number) => {
        setDisplay(Math.round(v))
      })
      return () => unsub()
    }, [spring])

    return (
      <motion.span aria-live="polite" aria-atomic="true">
        {display}
      </motion.span>
    )
  }

  const parentVariants: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  }

  const childVariants: any = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } },
  }

  function setAnswer(id: string, value: any) {
    setAnswers((s) => ({ ...s, [id]: value }))
  }

  async function handleNext() {
    if (step < questions.length - 1) {
      setStep((s) => s + 1)
      return
    }

    // finished
    setSubmitting(true)
    try {
      // map likert answers to 1-5 numbers if not already
      const mapped = {
        q1: answers.q1 ?? '0',
        q2: answers.q2 ?? 'Light',
        q3: Number(answers.q3 ?? 3),
        q4: Number(answers.q4 ?? 3),
        q5: Number(answers.q5 ?? 3),
        q6: answers.q6 ?? 'Health',
        q7: (answers.q7 as 'Low' | 'Medium' | 'High') ?? 'Medium',
        q8: answers.q8 ?? 'Stay active',
      }
      const { persona } = calculatePersona(mapped)
      // Save secret persona to context
      setSecretPersona(persona)

      // Persist locally for simple flow and GameState
      try {
        localStorage.setItem('assignedPersona', persona)
      } catch (e) {
        /* ignore storage errors */
      }

      // also set persona in game state if available
      try {
        const { useGameState } = await import('../context/GameState')
        // dynamic import returns module; can't call hook here — instead we will set via window flag
        // Consumer screens read from localStorage as canonical source for this simple prototype
      } catch (e) {
        // ignore
      }

      // Persist assigned persona to mock server
      try {
        // using existing mock user id from the app
        const userId = 'user-123'
        // lazy-import api client to avoid circular deps
        const { default: userApi } = await import('../api/user')
        await userApi.updateUserProfile(userId, { assignedPersona: persona })
      } catch (e) {
        console.warn('Failed to persist assigned persona to server', e)
      }

      navigate('/main')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="h-full flex flex-col relative bg-surface-calm">
      <div className="flex-1 overflow-auto px-4 pt-6 pb-24">
        <motion.div initial="hidden" animate="show" variants={parentVariants} className="space-y-4">
          <motion.h2 variants={childVariants} className="text-2xl font-semibold mb-2 text-text-primary">Get started — Quick questionnaire</motion.h2>
          <motion.p variants={childVariants} className="text-text-muted mb-6">Short questions to personalise your experience. Large buttons and calm colors for easy tapping.</motion.p>
        </motion.div>

        <div className="mb-4">
          <div className="h-2 bg-surface-calm rounded overflow-hidden">
            <div className="h-full bg-manulife-green" style={{ width: `${((step + 1) / questions.length) * 100}%`, transition: 'width 420ms cubic-bezier(.22,.9,.3,1)' }} />
          </div>
        </div>

        <div>
          <motion.h3 variants={childVariants} className="text-lg font-medium text-slate-800 mb-2">{q.text}</motion.h3>

          {q.type === 'choice' && (
            <motion.div variants={childVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(q.choices ?? []).map((c: any, idx: number) => (
                <motion.button
                  key={c}
                  data-testid={`quiz-option-${q.id}-${idx}`}
                  onClick={() => setAnswer(q.id, c)}
                  variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 20, delay: idx * 0.03 } } }}
                  className={`py-4 px-3 rounded-lg text-left shadow-soft text-text-primary text-base transition duration-150 ease-out ${answers[q.id] === c ? 'bg-manulife-accent/12 ring-2 ring-manulife-green/30' : 'bg-surface-elevated hover:bg-surface-calm'}`}
                >
                  {c}
                </motion.button>
              ))}
            </motion.div>
          )}

          {q.type === 'likert' && (
            <motion.div variants={childVariants} className="flex items-center justify-between mt-3">
              {[1, 2, 3, 4, 5].map((n, idx) => (
                <motion.button
                  key={n}
                  data-testid={`quiz-option-${q.id}-${n}`}
                  onClick={() => setAnswer(q.id, n)}
                  variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 20, delay: idx * 0.03 } } }}
                  className={`w-14 h-14 rounded-full flex items-center justify-center shadow-soft transition transform duration-150 ${answers[q.id] === n ? 'bg-manulife-green text-white scale-105' : 'bg-surface-elevated hover:bg-surface-calm text-text-primary'}`}
                  aria-label={`Rate ${n}`}
                >
                  {n}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <div className="absolute left-0 right-0 bottom-0 p-4 bg-white/80 backdrop-blur-sm border-t border-slate-100" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="px-4 py-3 rounded-lg bg-surface-elevated text-text-primary disabled:opacity-50 transition duration-150"
          >
            Back
          </button>

            <div className="flex items-center space-x-3">
            <div className="text-sm text-text-muted"><AnimatedNumber value={step + 1} />/{questions.length}</div>
            <button
              data-testid="next-btn"
              onClick={handleNext}
              disabled={submitting}
              className="px-5 py-3 rounded-pill bg-manulife-primary text-surface-card font-medium shadow-elevated transform transition duration-180 active:scale-95 animate-rhythm-pulse"
            >
              {step < questions.length - 1 ? 'Next' : submitting ? 'Saving...' : 'Finish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
