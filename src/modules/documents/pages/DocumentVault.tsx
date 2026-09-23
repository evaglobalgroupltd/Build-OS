import {
  CheckCircle2,
  ChevronRight,
  Download,
  FileCheck2,
  FileText,
  FolderOpen,
  LockKeyhole,
  Search,
  ShieldCheck,
  Upload,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

type DocumentStatus = 'Verified' | 'Pending Review' | 'Needs Information'

type DocumentItem = {
  id: string
  name: string
  category: string
  project: string
  projectId: string
  uploadedBy: string
  updatedAt: string
  size: string
  status: DocumentStatus
  version: string
}

const documents: DocumentItem[] = [
  {
    id: 'DOC-2026-00842',
    name: 'milestone-04-inspection-report.pdf',
    category: 'Inspection',
    project: 'Abuja Residential Development',
    projectId: 'PRJ-2026-00421',
    uploadedBy: 'Project Manager',
    updatedAt: '27 Aug 2026 · 09:36',
    size: '2.4 MB',
    status: 'Verified',
    version: 'v2.0',
  },
  {
    id: 'DOC-2026-00839',
    name: 'contractor-agreement.pdf',
    category: 'Contracts',
    project: 'Abuja Residential Development',
    projectId: 'PRJ-2026-00421',
    uploadedBy: 'Client / Diaspora Investor',
    updatedAt: '26 Aug 2026 · 14:20',
    size: '1.8 MB',
    status: 'Verified',
    version: 'v1.0',
  },
  {
    id: 'DOC-2026-00831',
    name: 'approved-building-drawings.pdf',
    category: 'Design',
    project: 'Abuja Residential Development',
    projectId: 'PRJ-2026-00421',
    uploadedBy: 'Professional Expert',
    updatedAt: '25 Aug 2026 · 11:42',
    size: '8.7 MB',
    status: 'Verified',
    version: 'v3.0',
  },
  {
    id: 'DOC-2026-00827',
    name: 'land-title-document.pdf',
    category: 'Land & Ownership',
    project: 'Abuja Residential Development',
    projectId: 'PRJ-2026-00421',
    uploadedBy: 'Client / Diaspora Investor',
    updatedAt: '24 Aug 2026 · 16:08',
    size: '3.2 MB',
    status: 'Pending Review',
    version: 'v1.0',
  },
  {
    id: 'DOC-2026-00816',
    name: 'material-delivery-evidence.zip',
    category: 'Procurement',
    project: 'Abuja Residential Development',
    projectId: 'PRJ-2026-00421',
    uploadedBy: 'Contractor',
    updatedAt: '23 Aug 2026 · 13:51',
    size: '18.7 MB',
    status: 'Verified',
    version: 'v1.0',
  },
  {
    id: 'DOC-2026-00802',
    name: 'site-progress-report.pdf',
    category: 'Reports',
    project: 'Abuja Residential Development',
    projectId: 'PRJ-2026-00421',
    uploadedBy: 'Project Manager',
    updatedAt: '21 Aug 2026 · 10:15',
    size: '4.1 MB',
    status: 'Needs Information',
    version: 'v1.0',
  },
]

const categories = [
  { label: 'All documents', count: documents.length },
  { label: 'Land & Ownership', count: 1 },
  { label: 'Contracts', count: 1 },
  { label: 'Design', count: 1 },
  { label: 'Inspection', count: 1 },
  { label: 'Procurement', count: 1 },
  { label: 'Reports', count: 1 },
]

const statusTone: Record<DocumentStatus, 'teal' | 'amber' | 'brick'> = {
  Verified: 'teal',
  'Pending Review': 'amber',
  'Needs Information': 'brick',
}

export function DocumentVault() {
  return (
    <div className="space-y-7">
      {/* ─────────────────────────────────────────────────────────────
          PAGE HEADER
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-[26px] border border-line bg-[#0B1220] shadow-[0_20px_55px_rgba(11,18,32,0.10)]">
        <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#1657FF]/20 blur-3xl" />
        <div className="absolute -bottom-32 right-24 h-64 w-64 rounded-full bg-[#34A6FF]/10 blur-3xl" />

        <div className="relative flex flex-col gap-7 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between lg:p-8">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                <FolderOpen className="h-4.5 w-4.5 text-white/80" />
              </div>

              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#34A6FF]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  Secure document management
                </span>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <h1 className="font-display text-3xl font-semibold tracking-[-0.035em] text-white sm:text-[34px]">
                Document Vault
              </h1>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#34A6FF]/20 bg-[#34A6FF]/10 px-2.5 py-1 text-[10px] font-semibold text-[#7FC5FF]">
                <ShieldCheck className="h-3 w-3" />
                Secure
              </span>
            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
              A centralised record system for ownership, contracts, design,
              procurement, inspections and project compliance.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] text-white/35">
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#34A6FF]" />
                {documents.length} active records
              </span>

              <span className="hidden h-3 w-px bg-white/10 sm:block" />

              <span>Role-based access</span>

              <span className="hidden h-3 w-px bg-white/10 sm:block" />

              <span>Full audit trail</span>
            </div>
          </div>

          <button
            type="button"
            className="group inline-flex w-fit shrink-0 items-center gap-2.5 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-[#0B1220] shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-0.5 hover:bg-[#F6F8FC]"
          >
            <Upload className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
            Upload document
          </button>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          VAULT METRICS
      ───────────────────────────────────────────────────────────── */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={FileText}
          label="Total documents"
          value="24"
          detail="Across all projects"
        />

        <SummaryCard
          icon={CheckCircle2}
          label="Verified"
          value="19"
          detail="Ready for project use"
          tone="teal"
        />

        <SummaryCard
          icon={FileCheck2}
          label="Pending review"
          value="3"
          detail="Awaiting verification"
          tone="amber"
        />

        <SummaryCard
          icon={ShieldCheck}
          label="Protected"
          value="100%"
          detail="Access-controlled storage"
          tone="blue"
        />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MAIN WORKSPACE
      ───────────────────────────────────────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)]">
        {/* Category navigation */}
        <Card className="h-fit overflow-hidden rounded-[22px]">
          <CardHeader
            title="Categories"
            subtitle="Organise your records"
          />

          <CardBody className="pt-1">
            <nav className="space-y-1" aria-label="Document categories">
              {categories.map((category, index) => (
                <button
                  key={category.label}
                  type="button"
                  className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all duration-200 ${
                    index === 0
                      ? 'bg-[#0B1220] text-white shadow-[0_7px_18px_rgba(11,18,32,0.12)]'
                      : 'text-ink/50 hover:bg-[#F6F8FC] hover:text-ink'
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    {index === 0 && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#34A6FF]" />
                    )}

                    <span className="truncate text-[11px] font-semibold">
                      {category.label}
                    </span>
                  </span>

                  <span
                    className={`ml-3 rounded-full px-2 py-0.5 font-mono text-[9px] ${
                      index === 0
                        ? 'bg-white/10 text-white/55'
                        : 'bg-[#F6F8FC] text-ink/30'
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              ))}
            </nav>

            <div className="mt-5 border-t border-line pt-5">
              <div className="rounded-2xl border border-[#1657FF]/10 bg-[#1657FF]/[0.035] p-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1657FF]/10">
                    <LockKeyhole className="h-3.5 w-3.5 text-[#1657FF]" />
                  </div>

                  <span className="text-[10px] font-semibold text-ink">
                    Protected vault
                  </span>
                </div>

                <p className="mt-2 text-[10px] leading-5 text-ink/40">
                  Access is governed by project role and recorded for
                  traceability.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Documents workspace */}
        <div className="min-w-0 space-y-5">
          {/* Search toolbar */}
          <Card className="overflow-hidden rounded-[22px]">
            <CardBody>
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="relative min-w-0 flex-1">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/25" />

                  <input
                    type="search"
                    placeholder="Search documents, projects or document IDs..."
                    aria-label="Search documents"
                    className="h-11 w-full rounded-xl border border-line bg-[#F6F8FC] pl-10 pr-4 text-xs font-medium text-ink outline-none transition placeholder:text-ink/25 focus:border-[#1657FF]/30 focus:bg-white focus:ring-4 focus:ring-[#1657FF]/[0.06]"
                  />
                </div>

                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 text-xs font-semibold text-ink/50 transition hover:border-ink/10 hover:bg-[#F6F8FC] hover:text-ink"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1657FF]" />
                  Filter
                </button>
              </div>
            </CardBody>
          </Card>

          {/* Document collection */}
          <Card className="overflow-hidden rounded-[22px]">
            <CardHeader
              title="Project documents"
              subtitle={`${documents.length} documents currently associated with your projects`}
            />

            <CardBody>
              <div className="space-y-2.5">
                {documents.map((document) => (
                  <DocumentRow
                    key={document.id}
                    document={document}
                  />
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECURITY FOOTER
      ───────────────────────────────────────────────────────────── */}
      <section className="overflow-hidden rounded-[22px] border border-[#1657FF]/10 bg-white shadow-[0_8px_30px_rgba(11,18,32,0.04)]">
        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1657FF]/[0.08]">
            <LockKeyhole className="h-5 w-5 text-[#1657FF]" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-ink">
                Your project records are protected
              </p>

              <span className="inline-flex items-center gap-1 rounded-full bg-[#1657FF]/[0.06] px-2 py-0.5 text-[9px] font-semibold text-[#1657FF]">
                <ShieldCheck className="h-2.5 w-2.5" />
                Protected
              </span>
            </div>

            <p className="mt-1 max-w-3xl text-xs leading-5 text-ink/40">
              Document access is role-based. Uploads, downloads, version
              changes, verification actions and access events are recorded
              in the project audit trail.
            </p>
          </div>

          <button
            type="button"
            className="group inline-flex w-fit shrink-0 items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold text-ink/45 transition hover:text-[#1657FF]"
          >
            View audit history
            <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </section>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   DOCUMENT ROW
───────────────────────────────────────────────────────────────────── */

function DocumentRow({
  document,
}: {
  document: DocumentItem
}) {
  return (
    <article className="group relative overflow-hidden rounded-[18px] border border-line bg-white p-4 transition-all duration-200 hover:-translate-y-[1px] hover:border-[#1657FF]/15 hover:shadow-[0_10px_28px_rgba(11,18,32,0.06)]">
      {/* Hover accent */}
      <div className="absolute inset-y-0 left-0 w-[2px] origin-bottom scale-y-0 bg-[#1657FF] transition-transform duration-200 group-hover:scale-y-100" />

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        {/* Identity */}
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-[#F6F8FC] transition-colors duration-200 group-hover:border-[#1657FF]/10 group-hover:bg-[#1657FF]/[0.05]">
            <FileText className="h-5 w-5 text-ink/40 transition-colors duration-200 group-hover:text-[#1657FF]" />

            {document.status === 'Verified' && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#1657FF]">
                <CheckCircle2 className="h-2.5 w-2.5 text-white" />
              </span>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="min-w-0 truncate text-xs font-semibold text-ink">
                {document.name}
              </p>

              <Badge tone={statusTone[document.status]}>
                {document.status}
              </Badge>
            </div>

            <p className="mt-1.5 truncate text-[10px] text-ink/35">
              {document.project}
            </p>

            <div className="mt-1.5 flex items-center gap-2">
              <span className="font-mono text-[9px] font-medium text-ink/30">
                {document.projectId}
              </span>

              <span className="h-0.5 w-0.5 rounded-full bg-ink/20" />

              <span className="font-mono text-[9px] font-medium text-ink/30">
                {document.id}
              </span>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4 xl:w-[500px]">
          <Meta
            label="Category"
            value={document.category}
          />

          <Meta
            label="Version"
            value={document.version}
            mono
            accent
          />

          <Meta
            label="Size"
            value={document.size}
          />

          <Meta
            label="Updated"
            value={document.updatedAt}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 border-t border-line pt-3 xl:border-0 xl:pt-0">
          <button
            type="button"
            className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-line bg-white px-3 text-[10px] font-semibold text-ink/50 transition hover:border-ink/10 hover:bg-[#F6F8FC] hover:text-ink sm:flex-none"
          >
            View
            <ChevronRight className="h-3 w-3" />
          </button>

          <button
            type="button"
            aria-label={`Download ${document.name}`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-ink/35 transition hover:border-[#1657FF]/15 hover:bg-[#1657FF]/[0.04] hover:text-[#1657FF]"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom metadata */}
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-line pt-3">
        <span className="text-[9px] uppercase tracking-[0.08em] text-ink/25">
          Uploaded by
        </span>

        <span className="text-[10px] font-semibold text-ink/50">
          {document.uploadedBy}
        </span>

        <span className="h-1 w-1 rounded-full bg-ink/15" />

        <span className="text-[9px] uppercase tracking-[0.08em] text-ink/25">
          Last updated
        </span>

        <span className="font-mono text-[9px] font-medium text-ink/40">
          {document.updatedAt}
        </span>
      </div>
    </article>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   METADATA
───────────────────────────────────────────────────────────────────── */

function Meta({
  label,
  value,
  mono = false,
  accent = false,
}: {
  label: string
  value: string
  mono?: boolean
  accent?: boolean
}) {
  return (
    <div className="min-w-0">
      <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-ink/25">
        {label}
      </p>

      <p
        className={`mt-1 truncate text-[10px] font-semibold ${
          accent ? 'text-[#1657FF]' : 'text-ink/55'
        } ${mono ? 'font-mono' : ''}`}
      >
        {value}
      </p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   SUMMARY CARD
───────────────────────────────────────────────────────────────────── */

function SummaryCard({
  icon: Icon,
  label,
  value,
  detail,
  tone = 'neutral',
}: {
  icon: typeof FileText
  label: string
  value: string
  detail: string
  tone?: 'neutral' | 'teal' | 'amber' | 'blue'
}) {
  const styles = {
    neutral: {
      icon: 'bg-[#F6F8FC] text-ink/50',
      glow: 'bg-ink/[0.025]',
    },
    teal: {
      icon: 'bg-emerald-500/10 text-emerald-600',
      glow: 'bg-emerald-500/[0.025]',
    },
    amber: {
      icon: 'bg-amber-500/10 text-amber-600',
      glow: 'bg-amber-500/[0.025]',
    },
    blue: {
      icon: 'bg-[#1657FF]/[0.08] text-[#1657FF]',
      glow: 'bg-[#1657FF]/[0.025]',
    },
  }

  const style = styles[tone]

  return (
    <Card className="group relative overflow-hidden rounded-[20px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(11,18,32,0.06)]">
      <div
        className={`absolute -right-10 -top-10 h-24 w-24 rounded-full blur-2xl ${style.glow}`}
      />

      <CardBody>
        <div className="relative flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-ink/30">
              {label}
            </p>

            <p className="mt-2 font-display text-[28px] font-semibold tracking-[-0.035em] text-ink">
              {value}
            </p>

            <p className="mt-1 text-[10px] text-ink/30">
              {detail}
            </p>
          </div>

          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.icon}`}
          >
            <Icon className="h-[17px] w-[17px]" />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}