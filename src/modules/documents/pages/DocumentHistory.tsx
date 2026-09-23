import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  History,
  LockKeyhole,
  ShieldCheck,
  Upload,
  User,
  XCircle,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

type HistoryEventType =
  | 'uploaded'
  | 'updated'
  | 'verified'
  | 'downloaded'
  | 'viewed'
  | 'access_changed'
  | 'rejected'

interface HistoryEvent {
  id: string
  type: HistoryEventType
  title: string
  description: string
  actor: string
  role: string
  date: string
  version?: string
  ipAddress?: string
}

const events: HistoryEvent[] = [
  {
    id: 'HST-00842-06',
    type: 'verified',
    title: 'Document verified',
    description:
      'The document passed Build OS verification and was marked as verified project evidence.',
    actor: 'Build OS Verification Team',
    role: 'Administrator',
    date: '27 Aug 2026 · 10:12',
    version: 'v2.0',
  },
  {
    id: 'HST-00842-05',
    type: 'viewed',
    title: 'Document viewed',
    description:
      'The current document version was opened for project review.',
    actor: 'Client / Diaspora Investor',
    role: 'Client',
    date: '27 Aug 2026 · 10:04',
    version: 'v2.0',
  },
  {
    id: 'HST-00842-04',
    type: 'updated',
    title: 'New version uploaded',
    description:
      'Updated inspection findings and supporting evidence were uploaded.',
    actor: 'Project Manager',
    role: 'Project Manager',
    date: '27 Aug 2026 · 09:36',
    version: 'v2.0',
  },
  {
    id: 'HST-00842-03',
    type: 'downloaded',
    title: 'Document downloaded',
    description:
      'A copy of the document was downloaded by an authorised project participant.',
    actor: 'Project Manager',
    role: 'Project Manager',
    date: '26 Aug 2026 · 17:08',
    version: 'v1.0',
  },
  {
    id: 'HST-00842-02',
    type: 'viewed',
    title: 'Document viewed',
    description:
      'The initial inspection report was opened from the project documents area.',
    actor: 'Client / Diaspora Investor',
    role: 'Client',
    date: '26 Aug 2026 · 16:48',
    version: 'v1.0',
  },
  {
    id: 'HST-00842-01',
    type: 'uploaded',
    title: 'Document uploaded',
    description:
      'The initial inspection report was uploaded and submitted for verification.',
    actor: 'Project Manager',
    role: 'Project Manager',
    date: '26 Aug 2026 · 16:20',
    version: 'v1.0',
  },
]

const eventConfig: Record<
  HistoryEventType,
  {
    icon: typeof Upload
    tone: 'teal' | 'amber' | 'neutral' | 'brick'
  }
> = {
  uploaded: {
    icon: Upload,
    tone: 'neutral',
  },
  updated: {
    icon: History,
    tone: 'amber',
  },
  verified: {
    icon: CheckCircle2,
    tone: 'teal',
  },
  downloaded: {
    icon: Download,
    tone: 'neutral',
  },
  viewed: {
    icon: FileText,
    tone: 'neutral',
  },
  access_changed: {
    icon: LockKeyhole,
    tone: 'amber',
  },
  rejected: {
    icon: XCircle,
    tone: 'brick',
  },
}

const versions = [
  {
    version: 'v2.0',
    status: 'Current',
    date: '27 Aug 2026 · 09:36',
    uploadedBy: 'Project Manager',
    size: '2.4 MB',
    changes: 'Updated inspection findings and supporting photographs.',
  },
  {
    version: 'v1.0',
    status: 'Previous',
    date: '26 Aug 2026 · 16:20',
    uploadedBy: 'Project Manager',
    size: '1.9 MB',
    changes: 'Initial inspection report.',
  },
]

export function DocumentHistory() {
  const document = {
    id: 'DOC-2026-00842',
    name: 'milestone-04-inspection-report.pdf',
    type: 'Inspection Report',
    projectId: 'PRJ-2026-00421',
    projectName: 'Abuja Residential Development',
    currentVersion: 'v2.0',
    status: 'Verified',
  }

  return (
    <div className="space-y-7 pb-10">
      {/* ===================================================== */}
      {/* Header */}
      {/* ===================================================== */}

      <header>
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">
                  Audit record
                </span>
              </div>

              <span className="h-3 w-px bg-ink/10" />

              <span className="font-mono text-[10px] text-ink/35">
                {document.id}
              </span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <h1 className="font-display text-[30px] font-semibold leading-[1.05] tracking-[-0.04em] text-ink sm:text-[36px]">
                Document history
              </h1>

              <Badge tone="teal">{document.status}</Badge>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-ink/45">
              <span>{document.name}</span>

              <span className="h-3 w-px bg-ink/10" />

              <span>{document.projectName}</span>

              <span className="h-3 w-px bg-ink/10" />

              <span>{document.currentVersion}</span>
            </div>
          </div>

          <button
            type="button"
            className="
              inline-flex
              w-fit
              shrink-0
              items-center
              gap-2
              rounded-full
              border
              border-ink/[0.10]
              bg-white
              px-4
              py-2.5
              text-xs
              font-semibold
              text-ink
              shadow-[0_4px_14px_rgba(20,40,30,0.03)]
              transition
              duration-200
              hover:-translate-y-0.5
              hover:border-ink/20
              hover:shadow-[0_10px_25px_rgba(20,40,30,0.07)]
            "
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to document
          </button>
        </div>
      </header>

      {/* ===================================================== */}
      {/* Document identity */}
      {/* ===================================================== */}

      <Card className="overflow-hidden">
        <CardBody className="p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
            {/* Document icon */}
            <div className="relative flex h-[68px] w-[56px] shrink-0 items-center justify-center rounded-[12px] border border-ink/[0.08] bg-[#F5F6F4] shadow-[0_8px_20px_rgba(20,40,30,0.05)]">
              <div className="absolute right-0 top-0 h-4 w-4 rounded-bl-[5px] border-b border-l border-ink/[0.07] bg-white" />

              <FileText className="h-7 w-7 text-ink/35" />
            </div>

            {/* Identity */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-bold text-ink">
                {document.name}
              </p>

              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-ink/40">
                <span>{document.type}</span>

                <span className="h-3 w-px bg-ink/10" />

                <span>{document.projectName}</span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#12613E]/[0.08] px-2.5 py-1 font-mono text-[9px] font-bold text-[#12613E]">
                  {document.currentVersion}
                </span>

                <span className="rounded-full bg-ink/[0.045] px-2.5 py-1 text-[9px] font-semibold text-ink/45">
                  {events.length} recorded events
                </span>
              </div>
            </div>

            {/* Summary metrics */}
            <div className="grid grid-cols-2 gap-3 lg:min-w-[250px]">
              <SummaryMetric
                label="Current version"
                value={document.currentVersion}
                mono
              />

              <SummaryMetric
                label="Audit events"
                value={String(events.length)}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ===================================================== */}
      {/* Main content */}
      {/* ===================================================== */}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(310px,0.7fr)]">
        {/* =================================================== */}
        {/* Activity */}
        {/* =================================================== */}

        <section className="min-w-0">
          <Card className="overflow-hidden">
            <div className="border-b border-ink/[0.07] px-5 py-5 sm:px-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink/35">
                    Complete record
                  </p>

                  <h2 className="mt-1 font-display text-[20px] font-semibold tracking-[-0.025em] text-ink">
                    Activity timeline
                  </h2>

                  <p className="mt-1 text-[11px] text-ink/40">
                    Every material action associated with this document.
                  </p>
                </div>

                <span className="font-mono text-[9px] text-ink/25">
                  LATEST → EARLIEST
                </span>
              </div>
            </div>

            <CardBody className="p-5 sm:p-6">
              <div className="relative">
                {/* Timeline rail */}
                <div className="absolute bottom-7 left-[18px] top-7 w-px bg-ink/[0.08]" />

                <div className="space-y-1">
                  {events.map((event, index) => {
                    const config = eventConfig[event.type]
                    const Icon = config.icon
                    const isLast = index === events.length - 1

                    return (
                      <div
                        key={event.id}
                        className="relative flex gap-4 sm:gap-5"
                      >
                        {/* Timeline node */}
                        <div className="relative z-10 flex shrink-0 flex-col items-center">
                          <div
                            className={[
                              'flex h-9 w-9 items-center justify-center rounded-full border shadow-[0_3px_10px_rgba(20,40,30,0.04)]',
                              config.tone === 'teal'
                                ? 'border-[#12613E]/15 bg-[#EAF4EE] text-[#12613E]'
                                : config.tone === 'amber'
                                  ? 'border-[#B85C12]/15 bg-[#F8EEE6] text-[#B85C12]'
                                  : config.tone === 'brick'
                                    ? 'border-[#A33A32]/15 bg-[#F8ECEB] text-[#A33A32]'
                                    : 'border-ink/[0.08] bg-[#F5F6F4] text-ink/40',
                            ].join(' ')}
                          >
                            <Icon className="h-4 w-4" />
                          </div>

                          {!isLast && (
                            <div className="h-full min-h-[88px] w-px bg-transparent" />
                          )}
                        </div>

                        {/* Event */}
                        <div className="min-w-0 flex-1 pb-7">
                          <div
                            className={[
                              'rounded-[18px] border p-4 transition duration-200 sm:p-5',
                              index === 0
                                ? 'border-[#12613E]/10 bg-[#12613E]/[0.025]'
                                : 'border-ink/[0.07] bg-white hover:border-ink/[0.11] hover:shadow-[0_8px_24px_rgba(20,40,30,0.035)]',
                            ].join(' ')}
                          >
                            <div className="flex flex-col gap-3">
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                <div className="min-w-0">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-[13px] font-bold text-ink">
                                      {event.title}
                                    </h3>

                                    {index === 0 && (
                                      <span className="rounded-full bg-[#12613E]/[0.08] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-[#12613E]">
                                        Latest
                                      </span>
                                    )}
                                  </div>

                                  <p className="mt-1.5 max-w-2xl text-[11px] leading-5 text-ink/50">
                                    {event.description}
                                  </p>
                                </div>

                                <time className="shrink-0 font-mono text-[9px] text-ink/30">
                                  {event.date}
                                </time>
                              </div>

                              <div className="flex flex-wrap items-center gap-2 border-t border-ink/[0.06] pt-3">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F6F4] px-2.5 py-1 text-[9px] font-semibold text-ink/50">
                                  <User className="h-3 w-3" />
                                  {event.actor}
                                </span>

                                <span className="rounded-full bg-ink/[0.045] px-2.5 py-1 text-[9px] font-semibold text-ink/40">
                                  {event.role}
                                </span>

                                {event.version && (
                                  <span className="rounded-full bg-ink/[0.045] px-2.5 py-1 font-mono text-[9px] font-semibold text-ink/40">
                                    {event.version}
                                  </span>
                                )}

                                <span className="ml-auto hidden font-mono text-[8px] text-ink/20 sm:block">
                                  {event.id}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* =================================================== */}
        {/* Sidebar */}
        {/* =================================================== */}

        <aside className="min-w-0 space-y-5">
          {/* Version history */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Versions"
              subtitle="Document revision history"
            />

            <CardBody className="space-y-3 p-5">
              {versions.map((version, index) => (
                <div
                  key={version.version}
                  className="
                    group
                    rounded-[18px]
                    border
                    border-ink/[0.07]
                    bg-white
                    p-4
                    transition
                    duration-200
                    hover:-translate-y-0.5
                    hover:border-ink/[0.12]
                    hover:shadow-[0_10px_28px_rgba(20,40,30,0.05)]
                  "
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-ink">
                        {version.version}
                      </span>

                      <Badge
                        tone={version.status === 'Current' ? 'teal' : 'neutral'}
                      >
                        {version.status}
                      </Badge>
                    </div>

                    <span className="text-[9px] font-medium text-ink/30">
                      {version.size}
                    </span>
                  </div>

                  <p className="mt-3 text-[11px] leading-5 text-ink/50">
                    {version.changes}
                  </p>

                  <div className="mt-3 border-t border-ink/[0.06] pt-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[9px] text-ink/30">
                          Uploaded by
                        </p>

                        <p className="mt-0.5 text-[10px] font-semibold text-ink/65">
                          {version.uploadedBy}
                        </p>
                      </div>

                      <p className="font-mono text-[8px] text-ink/25">
                        {version.date}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="
                      mt-3
                      flex
                      h-8
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      border
                      border-ink/[0.08]
                      bg-[#F9FAF8]
                      text-[9px]
                      font-bold
                      text-ink/50
                      transition
                      hover:border-ink/15
                      hover:bg-white
                      hover:text-ink
                    "
                  >
                    <Download className="h-3 w-3" />
                    View version
                  </button>
                </div>
              ))}
            </CardBody>
          </Card>

          {/* Security / access */}
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3F5F2] text-ink/50">
                <LockKeyhole className="h-4 w-4" />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/35">
                  Access control
                </p>

                <h3 className="mt-1 text-[13px] font-bold text-ink">
                  Protected record
                </h3>

                <p className="mt-1.5 text-[10px] leading-5 text-ink/40">
                  Document access is restricted to authorised project
                  participants and retained in the audit trail.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3 border-t border-ink/[0.07] pt-4">
              <AuditMetric
                label="Recorded events"
                value={String(events.length)}
              />

              <AuditMetric
                label="Current version"
                value={document.currentVersion}
                mono
              />

              <AuditMetric
                label="Document status"
                value={document.status}
              />
            </div>
          </Card>

          {/* Integrity */}
          <div
            className="
              relative
              overflow-hidden
              rounded-[20px]
              border
              border-[#12613E]/10
              bg-[#12613E]/[0.035]
              p-5
            "
          >
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#12613E]/[0.05] blur-2xl" />

            <div className="relative flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#12613E] shadow-sm">
                <ShieldCheck className="h-4 w-4" />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#12613E]/60">
                  Audit integrity
                </p>

                <h3 className="mt-1 text-[13px] font-bold text-ink">
                  Audit trail protected
                </h3>

                <p className="mt-1.5 text-[10px] leading-5 text-ink/45">
                  Material document actions are retained as part of the
                  project record for traceability.
                </p>
              </div>
            </div>

            <div className="relative mt-4 flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2.5">
              <Check className="h-3.5 w-3.5 text-[#12613E]" />

              <span className="text-[9px] font-bold text-[#12613E]">
                Record integrity active
              </span>
            </div>
          </div>

          {/* Tracking */}
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/[0.045] text-ink/45">
                <Clock3 className="h-4 w-4" />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/35">
                  System tracking
                </p>

                <h3 className="mt-1 text-[13px] font-bold text-ink">
                  Continuous history
                </h3>

                <p className="mt-1.5 text-[10px] leading-5 text-ink/40">
                  Timestamps and document activity are recorded against the
                  Build OS audit system.
                </p>
              </div>
            </div>
          </Card>

          {/* Quick navigation */}
          <button
            type="button"
            className="
              group
              flex
              w-full
              items-center
              justify-between
              rounded-[18px]
              border
              border-ink/[0.08]
              bg-white
              px-4
              py-3.5
              text-left
              shadow-[0_4px_16px_rgba(20,40,30,0.025)]
              transition
              hover:-translate-y-0.5
              hover:border-ink/15
              hover:shadow-[0_10px_25px_rgba(20,40,30,0.06)]
            "
          >
            <span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-ink/30">
                Document
              </span>

              <span className="mt-1 block text-[11px] font-semibold text-ink/65">
                Return to document record
              </span>
            </span>

            <ArrowUpRight className="h-4 w-4 text-ink/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
          </button>
        </aside>
      </div>
    </div>
  )
}

/* ============================================================= */
/* Supporting UI                                                   */
/* ============================================================= */

function SummaryMetric({
  label,
  value,
  mono = false,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="rounded-2xl bg-[#F5F6F4] px-4 py-3">
      <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-ink/30">
        {label}
      </p>

      <p
        className={[
          'mt-1 text-[12px] font-bold text-ink',
          mono ? 'font-mono text-[10px]' : '',
        ].join(' ')}
      >
        {value}
      </p>
    </div>
  )
}

function AuditMetric({
  label,
  value,
  mono = false,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[10px] text-ink/40">{label}</span>

      <span
        className={[
          'text-right text-[10px] font-bold text-ink/70',
          mono ? 'font-mono' : '',
        ].join(' ')}
      >
        {value}
      </span>
    </div>
  )
}