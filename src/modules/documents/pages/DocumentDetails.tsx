import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  FolderOpen,
  History,
  LockKeyhole,
  MoreHorizontal,
  ShieldCheck,
  User,
  XCircle,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

type DocumentStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'verified'
  | 'rejected'
  | 'expired'

type DocumentType =
  | 'identity'
  | 'ownership'
  | 'contract'
  | 'licence'
  | 'inspection'
  | 'financial'
  | 'project'
  | 'other'

interface DocumentVersion {
  version: string
  uploadedBy: string
  date: string
  size: string
  note: string
}

const statusTone = {
  draft: 'neutral',
  submitted: 'amber',
  under_review: 'amber',
  verified: 'teal',
  rejected: 'brick',
  expired: 'brick',
} as const

function formatStatus(status: DocumentStatus) {
  return status
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function getStatusIcon(status: DocumentStatus) {
  switch (status) {
    case 'verified':
      return CheckCircle2
    case 'rejected':
      return XCircle
    case 'expired':
      return Clock3
    case 'under_review':
    case 'submitted':
      return ShieldCheck
    default:
      return FileText
  }
}

export function DocumentDetails() {
  const document = {
    id: 'DOC-2026-00842',
    name: 'milestone-04-inspection-report.pdf',
    type: 'inspection' as DocumentType,
    typeLabel: 'Inspection Report',
    status: 'verified' as DocumentStatus,
    projectId: 'PRJ-2026-00421',
    projectName: 'Abuja Residential Development',
    uploadedBy: 'Project Manager',
    uploadedDate: '27 August 2026 · 09:36',
    verifiedDate: '27 August 2026 · 10:12',
    verifiedBy: 'Build OS Verification Team',
    fileSize: '2.4 MB',
    fileType: 'PDF',
    version: 'v2.0',
    description:
      'Site inspection report documenting the physical progress and quality assessment of Milestone 04 — Internal Finishing.',
    access: 'Project participants',
    expiresAt: '27 August 2027',
  }

  const versions: DocumentVersion[] = [
    {
      version: 'v2.0',
      uploadedBy: 'Project Manager',
      date: '27 Aug 2026 · 09:36',
      size: '2.4 MB',
      note: 'Updated inspection findings and supporting photographs.',
    },
    {
      version: 'v1.0',
      uploadedBy: 'Project Manager',
      date: '26 Aug 2026 · 16:20',
      size: '1.9 MB',
      note: 'Initial inspection report.',
    },
  ]

  const StatusIcon = getStatusIcon(document.status)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <FileText className="h-5 w-5 text-ink/60" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Document management
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Document Details
            </h1>

            <Badge tone={statusTone[document.status]}>
              {formatStatus(document.status)}
            </Badge>
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
          Back to documents
        </button>
      </div>

      {/* Verification banner */}
      {document.status === 'verified' && (
        <div className="flex gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

          <div>
            <p className="text-sm font-semibold text-ink">
              Document verified
            </p>

            <p className="mt-1 text-xs leading-5 text-ink/50">
              This document passed the Build OS verification process and can
              be used as project evidence.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Document overview */}
          <Card className="overflow-hidden">
            <CardHeader
              title={document.name}
              subtitle="Document information and verification record"
            />

            <CardBody>
              <div className="flex flex-col gap-5 rounded-2xl border border-line bg-paper-2 p-5 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <FileText className="h-8 w-8 text-ink/45" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">
                    {document.name}
                  </p>

                  <p className="mt-1 text-xs text-ink/40">
                    {document.fileType} · {document.fileSize} ·{' '}
                    {document.version}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-lg bg-ink px-3 py-2 text-[11px] font-semibold text-white transition hover:bg-ink/90"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      View document
                    </button>

                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-[11px] font-semibold text-ink/60 transition hover:text-ink"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </button>

                    <button
                      type="button"
                      aria-label="More document actions"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-white text-ink/45 transition hover:text-ink"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <InfoRow
                  label="Document type"
                  value={document.typeLabel}
                />

                <InfoRow
                  label="Current version"
                  value={document.version}
                />

                <InfoRow
                  label="Uploaded"
                  value={document.uploadedDate}
                />

                <InfoRow
                  label="File size"
                  value={document.fileSize}
                />

                <InfoRow
                  label="Access"
                  value={document.access}
                />

                <InfoRow
                  label="Expiry"
                  value={document.expiresAt}
                />
              </div>

              <div className="mt-6 border-t border-line pt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Description
                </p>

                <p className="mt-2 text-sm leading-7 text-ink/65">
                  {document.description}
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Verification */}
          <Card>
            <CardHeader
              title="Verification record"
              subtitle="Identity, review and verification information"
            />

            <CardBody>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-line bg-paper-2 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                      <StatusIcon className="h-5 w-5 text-emerald-600" />
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                        Verification status
                      </p>

                      <p className="mt-1 text-sm font-semibold text-ink">
                        {formatStatus(document.status)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-line bg-paper-2 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                      <ShieldCheck className="h-5 w-5 text-ink/50" />
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                        Verified by
                      </p>

                      <p className="mt-1 text-sm font-semibold text-ink">
                        {document.verifiedBy}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-line bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-ink">
                      Verification completed
                    </p>

                    <p className="mt-1 text-[11px] text-ink/40">
                      {document.verifiedDate}
                    </p>
                  </div>

                  <Badge tone="teal">Verified</Badge>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Version history */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Version history"
              subtitle="Previous uploads and document changes"
            />

            <CardBody>
              <div className="space-y-3">
                {versions.map((version, index) => (
                  <div
                    key={version.version}
                    className="flex gap-3 rounded-xl border border-line bg-paper-2 p-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                      <History className="h-4 w-4 text-ink/45" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-ink">
                          {version.version}
                          {index === 0 && (
                            <span className="ml-2 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
                              Current
                            </span>
                          )}
                        </p>

                        <p className="font-mono text-[10px] text-ink/30">
                          {version.date}
                        </p>
                      </div>

                      <p className="mt-1 text-[11px] text-ink/45">
                        {version.uploadedBy} · {version.size}
                      </p>

                      <p className="mt-2 text-xs leading-5 text-ink/55">
                        {version.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* File metadata */}
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
              Document information
            </p>

            <div className="mt-5 space-y-4">
              <InfoRow label="Document ID" value={document.id} mono />
              <InfoRow label="Project ID" value={document.projectId} mono />
              <InfoRow label="Type" value={document.typeLabel} />
              <InfoRow label="Format" value={document.fileType} />
              <InfoRow label="Size" value={document.fileSize} />
              <InfoRow label="Version" value={document.version} />
            </div>
          </Card>

          {/* Linked project */}
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5">
                <FolderOpen className="h-4 w-4 text-ink/55" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/40">
                  Linked project
                </p>

                <p className="mt-1 truncate text-sm font-semibold text-ink">
                  {document.projectName}
                </p>

                <p className="mt-1 font-mono text-[10px] text-ink/35">
                  {document.projectId}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-line bg-white text-xs font-semibold text-ink/60 transition hover:text-ink"
            >
              <FolderOpen className="h-4 w-4" />
              Open project
            </button>
          </Card>

          {/* Ownership & access */}
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5">
                <User className="h-4 w-4 text-ink/55" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/40">
                  Uploaded by
                </p>

                <p className="mt-1 text-sm font-semibold text-ink">
                  {document.uploadedBy}
                </p>

                <p className="mt-1 text-[11px] leading-5 text-ink/40">
                  Uploaded on {document.uploadedDate}
                </p>
              </div>
            </div>

            <div className="mt-5 border-t border-line pt-4">
              <div className="flex items-center gap-2">
                <LockKeyhole className="h-3.5 w-3.5 text-ink/40" />

                <span className="text-xs font-semibold text-ink">
                  Access controlled
                </span>
              </div>

              <p className="mt-1 text-[11px] leading-5 text-ink/40">
                Visible to authorised participants associated with this
                project.
              </p>
            </div>
          </Card>

          {/* Administrative actions */}
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5">
                <FileCheck2 className="h-4 w-4 text-ink/55" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Document actions
                </p>

                <p className="mt-1 text-xs leading-5 text-ink/40">
                  Manage verification, access and document records.
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <button
                type="button"
                className="flex h-10 w-full items-center justify-center rounded-xl bg-ink text-xs font-semibold text-white transition hover:bg-ink/90"
              >
                View document
              </button>

              <button
                type="button"
                className="flex h-10 w-full items-center justify-center rounded-xl border border-line bg-white text-xs font-semibold text-ink/60 transition hover:text-ink"
              >
                Download copy
              </button>
            </div>
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