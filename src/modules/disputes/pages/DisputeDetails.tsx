
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock3,
  FileText,
  Flag,
  LockKeyhole,
  MessageSquare,
  Scale,
  ShieldCheck,
  User,
} from 'lucide-react'

import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

type DisputeStatus =
  | 'opened'
  | 'evidence_submitted'
  | 'payment_frozen'
  | 'party_response'
  | 'admin_review'
  | 'expert_review'
  | 'recommendation'
  | 'resolution'
  | 'closed'

interface TimelineItem {
  title: string
  description: string
  date: string
  status: 'completed' | 'current' | 'upcoming'
  icon: typeof CheckCircle2
}

const timeline: TimelineItem[] = [
  {
    title: 'Dispute opened',
    description: 'Client submitted a formal complaint against the contractor.',
    date: '27 Aug 2026 · 09:42',
    status: 'completed',
    icon: Flag,
  },
  {
    title: 'Evidence submitted',
    description: 'Supporting project and payment evidence was attached.',
    date: '27 Aug 2026 · 09:48',
    status: 'completed',
    icon: FileText,
  },
  {
    title: 'Payment frozen',
    description: 'The affected milestone payment has been placed on hold.',
    date: '27 Aug 2026 · 09:49',
    status: 'completed',
    icon: LockKeyhole,
  },
  {
    title: 'Party response',
    description: 'The respondent has been notified and may provide evidence.',
    date: 'Awaiting response',
    status: 'current',
    icon: MessageSquare,
  },
  {
    title: 'Admin review',
    description: 'Build OS will review the complaint and evidence.',
    date: 'Pending',
    status: 'upcoming',
    icon: ShieldCheck,
  },
  {
    title: 'Expert review',
    description: 'Technical review may be requested where required.',
    date: 'If required',
    status: 'upcoming',
    icon: Scale,
  },
  {
    title: 'Recommendation',
    description: 'A resolution recommendation will be recorded.',
    date: 'Pending',
    status: 'upcoming',
    icon: CheckCircle2,
  },
  {
    title: 'Resolution',
    description: 'Payment, correction, replacement, refund or closure action.',
    date: 'Pending',
    status: 'upcoming',
    icon: CheckCircle2,
  },
]

const statusTone = {
  opened: 'neutral',
  evidence_submitted: 'amber',
  payment_frozen: 'brick',
  party_response: 'amber',
  admin_review: 'amber',
  expert_review: 'amber',
  recommendation: 'teal',
  resolution: 'teal',
  closed: 'teal',
} as const

function formatStatus(status: DisputeStatus) {
  return status
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export function DisputeDetails() {
  const dispute = {
    id: 'DSP-2026-00418',
    projectId: 'PRJ-2026-00421',
    title: 'Milestone payment disputed over incomplete finishing work',
    category: 'Quality',
    status: 'party_response' as DisputeStatus,
    priority: 'High',
    amount: '₦2.85M',
    openedBy: 'Client / Diaspora Investor',
    respondent: 'BuildRight Construction Ltd',
    affectedMilestone: 'Milestone 04 — Internal Finishing',
    openedAt: '27 August 2026',
    description:
      'The client reports that the internal finishing milestone was submitted as complete even though several agreed finishing works remain outstanding. The disputed payment has therefore been placed on hold pending review.',
  }

  const evidence = [
    {
      name: 'milestone-04-inspection.pdf',
      type: 'Inspection report',
      size: '2.4 MB',
    },
    {
      name: 'site-progress-photos.zip',
      type: 'Site photographs',
      size: '18.7 MB',
    },
    {
      name: 'contract-milestone-04.pdf',
      type: 'Contract document',
      size: '1.1 MB',
    },
  ]

  const completedSteps = timeline.filter(
    (item) => item.status === 'completed',
  ).length

  const currentStepIndex = timeline.findIndex(
    (item) => item.status === 'current',
  )

  const progress =
    currentStepIndex >= 0
      ? Math.round((currentStepIndex / (timeline.length - 1)) * 100)
      : 100

  return (
    <div className="space-y-7">
      {/* ===================================================== */}
      {/* Header */}
      {/* ===================================================== */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">
              Dispute management
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[36px]">
              Dispute details
            </h1>

            <Badge tone={statusTone[dispute.status]}>
              {formatStatus(dispute.status)}
            </Badge>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-mono text-[10px] font-semibold text-ink/40">
              {dispute.id}
            </span>

            <span className="h-1 w-1 rounded-full bg-ink/15" />

            <span className="text-[11px] text-ink/40">
              Project {dispute.projectId}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="
            group
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-full
            border
            border-ink/[0.08]
            bg-white
            px-4
            py-2.5
            text-xs
            font-semibold
            text-ink/60
            transition
            hover:-translate-y-0.5
            hover:border-ink/15
            hover:text-ink
            hover:shadow-[0_8px_22px_rgba(20,40,30,0.05)]
          "
        >
          <ArrowLeft
            size={14}
            className="transition group-hover:-translate-x-0.5"
          />
          Back to disputes
        </button>
      </div>

      {/* ===================================================== */}
      {/* Premium case hero */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden rounded-[26px] bg-[#173629] p-6 text-white sm:p-7">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/[0.035]" />
        <div className="absolute -bottom-28 right-20 h-48 w-48 rounded-full bg-[#B85C12]/10" />
        <div className="absolute left-[42%] top-0 h-full w-px bg-white/[0.035]" />

        <div className="relative">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-white/55 ring-1 ring-white/[0.06]">
                  {dispute.category}
                </span>

                <span className="flex items-center gap-1.5 rounded-full bg-[#B85C12]/20 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#F1B47B]">
                  <AlertTriangle size={10} />
                  {dispute.priority} priority
                </span>
              </div>

              <h2 className="mt-4 max-w-2xl font-display text-[24px] font-semibold leading-[1.12] tracking-[-0.025em] sm:text-[30px]">
                {dispute.title}
              </h2>

              <p className="mt-3 max-w-2xl text-[11px] leading-5 text-white/50">
                {dispute.description}
              </p>
            </div>

            <div className="shrink-0 lg:min-w-[190px] lg:text-right">
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/35">
                Amount protected
              </p>

              <p className="mt-1 font-display text-[30px] font-semibold tracking-[-0.035em] text-white">
                {dispute.amount}
              </p>

              <p className="mt-1 text-[10px] text-white/40">
                {dispute.affectedMilestone}
              </p>
            </div>
          </div>

          <div className="mt-7 border-t border-white/[0.08] pt-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/35">
                  Case progress
                </p>

                <p className="mt-1 text-[11px] font-semibold text-white/70">
                  {completedSteps} of {timeline.length} stages completed
                </p>
              </div>

              <span className="font-mono text-[10px] text-white/35">
                {progress}% progressed
              </span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full bg-[#D58A4D] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* Payment protection */}
      {/* ===================================================== */}

      <div className="relative overflow-hidden rounded-[22px] border border-[#B85C12]/15 bg-[#F8EEE6] px-5 py-4.5 sm:px-6 sm:py-5">
        <div className="absolute -right-10 -top-14 h-32 w-32 rounded-full bg-[#B85C12]/[0.04]" />

        <div className="relative flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#B85C12]/10 text-[#B85C12]">
            <LockKeyhole size={17} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[12px] font-semibold text-[#713C14]">
                Payment currently protected
              </p>

              <span className="rounded-full bg-[#B85C12]/10 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#8A4A13]">
                On hold
              </span>
            </div>

            <p className="mt-1 text-[11px] leading-5 text-[#713C14]/65">
              {dispute.amount} associated with{' '}
              <span className="font-semibold">
                {dispute.affectedMilestone}
              </span>{' '}
              is currently protected from release while this dispute is
              reviewed.
            </p>
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/* Main layout */}
      {/* ===================================================== */}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(310px,0.7fr)]">
        {/* ================================================= */}
        {/* Main column */}
        {/* ================================================= */}

        <div className="space-y-6">
          {/* --------------------------------------------- */}
          {/* Case information */}
          {/* --------------------------------------------- */}

          <Card className="overflow-hidden">
            <CardHeader
              title="Case information"
              subtitle="Formal complaint and affected project information"
            />

            <CardBody className="p-5 sm:p-6">
              <div className="grid gap-px overflow-hidden rounded-[18px] border border-ink/[0.07] bg-ink/[0.07] sm:grid-cols-2">
                <DetailCell
                  label="Dispute category"
                  value={dispute.category}
                />

                <DetailCell
                  label="Priority"
                  value={dispute.priority}
                  accent
                  icon={<AlertTriangle size={13} />}
                />

                <DetailCell
                  label="Affected milestone"
                  value={dispute.affectedMilestone}
                />

                <DetailCell
                  label="Affected amount"
                  value={dispute.amount}
                  mono
                />
              </div>

              <div className="mt-6 rounded-[18px] bg-[#F7F9F7] p-5">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-ink/40">
                    <Flag size={13} />
                  </div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink/40">
                    Complaint
                  </p>
                </div>

                <p className="mt-3 text-[12px] leading-6 text-ink/60">
                  {dispute.description}
                </p>
              </div>
            </CardBody>
          </Card>

          {/* --------------------------------------------- */}
          {/* Parties */}
          {/* --------------------------------------------- */}

          <Card>
            <CardHeader
              title="Dispute parties"
              subtitle="Users and organisations involved in this matter"
            />

            <CardBody className="p-5 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <PartyCard
                  label="Complainant"
                  name={dispute.openedBy}
                  icon={<User size={17} />}
                  tone="neutral"
                />

                <PartyCard
                  label="Respondent"
                  name={dispute.respondent}
                  icon={<ConstructionIcon />}
                  tone="green"
                />
              </div>
            </CardBody>
          </Card>

          {/* --------------------------------------------- */}
          {/* Evidence */}
          {/* --------------------------------------------- */}

          <Card className="overflow-hidden">
            <CardHeader
              title="Evidence"
              subtitle="Documents and records attached to the dispute"
            />

            <CardBody className="p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-[10px] text-ink/35">
                  {evidence.length} supporting files
                </p>

                <span className="flex items-center gap-1.5 text-[10px] font-semibold text-ink/45">
                  <LockKeyhole size={11} />
                  Secure record
                </span>
              </div>

              <div className="space-y-2.5">
                {evidence.map((file) => (
                  <div
                    key={file.name}
                    className="
                      group
                      flex
                      items-center
                      justify-between
                      gap-4
                      rounded-[16px]
                      border
                      border-ink/[0.07]
                      bg-white
                      p-3.5
                      transition
                      hover:-translate-y-0.5
                      hover:border-ink/15
                      hover:shadow-[0_8px_22px_rgba(20,40,30,0.045)]
                    "
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4F6F3] text-ink/45">
                        <FileText size={16} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-semibold text-ink">
                          {file.name}
                        </p>

                        <p className="mt-1 text-[10px] text-ink/35">
                          {file.type}
                          <span className="mx-1.5 text-ink/15">•</span>
                          {file.size}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="
                        inline-flex
                        shrink-0
                        items-center
                        gap-1.5
                        rounded-full
                        border
                        border-ink/[0.08]
                        bg-white
                        px-3
                        py-1.5
                        text-[10px]
                        font-semibold
                        text-ink/50
                        transition
                        hover:border-ink/15
                        hover:text-ink
                      "
                    >
                      View
                      <ArrowUpRight
                        size={11}
                        className="transition group-hover:translate-x-0.5"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* ================================================= */}
        {/* Sidebar */}
        {/* ================================================= */}

        <div className="space-y-6">
          {/* --------------------------------------------- */}
          {/* Case metadata */}
          {/* --------------------------------------------- */}

          <Card className="overflow-hidden">
            <div className="border-b border-ink/[0.07] px-5 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/35">
                    Case information
                  </p>

                  <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                    Case record
                  </h2>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F4F6F3] text-ink/45">
                  <FileText size={15} />
                </div>
              </div>
            </div>

            <CardBody className="p-5">
              <div className="space-y-0">
                <InfoRow label="Dispute ID" value={dispute.id} mono />
                <InfoRow label="Project ID" value={dispute.projectId} mono />
                <InfoRow label="Opened" value={dispute.openedAt} />
                <InfoRow
                  label="Current status"
                  value={formatStatus(dispute.status)}
                />
                <InfoRow label="Priority" value={dispute.priority} />
              </div>
            </CardBody>
          </Card>

          {/* --------------------------------------------- */}
          {/* Timeline */}
          {/* --------------------------------------------- */}

          <Card className="overflow-hidden">
            <div className="border-b border-ink/[0.07] px-5 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/35">
                    Case timeline
                  </p>

                  <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                    Review progress
                  </h2>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F4F6F3] text-ink/45">
                  <Clock3 size={15} />
                </div>
              </div>
            </div>

            <CardBody className="p-5">
              <div>
                {timeline.map((item, index) => {
                  const Icon = item.icon
                  const isLast = index === timeline.length - 1

                  return (
                    <div key={item.title} className="relative flex gap-3">
                      <div className="flex w-8 shrink-0 flex-col items-center">
                        <div
                          className={`
                            z-10 flex h-8 w-8 items-center justify-center rounded-full border
                            transition
                            ${
                              item.status === 'completed'
                                ? 'border-[#12613E]/15 bg-[#EAF4EE] text-[#12613E]'
                                : item.status === 'current'
                                  ? 'border-[#B85C12]/20 bg-[#F8EEE6] text-[#B85C12] shadow-[0_0_0_4px_rgba(184,92,18,0.05)]'
                                  : 'border-ink/[0.08] bg-[#F7F9F7] text-ink/25'
                            }
                          `}
                        >
                          <Icon size={13} />
                        </div>

                        {!isLast && (
                          <div
                            className={`
                              h-10 w-px
                              ${
                                item.status === 'completed'
                                  ? 'bg-[#12613E]/15'
                                  : 'bg-ink/[0.07]'
                              }
                            `}
                          />
                        )}
                      </div>

                      <div className="min-w-0 pb-5">
                        <div className="flex flex-wrap items-center gap-2">
                          <p
                            className={`
                              text-[11px] font-semibold
                              ${
                                item.status === 'current'
                                  ? 'text-[#B85C12]'
                                  : item.status === 'completed'
                                    ? 'text-ink'
                                    : 'text-ink/40'
                              }
                            `}
                          >
                            {item.title}
                          </p>

                          {item.status === 'current' && (
                            <span className="rounded-full bg-[#F8EEE6] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.06em] text-[#B85C12]">
                              Current
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-[10px] leading-4.5 text-ink/40">
                          {item.description}
                        </p>

                        <p
                          className={`
                            mt-1 font-mono text-[9px]
                            ${
                              item.status === 'current'
                                ? 'text-[#B85C12]/65'
                                : 'text-ink/25'
                            }
                          `}
                        >
                          {item.date}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardBody>
          </Card>

          {/* --------------------------------------------- */}
          {/* Current action */}
          {/* --------------------------------------------- */}

          <div className="relative overflow-hidden rounded-[22px] bg-[#173629] p-5 text-white">
            <div className="absolute -bottom-12 -right-10 h-32 w-32 rounded-full bg-[#B85C12]/10" />

            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                <MessageSquare size={16} />
              </div>

              <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">
                Current action
              </p>

              <h3 className="mt-1.5 font-display text-[17px] font-semibold leading-tight">
                Awaiting respondent
              </h3>

              <p className="mt-2 text-[10px] leading-4.5 text-white/50">
                The respondent can provide a response and additional evidence
                before administrative review begins.
              </p>

              <button
                type="button"
                className="
                  mt-5
                  inline-flex
                  h-10
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-white
                  text-xs
                  font-bold
                  text-ink
                  transition
                  hover:-translate-y-0.5
                  hover:bg-white/90
                "
              >
                <MessageSquare size={13} />
                Add case note
              </button>
            </div>
          </div>

          {/* --------------------------------------------- */}
          {/* Protection */}
          {/* --------------------------------------------- */}

          <Card>
            <CardBody className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
                  <ShieldCheck size={15} />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-ink">
                    Audit trail protected
                  </p>

                  <p className="mt-1 text-[10px] leading-4.5 text-ink/40">
                    Case activity, evidence and resolution actions are retained
                    as part of the project's formal record.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

function DetailCell({
  label,
  value,
  mono = false,
  accent = false,
  icon,
}: {
  label: string
  value: string
  mono?: boolean
  accent?: boolean
  icon?: React.ReactNode
}) {
  return (
    <div className="bg-white p-4 sm:p-4.5">
      <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-ink/30">
        {label}
      </p>

      <p
        className={`
          mt-1.5 flex items-center gap-1.5 text-[12px] font-semibold
          ${accent ? 'text-[#B85C12]' : 'text-ink'}
          ${mono ? 'font-mono' : ''}
        `}
      >
        {icon}
        {value}
      </p>
    </div>
  )
}

function PartyCard({
  label,
  name,
  icon,
  tone,
}: {
  label: string
  name: string
  icon: React.ReactNode
  tone: 'neutral' | 'green'
}) {
  return (
    <div className="group rounded-[18px] border border-ink/[0.07] bg-[#F7F9F7] p-4 transition hover:-translate-y-0.5 hover:border-ink/12 hover:shadow-[0_8px_22px_rgba(20,40,30,0.045)]">
      <div className="flex items-center gap-3">
        <div
          className={`
            flex h-10 w-10 items-center justify-center rounded-xl
            ${
              tone === 'green'
                ? 'bg-[#EAF4EE] text-[#12613E]'
                : 'bg-white text-ink/45'
            }
          `}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-ink/30">
            {label}
          </p>

          <p className="mt-1 truncate text-[12px] font-semibold text-ink">
            {name}
          </p>
        </div>
      </div>
    </div>
  )
}

function InfoRow({
  label,
  value,
  mono = false,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-ink/[0.06] py-3 last:border-0 last:pb-0 first:pt-0">
      <span className="text-[10px] text-ink/35">{label}</span>

      <span
        className={`
          text-right text-[10px] font-semibold text-ink/70
          ${mono ? 'font-mono' : ''}
        `}
      >
        {value}
      </span>
    </div>
  )
}

function ConstructionIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-[17px] w-[17px]"
      aria-hidden="true"
    >
      <path d="M3 21h18" />
      <path d="M5 21V8l7-5 7 5v13" />
      <path d="M9 21v-5h6v5" />
      <path d="M8 10h1" />
      <path d="M15 10h1" />
    </svg>
  )
}