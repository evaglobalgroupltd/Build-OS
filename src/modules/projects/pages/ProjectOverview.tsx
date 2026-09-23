import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  MapPin,
  Package,
  Users,
  Wallet,
} from 'lucide-react'

import type { Project } from '@/modules/projects/types'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { StagePill } from '@/modules/projects/components/StagePill'

type ProjectOverviewProps = {
  project?: Project
}

const milestones = [
  {
    name: 'Site clearing',
    progress: 100,
    status: 'completed',
    due: 'Completed',
  },
  {
    name: 'Foundation',
    progress: 100,
    status: 'completed',
    due: 'Completed',
  },
  {
    name: 'Block work',
    progress: 65,
    status: 'in_progress',
    due: '18 Sep 2026',
  },
  {
    name: 'Roofing',
    progress: 0,
    status: 'pending',
    due: '20 Oct 2026',
  },
]

export function ProjectOverview({
  project,
}: ProjectOverviewProps) {
  if (!project) {
    return (
      <Card className="overflow-hidden">
        <CardBody className="flex min-h-[320px] flex-col items-center justify-center py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink/[0.05] text-ink/30">
            <ClipboardCheck size={19} />
          </div>

          <p className="mt-4 font-display text-base font-semibold text-ink">
            Project not loaded
          </p>

          <p className="mt-1 max-w-sm text-[11px] leading-5 text-ink/40">
            Connect the overview to the selected project to continue.
          </p>
        </CardBody>
      </Card>
    )
  }

  const currency = project.currency === 'NGN' ? '₦' : '$'
  const budget = `${currency}${(project.budget / 1_000_000).toFixed(1)}M`

  return (
    <div className="space-y-7">

      {/* ===================================================== */}
      {/* Project identity / hero */}
      {/* ===================================================== */}

      <section
        aria-label="Project identity"
        className="
          relative
          overflow-hidden
          rounded-[24px]
          bg-[#18271F]
          shadow-[0_18px_50px_rgba(20,40,30,0.10)]
        "
      >
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/[0.04] blur-3xl" />

        <div className="relative p-6 sm:p-7 lg:p-8">

          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">

            <div className="min-w-0">

              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/[0.10] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white/70">
                  Project workspace
                </span>

                <span className="h-1 w-1 rounded-full bg-white/25" />

                <span className="text-[10px] font-medium text-white/45">
                  {project.id}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">

                <h1 className="max-w-3xl font-display text-[28px] font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[34px]">
                  {project.name}
                </h1>

                <StagePill stage={project.stage} />

              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-white/50">

                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={13} />
                  {project.location}
                </span>

                {project.contractorName && (
                  <>
                    <span className="hidden h-3 w-px bg-white/15 sm:block" />

                    <span className="inline-flex items-center gap-1.5">
                      <Users size={13} />
                      {project.contractorName}
                    </span>
                  </>
                )}

              </div>

            </div>

            <button
              type="button"
              className="
                group
                flex
                w-fit
                shrink-0
                items-center
                gap-2
                rounded-full
                bg-white
                px-5
                py-2.5
                text-[11px]
                font-bold
                text-ink
                transition
                duration-300
                hover:-translate-y-0.5
                hover:bg-white/90
              "
            >
              View project details
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>

          </div>

          {/* Hero progress */}
          <div className="mt-8 border-t border-white/[0.08] pt-5">

            <div className="mb-2.5 flex items-center justify-between">

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/35">
                  Project completion
                </p>
              </div>

              <span className="font-display text-sm font-semibold text-white">
                {project.progressPercent}%
              </span>

            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.10]">
              <div
                className="h-full rounded-full bg-[#B8D9C4] transition-all duration-700"
                style={{
                  width: `${Math.min(
                    Math.max(project.progressPercent, 0),
                    100,
                  )}%`,
                }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* Key metrics */}
      {/* ===================================================== */}

      <section
        aria-label="Project metrics"
        className="grid grid-cols-2 gap-3 lg:grid-cols-4"
      >
        <MetricCard
          icon={ClipboardCheck}
          label="Overall progress"
          value={`${project.progressPercent}%`}
          detail="Current completion"
          tone="green"
        />

        <MetricCard
          icon={Wallet}
          label="Approved budget"
          value={budget}
          detail="Current project budget"
        />

        <MetricCard
          icon={CalendarDays}
          label="Timeline"
          value="On track"
          detail="Current schedule position"
          tone="green"
        />

        <MetricCard
          icon={AlertTriangle}
          label="Pending approvals"
          value={String(project.pendingApprovals)}
          detail={
            project.pendingApprovals > 0
              ? 'Requires your attention'
              : 'Nothing waiting'
          }
          tone={project.pendingApprovals > 0 ? 'amber' : 'green'}
        />
      </section>

      {/* ===================================================== */}
      {/* Progress + information */}
      {/* ===================================================== */}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.75fr)]">

        {/* Construction progress */}

        <Card className="overflow-hidden">

          <CardHeader
            title="Construction progress"
            subtitle="Current progress against the project's milestone plan"
          />

          <CardBody className="p-5 sm:p-6">

            <div className="rounded-[18px] bg-[#F7F8F6] p-4 sm:p-5">

              <div className="mb-3 flex items-end justify-between gap-4">

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.10em] text-ink/35">
                    Overall completion
                  </p>

                  <p className="mt-1 font-display text-[27px] font-semibold tracking-[-0.035em] text-ink">
                    {project.progressPercent}%
                  </p>
                </div>

                <span className="text-[10px] font-medium text-ink/35">
                  Project delivery
                </span>

              </div>

              <ProgressBar
                percent={project.progressPercent}
                tone="teal"
              />

            </div>

            {/* Milestones */}

            <div className="mt-6">

              <div className="mb-3 flex items-center justify-between">

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink/35">
                    Milestone plan
                  </p>

                  <p className="mt-1 text-[11px] text-ink/45">
                    Track each delivery stage and its current position.
                  </p>
                </div>

                <span className="hidden rounded-full bg-[#F4F6F3] px-3 py-1.5 text-[9px] font-bold text-ink/45 sm:block">
                  {milestones.filter((item) => item.status === 'completed').length}
                  /{milestones.length} completed
                </span>

              </div>

              <div className="space-y-2.5">

                {milestones.map((milestone) => (
                  <MilestoneSummary
                    key={milestone.name}
                    name={milestone.name}
                    progress={milestone.progress}
                    status={milestone.status}
                    due={milestone.due}
                  />
                ))}

              </div>

            </div>

            <button
              type="button"
              className="
                group
                mt-5
                flex
                items-center
                gap-1.5
                text-[11px]
                font-bold
                text-ink/60
                transition
                hover:text-[#B85C12]
              "
            >
              View milestone details
              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>

          </CardBody>
        </Card>

        {/* Project information */}

        <Card className="overflow-hidden">

          <CardHeader
            title="Project information"
            subtitle="Key details for this project"
          />

          <CardBody className="p-5 sm:p-6">

            <div className="space-y-0">

              <InfoRow
                label="Project stage"
                value={<StagePill stage={project.stage} />}
              />

              <InfoRow
                label="Location"
                value={project.location}
              />

              <InfoRow
                label="Contractor"
                value={project.contractorName || 'Not assigned'}
              />

              <InfoRow
                label="Budget"
                value={budget}
                emphasized
              />

              <InfoRow
                label="Progress"
                value={`${project.progressPercent}%`}
              />

              <InfoRow
                label="Pending approvals"
                value={String(project.pendingApprovals)}
                danger={project.pendingApprovals > 0}
              />

            </div>

            <div className="mt-5 rounded-2xl border border-ink/[0.06] bg-[#FAFBFA] p-4">

              <div className="flex items-start gap-3">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
                  <CheckCircle2 size={14} />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-ink">
                    Project records connected
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-ink/40">
                    Milestones, procurement, documents and financial records
                    are available from this workspace.
                  </p>
                </div>

              </div>

            </div>

          </CardBody>
        </Card>

      </div>

      {/* ===================================================== */}
      {/* Action centre */}
      {/* ===================================================== */}

      <section aria-label="Project action centre">

        <div className="mb-4">

          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
            Workspace
          </p>

          <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em] text-ink">
            Project action centre
          </h2>

          <p className="mt-1 text-[11px] text-ink/45">
            Access the operational areas connected to this project.
          </p>

        </div>

        <div className="grid gap-4 lg:grid-cols-3">

          <ActionCard
            icon={ClipboardCheck}
            title="Milestones"
            description="Review construction progress, submitted evidence and milestone approvals."
            action="Open milestones"
            tone="green"
          />

          <ActionCard
            icon={Package}
            title="Procurement"
            description="Track material requests, supplier activity, orders and deliveries."
            action="Open procurement"
          />

          <ActionCard
            icon={FileText}
            title="Documents"
            description="Access project records, evidence, approvals and reporting documents."
            action="Open documents"
          />

        </div>
      </section>

      {/* ===================================================== */}
      {/* Attention */}
      {/* ===================================================== */}

      {project.pendingApprovals > 0 && (
        <section
          aria-label="Pending project actions"
          className="
            overflow-hidden
            rounded-[20px]
            border
            border-[#B85C12]/15
            bg-[#FBF6F1]
          "
        >

          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#B85C12]/10 text-[#B85C12]">
                <AlertTriangle size={16} />
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#8F4307]">
                  Action required
                </p>

                <p className="mt-1 text-[12px] font-semibold text-ink">
                  {project.pendingApprovals} approval
                  {project.pendingApprovals === 1 ? '' : 's'} awaiting your review
                </p>

                <p className="mt-1 max-w-xl text-[10.5px] leading-5 text-ink/45">
                  Review the associated evidence before approving the submitted
                  project milestone.
                </p>
              </div>

            </div>

            <button
              type="button"
              className="
                flex
                w-fit
                shrink-0
                items-center
                gap-2
                rounded-full
                bg-ink
                px-4
                py-2.5
                text-[10px]
                font-bold
                text-white
                transition
                hover:opacity-90
              "
            >
              Review now
              <ArrowUpRight size={13} />
            </button>

          </div>
        </section>
      )}

      {/* ===================================================== */}
      {/* Project record */}
      {/* ===================================================== */}

      <Card className="overflow-hidden">

        <CardHeader
          title="Project record"
          subtitle="Connected records available for this project"
        />

        <CardBody className="p-5 sm:p-6">

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <RecordItem
              icon={ClipboardCheck}
              label="Milestones"
              value="6"
            />

            <RecordItem
              icon={Package}
              label="Material requests"
              value="3"
            />

            <RecordItem
              icon={FileText}
              label="Documents"
              value="8"
            />

            <RecordItem
              icon={Wallet}
              label="Payment records"
              value="4"
            />

          </div>

        </CardBody>
      </Card>

    </div>
  )
}

/* ============================================================= */
/* Metric Card                                                     */
/* ============================================================= */

function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  tone = 'default',
}: {
  icon: React.ElementType
  label: string
  value: string
  detail: string
  tone?: 'default' | 'green' | 'amber'
}) {
  const iconStyles = {
    default: 'bg-ink/[0.05] text-ink/40',
    green: 'bg-[#EAF4EE] text-[#12613E]',
    amber: 'bg-[#F8EEE6] text-[#B85C12]',
  }

  const valueStyles = {
    default: 'text-ink',
    green: 'text-[#12613E]',
    amber: 'text-[#B85C12]',
  }

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[18px]
        border
        border-ink/[0.07]
        bg-white
        p-4
        transition
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_14px_35px_rgba(20,40,30,0.06)]
        sm:p-5
      "
    >

      <div className="flex items-start justify-between gap-3">

        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/35 sm:text-[10px]">
            {label}
          </p>

          <p
            className={[
              'mt-2 font-display text-[24px] font-semibold tracking-[-0.035em] sm:text-[27px]',
              valueStyles[tone],
            ].join(' ')}
          >
            {value}
          </p>
        </div>

        <div
          className={[
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105',
            iconStyles[tone],
          ].join(' ')}
        >
          <Icon size={16} />
        </div>

      </div>

      <p className="mt-2 text-[10px] leading-4 text-ink/40">
        {detail}
      </p>

    </div>
  )
}

/* ============================================================= */
/* Milestone                                                       */
/* ============================================================= */

function MilestoneSummary({
  name,
  progress,
  status,
  due,
}: {
  name: string
  progress: number
  status: string
  due: string
}) {
  const completed = status === 'completed'
  const active = status === 'in_progress'

  return (
    <div
      className={[
        'rounded-[16px] border p-3.5 transition duration-200',
        active
          ? 'border-[#B85C12]/15 bg-[#FBF8F4]'
          : 'border-ink/[0.06] bg-white hover:border-ink/[0.10]',
      ].join(' ')}
    >

      <div className="flex items-center gap-3">

        <div
          className={[
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl',
            completed
              ? 'bg-[#EAF4EE] text-[#12613E]'
              : active
                ? 'bg-[#F8EEE6] text-[#B85C12]'
                : 'bg-ink/[0.05] text-ink/30',
          ].join(' ')}
        >
          {completed ? (
            <CheckCircle2 size={14} />
          ) : (
            <ClipboardCheck size={14} />
          )}
        </div>

        <div className="min-w-0 flex-1">

          <div className="flex items-center justify-between gap-3">

            <p className="truncate text-[11px] font-semibold text-ink">
              {name}
            </p>

            <span
              className={[
                'font-mono text-[9px] font-semibold',
                completed
                  ? 'text-[#12613E]'
                  : active
                    ? 'text-[#B85C12]'
                    : 'text-ink/30',
              ].join(' ')}
            >
              {progress}%
            </span>

          </div>

          <div className="mt-2">
            <ProgressBar
              percent={progress}
              tone="teal"
            />
          </div>

        </div>

      </div>

      <div className="mt-2 pl-11">
        <span
          className={[
            'text-[9px]',
            completed
              ? 'font-semibold text-[#12613E]/60'
              : active
                ? 'font-semibold text-[#B85C12]/70'
                : 'text-ink/30',
          ].join(' ')}
        >
          {due}
        </span>
      </div>

    </div>
  )
}

/* ============================================================= */
/* Information row                                                 */
/* ============================================================= */

function InfoRow({
  label,
  value,
  emphasized = false,
  danger = false,
}: {
  label: string
  value: React.ReactNode
  emphasized?: boolean
  danger?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-ink/[0.06] py-3.5 last:border-0">

      <span className="shrink-0 text-[10px] text-ink/40">
        {label}
      </span>

      <div
        className={[
          'min-w-0 text-right text-[11px] font-medium',
          danger
            ? 'text-[#B85C12]'
            : emphasized
              ? 'font-semibold text-ink'
              : 'text-ink/70',
        ].join(' ')}
      >
        {value}
      </div>

    </div>
  )
}

/* ============================================================= */
/* Action Card                                                     */
/* ============================================================= */

function ActionCard({
  icon: Icon,
  title,
  description,
  action,
  tone = 'default',
}: {
  icon: React.ElementType
  title: string
  description: string
  action: string
  tone?: 'default' | 'green'
}) {
  return (
    <Card className="group overflow-hidden transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(20,40,30,0.06)]">

      <CardBody className="p-5">

        <div
          className={[
            'flex h-10 w-10 items-center justify-center rounded-xl',
            tone === 'green'
              ? 'bg-[#EAF4EE] text-[#12613E]'
              : 'bg-ink/[0.05] text-ink/40',
          ].join(' ')}
        >
          <Icon size={16} />
        </div>

        <h3 className="mt-4 font-display text-base font-semibold tracking-[-0.015em] text-ink">
          {title}
        </h3>

        <p className="mt-1.5 min-h-[40px] text-[10.5px] leading-5 text-ink/40">
          {description}
        </p>

        <button
          type="button"
          className="
            mt-5
            flex
            items-center
            gap-1.5
            text-[10px]
            font-bold
            text-ink/55
            transition
            group-hover:text-[#B85C12]
          "
        >
          {action}

          <ArrowRight
            size={13}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </button>

      </CardBody>
    </Card>
  )
}

/* ============================================================= */
/* Record Item                                                     */
/* ============================================================= */

function RecordItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div
      className="
        group
        flex
        items-center
        gap-3
        rounded-[16px]
        border
        border-ink/[0.07]
        bg-[#FCFDFC]
        p-3.5
        transition
        duration-200
        hover:border-ink/[0.12]
        hover:bg-white
      "
    >

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-ink/40 shadow-[0_3px_12px_rgba(20,40,30,0.04)]">
        <Icon size={14} />
      </div>

      <div className="min-w-0">

        <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-ink/30">
          {label}
        </p>

        <p className="mt-0.5 font-display text-sm font-semibold text-ink">
          {value}
        </p>

      </div>

      <ArrowRight
        size={13}
        className="ml-auto text-ink/20 transition group-hover:translate-x-0.5 group-hover:text-ink/40"
      />

    </div>
  )
}