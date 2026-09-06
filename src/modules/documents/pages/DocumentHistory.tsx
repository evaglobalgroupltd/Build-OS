import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  History,
  LockKeyhole,
  ShieldCheck,
  Upload,
  User,
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
    icon: ShieldCheck,
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <History className="h-5 w-5 text-ink/60" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Document management
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Document History
            </h1>

            <Badge tone="teal">{document.status}</Badge>
          </div>

          <p className="mt-1 text-sm text-ink/50">
            {document.id} · {document.projectId}
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink/60 transition hover:bg-ink/[0.02] hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to document
        </button>
      </div>

      {/* Document summary */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink/5">
              <FileText className="h-6 w-6 text-ink/55" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">
                {document.name}
              </p>

              <p className="mt-1 text-xs text-ink/40">
                {document.type} · {document.projectName}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:text-right">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-ink/35">
                  Current version
                </p>
                <p className="mt-1 font-mono text-xs font-semibold text-ink">
                  {document.currentVersion}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wide text-ink/35">
                  Status
                </p>
                <p className="mt-1 text-xs font-semibold text-emerald-600">
                  {document.status}
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity timeline */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader
              title="Activity timeline"
              subtitle="Complete audit trail of document activity"
            />

            <CardBody>
              <div className="relative">
                {events.map((event, index) => {
                  const config = eventConfig[event.type]
                  const Icon = config.icon
                  const isLast = index === events.length - 1

                  return (
                    <div
                      key={event.id}
                      className="relative flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                            config.tone === 'teal'
                              ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600'
                              : config.tone === 'amber'
                                ? 'border-amber-500/20 bg-amber-500/10 text-amber-600'
                                : config.tone === 'brick'
                                  ? 'border-red-500/20 bg-red-500/10 text-red-600'
                                  : 'border-line bg-paper-2 text-ink/45'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        {!isLast && (
                          <div className="min-h-16 w-px bg-line" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1 pb-6">
                        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
                          <div>
                            <p className="text-sm font-semibold text-ink">
                              {event.title}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-ink/50">
                              {event.description}
                            </p>
                          </div>

                          <p className="shrink-0 font-mono text-[10px] text-ink/30">
                            {event.date}
                          </p>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-2 px-2.5 py-1 text-[10px] font-medium text-ink/50">
                            <User className="h-3 w-3" />
                            {event.actor}
                          </span>

                          <span className="rounded-full bg-ink/5 px-2.5 py-1 text-[10px] font-medium text-ink/45">
                            {event.role}
                          </span>

                          {event.version && (
                            <span className="rounded-full bg-ink/5 px-2.5 py-1 font-mono text-[10px] font-medium text-ink/45">
                              {event.version}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Version history */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Versions"
              subtitle="Document revision history"
            />

            <CardBody>
              <div className="space-y-3">
                {versions.map((version) => (
                  <div
                    key={version.version}
                    className="rounded-xl border border-line bg-paper-2 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-ink">
                          {version.version}
                        </span>

                        <Badge
                          tone={
                            version.status === 'Current'
                              ? 'teal'
                              : 'neutral'
                          }
                        >
                          {version.status}
                        </Badge>
                      </div>

                      <span className="text-[10px] text-ink/30">
                        {version.size}
                      </span>
                    </div>

                    <p className="mt-3 text-[11px] leading-5 text-ink/50">
                      {version.changes}
                    </p>

                    <div className="mt-3 border-t border-line pt-3">
                      <p className="text-[10px] text-ink/35">
                        Uploaded by
                      </p>

                      <p className="mt-1 text-[11px] font-semibold text-ink">
                        {version.uploadedBy}
                      </p>

                      <p className="mt-1 font-mono text-[10px] text-ink/30">
                        {version.date}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="mt-3 flex h-8 w-full items-center justify-center gap-2 rounded-lg border border-line bg-white text-[10px] font-semibold text-ink/55 transition hover:text-ink"
                    >
                      <Download className="h-3 w-3" />
                      View version
                    </button>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Access audit */}
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5">
                <LockKeyhole className="h-4 w-4 text-ink/55" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Access history
                </p>

                <p className="mt-1 text-xs leading-5 text-ink/40">
                  Document access is restricted to authorised project
                  participants and recorded in the audit trail.
                </p>
              </div>
            </div>

            <div className="mt-5 border-t border-line pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-ink/40">
                  Recorded events
                </span>

                <span className="font-mono text-xs font-semibold text-ink">
                  {events.length}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-ink/40">
                  Current version
                </span>

                <span className="font-mono text-xs font-semibold text-ink">
                  {document.currentVersion}
                </span>
              </div>
            </div>
          </Card>

          {/* Audit integrity */}
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Audit trail protected
                </p>

                <p className="mt-1 text-xs leading-5 text-ink/40">
                  Document uploads, verification actions, views, downloads
                  and access changes are retained as part of the project
                  audit record.
                </p>
              </div>
            </div>
          </Card>

          {/* Time information */}
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5">
                <Clock3 className="h-4 w-4 text-ink/55" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  History tracking
                </p>

                <p className="mt-1 text-xs leading-5 text-ink/40">
                  All timestamps are recorded against the Build OS audit
                  system for traceability.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}