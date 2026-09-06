import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Home as HomeIcon,
  Building2,
  Building,
  Warehouse,
  Landmark,
  Sparkles,
  Leaf,
  Gem,
  Clock4,
  MapPin,
  Wallet,
  FileCheck2,
  ScrollText,
  HardHat,
  Layers,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Pencil,
} from 'lucide-react'

/**
 * Drop this in as its own component (e.g. components/ProjectQuestionnaire.jsx)
 * and render it on the Home page between the Hero section and the
 * Pillars section (id="pillars"):
 *
 *   <Hero />
 *   <ProjectQuestionnaire />
 *   <section id="pillars">...</section>
 *
 * Answers are persisted to sessionStorage under STORAGE_KEY as the user
 * goes, and passed to /register via router state + sessionStorage on
 * submit, so the register page can read and pre-fill from either.
 */

const STORAGE_KEY = 'buildos_project_intent'

const QUESTIONS = [
  {
    key: 'intent',
    title: 'What do you want to do?',
    subtitle: "Let's match you with the right team and process.",
    options: [
      { value: 'build', label: 'Build something new', icon: HardHat },
      { value: 'renovate', label: 'Renovate or complete an existing structure', icon: Layers },
      { value: 'diaspora', label: 'Manage a build remotely (diaspora)', icon: Building2 },
    ],
  },
  {
    key: 'landStatus',
    title: 'Do you already have land?',
    subtitle: 'This tells us whether you need site acquisition support.',
    skipIf: (a) => a.intent === 'renovate',
    options: [
      { value: 'owned', label: 'Yes, I own the land', icon: FileCheck2 },
      { value: 'selected', label: "I've found a plot, haven't purchased it", icon: MapPin },
      { value: 'searching', label: 'Still searching for land', icon: MapPin },
      { value: 'help', label: 'I need help finding and verifying land', icon: ScrollText },
    ],
  },
  {
    key: 'location',
    title: 'Where is the project located?',
    subtitle: 'This helps us match you with nearby verified professionals.',
    options: [
      { value: 'abuja', label: 'Abuja (FCT)', icon: MapPin },
      { value: 'lagos', label: 'Lagos', icon: MapPin },
      { value: 'portharcourt', label: 'Port Harcourt', icon: MapPin },
      { value: 'kano', label: 'Kano', icon: MapPin },
      { value: 'other', label: 'Other location', icon: MapPin },
    ],
  },
  {
    key: 'propertyType',
    title: 'What are you building?',
    options: [
      { value: 'bungalow', label: 'Bungalow', icon: HomeIcon },
      { value: 'duplex', label: 'Duplex', icon: Building },
      { value: 'terrace', label: 'Terrace / row house', icon: Warehouse },
      { value: 'flats', label: 'Block of flats', icon: Building2 },
      { value: 'commercial', label: 'Commercial building', icon: Landmark },
      { value: 'office', label: 'Office complex', icon: Building2 },
      { value: 'hotel', label: 'Hotel / hospitality', icon: Landmark },
      { value: 'warehouse', label: 'Warehouse / industrial', icon: Warehouse },
      { value: 'estate', label: 'Housing estate', icon: Building2 },
    ],
  },
  {
    key: 'stage',
    title: 'What stage is your project currently in?',
    options: [
      { value: 'idea', label: 'Idea stage', icon: Sparkles },
      { value: 'land', label: 'Land acquisition', icon: MapPin },
      { value: 'design', label: 'Design & planning', icon: ScrollText },
      { value: 'approval', label: 'Government approval', icon: FileCheck2 },
      { value: 'construction', label: 'Construction started', icon: HardHat },
      { value: 'finishing', label: 'Finishing stage', icon: Layers },
    ],
  },
  {
    key: 'completion',
    title: 'How far along is the project?',
    skipIf: (a) => a.intent === 'build',
    options: [
      { value: '0', label: 'Not started' },
      { value: '25', label: '25% complete' },
      { value: '50', label: '50% complete' },
      { value: '75', label: '75% complete' },
      { value: '90', label: 'Almost finished' },
    ],
  },
  {
    key: 'style',
    title: 'What style are you going for?',
    options: [
      { value: 'luxury', label: 'Luxury', icon: Gem },
      { value: 'minimalist', label: 'Minimalist', icon: Leaf },
      { value: 'modern', label: 'Modern / contemporary', icon: Sparkles },
      { value: 'traditional', label: 'Traditional', icon: HomeIcon },
    ],
  },
  {
    key: 'size',
    title: 'Roughly how many bedrooms?',
    skippable: true,
    options: [
      { value: '1-2', label: '1 – 2 bedrooms' },
      { value: '3-4', label: '3 – 4 bedrooms' },
      { value: '5+', label: '5+ bedrooms' },
      { value: 'unsure', label: 'Not sure yet' },
    ],
  },
  {
    key: 'plans',
    title: 'Do you have building plans or drawings?',
    options: [
      { value: 'approved', label: 'Yes, approved plans ready', icon: FileCheck2 },
      { value: 'concept', label: 'I have a concept, need a professional', icon: ScrollText },
      { value: 'none', label: 'No, I need full design support', icon: Sparkles },
    ],
  },
  {
    key: 'budget',
    title: 'Estimated project value',
    subtitle: 'This stays private and is only used to shape your matches.',
    skippable: true,
    options: [
      { value: 'u10m', label: 'Under ₦10M' },
      { value: '10-30m', label: '₦10M – ₦30M' },
      { value: '30-80m', label: '₦30M – ₦80M' },
      { value: '80-150m', label: '₦80M – ₦150M' },
      { value: '150-300m', label: '₦150M – ₦300M' },
      { value: '300m+', label: '₦300M+' },
    ],
  },
  {
    key: 'funding',
    title: 'How do you plan to fund this project?',
    options: [
      { value: 'cash', label: 'Personal funds', icon: Wallet },
      { value: 'loan', label: 'Bank loan', icon: Landmark },
      { value: 'investor', label: 'Investor funding', icon: FileCheck2 },
      { value: 'mixed', label: 'Combination of sources', icon: Layers },
      { value: 'undecided', label: 'Still exploring', icon: Sparkles },
    ],
  },
  {
    key: 'timeline',
    title: 'When do you want to start?',
    options: [
      { value: 'asap', label: 'As soon as possible', icon: Clock4 },
      { value: '1-3m', label: 'In 1 – 3 months', icon: Clock4 },
      { value: '3-6m', label: 'In 3 – 6 months', icon: Clock4 },
      { value: 'exploring', label: 'Just exploring for now', icon: Clock4 },
    ],
  },
]

function loadSavedAnswers() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function ProjectQuestionnaire() {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState(loadSavedAnswers)
  const [stepIndex, setStepIndex] = useState(0)
  const [reviewing, setReviewing] = useState(false)

  // Only questions whose skipIf condition (if any) is not met are "visible".
  const visibleQuestions = useMemo(
    () => QUESTIONS.filter((q) => !q.skipIf || !q.skipIf(answers)),
    [answers]
  )

  const current = visibleQuestions[stepIndex]
  const progress = reviewing
    ? 100
    : Math.round(((stepIndex + 1) / visibleQuestions.length) * 100)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
    } catch {
      // sessionStorage unavailable — fail silently, answers still work in-session
    }
  }, [answers])

  // If the current step becomes invalid (e.g. user picked "renovate" after
  // being past the land step), clamp the index back into range.
  useEffect(() => {
    if (stepIndex > visibleQuestions.length - 1) {
      setStepIndex(Math.max(0, visibleQuestions.length - 1))
    }
  }, [visibleQuestions, stepIndex])

  const choose = (value) => {
    const next = { ...answers, [current.key]: value }
    setAnswers(next)
    if (stepIndex < visibleQuestions.length - 1) {
      setStepIndex(stepIndex + 1)
    } else {
      setReviewing(true)
    }
  }

  const skip = () => {
    const next = { ...answers, [current.key]: null }
    setAnswers(next)
    if (stepIndex < visibleQuestions.length - 1) {
      setStepIndex(stepIndex + 1)
    } else {
      setReviewing(true)
    }
  }

  const goBack = () => {
    if (reviewing) {
      setReviewing(false)
      setStepIndex(visibleQuestions.length - 1)
    } else if (stepIndex > 0) {
      setStepIndex(stepIndex - 1)
    }
  }

  const editStep = (key) => {
    const idx = visibleQuestions.findIndex((q) => q.key === key)
    if (idx !== -1) {
      setReviewing(false)
      setStepIndex(idx)
    }
  }

  const submit = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
    } catch {
      // ignore
    }
    navigate('/register', { state: { projectIntent: answers } })
  }

  const labelFor = (question, value) =>
    question.options.find((o) => o.value === value)?.label ?? null

  return (
    <section id="get-started" className="border-b border-line bg-white">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-teal">
            Tell us about your project
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {reviewing ? 'Review your project' : current?.title}
          </h2>
          {!reviewing && current?.subtitle && (
            <p className="mt-2 text-sm leading-6 text-ink/50">{current.subtitle}</p>
          )}
        </div>

        {/* Progress bar */}
        <div className="mx-auto mt-8 h-1.5 max-w-sm overflow-hidden rounded-full bg-paper-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal to-amber transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-wider text-ink/30">
          {reviewing
            ? 'Ready to submit'
            : `Step ${stepIndex + 1} of ${visibleQuestions.length}`}
        </p>

        {/* Question step */}
        {!reviewing && current && (
          <div key={current.key} className="animate-toast-in mt-10">
            <div className="grid gap-4 sm:grid-cols-2">
              {current.options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => choose(opt.value)}
                  className="corner-ticks group flex items-center gap-4 rounded-2xl border border-line bg-paper p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:bg-white hover:shadow-[0_24px_50px_-30px_rgba(22,87,255,0.4)]"
                >
                  {opt.icon && (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-light text-teal">
                      <opt.icon size={19} />
                    </div>
                  )}
                  <span className="font-display text-base font-semibold text-ink">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={stepIndex === 0}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/40 transition-colors hover:text-ink disabled:opacity-0"
              >
                <ArrowLeft size={14} />
                Back
              </button>

              {current.skippable && (
                <button
                  type="button"
                  onClick={skip}
                  className="text-xs font-semibold text-ink/40 underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  Skip this
                </button>
              )}
            </div>
          </div>
        )}

        {/* Review step */}
        {reviewing && (
          <div className="animate-toast-in mt-10">
            <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-paper">
              {visibleQuestions.map((q) => {
                const value = answers[q.key]
                const label = value ? labelFor(q, value) : 'Skipped'
                return (
                  <div
                    key={q.key}
                    className="flex items-center justify-between gap-4 bg-white px-5 py-4"
                  >
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink/35">
                        {q.title}
                      </p>
                      <p className="mt-1 text-sm font-medium text-ink">{label}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => editStep(q.key)}
                      className="flex shrink-0 items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-[11px] font-semibold text-ink/50 transition-colors hover:border-teal/30 hover:text-teal"
                    >
                      <Pencil size={11} />
                      Edit
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-xl border border-teal/15 bg-teal-light p-4">
              <Wallet size={16} className="shrink-0 text-teal" />
              <p className="text-[12px] leading-5 text-ink/60">
                Create your account to see verified contractors matched to this
                project — your answers carry over automatically.
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/40 transition-colors hover:text-ink"
              >
                <ArrowLeft size={14} />
                Back to edit
              </button>

              <button
                type="button"
                onClick={submit}
                className="group brand-gradient inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_32px_-14px_rgba(22,87,255,0.7)] transition-all hover:-translate-y-0.5"
              >
                See matched contractors
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}