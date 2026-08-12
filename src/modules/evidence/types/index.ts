// Evidence module — domain types (BRD Sec. 43: Evidence & Verification)
//
// This is the type that makes evidence a first-class object instead of a
// side effect of a progress percentage. Any module that wants to show
// "this milestone/project is backed by proof, not just a status" consumes
// this shape via <EvidenceTrail />.

export type EvidenceStepStatus = 'complete' | 'pending' | 'blocked'

export interface EvidenceStep {
  id: string
  label: string
  status: EvidenceStepStatus
  /** Who performed this step, e.g. "Segun Adeyemi (Contractor)" */
  actor?: string
  /** ISO date or human-readable timestamp */
  timestamp?: string
}

export interface EvidenceTrailData {
  percentComplete: number
  steps: EvidenceStep[]
  /** The single next thing that has to happen for this trail to move forward */
  nextAction?: {
    label: string
    description?: string
  }
}