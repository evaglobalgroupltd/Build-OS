import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Audit Logs — Admin module
 * BRD reference: Sec. 39
 *
 * TODO: replace this placeholder with the real implementation.
 * System-wide audit log.
 */
export function AuditLogs() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Audit Logs"
        description="System-wide audit log."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 39
          </span>
        }
      />
    </Card>
  )
}
