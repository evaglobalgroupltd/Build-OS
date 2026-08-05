import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Risk Alerts — Monitoring module
 * BRD reference: Sec. 20.3 / 43
 *
 * TODO: replace this placeholder with the real implementation.
 * Budget, timeline and quality risk flags.
 */
export function RiskAlerts() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Risk Alerts"
        description="Budget, timeline and quality risk flags."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 20.3 / 43
          </span>
        }
      />
    </Card>
  )
}
