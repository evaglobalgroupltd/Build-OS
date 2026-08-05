import type { LucideIcon } from 'lucide-react'
import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

export function PlaceholderPage({
  icon: Icon = Construction,
  title,
  description,
  brdReference,
}: {
  icon?: LucideIcon
  title: string
  description: string
  brdReference: string
}) {
  return (
    <Card>
      <EmptyState
        icon={Icon}
        title={title}
        description={description}
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: {brdReference}
          </span>
        }
      />
    </Card>
  )
}
