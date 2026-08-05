import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Responses — Disputes module
 * BRD reference: Sec. 19
 *
 * TODO: replace this placeholder with the real implementation.
 * Respondent statements and counter-evidence.
 */
export function Responses() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Responses"
        description="Respondent statements and counter-evidence."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 19
          </span>
        }
      />
    </Card>
  )
}
