import { useCallback, useEffect, useState } from 'react'

import { useAuth } from '@/context/AuthContext'

/* ============================================================
   useProjectProfile
   ------------------------------------------------------------
   The single source of truth every dashboard should read from
   to personalize what it shows, based on the Project Studio
   questionnaire answers.

   Today: reads from localStorage (written by ProjectQuestionnaire).
   Later: once a backend exists, only the internals of this hook
   need to change (readAnswers -> an API call). Every dashboard
   that already calls useProjectProfile() keeps working unmodified.
   ============================================================ */

export type ProjectProfileAnswers = Record<string, any>

export interface UseProjectProfileResult {
  /** Raw answers object, keyed by question code (e.g. answers.projectType). */
  answers: ProjectProfileAnswers
  /** True once any answer has been saved (vs. a brand-new user). */
  hasProfile: boolean
  /** True once the role's "required" questions are all answered. */
  isComplete: boolean
  /** Typed getter with a fallback: profile.get('budget', 'starter'). */
  get: <T = any>(key: string, fallback?: T) => T
  /** Re-read from storage — call after the questionnaire is submitted. */
  refresh: () => void
}

// The event ProjectQuestionnaire should dispatch after saving, so the
// dashboard can refresh immediately even when it's in the SAME tab
// (native "storage" events only fire in OTHER tabs).
export const PROJECT_PROFILE_UPDATED_EVENT = 'buildos:project-profile-updated'

// Which questions count as "required" per role, purely to compute
// isComplete. Extend this as you add more roles/questions.
const REQUIRED_KEYS_BY_ROLE: Partial<Record<string, string[]>> = {
  client: ['projectType', 'location', 'landStatus', 'budget'],
  diaspora_client: ['projectType', 'location', 'landStatus', 'budget'],
  contractor: ['specialty', 'coverageStates', 'teamSize'],
  project_manager: ['coverageStates', 'specialization', 'capacity'],
  professional: ['specialization', 'coverageStates', 'capacity'],
  market_place: ['categories', 'coverageStates', 'supplyCapacity'],
}

function storageKeyFor(role: string) {
  return `buildos_project_studio_${role}`
}

function readAnswers(role: string | undefined): ProjectProfileAnswers {
  if (!role) return {}
  try {
    const raw = localStorage.getItem(storageKeyFor(role))
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function isAnswered(value: any): boolean {
  if (Array.isArray(value)) return value.length > 0
  return value !== undefined && value !== null && value !== ''
}

export function useProjectProfile(): UseProjectProfileResult {
  const { role } = useAuth()
  const [answers, setAnswers] = useState<ProjectProfileAnswers>(() => readAnswers(role))

  const refresh = useCallback(() => {
    setAnswers(readAnswers(role))
  }, [role])

  // Re-read whenever the active role changes (e.g. account switch).
  useEffect(() => {
    refresh()
  }, [role, refresh])

  // Stay in sync with the questionnaire: other-tab updates arrive as native
  // "storage" events; same-tab updates arrive via the custom event that
  // ProjectQuestionnaire dispatches right after it saves.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (role && event.key === storageKeyFor(role)) refresh()
    }
    const onCustomUpdate = () => refresh()

    window.addEventListener('storage', onStorage)
    window.addEventListener(PROJECT_PROFILE_UPDATED_EVENT, onCustomUpdate)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener(PROJECT_PROFILE_UPDATED_EVENT, onCustomUpdate)
    }
  }, [role, refresh])

  const get = useCallback(
    <T = any>(key: string, fallback?: T): T => {
      const value = answers[key]
      return (isAnswered(value) ? value : fallback) as T
    },
    [answers],
  )

  const requiredKeys = (role && REQUIRED_KEYS_BY_ROLE[role]) || []
  const isComplete = requiredKeys.length > 0 && requiredKeys.every((key) => isAnswered(answers[key]))

  return {
    answers,
    hasProfile: Object.keys(answers).length > 0,
    isComplete,
    get,
    refresh,
  }
}