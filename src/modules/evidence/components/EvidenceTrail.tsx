import { CheckCircle2, Circle, AlertTriangle, ArrowRight } from 'lucide-react'
import type { EvidenceStep, EvidenceTrailData } from '@/modules/evidence/types'

const statusIcon: Record<EvidenceStep['status'], typeof CheckCircle2> = {
  complete: CheckCircle2,
  pending: Circle,
  blocked: AlertTriangle,
}

const statusTone: Record<EvidenceStep['status'], string> = {
  complete: 'text-teal',
  pending: 'text-ink/30',
  blocked: 'text-brick',
}

/**
 * Renders progress as proof, not just a number.
 *
 * The BRD's differentiator is that "74% complete" means nothing on its own —
 * what matters is *what's been verified* to get there. This is the shared
 * component for that: milestones, disputes, monitoring, and the property
 * passport should all render their evidence through this rather than each
 * inventing their own checklist UI. (First candidate for the "rule of
 * three" promotion — already used by 2+ modules, keep it here in
 * modules/evidence/components rather than duplicating.)
 */
export function EvidenceTrail({ percentComplete, steps, nextAction }: EvidenceTrailData) {
  return (
    <div className="rounded-lg border border-line bg-white p-5">
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-2xl font-semibold text-ink">{percentComplete}%</span>
          <span className="text-sm text-ink/50">complete</span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-teal/25 bg-teal-light px-2.5 py-1 text-xs font-medium text-teal">
          <CheckCircle2 size={12} />
          Evidence-backed
        </span>
      </div>

      <ul className="mt-4 space-y-2.5">
        {steps.map((step) => {
          const Icon = statusIcon[step.status]
          return (
            <li key={step.id} className="flex items-start gap-2.5">
              <Icon size={16} className={`mt-0.5 shrink-0 ${statusTone[step.status]}`} />
              <div className="min-w-0">
                <p className={`text-sm ${step.status === 'blocked' ? 'text-brick' : 'text-ink'}`}>
                  {step.label}
                </p>
                {(step.actor || step.timestamp) && (
                  <p className="text-xs text-ink/40">
                    {step.actor}
                    {step.actor && step.timestamp && ' · '}
                    {step.timestamp}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      {nextAction && (
        <div className="mt-4 flex items-start gap-2 rounded-md bg-amber/10 px-3 py-2.5">
          <ArrowRight size={15} className="mt-0.5 shrink-0 text-amber-dark" />
          <div>
            <p className="text-sm font-medium text-ink">{nextAction.label}</p>
            {nextAction.description && (
              <p className="mt-0.5 text-xs text-ink/50">{nextAction.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}