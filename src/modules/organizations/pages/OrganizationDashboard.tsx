import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Organization Dashboard — Organizations module
 * BRD reference: Sec. 4.2
 *
 * TODO: replace this placeholder with the real implementation.
 * Overview of an enterprise tenant.
 */
export function OrganizationDashboard() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Organization Dashboard"
        description="Overview of an enterprise tenant."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 4.2
          </span>
        }
      />
    </Card>
  )
}
