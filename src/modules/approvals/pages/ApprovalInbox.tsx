import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Approval Inbox — Approvals module
 * BRD reference: Sec. 43.3
 *
 * TODO: replace this placeholder with the real implementation.
 * Items awaiting your approval.
 */
export function ApprovalInbox() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Approval Inbox"
        description="Items awaiting your approval."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 43.3
          </span>
        }
      />
    </Card>
  )
}
