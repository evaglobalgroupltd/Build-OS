
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Construction,
  CreditCard,
  FileCheck2,
  FileText,
  Image,
  LockKeyhole,
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
      {/* Connector */}
      <div className="absolute left-[18px] top-10 h-[calc(100%-22px)] w-px bg-ink/[0.08]" />

      {/* Node */}
      <div
        className={[
          'relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all',
          isCompleted
            ? 'border-[#12613E]/20 bg-[#EAF4EE] text-[#12613E]'
            : isCurrent
              ? 'border-[#B85C12] bg-[#B85C12] text-white shadow-[0_0_0_5px_rgba(184,92,18,0.08)]'
              : isRejected
                ? 'border-red-500/20 bg-red-500/5 text-red-600'
                : 'border-ink/[0.08] bg-paper-2 text-ink/30',
        ].join(' ')}
      >
        {isCompleted ? (
          <Check size={14} strokeWidth={2.5} />
        ) : isRejected ? (
          <XCircle size={15} />
        ) : isCurrent ? (
          <span className="h-2 w-2 rounded-full bg-white" />
        ) : (
          <span className="text-[10px] font-bold">{number}</span>
        )}
      </div>

      <div className="min-w-0 flex-1 pb-8 last:pb-0">
        <div className="flex flex-wrap items-center gap-2">
          <p
            className={[
              'text-[12px] leading-5',
              isCurrent
                ? 'font-bold text-ink'
                : isCompleted
                  ? 'font-semibold text-ink/75'
                  : 'font-medium text-ink/40',
            ].join(' ')}
          >
            {title}
          </p>

          {isCurrent && (
            <span className="rounded-full bg-[#F7EFE8] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#B85C12]">
              Current
            </span>
          )}
        </div>

        <p className="mt-1 max-w-[260px] text-[10px] leading-5 text-ink/40">
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
    <div
      className={[
        'group flex items-center gap-3 rounded-2xl border p-3.5 transition-all',
        verified
          ? 'border-ink/[0.07] bg-paper-2 hover:border-[#12613E]/15 hover:bg-[#F8FBF9]'
          : 'border-[#B85C12]/15 bg-[#FFF9F4] hover:border-[#B85C12]/25',
      ].join(' ')}
    >
      <div
        className={[
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
          verified
            ? 'bg-white text-ink/45'
            : 'bg-[#F7E6D8] text-[#B85C12]',
        ].join(' ')}
      >
        {type === 'Photo' ? (
          <Image className="h-4 w-4" />
        ) : (
          <FileText className="h-4 w-4" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-[11px] font-semibold text-ink">
            {name}
          </p>

          {!verified && (
            <span className="hidden shrink-0 rounded-full bg-[#F7EFE8] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#B85C12] sm:inline-flex">
              Review
            </span>
          )}
        </div>

        <p className="mt-1 truncate text-[9px] text-ink/40">
          {type} · {uploadedBy} · {date}
        </p>
      </div>

      <div
        className={[
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
          verified
            ? 'bg-[#EAF4EE] text-[#12613E]'
            : 'bg-[#F7E6D8] text-[#B85C12]',
        ].join(' ')}
      >
        {verified ? (
          <Check size={12} strokeWidth={2.5} />
        ) : (
          <Clock3 size={12} />
        )}
      </div>
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
    <div className="space-y-7">
      {/* ===================================================== */}
      {/* Premium Header */}
      {/* ===================================================== */}

      <header>
        <button
          type="button"
          className="group mb-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-ink/35 transition-colors hover:text-ink"
        >
          <ArrowLeft
            className="transition-transform group-hover:-translate-x-0.5"
            size={13}
          />
          Back to approvals
        </button>

        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />

              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink/35">
                Approval control · milestone 03 / 11
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-[28px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[34px]">
                Foundation & Groundworks
              </h1>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B85C12]/15 bg-[#F7EFE8] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.08em] text-[#B85C12]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />
                {approvalStatus}
              </span>
            </div>

            <p className="mt-2 max-w-2xl text-[12px] leading-5 text-ink/45">
              Review the verified construction evidence, inspection outcome,
              and payment authorization before making the final milestone
              decision.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-ink/[0.08] bg-white px-3.5 py-2.5">
              <ShieldCheck size={14} className="text-[#12613E]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-ink/55">
                Evidence controlled
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ===================================================== */}
      {/* Project Identity Strip */}
      {/* ===================================================== */}

      <section
        aria-label="Project summary"
        className="overflow-hidden rounded-[24px] bg-ink"
      >
        <div className="grid lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="relative overflow-hidden p-6 sm:p-7">
            <div className="absolute -right-10 -top-16 h-44 w-44 rounded-full border border-white/[0.05]" />
            <div className="absolute -right-2 -top-8 h-28 w-28 rounded-full border border-white/[0.05]" />

            <div className="relative">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/35">
                Active project
              </p>

              <h2 className="mt-2 max-w-md font-display text-[20px] font-semibold tracking-[-0.025em] text-white">
                Gwarinpa Residential Development
              </h2>

              <p className="mt-1.5 text-[10px] text-white/40">
                Project #PRJ-2026-0148
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/[0.08] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-white/55">
                  Residential
                </span>

                <span className="rounded-full bg-white/[0.08] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-white/55">
                  Active build
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.07] p-6 lg:border-l lg:border-t-0">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/30">
              Milestone
            </p>

            <p className="mt-3 font-display text-[25px] font-semibold tracking-[-0.025em] text-white">
              03 / 11
            </p>

            <p className="mt-1 text-[10px] text-white/35">
              Foundation & groundworks
            </p>
          </div>

          <div className="border-t border-white/[0.07] p-6 lg:border-l lg:border-t-0">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/30">
              Amount requested
            </p>

            <p className="mt-3 font-display text-[25px] font-semibold tracking-[-0.025em] text-white">
              ₦8.4M
            </p>

            <p className="mt-1 flex items-center gap-1.5 text-[10px] text-white/35">
              <LockKeyhole size={10} />
              Reserved in escrow
            </p>
          </div>

          <div className="border-t border-white/[0.07] p-6 lg:border-l lg:border-t-0">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/30">
              Milestone progress
            </p>

            <div className="mt-3 flex items-end gap-2">
              <p className="font-display text-[25px] font-semibold tracking-[-0.025em] text-white">
                100%
              </p>

              <CheckCircle2
                size={16}
                className="mb-1 text-[#76B997]"
              />
            </div>

            <p className="mt-1 text-[10px] text-[#76B997]">
              PM inspection passed
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* Main Layout */}
      {/* ===================================================== */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.7fr)]">
        {/* =================================================== */}
        {/* Main Column */}
        {/* =================================================== */}

        <div className="space-y-6">
          {/* Completion summary */}
          <Card className="overflow-hidden">
            <div className="border-b border-ink/[0.07] px-6 py-5">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />

                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink/35">
                      Completion submission
                    </p>
                  </div>

                  <h2 className="mt-1.5 font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">
                    Foundation works completed
                  </h2>
                </div>

                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#EAF4EE] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.08em] text-[#12613E]">
                  <CheckCircle2 size={12} />
                  PM verified
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/[0.07] bg-ink/[0.07] sm:grid-cols-2">
                {[
                  ['Planned completion', '24 Aug 2026'],
                  ['Actual completion', '26 Aug 2026'],
                  ['Contractor', 'PrimeBuild Construction Ltd'],
                  ['Project manager', 'Ibrahim Musa'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="bg-paper-2 p-4"
                  >
                    <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-ink/30">
                      {label}
                    </p>

                    <p className="mt-1.5 text-[11px] font-semibold text-ink">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-ink/[0.07] bg-white p-5">
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-ink/35" />

                  <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/35">
                    Contractor submission
                  </p>
                </div>

                <p className="mt-3 text-[11px] leading-6 text-ink/55">
                  Foundation excavation, reinforcement placement and concrete
                  works have been completed in accordance with the approved
                  construction drawings. The contractor has submitted the
                  required evidence for verification and payment approval.
                </p>
              </div>
            </div>
          </Card>

          {/* Evidence package */}
          <Card className="overflow-hidden">
            <div className="border-b border-ink/[0.07] px-6 py-5">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />

                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink/35">
                      Evidence package
                    </p>
                  </div>

                  <h2 className="mt-1.5 font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">
                    Submitted evidence
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-display text-[17px] font-semibold text-ink">
                    3 / 4
                  </span>

                  <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-ink/30">
                    verified
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
                <div className="h-full w-[75%] rounded-full bg-[#12613E]" />
              </div>

              <div className="space-y-2.5">
                {evidence.map((item) => (
                  <EvidenceItem key={item.name} {...item} />
                ))}
              </div>
            </div>
          </Card>

          {/* PM inspection */}
          <Card className="overflow-hidden">
            <div className="border-b border-ink/[0.07] px-6 py-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />

                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink/35">
                      Technical verification
                    </p>
                  </div>

                  <h2 className="mt-1.5 font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">
                    Project manager inspection
                  </h2>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
                  <ShieldCheck size={18} />
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="relative overflow-hidden rounded-2xl bg-[#F4F8F5] p-5">
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full border border-[#12613E]/[0.06]" />

                <div className="relative flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E1F0E7] text-[#12613E]">
                    <CheckCircle2 size={18} />
                  </div>

                  <div>
                    <p className="text-[12px] font-bold text-ink">
                      Inspection passed
                    </p>

                    <p className="mt-1.5 max-w-xl text-[10px] leading-5 text-ink/45">
                      Foundation works were inspected against the approved
                      scope and construction requirements.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-ink/[0.07] bg-ink/[0.07] sm:grid-cols-3">
                {[
                  ['Inspection date', '27 Aug 2026'],
                  ['Inspector', 'Ibrahim Musa'],
                  ['Status', 'Passed'],
                ].map(([label, value]) => (
                  <div key={label} className="bg-white p-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-ink/30">
                      {label}
                    </p>

                    <p
                      className={[
                        'mt-1.5 text-[11px] font-semibold',
                        label === 'Status'
                          ? 'text-[#12613E]'
                          : 'text-ink',
                      ].join(' ')}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl bg-paper-2 p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/30">
                  Inspection notes
                </p>

                <p className="mt-2 text-[11px] leading-6 text-ink/55">
                  Reinforcement placement, excavation dimensions and concrete
                  works were verified. No critical defects were identified
                  during inspection.
                </p>
              </div>
            </div>
          </Card>

          {/* Client decision */}
          <Card className="overflow-hidden border-[#B85C12]/15">
            <div className="bg-[#FFFAF6] px-6 py-5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />

                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#B85C12]">
                  Final decision
                </p>
              </div>

              <h2 className="mt-1.5 font-display text-[20px] font-semibold tracking-[-0.02em] text-ink">
                Review & approve milestone
              </h2>

              <p className="mt-1.5 max-w-2xl text-[10px] leading-5 text-ink/45">
                Your decision will determine whether the reserved milestone
                funds can proceed to release.
              </p>
            </div>

            <div className="p-6">
              <div className="flex gap-3 rounded-2xl border border-[#B85C12]/15 bg-[#FFF9F4] p-4">
                <AlertTriangle
                  size={15}
                  className="mt-0.5 shrink-0 text-[#B85C12]"
                />

                <p className="text-[10px] leading-5 text-ink/55">
                  Approval authorizes release of the milestone payment.
                  Review the evidence package and inspection result carefully
                  before proceeding.
                </p>
              </div>

              <div className="mt-5 grid gap-2.5 sm:grid-cols-[1.4fr_1fr_0.8fr]">
                <button
                  type="button"
                  className="
                    group
                    inline-flex
                    min-h-12
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-ink
                    px-4
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.07em]
                    text-white
                    shadow-[0_8px_24px_rgba(0,0,0,0.10)]
                    transition-all
                    hover:-translate-y-0.5
                    hover:shadow-[0_12px_28px_rgba(0,0,0,0.14)]
                  "
                >
                  <CheckCircle2 size={15} />

                  Approve & release

                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>

                <button
                  type="button"
                  className="
                    inline-flex
                    min-h-12
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    border
                    border-ink/[0.09]
                    bg-white
                    px-4
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.07em]
                    text-ink/65
                    transition-all
                    hover:border-ink/20
                    hover:bg-paper-2
                  "
                >
                  <MessageSquare size={14} />
                  Correction
                </button>

                <button
                  type="button"
                  className="
                    inline-flex
                    min-h-12
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    border
                    border-red-500/15
                    bg-white
                    px-4
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.07em]
                    text-red-600
                    transition-all
                    hover:border-red-500/25
                    hover:bg-red-500/[0.03]
                  "
                >
                  <XCircle size={14} />
                  Reject
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* =================================================== */}
        {/* Sidebar */}
        {/* =================================================== */}

        <aside className="space-y-6">
          {/* Workflow */}
          <Card className="overflow-hidden">
            <div className="border-b border-ink/[0.07] px-5 py-5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />

                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink/35">
                  Workflow
                </p>
              </div>

              <h2 className="mt-1.5 font-display text-[17px] font-semibold tracking-[-0.02em] text-ink">
                Approval journey
              </h2>
            </div>

            <div className="p-5">
              <div>
                {workflow.map((step) => (
                  <WorkflowStep key={step.number} {...step} />
                ))}
              </div>
            </div>
          </Card>

          {/* Payment */}
          <Card className="overflow-hidden">
            <div className="border-b border-ink/[0.07] px-5 py-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />

                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink/35">
                      Payment control
                    </p>
                  </div>

                  <h2 className="mt-1.5 font-display text-[17px] font-semibold tracking-[-0.02em] text-ink">
                    Escrow release
                  </h2>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/[0.04] text-ink/45">
                  <CreditCard size={16} />
                </div>
              </div>
            </div>

            <div className="p-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-ink/30">
                Reserved amount
              </p>

              <p className="mt-1 font-display text-[31px] font-semibold tracking-[-0.035em] text-ink">
                ₦8.4M
              </p>

              <div className="mt-5 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-ink/40">
                    Wallet status
                  </span>

                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#12613E]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />
                    Funded
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-ink/40">
                    Reserved amount
                  </span>

                  <span className="text-[10px] font-bold text-ink">
                    ₦8.4M
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-ink/40">
                    Release status
                  </span>

                  <span className="text-[10px] font-bold text-[#B85C12]">
                    Pending approval
                  </span>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-[#F4F8F5] p-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E1F0E7] text-[#12613E]">
                    <LockKeyhole size={13} />
                  </div>

                  <p className="text-[10px] font-bold text-ink">
                    Escrow protected
                  </p>
                </div>

                <p className="mt-2 text-[9px] leading-5 text-ink/40">
                  Funds remain reserved until this milestone completes the
                  required approval workflow.
                </p>
              </div>
            </div>
          </Card>

          {/* Participants */}
          <Card className="overflow-hidden">
            <div className="border-b border-ink/[0.07] px-5 py-5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-ink/25" />

                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink/35">
                  Participants
                </p>
              </div>

              <h2 className="mt-1.5 font-display text-[17px] font-semibold tracking-[-0.02em] text-ink">
                Decision stakeholders
              </h2>
            </div>

            <div className="space-y-1 p-4">
              {[
                {
                  icon: Construction,
                  name: 'PrimeBuild Construction Ltd',
                  role: 'Contractor',
                },
                {
                  icon: User,
                  name: 'Ibrahim Musa',
                  role: 'Project Manager',
                },
                {
                  icon: ShieldCheck,
                  name: 'Project Client',
                  role: 'Final approval authority',
                },
              ].map(({ icon: Icon, name, role }) => (
                <div
                  key={name}
                  className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-paper-2"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/[0.045] text-ink/50 transition-colors group-hover:bg-white">
                    <Icon size={14} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-semibold text-ink">
                      {name}
                    </p>

                    <p className="mt-0.5 text-[9px] text-ink/35">
                      {role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Audit */}
          <Card className="overflow-hidden">
            <div className="border-b border-ink/[0.07] px-5 py-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-ink/25" />

                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink/35">
                      Audit trail
                    </p>
                  </div>

                  <h2 className="mt-1.5 font-display text-[17px] font-semibold tracking-[-0.02em] text-ink">
                    Recent activity
                  </h2>
                </div>

                <FileCheck2 size={16} className="text-ink/35" />
              </div>
            </div>

            <div className="p-5">
              <div className="relative space-y-5">
                <div className="absolute left-[3px] top-2 bottom-2 w-px bg-ink/[0.07]" />

                {[
                  {
                    title: 'PM inspection completed',
                    date: '27 Aug 2026 · 10:42 AM',
                    active: true,
                  },
                  {
                    title: 'Work measurement uploaded',
                    date: '27 Aug 2026 · 9:16 AM',
                    active: false,
                  },
                  {
                    title: 'Milestone submitted',
                    date: '26 Aug 2026 · 4:28 PM',
                    active: false,
                  },
                ].map((activity) => (
                  <div
                    key={activity.title}
                    className="relative flex gap-3"
                  >
                    <div
                      className={[
                        'relative z-10 mt-1.5 h-2 w-2 shrink-0 rounded-full ring-4 ring-white',
                        activity.active
                          ? 'bg-[#12613E]'
                          : 'bg-ink/15',
                      ].join(' ')}
                    />

                    <div>
                      <p className="text-[10px] font-semibold text-ink">
                        {activity.title}
                      </p>

                      <p className="mt-1 text-[9px] text-ink/35">
                        {activity.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="
                  mt-6
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-ink/[0.08]
                  bg-white
                  px-3.5
                  py-3
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.07em]
                  text-ink/55
                  transition-all
                  hover:border-ink/20
                  hover:bg-paper-2
                "
              >
                View complete audit log
                <ChevronRight size={13} />
              </button>
            </div>
          </Card>
        </aside>
      </div>

      {/* ===================================================== */}
      {/* Approval Rule */}
      {/* ===================================================== */}

      <section className="overflow-hidden rounded-[22px] border border-[#B85C12]/15 bg-[#FFFAF6]">
        <div className="flex gap-4 p-5 sm:p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7E6D8] text-[#B85C12]">
            <AlertTriangle size={17} />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#B85C12]">
              Payment approval rule
            </p>

            <p className="mt-1.5 max-w-4xl text-[10px] leading-5 text-ink/50">
              A milestone must not be approved for payment until the required
              evidence has been submitted, reviewed and verified. Rejected or
              incomplete milestones remain payment-frozen until the required
              corrections are completed.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}