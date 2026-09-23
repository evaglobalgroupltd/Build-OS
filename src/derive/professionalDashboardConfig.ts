import {
  CAPACITY_OPTIONS,
  COVERAGE_STATES,
  PROFESSIONAL_SPECIALIZATIONS,
  getOptionLabel,
  getOptionLabels,
} from '@/data/projectOptions'

/* ============================================================
   PROFESSIONAL DASHBOARD DERIVATION LAYER
   ------------------------------------------------------------
   Same shape as contractorDashboardConfig.ts: a pure function
   turning raw Project Studio answers (PROFESSIONAL_FLOW) into a
   typed config, plus a matching predicate the dashboard applies
   to invitations instead of re-implementing matching inline.
   ============================================================ */

export interface InvitationMatchInput {
  /** Should correspond to a COVERAGE_STATES value, e.g. 'lagos'. */
  state?: string
  /** Should correspond to a PROFESSIONAL_SPECIALIZATIONS value, e.g. 'structural'. */
  specialty?: string
}

export interface ProfessionalDashboardConfig {
  hasProfile: boolean
  specializationLabels: string[]
  coverageStateLabels: string[]
  capacityLabel?: string
  isFullyBooked: boolean
  /**
   * True when the invitation fits the professional's declared coverage
   * states and specialization. An unanswered dimension is treated as a
   * pass, not a fail — an incomplete profile shouldn't hide invitations.
   */
  matchesInvitation: (invitation: InvitationMatchInput) => boolean
}

export function deriveProfessionalDashboardConfig(
  answers: Record<string, any>,
): ProfessionalDashboardConfig {
  const specializationValues: string[] = Array.isArray(answers.specialization) ? answers.specialization : []
  const coverageStateValues: string[] = Array.isArray(answers.coverageStates) ? answers.coverageStates : []
  const capacityValue: string | undefined = answers.capacity

  const hasProfile = specializationValues.length > 0 || coverageStateValues.length > 0 || Boolean(capacityValue)

  const matchesInvitation = (invitation: InvitationMatchInput): boolean => {
    const coverageOk =
      coverageStateValues.length === 0 || !invitation.state || coverageStateValues.includes(invitation.state)
    const specialtyOk =
      specializationValues.length === 0 || !invitation.specialty || specializationValues.includes(invitation.specialty)
    return coverageOk && specialtyOk
  }

  return {
    hasProfile,
    specializationLabels: getOptionLabels(PROFESSIONAL_SPECIALIZATIONS, specializationValues),
    coverageStateLabels: getOptionLabels(COVERAGE_STATES, coverageStateValues),
    capacityLabel: getOptionLabel(CAPACITY_OPTIONS, capacityValue),
    isFullyBooked: capacityValue === 'booked',
    matchesInvitation,
  }
}