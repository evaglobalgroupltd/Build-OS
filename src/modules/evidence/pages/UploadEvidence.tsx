import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Upload Evidence — Evidence module
 * BRD reference: Sec. 43
 *
 * TODO: replace this placeholder with the real implementation.
 * Submit photo/video/document evidence for a milestone.
 */
export function UploadEvidence() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Upload Evidence"
        description="Submit photo/video/document evidence for a milestone."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 43
          </span>
        }
      />
    </Card>
  )
}
