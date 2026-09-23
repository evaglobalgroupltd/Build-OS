import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Package,
  Plus,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import { type ComponentType } from 'react'

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

  const attentionRequests = [
    ...awaitingVerification,
    ...disputed,
    ...requested,
  ].slice(0, 5)

  const activePipeline =
    requested.length +
    awaitingAction.length +
    inTransit.length +
    awaitingVerification.length

  const totalRequests = materialRequests.length

  return (
    <div className="space-y-7 pb-8">
      {/* ---------------------------------------------------------------- */}
      {/* Page header                                                       */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35">
              Procurement command
            </span>

            <span className="h-1 w-1 rounded-full bg-ink/20" />

            <span className="text-[10px] font-medium text-ink/35">
              {totalRequests} active record
              {totalRequests === 1 ? '' : 's'}
            </span>
          </div>

          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-ink sm:text-3xl">
            Procurement dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/45">
            Monitor material requirements, supplier fulfilment, site
            deliveries and verification from one operational view.
          </p>
        </div>

        <button
          type="button"
          className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(20,40,30,0.14)] transition-all hover:-translate-y-0.5 hover:bg-ink/90 focus:outline-none focus:ring-4 focus:ring-ink/[0.08]"
        >
          <Plus className="h-3.5 w-3.5" />
          Create request
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Executive overview                                               */}
      {/* ---------------------------------------------------------------- */}
      <Card className="overflow-hidden border-ink/[0.08] shadow-[0_16px_40px_rgba(20,40,30,0.055)]">
        <div className="grid lg:grid-cols-[0.95fr_2.05fr]">
          {/* Dark overview panel */}
          <div className="relative overflow-hidden bg-ink px-6 py-7 text-white sm:px-7 lg:min-h-[205px]">
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/[0.055] blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 left-1/2 h-44 w-44 rounded-full bg-white/[0.025] blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-[13px] border border-white/10 bg-white/[0.08]">
                  <ShieldCheck className="h-4 w-4 text-white/75" />
                </div>

                <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/40">
                  Live
                </span>
              </div>

              <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
                Operational overview
              </p>

              <div className="mt-2 flex items-end gap-3">
                <p className="text-3xl font-semibold tracking-[-0.05em] text-white">
                  {String(activePipeline).padStart(2, '0')}
                </p>

                <p className="mb-1 text-[10px] text-white/35">
                  active pipeline
                </p>
              </div>

              <p className="mt-2 max-w-sm text-xs leading-5 text-white/40">
                Material requests currently moving through procurement,
                delivery or verification.
              </p>
            </div>
          </div>

          {/* KPI grid */}
          <div className="grid grid-cols-2 divide-x divide-y divide-ink/[0.06] sm:grid-cols-5 sm:divide-y-0">
            <MetricCard
              icon={Clock3}
              label="Requests"
              value={requested.length}
              description="Awaiting review"
              tone="amber"
            />

            <MetricCard
              icon={Package}
              label="Procurement"
              value={awaitingAction.length}
              description="Approval / quote"
            />

            <MetricCard
              icon={Truck}
              label="In transit"
              value={inTransit.length}
              description="Moving to site"
              tone="amber"
            />

            <MetricCard
              icon={ShieldCheck}
              label="Verification"
              value={awaitingVerification.length}
              description="Delivered to site"
              tone="amber"
            />

            <MetricCard
              icon={CheckCircle2}
              label="Completed"
              value={completed.length}
              description="Verified / accepted"
              tone="teal"
            />
          </div>
        </div>
      </Card>

      {/* ---------------------------------------------------------------- */}
      {/* Attention centre                                                  */}
      {/* ---------------------------------------------------------------- */}
      {(awaitingVerification.length > 0 || disputed.length > 0) && (
        <section>
          <SectionEyebrow
            label="Requires attention"
            count={awaitingVerification.length + disputed.length}
          />

          <div className="mt-3 grid gap-4 lg:grid-cols-2">
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
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Pipeline                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Card className="overflow-hidden border-ink/[0.07] shadow-[0_12px_30px_rgba(20,40,30,0.045)]">
        <CardHeader
          title="Procurement pipeline"
          subtitle="Current position of material requests through the controlled lifecycle."
          action={
            <span className="hidden items-center gap-1.5 rounded-full border border-ink/[0.07] bg-ink/[0.02] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/35 sm:inline-flex">
              {totalRequests} total
            </span>
          }
        />

        <CardBody>
          <div className="grid gap-2 md:grid-cols-9 md:items-stretch">
            <PipelineStage
              label="Requested"
              value={requested.length}
              tone="amber"
              index="01"
            />

            <PipelineConnector />

            <PipelineStage
              label="Procurement"
              value={awaitingAction.length}
              tone="amber"
              index="02"
            />

            <PipelineConnector />

            <PipelineStage
              label="In transit"
              value={inTransit.length}
              tone="amber"
              index="03"
            />

            <PipelineConnector />

            <PipelineStage
              label="Verification"
              value={awaitingVerification.length}
              tone="amber"
              index="04"
            />

            <PipelineConnector />

            <PipelineStage
              label="Completed"
              value={completed.length}
              tone="teal"
              index="05"
            />
          </div>
        </CardBody>
      </Card>

      {/* ---------------------------------------------------------------- */}
      {/* Requests requiring attention                                     */}
      {/* ---------------------------------------------------------------- */}
      <Card className="overflow-hidden border-ink/[0.07] shadow-[0_12px_30px_rgba(20,40,30,0.045)]">
        <CardHeader
          title="Requests requiring attention"
          subtitle="The procurement records most likely to require an immediate action."
          action={
            <button
              type="button"
              className="group inline-flex items-center gap-1.5 text-[11px] font-semibold text-ink/45 transition-colors hover:text-ink"
            >
              View all
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </button>
          }
        />

        <div className="divide-y divide-ink/[0.06]">
          {attentionRequests.map((request) => (
            <RequestAttentionRow
              key={request.id}
              request={request}
            />
          ))}

          {attentionRequests.length === 0 && (
            <EmptyAttentionState />
          )}
        </div>
      </Card>

      {/* ---------------------------------------------------------------- */}
      {/* Activity snapshot                                                 */}
      {/* ---------------------------------------------------------------- */}
      <Card className="border-ink/[0.07] shadow-[0_12px_30px_rgba(20,40,30,0.045)]">
        <CardHeader
          title="Procurement activity"
          subtitle="A concise view of current procurement movement."
        />

        <CardBody>
          <div className="grid gap-3 md:grid-cols-3">
            <ActivityCard
              icon={Package}
              title="Material requests"
              value={materialRequests.length}
              description="Total active records"
              tone="default"
            />

            <ActivityCard
              icon={Truck}
              title="Deliveries"
              value={inTransit.length + awaitingVerification.length}
              description="In transit or delivered"
              tone="amber"
            />

            <ActivityCard
              icon={CheckCircle2}
              title="Verified"
              value={completed.length}
              description="Completed verification"
              tone="teal"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Section eyebrow                                                            */
/* -------------------------------------------------------------------------- */

function SectionEyebrow({
  label,
  count,
}: {
  label: string
  count: number
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35">
          {label}
        </span>

        <span className="h-1 w-1 rounded-full bg-amber-600/50" />
      </div>

      <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[9px] font-semibold text-amber-700">
        {count}
      </span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Metric card                                                                */
/* -------------------------------------------------------------------------- */

function MetricCard({
  icon: Icon,
  label,
  value,
  description,
  tone = 'default',
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: number
  description: string
  tone?: 'default' | 'amber' | 'teal'
}) {
  const styles = {
    default: {
      icon: 'bg-ink/[0.045] text-ink/45',
      rail: 'bg-ink/15',
    },
    amber: {
      icon: 'bg-[#F7EFE8] text-amber-700',
      rail: 'bg-amber-600/45',
    },
    teal: {
      icon: 'bg-[#EAF4EE] text-teal-700',
      rail: 'bg-teal-700/45',
    },
  }

  const style = styles[tone]

  return (
    <div className="relative min-h-[145px] p-4 sm:p-5">
      <div
        className={`absolute bottom-5 left-0 top-5 w-[2px] rounded-full ${style.rail}`}
      />

      <div className="flex items-start justify-between gap-2">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-[10px] ${style.icon}`}
        >
          <Icon className="h-3.5 w-3.5" />
        </div>

        <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-ink/20">
          Live
        </span>
      </div>

      <div className="mt-5">
        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35">
          {label}
        </p>

        <p className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-ink">
          {String(value).padStart(2, '0')}
        </p>

        <p className="mt-1 text-[9px] leading-4 text-ink/35">
          {description}
        </p>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Attention card                                                             */
/* -------------------------------------------------------------------------- */

function AttentionCard({
  icon: Icon,
  title,
  description,
  count,
  action,
  warning = false,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  count: number
  action: string
  warning?: boolean
}) {
  return (
    <div
      className={`group rounded-[20px] border bg-white p-5 shadow-[0_8px_24px_rgba(20,40,30,0.035)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(20,40,30,0.055)] ${
        warning
          ? 'border-amber-700/[0.09]'
          : 'border-ink/[0.07]'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] ${
            warning
              ? 'bg-[#F7EFE8] text-amber-700'
              : 'bg-[#EAF4EE] text-teal-700'
          }`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-ink/30">
                {warning ? 'Exception' : 'Action required'}
              </p>

              <h3 className="mt-1 text-sm font-semibold tracking-[-0.015em] text-ink">
                {title}
              </h3>
            </div>

            <span
              className={`flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full px-2 text-[10px] font-semibold ${
                warning
                  ? 'bg-[#F7EFE8] text-amber-700'
                  : 'bg-[#EAF4EE] text-teal-700'
              }`}
            >
              {count}
            </span>
          </div>

          <p className="mt-2 text-[11px] leading-5 text-ink/40">
            {description}
          </p>

          <button
            type="button"
            className="group/action mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold text-ink/50 transition-colors hover:text-ink"
          >
            {action}
            <ArrowRight className="h-3 w-3 transition-transform group-hover/action:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Pipeline                                                                   */
/* -------------------------------------------------------------------------- */

function PipelineStage({
  label,
  value,
  tone,
  index,
}: {
  label: string
  value: number
  tone: 'amber' | 'teal'
  index: string
}) {
  const isComplete = tone === 'teal'

  return (
    <div
      className={`relative rounded-[16px] border p-4 transition-all hover:-translate-y-0.5 ${
        isComplete
          ? 'border-teal-700/10 bg-[#EAF4EE]/45'
          : 'border-ink/[0.07] bg-[#FBFCFB]'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[9px] font-medium text-ink/25">
          {index}
        </span>

        <span
          className={`h-1.5 w-1.5 rounded-full ${
            isComplete ? 'bg-teal-600' : 'bg-amber-500'
          }`}
        />
      </div>

      <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/45">
        {label}
      </p>

      <p className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-ink">
        {String(value).padStart(2, '0')}
      </p>

      <p className="mt-1 text-[9px] text-ink/30">
        {value === 1 ? 'material request' : 'material requests'}
      </p>
    </div>
  )
}

function PipelineConnector() {
  return (
    <div className="hidden items-center justify-center md:flex">
      <div className="flex w-full items-center">
        <div className="h-px flex-1 bg-ink/[0.08]" />
        <ChevronRight className="h-3 w-3 shrink-0 text-ink/20" />
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Request attention row                                                     */
/* -------------------------------------------------------------------------- */

function RequestAttentionRow({
  request,
}: {
  request: (typeof materialRequests)[number]
}) {
  const isDisputed = request.status === 'disputed'
  const isDelivered = request.status === 'delivered'

  const statusLabel = isDisputed
    ? 'Disputed'
    : isDelivered
      ? 'Verify'
      : request.status

  return (
    <div className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-ink/[0.015] sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] ${
            isDisputed
              ? 'bg-[#F7EFE8]'
              : isDelivered
                ? 'bg-[#EAF4EE]'
                : 'bg-ink/[0.04]'
          }`}
        >
          <Package
            className={`h-3.5 w-3.5 ${
              isDisputed
                ? 'text-amber-700'
                : isDelivered
                  ? 'text-teal-700'
                  : 'text-ink/40'
            }`}
          />

          <span
            className={`absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-white ${
              isDisputed
                ? 'bg-amber-500'
                : isDelivered
                  ? 'bg-teal-600'
                  : 'bg-ink/30'
            }`}
          />
        </div>

        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-ink">
            {request.item}
          </p>

          <p className="mt-1 truncate text-[10px] text-ink/35">
            Qty: {request.quantity}
            {request.supplierName && ` · ${request.supplierName}`}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <Badge
          tone={isDisputed || isDelivered ? 'amber' : 'teal'}
        >
          {statusLabel}
        </Badge>

        <button
          type="button"
          aria-label={`Open ${request.item}`}
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink/25 transition-all hover:bg-ink/[0.05] hover:text-ink focus:outline-none focus:ring-4 focus:ring-ink/[0.04]"
        >
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Empty attention state                                                     */
/* -------------------------------------------------------------------------- */

function EmptyAttentionState() {
  return (
    <div className="px-6 py-12 text-center">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#EAF4EE]">
        <CheckCircle2 className="h-5 w-5 text-teal-700" />
      </div>

      <p className="mt-4 text-sm font-semibold text-ink">
        Procurement is up to date
      </p>

      <p className="mx-auto mt-1.5 max-w-sm text-xs leading-5 text-ink/40">
        There are no material requests requiring immediate action.
      </p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Activity cards                                                             */
/* -------------------------------------------------------------------------- */

function ActivityCard({
  icon: Icon,
  title,
  value,
  description,
  tone = 'default',
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  value: number
  description: string
  tone?: 'default' | 'amber' | 'teal'
}) {
  const styles = {
    default: {
      icon: 'bg-ink/[0.045] text-ink/40',
      value: 'text-ink',
    },
    amber: {
      icon: 'bg-[#F7EFE8] text-amber-700',
      value: 'text-ink',
    },
    teal: {
      icon: 'bg-[#EAF4EE] text-teal-700',
      value: 'text-teal-700',
    },
  }

  const style = styles[tone]

  return (
    <div className="rounded-[17px] border border-ink/[0.06] bg-[#FBFCFB] p-4 transition-all hover:border-ink/[0.1] hover:bg-white">
      <div className="flex items-center gap-2.5">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-[10px] ${style.icon}`}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>

        <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-ink/35">
          {title}
        </p>
      </div>

      <p
        className={`mt-4 text-xl font-semibold tracking-[-0.03em] ${style.value}`}
      >
        {String(value).padStart(2, '0')}
      </p>

      <p className="mt-1 text-[10px] text-ink/35">
        {description}
      </p>
    </div>
  )
}