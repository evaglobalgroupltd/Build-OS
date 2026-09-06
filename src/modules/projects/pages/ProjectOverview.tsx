import {
  AlertTriangle,
  ArrowRight,
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
import { Badge } from '@/components/ui/Badge'
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
      <Card>
        <CardBody className="py-12 text-center">
          <ClipboardCheck className="mx-auto h-6 w-6 text-ink/20" />

          <p className="mt-3 text-sm font-semibold text-ink">
            Project not loaded
          </p>

          <p className="mt-1 text-xs text-ink/40">
            Connect the overview to the selected project.
          </p>
        </CardBody>
      </Card>
    )
  }

  const currency = project.currency === 'NGN' ? '₦' : '$'
  const budget = `${currency}${(project.budget / 1_000_000).toFixed(1)}M`

  return (
    <div className="space-y-6">
      {/* Project identity */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                <ClipboardCheck className="h-5 w-5 text-ink/45" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-xl font-semibold text-ink">
                    {project.name}
                  </h1>

                  <StagePill stage={project.stage} />
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink/40">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {project.location}
                  </span>

                  {project.contractorName && (
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" />
                      {project.contractorName}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-line px-3 py-2 text-[11px] font-semibold text-ink hover:bg-ink/[0.03]"
            >
              View project details
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </CardBody>
      </Card>

      {/* Key metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={ClipboardCheck}
          label="Overall progress"
          value={`${project.progressPercent}%`}
          detail="Current completion"
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
        />

        <MetricCard
          icon={AlertTriangle}
          label="Pending approvals"
          value={String(project.pendingApprovals)}
          detail="Requires your attention"
          tone={project.pendingApprovals > 0 ? 'amber' : 'default'}
        />
      </div>

      {/* Progress + project information */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,1fr)]">
        <Card>
          <CardHeader
            title="Construction progress"
            subtitle="Current progress against project milestones"
          />

          <CardBody className="space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-ink/50">
                  Overall completion
                </span>

                <span className="font-mono text-xs font-semibold text-ink">
                  {project.progressPercent}%
                </span>
              </div>

              <ProgressBar
                percent={project.progressPercent}
                tone="teal"
              />
            </div>

            <div className="space-y-2">
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

            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-ink"
            >
              View milestone details
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Project information"
            subtitle="Key details for this project"
          />

          <CardBody>
            <div className="space-y-4">
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
              />

              <InfoRow
                label="Progress"
                value={`${project.progressPercent}%`}
              />

              <InfoRow
                label="Pending approvals"
                value={String(project.pendingApprovals)}
              />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Action panels */}
      <div className="grid gap-6 lg:grid-cols-3">
        <ActionCard
          icon={ClipboardCheck}
          title="Milestones"
          description="Review construction progress, milestone evidence and approvals."
          action="Open milestones"
        />

        <ActionCard
          icon={Package}
          title="Procurement"
          description="Track material requests, supplier activity and deliveries."
          action="Open procurement"
        />

        <ActionCard
          icon={FileText}
          title="Documents"
          description="Access project records, evidence, approvals and reports."
          action="Open documents"
        />
      </div>

      {/* Attention */}
      {project.pendingApprovals > 0 && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />

            <div className="flex-1">
              <p className="text-xs font-semibold text-amber-900">
                Action required
              </p>

              <p className="mt-1 text-xs leading-5 text-amber-900/60">
                This project has {project.pendingApprovals} pending approval
                {project.pendingApprovals === 1 ? '' : 's'}. Review the
                associated evidence before approving.
              </p>
            </div>

            <button
              type="button"
              className="shrink-0 rounded-lg border border-amber-700/20 px-3 py-2 text-[10px] font-semibold text-amber-800"
            >
              Review
            </button>
          </div>
        </div>
      )}

      {/* Project record */}
      <Card>
        <CardHeader
          title="Project record"
          subtitle="Connected records available for this project"
        />

        <CardBody>
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

/* -------------------------------------------------------------------------- */
/* Components                                                                  */
/* -------------------------------------------------------------------------- */

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
  tone?: 'default' | 'amber'
}) {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
          {label}
        </span>

        <Icon className="h-4 w-4 text-ink/30" />
      </div>

      <p
        className={[
          'mt-3 font-display text-xl font-semibold',
          tone === 'amber' ? 'text-amber-700' : 'text-ink',
        ].join(' ')}
      >
        {value}
      </p>

      <p className="mt-1 text-[10px] text-ink/35">{detail}</p>
    </div>
  )
}

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

  return (
    <div className="rounded-lg border border-line p-3">
      <div className="flex items-center gap-3">
        <div
          className={[
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
            completed ? 'bg-teal/10' : 'bg-ink/5',
          ].join(' ')}
        >
          {completed ? (
            <CheckCircle2 className="h-3.5 w-3.5 text-teal" />
          ) : (
            <ClipboardCheck className="h-3.5 w-3.5 text-ink/35" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="truncate text-xs font-semibold text-ink">
              {name}
            </p>

            <span className="font-mono text-[10px] text-ink/35">
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

      <div className="mt-2 pl-10">
        <span className="text-[10px] text-ink/30">
          {due}
        </span>
      </div>
    </div>
  )
}

function InfoRow({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
      <span className="text-xs text-ink/40">{label}</span>

      <div className="text-right text-xs font-medium text-ink">
        {value}
      </div>
    </div>
  )
}

function ActionCard({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ElementType
  title: string
  description: string
  action: string
}) {
  return (
    <Card>
      <CardBody>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink/5">
          <Icon className="h-4 w-4 text-ink/45" />
        </div>

        <h3 className="mt-4 font-display text-sm font-semibold text-ink">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-ink/40">
          {description}
        </p>

        <button
          type="button"
          className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-ink"
        >
          {action}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </CardBody>
    </Card>
  )
}

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
    <div className="flex items-center gap-3 rounded-lg border border-line p-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink/5">
        <Icon className="h-3.5 w-3.5 text-ink/40" />
      </div>

      <div>
        <p className="text-[10px] text-ink/35">{label}</p>
        <p className="mt-0.5 text-xs font-semibold text-ink">{value}</p>
      </div>
    </div>
  )
}