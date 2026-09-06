import {
  AlertTriangle,
  ArrowLeft,
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10">
              <Scale className="h-5 w-5 text-red-600" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Dispute management
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Dispute Details
            </h1>

            <Badge tone={statusTone[dispute.status]}>
              {formatStatus(dispute.status)}
            </Badge>
          </div>

          <p className="mt-1 text-sm text-ink/50">
            {dispute.id} · Project {dispute.projectId}
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink/60 transition hover:bg-ink/[0.02] hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to disputes
        </button>
      </div>

      {/* Status alert */}
      <div className="flex gap-3 rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-4">
        <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

        <div>
          <p className="text-sm font-semibold text-ink">
            Payment currently frozen
          </p>

          <p className="mt-1 text-xs leading-5 text-ink/50">
            {dispute.amount} associated with {dispute.affectedMilestone} is
            currently protected from release while this dispute is reviewed.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader
              title={dispute.title}
              subtitle="Formal complaint and affected project information"
            />

            <CardBody>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-ink/40">Dispute category</p>
                  <p className="mt-1 text-sm font-semibold text-ink">
                    {dispute.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-ink/40">Priority</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    {dispute.priority}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-ink/40">Affected milestone</p>
                  <p className="mt-1 text-sm font-semibold text-ink">
                    {dispute.affectedMilestone}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-ink/40">Affected amount</p>
                  <p className="mt-1 font-mono text-sm font-semibold text-ink">
                    {dispute.amount}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-line pt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Complaint
                </p>

                <p className="mt-2 text-sm leading-7 text-ink/65">
                  {dispute.description}
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Parties */}
          <Card>
            <CardHeader
              title="Dispute parties"
              subtitle="Users and organisations involved in this matter"
            />

            <CardBody>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-line bg-paper-2 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                      <User className="h-5 w-5 text-ink/50" />
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                        Complainant
                      </p>

                      <p className="mt-1 text-sm font-semibold text-ink">
                        {dispute.openedBy}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-line bg-paper-2 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                      <ConstructionIcon />
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                        Respondent
                      </p>

                      <p className="mt-1 text-sm font-semibold text-ink">
                        {dispute.respondent}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Evidence */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Evidence"
              subtitle="Documents and records attached to the dispute"
            />

            <CardBody>
              <div className="space-y-2">
                {evidence.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between gap-4 rounded-xl border border-line bg-paper-2 p-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                        <FileText className="h-4 w-4 text-ink/50" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-ink">
                          {file.name}
                        </p>

                        <p className="mt-0.5 text-[11px] text-ink/40">
                          {file.type} · {file.size}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="shrink-0 rounded-lg border border-line bg-white px-3 py-1.5 text-[11px] font-semibold text-ink/55 transition hover:text-ink"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Metadata */}
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
              Case information
            </p>

            <div className="mt-5 space-y-4">
              <InfoRow label="Dispute ID" value={dispute.id} mono />
              <InfoRow label="Project ID" value={dispute.projectId} mono />
              <InfoRow label="Opened" value={dispute.openedAt} />
              <InfoRow label="Status" value={formatStatus(dispute.status)} />
              <InfoRow label="Priority" value={dispute.priority} />
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
                  Case timeline
                </p>

                <h2 className="mt-1 font-display text-base font-semibold text-ink">
                  Review progress
                </h2>
              </div>

              <Clock3 className="h-4 w-4 text-ink/40" />
            </div>

            <div className="mt-6">
              {timeline.map((item, index) => {
                const Icon = item.icon
                const isLast = index === timeline.length - 1

                return (
                  <div key={item.title} className="relative flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                          item.status === 'completed'
                            ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600'
                            : item.status === 'current'
                              ? 'border-amber-500/20 bg-amber-500/10 text-amber-600'
                              : 'border-line bg-paper-2 text-ink/30'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </div>

                      {!isLast && (
                        <div className="h-10 w-px bg-line" />
                      )}
                    </div>

                    <div className="min-w-0 pb-5">
                      <p
                        className={`text-xs font-semibold ${
                          item.status === 'current'
                            ? 'text-amber-700'
                            : 'text-ink'
                        }`}
                      >
                        {item.title}
                      </p>

                      <p className="mt-1 text-[11px] leading-5 text-ink/40">
                        {item.description}
                      </p>

                      <p className="mt-1 font-mono text-[10px] text-ink/30">
                        {item.date}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Admin action */}
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5">
                <ShieldCheck className="h-4 w-4 text-ink/55" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Awaiting respondent
                </p>

                <p className="mt-1 text-xs leading-5 text-ink/40">
                  The respondent can provide a response and additional
                  evidence before administrative review begins.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-ink text-xs font-semibold text-white transition hover:bg-ink/90"
            >
              <MessageSquare className="h-4 w-4" />
              Add case note
            </button>
          </Card>
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
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs text-ink/40">{label}</span>

      <span
        className={`text-right text-xs font-semibold text-ink ${
          mono ? 'font-mono' : ''
        }`}
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
      className="h-5 w-5 text-ink/50"
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