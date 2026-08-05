import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Document Vault — Documents module
 * BRD reference: Sec. 20.1
 *
 * TODO: replace this placeholder with the real implementation.
 * All documents stored against your account/projects.
 */
export function DocumentVault() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Document Vault"
        description="All documents stored against your account/projects."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 20.1
          </span>
        }
      />
    </Card>
  )
}
