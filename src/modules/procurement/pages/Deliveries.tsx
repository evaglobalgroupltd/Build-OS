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

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
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
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid gap-3 sm:grid-cols-3">
        <SummaryCard
          icon={Truck}
          label="In transit"
          value={inTransit.length}
          description="Awaiting site delivery"
        />

        <SummaryCard
          icon={Package}
          label="Awaiting verification"
          value={awaitingVerification.length}
          description="Delivered to site"
        />

        <SummaryCard
          icon={CheckCircle2}
          label="Verified"
          value={completed.length}
          description="Accepted deliveries"
        />
      </div>

      {/* In transit */}
      <DeliverySection
        title="In transit"
        subtitle="Orders dispatched by suppliers and currently on the way to site."
        deliveries={inTransit}
      />

      {/* Awaiting verification */}
      <DeliverySection
        title="Awaiting verification"
        subtitle="Delivered materials requiring contractor or PM verification."
        deliveries={awaitingVerification}
      />

      {/* Completed */}
      <DeliverySection
        title="Completed deliveries"
        subtitle="Materials that have passed delivery verification."
        deliveries={completed}
      />
    </div>
  )
}

function DeliverySection({
  title,
  subtitle,
  deliveries,
}: {
  title: string
  subtitle: string
  deliveries: Delivery[]
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader
        title={title}
        subtitle={subtitle}
        action={
          <span className="rounded-full bg-ink/5 px-2.5 py-1 text-[10px] font-semibold text-ink/45">
            {deliveries.length}
          </span>
        }
      />

      {deliveries.length === 0 ? (
        <div className="border-t border-line px-6 py-8 text-center">
          <Package className="mx-auto h-5 w-5 text-ink/25" />
          <p className="mt-2 text-xs text-ink/40">
            No deliveries in this stage.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-line">
          {deliveries.map((delivery) => (
            <DeliveryRow key={delivery.id} delivery={delivery} />
          ))}
        </div>
      )}
    </Card>
  )
}

function DeliveryRow({ delivery }: { delivery: Delivery }) {
  const status = statusConfig[delivery.status]
  const StatusIcon = status.icon

  const requiresVerification = delivery.status === 'delivered'
  const isInTransit = delivery.status === 'in transit'

  return (
    <div className="px-6 py-5 transition-colors hover:bg-ink/[0.02]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Main information */}
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
            <Package className="h-4 w-4 text-ink/50" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-ink">
                {delivery.item}
              </h3>

              <Badge tone={status.tone}>
                <span className="inline-flex items-center gap-1.5">
                  <StatusIcon className="h-3 w-3" />
                  {status.label}
                </span>
              </Badge>
            </div>

            <p className="mt-1 text-xs text-ink/45">
              {delivery.specification}
            </p>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink/40">
              <span>Qty: {delivery.quantity}</span>
              <span>Supplier: {delivery.supplierName}</span>
            </div>
          </div>
        </div>

        {/* Delivery information */}
        <div className="flex flex-wrap items-center gap-5 lg:justify-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
              Project
            </p>
            <p className="mt-1 max-w-[220px] text-xs font-medium text-ink">
              {delivery.projectName}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
              Location
            </p>

            <p className="mt-1 flex items-center gap-1 text-xs text-ink/55">
              <MapPin className="h-3 w-3" />
              {delivery.deliveryLocation}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
              {isInTransit ? 'Expected' : 'Delivered'}
            </p>

            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-ink">
              <Clock3 className="h-3 w-3 text-ink/35" />
              {isInTransit
                ? delivery.expectedDate
                : delivery.deliveredDate}
            </p>
          </div>

          <button
            type="button"
            aria-label={`View delivery for ${delivery.item}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink/30 transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Verification action */}
      {requiresVerification && (
        <div className="mt-4 flex flex-col gap-3 rounded-xl bg-amber-500/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2.5">
            <Upload className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />

            <div>
              <p className="text-xs font-semibold text-ink">
                Delivery evidence uploaded
              </p>

              <p className="mt-0.5 text-[11px] leading-4 text-ink/45">
                Review the delivery evidence and verify the materials received
                on site.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="shrink-0 rounded-lg bg-ink px-3 py-2 text-[11px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            Verify delivery
          </button>
        </div>
      )}
    </div>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
  description: string
}) {
  return (
    <Card>
      <div className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
            <Icon className="h-4 w-4 text-ink/50" />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
              {label}
            </p>

            <p className="mt-0.5 font-display text-xl font-semibold text-ink">
              {value}
            </p>
          </div>
        </div>

        <p className="mt-3 text-xs text-ink/40">{description}</p>
      </div>
    </Card>
  )
}