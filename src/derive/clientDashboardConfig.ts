import {
  PROJECT_TYPES,
  PROPERTY_TYPES,
  STAGE_OPTIONS,
  type StudioOption,
} from '@/data/projectOptions'

/* ============================================================
   CLIENT DASHBOARD DERIVATION LAYER
   ------------------------------------------------------------
   Pure function that turns raw Project Studio answers into a
   typed config the ClientDashboard renders from. No React, no
   storage access, no side effects — safe to unit test directly,
   and safe to reuse if a mobile client or a PDF summary ever
   needs the same "what should this client see" logic.

   This file is the single place that knows what a `stage` /
   `propertyType` combination MEANS for the dashboard. If you add
   a new stage, or change what should happen at a given phase,
   it changes here — not as another boolean inline in JSX.
   ============================================================ */

export type ClientPhase =
  | 'idea'
  | 'land'
  | 'design'
  | 'approval'
  | 'construction'
  | 'finishing'
  | 'unknown'

export interface ClientDashboardConfig {
  phase: ClientPhase
  /** True once a contractor is actively building — drives milestone/funding sections. */
  isActiveBuild: boolean
  showMilestoneTracker: boolean
  showFundingPanel: boolean
  /** False when we have no catalog image to represent the client's chosen property/project type. */
  showVisionCard: boolean
  nextStepTitle: string
  nextStepCopy: string
  /** Representative "what you're building" image, sourced from the shared option catalog. */
  visionImage?: string
  visionLabel?: string
}

const PHASE_COPY: Record<ClientPhase, { title: string; body: string }> = {
  idea: {
    title: "Let's shape your idea into a plan",
    body: 'A professional consultation will help turn your vision into a scoped project.',
  },
  land: {
    title: 'Securing your land',
    body: "Once your land is confirmed, we'll route you to design.",
  },
  design: {
    title: 'Design & planning in progress',
    body: 'Your architect or engineer is shaping the drawings for your project.',
  },
  approval: {
    title: 'Awaiting government approval',
    body: "We'll notify you as soon as approvals are confirmed and you're cleared to build.",
  },
  construction: {
    title: 'Construction underway',
    body: 'Milestone tracking and fund releases are live below.',
  },
  finishing: {
    title: 'In the finishing stretch',
    body: 'Final touches are underway — review evidence as it comes in.',
  },
  unknown: {
    title: "Let's get your build underway",
    body: 'Complete your Project Studio profile to see personalized next steps here.',
  },
}

/**
 * Picks the best available "vision" image + label from the profile.
 * Property type wins when present (it's the more specific answer);
 * project type is the fallback for roles/flows that skip propertyType
 * (e.g. commercial, hospitality, community projects).
 */
function resolveVisionOption(
  propertyType: string | undefined,
  projectType: string | undefined,
): StudioOption | undefined {
  const byProperty = PROPERTY_TYPES.find((o) => o.value === propertyType && o.image)
  if (byProperty) return byProperty

  return PROJECT_TYPES.find((o) => o.value === projectType && o.image)
}

export function deriveClientDashboardConfig(
  answers: Record<string, any>,
): ClientDashboardConfig {
  const stage: string | undefined = answers.stage
  const propertyType: string | undefined = answers.propertyType
  const projectType: string | undefined = answers.projectType

  // STAGE_OPTIONS is the single source of truth for valid stage values —
  // deriving `phase` from it (instead of a separately maintained map) means
  // a new stage option automatically becomes a valid phase with no drift.
  const phase: ClientPhase = STAGE_OPTIONS.some((o) => o.value === stage)
    ? (stage as ClientPhase)
    : 'unknown'

  const isActiveBuild = phase === 'construction' || phase === 'finishing'
  const copy = PHASE_COPY[phase]
  const visionOption = resolveVisionOption(propertyType, projectType)

  return {
    phase,
    isActiveBuild,
    showMilestoneTracker: isActiveBuild,
    showFundingPanel: isActiveBuild,
    showVisionCard: Boolean(visionOption?.image),
    nextStepTitle: copy.title,
    nextStepCopy: copy.body,
    visionImage: visionOption?.image,
    visionLabel: visionOption?.label,
  }
}