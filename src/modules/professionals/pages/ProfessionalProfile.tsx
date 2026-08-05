import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Professional Profile — Professionals module
 * BRD reference: Sec. 40.7
 *
 * TODO: replace this placeholder with the real implementation.
 * Public profile of a professional.
 */
export function ProfessionalProfile() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Professional Profile"
        description="Public profile of a professional."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 40.7
          </span>
        }
      />
    </Card>
  )
}
