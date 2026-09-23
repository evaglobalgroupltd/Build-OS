import {
  ArrowLeft,
  ArrowUpRight,
  Check,
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
    <div className="space-y-7 pb-10">
      {/* ===================================================== */}
      {/* Page header */}
      {/* ===================================================== */}

      <header>
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0">
            {/* Context */}
            <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">
                  Document vault
                </span>
              </div>

              <span className="h-3 w-px bg-ink/10" />

              <span className="font-mono text-[10px] font-medium text-ink/35">
                {document.id}
              </span>
            </div>

            {/* Title */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <h1 className="max-w-3xl font-display text-[30px] font-semibold leading-[1.05] tracking-[-0.04em] text-ink sm:text-[36px]">
                {document.name}
              </h1>

              <Badge tone={statusTone[document.status]}>
                {formatStatus(document.status)}
              </Badge>
            </div>

            {/* Project context */}
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-ink/45">
              <span>{document.typeLabel}</span>

              <span className="h-3 w-px bg-ink/10" />

              <span>{document.projectName}</span>

              <span className="h-3 w-px bg-ink/10" />

              <span>{document.version}</span>
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
            Back to documents
          </button>
        </div>
      </header>

      {/* ===================================================== */}
      {/* Verification banner */}
      {/* ===================================================== */}

      {document.status === 'verified' && (
        <section
          aria-label="Verification status"
          className="
            relative
            overflow-hidden
            rounded-[22px]
            border
            border-[#12613E]/15
            bg-[#12613E]/[0.035]
            px-5
            py-4
            shadow-[0_8px_30px_rgba(18,97,62,0.04)]
            sm:px-6
          "
        >
          <div className="absolute left-0 top-0 h-full w-1 bg-[#12613E]" />

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
              <CheckCircle2 className="h-[18px] w-[18px]" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[13px] font-bold text-ink">
                  Document verified
                </p>

                <span className="rounded-full bg-[#12613E]/[0.08] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#12613E]">
                  Trusted record
                </span>
              </div>

              <p className="mt-1 max-w-2xl text-[11px] leading-5 text-ink/50">
                This document passed the Build OS verification process and is
                available as verified project evidence.
              </p>
            </div>

            <div className="hidden shrink-0 text-right sm:block">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/30">
                Verified
              </p>

              <p className="mt-1 text-[11px] font-semibold text-ink/60">
                {document.verifiedDate}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ===================================================== */}
      {/* Main layout */}
      {/* ===================================================== */}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.65fr)]">
        {/* =================================================== */}
        {/* Main column */}
        {/* =================================================== */}

        <main className="min-w-0 space-y-5">
          {/* Document hero / preview */}
          <Card className="overflow-hidden">
            <div className="border-b border-ink/[0.07] px-5 py-5 sm:px-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink/35">
                    Document record
                  </p>

                  <h2 className="mt-1 font-display text-[19px] font-semibold tracking-[-0.025em] text-ink">
                    File overview
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden text-[10px] font-medium text-ink/35 sm:block">
                    {document.fileType} · {document.fileSize}
                  </span>

                  <button
                    type="button"
                    aria-label="More document actions"
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-ink/[0.08]
                      bg-white
                      text-ink/40
                      transition
                      hover:border-ink/15
                      hover:text-ink
                    "
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <CardBody className="p-5 sm:p-6">
              {/* Preview surface */}
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-ink/[0.07]
                  bg-[#F3F5F2]
                "
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(18,97,62,0.07),transparent_35%)]" />

                <div className="relative flex min-h-[265px] flex-col items-center justify-center px-6 py-10 text-center">
                  <div className="relative">
                    <div className="absolute -inset-3 rounded-[20px] bg-[#12613E]/[0.04] blur-xl" />

                    <div className="relative flex h-[82px] w-[68px] flex-col items-center justify-center rounded-[12px] border border-ink/[0.08] bg-white shadow-[0_12px_30px_rgba(20,40,30,0.09)]">
                      <div className="absolute right-0 top-0 h-5 w-5 rounded-bl-[6px] border-b border-l border-ink/[0.06] bg-[#F5F6F4]" />

                      <FileText className="h-7 w-7 text-ink/35" />

                      <span className="mt-1 text-[7px] font-black uppercase tracking-[0.1em] text-[#B85C12]">
                        PDF
                      </span>
                    </div>
                  </div>

                  <p className="mt-6 max-w-md truncate text-[13px] font-semibold text-ink">
                    {document.name}
                  </p>

                  <p className="mt-1 text-[11px] text-ink/40">
                    {document.fileType} · {document.fileSize} ·{' '}
                    {document.version}
                  </p>

                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    <button
                      type="button"
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-ink
                        px-4
                        py-2.5
                        text-[11px]
                        font-bold
                        text-white
                        shadow-[0_8px_20px_rgba(20,30,25,0.12)]
                        transition
                        hover:-translate-y-0.5
                        hover:opacity-90
                      "
                    >
                      <FileText className="h-3.5 w-3.5" />
                      View document
                    </button>

                    <button
                      type="button"
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-ink/[0.09]
                        bg-white
                        px-4
                        py-2.5
                        text-[11px]
                        font-bold
                        text-ink/65
                        transition
                        hover:-translate-y-0.5
                        hover:border-ink/20
                        hover:text-ink
                      "
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </button>
                  </div>
                </div>
              </div>

              {/* Metadata grid */}
              <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-ink/[0.07] bg-ink/[0.07] sm:grid-cols-2">
                <MetadataCell
                  label="Document type"
                  value={document.typeLabel}
                />

                <MetadataCell
                  label="Current version"
                  value={document.version}
                />

                <MetadataCell
                  label="Uploaded"
                  value={document.uploadedDate}
                />

                <MetadataCell
                  label="File size"
                  value={document.fileSize}
                />

                <MetadataCell
                  label="Access"
                  value={document.access}
                />

                <MetadataCell
                  label="Expiry"
                  value={document.expiresAt}
                />
              </div>

              {/* Description */}
              <div className="mt-6 border-t border-ink/[0.07] pt-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-ink/35">
                  Description
                </p>

                <p className="mt-2 max-w-3xl text-[13px] leading-6 text-ink/60">
                  {document.description}
                </p>
              </div>
            </CardBody>
          </Card>

          {/* ================================================= */}
          {/* Verification record */}
          {/* ================================================= */}

          <Card>
            <CardHeader
              title="Verification record"
              subtitle="Identity, review and verification information"
            />

            <CardBody className="p-5 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <VerificationCard
                  icon={StatusIcon}
                  label="Verification status"
                  value={formatStatus(document.status)}
                  tone="green"
                />

                <VerificationCard
                  icon={ShieldCheck}
                  label="Verified by"
                  value={document.verifiedBy}
                  tone="ink"
                />
              </div>

              <div className="mt-3 flex flex-col gap-4 rounded-2xl border border-[#12613E]/10 bg-[#12613E]/[0.025] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#12613E] shadow-sm">
                    <Check className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-[12px] font-semibold text-ink">
                      Verification completed
                    </p>

                    <p className="mt-0.5 text-[10px] text-ink/40">
                      {document.verifiedDate}
                    </p>
                  </div>
                </div>

                <Badge tone="teal">Verified</Badge>
              </div>
            </CardBody>
          </Card>

          {/* ================================================= */}
          {/* Version history */}
          {/* ================================================= */}

          <Card className="overflow-hidden">
            <CardHeader
              title="Version history"
              subtitle="Previous uploads and document changes"
            />

            <CardBody className="p-5 sm:p-6">
              <div className="relative">
                {/* Timeline rail */}
                <div className="absolute bottom-5 left-[17px] top-5 w-px bg-ink/[0.08]" />

                <div className="space-y-3">
                  {versions.map((version, index) => (
                    <div
                      key={version.version}
                      className="
                        relative
                        flex
                        gap-4
                        rounded-2xl
                        border
                        border-ink/[0.07]
                        bg-white
                        p-4
                        transition
                        duration-200
                        hover:border-ink/[0.12]
                        hover:shadow-[0_8px_25px_rgba(20,40,30,0.04)]
                      "
                    >
                      <div
                        className={[
                          'relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border',
                          index === 0
                            ? 'border-[#12613E]/15 bg-[#EAF4EE] text-[#12613E]'
                            : 'border-ink/[0.07] bg-[#F5F6F4] text-ink/40',
                        ].join(' ')}
                      >
                        <History className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-[12px] font-bold text-ink">
                              {version.version}
                            </p>

                            {index === 0 && (
                              <span className="rounded-full bg-[#12613E]/[0.08] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-[#12613E]">
                                Current
                              </span>
                            )}
                          </div>

                          <p className="font-mono text-[9px] text-ink/30">
                            {version.date}
                          </p>
                        </div>

                        <p className="mt-1 text-[10px] text-ink/40">
                          {version.uploadedBy} · {version.size}
                        </p>

                        <p className="mt-2 text-[11px] leading-5 text-ink/55">
                          {version.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </main>

        {/* =================================================== */}
        {/* Sidebar */}
        {/* =================================================== */}

        <aside className="min-w-0 space-y-5">
          {/* Document information */}
          <Card className="overflow-hidden">
            <div className="border-b border-ink/[0.07] px-5 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/[0.045] text-ink/50">
                  <FileCheck2 className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-ink/35">
                    Record
                  </p>

                  <h3 className="mt-0.5 font-display text-[17px] font-semibold text-ink">
                    Document information
                  </h3>
                </div>
              </div>
            </div>

            <CardBody className="space-y-4 p-5">
              <InfoRow label="Document ID" value={document.id} mono />
              <InfoRow label="Project ID" value={document.projectId} mono />
              <InfoRow label="Type" value={document.typeLabel} />
              <InfoRow label="Format" value={document.fileType} />
              <InfoRow label="Size" value={document.fileSize} />
              <InfoRow label="Version" value={document.version} />
            </CardBody>
          </Card>

          {/* Linked project */}
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3F5F2] text-ink/50">
                <FolderOpen className="h-[17px] w-[17px]" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/35">
                  Linked project
                </p>

                <p className="mt-1.5 text-[13px] font-semibold leading-5 text-ink">
                  {document.projectName}
                </p>

                <p className="mt-1 font-mono text-[9px] text-ink/30">
                  {document.projectId}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="
                group
                mt-5
                flex
                h-10
                w-full
                items-center
                justify-between
                rounded-xl
                border
                border-ink/[0.08]
                bg-white
                px-3.5
                text-[11px]
                font-semibold
                text-ink/60
                transition
                hover:border-ink/15
                hover:text-ink
              "
            >
              <span className="flex items-center gap-2">
                <FolderOpen className="h-3.5 w-3.5" />
                Open project
              </span>

              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </Card>

          {/* Ownership & access */}
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/[0.045] text-ink/50">
                <User className="h-[17px] w-[17px]" />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/35">
                  Ownership
                </p>

                <p className="mt-1.5 text-[13px] font-semibold text-ink">
                  {document.uploadedBy}
                </p>

                <p className="mt-1 text-[10px] leading-5 text-ink/40">
                  Uploaded on {document.uploadedDate}
                </p>
              </div>
            </div>

            <div className="mt-5 border-t border-ink/[0.07] pt-4">
              <div className="flex items-center gap-2">
                <LockKeyhole className="h-3.5 w-3.5 text-[#12613E]" />

                <span className="text-[11px] font-bold text-ink">
                  Access controlled
                </span>
              </div>

              <p className="mt-1.5 text-[10px] leading-5 text-ink/40">
                Visible to authorised participants associated with this
                project.
              </p>

              <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#F3F5F2] px-3 py-2.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#12613E]" />

                <span className="text-[10px] font-semibold text-ink/55">
                  {document.access}
                </span>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <Card className="overflow-hidden">
            <div className="bg-ink px-5 py-5 text-white">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/40">
                Workspace
              </p>

              <h3 className="mt-1 font-display text-[18px] font-semibold">
                Document actions
              </h3>

              <p className="mt-1.5 text-[10px] leading-5 text-white/50">
                Manage access and retrieve this project record.
              </p>
            </div>

            <div className="space-y-2 p-4">
              <button
                type="button"
                className="
                  flex
                  h-10
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-ink
                  text-[11px]
                  font-bold
                  text-white
                  transition
                  hover:bg-ink/90
                "
              >
                <FileText className="h-3.5 w-3.5" />
                View document
              </button>

              <button
                type="button"
                className="
                  flex
                  h-10
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-ink/[0.08]
                  bg-white
                  text-[11px]
                  font-bold
                  text-ink/60
                  transition
                  hover:border-ink/15
                  hover:text-ink
                "
              >
                <Download className="h-3.5 w-3.5" />
                Download copy
              </button>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  )
}

/* ============================================================= */
/* Supporting UI                                                  */
/* ============================================================= */

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
    <div className="flex items-start justify-between gap-5">
      <span className="shrink-0 text-[10px] font-medium text-ink/35">
        {label}
      </span>

      <span
        className={[
          'max-w-[62%] text-right text-[11px] font-semibold leading-5 text-ink/75',
          mono ? 'font-mono text-[9px]' : '',
        ].join(' ')}
      >
        {value}
      </span>
    </div>
  )
}

function MetadataCell({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="bg-white px-4 py-4">
      <p className="text-[9px] font-bold uppercase tracking-[0.11em] text-ink/30">
        {label}
      </p>

      <p className="mt-1.5 text-[11px] font-semibold leading-5 text-ink/75">
        {value}
      </p>
    </div>
  )
}

function VerificationCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof CheckCircle2
  label: string
  value: string
  tone: 'green' | 'ink'
}) {
  const iconClasses =
    tone === 'green'
      ? 'bg-[#EAF4EE] text-[#12613E]'
      : 'bg-[#F3F5F2] text-ink/50'

  return (
    <div className="rounded-2xl border border-ink/[0.07] bg-white p-4">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClasses}`}
        >
          <Icon className="h-[17px] w-[17px]" />
        </div>

        <div className="min-w-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/30">
            {label}
          </p>

          <p className="mt-1 truncate text-[12px] font-semibold text-ink">
            {value}
          </p>
        </div>
      </div>
    </div>
  )
}