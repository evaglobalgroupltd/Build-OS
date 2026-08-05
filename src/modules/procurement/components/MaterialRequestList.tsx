import type { MaterialRequest } from '@/modules/procurement/types'
import { Badge } from '@/components/ui/Badge'

export function MaterialRequestList({ requests }: { requests: MaterialRequest[] }) {
  return (
    <div className="space-y-3">
      {requests.map((m) => (
        <div key={m.id} className="rounded-md border border-line p-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-ink">{m.item}</p>
              <p className="mt-0.5 text-xs text-ink/50">{m.quantity}</p>
              {m.supplierName && <p className="mt-0.5 text-xs text-ink/40">{m.supplierName}</p>}
            </div>
            <Badge tone={m.status === 'delivered' || m.status === 'verified' ? 'teal' : 'amber'}>
              {m.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}
