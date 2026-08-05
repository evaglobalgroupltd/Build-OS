import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Security — Users module
 * BRD reference: Sec. 15.1
 *
 * TODO: replace this placeholder with the real implementation.
 * Manage password, MFA, and active sessions.
 */
export function Security() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Security"
        description="Manage password, MFA, and active sessions."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 15.1
          </span>
        }
      />
    </Card>
  )
}
