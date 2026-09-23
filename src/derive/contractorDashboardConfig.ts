import {
  CAPACITY_OPTIONS,
  CONTRACTOR_SPECIALTIES,
  COVERAGE_STATES,
  TEAM_SIZE_OPTIONS,
  getOptionLabel,
  getOptionLabels,
} from '@/data/projectOptions'

/* ============================================================
   CONTRACTOR DASHBOARD DERIVATION LAYER
   ------------------------------------------------------------
   Same shape as clientDashboardConfig.ts: a pure function that
   turns raw Project Studio answers (CONTRACTOR_FLOW) into a
   typed config the dashboard renders from. No React, no storage
   access — unit-testable on its own.

   The one thing this config exposes that the client version
   doesn't is `matchesOpportunity` — a predicate the dashboard
   applies to marketplace listings so profile-driven matching
   (coverage states + specialty) lives in one place instead of
   being re-implemented as a .filter() callback inline in JSX.
   ============================================================ */

export interface OpportunityMatchInput {
  /** Should correspond to a COVERAGE_STATES value, e.g. 'abuja'. */
  state?: string
  /** Should correspond to a CONTRACTOR_SPECIALTIES value, e.g. 'residential'. */
  specialty?: string
}

export interface ContractorDashboardConfig {
  hasProfile: boolean
  specialtyLabels: string[]
  coverageStateLabels: string[]
  teamSizeLabel?: string
  capacityLabel?: string
  isFullyBooked: boolean
  /**
   * True when the opportunity fits the contractor's declared coverage
   * states and specialty. When the profile hasn't answered one of
   * those questions yet, that dimension is treated as a pass rather
   * than a fail — an incomplete profile shouldn't hide inventory.
   */
  matchesOpportunity: (opportunity: OpportunityMatchInput) => boolean
}

export function deriveContractorDashboardConfig(
  answers: Record<string, any>,
): ContractorDashboardConfig {
  const specialtyValues: string[] = Array.isArray(answers.specialty) ? answers.specialty : []
  const coverageStateValues: string[] = Array.isArray(answers.coverageStates) ? answers.coverageStates : []
  const teamSize: string | undefined = answers.teamSize
  const capacityValue: string | undefined = answers.activeCapacity

  const hasProfile = specialtyValues.length > 0 || coverageStateValues.length > 0 || Boolean(teamSize) || Boolean(capacityValue)

  const matchesOpportunity = (opportunity: OpportunityMatchInput): boolean => {
    const coverageOk =
      coverageStateValues.length === 0 || !opportunity.state || coverageStateValues.includes(opportunity.state)
    const specialtyOk =
      specialtyValues.length === 0 || !opportunity.specialty || specialtyValues.includes(opportunity.specialty)
    return coverageOk && specialtyOk
  }

  return {
    hasProfile,
    specialtyLabels: getOptionLabels(CONTRACTOR_SPECIALTIES, specialtyValues),
    coverageStateLabels: getOptionLabels(COVERAGE_STATES, coverageStateValues),
    teamSizeLabel: getOptionLabel(TEAM_SIZE_OPTIONS, teamSize),
    capacityLabel: getOptionLabel(CAPACITY_OPTIONS, capacityValue),
    isFullyBooked: capacityValue === 'booked',
    matchesOpportunity,
  }
}