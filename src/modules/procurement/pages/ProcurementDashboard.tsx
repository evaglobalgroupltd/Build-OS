import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Package,
  Plus,
  ShieldCheck,
  Truck,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

import { materialRequests } from '@/data/mockData'

export function ProcurementDashboard() {
  const requested = materialRequests.filter(
    (request) => request.status === 'requested',
  )

  const awaitingAction = materialRequests.filter((request) =>
    ['approved', 'quoted', 'fund reserved'].includes(request.status),
  )

  const inTransit = materialRequests.filter(
    (request) => request.status === 'in transit',
  )

  const awaitingVerification = materialRequests.filter(
    (request) => request.status === 'delivered',
  )

  const completed = materialRequests.filter((request) =>
    ['verified', 'accepted'].includes(request.status),
  )

  const disputed = materialRequests.filter(
    (request) => request.status === 'disputed',
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
            Procurement dashboard
          </h1>

          <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/45">
            Monitor material requests, supplier progress, deliveries and
            verification across active procurement work.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Plus className="h-3.5 w-3.5" />
          Create request
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          icon={Clock3}
          label="Requests"
          value={requested.length}
          description="Awaiting review"
        />

        <MetricCard
          icon={Package}
          label="In procurement"
          value={awaitingAction.length}
          description="Approval / quote / funds"
        />

        <MetricCard
          icon={Truck}
          label="In transit"
          value={inTransit.length}
          description="On the way to site"
        />

        <MetricCard
          icon={ShieldCheck}
          label="Verification"
          value={awaitingVerification.length}
          description="Delivered to site"
        />

        <MetricCard
          icon={CheckCircle2}
          label="Completed"
          value={completed.length}
          description="Verified / accepted"
        />
      </div>

      {/* Attention */}
      {(awaitingVerification.length > 0 || disputed.length > 0) && (
        <div className="grid gap-4 lg:grid-cols-2">
          {awaitingVerification.length > 0 && (
            <AttentionCard
              icon={ShieldCheck}
              title="Deliveries awaiting verification"
              description="Delivered materials need quantity and condition verification before the procurement workflow can be completed."
              count={awaitingVerification.length}
              action="Review deliveries"
            />
          )}

          {disputed.length > 0 && (
            <AttentionCard
              icon={AlertTriangle}
              title="Disputed deliveries"
              description="These procurement lines require resolution before the affected payment workflow can proceed."
              count={disputed.length}
              action="Review disputes"
              warning
            />
          )}
        </div>
      )}

      {/* Pipeline */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Procurement pipeline"
          subtitle="Current position of material requests through the procurement lifecycle."
        />

        <CardBody>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <PipelineStage
              label="Requested"
              value={requested.length}
              tone="amber"
            />

            <PipelineStage
              label="Procurement"
              value={awaitingAction.length}
              tone="amber"
            />

            <PipelineStage
              label="In transit"
              value={inTransit.length}
              tone="amber"
            />

            <PipelineStage
              label="Verification"
              value={awaitingVerification.length}
              tone="amber"
            />

            <PipelineStage
              label="Completed"
              value={completed.length}
              tone="teal"
            />
          </div>
        </CardBody>
      </Card>

      {/* Requests needing attention */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Requests needing attention"
          subtitle="The procurement items most likely to require an action."
          action={
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/50 transition-colors hover:text-ink"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          }
        />

        <div className="divide-y divide-line">
          {[
            ...awaitingVerification,
            ...requested,
            ...disputed,
          ]
            .slice(0, 5)
            .map((request) => (
              <RequestAttentionRow key={request.id} request={request} />
            ))}

          {awaitingVerification.length === 0 &&
            requested.length === 0 &&
            disputed.length === 0 && (
              <div className="px-6 py-10 text-center">
                <CheckCircle2 className="mx-auto h-5 w-5 text-teal-600" />

                <p className="mt-3 text-sm font-medium text-ink">
                  Procurement is up to date
                </p>

                <p className="mt-1 text-xs text-ink/40">
                  There are no material requests requiring immediate action.
                </p>
              </div>
            )}
        </div>
      </Card>

      {/* Recent activity */}
      <Card>
        <CardHeader
          title="Procurement activity"
          subtitle="A quick view of recent procurement movement."
        />

        <CardBody>
          <div className="grid gap-3 md:grid-cols-3">
            <ActivityCard
              icon={Package}
              title="Material requests"
              value={`${materialRequests.length}`}
              description="Total active records"
            />

            <ActivityCard
              icon={Truck}
              title="Deliveries"
              value={`${inTransit.length + awaitingVerification.length}`}
              description="In transit or delivered"
            />

            <ActivityCard
              icon={CheckCircle2}
              title="Verified"
              value={`${completed.length}`}
              description="Completed verification"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function MetricCard({
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
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink/5">
            <Icon className="h-4 w-4 text-ink/50" />
          </div>

          <span className="text-xl font-semibold text-ink">{value}</span>
        </div>

        <p className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-ink/35">
          {label}
        </p>

        <p className="mt-1 text-[11px] text-ink/40">{description}</p>
      </div>
    </Card>
  )
}

function PipelineStage({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone: 'amber' | 'teal'
}) {
  return (
    <div className="rounded-xl border border-line p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-ink/55">{label}</span>

        <span
          className={`h-2 w-2 rounded-full ${
            tone === 'teal' ? 'bg-teal-600' : 'bg-amber-500'
          }`}
        />
      </div>

      <p className="mt-3 text-2xl font-semibold text-ink">{value}</p>

      <p className="mt-1 text-[10px] text-ink/35">
        {value === 1 ? 'material request' : 'material requests'}
      </p>
    </div>
  )
}

function AttentionCard({
  icon: Icon,
  title,
  description,
  count,
  action,
  warning = false,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  count: number
  action: string
  warning?: boolean
}) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
              warning ? 'bg-amber-500/10' : 'bg-ink/5'
            }`}
          >
            <Icon
              className={`h-4 w-4 ${
                warning ? 'text-amber-700' : 'text-ink/50'
              }`}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xs font-semibold text-ink">{title}</h3>

              <Badge tone="amber">{count}</Badge>
            </div>

            <p className="mt-1.5 text-[11px] leading-4 text-ink/40">
              {description}
            </p>

            <button
              type="button"
              className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-ink/55 hover:text-ink"
            >
              {action}
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

function RequestAttentionRow({
  request,
}: {
  request: (typeof materialRequests)[number]
}) {
  const isDisputed = request.status === 'disputed'
  const isDelivered = request.status === 'delivered'

  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink/5">
          <Package className="h-3.5 w-3.5 text-ink/45" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-ink">
            {request.item}
          </p>

          <p className="mt-0.5 text-[10px] text-ink/40">
            Qty: {request.quantity}
            {request.supplierName && ` · ${request.supplierName}`}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Badge tone={isDisputed || isDelivered ? 'amber' : 'teal'}>
          {isDisputed
            ? 'Disputed'
            : isDelivered
              ? 'Verify'
              : request.status}
        </Badge>

        <button
          type="button"
          aria-label={`Open ${request.item}`}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-ink/30 hover:bg-ink/5 hover:text-ink"
        >
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

function ActivityCard({
  icon: Icon,
  title,
  value,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  value: string
  description: string
}) {
  return (
    <div className="rounded-xl bg-ink/[0.03] p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-ink/40" />

        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
          {title}
        </p>
      </div>

      <p className="mt-3 text-lg font-semibold text-ink">{value}</p>

      <p className="mt-1 text-[10px] text-ink/35">{description}</p>
    </div>
  )
}