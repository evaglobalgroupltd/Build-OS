import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Contracts — Digital Property Passport module
 * BRD reference: Sec. 20.4
 *
 * TODO: replace this placeholder with the real implementation.
 * Contracts signed across the project.
 */
export function Contracts() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Contracts"
        description="Contracts signed across the project."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 20.4
          </span>
        }
      />
    </Card>
  )
}
