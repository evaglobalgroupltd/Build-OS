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
import { type ComponentType } from 'react'

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
    label: 'In transit',
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
    <div className="space-y-7 pb-8">
      {/* Page header */}
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
              Procurement control
            </p>

            <span className="h-1 w-1 rounded-full bg-ink/20" />

            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink/30">
              {issued.length.toString().padStart(2, '0')} active records
            </span>
          </div>

          <h1 className="mt-2 text-[27px] font-semibold tracking-[-0.035em] text-ink sm:text-[31px]">
            Purchase orders
          </h1>

          <p className="mt-2 max-w-2xl text-[13px] leading-6 text-ink/45">
            Control supplier commitments from issuance and acknowledgement
            through delivery, verification, and completion.
          </p>
        </div>

        <button
          type="button"
          className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(20,40,30,0.12)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(20,40,30,0.16)]"
        >
          <Plus className="h-3.5 w-3.5" />
          Create purchase order
          <ArrowRight className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:translate-x-0.5" />
        </button>
      </section>

      {/* Executive overview */}
      <section className="overflow-hidden rounded-[24px] bg-ink p-5 text-white shadow-[0_18px_45px_rgba(20,40,30,0.10)] sm:p-6 lg:p-7">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                <FileText className="h-3.5 w-3.5 text-white/80" />
              </span>

              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">
                Purchase order overview
              </p>
            </div>

            <h2 className="mt-4 text-xl font-semibold tracking-[-0.025em] sm:text-2xl">
              Supplier commitments, kept visible.
            </h2>

            <p className="mt-2 max-w-lg text-xs leading-5 text-white/45">
              Monitor financial exposure, supplier acknowledgement, logistics
              and delivery completion from one procurement workspace.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 lg:self-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8CC9A5]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55">
              Live procurement
            </span>
          </div>
        </div>

        <div className="mt-7 grid gap-2 border-t border-white/[0.08] pt-5 sm:grid-cols-3">
          <OverviewMetric
            label="Issued orders"
            value={issued.length}
          />

          <OverviewMetric
            label="Active movement"
            value={active.length}
          />

          <OverviewMetric
            label="Committed value"
            value={formatCurrency(totalValue)}
          />
        </div>
      </section>

      {/* Summary metrics */}
      <section>
        <SectionEyebrow label="At a glance" />

        <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            icon={FileText}
            label="Issued"
            value={issued.length}
            description="Purchase orders"
            accent="neutral"
          />

          <SummaryCard
            icon={Clock3}
            label="Active"
            value={active.length}
            description="Awaiting delivery"
            accent="amber"
          />

          <SummaryCard
            icon={Truck}
            label="Delivered"
            value={delivered.length}
            description="Delivered or completed"
            accent="teal"
          />

          <SummaryCard
            icon={CheckCircle2}
            label="Order value"
            value={formatCurrency(totalValue)}
            description="Issued PO value"
            accent="teal"
          />
        </div>
      </section>

      {/* Purchase order register */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Purchase order register"
          subtitle="Supplier orders generated from approved procurement requests."
          action={
            <div className="flex items-center gap-2">
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.1em] text-ink/30 sm:inline">
                Active register
              </span>

              <Badge tone="teal">
                {issued.length.toString().padStart(2, '0')}{' '}
                {issued.length === 1 ? 'order' : 'orders'}
              </Badge>
            </div>
          }
        />

        <div className="divide-y divide-line">
          {issued.map((order) => (
            <PurchaseOrderRow key={order.id} order={order} />
          ))}

          {issued.length === 0 && <EmptyPurchaseOrders />}
        </div>
      </Card>

      {/* Lifecycle */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Purchase order lifecycle"
          subtitle="A controlled progression from commercial commitment to verified completion."
        />

        <CardBody>
          <div className="grid gap-2 lg:grid-cols-5">
            <LifecycleStep
              number="01"
              label="Issued"
              description="PO sent to supplier"
              state="active"
            />

            <LifecycleConnector />

            <LifecycleStep
              number="02"
              label="Acknowledged"
              description="Supplier confirms order"
              state="active"
            />

            <LifecycleConnector />

            <LifecycleStep
              number="03"
              label="In transit"
              description="Order dispatched"
              state="active"
            />

            <LifecycleConnector />

            <LifecycleStep
              number="04"
              label="Delivered"
              description="Received at site"
              state="active"
            />

            <LifecycleConnector />

            <LifecycleStep
              number="05"
              label="Completed"
              description="Verified and accepted"
              state="complete"
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

  const statusIsComplete = order.status === 'completed'

  return (
    <div className="group relative px-5 py-5 transition-colors hover:bg-ink/[0.018] sm:px-6">
      {/* Status rail */}
      <div
        className={[
          'absolute bottom-5 left-0 top-5 w-[2px] rounded-r-full',
          statusIsComplete ? 'bg-teal/60' : 'bg-[#B85C12]/50',
        ].join(' ')}
      />

      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        {/* Identity */}
        <div className="flex min-w-0 items-start gap-3.5">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] border border-ink/[0.06] bg-ink/[0.035] transition-all group-hover:bg-ink/[0.055]">
            <FileText className="h-4 w-4 text-ink/55" />

            <span
              className={[
                'absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full ring-2 ring-white',
                statusIsComplete ? 'bg-[#12613E]' : 'bg-[#B85C12]',
              ].join(' ')}
            />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-mono text-[11px] font-semibold tracking-[-0.01em] text-ink">
                {order.id}
              </p>

              <Badge tone={config.tone}>
                <span className="inline-flex items-center gap-1.5">
                  <StatusIcon className="h-3 w-3" />
                  {config.label}
                </span>
              </Badge>
            </div>

            <p className="mt-1.5 truncate text-[14px] font-semibold tracking-[-0.01em] text-ink">
              {order.itemSummary}
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-ink/40">
              <span>{order.supplierName}</span>

              <span className="h-1 w-1 rounded-full bg-ink/15" />

              <span>
                {order.itemCount.toLocaleString('en-NG')} item
                {order.itemCount === 1 ? '' : 's'}
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4 xl:flex xl:items-center xl:gap-7">
          <Info
            label="Project"
            value={order.projectName}
          />

          <Info
            label="Order value"
            value={formatCurrency(order.amount)}
            emphasis
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
            className="col-span-2 flex h-9 w-9 items-center justify-center rounded-full border border-ink/[0.07] text-ink/30 transition-all hover:border-ink/15 hover:bg-ink/[0.04] hover:text-ink sm:col-span-1 xl:ml-1"
          >
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Action strip */}
      {requiresAction && (
        <div
          className={[
            'mt-5 flex flex-col gap-3 rounded-[16px] border px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between',
            order.status === 'delivered'
              ? 'border-[#B85C12]/10 bg-[#F7EFE8]/60'
              : 'border-ink/[0.06] bg-ink/[0.025]',
          ].join(' ')}
        >
          <div className="flex items-start gap-3">
            <div
              className={[
                'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                order.status === 'delivered'
                  ? 'bg-[#B85C12]/10 text-[#B85C12]'
                  : 'bg-ink/[0.06] text-ink/45',
              ].join(' ')}
            >
              {order.status === 'delivered' ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                <Send className="h-3.5 w-3.5" />
              )}
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.11em] text-ink/35">
                {order.status === 'delivered'
                  ? 'Verification required'
                  : 'Supplier acknowledgement'}
              </p>

              <p className="mt-1 max-w-xl text-[11px] leading-5 text-ink/50">
                {order.status === 'delivered'
                  ? 'Delivery has been recorded. Verification is required before the order can be completed.'
                  : 'Purchase order has been issued. Monitor supplier acknowledgement and dispatch.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-[10px] font-semibold text-white shadow-[0_6px_16px_rgba(20,40,30,0.10)] transition-all hover:-translate-y-0.5 hover:shadow-[0_9px_20px_rgba(20,40,30,0.14)]"
          >
            {order.status === 'delivered'
              ? 'Verify delivery'
              : 'View order'}

            <ArrowRight className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5" />
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
  accent,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: number | string
  description: string
  accent: 'neutral' | 'amber' | 'teal'
}) {
  const accentStyles = {
    neutral: {
      rail: 'bg-ink/20',
      icon: 'bg-ink/[0.045] text-ink/50',
    },
    amber: {
      rail: 'bg-[#B85C12]/55',
      icon: 'bg-[#F7EFE8] text-[#B85C12]',
    },
    teal: {
      rail: 'bg-[#12613E]/55',
      icon: 'bg-[#EAF4EE] text-[#12613E]',
    },
  }

  const styles = accentStyles[accent]

  return (
    <Card className="relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(20,40,30,0.06)]">
      <div
        className={`absolute bottom-4 left-0 top-4 w-[2px] rounded-r-full ${styles.rail}`}
      />

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-[12px] ${styles.icon}`}
          >
            <Icon className="h-4 w-4" />
          </div>

          <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/25">
            Live
          </span>
        </div>

        <div className="mt-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
            {label}
          </p>

          <p className="mt-1 text-[21px] font-semibold tracking-[-0.03em] text-ink">
            {typeof value === 'number'
              ? value.toString().padStart(2, '0')
              : value}
          </p>

          <p className="mt-1 text-[11px] text-ink/40">
            {description}
          </p>
        </div>
      </div>
    </Card>
  )
}

function OverviewMetric({
  label,
  value,
}: {
  label: string
  value: number | string
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[14px] border border-white/[0.06] bg-white/[0.035] px-4 py-3.5">
      <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/35">
        {label}
      </span>

      <span className="text-sm font-semibold tracking-[-0.01em] text-white/85">
        {typeof value === 'number'
          ? value.toString().padStart(2, '0')
          : value}
      </span>
    </div>
  )
}

function Info({
  label,
  value,
  icon: Icon,
  emphasis = false,
}: {
  label: string
  value: string
  icon?: ComponentType<{ className?: string }>
  emphasis?: boolean
}) {
  return (
    <div className="min-w-0">
      <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-ink/30">
        {label}
      </p>

      <p
        className={[
          'mt-1 flex max-w-[175px] items-center gap-1.5 truncate text-[11px]',
          emphasis
            ? 'font-semibold text-ink'
            : 'font-medium text-ink/70',
        ].join(' ')}
      >
        {Icon && (
          <Icon className="h-3 w-3 shrink-0 text-ink/30" />
        )}

        <span className="truncate">{value}</span>
      </p>
    </div>
  )
}

function LifecycleStep({
  number,
  label,
  description,
  state,
}: {
  number: string
  label: string
  description: string
  state: 'active' | 'complete'
}) {
  const isComplete = state === 'complete'

  return (
    <div
      className={[
        'group relative rounded-[16px] border p-4 transition-all',
        isComplete
          ? 'border-[#12613E]/10 bg-[#EAF4EE]/45'
          : 'border-ink/[0.06] bg-ink/[0.025] hover:bg-ink/[0.04]',
      ].join(' ')}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={[
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] font-mono text-[9px] font-semibold',
            isComplete
              ? 'bg-[#12613E] text-white'
              : 'bg-white text-ink/40 shadow-[0_3px_10px_rgba(20,40,30,0.05)]',
          ].join(' ')}
        >
          {number}
        </span>

        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold text-ink">
            {label}
          </p>

          {isComplete && (
            <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#12613E]/60">
              Terminal state
            </p>
          )}
        </div>
      </div>

      <p className="mt-3 text-[10px] leading-4 text-ink/40">
        {description}
      </p>
    </div>
  )
}

function LifecycleConnector() {
  return (
    <div className="hidden items-center justify-center lg:flex">
      <div className="h-px w-full bg-ink/[0.08]" />
    </div>
  )
}

function EmptyPurchaseOrders() {
  return (
    <div className="px-6 py-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[16px] border border-ink/[0.07] bg-ink/[0.025]">
        <FileText className="h-5 w-5 text-ink/25" />
      </div>

      <p className="mt-4 text-sm font-semibold text-ink">
        No purchase orders yet
      </p>

      <p className="mx-auto mt-1.5 max-w-sm text-[11px] leading-5 text-ink/40">
        Approved procurement requests can be converted into purchase orders
        and tracked here.
      </p>
    </div>
  )
}

function SectionEyebrow({
  label,
}: {
  label: string
}) {
  return (
    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
      {label}
    </p>
  )
}

function formatCurrency(amount: number) {
  return `₦${amount.toLocaleString('en-NG')}`
}