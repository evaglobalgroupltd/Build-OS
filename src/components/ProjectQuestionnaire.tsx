import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FileCheck2,
  ShieldCheck,
  Pencil,
  Check,
  Plus,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  X,
} from 'lucide-react'

import { useAuth } from '@/context/AuthContext'
import type { UserRole } from '@/types'
import {
  COVERAGE_STATES,
  PROJECT_TYPES,
  PROPERTY_TYPES,
  HOME_FEELINGS,
  PRIORITIES,
  INVESTMENT_BANDS,
  LAND_STATUS_OPTIONS,
  OWNED_LAND_READINESS_OPTIONS,
  DESIGN_NEED_OPTIONS,
  DRAWINGS_NEED_OPTIONS,
  CONTRACTOR_NEED_OPTIONS,
  CAPACITY_OPTIONS,
  SUPPLY_CAPACITY_OPTIONS,
  CONTRACTOR_SPECIALTIES,
  TEAM_SIZE_OPTIONS,
  MATERIAL_CATEGORIES,
  PROFESSIONAL_SPECIALIZATIONS,
  PROJECT_MANAGEMENT_SPECIALIZATIONS,
  getStageOptionsForLandStatus,
  type StudioOption,
  type InvestmentBand,
} from '@/data/projectOptions'
import { PROJECT_PROFILE_UPDATED_EVENT } from '@/hooks/useProjectProfile'

/* ============================================================
   PROJECT STUDIO
   ------------------------------------------------------------
   "role → flow → sections → steps" onboarding. Everything lives
   in this one file so it can drop straight into the existing
   route in place of the old ProjectQuestionnaire.tsx. The
   exported component name, its (empty) props, the localStorage
   answer format and the navigate() state contract are unchanged.

   Option catalogs live in src/data/projectOptions.ts so dashboards
   can turn a stored answer like "duplex" into "Duplex" using the
   same source of truth.
   ============================================================ */

/* ---------- Types ---------- */

type StepType = 'single' | 'multi' | 'textarea' | 'upload' | 'investment'

type StudioStep = {
  key: string
  section: string
  title: string
  description?: string
  type: StepType
  max?: number
  optional?: boolean
  options?: StudioOption[]
  /** Resolve options from earlier answers (used instead of a static `options`). */
  dynamicOptions?: (answers: StudioAnswers) => StudioOption[]
  bands?: InvestmentBand[]
  skipIf?: (answers: StudioAnswers) => boolean
}

type StudioSection = { id: string; label: string }

type OnboardingFlow = {
  role: string
  title: string
  sections: StudioSection[]
  steps: StudioStep[]
}

type StudioAnswers = Record<string, any>

type SectionStatus = 'complete' | 'active' | 'upcoming'

/* ---------- Constants ---------- */

const NON_RESIDENTIAL = ['commercial', 'hospitality', 'community']
const TEXTAREA_MAX = 600
const MAX_FILES = 10
const MAX_FILE_BYTES = 10 * 1024 * 1024
const ACCEPT_ATTR = 'image/*,.pdf,.doc,.docx'
const ACCEPT_EXT = /\.(pdf|docx?|jpe?g|png|gif|webp|heic|avif)$/i

/* ---------- Flows ---------- */

const CLIENT_FLOW: OnboardingFlow = {
  role: 'client',
  title: 'Project Studio',
  sections: [
    { id: 'intent', label: 'Intent' },
    { id: 'property', label: 'Property' },
    { id: 'place', label: 'Place' },
    { id: 'readiness', label: 'Readiness' },
    { id: 'vision', label: 'Vision' },
    { id: 'priorities', label: 'Priorities' },
    { id: 'investment', label: 'Investment' },
    { id: 'references', label: 'References' },
    { id: 'brief', label: 'Brief' },
  ],
  steps: [
    {
      key: 'projectType',
      section: 'intent',
      title: "Let's define the project.",
      description: 'Start with the kind of project you\u2019re bringing to life. We\u2019ll shape the rest around it.',
      type: 'single',
      options: PROJECT_TYPES,
    },
    {
      key: 'propertyType',
      section: 'property',
      title: 'What are you creating?',
      description: 'Select the layout that fits your lifestyle and goals.',
      type: 'single',
      skipIf: (a) => NON_RESIDENTIAL.includes(a.projectType),
      options: PROPERTY_TYPES,
    },
    {
      key: 'location',
      section: 'place',
      title: 'Set the project location.',
      description: 'We use this to connect you with verified professionals in the right area.',
      type: 'single',
      options: COVERAGE_STATES,
    },
    {
      key: 'landStatus',
      section: 'readiness',
      title: 'Where are you in your journey?',
      description: 'This helps us route you to the right next step.',
      type: 'single',
      options: LAND_STATUS_OPTIONS,
    },
    {
      key: 'landDetails',
      section: 'readiness',
      title: 'Tell us where you are looking.',
      description: 'Share the area you\u2019re considering so we can route you to the right land partners.',
      type: 'textarea',
      skipIf: (a) => a.landStatus !== 'searching',
    },
    {
      key: 'ownedLandReadiness',
      section: 'readiness',
      title: 'How ready is your land?',
      description: 'This tells us whether to route you straight to design or to verification first.',
      type: 'single',
      skipIf: (a) => a.landStatus !== 'owned',
      options: OWNED_LAND_READINESS_OPTIONS,
    },
    {
      key: 'designNeed',
      section: 'readiness',
      title: 'What kind of design support do you need?',
      description: 'This helps us match you with the right architect or engineer.',
      type: 'single',
      skipIf: (a) => a.landStatus !== 'design',
      options: DESIGN_NEED_OPTIONS,
    },
    {
      key: 'drawingsNeed',
      section: 'readiness',
      title: 'What do you need next?',
      description: 'Your plans are ready \u2014 let\u2019s figure out the right next step.',
      type: 'single',
      skipIf: (a) => a.landStatus !== 'drawings',
      options: DRAWINGS_NEED_OPTIONS,
    },
    {
      key: 'contractorNeed',
      section: 'readiness',
      title: 'What would help most right now?',
      description: 'Your build team is chosen \u2014 tell us what to prioritize.',
      type: 'single',
      skipIf: (a) => a.landStatus !== 'contractor',
      options: CONTRACTOR_NEED_OPTIONS,
    },
    {
      key: 'stage',
      section: 'readiness',
      title: 'Where are you in the project journey?',
      description: 'We\u2019ve already captured your land situation. Choose the point that best describes your project now.',
      type: 'single',
      dynamicOptions: (a) => getStageOptionsForLandStatus(a.landStatus),
    },
    {
      key: 'feel',
      section: 'vision',
      title: 'Shape the experience.',
      description: 'Choose up to three feelings you want every day in this home.',
      type: 'multi',
      max: 3,
      skipIf: (a) => NON_RESIDENTIAL.includes(a.projectType),
      options: HOME_FEELINGS,
    },
    {
      key: 'priorities',
      section: 'priorities',
      title: 'Define what matters.',
      description: 'Select the elements that should influence the project.',
      type: 'multi',
      max: 5,
      options: PRIORITIES,
    },
    {
      key: 'budget',
      section: 'investment',
      title: "What's the working range for this project?",
      description: 'This helps us calibrate professional matches, procurement and project planning. It stays private.',
      type: 'investment',
      bands: INVESTMENT_BANDS,
    },
    {
      key: 'inspiration',
      section: 'references',
      title: 'Give your project team a sense of what you\u2019re envisioning.',
      description: 'Images, drawings, or documents. You can always add more later from your Project Vault.',
      type: 'upload',
      optional: true,
    },
    {
      key: 'notes',
      section: 'brief',
      title: 'Anything else we should know?',
      description: 'Tell us anything that would help your architect or project team understand your vision.',
      type: 'textarea',
      optional: true,
    },
  ],
}

const CONTRACTOR_FLOW: OnboardingFlow = {
  role: 'contractor',
  title: 'Contractor Studio',
  sections: [
    { id: 'practice', label: 'Practice' },
    { id: 'coverage', label: 'Coverage' },
    { id: 'capacity', label: 'Capacity' },
    { id: 'verification', label: 'Verification' },
    { id: 'brief', label: 'Brief' },
  ],
  steps: [
    {
      key: 'specialty',
      section: 'practice',
      title: 'What do you specialize in?',
      description: 'Select up to three areas you actively take on.',
      type: 'multi',
      max: 3,
      options: CONTRACTOR_SPECIALTIES,
    },
    {
      key: 'coverageStates',
      section: 'coverage',
      title: 'Which states do you operate in?',
      description: 'Select up to five. We\u2019ll match you to projects in these areas.',
      type: 'multi',
      max: 5,
      options: COVERAGE_STATES,
    },
    {
      key: 'teamSize',
      section: 'capacity',
      title: 'How big is your team?',
      description: 'This helps us gauge the scale of projects you can take on.',
      type: 'single',
      options: TEAM_SIZE_OPTIONS,
    },
    {
      key: 'activeCapacity',
      section: 'capacity',
      title: 'How many new projects can you take on?',
      description: 'We\u2019ll only route bids that fit your current capacity.',
      type: 'single',
      options: CAPACITY_OPTIONS,
    },
    {
      key: 'verification',
      section: 'verification',
      title: 'Upload your business documents.',
      description: 'Registration, licenses or certifications help you get verified faster.',
      type: 'upload',
      optional: true,
    },
    {
      key: 'notes',
      section: 'brief',
      title: 'Anything else we should know?',
      description: 'Tell us anything that would help us match you with the right projects.',
      type: 'textarea',
      optional: true,
    },
  ],
}

const PROJECT_MANAGER_FLOW: OnboardingFlow = {
  role: 'project_manager',
  title: 'Project Manager Studio',
  sections: [
    { id: 'coverage', label: 'Coverage' },
    { id: 'practice', label: 'Practice' },
    { id: 'capacity', label: 'Capacity' },
    { id: 'brief', label: 'Brief' },
  ],
  steps: [
    {
      key: 'coverageStates',
      section: 'coverage',
      title: 'Which states do you operate in?',
      description: 'Select up to five. We\u2019ll match you to projects in these areas.',
      type: 'multi',
      max: 5,
      options: COVERAGE_STATES,
    },
    {
      key: 'specialization',
      section: 'practice',
      title: 'What kinds of projects do you manage?',
      description: 'Select up to three.',
      type: 'multi',
      max: 3,
      options: PROJECT_MANAGEMENT_SPECIALIZATIONS,
    },
    {
      key: 'certifications',
      section: 'practice',
      title: 'List any relevant certifications.',
      description: 'PMP, COREN, NIOB, or any other credentials worth mentioning.',
      type: 'textarea',
      optional: true,
    },
    {
      key: 'capacity',
      section: 'capacity',
      title: 'How many concurrent projects can you oversee?',
      description: 'We\u2019ll only route assignments that fit your current capacity.',
      type: 'single',
      options: CAPACITY_OPTIONS,
    },
    {
      key: 'notes',
      section: 'brief',
      title: 'Anything else we should know?',
      description: 'Tell us anything that would help us match you with the right projects.',
      type: 'textarea',
      optional: true,
    },
  ],
}

const PROFESSIONAL_FLOW: OnboardingFlow = {
  role: 'professional',
  title: 'Practice Studio',
  sections: [
    { id: 'practice', label: 'Practice' },
    { id: 'coverage', label: 'Coverage' },
    { id: 'verification', label: 'Portfolio' },
    { id: 'capacity', label: 'Capacity' },
    { id: 'brief', label: 'Brief' },
  ],
  steps: [
    {
      key: 'specialization',
      section: 'practice',
      title: 'What do you specialize in?',
      description: 'Select up to three areas that best describe your work.',
      type: 'multi',
      max: 3,
      options: PROFESSIONAL_SPECIALIZATIONS,
    },
    {
      key: 'coverageStates',
      section: 'coverage',
      title: 'Which states do you operate in?',
      description: 'Select up to five. We\u2019ll match you to projects in these areas.',
      type: 'multi',
      max: 5,
      options: COVERAGE_STATES,
    },
    {
      key: 'portfolio',
      section: 'verification',
      title: 'Share examples of your past work.',
      description: 'Upload drawings, photos or a portfolio to help clients understand your style.',
      type: 'upload',
      optional: true,
    },
    {
      key: 'capacity',
      section: 'capacity',
      title: 'How many new engagements can you take on?',
      description: 'We\u2019ll only route work that fits your current capacity.',
      type: 'single',
      options: CAPACITY_OPTIONS,
    },
    {
      key: 'notes',
      section: 'brief',
      title: 'Anything else we should know?',
      description: 'Tell us anything that would help us match you with the right clients.',
      type: 'textarea',
      optional: true,
    },
  ],
}

const SUPPLIER_FLOW: OnboardingFlow = {
  role: 'market_place',
  title: 'Supplier Studio',
  sections: [
    { id: 'practice', label: 'Supply' },
    { id: 'coverage', label: 'Coverage' },
    { id: 'capacity', label: 'Capacity' },
    { id: 'verification', label: 'Verification' },
    { id: 'brief', label: 'Brief' },
  ],
  steps: [
    {
      key: 'categories',
      section: 'practice',
      title: 'Which material categories do you supply?',
      description: 'Select up to five.',
      type: 'multi',
      max: 5,
      options: MATERIAL_CATEGORIES,
    },
    {
      key: 'coverageStates',
      section: 'coverage',
      title: 'Which states can you deliver to?',
      description: 'Select up to five.',
      type: 'multi',
      max: 5,
      options: COVERAGE_STATES,
    },
    {
      key: 'supplyCapacity',
      section: 'capacity',
      title: 'What\u2019s your typical supply capacity?',
      description: 'This helps us match you to the right size of orders.',
      type: 'single',
      options: SUPPLY_CAPACITY_OPTIONS,
    },
    {
      key: 'verification',
      section: 'verification',
      title: 'Upload your business documents.',
      description: 'Business registration helps you get verified faster.',
      type: 'upload',
      optional: true,
    },
    {
      key: 'notes',
      section: 'brief',
      title: 'Anything else we should know?',
      description: 'Tell us anything that would help us match you with the right buyers.',
      type: 'textarea',
      optional: true,
    },
  ],
}

const ONBOARDING_FLOWS: Record<UserRole, OnboardingFlow> = {
  client: CLIENT_FLOW,
  diaspora_client: CLIENT_FLOW,
  contractor: CONTRACTOR_FLOW,
  project_manager: PROJECT_MANAGER_FLOW,
  professional: PROFESSIONAL_FLOW,
  market_place: SUPPLIER_FLOW,
  admin: CLIENT_FLOW,
}

const ROLE_HOME_PATH: Record<UserRole, string> = {
  client: '/app/client',
  diaspora_client: '/app/client',
  contractor: '/app/contractor',
  project_manager: '/app/pm',
  professional: '/app/professional',
  market_place: '/app/market',
  admin: '/app/admin',
}

/* ---------- Answer helpers ---------- */

function getVisibleSteps(flow: OnboardingFlow, answers: StudioAnswers): StudioStep[] {
  return flow.steps
    .filter((step) => !step.skipIf?.(answers))
    .map((step) => (step.dynamicOptions ? { ...step, options: step.dynamicOptions(answers) } : step))
}

/**
 * A step counts as answered only when its stored value is still valid. That
 * means a stale choice (e.g. a "stage" that no longer exists after the person
 * changed their land status) is treated as unanswered instead of silently kept.
 */
function isStepAnswered(step: StudioStep, answers: StudioAnswers): boolean {
  const value = answers[step.key]
  if (value === undefined || value === null) return false

  if (Array.isArray(value)) {
    if (!value.length) return false
    if (step.options) return value.some((v) => step.options!.some((o) => o.value === v))
    return true
  }

  if (typeof value === 'string') {
    if (!value.trim()) return false
    if (step.type === 'single' && step.options) return step.options.some((o) => o.value === value)
    if (step.type === 'investment' && step.bands) return step.bands.some((b) => b.value === value)
  }

  return true
}

/** Answered, or deliberately skipped (skipped optional steps are stored as null). */
function isStepDone(step: StudioStep, answers: StudioAnswers): boolean {
  return isStepAnswered(step, answers) || answers[step.key] === null
}

function computeSectionStatuses(
  sections: StudioSection[],
  activeSectionId: string | undefined,
  reviewing: boolean
): Record<string, SectionStatus> {
  const activeIndex = reviewing ? -1 : sections.findIndex((s) => s.id === activeSectionId)
  const statuses: Record<string, SectionStatus> = {}

  sections.forEach((section, index) => {
    if (activeIndex === -1) statuses[section.id] = 'complete'
    else if (index === activeIndex) statuses[section.id] = 'active'
    else statuses[section.id] = index < activeIndex ? 'complete' : 'upcoming'
  })

  return statuses
}

function getAnswerLabels(step: StudioStep, value: any): string[] {
  if (value === undefined || value === null || value === '') return []
  const values: any[] = Array.isArray(value) ? value : [value]

  return values.map((item) => {
    if (step.type === 'investment') {
      const band = step.bands?.find((b) => b.value === item)
      return band ? band.range : String(item)
    }
    return step.options?.find((o) => o.value === item)?.label ?? String(item)
  })
}

function formatAnswerValue(step: StudioStep, value: any): string {
  const labels = getAnswerLabels(step, value)
  return labels.length ? labels.join(', ') : 'Not provided'
}

function buildProfileTags(visibleSteps: StudioStep[], answers: StudioAnswers, limit = 6): string[] {
  const tags: string[] = []

  for (const step of visibleSteps) {
    if (step.type === 'textarea' || step.type === 'upload') continue
    if (!isStepAnswered(step, answers)) continue
    // Labels are resolved per item, so a label containing a comma
    // (e.g. "Aggregates (sand, granite)") stays one tag.
    for (const label of getAnswerLabels(step, answers[step.key])) {
      if (!tags.includes(label)) tags.push(label)
    }
  }

  return tags.slice(0, limit)
}

function completionPercent(visibleSteps: StudioStep[], answers: StudioAnswers): number {
  if (!visibleSteps.length) return 0
  const done = visibleSteps.filter((step) => isStepDone(step, answers)).length
  return Math.round((done / visibleSteps.length) * 100)
}

/** Drop answers for steps that are no longer visible, and choices that are no longer valid. */
function sanitizeAnswers(flow: OnboardingFlow, answers: StudioAnswers): StudioAnswers {
  const clean: StudioAnswers = {}

  for (const step of getVisibleSteps(flow, answers)) {
    const value = answers[step.key]
    if (value === undefined) continue

    if (value !== null && step.options && (step.type === 'single' || step.type === 'multi')) {
      const allowed = new Set(step.options.map((o) => o.value))
      if (Array.isArray(value)) clean[step.key] = value.filter((v) => allowed.has(v))
      else if (allowed.has(value)) clean[step.key] = value
      continue
    }

    clean[step.key] = value
  }

  return clean
}

function loadSavedAnswers(storageKey: string): StudioAnswers {
  try {
    const raw = localStorage.getItem(storageKey)
    const parsed = raw ? JSON.parse(raw) : {}
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

/** Resume where the person left off (progress is stored separately from the answers). */
function loadSavedStepIndex(flow: OnboardingFlow, answers: StudioAnswers, progressKey: string): number {
  try {
    const savedKey = localStorage.getItem(progressKey)
    if (!savedKey) return 0
    return Math.max(0, getVisibleSteps(flow, answers).findIndex((s) => s.key === savedKey))
  } catch {
    return 0
  }
}

function summarizeUploads(count: number, noun: string): string {
  return count > 0 ? `${count} ${noun}${count > 1 ? 's' : ''} added` : ''
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function isAcceptedFile(file: File): boolean {
  return file.type.startsWith('image/') || ACCEPT_EXT.test(file.name)
}

/* ---------- Inline design tokens (scoped to .studio-root) ---------- */

const STUDIO_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,380;9..144,460;9..144,560&family=Inter:wght@400;500;600;700&display=swap');

.studio-root {
  --studio-obsidian: #0b1220;
  --studio-midnight: #111827;
  --studio-paper: #f7f8fa;
  --studio-white: #ffffff;
  --studio-soft: #f1f3f6;
  --studio-cobalt: #1657ff;
  --studio-sky: #34a6ff;
  --studio-ink: #111827;
  --studio-muted: #667085;
  --studio-faint: #97a0af;
  --studio-line: #e6e8ec;
  /* Pre-mixed tints. Tailwind's "/opacity" modifier can't be applied to
     var() colours in every version, so these are explicit tokens. */
  --studio-ink-70: rgba(17, 24, 39, 0.7);
  --studio-ink-60: rgba(17, 24, 39, 0.6);
  --studio-ink-30: rgba(17, 24, 39, 0.3);
  --studio-ink-25: rgba(17, 24, 39, 0.25);
  --studio-soft-60: rgba(241, 243, 246, 0.6);
  --font-studio-display: 'Fraunces', 'Iowan Old Style', Georgia, serif;
  --font-studio-ui: 'Inter', -apple-system, 'Segoe UI', sans-serif;
  font-family: var(--font-studio-ui);
  color: var(--studio-ink);
  background: var(--studio-paper);
}
.studio-root .font-studio-display {
  font-family: var(--font-studio-display);
  font-feature-settings: 'ss01' 1;
}
.studio-root :focus-visible {
  outline: 2px solid var(--studio-cobalt);
  outline-offset: 2px;
}
.studio-root textarea:focus-visible { outline: none; }
.studio-root .studio-step-enter {
  animation: studio-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes studio-fade {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}
.studio-root .studio-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 3px;
  background: linear-gradient(
    to right,
    var(--studio-obsidian) var(--fill, 0%),
    var(--studio-line) var(--fill, 0%)
  );
  border-radius: 999px;
  outline: none;
}
.studio-root .studio-range:focus-visible {
  outline: 2px solid var(--studio-cobalt);
  outline-offset: 10px;
}
.studio-root .studio-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: var(--studio-obsidian);
  border: 3px solid var(--studio-white);
  box-shadow: 0 2px 10px rgba(11, 18, 32, 0.35);
  cursor: pointer;
  margin-top: -8.5px;
}
.studio-root .studio-range::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: var(--studio-obsidian);
  border: 3px solid var(--studio-white);
  box-shadow: 0 2px 10px rgba(11, 18, 32, 0.35);
  cursor: pointer;
}
.studio-root .studio-range[data-empty='true']::-webkit-slider-thumb { background: var(--studio-faint); }
.studio-root .studio-range[data-empty='true']::-moz-range-thumb { background: var(--studio-faint); }
.studio-root .studio-range::-webkit-slider-runnable-track { height: 3px; border-radius: 999px; }
@media (prefers-reduced-motion: reduce) {
  .studio-root * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
`

/* ---------- Small shared components ---------- */

function SelectionMark({ selected, tone = 'light' }: { selected: boolean; tone?: 'light' | 'dark' }) {
  if (tone === 'dark') {
    return (
      <div
        aria-hidden="true"
        className={[
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all',
          selected ? 'border-white bg-white text-[var(--studio-obsidian)]' : 'border-white/50 bg-white/10 text-transparent backdrop-blur-sm',
        ].join(' ')}
      >
        {selected && <Check size={15} strokeWidth={2.5} />}
      </div>
    )
  }
  return (
    <div
      aria-hidden="true"
      className={[
        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all',
        selected
          ? 'border-[var(--studio-obsidian)] bg-[var(--studio-obsidian)] text-white'
          : 'border-[var(--studio-line)] bg-white text-transparent group-hover:border-[var(--studio-cobalt)]',
      ].join(' ')}
    >
      {selected && <Check size={13} strokeWidth={3} />}
    </div>
  )
}

function ProjectProfileCard({ tags, percent, tone = 'dark' }: { tags: string[]; percent: number; tone?: 'dark' | 'light' }) {
  const dark = tone === 'dark'
  return (
    <div className={['rounded-[18px] border p-5', dark ? 'border-white/10 bg-white/[0.04]' : 'border-[var(--studio-line)] bg-white'].join(' ')}>
      <div className={['font-studio-display text-[13px] italic tracking-tight', dark ? 'text-white/90' : 'text-[var(--studio-ink)]'].join(' ')}>
        Project Profile
      </div>
      <div className={dark ? 'mt-0.5 text-[11px] text-white/40' : 'mt-0.5 text-[11px] text-[var(--studio-muted)]'}>
        Draft &middot; Private
      </div>
      {tags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className={[
                'rounded-full px-2.5 py-1 text-[11px] font-medium leading-none',
                dark ? 'bg-white/[0.08] text-white/75' : 'bg-[var(--studio-soft)] text-[var(--studio-ink-70)]',
              ].join(' ')}
            >
              {tag}
            </span>
          ))}
        </div>
      ) : (
        <p className={dark ? 'mt-4 text-[12px] leading-5 text-white/40' : 'mt-4 text-[12px] leading-5 text-[var(--studio-muted)]'}>
          Your choices will build your profile as you go.
        </p>
      )}
      <div className="mt-4">
        <div
          role="progressbar"
          aria-label="Profile completion"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          className={dark ? 'h-[3px] w-full rounded-full bg-white/10' : 'h-[3px] w-full rounded-full bg-[var(--studio-soft)]'}
        >
          <div className="h-full rounded-full bg-[var(--studio-cobalt)] transition-all duration-500 ease-out" style={{ width: `${percent}%` }} />
        </div>
        <div className={dark ? 'mt-1.5 text-[10px] font-medium text-white/40' : 'mt-1.5 text-[10px] font-medium text-[var(--studio-muted)]'}>
          {percent}% defined
        </div>
      </div>
    </div>
  )
}

function StudioRail({
  title,
  sections,
  statuses,
  activeSectionId,
  onJumpToSection,
  tags,
  percent,
}: {
  title: string
  sections: StudioSection[]
  statuses: Record<string, SectionStatus>
  activeSectionId: string | undefined
  onJumpToSection: (sectionId: string) => void
  tags: string[]
  percent: number
}) {
  return (
    <aside className="hidden w-[280px] shrink-0 flex-col bg-[var(--studio-obsidian)] px-6 py-8 lg:flex">
      <div className="px-1">
        <div className="text-[13px] font-bold tracking-[-0.01em] text-white">Build OS</div>
        <div className="mt-0.5 font-studio-display text-[15px] italic text-white/50">{title}</div>
      </div>

      <nav aria-label="Project studio sections" className="mt-10 flex-1 overflow-y-auto px-1">
        <ol className="space-y-0.5">
          {sections.map((section, index) => {
            const status = statuses[section.id] ?? 'upcoming'
            const active = status === 'active' && section.id === activeSectionId
            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => onJumpToSection(section.id)}
                  disabled={status === 'upcoming'}
                  aria-current={active ? 'step' : undefined}
                  className={[
                    'group flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors',
                    active ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]',
                    status === 'upcoming' ? 'cursor-default' : 'cursor-pointer',
                  ].join(' ')}
                >
                  <span className={['font-studio-display text-[15px] italic tabular-nums', active ? 'text-[var(--studio-sky)]' : 'text-white/30'].join(' ')}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={[
                      'flex-1 text-[13.5px] font-medium',
                      active ? 'text-white' : status === 'complete' ? 'text-white/70' : 'text-white/30',
                    ].join(' ')}
                  >
                    {section.label}
                  </span>
                  {status === 'complete' && <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[var(--studio-sky)]" />}
                  {status === 'active' && <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-white" />}
                  {status === 'upcoming' && <span className="h-[6px] w-[6px] shrink-0 rounded-full border border-white/20" />}
                </button>
              </li>
            )
          })}
        </ol>
      </nav>

      <div className="mt-8 px-1">
        <ProjectProfileCard tags={tags} percent={percent} tone="dark" />
      </div>
    </aside>
  )
}

function StudioRailMobile({
  sections,
  activeSectionId,
  reviewing,
}: {
  sections: StudioSection[]
  activeSectionId: string | undefined
  reviewing: boolean
}) {
  const activeIndex = Math.max(0, sections.findIndex((s) => s.id === activeSectionId))
  return (
    <div className="border-b border-[var(--studio-line)] bg-white px-5 py-3 lg:hidden">
      <div className="flex items-center justify-between">
        <span className="font-studio-display text-[13px] italic text-[var(--studio-ink)]">
          {reviewing ? 'Review' : sections[activeIndex]?.label}
        </span>
        <span className="text-[11px] font-medium tabular-nums text-[var(--studio-muted)]">
          {reviewing ? 'Final step' : `${activeIndex + 1} / ${sections.length}`}
        </span>
      </div>
      <div className="mt-2 flex gap-1" aria-hidden="true">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={['h-[3px] flex-1 rounded-full transition-colors', reviewing || index <= activeIndex ? 'bg-[var(--studio-obsidian)]' : 'bg-[var(--studio-soft)]'].join(' ')}
          />
        ))}
      </div>
    </div>
  )
}

function StudioHeader({ title, onExit }: { title: string; onExit: () => void }) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--studio-line)] bg-white px-5 sm:px-8">
      <div className="flex items-baseline gap-2 lg:hidden">
        <span className="text-[13px] font-bold tracking-[-0.01em] text-[var(--studio-ink)]">Build OS</span>
        <span className="font-studio-display text-[13px] italic text-[var(--studio-muted)]">{title}</span>
      </div>
      <span className="hidden text-[13px] font-medium text-[var(--studio-muted)] lg:block">Your project, shaped your way.</span>
      <div className="flex items-center gap-4">
        <button type="button" onClick={onExit} className="hidden text-[13px] font-semibold text-[var(--studio-muted)] transition hover:text-[var(--studio-ink)] sm:block">
          Save &amp; exit
        </button>
        <button
          type="button"
          onClick={onExit}
          aria-label="Save and close project studio"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--studio-line)] text-[var(--studio-ink)] transition hover:border-[var(--studio-ink-30)]"
        >
          <X size={16} strokeWidth={1.8} />
        </button>
      </div>
    </header>
  )
}

function StudioControls({
  onBack,
  backDisabled,
  onSkip,
  skippable,
  onReturnToReview,
  onContinue,
  showContinue,
  continueDisabled,
  continueLabel,
}: {
  onBack: () => void
  backDisabled?: boolean
  onSkip?: () => void
  skippable?: boolean
  onReturnToReview?: () => void
  onContinue: () => void
  showContinue: boolean
  continueDisabled?: boolean
  continueLabel: string
}) {
  return (
    <div className="flex shrink-0 items-center justify-between border-t border-[var(--studio-line)] bg-white px-5 py-4 sm:px-8">
      <button
        type="button"
        onClick={onBack}
        disabled={backDisabled}
        className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[var(--studio-muted)] transition hover:text-[var(--studio-ink)] disabled:pointer-events-none disabled:opacity-0"
      >
        <ArrowLeft size={16} />
        Back
      </button>
      <div className="flex items-center gap-5">
        {onReturnToReview && (
          <button type="button" onClick={onReturnToReview} className="hidden text-[13.5px] font-semibold text-[var(--studio-muted)] underline-offset-4 transition hover:text-[var(--studio-ink)] hover:underline sm:block">
            Back to review
          </button>
        )}
        {skippable && onSkip && (
          <button type="button" onClick={onSkip} className="hidden text-[13.5px] font-semibold text-[var(--studio-muted)] underline-offset-4 transition hover:text-[var(--studio-ink)] hover:underline sm:block">
            Skip for now
          </button>
        )}
        {showContinue && (
          <button
            type="button"
            onClick={onContinue}
            disabled={continueDisabled}
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-[var(--studio-obsidian)] px-7 text-[13.5px] font-semibold text-white transition hover:bg-[var(--studio-midnight)] disabled:pointer-events-none disabled:opacity-40"
          >
            {continueLabel}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>
    </div>
  )
}

/* ---------- Step renderers ---------- */

function SingleSelectStep({ step, value, onChoose }: { step: StudioStep; value: string | undefined; onChoose: (value: string) => void }) {
  const options = step.options ?? []
  const visual = options.some((o) => Boolean(o.image))

  if (visual) {
    return (
      <div role="radiogroup" aria-label={step.title} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option, index) => {
          const selected = value === option.value
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChoose(option.value)}
              className={['group relative aspect-[4/5] overflow-hidden rounded-[20px] text-left transition-all duration-300', selected ? 'ring-2 ring-[var(--studio-obsidian)] ring-offset-2' : 'hover:-translate-y-1'].join(' ')}
            >
              {option.image ? (
                <img
                  src={option.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="absolute inset-0 bg-[var(--studio-soft)]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute left-4 top-4 font-studio-display text-[13px] italic text-white/70">{String(index + 1).padStart(2, '0')}</div>
              <div className="absolute right-4 top-4">
                <SelectionMark selected={selected} tone="dark" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="font-studio-display text-[19px] italic leading-tight text-white">{option.label}</div>
                {option.description && <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-5 text-white/70">{option.description}</p>}
              </div>
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div
      role="radiogroup"
      aria-label={step.title}
      className="divide-y divide-[var(--studio-line)] overflow-hidden rounded-[18px] border border-[var(--studio-line)] bg-white"
    >
      {options.map((option) => {
        const selected = value === option.value
        const Icon = option.icon
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChoose(option.value)}
            className={['group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors sm:px-6', selected ? 'bg-[var(--studio-soft)]' : 'hover:bg-[var(--studio-soft-60)]'].join(' ')}
          >
            {Icon && (
              <div
                aria-hidden="true"
                className={[
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors',
                  selected ? 'bg-[var(--studio-obsidian)] text-white' : 'bg-[var(--studio-soft)] text-[var(--studio-muted)] group-hover:text-[var(--studio-ink)]',
                ].join(' ')}
              >
                <Icon size={17} strokeWidth={1.8} />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="text-[14.5px] font-semibold text-[var(--studio-ink)]">{option.label}</div>
              {option.description && <p className="mt-0.5 text-[13px] leading-5 text-[var(--studio-muted)]">{option.description}</p>}
            </div>
            <SelectionMark selected={selected} />
          </button>
        )
      })}
    </div>
  )
}

function MultiSelectStep({ step, values, onToggle }: { step: StudioStep; values: string[]; onToggle: (value: string) => void }) {
  const options = step.options ?? []
  const atMax = Boolean(step.max) && values.length >= (step.max ?? Infinity)
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <span className="text-[13px] font-medium text-[var(--studio-muted)]">
          {atMax ? 'Limit reached \u2014 deselect one to change your picks' : `Choose up to ${step.max}`}
        </span>
        <span className="text-[12px] font-semibold tabular-nums text-[var(--studio-ink)]" aria-live="polite">
          {values.length} / {step.max}
        </span>
      </div>
      <div role="group" aria-label={step.title} className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const selected = values.includes(option.value)
          const blocked = atMax && !selected
          const Icon = option.icon
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              disabled={blocked}
              onClick={() => onToggle(option.value)}
              className={[
                'inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13.5px] font-semibold transition-all',
                selected
                  ? 'border-[var(--studio-obsidian)] bg-[var(--studio-obsidian)] text-white'
                  : 'border-[var(--studio-line)] bg-white text-[var(--studio-ink)] hover:border-[var(--studio-ink-30)]',
                blocked ? 'cursor-not-allowed opacity-40 hover:border-[var(--studio-line)]' : '',
              ].join(' ')}
            >
              {Icon && <Icon size={14} strokeWidth={2} className={selected ? 'text-white' : 'text-[var(--studio-muted)]'} />}
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function TextareaStep({ step, value, onChange }: { step: StudioStep; value: string; onChange: (value: string) => void }) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-[var(--studio-line)] bg-white transition-colors focus-within:border-[var(--studio-ink-30)]">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={TEXTAREA_MAX}
        rows={7}
        aria-label={step.title}
        placeholder={'Share anything that would help us understand your project\u2026'}
        className="w-full resize-none border-0 bg-transparent px-6 py-6 text-[15.5px] leading-7 text-[var(--studio-ink)] outline-none placeholder:text-[var(--studio-faint)]"
      />
      <div className="flex justify-end border-t border-[var(--studio-line)] px-5 py-2.5">
        <span className="text-[11px] font-medium tabular-nums text-[var(--studio-faint)]">{value.length}/{TEXTAREA_MAX}</span>
      </div>
    </div>
  )
}

function UploadStep({
  noun,
  files,
  savedSummary,
  onAdd,
  onRemove,
}: {
  noun: string
  files: File[]
  savedSummary?: string
  onAdd: (files: File[]) => void
  onRemove: (index: number) => void
}) {
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleIncoming = (list: FileList | null) => {
    const incoming = Array.from(list ?? [])
    if (!incoming.length) return

    const problems: string[] = []
    const accepted: File[] = []
    let room = MAX_FILES - files.length

    for (const file of incoming) {
      if (!isAcceptedFile(file)) problems.push(`${file.name} isn\u2019t a supported file type.`)
      else if (file.size > MAX_FILE_BYTES) problems.push(`${file.name} is larger than 10 MB.`)
      else if (room <= 0) problems.push(`You can add up to ${MAX_FILES} files here.`)
      else {
        accepted.push(file)
        room -= 1
      }
    }

    setError(problems.length ? Array.from(new Set(problems)).join(' ') : null)
    if (accepted.length) onAdd(accepted)
  }

  return (
    <div>
      <label
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          handleIncoming(e.dataTransfer.files)
        }}
        className={[
          'block cursor-pointer rounded-[22px] border bg-white p-10 text-center transition focus-within:ring-2 focus-within:ring-[var(--studio-cobalt)] sm:p-14',
          dragging ? 'border-[var(--studio-cobalt)] bg-[var(--studio-soft)]' : 'border-[var(--studio-line)] hover:border-[var(--studio-ink-25)]',
        ].join(' ')}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[var(--studio-line)]">
          <Plus size={22} strokeWidth={1.6} className="text-[var(--studio-ink)]" />
        </div>
        <h3 className="mt-5 text-[15px] font-semibold text-[var(--studio-ink)]">Drop {noun}s here</h3>
        <p className="mt-1.5 text-[13px] text-[var(--studio-muted)]">Images &middot; Drawings &middot; PDFs &middot; Documents &middot; up to 10 MB each</p>
        <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--studio-ink)] px-5 py-2.5 text-[13px] font-semibold text-[var(--studio-ink)] transition hover:bg-[var(--studio-ink)] hover:text-white">
          Upload {noun}s
        </span>
        <input
          type="file"
          multiple
          accept={ACCEPT_ATTR}
          className="sr-only"
          onChange={(e) => {
            handleIncoming(e.target.files)
            e.target.value = '' // allow re-selecting the same file after removing it
          }}
        />
      </label>

      {error && (
        <div role="alert" className="mt-4 flex items-start gap-2.5 rounded-[14px] border border-[var(--studio-line)] bg-white px-4 py-3 text-[13px] leading-5 text-[var(--studio-ink)]">
          <AlertCircle size={16} className="mt-0.5 shrink-0 text-[var(--studio-muted)]" />
          <span>{error}</span>
        </div>
      )}

      {files.length > 0 ? (
        <ul className="mt-4 divide-y divide-[var(--studio-line)] overflow-hidden rounded-[16px] border border-[var(--studio-line)] bg-white">
          {files.map((file, index) => (
            <li key={`${file.name}-${file.size}-${file.lastModified}`} className="flex items-center gap-3 px-4 py-3">
              <FileCheck2 size={16} className="shrink-0 text-[var(--studio-muted)]" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13.5px] font-semibold text-[var(--studio-ink)]">{file.name}</div>
                <div className="text-[12px] text-[var(--studio-muted)]">{formatBytes(file.size)}</div>
              </div>
              <button
                type="button"
                onClick={() => onRemove(index)}
                aria-label={`Remove ${file.name}`}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--studio-muted)] transition hover:bg-[var(--studio-soft)] hover:text-[var(--studio-ink)]"
              >
                <X size={15} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        savedSummary && (
          <div className="mt-4 text-[13px] font-semibold text-[var(--studio-ink)]">
            {savedSummary} earlier. Add them again if you&rsquo;d like them attached.
          </div>
        )
      )}

      <p className="mt-4 text-[12.5px] text-[var(--studio-faint)]">You can add more later from your Project Vault.</p>
    </div>
  )
}

function InvestmentStep({ step, value, onChoose }: { step: StudioStep; value: string | undefined; onChoose: (value: string) => void }) {
  const bands = step.bands ?? []
  const rawIndex = bands.findIndex((b) => b.value === value)
  const selectedIndex = Math.max(0, rawIndex)
  const selectedBand = rawIndex === -1 ? undefined : bands[rawIndex]
  const fill = rawIndex === -1 || bands.length < 2 ? 0 : (rawIndex / (bands.length - 1)) * 100

  return (
    <div>
      <div className="font-studio-display text-[40px] italic leading-none tracking-tight text-[var(--studio-ink)] sm:text-[52px]" aria-live="polite">
        {selectedBand ? selectedBand.range : 'Select a range'}
      </div>
      <div className="mt-10 rounded-[20px] border border-[var(--studio-line)] bg-white px-6 py-8 sm:px-8">
        <input
          type="range"
          min={0}
          max={Math.max(0, bands.length - 1)}
          step={1}
          value={selectedIndex}
          aria-label={step.title}
          aria-valuetext={selectedBand ? selectedBand.range : 'No range selected'}
          data-empty={rawIndex === -1}
          style={{ '--fill': `${fill}%` } as CSSProperties}
          onChange={(e) => {
            const band = bands[Number(e.target.value)]
            if (band) onChoose(band.value)
          }}
          className="studio-range"
        />
        <div className="mt-4 flex justify-between">
          {bands.map((band, index) => (
            <button
              key={band.value}
              type="button"
              onClick={() => onChoose(band.value)}
              aria-pressed={index === rawIndex}
              className={['text-[11.5px] font-semibold uppercase tracking-[0.04em] transition-colors', index === rawIndex ? 'text-[var(--studio-ink)]' : 'text-[var(--studio-faint)] hover:text-[var(--studio-ink)]'].join(' ')}
            >
              {band.label}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-5 max-w-[520px] text-[13px] leading-6 text-[var(--studio-muted)]">
        This helps us calibrate professional matches, procurement and project planning. It stays private.
      </p>
    </div>
  )
}

function ReviewScreen({
  sections: allSections,
  visibleSteps,
  answers,
  missing,
  onEdit,
  onBack,
  onSubmit,
}: {
  sections: StudioSection[]
  visibleSteps: StudioStep[]
  answers: StudioAnswers
  missing: StudioStep[]
  onEdit: (stepKey: string) => void
  onBack: () => void
  onSubmit: () => void
}) {
  const sections = allSections
    .map((section) => ({ section, steps: visibleSteps.filter((s) => s.section === section.id) }))
    .filter((group) => group.steps.length > 0)

  return (
    <div>
      <div className="max-w-[640px]">
        <h1 className="font-studio-display text-[36px] italic leading-[1.05] tracking-tight text-[var(--studio-ink)] sm:text-[46px]">
          Your project is taking shape.
        </h1>
        <p className="mt-4 text-[15px] leading-7 text-[var(--studio-muted)]">
          Review your project profile below. Anything can still be adjusted before it reaches your project team.
        </p>
      </div>

      {missing.length > 0 && (
        <div role="alert" className="mt-8 flex items-start gap-3.5 rounded-[16px] border border-[var(--studio-line)] bg-white p-5">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-[var(--studio-cobalt)]" />
          <div className="min-w-0 flex-1">
            <div className="text-[13.5px] font-semibold text-[var(--studio-ink)]">
              {missing.length === 1 ? 'One answer is still needed.' : `${missing.length} answers are still needed.`}
            </div>
            <p className="mt-1 text-[13px] leading-6 text-[var(--studio-muted)]">
              Answer {missing.length === 1 ? 'it' : 'them'} before entering the studio.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onEdit(missing[0].key)}
            className="shrink-0 rounded-full border border-[var(--studio-ink)] px-4 py-2 text-[12.5px] font-semibold text-[var(--studio-ink)] transition hover:bg-[var(--studio-ink)] hover:text-white"
          >
            Answer now
          </button>
        </div>
      )}

      <div className="mt-10 overflow-hidden rounded-[20px] border border-[var(--studio-line)] bg-white">
        {sections.map(({ section, steps }, groupIndex) => (
          <div key={section.id} className={groupIndex > 0 ? 'border-t border-[var(--studio-line)]' : ''}>
            <div className="px-6 pb-2 pt-6 sm:px-8">
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--studio-faint)]">{section.label}</span>
            </div>
            {steps.map((step) => {
              const answered = isStepAnswered(step, answers)
              const display = answered ? formatAnswerValue(step, answers[step.key]) : 'Not provided'
              return (
                <div key={step.key} className="flex items-center justify-between gap-6 px-6 py-4 sm:px-8">
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-medium text-[var(--studio-muted)]">{step.title}</div>
                    <div className={['mt-1 line-clamp-2 whitespace-pre-line break-words text-[15px] font-semibold', answered ? 'text-[var(--studio-ink)]' : 'text-[var(--studio-faint)]'].join(' ')}>
                      {display}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onEdit(step.key)}
                    aria-label={`Edit: ${step.title}`}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--studio-line)] px-3 py-1.5 text-[11.5px] font-semibold text-[var(--studio-muted)] transition hover:border-[var(--studio-ink-30)] hover:text-[var(--studio-ink)]"
                  >
                    <Pencil size={12} />
                    Edit
                  </button>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-start gap-3.5 rounded-[16px] border border-[var(--studio-line)] bg-[var(--studio-soft)] p-5">
        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[var(--studio-ink-60)]" />
        <div>
          <div className="text-[13.5px] font-semibold text-[var(--studio-ink)]">Your project information stays private.</div>
          <p className="mt-1 text-[13px] leading-6 text-[var(--studio-muted)]">
            We&rsquo;ll take you to your dashboard next. Your profile carries over automatically.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" onClick={onBack} className="inline-flex items-center justify-center gap-2 text-[13.5px] font-semibold text-[var(--studio-muted)] transition hover:text-[var(--studio-ink)]">
          <ArrowLeft size={16} />
          Back to edit
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={missing.length > 0}
          className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[var(--studio-obsidian)] px-8 text-[13.5px] font-semibold text-white transition hover:bg-[var(--studio-midnight)] disabled:pointer-events-none disabled:opacity-40"
        >
          Enter Project Studio
          <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}

/* ============================================================
   MAIN COMPONENT — same export name and behaviour contract as
   the original, so it drops straight into the existing route.
   ============================================================ */

export function ProjectQuestionnaire() {
  const navigate = useNavigate()
  const { role } = useAuth()

  const flow = ONBOARDING_FLOWS[role] ?? CLIENT_FLOW
  const homePath = ROLE_HOME_PATH[role] ?? ROLE_HOME_PATH.client
  const storageKey = `buildos_project_studio_${role}`
  const progressKey = `${storageKey}_progress`

  const [answers, setAnswers] = useState<StudioAnswers>(() => loadSavedAnswers(storageKey))
  const [stepIndex, setStepIndex] = useState(() => loadSavedStepIndex(flow, answers, progressKey))
  const [reviewing, setReviewing] = useState(false)
  const [editingFromReview, setEditingFromReview] = useState(false)
  const [renderKey, setRenderKey] = useState(0)
  // File objects can't be serialized to localStorage, so they live in memory only.
  const [uploads, setUploads] = useState<Record<string, File[]>>({})

  const advanceTimer = useRef<number | null>(null)
  const mainRef = useRef<HTMLElement>(null)
  const stepRef = useRef<HTMLDivElement>(null)

  const visibleSteps = useMemo(() => getVisibleSteps(flow, answers), [flow, answers])
  const current = visibleSteps[stepIndex]

  // Sections whose steps are all skipped are hidden, so numbering stays contiguous.
  const visibleSections = useMemo(
    () => flow.sections.filter((section) => visibleSteps.some((s) => s.section === section.id)),
    [flow, visibleSteps]
  )
  const sectionStatuses = useMemo(
    () => computeSectionStatuses(visibleSections, current?.section, reviewing),
    [visibleSections, current?.section, reviewing]
  )
  const profileTags = useMemo(() => buildProfileTags(visibleSteps, answers), [visibleSteps, answers])
  const percent = useMemo(() => completionPercent(visibleSteps, answers), [visibleSteps, answers])
  const missingRequired = useMemo(
    () => visibleSteps.filter((s) => !s.optional && !isStepAnswered(s, answers)),
    [visibleSteps, answers]
  )

  const answeredCurrent = current ? isStepAnswered(current, answers) : false
  const canContinue = Boolean(current && (current.optional || answeredCurrent))
  const isLastStep = stepIndex >= visibleSteps.length - 1

  /* ----- Effects ----- */

  // Persist answers on every change (same key + shape the dashboards already read).
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(answers))
    } catch {
      // Ignore storage failures.
    }
  }, [answers, storageKey])

  // Remember which step the person is on so a refresh resumes there.
  useEffect(() => {
    if (!current) return
    try {
      localStorage.setItem(progressKey, current.key)
    } catch {
      // Ignore storage failures.
    }
  }, [current?.key, progressKey]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (stepIndex > visibleSteps.length - 1) {
      setStepIndex(Math.max(0, visibleSteps.length - 1))
    }
  }, [visibleSteps, stepIndex])

  // On every step change: scroll to the top and move focus into the new content.
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 })
    stepRef.current?.focus({ preventScroll: true })
  }, [renderKey])

  useEffect(
    () => () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current)
    },
    []
  )

  /* ----- Navigation ----- */

  const cancelPendingAdvance = () => {
    if (advanceTimer.current) {
      window.clearTimeout(advanceTimer.current)
      advanceTimer.current = null
    }
  }

  const goTo = (index: number) => {
    cancelPendingAdvance()
    setReviewing(false)
    setRenderKey((k) => k + 1)
    setStepIndex(index)
  }

  const openReview = () => {
    cancelPendingAdvance()
    setEditingFromReview(false)
    setReviewing(true)
    setRenderKey((k) => k + 1)
  }

  /**
   * Move on from `fromKey` using the *given* answers (not React state), so it is
   * safe to call from a timeout. When the person came from the review screen to
   * fix one answer, send them back there, unless the change unlocked a new
   * required question, in which case take them to it first.
   */
  const advance = (nextAnswers: StudioAnswers, fromKey: string) => {
    const steps = getVisibleSteps(flow, nextAnswers)
    const fromStep = steps.find((s) => s.key === fromKey)

    let finalAnswers = nextAnswers
    if (fromStep?.optional && !isStepAnswered(fromStep, finalAnswers) && finalAnswers[fromKey] !== null) {
      finalAnswers = { ...finalAnswers, [fromKey]: null } // passed without answering = skipped
      setAnswers(finalAnswers)
    }

    if (editingFromReview) {
      const pending = steps.findIndex((s) => !s.optional && !isStepAnswered(s, finalAnswers))
      if (pending === -1) openReview()
      else goTo(pending)
      return
    }

    const index = steps.findIndex((s) => s.key === fromKey)
    if (index === -1 || index >= steps.length - 1) openReview()
    else goTo(index + 1)
  }

  const back = () => {
    cancelPendingAdvance()
    if (reviewing) {
      setEditingFromReview(false)
      goTo(Math.max(0, visibleSteps.length - 1))
      return
    }
    if (stepIndex > 0) goTo(stepIndex - 1)
  }

  const handleContinue = () => {
    if (!current || !canContinue) return
    advance(answers, current.key)
  }

  const skip = () => {
    if (!current) return
    const nextAnswers = { ...answers, [current.key]: null }
    setAnswers(nextAnswers)
    advance(nextAnswers, current.key)
  }

  /* ----- Answers ----- */

  const updateAnswer = (key: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const chooseSingle = (value: string) => {
    if (!current) return
    const fromKey = current.key
    const nextAnswers = { ...answers, [fromKey]: value }
    setAnswers(nextAnswers)

    // One pending advance at a time: a double-click must not skip a step.
    cancelPendingAdvance()
    advanceTimer.current = window.setTimeout(() => {
      advanceTimer.current = null
      advance(nextAnswers, fromKey)
    }, 180)
  }

  const toggleMulti = (value: string) => {
    if (!current) return
    const currentValues: string[] = Array.isArray(answers[current.key]) ? answers[current.key] : []
    if (currentValues.includes(value)) {
      updateAnswer(current.key, currentValues.filter((v) => v !== value))
      return
    }
    if (current.max && currentValues.length >= current.max) return
    updateAnswer(current.key, [...currentValues, value])
  }

  const addFiles = (key: string, incoming: File[], noun: string) => {
    const merged = [...(uploads[key] ?? [])]
    for (const file of incoming) {
      const duplicate = merged.some((m) => m.name === file.name && m.size === file.size && m.lastModified === file.lastModified)
      if (!duplicate && merged.length < MAX_FILES) merged.push(file)
    }
    setUploads((prev) => ({ ...prev, [key]: merged }))
    updateAnswer(key, summarizeUploads(merged.length, noun))
    // TODO: hand `merged` to your Project Vault upload service here.
  }

  const removeFile = (key: string, index: number, noun: string) => {
    const remaining = (uploads[key] ?? []).filter((_, i) => i !== index)
    setUploads((prev) => ({ ...prev, [key]: remaining }))
    updateAnswer(key, summarizeUploads(remaining.length, noun))
  }

  /* ----- Review / submit ----- */

  const editStep = (key: string) => {
    const index = visibleSteps.findIndex((s) => s.key === key)
    if (index === -1) return
    setEditingFromReview(true)
    goTo(index)
  }

  const jumpToSection = (sectionId: string) => {
    if (sectionStatuses[sectionId] === 'upcoming') return
    const index = visibleSteps.findIndex((s) => s.section === sectionId)
    if (index === -1) return
    setEditingFromReview(false)
    goTo(index)
  }

  const submit = () => {
    if (missingRequired.length) {
      editStep(missingRequired[0].key)
      return
    }

    // Don't hand dashboards answers to questions the person no longer sees.
    const finalAnswers = sanitizeAnswers(flow, answers)

    try {
      localStorage.setItem(storageKey, JSON.stringify(finalAnswers))
      localStorage.removeItem(progressKey)
      // Dashboards in the SAME tab (this one, right after redirect) won't
      // see a native "storage" event — that only fires in other tabs.
      // Dispatch a custom event so useProjectProfile() can refresh immediately.
      window.dispatchEvent(new Event(PROJECT_PROFILE_UPDATED_EVENT))
    } catch {
      // Ignore.
    }
    navigate(homePath, { state: { onboardingAnswers: finalAnswers } })
  }

  // Answers are saved as you go, so exiting never loses work. Go back if there is
  // history to return to; otherwise land on the role's home instead of a dead end.
  const exit = () => {
    const historyIndex = (window.history.state as { idx?: number } | null)?.idx ?? 0
    if (historyIndex > 0) navigate(-1)
    else navigate(homePath, { replace: true })
  }

  const uploadNoun = current?.key === 'inspiration' ? 'reference' : 'file'

  return (
    <div className="studio-root fixed inset-0 z-[100] flex">
      <style>{STUDIO_STYLES}</style>

      <StudioRail
        title={flow.title}
        sections={visibleSections}
        statuses={sectionStatuses}
        activeSectionId={reviewing ? undefined : current?.section}
        onJumpToSection={jumpToSection}
        tags={profileTags}
        percent={percent}
      />

      <div className="flex min-h-0 flex-1 flex-col">
        <StudioHeader title={flow.title} onExit={exit} />
        <StudioRailMobile sections={visibleSections} activeSectionId={current?.section} reviewing={reviewing} />

        <main ref={mainRef} className="min-h-0 flex-1 overflow-y-auto bg-[var(--studio-paper)]">
          <div className="mx-auto w-full max-w-[860px] px-5 py-10 sm:px-8 sm:py-14">
            {!reviewing && current && (
              <div key={renderKey} ref={stepRef} tabIndex={-1} className="studio-step-enter outline-none">
                <div className="max-w-[620px]">
                  <h1 className="font-studio-display text-[32px] italic leading-[1.08] tracking-tight text-[var(--studio-ink)] sm:text-[42px]">
                    {current.title}
                  </h1>
                  {current.description && (
                    <p className="mt-4 text-[15px] leading-7 text-[var(--studio-muted)]">{current.description}</p>
                  )}
                </div>

                <div className="mt-9">
                  {current.type === 'single' && (
                    <SingleSelectStep step={current} value={answers[current.key]} onChoose={chooseSingle} />
                  )}
                  {current.type === 'multi' && (
                    <MultiSelectStep
                      step={current}
                      values={Array.isArray(answers[current.key]) ? answers[current.key] : []}
                      onToggle={toggleMulti}
                    />
                  )}
                  {current.type === 'textarea' && (
                    <TextareaStep step={current} value={answers[current.key] ?? ''} onChange={(v) => updateAnswer(current.key, v)} />
                  )}
                  {current.type === 'upload' && (
                    <UploadStep
                      noun={uploadNoun}
                      files={uploads[current.key] ?? []}
                      savedSummary={typeof answers[current.key] === 'string' ? answers[current.key] : undefined}
                      onAdd={(files) => addFiles(current.key, files, uploadNoun)}
                      onRemove={(index) => removeFile(current.key, index, uploadNoun)}
                    />
                  )}
                  {current.type === 'investment' && (
                    <InvestmentStep step={current} value={answers[current.key]} onChoose={(v) => updateAnswer(current.key, v)} />
                  )}
                </div>
              </div>
            )}

            {reviewing && (
              <div key={renderKey} ref={stepRef} tabIndex={-1} className="studio-step-enter outline-none">
                <ReviewScreen
                  sections={visibleSections}
                  visibleSteps={visibleSteps}
                  answers={answers}
                  missing={missingRequired}
                  onEdit={editStep}
                  onBack={back}
                  onSubmit={submit}
                />
              </div>
            )}
          </div>
        </main>

        {!reviewing && current && (
          <StudioControls
            onBack={back}
            backDisabled={stepIndex === 0}
            onSkip={skip}
            skippable={Boolean(current.optional)}
            onReturnToReview={editingFromReview && missingRequired.length === 0 ? openReview : undefined}
            onContinue={handleContinue}
            // Single-select steps auto-advance, but once answered (e.g. after pressing
            // Back) there must still be a way forward without re-picking the option.
            showContinue={current.type !== 'single' || answeredCurrent}
            continueDisabled={!canContinue}
            continueLabel={isLastStep ? 'Review' : 'Continue'}
          />
        )}
      </div>
    </div>
  )
}