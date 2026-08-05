import type { LucideIcon } from 'lucide-react'

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/5 text-ink/40">
        <Icon size={20} />
      </div>
      <div>
        <p className="font-display text-sm font-semibold text-ink">{title}</p>
        <p className="mx-auto mt-1 max-w-xs text-xs text-ink/50">{description}</p>
      </div>
      {action}
    </div>
  )
}
