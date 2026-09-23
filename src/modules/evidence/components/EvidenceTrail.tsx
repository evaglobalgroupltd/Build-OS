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
  complete: 'text-[#12613E]',
  pending: 'text-ink/25',
  blocked: 'text-[#B85C12]',
}

const statusLabel: Record<EvidenceStep['status'], string> = {
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

  const safePercent = Math.min(
    Math.max(percentComplete, 0),
    100,
  )

  const progressTone = hasBlockedStep
    ? 'bg-[#B85C12]'
    : allVerified
      ? 'bg-[#12613E]'
      : 'bg-[#C28A2C]'

  const progressTrack = hasBlockedStep
    ? 'bg-[#B85C12]/[0.07]'
    : allVerified
      ? 'bg-[#12613E]/[0.07]'
      : 'bg-[#C28A2C]/[0.09]'

  return (
    <section className="overflow-hidden rounded-[20px] border border-ink/[0.07] bg-white shadow-[0_8px_30px_rgba(20,30,25,0.045)]">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                              */}
      {/* ------------------------------------------------------------------ */}

      <div className="border-b border-ink/[0.06] bg-[#F7F8F6] px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border ${
                  hasBlockedStep
                    ? 'border-[#B85C12]/10 bg-[#F8EEE6]'
                    : 'border-[#12613E]/10 bg-white'
                }`}
              >
                {hasBlockedStep ? (
                  <LockKeyhole className="h-[17px] w-[17px] text-[#B85C12]" />
                ) : (
                  <FileCheck2 className="h-[17px] w-[17px] text-[#12613E]" />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      hasBlockedStep
                        ? 'bg-[#B85C12]'
                        : allVerified
                          ? 'bg-[#12613E]'
                          : 'bg-[#C28A2C]'
                    }`}
                  />

                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/40">
                    Evidence trail
                  </p>
                </div>

                <p className="mt-1 text-xs leading-5 text-ink/45">
                  Verified progress and approval record
                </p>
              </div>
            </div>

            {/* Verification state */}
            <div
              className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 ${
                hasBlockedStep
                  ? 'border-[#B85C12]/15 bg-[#F8EEE6] text-[#B85C12]'
                  : allVerified
                    ? 'border-[#12613E]/15 bg-[#F4F7F4] text-[#12613E]'
                    : 'border-[#C28A2C]/15 bg-[#F7F1E7] text-[#C28A2C]'
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

          {/* Progress summary */}
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-3">
                <span className="font-display text-[34px] font-semibold leading-none tracking-[-0.035em] text-ink sm:text-[38px]">
                  {safePercent}%
                </span>

                <div className="pb-0.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
                    Verified progress
                  </p>

                  <p className="mt-0.5 text-[11px] text-ink/40">
                    Evidence-backed completion
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-ink/35">
                <span className="font-mono font-medium text-ink/50">
                  {completedSteps}/{steps.length}
                </span>

                <span>verification checkpoints complete</span>
              </div>
            </div>

            <div
              className={`mt-4 h-1.5 overflow-hidden rounded-full ${progressTrack}`}
            >
              <div
                className={`h-full rounded-full transition-[width] duration-500 ease-out ${progressTone}`}
                style={{
                  width: `${safePercent}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Timeline                                                            */}
      {/* ------------------------------------------------------------------ */}

      <div className="px-4 py-5 sm:px-5 sm:py-6">
        {steps.length > 0 ? (
          <div className="space-y-0">
            {steps.map((step, index) => {
              const Icon = statusIcon[step.status]
              const isLast = index === steps.length - 1
              const isComplete = step.status === 'complete'
              const isBlocked = step.status === 'blocked'

              return (
                <div
                  key={step.id}
                  className="relative flex gap-3.5 sm:gap-4"
                >
                  {/* Timeline rail */}
                  <div className="relative flex w-5 shrink-0 justify-center">
                    {!isLast && (
                      <span
                        className={`absolute top-5 bottom-0 w-px ${
                          isComplete
                            ? 'bg-[#12613E]/15'
                            : isBlocked
                              ? 'bg-[#B85C12]/10'
                              : 'bg-ink/[0.08]'
                        }`}
                      />
                    )}

                    <div
                      className={`relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white ${
                        isComplete
                          ? 'border border-[#12613E]/20'
                          : isBlocked
                            ? 'border border-[#B85C12]/20'
                            : 'border border-ink/[0.10]'
                      }`}
                    >
                      <Icon
                        className={`h-3.5 w-3.5 ${statusTone[step.status]}`}
                      />
                    </div>
                  </div>

                  {/* Step content */}
                  <div
                    className={`min-w-0 flex-1 ${
                      isLast ? 'pb-0' : 'pb-6'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                      <p
                        className={`text-[13px] font-semibold leading-5 ${
                          isBlocked
                            ? 'text-[#B85C12]'
                            : 'text-ink'
                        }`}
                      >
                        {step.label}
                      </p>

                      <span
                        className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                          isComplete
                            ? 'bg-[#F4F7F4] text-[#12613E]'
                            : isBlocked
                              ? 'bg-[#F8EEE6] text-[#B85C12]'
                              : 'bg-[#F7F8F6] text-ink/40'
                        }`}
                      >
                        {statusLabel[step.status]}
                      </span>
                    </div>

                    {(step.actor || step.timestamp) && (
                      <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[10px] leading-4 text-ink/35">
                        {step.actor && (
                          <span className="font-medium text-ink/45">
                            {step.actor}
                          </span>
                        )}

                        {step.actor && step.timestamp && (
                          <span className="text-ink/20">
                            ·
                          </span>
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
        ) : (
          <div className="rounded-[16px] border border-dashed border-ink/[0.10] bg-[#F7F8F6] px-5 py-8 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_4px_14px_rgba(20,30,25,0.04)]">
              <FileCheck2 className="h-4 w-4 text-ink/25" />
            </div>

            <p className="mt-3 text-xs font-semibold text-ink">
              No verification checkpoints
            </p>

            <p className="mx-auto mt-1 max-w-xs text-[11px] leading-5 text-ink/40">
              Evidence requirements will appear here once the
              workflow has been initiated.
            </p>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Next action                                                       */}
        {/* ---------------------------------------------------------------- */}

        {nextAction && (
          <div
            className={`mt-6 overflow-hidden rounded-[16px] border ${
              hasBlockedStep
                ? 'border-[#B85C12]/12 bg-[#F8EEE6]/60'
                : 'border-[#C28A2C]/15 bg-[#F7F1E7]/65'
            }`}
          >
            <div className="flex items-start gap-3 px-3.5 py-3.5 sm:px-4">
              <div
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-white ${
                  hasBlockedStep
                    ? 'text-[#B85C12]'
                    : 'text-[#C28A2C]'
                }`}
              >
                {hasBlockedStep ? (
                  <AlertTriangle className="h-3.5 w-3.5" />
                ) : (
                  <ArrowRight className="h-3.5 w-3.5" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-semibold text-ink">
                    {nextAction.label}
                  </p>

                  <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-ink/30">
                    Next action
                  </span>
                </div>

                {nextAction.description && (
                  <p className="mt-1 text-[11px] leading-5 text-ink/50">
                    {nextAction.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Audit footer                                                        */}
      {/* ------------------------------------------------------------------ */}

      <div className="border-t border-ink/[0.06] bg-[#F7F8F6] px-4 py-3 sm:px-5">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#12613E]/55" />

          <p className="text-[10px] leading-4 text-ink/35">
            Evidence status and verification actions are recorded
            in the Build OS audit trail.
          </p>
        </div>
      </div>
    </section>
  )
}