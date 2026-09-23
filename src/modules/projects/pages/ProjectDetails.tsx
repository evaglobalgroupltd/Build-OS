import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileText,
  FolderOpen,
  Landmark,
  Package,
  PlayCircle,
  ShieldAlert,
  Wallet,
} from 'lucide-react'

import type { ElementType, ReactNode } from 'react'

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
    <div className="space-y-7 pb-8">
      {/* ================================================================ */}
      {/* PROJECT HEADER                                                    */}
      {/* ================================================================ */}

      <section className="relative overflow-hidden rounded-[26px] border border-ink/[0.07] bg-white shadow-[0_18px_50px_rgba(20,30,25,0.055)]">
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#12613E]/[0.035] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-[#B85C12]/[0.025] blur-3xl" />

        <div className="relative p-5 sm:p-7">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="
                  mt-0.5
                  flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-2xl
                  border border-ink/[0.08]
                  bg-[#F7F8F6]
                  text-ink/50
                  transition-all duration-200
                  hover:-translate-x-0.5
                  hover:border-ink/[0.15]
                  hover:bg-white
                  hover:text-ink
                "
                aria-label="Back to projects"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <div className="min-w-0">
                <div className="mb-2.5 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-ink/35">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />
                    Project workspace
                  </span>

                  <span className="h-3 w-px bg-ink/10" />

                  <StagePill stage={currentProject.stage} />
                </div>

                <h1 className="max-w-3xl font-display text-[28px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[34px]">
                  {currentProject.name}
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] text-ink/45">
                  <span>{currentProject.location}</span>

                  <span className="hidden h-3 w-px bg-ink/15 sm:block" />

                  <span>Project delivery workspace</span>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                className="
                  rounded-full
                  border border-ink/[0.09]
                  bg-white
                  px-4 py-2.5
                  text-[11px] font-bold
                  text-ink
                  transition-all duration-200
                  hover:border-ink/[0.18]
                  hover:shadow-sm
                "
              >
                Edit Project
              </button>

              <button
                type="button"
                className="
                  flex items-center gap-2
                  rounded-full
                  bg-ink
                  px-4 py-2.5
                  text-[11px] font-bold
                  text-white
                  shadow-[0_8px_20px_rgba(20,25,22,0.12)]
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:shadow-[0_12px_25px_rgba(20,25,22,0.16)]
                "
              >
                Project Actions
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Project summary strip */}
          <div className="mt-7 grid overflow-hidden rounded-[20px] border border-ink/[0.07] bg-[#F7F8F6] sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              icon={PlayCircle}
              label="Project progress"
              value={`${currentProject.progressPercent}%`}
              detail="Overall completion"
              accent="green"
            />

            <SummaryCard
              icon={Wallet}
              label="Project budget"
              value={budgetLabel}
              detail="Current approved budget"
              accent="ink"
            />

            <SummaryCard
              icon={ClipboardCheck}
              label="Pending approvals"
              value={String(currentProject.pendingApprovals)}
              detail="Requires client action"
              tone={currentProject.pendingApprovals > 0 ? 'amber' : 'default'}
              accent="amber"
            />

            <SummaryCard
              icon={Package}
              label="Contractor"
              value={currentProject.contractorName || 'Not assigned'}
              detail="Current project contractor"
              accent="ink"
            />
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* PROGRESS HERO                                                     */}
      {/* ================================================================ */}

      <section className="overflow-hidden rounded-[24px] border border-ink/[0.07] bg-white shadow-[0_12px_35px_rgba(20,30,25,0.04)]">
        <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
              <ClipboardCheck className="h-[17px] w-[17px]" />
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink/35">
                Delivery position
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold tracking-[-0.02em] text-ink">
                Project progress
              </h2>

              <p className="mt-1 max-w-2xl text-[11px] leading-5 text-ink/45">
                Progress is supported by milestone evidence, reports and
                verification.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:min-w-[220px]">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink/[0.07]">
              <div
                className="h-full rounded-full bg-[#12613E] transition-all duration-700"
                style={{ width: `${currentProject.progressPercent}%` }}
              />
            </div>

            <span className="font-mono text-[12px] font-bold text-ink">
              {currentProject.progressPercent}%
            </span>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* TAB NAVIGATION                                                     */}
      {/* ================================================================ */}

      <nav
        aria-label="Project sections"
        className="sticky top-0 z-20 -mx-1 overflow-hidden rounded-[18px] border border-ink/[0.07] bg-white/95 shadow-[0_8px_25px_rgba(20,30,25,0.045)] backdrop-blur-xl"
      >
        <div className="flex overflow-x-auto px-1">
          {tabs.map((tab) => {
            const active = activeTab === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={[
                  'relative whitespace-nowrap px-4 py-3.5 text-[10px] font-bold transition-all duration-200 sm:px-5',
                  active
                    ? 'text-ink'
                    : 'text-ink/38 hover:text-ink/70',
                ].join(' ')}
              >
                {tab.label}

                {active && (
                  <span className="absolute inset-x-4 bottom-0 h-[2px] rounded-full bg-[#12613E] sm:inset-x-5" />
                )}
              </button>
            )
          })}
        </div>
      </nav>

      {/* ================================================================ */}
      {/* TAB CONTENT                                                        */}
      {/* ================================================================ */}

      <div key={activeTab} className="animate-[fadeIn_.2s_ease-out]">
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
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(310px,0.75fr)]">
      <div className="space-y-5">
        <SectionCard
          title="Project overview"
          description="Core project information and current delivery position."
          eyebrow="At a glance"
        >
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
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
              label="Approved budget"
              value={
                project.currency === 'NGN'
                  ? `₦${(project.budget / 1_000_000).toFixed(1)}M`
                  : `$${(project.budget / 1_000_000).toFixed(1)}M`
              }
            />

            <DetailItem
              label="Overall progress"
              value={`${project.progressPercent}%`}
            />
          </div>
        </SectionCard>

        <SectionCard
          title="Current milestones"
          description="Milestone progress and verification status."
          eyebrow="Delivery"
          action={
            <InlineAction
              label="View all"
              onClick={() => onNavigate('milestones')}
            />
          }
        >
          <div className="space-y-2.5">
            {demoMilestones.slice(0, 4).map((milestone, index) => (
              <MilestoneRow
                key={milestone.name}
                milestone={milestone}
                index={index}
              />
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Latest monitoring"
          description="Recent reports and site evidence."
          eyebrow="Activity"
          action={
            <InlineAction
              label="View reports"
              onClick={() => onNavigate('monitoring')}
            />
          }
        >
          <div className="space-y-2.5">
            {demoReports.slice(0, 3).map((report) => (
              <ReportRow
                key={`${report.type}-${report.date}`}
                report={report}
              />
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="space-y-5">
        <SectionCard
          title="Pending actions"
          description="Items requiring attention."
          eyebrow="Attention"
        >
          <div className="space-y-2.5">
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
          eyebrow="Financial control"
          action={
            <InlineAction
              label="View escrow"
              onClick={() => onNavigate('payments')}
            />
          }
        >
          <div className="space-y-4">
            <div className="rounded-[18px] bg-[#F5F7F4] p-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/35">
                Available position
              </p>

              <p className="mt-1 font-display text-[25px] font-semibold tracking-[-0.035em] text-ink">
                ₦19.3M
              </p>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ink/[0.07]">
                <div className="h-full w-[27%] rounded-full bg-[#12613E]" />
              </div>
            </div>

            <MoneyRow label="Funded" value="₦72.0M" />
            <MoneyRow label="Reserved" value="₦18.5M" />
            <MoneyRow label="Released" value="₦34.2M" />
            <MoneyRow label="Available" value="₦19.3M" />

            <div className="border-t border-ink/[0.07] pt-4">
              <div className="flex items-start gap-2.5">
                <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink/30" />

                <p className="text-[10px] leading-5 text-ink/42">
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
          eyebrow="Records"
          action={
            <InlineAction
              label="Open records"
              onClick={() => onNavigate('documents')}
            />
          }
        >
          <div className="grid grid-cols-2 gap-2.5">
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
      eyebrow="Delivery plan"
    >
      <div className="space-y-3">
        {demoMilestones.map((milestone, index) => (
          <div
            key={milestone.name}
            className="
              group rounded-[18px]
              border border-ink/[0.07]
              bg-white
              p-4
              transition-all duration-200
              hover:-translate-y-0.5
              hover:border-ink/[0.12]
              hover:shadow-[0_12px_30px_rgba(20,30,25,0.05)]
            "
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <div
                  className={[
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                    milestone.status === 'completed'
                      ? 'bg-[#EAF4EE] text-[#12613E]'
                      : milestone.status === 'in_progress'
                        ? 'bg-[#F8EEE6] text-[#B85C12]'
                        : 'bg-ink/[0.045] text-ink/35',
                  ].join(' ')}
                >
                  {milestone.status === 'completed' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <ClipboardCheck className="h-4 w-4" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/30">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <p className="text-sm font-semibold text-ink">
                      {milestone.name}
                    </p>
                  </div>

                  <p className="mt-1 text-[10px] text-ink/38">
                    Due: {milestone.dueDate}
                  </p>
                </div>
              </div>

              <StatusBadge status={milestone.status} />
            </div>

            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-[10px] text-ink/38">
                <span>Completion</span>
                <span className="font-mono font-semibold">
                  {milestone.progress}%
                </span>
              </div>

              <ProgressBar percent={milestone.progress} tone="teal" />
            </div>

            {milestone.status === 'in_progress' && (
              <div className="mt-4 flex flex-wrap gap-2 border-t border-ink/[0.07] pt-3">
                <button
                  type="button"
                  className="
                    rounded-full
                    bg-ink
                    px-4 py-2
                    text-[10px] font-bold
                    text-white
                    transition
                    hover:opacity-90
                  "
                >
                  Review evidence
                </button>

                <button
                  type="button"
                  className="
                    rounded-full
                    border border-ink/[0.08]
                    bg-white
                    px-4 py-2
                    text-[10px] font-bold
                    text-ink
                    transition
                    hover:border-ink/[0.16]
                  "
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
      eyebrow="Supply chain"
      action={
        <PremiumButton>
          New material request
        </PremiumButton>
      }
    >
      <div className="space-y-3">
        {demoMaterialRequests.map((request, index) => (
          <div
            key={request.item}
            className="
              group rounded-[18px]
              border border-ink/[0.07]
              p-4
              transition-all duration-200
              hover:border-ink/[0.13]
              hover:shadow-[0_10px_25px_rgba(20,30,25,0.045)]
            "
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F5F7F4] text-ink/45">
                  <Package className="h-4 w-4" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/25">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <p className="text-sm font-semibold text-ink">
                      {request.item}
                    </p>
                  </div>

                  <p className="mt-1 text-[10px] text-ink/40">
                    {request.quantity} · {request.supplier}
                  </p>
                </div>
              </div>

              <StatusBadge status={request.status} />
            </div>

            <div className="mt-4 flex flex-wrap gap-2 border-t border-ink/[0.07] pt-3">
              <span className="rounded-full bg-ink/[0.045] px-3 py-1.5 font-mono text-[9px] text-ink/40">
                BOQ reference
              </span>

              <span className="rounded-full bg-ink/[0.045] px-3 py-1.5 font-mono text-[9px] text-ink/40">
                Quote comparison
              </span>

              {request.status === 'delivered' && (
                <span className="rounded-full bg-[#EAF4EE] px-3 py-1.5 text-[9px] font-bold text-[#12613E]">
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
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={FileText}
          label="Weekly reports"
          value="6"
          detail="Submitted"
          accent="ink"
        />

        <SummaryCard
          icon={PlayCircle}
          label="Site evidence"
          value="48"
          detail="Photos & videos"
          accent="green"
        />

        <SummaryCard
          icon={AlertTriangle}
          label="Risk alerts"
          value="2"
          detail="Open"
          tone="amber"
          accent="amber"
        />

        <SummaryCard
          icon={ClipboardCheck}
          label="Milestones"
          value="3 / 6"
          detail="Completed"
          accent="ink"
        />
      </div>

      <SectionCard
        title="Monitoring reports"
        description="Daily, weekly, monthly and site evidence records."
        eyebrow="Site intelligence"
        action={
          <PremiumOutlineButton>
            Upload report
          </PremiumOutlineButton>
        }
      >
        <div className="space-y-2.5">
          {demoReports.map((report) => (
            <ReportRow
              key={`${report.type}-${report.date}`}
              report={report}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Risk alerts"
        description="Issues identified through monitoring and project activity."
        eyebrow="Attention"
      >
        <div className="rounded-[18px] border border-[#B85C12]/15 bg-[#F8EEE6] p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#B85C12]/10 text-[#B85C12]">
              <AlertTriangle className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#7A3F0C]">
                Schedule attention required
              </p>

              <p className="mt-1 text-[11px] leading-5 text-[#7A3F0C]/65">
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
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={Wallet}
          label="Funded"
          value="₦72.0M"
          detail="Escrow deposits"
          accent="green"
        />

        <SummaryCard
          icon={Wallet}
          label="Reserved"
          value="₦18.5M"
          detail="Committed funds"
          accent="amber"
        />

        <SummaryCard
          icon={CheckCircle2}
          label="Released"
          value="₦34.2M"
          detail="Approved payments"
          accent="green"
        />

        <SummaryCard
          icon={ShieldAlert}
          label="Frozen"
          value="₦0"
          detail="Disputed payments"
          accent="ink"
        />
      </div>

      <SectionCard
        title="Payment activity"
        description="Project escrow reservations, approvals and releases."
        eyebrow="Financial activity"
      >
        <div className="space-y-2.5">
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

      <div className="rounded-[18px] border border-ink/[0.07] bg-[#F7F8F6] p-4">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-ink/35" />

          <p className="text-[10px] leading-5 text-ink/48">
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
    <div className="grid gap-5 lg:grid-cols-2">
      <SectionCard
        title="Change requests"
        description="Formal requests affecting scope, budget or timeline."
        eyebrow="Change control"
        action={
          <PremiumButton>
            New change request
          </PremiumButton>
        }
      >
        <div className="space-y-2.5">
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
        eyebrow="Resolution"
        action={
          <PremiumOutlineButton>
            Open dispute
          </PremiumOutlineButton>
        }
      >
        <div className="rounded-[18px] border border-[#12613E]/10 bg-[#EAF4EE]/45 p-6 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#12613E] shadow-sm">
            <CheckCircle2 className="h-5 w-5" />
          </div>

          <p className="mt-3 text-sm font-semibold text-ink">
            No active disputes
          </p>

          <p className="mx-auto mt-1 max-w-xs text-[10px] leading-5 text-ink/42">
            There are currently no payment lines or project issues under
            dispute.
          </p>
        </div>
      </SectionCard>

      <div className="rounded-[18px] border border-[#B85C12]/15 bg-[#F8EEE6] p-4 lg:col-span-2">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#B85C12]/10 text-[#B85C12]">
            <AlertTriangle className="h-4 w-4" />
          </div>

          <div>
            <p className="text-xs font-semibold text-[#7A3F0C]">
              Change control is mandatory
            </p>

            <p className="mt-1 text-[11px] leading-5 text-[#7A3F0C]/65">
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
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-[24px] bg-ink p-6 text-white shadow-[0_18px_45px_rgba(15,20,18,0.12)] sm:p-7">
        <div className="absolute -right-10 -top-16 h-52 w-52 rounded-full border border-white/[0.06]" />
        <div className="absolute -right-2 -top-8 h-36 w-36 rounded-full border border-white/[0.05]" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.08]">
              <Landmark className="h-5 w-5 opacity-75" />
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/40">
                Digital Property Passport
              </p>

              <p className="mt-1.5 font-display text-xl font-semibold tracking-[-0.02em]">
                Project record archive
              </p>

              <p className="mt-1.5 max-w-xl text-[10px] leading-5 text-white/48">
                Land, design, approvals, contracts, procurement, reports,
                payments, warranties and handover records.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="
              flex shrink-0 items-center gap-2
              rounded-full
              bg-white
              px-4 py-2.5
              text-[10px] font-bold
              text-ink
              transition
              hover:bg-white/90
            "
          >
            View Passport
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      <SectionCard
        title="Project documents"
        description="Documents and records associated with this project."
        eyebrow="Document centre"
        action={
          <PremiumButton>
            Upload document
          </PremiumButton>
        }
      >
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {demoDocuments.map((document) => (
            <div
              key={document}
              className="
                group flex items-center gap-3
                rounded-[16px]
                border border-ink/[0.07]
                p-3.5
                transition-all duration-200
                hover:-translate-y-0.5
                hover:border-ink/[0.13]
                hover:shadow-[0_10px_25px_rgba(20,30,25,0.045)]
              "
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F5F7F4] text-ink/40 transition group-hover:bg-[#EAF4EE] group-hover:text-[#12613E]">
                <FolderOpen className="h-4 w-4" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold text-ink">
                  {document}
                </p>

                <p className="mt-0.5 text-[9px] text-ink/32">
                  Project record
                </p>
              </div>

              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-ink/20 transition group-hover:translate-x-0.5 group-hover:text-ink/45" />
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
  eyebrow,
  action,
  children,
}: {
  title: string
  description?: string
  eyebrow?: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="overflow-hidden rounded-[22px] border border-ink/[0.07] bg-white shadow-[0_10px_30px_rgba(20,30,25,0.035)]">
      <div className="flex flex-col gap-3 border-b border-ink/[0.07] px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          {eyebrow && (
            <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-ink/30">
              {eyebrow}
            </p>
          )}

          <h2 className="font-display text-[16px] font-semibold tracking-[-0.015em] text-ink">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-[10px] leading-5 text-ink/40">
              {description}
            </p>
          )}
        </div>

        {action}
      </div>

      <div className="p-5 sm:p-6">{children}</div>
    </section>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  detail,
  tone = 'default',
  accent = 'ink',
}: {
  icon: ElementType
  label: string
  value: string
  detail: string
  tone?: 'default' | 'amber'
  accent?: 'green' | 'amber' | 'ink'
}) {
  const accentClasses = {
    green: 'bg-[#EAF4EE] text-[#12613E]',
    amber: 'bg-[#F8EEE6] text-[#B85C12]',
    ink: 'bg-white text-ink/45',
  }

  return (
    <div className="group relative border-b border-ink/[0.07] bg-[#F7F8F6] p-4 last:border-b-0 sm:border-r sm:last:border-r-0 sm:nth-[n+3]:border-b-0 xl:border-b-0">
      <div className="flex items-start justify-between gap-3">
        <span className="text-[9px] font-bold uppercase tracking-[0.13em] text-ink/35">
          {label}
        </span>

        <div
          className={[
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl',
            accentClasses[accent],
          ].join(' ')}
        >
          <Icon className="h-3.5 w-3.5" />
        </div>
      </div>

      <p
        className={[
          'mt-4 truncate font-display text-[21px] font-semibold tracking-[-0.03em]',
          tone === 'amber' ? 'text-[#B85C12]' : 'text-ink',
        ].join(' ')}
      >
        {value}
      </p>

      <p className="mt-1 truncate text-[9px] text-ink/35">{detail}</p>
    </div>
  )
}

function DetailItem({
  label,
  value,
}: {
  label: string
  value: ReactNode
}) {
  return (
    <div className="border-b border-ink/[0.06] pb-4 last:border-0 sm:border-b-0 sm:pb-0">
      <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-ink/28">
        {label}
      </p>

      <div className="mt-1.5 text-[12px] font-semibold text-ink">
        {value}
      </div>
    </div>
  )
}

function MilestoneRow({
  milestone,
  index,
}: {
  milestone: (typeof demoMilestones)[number]
  index: number
}) {
  return (
    <div className="group flex items-center gap-3 rounded-[16px] border border-ink/[0.06] p-3.5 transition-all duration-200 hover:border-ink/[0.11] hover:bg-[#FCFCFB]">
      <div
        className={[
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl',
          milestone.status === 'completed'
            ? 'bg-[#EAF4EE] text-[#12613E]'
            : milestone.status === 'in_progress'
              ? 'bg-[#F8EEE6] text-[#B85C12]'
              : 'bg-ink/[0.045] text-ink/35',
        ].join(' ')}
      >
        {milestone.status === 'completed' ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <span className="font-mono text-[9px] font-bold">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-[11px] font-semibold text-ink">
            {milestone.name}
          </p>

          <span className="font-mono text-[9px] font-semibold text-ink/35">
            {milestone.progress}%
          </span>
        </div>

        <div className="mt-2">
          <ProgressBar percent={milestone.progress} tone="teal" />
        </div>
      </div>
    </div>
  )
}

function ReportRow({
  report,
}: {
  report: (typeof demoReports)[number]
}) {
  return (
    <div className="group flex items-start gap-3 rounded-[16px] border border-ink/[0.06] p-3.5 transition-all duration-200 hover:border-ink/[0.11] hover:bg-[#FCFCFB]">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F5F7F4] text-ink/40">
        <FileText className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[11px] font-semibold text-ink">
            {report.type}
          </p>

          <span className="text-[9px] text-ink/30">{report.date}</span>
        </div>

        <p className="mt-1 text-[10px] leading-5 text-ink/45">
          {report.summary}
        </p>

        <p className="mt-1 text-[9px] text-ink/28">
          Submitted by {report.submittedBy}
        </p>
      </div>

      <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-ink/20 transition group-hover:translate-x-0.5" />
    </div>
  )
}

function ActionRow({
  icon: Icon,
  title,
  description,
  onClick,
}: {
  icon: ElementType
  title: string
  description: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group flex w-full items-start gap-3
        rounded-[16px]
        border border-ink/[0.06]
        p-3.5
        text-left
        transition-all duration-200
        hover:-translate-y-0.5
        hover:border-ink/[0.12]
        hover:bg-[#FCFCFB]
        hover:shadow-[0_8px_20px_rgba(20,30,25,0.035)]
      "
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#F8EEE6] text-[#B85C12]">
        <Icon className="h-3.5 w-3.5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold text-ink">{title}</p>

        <p className="mt-1 text-[10px] leading-5 text-ink/40">
          {description}
        </p>
      </div>

      <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-ink/20 transition group-hover:translate-x-0.5 group-hover:text-ink/45" />
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
      <span className="text-[10px] text-ink/45">{label}</span>

      <span className="font-mono text-[10px] font-semibold text-ink">
        {value}
      </span>
    </div>
  )
}

function RecordTile({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType
  label: string
  value: string
}) {
  return (
    <div className="group rounded-[15px] border border-ink/[0.06] p-3 transition hover:border-ink/[0.12] hover:bg-[#FCFCFB]">
      <Icon className="h-3.5 w-3.5 text-ink/35 transition group-hover:text-[#12613E]" />

      <p className="mt-2.5 text-[9px] text-ink/35">{label}</p>

      <p className="mt-0.5 text-[11px] font-semibold text-ink">{value}</p>
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
    <div className="group flex flex-col gap-3 rounded-[16px] border border-ink/[0.06] p-4 transition-all duration-200 hover:border-ink/[0.12] hover:bg-[#FCFCFB] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#F5F7F4] text-ink/40">
          <Wallet className="h-3.5 w-3.5" />
        </div>

        <div>
          <p className="text-[11px] font-semibold text-ink">
            {description}
          </p>

          <p className="mt-1 font-mono text-[10px] text-ink/40">
            {amount}
          </p>
        </div>
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
    <div className="group rounded-[16px] border border-ink/[0.06] p-4 transition hover:border-ink/[0.12] hover:bg-[#FCFCFB]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold text-ink">{title}</p>

          <p className="mt-1 text-[10px] text-ink/40">{detail}</p>
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

function InlineAction({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1 text-[10px] font-bold text-ink/55 transition hover:text-ink"
    >
      {label}
      <ChevronRight className="h-3 w-3" />
    </button>
  )
}

function PremiumButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="
        rounded-full
        bg-ink
        px-4 py-2.5
        text-[10px] font-bold
        text-white
        shadow-[0_7px_18px_rgba(20,25,22,0.10)]
        transition-all duration-200
        hover:-translate-y-0.5
        hover:shadow-[0_10px_22px_rgba(20,25,22,0.14)]
      "
    >
      {children}
    </button>
  )
}

function PremiumOutlineButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="
        rounded-full
        border border-ink/[0.09]
        bg-white
        px-4 py-2.5
        text-[10px] font-bold
        text-ink
        transition-all duration-200
        hover:border-ink/[0.17]
        hover:shadow-sm
      "
    >
      {children}
    </button>
  )
}

function ProjectDetailsLoading() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-ink/[0.07] bg-white p-10 text-center shadow-[0_12px_35px_rgba(20,30,25,0.04)]">
      <ConstructionIcon />

      <p className="mt-4 font-display text-base font-semibold text-ink">
        Project not loaded
      </p>

      <p className="mx-auto mt-1 max-w-sm text-[11px] leading-5 text-ink/40">
        Connect this view to the Projects service and provide the project ID.
      </p>
    </div>
  )
}

function ConstructionIcon() {
  return (
    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F7F4] text-ink/35">
      <FolderOpen className="h-5 w-5" />
    </div>
  )
}