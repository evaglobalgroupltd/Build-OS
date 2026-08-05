import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Platform Settings — Admin module
 * BRD reference: Sec. 39
 *
 * TODO: replace this placeholder with the real implementation.
 * Global platform configuration.
 */
export function Settings() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Platform Settings"
        description="Global platform configuration."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 39
          </span>
        }
      />
    </Card>
  )
}
