import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Upload Document — Documents module
 * BRD reference: Sec. 20.1
 *
 * TODO: replace this placeholder with the real implementation.
 * Add a new document to the vault.
 */
export function UploadDocument() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Upload Document"
        description="Add a new document to the vault."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 20.1
          </span>
        }
      />
    </Card>
  )
}
