import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  FolderOpen,
  Landmark,
  Package,
  PlayCircle,
  ShieldAlert,
  Wallet,
} from 'lucide-react'
import type { Project } from '@/modules/projects/types'
import { StagePill } from './StagePill'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'

type ProjectDetailsProps = {
  project?: Project
}

type DetailTab =
  | 'overview'
  | 'milestones'
  | 'procurement'
  | 'monitoring'
  | 'payments'
  | 'issues'
  | 'documents'

const tabs: { id: DetailTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'procurement', label: 'Procurement' },
  { id: 'monitoring', label: 'Monitoring' },
  { id: 'payments', label: 'Payments & Escrow' },
  { id: 'issues', label: 'Issues & Changes' },
  { id: 'documents', label: 'Documents & Passport' },
]

const demoMilestones = [
  {
    name: 'Site clearing',
    status: 'completed',
    progress: 100,
    dueDate: 'Completed',
  },
  {
    name: 'Excavation',
    status: 'completed',
    progress: 100,
    dueDate: 'Completed',
  },
  {
    name: 'Foundation',
    status: 'completed',
    progress: 100,
    dueDate: 'Completed',
  },
  {
    name: 'Block work',
    status: 'in_progress',
    progress: 65,
    dueDate: '18 Sep 2026',
  },
  {
    name: 'Columns and beams',
    status: 'pending',
    progress: 0,
    dueDate: '30 Sep 2026',
  },
  {
    name: 'Roofing',
    status: 'pending',
    progress: 0,
    dueDate: '20 Oct 2026',
  },
]

const demoMaterialRequests = [
  {
    item: 'Cement',
    quantity: '250 bags',
    supplier: 'Verified supplier',
    status: 'delivered',
  },
  {
    item: '9-inch blocks',
    quantity: '2,000 units',
    supplier: 'Verified supplier',
    status: 'in transit',
  },
  {
    item: 'Reinforcement bars',
    quantity: '4 tonnes',
    supplier: 'Verified supplier',
    status: 'approved',
  },
]

const demoReports = [
  {
    type: 'Weekly Report',
    date: '28 Aug 2026',
    submittedBy: 'Project Manager',
    summary: 'Timeline progressing with block work at 65%.',
  },
  {
    type: 'Daily Report',
    date: '29 Aug 2026',
    submittedBy: 'Contractor',
    summary: 'Block work continued; materials received on site.',
  },
  {
    type: 'Site Evidence',
    date: '29 Aug 2026',
    submittedBy: 'Project Manager',
    summary: 'Latest progress photographs uploaded.',
  },
]

const demoDocuments = [
  'Survey plan',
  'Title documents',
  'Approved drawings',
  'Contract',
  'BOQ',
  'Inspection reports',
  'Procurement records',
  'Payment records',
]

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const [activeTab, setActiveTab] = useState<DetailTab>('overview')

  /*
   * This fallback is intentionally only for the screen while the project
   * service is being connected.
   *
   * Replace with the project returned by:
   * projectsService.getProject(projectId)
   */
  const currentProject = project

  const budgetLabel = useMemo(() => {
    if (!currentProject) return '—'

    const symbol = currentProject.currency === 'NGN' ? '₦' : '$'

    return `${symbol}${(currentProject.budget / 1_000_000).toFixed(1)}M`
  }, [currentProject])

  if (!currentProject) {
    return <ProjectDetailsLoading />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line text-ink/50 hover:bg-ink/[0.03]"
            aria-label="Back to projects"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
                {currentProject.name}
              </h1>

              <StagePill stage={currentProject.stage} />
            </div>

            <p className="mt-1 text-sm text-ink/45">
              {currentProject.location}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink hover:bg-ink/[0.03]"
          >
            Edit Project
          </button>

          <button
            type="button"
            className="rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white"
          >
            Project Actions
          </button>
        </div>
      </div>

      {/* Project summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={PlayCircle}
          label="Project progress"
          value={`${currentProject.progressPercent}%`}
          detail="Overall completion"
        />

        <SummaryCard
          icon={Wallet}
          label="Project budget"
          value={budgetLabel}
          detail="Current approved budget"
        />

        <SummaryCard
          icon={ClipboardCheck}
          label="Pending approvals"
          value={String(currentProject.pendingApprovals)}
          detail="Requires client action"
          tone={currentProject.pendingApprovals > 0 ? 'amber' : 'default'}
        />

        <SummaryCard
          icon={Package}
          label="Contractor"
          value={currentProject.contractorName || 'Not assigned'}
          detail="Current project contractor"
        />
      </div>

      {/* Progress */}
      <div className="rounded-xl border border-line bg-white p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/35">
              Project progress
            </p>

            <p className="mt-1 text-sm text-ink/55">
              Progress is supported by milestone evidence, reports and
              verification.
            </p>
          </div>

          <span className="font-mono text-sm font-semibold text-ink">
            {currentProject.progressPercent}%
          </span>
        </div>

        <div className="mt-4">
          <ProgressBar
            percent={currentProject.progressPercent}
            tone="teal"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-line">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const active = activeTab === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={[
                  'whitespace-nowrap border-b-2 px-4 py-3 text-xs font-semibold transition-colors',
                  active
                    ? 'border-ink text-ink'
                    : 'border-transparent text-ink/40 hover:text-ink/70',
                ].join(' ')}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === 'overview' && (
        <OverviewTab
          project={currentProject}
          onNavigate={setActiveTab}
        />
      )}

      {activeTab === 'milestones' && <MilestonesTab />}

      {activeTab === 'procurement' && <ProcurementTab />}

      {activeTab === 'monitoring' && <MonitoringTab />}

      {activeTab === 'payments' && <PaymentsTab />}

      {activeTab === 'issues' && <IssuesTab />}

      {activeTab === 'documents' && <DocumentsTab />}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Overview                                                                    */
/* -------------------------------------------------------------------------- */

function OverviewTab({
  project,
  onNavigate,
}: {
  project: Project
  onNavigate: (tab: DetailTab) => void
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,1fr)]">
      <div className="space-y-6">
        <SectionCard
          title="Project overview"
          description="Core project information and current delivery position."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <DetailItem label="Project name" value={project.name} />
            <DetailItem label="Location" value={project.location} />
            <DetailItem
              label="Project stage"
              value={<StagePill stage={project.stage} />}
            />
            <DetailItem
              label="Contractor"
              value={project.contractorName || 'Not assigned'}
            />
            <DetailItem
              label="Budget"
              value={
                project.currency === 'NGN'
                  ? `₦${(project.budget / 1_000_000).toFixed(1)}M`
                  : `$${(project.budget / 1_000_000).toFixed(1)}M`
              }
            />
            <DetailItem
              label="Progress"
              value={`${project.progressPercent}%`}
            />
          </div>
        </SectionCard>

        <SectionCard
          title="Current milestones"
          description="Milestone progress and verification status."
          action={
            <button
              type="button"
              onClick={() => onNavigate('milestones')}
              className="text-xs font-semibold text-ink"
            >
              View all
            </button>
          }
        >
          <div className="space-y-3">
            {demoMilestones.slice(0, 4).map((milestone) => (
              <MilestoneRow key={milestone.name} milestone={milestone} />
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Latest monitoring"
          description="Recent reports and site evidence."
          action={
            <button
              type="button"
              onClick={() => onNavigate('monitoring')}
              className="text-xs font-semibold text-ink"
            >
              View reports
            </button>
          }
        >
          <div className="space-y-3">
            {demoReports.slice(0, 3).map((report) => (
              <ReportRow key={`${report.type}-${report.date}`} report={report} />
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="space-y-6">
        <SectionCard
          title="Pending actions"
          description="Items requiring attention."
        >
          <div className="space-y-3">
            <ActionRow
              icon={ClipboardCheck}
              title="Milestone approval"
              description="Block work evidence is ready for review."
              onClick={() => onNavigate('milestones')}
            />

            <ActionRow
              icon={Package}
              title="Procurement approval"
              description="Reinforcement bars request requires approval."
              onClick={() => onNavigate('procurement')}
            />
          </div>
        </SectionCard>

        <SectionCard
          title="Escrow snapshot"
          description="Current project funding position."
          action={
            <button
              type="button"
              onClick={() => onNavigate('payments')}
              className="text-xs font-semibold text-ink"
            >
              View escrow
            </button>
          }
        >
          <div className="space-y-4">
            <MoneyRow label="Funded" value="₦72.0M" />

            <MoneyRow label="Reserved" value="₦18.5M" />

            <MoneyRow label="Released" value="₦34.2M" />

            <MoneyRow label="Available" value="₦19.3M" />

            <div className="border-t border-line pt-4">
              <div className="flex items-start gap-2">
                <ShieldAlert className="mt-0.5 h-4 w-4 text-ink/35" />

                <p className="text-[11px] leading-5 text-ink/45">
                  Payment release remains subject to evidence, verification,
                  client approval and dispute status.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Project records"
          description="Permanent project documentation."
          action={
            <button
              type="button"
              onClick={() => onNavigate('documents')}
              className="text-xs font-semibold text-ink"
            >
              Open records
            </button>
          }
        >
          <div className="grid grid-cols-2 gap-3">
            <RecordTile icon={FileText} label="Documents" value="8" />
            <RecordTile icon={Package} label="Procurement" value="3" />
            <RecordTile icon={ClipboardCheck} label="Reports" value="12" />
            <RecordTile icon={Landmark} label="Passport" value="Active" />
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Milestones                                                                  */
/* -------------------------------------------------------------------------- */

function MilestonesTab() {
  return (
    <SectionCard
      title="Project milestones"
      description="Milestones, progress, evidence and approval status."
    >
      <div className="space-y-3">
        {demoMilestones.map((milestone) => (
          <div
            key={milestone.name}
            className="rounded-xl border border-line p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div
                  className={[
                    'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                    milestone.status === 'completed'
                      ? 'bg-teal/10'
                      : milestone.status === 'in_progress'
                        ? 'bg-amber-500/10'
                        : 'bg-ink/5',
                  ].join(' ')}
                >
                  {milestone.status === 'completed' ? (
                    <CheckCircle2 className="h-4 w-4 text-teal" />
                  ) : (
                    <ClipboardCheck className="h-4 w-4 text-ink/40" />
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold text-ink">
                    {milestone.name}
                  </p>

                  <p className="mt-1 text-xs text-ink/40">
                    Due: {milestone.dueDate}
                  </p>
                </div>
              </div>

              <StatusBadge status={milestone.status} />
            </div>

            <div className="mt-4">
              <div className="mb-1 flex justify-between text-[11px] text-ink/40">
                <span>Progress</span>
                <span className="font-mono">{milestone.progress}%</span>
              </div>

              <ProgressBar percent={milestone.progress} tone="teal" />
            </div>

            {milestone.status === 'in_progress' && (
              <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-3">
                <button
                  type="button"
                  className="rounded-lg bg-ink px-3 py-2 text-[11px] font-semibold text-white"
                >
                  Review evidence
                </button>

                <button
                  type="button"
                  className="rounded-lg border border-line px-3 py-2 text-[11px] font-semibold text-ink"
                >
                  Request more evidence
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

/* -------------------------------------------------------------------------- */
/* Procurement                                                                 */
/* -------------------------------------------------------------------------- */

function ProcurementTab() {
  return (
    <SectionCard
      title="Procurement & materials"
      description="Material requests, supplier activity and delivery status."
      action={
        <button
          type="button"
          className="rounded-lg bg-ink px-3 py-2 text-[11px] font-semibold text-white"
        >
          New material request
        </button>
      }
    >
      <div className="space-y-3">
        {demoMaterialRequests.map((request) => (
          <div
            key={request.item}
            className="rounded-xl border border-line p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-ink">
                  {request.item}
                </p>

                <p className="mt-1 text-xs text-ink/40">
                  {request.quantity} · {request.supplier}
                </p>
              </div>

              <StatusBadge status={request.status} />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/45">
                BOQ reference
              </span>

              <span className="rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/45">
                Quote comparison
              </span>

              {request.status === 'delivered' && (
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold text-emerald-700">
                  Delivery evidence available
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

/* -------------------------------------------------------------------------- */
/* Monitoring                                                                  */
/* -------------------------------------------------------------------------- */

function MonitoringTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={FileText}
          label="Weekly reports"
          value="6"
          detail="Submitted"
        />

        <SummaryCard
          icon={PlayCircle}
          label="Site evidence"
          value="48"
          detail="Photos & videos"
        />

        <SummaryCard
          icon={AlertTriangle}
          label="Risk alerts"
          value="2"
          detail="Open"
          tone="amber"
        />

        <SummaryCard
          icon={ClipboardCheck}
          label="Milestones"
          value="3 / 6"
          detail="Completed"
        />
      </div>

      <SectionCard
        title="Monitoring reports"
        description="Daily, weekly, monthly and site evidence records."
        action={
          <button
            type="button"
            className="rounded-lg border border-line px-3 py-2 text-[11px] font-semibold text-ink"
          >
            Upload report
          </button>
        }
      >
        <div className="space-y-3">
          {demoReports.map((report) => (
            <ReportRow key={`${report.type}-${report.date}`} report={report} />
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Risk alerts"
        description="Issues identified through monitoring and project activity."
      >
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-700" />

            <div>
              <p className="text-xs font-semibold text-amber-900">
                Schedule attention required
              </p>

              <p className="mt-1 text-xs leading-5 text-amber-900/60">
                Current block work progress should be reviewed against the
                planned timeline.
              </p>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Payments                                                                    */
/* -------------------------------------------------------------------------- */

function PaymentsTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={Wallet}
          label="Funded"
          value="₦72.0M"
          detail="Escrow deposits"
        />

        <SummaryCard
          icon={Wallet}
          label="Reserved"
          value="₦18.5M"
          detail="Committed funds"
        />

        <SummaryCard
          icon={CheckCircle2}
          label="Released"
          value="₦34.2M"
          detail="Approved payments"
        />

        <SummaryCard
          icon={ShieldAlert}
          label="Frozen"
          value="₦0"
          detail="Disputed payments"
        />
      </div>

      <SectionCard
        title="Payment activity"
        description="Project escrow reservations, approvals and releases."
      >
        <div className="space-y-3">
          <PaymentRow
            description="Foundation milestone"
            amount="₦18.0M"
            status="Released"
          />

          <PaymentRow
            description="Cement procurement"
            amount="₦4.8M"
            status="Released"
          />

          <PaymentRow
            description="Block work milestone"
            amount="₦12.5M"
            status="Pending approval"
          />

          <PaymentRow
            description="Reinforcement bars"
            amount="₦6.2M"
            status="Reserved"
          />
        </div>
      </SectionCard>

      <div className="rounded-xl border border-line bg-paper-2 p-4">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-ink/40" />

          <p className="text-xs leading-5 text-ink/50">
            Payment release requires evidence, PM verification, client
            approval and no active dispute. Disputed payment lines must be
            frozen and financial actions must maintain an audit trail.
          </p>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Issues & Changes                                                            */
/* -------------------------------------------------------------------------- */

function IssuesTab() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionCard
        title="Change requests"
        description="Formal requests affecting scope, budget or timeline."
        action={
          <button
            type="button"
            className="rounded-lg bg-ink px-3 py-2 text-[11px] font-semibold text-white"
          >
            New change request
          </button>
        }
      >
        <div className="space-y-3">
          <IssueRow
            title="Kitchen specification update"
            detail="Affects finishing specification"
            status="Under review"
          />

          <IssueRow
            title="Additional external works"
            detail="Affects project scope and cost"
            status="Approved"
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Disputes"
        description="Open disputes, affected payments and resolution status."
        action={
          <button
            type="button"
            className="rounded-lg border border-line px-3 py-2 text-[11px] font-semibold text-ink"
          >
            Open dispute
          </button>
        }
      >
        <div className="rounded-xl border border-line p-5 text-center">
          <CheckCircle2 className="mx-auto h-5 w-5 text-emerald-600" />

          <p className="mt-3 text-sm font-semibold text-ink">
            No active disputes
          </p>

          <p className="mt-1 text-xs leading-5 text-ink/40">
            There are currently no payment lines or project issues under
            dispute.
          </p>
        </div>
      </SectionCard>

      <div className="lg:col-span-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-700" />

          <div>
            <p className="text-xs font-semibold text-amber-900">
              Change control is mandatory
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-900/60">
              No change should affect project cost, timeline or payment unless
              it has been approved by the client and recorded in the system.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Documents & Passport                                                        */
/* -------------------------------------------------------------------------- */

function DocumentsTab() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-line bg-ink p-5 text-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Landmark className="mt-0.5 h-5 w-5 shrink-0 opacity-70" />

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide opacity-50">
                Digital Property Passport
              </p>

              <p className="mt-1 font-display text-lg font-semibold">
                Project record archive
              </p>

              <p className="mt-1 max-w-xl text-xs leading-5 opacity-55">
                Land, design, approvals, contracts, procurement, reports,
                payments, warranties and handover records.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="rounded-lg bg-white px-3 py-2 text-[11px] font-semibold text-ink"
          >
            View Passport
          </button>
        </div>
      </div>

      <SectionCard
        title="Project documents"
        description="Documents and records associated with this project."
        action={
          <button
            type="button"
            className="rounded-lg bg-ink px-3 py-2 text-[11px] font-semibold text-white"
          >
            Upload document
          </button>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {demoDocuments.map((document) => (
            <div
              key={document}
              className="flex items-center gap-3 rounded-xl border border-line p-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5">
                <FolderOpen className="h-4 w-4 text-ink/40" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-ink">
                  {document}
                </p>

                <p className="mt-0.5 text-[10px] text-ink/35">
                  Project record
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Shared components                                                           */
/* -------------------------------------------------------------------------- */

function SectionCard({
  title,
  description,
  action,
  children,
}: {
  title: string
  description?: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="rounded-xl border border-line bg-white">
      <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
        <div>
          <h2 className="font-display text-sm font-semibold text-ink">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-xs leading-5 text-ink/40">
              {description}
            </p>
          )}
        </div>

        {action}
      </div>

      <div className="p-5">{children}</div>
    </section>
  )
}

function SummaryCard({
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

function DetailItem({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/30">
        {label}
      </p>

      <div className="mt-1 text-sm font-medium text-ink">{value}</div>
    </div>
  )
}

function MilestoneRow({
  milestone,
}: {
  milestone: (typeof demoMilestones)[number]
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line p-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink/5">
        {milestone.status === 'completed' ? (
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        ) : (
          <ClipboardCheck className="h-4 w-4 text-ink/40" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-ink">{milestone.name}</p>

        <div className="mt-1">
          <ProgressBar percent={milestone.progress} tone="teal" />
        </div>
      </div>

      <span className="font-mono text-[10px] text-ink/40">
        {milestone.progress}%
      </span>
    </div>
  )
}

function ReportRow({
  report,
}: {
  report: (typeof demoReports)[number]
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-line p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5">
        <FileText className="h-4 w-4 text-ink/40" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold text-ink">{report.type}</p>

          <span className="text-[10px] text-ink/35">{report.date}</span>
        </div>

        <p className="mt-1 text-xs leading-5 text-ink/45">
          {report.summary}
        </p>

        <p className="mt-1 text-[10px] text-ink/30">
          Submitted by {report.submittedBy}
        </p>
      </div>
    </div>
  )
}

function ActionRow({
  icon: Icon,
  title,
  description,
  onClick,
}: {
  icon: React.ElementType
  title: string
  description: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-start gap-3 rounded-xl border border-line p-3 text-left hover:bg-ink/[0.02]"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
        <Icon className="h-4 w-4 text-amber-700" />
      </div>

      <div>
        <p className="text-xs font-semibold text-ink">{title}</p>

        <p className="mt-1 text-[11px] leading-5 text-ink/40">
          {description}
        </p>
      </div>
    </button>
  )
}

function MoneyRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-ink/45">{label}</span>

      <span className="font-mono text-xs font-semibold text-ink">{value}</span>
    </div>
  )
}

function RecordTile({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-line p-3">
      <Icon className="h-4 w-4 text-ink/35" />

      <p className="mt-3 text-[10px] text-ink/35">{label}</p>

      <p className="mt-0.5 text-xs font-semibold text-ink">{value}</p>
    </div>
  )
}

function PaymentRow({
  description,
  amount,
  status,
}: {
  description: string
  amount: string
  status: string
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold text-ink">{description}</p>

        <p className="mt-1 font-mono text-xs text-ink/40">{amount}</p>
      </div>

      <StatusBadge status={status} />
    </div>
  )
}

function IssueRow({
  title,
  detail,
  status,
}: {
  title: string
  detail: string
  status: string
}) {
  return (
    <div className="rounded-xl border border-line p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-ink">{title}</p>

          <p className="mt-1 text-[11px] text-ink/40">{detail}</p>
        </div>

        <StatusBadge status={status} />
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase()

  if (
    normalized.includes('completed') ||
    normalized.includes('released') ||
    normalized.includes('approved') ||
    normalized.includes('delivered')
  ) {
    return <Badge tone="teal">{status}</Badge>
  }

  if (
    normalized.includes('pending') ||
    normalized.includes('review') ||
    normalized.includes('transit') ||
    normalized.includes('reserved')
  ) {
    return <Badge tone="amber">{status}</Badge>
  }

  if (
    normalized.includes('dispute') ||
    normalized.includes('rejected') ||
    normalized.includes('frozen')
  ) {
    return <Badge tone="brick">{status}</Badge>
  }

  return <Badge tone="neutral">{status}</Badge>
}

function ProjectDetailsLoading() {
  return (
    <div className="rounded-xl border border-line bg-white p-8 text-center">
      <ConstructionIcon />

      <p className="mt-4 text-sm font-semibold text-ink">
        Project not loaded
      </p>

      <p className="mt-1 text-xs leading-5 text-ink/40">
        Connect this view to the Projects service and provide the project ID.
      </p>
    </div>
  )
}

function ConstructionIcon() {
  return (
    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-ink/5">
      <FolderOpen className="h-5 w-5 text-ink/40" />
    </div>
  )
}