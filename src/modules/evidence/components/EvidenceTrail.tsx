import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Circle,
  FileCheck2,
  LockKeyhole,
} from 'lucide-react'

import type {
  EvidenceStep,
  EvidenceTrailData,
} from '@/modules/evidence/types'

const statusIcon: Record<
  EvidenceStep['status'],
  typeof CheckCircle2
> = {
  complete: CheckCircle2,
  pending: Circle,
  blocked: AlertTriangle,
}

const statusTone: Record<EvidenceStep['status'], string> = {
  complete: 'text-teal',
  pending: 'text-ink/30',
  blocked: 'text-brick',
}

const statusLabel: Record<
  EvidenceStep['status'],
  string
> = {
  complete: 'Verified',
  pending: 'Pending',
  blocked: 'Blocked',
}

/**
 * Evidence Trail
 *
 * Build OS treats progress as verified proof rather than a simple
 * percentage. A milestone, payment, procurement request or project
 * stage is only considered complete when the required evidence and
 * verification chain has been satisfied.
 *
 * Shared across:
 * - Milestones
 * - Payment requests
 * - Procurement
 * - Monitoring
 * - Disputes
 * - Digital Property Passport
 */
export function EvidenceTrail({
  percentComplete,
  steps,
  nextAction,
}: EvidenceTrailData) {
  const completedSteps = steps.filter(
    (step) => step.status === 'complete',
  ).length

  const blockedSteps = steps.filter(
    (step) => step.status === 'blocked',
  ).length

  const hasBlockedStep = blockedSteps > 0

  const allVerified =
    steps.length > 0 &&
    completedSteps === steps.length &&
    !hasBlockedStep

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      {/* Header */}
      <div className="border-b border-line bg-paper-2 px-5 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                {hasBlockedStep ? (
                  <LockKeyhole className="h-4 w-4 text-brick" />
                ) : (
                  <FileCheck2 className="h-4 w-4 text-teal" />
                )}
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                  Evidence trail
                </p>

                <p className="mt-0.5 text-xs text-ink/45">
                  Verified progress and approval record
                </p>
              </div>
            </div>
          </div>

          {/* Evidence state */}
          <div
            className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 ${
              hasBlockedStep
                ? 'border-brick/20 bg-brick/5 text-brick'
                : allVerified
                  ? 'border-teal/25 bg-teal-light text-teal'
                  : 'border-amber/20 bg-amber/10 text-amber-dark'
            }`}
          >
            {hasBlockedStep ? (
              <AlertTriangle className="h-3.5 w-3.5" />
            ) : allVerified ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
              <Circle className="h-3.5 w-3.5" />
            )}

            <span className="text-[10px] font-semibold">
              {hasBlockedStep
                ? 'Verification blocked'
                : allVerified
                  ? 'Evidence verified'
                  : 'Verification in progress'}
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-5">
          <div className="flex items-end justify-between gap-4">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl font-semibold tracking-tight text-ink">
                {percentComplete}%
              </span>

              <span className="text-xs text-ink/40">
                evidence-backed progress
              </span>
            </div>

            <span className="font-mono text-[10px] text-ink/35">
              {completedSteps}/{steps.length} verified
            </span>
          </div>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/5">
            <div
              className={`h-full rounded-full transition-all ${
                hasBlockedStep
                  ? 'bg-brick'
                  : allVerified
                    ? 'bg-teal'
                    : 'bg-amber'
              }`}
              style={{
                width: `${Math.min(
                  Math.max(percentComplete, 0),
                  100,
                )}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-5 py-5">
        <div className="space-y-0">
          {steps.map((step, index) => {
            const Icon = statusIcon[step.status]

            const isLast = index === steps.length - 1

            return (
              <div
                key={step.id}
                className="relative flex gap-3.5"
              >
                {/* Timeline */}
                <div className="relative flex w-5 shrink-0 justify-center">
                  {!isLast && (
                    <span className="absolute top-5 bottom-0 w-px bg-line" />
                  )}

                  <div
                    className={`relative z-10 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white ${
                      step.status === 'complete'
                        ? 'border border-teal/25'
                        : step.status === 'blocked'
                          ? 'border border-brick/25'
                          : 'border border-line'
                    }`}
                  >
                    <Icon
                      className={`h-3.5 w-3.5 ${
                        statusTone[step.status]
                      }`}
                    />
                  </div>
                </div>

                {/* Step */}
                <div
                  className={`min-w-0 flex-1 pb-5 ${
                    isLast ? 'pb-0' : ''
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <p
                      className={`text-sm font-semibold ${
                        step.status === 'blocked'
                          ? 'text-brick'
                          : 'text-ink'
                      }`}
                    >
                      {step.label}
                    </p>

                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                        step.status === 'complete'
                          ? 'bg-teal-light text-teal'
                          : step.status === 'blocked'
                            ? 'bg-brick/10 text-brick'
                            : 'bg-paper-2 text-ink/40'
                      }`}
                    >
                      {statusLabel[step.status]}
                    </span>
                  </div>

                  {(step.actor || step.timestamp) && (
                    <div className="mt-1 flex flex-wrap items-center gap-1 text-[10px] text-ink/40">
                      {step.actor && (
                        <span>{step.actor}</span>
                      )}

                      {step.actor && step.timestamp && (
                        <span>·</span>
                      )}

                      {step.timestamp && (
                        <span className="font-mono">
                          {step.timestamp}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Next action */}
        {nextAction && (
          <div
            className={`mt-5 flex items-start gap-3 rounded-xl border p-3.5 ${
              hasBlockedStep
                ? 'border-brick/15 bg-brick/[0.035]'
                : 'border-amber/20 bg-amber/[0.06]'
            }`}
          >
            {hasBlockedStep ? (
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-brick" />
            ) : (
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-amber-dark" />
            )}

            <div className="min-w-0">
              <p className="text-xs font-semibold text-ink">
                {nextAction.label}
              </p>

              {nextAction.description && (
                <p className="mt-1 text-[11px] leading-5 text-ink/50">
                  {nextAction.description}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Audit footer */}
      <div className="border-t border-line bg-paper-2 px-5 py-3">
        <div className="flex items-center gap-2 text-[10px] text-ink/35">
          <CheckCircle2 className="h-3.5 w-3.5" />

          <span>
            Evidence status and verification actions are recorded in the
            Build OS audit trail.
          </span>
        </div>
      </div>
    </div>
  )
}