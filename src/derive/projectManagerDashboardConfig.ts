import {
  CAPACITY_OPTIONS,
  COVERAGE_STATES,
  PROJECT_MANAGEMENT_SPECIALIZATIONS,
  getOptionLabel,
  getOptionLabels,
} from '@/data/projectOptions'

/* ============================================================
   PROJECT MANAGER DASHBOARD DERIVATION LAYER
   ------------------------------------------------------------
   Same shape as the other derive/*DashboardConfig.ts files, but
   with a different job: a PM's dashboard shows projects already
   assigned to them, not a marketplace to filter. So instead of a
   matching predicate, this exposes `isOverCapacity` — comparing
   the PM's declared capacity (from the questionnaire) against
   however many projects the caller says are actually assigned.
   The dashboard supplies that count; this function never reaches
   into project data itself, keeping it a pure "answers → config"
   function like the rest of the derivation layer.
   ============================================================ */

/** Numeric ceilings for CAPACITY_OPTIONS values. `several` is open-ended (4+), so it's treated as no ceiling. */
const CAPACITY_CEILING: Record<string, number> = {
  one: 1,
  few: 3,
  several: Infinity,
  booked: 0,
}

export interface ProjectManagerDashboardConfig {
  hasProfile: boolean
  specializationLabels: string[]
  coverageStateLabels: string[]
  capacityLabel?: string
  certifications?: string
  /** Undefined when capacity hasn't been answered — callers should treat that as "unknown," not "unlimited." */
  capacityCeiling?: number
  isOverCapacity: (assignedProjectCount: number) => boolean
}

export function deriveProjectManagerDashboardConfig(
  answers: Record<string, any>,
): ProjectManagerDashboardConfig {
  const specializationValues: string[] = Array.isArray(answers.specialization) ? answers.specialization : []
  const coverageStateValues: string[] = Array.isArray(answers.coverageStates) ? answers.coverageStates : []
  const capacityValue: string | undefined = answers.capacity
  const certifications: string | undefined = answers.certifications

  const hasProfile =
    specializationValues.length > 0 || coverageStateValues.length > 0 || Boolean(capacityValue)

  const capacityCeiling = capacityValue ? CAPACITY_CEILING[capacityValue] : undefined

  const isOverCapacity = (assignedProjectCount: number): boolean =>
    capacityCeiling !== undefined && assignedProjectCount > capacityCeiling

  return {
    hasProfile,
    specializationLabels: getOptionLabels(PROJECT_MANAGEMENT_SPECIALIZATIONS, specializationValues),
    coverageStateLabels: getOptionLabels(COVERAGE_STATES, coverageStateValues),
    capacityLabel: getOptionLabel(CAPACITY_OPTIONS, capacityValue),
    certifications,
    capacityCeiling,
    isOverCapacity,
  }
}