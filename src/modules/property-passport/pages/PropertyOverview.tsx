import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Property Overview — Digital Property Passport module
 * BRD reference: Sec. 20.4
 *
 * TODO: replace this placeholder with the real implementation.
 * Summary of the property and its status.
 */
export function PropertyOverview() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Property Overview"
        description="Summary of the property and its status."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 20.4
          </span>
        }
      />
    </Card>
  )
}
