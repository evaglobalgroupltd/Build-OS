import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Risk Analytics — Analytics module
 * BRD reference: Sec. 39.3
 *
 * TODO: replace this placeholder with the real implementation.
 * Risk and delay pattern analysis.
 */
export function RiskAnalytics() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Risk Analytics"
        description="Risk and delay pattern analysis."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 39.3
          </span>
        }
      />
    </Card>
  )
}
