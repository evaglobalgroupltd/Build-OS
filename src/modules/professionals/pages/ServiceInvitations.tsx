import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Service Invitations — Professionals module
 * BRD reference: Sec. 40.7
 *
 * TODO: replace this placeholder with the real implementation.
 * Invitations to bid on professional services.
 */
export function ServiceInvitations() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Service Invitations"
        description="Invitations to bid on professional services."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 40.7
          </span>
        }
      />
    </Card>
  )
}
