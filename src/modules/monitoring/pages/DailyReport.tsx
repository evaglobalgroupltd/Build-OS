import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Daily Report — Monitoring module
 * BRD reference: Sec. 20.3 / 43
 *
 * TODO: replace this placeholder with the real implementation.
 * Daily site report.
 */
export function DailyReport() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Daily Report"
        description="Daily site report."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 20.3 / 43
          </span>
        }
      />
    </Card>
  )
}
