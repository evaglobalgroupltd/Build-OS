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
      <div className="relative overflow-hidden rounded-[20px] border border-dashed border-ink/[0.10] bg-[#FBFCFB] px-6 py-12 text-center">
        {/* Soft decorative glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B85C12]/[0.05] blur-2xl" />

        <div className="relative mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-ink/[0.045]">
          <Package className="h-[18px] w-[18px] text-ink/35" />
        </div>

        <p className="relative mt-4 font-display text-[14px] font-semibold tracking-[-0.01em] text-ink">
          No material requests
        </p>

        <p className="relative mx-auto mt-1.5 max-w-xs text-[11px] leading-5 text-ink/40">
          Material requests linked to this project will appear here as
          procurement activity begins.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2.5">
      {requests.map((request) => {
        const status = getStatusConfig(request.status)
        const StatusIcon = status.icon

        return (
          <article
            key={request.id}
            className="
              group
              relative
              overflow-hidden
              rounded-[18px]
              border
              border-ink/[0.07]
              bg-white
              transition-all
              duration-300
              hover:-translate-y-[1px]
              hover:border-ink/[0.12]
              hover:shadow-[0_14px_35px_rgba(20,40,30,0.06)]
            "
          >
            {/* Subtle left accent */}
            <div
              className={`
                absolute
                inset-y-0
                left-0
                w-[2px]
                transition-all
                duration-300
                ${
                  status.tone === 'teal'
                    ? 'bg-[#12613E]/40'
                    : 'bg-[#B85C12]/45'
                }
                group-hover:w-[3px]
              `}
            />

            <div className="flex items-center gap-4 px-4 py-4 sm:px-5">
              {/* Material icon */}
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#F5F7F5] text-ink/45 transition-colors duration-300 group-hover:bg-[#EEF2EF] group-hover:text-ink/65">
                <Package className="h-[17px] w-[17px]" />

                {/* Tiny activity indicator */}
                <span
                  className={`
                    absolute
                    -right-0.5
                    -top-0.5
                    h-2
                    w-2
                    rounded-full
                    border-2
                    border-white
                    ${
                      status.tone === 'teal'
                        ? 'bg-[#12613E]'
                        : 'bg-[#B85C12]'
                    }
                  `}
                />
              </div>

              {/* Main information */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                  <p className="min-w-0 truncate text-[12.5px] font-semibold tracking-[-0.01em] text-ink sm:text-[13px]">
                    {request.item}
                  </p>

                  <Badge tone={status.tone}>
                    <span className="inline-flex items-center gap-1.5">
                      <StatusIcon className="h-[11px] w-[11px]" />
                      {status.label}
                    </span>
                  </Badge>
                </div>

                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-[10px] font-medium text-ink/45">
                    Qty.{' '}
                    <span className="font-semibold text-ink/65">
                      {request.quantity}
                    </span>
                  </span>

                  {request.supplierName && (
                    <>
                      <span className="h-1 w-1 rounded-full bg-ink/15" />

                      <span className="truncate text-[10px] text-ink/40">
                        Supplier{' '}
                        <span className="font-medium text-ink/60">
                          {request.supplierName}
                        </span>
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Action */}
              <button
                type="button"
                aria-label={`View ${request.item}`}
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-transparent
                  text-ink/25
                  transition-all
                  duration-200
                  hover:border-ink/[0.07]
                  hover:bg-ink/[0.035]
                  hover:text-ink/70
                  focus:outline-none
                  focus:ring-2
                  focus:ring-ink/10
                "
              >
                <ChevronRight className="h-[15px] w-[15px] transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}