import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Package,
  Plus,
  Send,
  Truck,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

type PurchaseOrderStatus =
  | 'draft'
  | 'issued'
  | 'acknowledged'
  | 'in transit'
  | 'delivered'
  | 'completed'

type PurchaseOrder = {
  id: string
  supplierName: string
  projectName: string
  itemSummary: string
  itemCount: number
  amount: number
  currency: string
  status: PurchaseOrderStatus
  issuedDate: string
  expectedDelivery?: string
}

const purchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO-2026-014',
    supplierName: 'Prime Build Materials Ltd.',
    projectName: 'Gwarinpa Residential Development',
    itemSummary: 'Portland Cement',
    itemCount: 150,
    amount: 2850000,
    currency: '₦',
    status: 'in transit',
    issuedDate: 'Aug 28, 2026',
    expectedDelivery: 'Sep 02, 2026',
  },
  {
    id: 'PO-2026-013',
    supplierName: 'Prime Build Materials Ltd.',
    projectName: 'Maitama Duplex Construction',
    itemSummary: '12mm High Tensile Steel Bar',
    itemCount: 1,
    amount: 1950000,
    currency: '₦',
    status: 'delivered',
    issuedDate: 'Aug 25, 2026',
    expectedDelivery: 'Aug 30, 2026',
  },
  {
    id: 'PO-2026-012',
    supplierName: 'BuildRight Supplies',
    projectName: 'Jabi Commercial Renovation',
    itemSummary: '9-inch Load Bearing Blocks',
    itemCount: 800,
    amount: 640000,
    currency: '₦',
    status: 'acknowledged',
    issuedDate: 'Aug 29, 2026',
    expectedDelivery: 'Sep 05, 2026',
  },
  {
    id: 'PO-2026-011',
    supplierName: 'Electrical Hub Nigeria',
    projectName: 'Gwarinpa Residential Development',
    itemSummary: 'Electrical conduits and fittings',
    itemCount: 42,
    amount: 485000,
    currency: '₦',
    status: 'completed',
    issuedDate: 'Aug 20, 2026',
    expectedDelivery: 'Aug 27, 2026',
  },
]

const statusConfig = {
  draft: {
    label: 'Draft',
    tone: 'amber' as const,
    icon: FileText,
  },
  issued: {
    label: 'Issued',
    tone: 'amber' as const,
    icon: Send,
  },
  acknowledged: {
    label: 'Acknowledged',
    tone: 'amber' as const,
    icon: CheckCircle2,
  },
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
  completed: {
    label: 'Completed',
    tone: 'teal' as const,
    icon: CheckCircle2,
  },
}

export function PurchaseOrders() {
  const issued = purchaseOrders.filter(
    (order) => order.status !== 'draft',
  )

  const active = purchaseOrders.filter((order) =>
    ['issued', 'acknowledged', 'in transit'].includes(order.status),
  )

  const delivered = purchaseOrders.filter((order) =>
    ['delivered', 'completed'].includes(order.status),
  )

  const totalValue = issued.reduce(
    (sum, order) => sum + order.amount,
    0,
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
            Procurement
          </p>

          <h1 className="mt-1 text-xl font-semibold text-ink">
            Purchase orders
          </h1>

          <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/45">
            Track issued supplier orders from acknowledgement through
            delivery and completion.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Plus className="h-3.5 w-3.5" />
          Create purchase order
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={FileText}
          label="Issued"
          value={issued.length}
          description="Purchase orders"
        />

        <SummaryCard
          icon={Clock3}
          label="Active"
          value={active.length}
          description="Awaiting delivery"
        />

        <SummaryCard
          icon={Truck}
          label="Delivered"
          value={delivered.length}
          description="Delivered or completed"
        />

        <SummaryCard
          icon={CheckCircle2}
          label="Order value"
          value={formatCurrency(totalValue)}
          description="Issued PO value"
        />
      </div>

      {/* Purchase order list */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Issued purchase orders"
          subtitle="Supplier orders generated from approved procurement requests."
          action={
            <Badge tone="teal">
              {issued.length} {issued.length === 1 ? 'order' : 'orders'}
            </Badge>
          }
        />

        <div className="divide-y divide-line">
          {issued.map((order) => (
            <PurchaseOrderRow key={order.id} order={order} />
          ))}

          {issued.length === 0 && (
            <div className="px-6 py-10 text-center">
              <FileText className="mx-auto h-5 w-5 text-ink/25" />

              <p className="mt-3 text-sm font-medium text-ink">
                No purchase orders yet
              </p>

              <p className="mt-1 text-xs text-ink/40">
                Approved procurement requests can be converted into purchase
                orders.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Order lifecycle */}
      <Card>
        <CardHeader
          title="Purchase order lifecycle"
          subtitle="Track the order from issue through delivery."
        />

        <CardBody>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <LifecycleStep
              number="01"
              label="Issued"
              description="PO sent to supplier"
            />

            <LifecycleStep
              number="02"
              label="Acknowledged"
              description="Supplier confirms order"
            />

            <LifecycleStep
              number="03"
              label="In transit"
              description="Order dispatched"
            />

            <LifecycleStep
              number="04"
              label="Delivered"
              description="Received at site"
            />

            <LifecycleStep
              number="05"
              label="Completed"
              description="Verified and accepted"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function PurchaseOrderRow({
  order,
}: {
  order: PurchaseOrder
}) {
  const config = statusConfig[order.status]
  const StatusIcon = config.icon

  const requiresAction =
    order.status === 'delivered' || order.status === 'issued'

  return (
    <div className="px-6 py-5 transition-colors hover:bg-ink/[0.02]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* PO identity */}
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
            <FileText className="h-4 w-4 text-ink/50" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-mono text-xs font-semibold text-ink">
                {order.id}
              </p>

              <Badge tone={config.tone}>
                <span className="inline-flex items-center gap-1.5">
                  <StatusIcon className="h-3 w-3" />
                  {config.label}
                </span>
              </Badge>
            </div>

            <p className="mt-1 text-sm font-semibold text-ink">
              {order.itemSummary}
            </p>

            <p className="mt-0.5 text-xs text-ink/40">
              {order.supplierName}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4 lg:flex lg:items-center">
          <Info
            label="Project"
            value={order.projectName}
          />

          <Info
            label="Value"
            value={formatCurrency(order.amount)}
          />

          <Info
            label="Issued"
            value={order.issuedDate}
            icon={CalendarDays}
          />

          <Info
            label={
              order.status === 'in transit'
                ? 'Expected delivery'
                : 'Delivery'
            }
            value={order.expectedDelivery ?? '—'}
            icon={CalendarDays}
          />

          <button
            type="button"
            aria-label={`Open ${order.id}`}
            className="col-span-2 flex h-8 w-8 items-center justify-center rounded-lg text-ink/30 transition-colors hover:bg-ink/5 hover:text-ink sm:col-span-1"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {requiresAction && (
        <div className="mt-4 flex flex-col gap-3 rounded-xl bg-ink/[0.025] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-ink/45">
            {order.status === 'delivered'
              ? 'Delivery has been recorded. Verification is required before the order can be completed.'
              : 'Purchase order has been issued. Monitor supplier acknowledgement and dispatch.'}
          </p>

          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-ink px-3 py-2 text-[11px] font-semibold text-white hover:opacity-90"
          >
            {order.status === 'delivered'
              ? 'Verify delivery'
              : 'View order'}
            <ArrowRight className="h-3 w-3" />
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
  value: number | string
  description: string
}) {
  return (
    <Card>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
            <Icon className="h-4 w-4 text-ink/50" />
          </div>

          <p className="text-xl font-semibold text-ink">{value}</p>
        </div>

        <p className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-ink/35">
          {label}
        </p>

        <p className="mt-1 text-xs text-ink/40">{description}</p>
      </div>
    </Card>
  )
}

function Info({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="min-w-0">
      <p className="text-[9px] font-semibold uppercase tracking-wide text-ink/30">
        {label}
      </p>

      <p className="mt-1 flex max-w-[170px] items-center gap-1 truncate text-xs font-medium text-ink">
        {Icon && <Icon className="h-3 w-3 shrink-0 text-ink/30" />}
        {value}
      </p>
    </div>
  )
}

function LifecycleStep({
  number,
  label,
  description,
}: {
  number: string
  label: string
  description: string
}) {
  return (
    <div className="rounded-xl bg-ink/[0.03] p-4">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white font-mono text-[10px] font-semibold text-ink/40">
          {number}
        </span>

        <p className="text-xs font-semibold text-ink">{label}</p>
      </div>

      <p className="mt-3 text-[10px] leading-4 text-ink/40">
        {description}
      </p>
    </div>
  )
}

function formatCurrency(amount: number) {
  return `₦${amount.toLocaleString('en-NG')}`
}