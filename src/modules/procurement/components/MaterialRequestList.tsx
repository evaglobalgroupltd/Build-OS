import type { MaterialRequest } from '@/modules/procurement/types'
import {
  CheckCircle2,
  ChevronRight,
  Clock3,
  Package,
  ShieldCheck,
  Truck,
  XCircle,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

const statusConfig = {
  requested: {
    label: 'Requested',
    tone: 'amber' as const,
    icon: Clock3,
  },
  approved: {
    label: 'Approved',
    tone: 'teal' as const,
    icon: CheckCircle2,
  },
  quoted: {
    label: 'Quoted',
    tone: 'amber' as const,
    icon: Package,
  },
  'fund reserved': {
    label: 'Fund Reserved',
    tone: 'teal' as const,
    icon: ShieldCheck,
  },
  'in transit': {
    label: 'In Transit',
    tone: 'amber' as const,
    icon: Truck,
  },
  delivered: {
    label: 'Delivered',
    tone: 'teal' as const,
    icon: Truck,
  },
  verified: {
    label: 'Verified',
    tone: 'teal' as const,
    icon: CheckCircle2,
  },
  accepted: {
    label: 'Accepted',
    tone: 'teal' as const,
    icon: CheckCircle2,
  },
  disputed: {
    label: 'Disputed',
    tone: 'amber' as const,
    icon: XCircle,
  },
  cancelled: {
    label: 'Cancelled',
    tone: 'amber' as const,
    icon: XCircle,
  },
} as const

type RequestStatus = keyof typeof statusConfig

function getStatusConfig(status: string) {
  return (
    statusConfig[status.toLowerCase() as RequestStatus] ?? {
      label: status,
      tone: 'amber' as const,
      icon: Clock3,
    }
  )
}

export function MaterialRequestList({
  requests,
}: {
  requests: MaterialRequest[]
}) {
  if (!requests.length) {
    return (
      <div className="rounded-xl border border-dashed border-line px-6 py-10 text-center">
        <Package className="mx-auto h-5 w-5 text-ink/30" />

        <p className="mt-3 text-sm font-medium text-ink">
          No material requests
        </p>

        <p className="mt-1 text-xs text-ink/40">
          Material requests linked to this project will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {requests.map((request) => {
        const status = getStatusConfig(request.status)
        const StatusIcon = status.icon

        return (
          <div
            key={request.id}
            className="group rounded-xl border border-line bg-white p-4 transition-colors hover:bg-ink/[0.02]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                  <Package className="h-4 w-4 text-ink/50" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-semibold text-ink">
                      {request.item}
                    </p>

                    <Badge tone={status.tone}>
                      <span className="inline-flex items-center gap-1.5">
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </span>
                    </Badge>
                  </div>

                  <p className="mt-1 text-xs text-ink/50">
                    Quantity: {request.quantity}
                  </p>

                  {request.supplierName && (
                    <p className="mt-1 text-xs text-ink/40">
                      Supplier: {request.supplierName}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                aria-label={`View ${request.item}`}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink/30 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}