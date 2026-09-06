import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Construction,
  CreditCard,
  FileCheck2,
  FileText,
  Image,
  MessageSquare,
  ShieldCheck,
  User,
  XCircle,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'

type ApprovalStatus =
  | 'Pending Review'
  | 'Approved'
  | 'Correction Required'
  | 'Rejected'

interface WorkflowStepProps {
  number: number
  title: string
  description: string
  status: 'completed' | 'current' | 'pending' | 'rejected'
}

function WorkflowStep({
  number,
  title,
  description,
  status,
}: WorkflowStepProps) {
  const isCompleted = status === 'completed'
  const isCurrent = status === 'current'
  const isRejected = status === 'rejected'

  return (
    <div className="relative flex gap-4">
      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white">
        {isCompleted ? (
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        ) : isRejected ? (
          <XCircle className="h-4 w-4 text-red-500" />
        ) : (
          <span
            className={
              isCurrent
                ? 'text-xs font-bold text-ink'
                : 'text-xs font-medium text-ink/35'
            }
          >
            {number}
          </span>
        )}
      </div>

      <div className="pb-7">
        <div className="flex flex-wrap items-center gap-2">
          <p
            className={
              isCurrent
                ? 'text-sm font-semibold text-ink'
                : 'text-sm font-medium text-ink/75'
            }
          >
            {title}
          </p>

          {isCurrent && (
            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
              Current
            </span>
          )}
        </div>

        <p className="mt-1 text-xs leading-5 text-ink/40">
          {description}
        </p>
      </div>
    </div>
  )
}

interface EvidenceItemProps {
  name: string
  type: string
  uploadedBy: string
  date: string
  verified: boolean
}

function EvidenceItem({
  name,
  type,
  uploadedBy,
  date,
  verified,
}: EvidenceItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-paper-2 p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5">
        {type === 'Photo' ? (
          <Image className="h-4 w-4 text-ink/55" />
        ) : (
          <FileText className="h-4 w-4 text-ink/55" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink">
          {name}
        </p>

        <p className="mt-0.5 text-xs text-ink/40">
          {type} · Uploaded by {uploadedBy} · {date}
        </p>
      </div>

      {verified ? (
        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
      ) : (
        <Clock3 className="h-4 w-4 shrink-0 text-amber-600" />
      )}
    </div>
  )
}

export function ApprovalDetails() {
  const approvalStatus: ApprovalStatus = 'Pending Review'

  const evidence = [
    {
      name: 'Foundation completion photos',
      type: 'Photo',
      uploadedBy: 'Contractor',
      date: '27 Aug 2026',
      verified: true,
    },
    {
      name: 'Reinforcement inspection report',
      type: 'Report',
      uploadedBy: 'Project Manager',
      date: '27 Aug 2026',
      verified: true,
    },
    {
      name: 'Concrete pour evidence',
      type: 'Photo',
      uploadedBy: 'Contractor',
      date: '26 Aug 2026',
      verified: true,
    },
    {
      name: 'Work measurement record',
      type: 'Document',
      uploadedBy: 'Contractor',
      date: '27 Aug 2026',
      verified: false,
    },
  ]

  const workflow: WorkflowStepProps[] = [
    {
      number: 1,
      title: 'Contractor completion submission',
      description: 'Contractor submitted the milestone for verification.',
      status: 'completed',
    },
    {
      number: 2,
      title: 'Evidence upload',
      description: 'Required project evidence has been submitted.',
      status: 'completed',
    },
    {
      number: 3,
      title: 'Project manager inspection',
      description: 'PM inspection and technical verification completed.',
      status: 'completed',
    },
    {
      number: 4,
      title: 'Client review',
      description: 'Awaiting client review and approval decision.',
      status: 'current',
    },
    {
      number: 5,
      title: 'Payment decision',
      description: 'Payment will be released only after approval.',
      status: 'pending',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <button
            type="button"
            className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-ink/45 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to approvals
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <Construction className="h-5 w-5 text-ink/70" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Approval Control
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Foundation & Groundworks
            </h1>

            <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
              {approvalStatus}
            </span>
          </div>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Review milestone evidence, inspection results and payment
            authorization before making the approval decision.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-line bg-white px-3 py-2 text-xs font-medium text-ink/55">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          Evidence-controlled approval
        </div>
      </div>

      {/* Project summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
            Project
          </p>
          <p className="mt-2 text-sm font-semibold text-ink">
            Gwarinpa Residential Development
          </p>
          <p className="mt-1 text-xs text-ink/40">
            Project #PRJ-2026-0148
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
            Milestone
          </p>
          <p className="mt-2 font-display text-2xl font-semibold text-ink">
            03 / 11
          </p>
          <p className="mt-1 text-xs text-ink/40">
            Foundation & groundworks
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
            Amount requested
          </p>
          <p className="mt-2 font-display text-2xl font-semibold text-ink">
            ₦8.4M
          </p>
          <p className="mt-1 text-xs text-ink/40">
            Reserved in project escrow
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
            Milestone progress
          </p>
          <p className="mt-2 font-display text-2xl font-semibold text-ink">
            100%
          </p>
          <p className="mt-1 text-xs text-emerald-600">
            PM inspection passed
          </p>
        </Card>
      </div>

      {/* Main approval content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left */}
        <div className="space-y-6 lg:col-span-2">
          {/* Completion summary */}
          <Card className="p-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Completion submission
                </p>

                <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                  Foundation works completed
                </h2>
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
                PM verified
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-paper-2 p-4">
                <p className="text-xs text-ink/40">Planned completion</p>
                <p className="mt-1 text-sm font-semibold text-ink">
                  24 Aug 2026
                </p>
              </div>

              <div className="rounded-xl bg-paper-2 p-4">
                <p className="text-xs text-ink/40">Actual completion</p>
                <p className="mt-1 text-sm font-semibold text-ink">
                  26 Aug 2026
                </p>
              </div>

              <div className="rounded-xl bg-paper-2 p-4">
                <p className="text-xs text-ink/40">Contractor</p>
                <p className="mt-1 text-sm font-semibold text-ink">
                  PrimeBuild Construction Ltd
                </p>
              </div>

              <div className="rounded-xl bg-paper-2 p-4">
                <p className="text-xs text-ink/40">Project manager</p>
                <p className="mt-1 text-sm font-semibold text-ink">
                  Ibrahim Musa
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-line p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Contractor submission
              </p>

              <p className="mt-2 text-sm leading-6 text-ink/65">
                Foundation excavation, reinforcement placement and concrete
                works have been completed in accordance with the approved
                construction drawings. The contractor has submitted the
                required evidence for verification and payment approval.
              </p>
            </div>
          </Card>

          {/* Evidence */}
          <Card className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Evidence package
                </p>

                <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                  Submitted evidence
                </h2>
              </div>

              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                3 / 4 verified
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {evidence.map((item) => (
                <EvidenceItem key={item.name} {...item} />
              ))}
            </div>
          </Card>

          {/* PM inspection */}
          <Card className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Project manager verification
                </p>

                <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                  Inspection result
                </h2>
              </div>

              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>

            <div className="mt-6 rounded-xl bg-emerald-500/5 p-4">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-ink">
                    Inspection passed
                  </p>

                  <p className="mt-1 text-xs leading-5 text-ink/45">
                    Foundation works were inspected against the approved
                    scope and construction requirements.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-line p-4">
                <p className="text-xs text-ink/40">Inspection date</p>
                <p className="mt-1 text-sm font-semibold text-ink">
                  27 Aug 2026
                </p>
              </div>

              <div className="rounded-xl border border-line p-4">
                <p className="text-xs text-ink/40">Inspector</p>
                <p className="mt-1 text-sm font-semibold text-ink">
                  Ibrahim Musa
                </p>
              </div>

              <div className="rounded-xl border border-line p-4">
                <p className="text-xs text-ink/40">Inspection status</p>
                <p className="mt-1 text-sm font-semibold text-emerald-600">
                  Passed
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-line p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Inspection notes
              </p>

              <p className="mt-2 text-sm leading-6 text-ink/60">
                Reinforcement placement, excavation dimensions and concrete
                works were verified. No critical defects were identified
                during inspection.
              </p>
            </div>
          </Card>

          {/* Client review */}
          <Card className="p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Client decision
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Review and approve milestone
              </h2>
            </div>

            <div className="mt-5 flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />

              <p className="text-xs leading-5 text-ink/55">
                Approval authorizes the release of the milestone payment.
                Review the evidence and inspection report carefully before
                proceeding.
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                <CheckCircle2 className="h-4 w-4" />
                Approve & release payment
              </button>

              <button
                type="button"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-3 text-xs font-semibold text-ink/65 transition-colors hover:bg-paper-2"
              >
                <MessageSquare className="h-4 w-4" />
                Request correction
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/20 px-4 py-3 text-xs font-semibold text-red-600 transition-colors hover:bg-red-500/5"
              >
                <XCircle className="h-4 w-4" />
                Reject
              </button>
            </div>
          </Card>
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* Workflow */}
          <Card className="p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Approval workflow
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Verification status
              </h2>
            </div>

            <div className="relative mt-7">
              <div className="absolute left-[17px] top-4 h-[calc(100%-32px)] w-px bg-line" />

              <div className="relative">
                {workflow.map((step) => (
                  <WorkflowStep key={step.number} {...step} />
                ))}
              </div>
            </div>
          </Card>

          {/* Payment */}
          <Card className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Payment control
                </p>

                <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                  Escrow release
                </h2>
              </div>

              <CreditCard className="h-5 w-5 text-ink/45" />
            </div>

            <div className="mt-6">
              <p className="text-xs text-ink/40">Payment amount</p>

              <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
                ₦8.4M
              </p>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-ink/40">Wallet status</span>
                <span className="font-semibold text-emerald-600">
                  Funded
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-ink/40">Reserved amount</span>
                <span className="font-semibold text-ink">
                  ₦8.4M
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-ink/40">Release status</span>
                <span className="font-semibold text-amber-700">
                  Pending approval
                </span>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-paper-2 p-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <p className="text-xs font-semibold text-ink">
                  Escrow protected
                </p>
              </div>

              <p className="mt-1.5 text-xs leading-5 text-ink/40">
                Funds remain reserved until the milestone passes the
                required approval workflow.
              </p>
            </div>
          </Card>

          {/* Participants */}
          <Card className="p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Participants
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Decision stakeholders
              </h2>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5">
                  <Construction className="h-4 w-4 text-ink/55" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink">
                    PrimeBuild Construction Ltd
                  </p>
                  <p className="text-xs text-ink/40">Contractor</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5">
                  <User className="h-4 w-4 text-ink/55" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink">
                    Ibrahim Musa
                  </p>
                  <p className="text-xs text-ink/40">
                    Project Manager
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5">
                  <ShieldCheck className="h-4 w-4 text-ink/55" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink">
                    Project Client
                  </p>
                  <p className="text-xs text-ink/40">
                    Final approval authority
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Audit */}
          <Card className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Audit trail
                </p>

                <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                  Recent activity
                </h2>
              </div>

              <FileCheck2 className="h-5 w-5 text-ink/45" />
            </div>

            <div className="mt-6 space-y-5">
              <div className="flex gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />

                <div>
                  <p className="text-xs font-medium text-ink">
                    PM inspection completed
                  </p>
                  <p className="mt-1 text-[11px] text-ink/40">
                    27 Aug 2026 · 10:42 AM
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-ink/20" />

                <div>
                  <p className="text-xs font-medium text-ink">
                    Work measurement uploaded
                  </p>
                  <p className="mt-1 text-[11px] text-ink/40">
                    27 Aug 2026 · 9:16 AM
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-ink/20" />

                <div>
                  <p className="text-xs font-medium text-ink">
                    Milestone submitted
                  </p>
                  <p className="mt-1 text-[11px] text-ink/40">
                    26 Aug 2026 · 4:28 PM
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-between rounded-xl border border-line px-4 py-3 text-xs font-medium text-ink/55 transition-colors hover:bg-paper-2"
            >
              View complete audit log
              <ChevronRight className="h-4 w-4" />
            </button>
          </Card>
        </div>
      </div>

      {/* Approval rule */}
      <Card className="border-amber-500/20 bg-amber-500/[0.03] p-5">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

          <div>
            <p className="text-sm font-semibold text-ink">
              Payment approval rule
            </p>

            <p className="mt-1 text-xs leading-5 text-ink/50">
              A milestone must not be approved for payment until the
              required evidence has been submitted, reviewed and verified.
              Rejected or incomplete milestones remain payment-frozen until
              the required corrections are completed.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}