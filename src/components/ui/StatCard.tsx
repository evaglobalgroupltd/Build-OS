import type { LucideIcon } from 'lucide-react'
import { Card } from './Card'

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  tone = 'ink',
}: {
  label: string
  value: string
  icon: LucideIcon
  hint?: string
  tone?: 'ink' | 'amber' | 'teal' | 'brick'
}) {
  const toneClasses = {
    ink: 'bg-ink/5 text-ink',
    amber: 'bg-amber/15 text-amber-dark',
    teal: 'bg-teal-light text-teal',
    brick: 'bg-brick-light text-brick',
  }[tone]

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink/50">{label}</p>
          <p className="mt-2 font-mono text-2xl font-semibold text-ink">{value}</p>
          {hint && <p className="mt-1 text-xs text-ink/45">{hint}</p>}
        </div>
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${toneClasses}`}>
          <Icon size={18} />
        </div>
      </div>
    </Card>
  )
}
