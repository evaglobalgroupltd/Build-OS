import {
  CheckCircle2,
  ChevronRight,
  Clock3,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
  Upload,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

type DeliveryStatus =
  | 'in transit'
  | 'delivered'
  | 'verified'
  | 'accepted'

type Delivery = {
  id: string
  item: string
  specification: string
  quantity: string
  supplierName: string
  projectName: string
  deliveryLocation: string
  status: DeliveryStatus
  expectedDate?: string
  deliveredDate?: string
  evidenceUploaded?: boolean
}

const deliveries: Delivery[] = [
  {
    id: 'DEL-001',
    item: 'Dangote Cement',
    specification: '42.5R Grade Portland Cement',
    quantity: '150 bags',
    supplierName: 'Prime Build Materials Ltd.',
    projectName: 'Gwarinpa Residential Development',
    deliveryLocation: 'Gwarinpa, Abuja',
    status: 'in transit',
    expectedDate: 'Sep 02, 2026',
    evidenceUploaded: false,
  },
  {
    id: 'DEL-002',
    item: 'High Yield Reinforcement Bar',
    specification: '12mm High Tensile Steel Bar',
    quantity: '2 tonnes',
    supplierName: 'Prime Build Materials Ltd.',
    projectName: 'Maitama Duplex Construction',
    deliveryLocation: 'Maitama, Abuja',
    status: 'delivered',
    deliveredDate: 'Aug 30, 2026',
    evidenceUploaded: true,
  },
  {
    id: 'DEL-003',
    item: 'Premium Sandcrete Block',
    specification: '9-inch Load Bearing Block',
    quantity: '800 pieces',
    supplierName: 'Prime Build Materials Ltd.',
    projectName: 'Jabi Commercial Renovation',
    deliveryLocation: 'Jabi, Abuja',
    status: 'verified',
    deliveredDate: 'Aug 29, 2026',
    evidenceUploaded: true,
  },
]

const statusConfig = {
  'in transit': {
    label: 'In Transit',
    tone: 'amber' as const,
    icon: Truck,
  },
  delivered: {
    label: 'Delivered',
    tone: 'amber' as const,
    icon: Package,
  },
  verified: {
    label: 'Verified',
    tone: 'teal' as const,
    icon: ShieldCheck,
  },
  accepted: {
    label: 'Accepted',
    tone: 'teal' as const,
    icon: CheckCircle2,
  },
}

export function Deliveries() {
  const inTransit = deliveries.filter(
    (delivery) => delivery.status === 'in transit',
  )

  const awaitingVerification = deliveries.filter(
    (delivery) => delivery.status === 'delivered',
  )

  const completed = deliveries.filter(
    (delivery) =>
      delivery.status === 'verified' || delivery.status === 'accepted',
  )

  return (
    <div className="space-y-7">
      {/* ===================================================== */}
      {/* Summary */}
      {/* ===================================================== */}

      <section
        aria-label="Delivery overview"
        className="grid gap-3 sm:grid-cols-3"
      >
        <SummaryCard
          icon={Truck}
          label="In transit"
          value={inTransit.length}
          description="Orders currently moving to site"
          tone="amber"
        />

        <SummaryCard
          icon={Package}
          label="Awaiting verification"
          value={awaitingVerification.length}
          description="Delivered and awaiting review"
          tone="amber"
        />

        <SummaryCard
          icon={CheckCircle2}
          label="Verified"
          value={completed.length}
          description="Successfully verified deliveries"
          tone="teal"
        />
      </section>

      {/* ===================================================== */}
      {/* In transit */}
      {/* ===================================================== */}

      <DeliverySection
        eyebrow="Active logistics"
        title="In transit"
        subtitle="Orders dispatched by suppliers and currently moving to their destination."
        deliveries={inTransit}
      />

      {/* ===================================================== */}
      {/* Awaiting verification */}
      {/* ===================================================== */}

      <DeliverySection
        eyebrow="Action required"
        title="Awaiting verification"
        subtitle="Materials delivered to site and awaiting contractor or project manager verification."
        deliveries={awaitingVerification}
      />

      {/* ===================================================== */}
      {/* Completed */}
      {/* ===================================================== */}

      <DeliverySection
        eyebrow="Delivery history"
        title="Completed deliveries"
        subtitle="Materials that have passed delivery verification and entered the project record."
        deliveries={completed}
      />
    </div>
  )
}

function DeliverySection({
  eyebrow,
  title,
  subtitle,
  deliveries,
}: {
  eyebrow: string
  title: string
  subtitle: string
  deliveries: Delivery[]
}) {
  return (
    <section aria-label={title}>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-ink/35">
            {eyebrow}
          </p>

          <h2 className="mt-1 font-display text-[19px] font-semibold tracking-[-0.025em] text-ink">
            {title}
          </h2>

          <p className="mt-1 max-w-2xl text-[11px] leading-5 text-ink/40">
            {subtitle}
          </p>
        </div>

        <div className="flex h-7 min-w-7 items-center justify-center rounded-full bg-ink/[0.045] px-2.5">
          <span className="text-[9px] font-bold text-ink/45">
            {String(deliveries.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      <Card className="overflow-hidden">
        {deliveries.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-ink/[0.045]">
              <Package className="h-[17px] w-[17px] text-ink/30" />
            </div>

            <p className="mt-3 text-[12px] font-semibold text-ink">
              Nothing here yet
            </p>

            <p className="mx-auto mt-1 max-w-xs text-[10px] leading-5 text-ink/35">
              Deliveries will automatically appear in this stage as the
              procurement lifecycle progresses.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-ink/[0.07]">
            {deliveries.map((delivery) => (
              <DeliveryRow
                key={delivery.id}
                delivery={delivery}
              />
            ))}
          </div>
        )}
      </Card>
    </section>
  )
}

function DeliveryRow({ delivery }: { delivery: Delivery }) {
  const status = statusConfig[delivery.status]
  const StatusIcon = status.icon

  const requiresVerification = delivery.status === 'delivered'
  const isInTransit = delivery.status === 'in transit'

  return (
    <article className="group relative px-5 py-5 transition-all duration-300 hover:bg-[#FBFCFB] sm:px-6">
      {/* Status rail */}
      <div
        className={`
          absolute
          inset-y-5
          left-0
          w-[2px]
          rounded-r-full
          transition-all
          duration-300
          group-hover:w-[3px]
          ${
            status.tone === 'teal'
              ? 'bg-[#12613E]/40'
              : 'bg-[#B85C12]/45'
          }
        `}
      />

      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        {/* ================================================= */}
        {/* Main information */}
        {/* ================================================= */}

        <div className="flex min-w-0 items-start gap-3.5">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#F5F7F5] text-ink/45 transition-colors duration-300 group-hover:bg-[#EEF2EF] group-hover:text-ink/65">
            <Package className="h-[17px] w-[17px]" />

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

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
              <h3 className="truncate text-[13px] font-semibold tracking-[-0.01em] text-ink">
                {delivery.item}
              </h3>

              <Badge tone={status.tone}>
                <span className="inline-flex items-center gap-1.5">
                  <StatusIcon className="h-[11px] w-[11px]" />
                  {status.label}
                </span>
              </Badge>
            </div>

            <p className="mt-1 text-[10px] leading-4 text-ink/40">
              {delivery.specification}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-[10px] font-medium text-ink/45">
                Qty.{' '}
                <span className="font-semibold text-ink/65">
                  {delivery.quantity}
                </span>
              </span>

              <span className="h-1 w-1 rounded-full bg-ink/15" />

              <span className="max-w-[240px] truncate text-[10px] text-ink/40">
                {delivery.supplierName}
              </span>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* Delivery metadata */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 gap-4 border-t border-ink/[0.06] pt-4 sm:grid-cols-3 sm:gap-6 sm:border-0 sm:pt-0 xl:min-w-[600px] xl:grid-cols-[1.4fr_1fr_0.9fr_auto]">
          <MetaBlock
            label="Project"
            value={delivery.projectName}
          />

          <MetaBlock
            label="Location"
            value={
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3 shrink-0 text-ink/30" />
                {delivery.deliveryLocation}
              </span>
            }
          />

          <MetaBlock
            label={isInTransit ? 'Expected' : 'Delivered'}
            value={
              <span className="flex items-center gap-1.5">
                <Clock3 className="h-3 w-3 shrink-0 text-ink/30" />
                {isInTransit
                  ? delivery.expectedDate
                  : delivery.deliveredDate}
              </span>
            }
          />

          <button
            type="button"
            aria-label={`View delivery for ${delivery.item}`}
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              self-start
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
              sm:self-center
            "
          >
            <ChevronRight className="h-[15px] w-[15px] transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* ================================================= */}
      {/* Verification action */}
      {/* ================================================= */}

      {requiresVerification && (
        <div className="mt-5 rounded-[16px] border border-[#B85C12]/10 bg-[#B85C12]/[0.045] p-3.5 sm:p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#B85C12]/10 text-[#B85C12]">
                <Upload className="h-[15px] w-[15px]" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[11px] font-semibold text-ink">
                    Delivery evidence uploaded
                  </p>

                  <span className="rounded-full bg-white/70 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#B85C12]">
                    Review required
                  </span>
                </div>

                <p className="mt-1 max-w-2xl text-[10px] leading-4 text-ink/45">
                  Review the submitted evidence and confirm that the materials
                  received on site match the approved request.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="
                inline-flex
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-full
                bg-ink
                px-4
                py-2.5
                text-[10px]
                font-bold
                text-white
                shadow-[0_6px_16px_rgba(15,25,20,0.10)]
                transition-all
                hover:-translate-y-0.5
                hover:shadow-[0_9px_22px_rgba(15,25,20,0.14)]
                active:translate-y-0
              "
            >
              Verify delivery
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </article>
  )
}

function MetaBlock({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="min-w-0">
      <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-ink/30">
        {label}
      </p>

      <p className="mt-1.5 truncate text-[10.5px] font-medium text-ink">
        {value}
      </p>
    </div>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
  description: string
  tone: 'amber' | 'teal'
}) {
  const accent =
    tone === 'teal'
      ? {
          iconBg: 'bg-[#EAF4EE]',
          iconText: 'text-[#12613E]',
          dot: 'bg-[#12613E]',
        }
      : {
          iconBg: 'bg-[#F7EFE8]',
          iconText: 'text-[#B85C12]',
          dot: 'bg-[#B85C12]',
        }

  return (
    <Card className="group relative overflow-hidden">
      <div
        className={`
          absolute
          inset-y-4
          left-0
          w-[2px]
          ${accent.dot}
          opacity-35
        `}
      />

      <div className="p-5 sm:p-5.5">
        <div className="flex items-start justify-between gap-3">
          <div
            className={`
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-[13px]
              ${accent.iconBg}
              ${accent.iconText}
              transition-transform
              duration-300
              group-hover:scale-[1.04]
            `}
          >
            <Icon className="h-[17px] w-[17px]" />
          </div>

          <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-ink/25">
            Live
          </span>
        </div>

        <div className="mt-5">
          <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-ink/35">
            {label}
          </p>

          <p className="mt-1 font-display text-[27px] font-semibold tracking-[-0.04em] text-ink">
            {String(value).padStart(2, '0')}
          </p>

          <p className="mt-1 text-[10px] leading-4 text-ink/40">
            {description}
          </p>
        </div>
      </div>
    </Card>
  )
}