import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Profile — Users module
 * BRD reference: Sec. 15.1
 *
 * TODO: replace this placeholder with the real implementation.
 * View and edit personal profile information.
 */
export function Profile() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Profile"
        description="View and edit personal profile information."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 15.1
          </span>
        }
      />
    </Card>
  )
}
