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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <FolderOpen className="h-5 w-5 text-ink/60" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Documents
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Document Vault
            </h1>

            <Badge tone="teal">Secure</Badge>
          </div>

          <p className="mt-1 max-w-2xl text-sm text-ink/50">
            Centralised storage for project, ownership, contract, procurement,
            inspection and compliance records.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-ink/90"
        >
          <Upload className="h-4 w-4" />
          Upload document
        </button>
      </div>

      {/* Vault summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* Categories */}
        <Card className="h-fit">
          <CardHeader
            title="Categories"
            subtitle="Organise your records"
          />

          <CardBody>
            <div className="space-y-1">
              {categories.map((category, index) => (
                <button
                  key={category.label}
                  type="button"
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition ${
                    index === 0
                      ? 'bg-ink text-white'
                      : 'text-ink/55 hover:bg-paper-2 hover:text-ink'
                  }`}
                >
                  <span className="text-xs font-semibold">
                    {category.label}
                  </span>

                  <span
                    className={`font-mono text-[10px] ${
                      index === 0 ? 'text-white/60' : 'text-ink/30'
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Documents */}
        <div className="min-w-0 space-y-6">
          {/* Search */}
          <Card>
            <CardBody>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative min-w-0 flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />

                  <input
                    type="search"
                    placeholder="Search documents, projects or document IDs..."
                    className="h-10 w-full rounded-xl border border-line bg-paper-2 pl-10 pr-4 text-xs text-ink outline-none placeholder:text-ink/30 focus:border-ink/20 focus:ring-2 focus:ring-ink/5"
                  />
                </div>

                <button
                  type="button"
                  className="h-10 rounded-xl border border-line bg-white px-4 text-xs font-semibold text-ink/55 transition hover:text-ink"
                >
                  Filter
                </button>
              </div>
            </CardBody>
          </Card>

          {/* Document list */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Project documents"
              subtitle={`${documents.length} documents currently associated with your projects`}
            />

            <CardBody>
              <div className="space-y-2">
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

      {/* Security notice */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
              <LockKeyhole className="h-5 w-5 text-emerald-600" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-ink">
                Your project records are protected
              </p>

              <p className="mt-1 text-xs leading-5 text-ink/45">
                Document access is role-based. Uploads, downloads, version
                changes, verification actions and access events are recorded
                in the project audit trail.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-ink/50 transition hover:text-ink"
            >
              View audit history
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function DocumentRow({
  document,
}: {
  document: DocumentItem
}) {
  return (
    <div className="group rounded-2xl border border-line bg-white p-4 transition hover:border-ink/10 hover:bg-paper-2/60">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paper-2">
            <FileText className="h-5 w-5 text-ink/45" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-xs font-semibold text-ink">
                {document.name}
              </p>

              <Badge tone={statusTone[document.status]}>
                {document.status}
              </Badge>
            </div>

            <p className="mt-1 truncate text-[11px] text-ink/40">
              {document.project} · {document.projectId}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4 xl:w-[520px]">
          <Meta label="Category" value={document.category} />

          <Meta label="Version" value={document.version} mono />

          <Meta label="Size" value={document.size} />

          <Meta label="Updated" value={document.updatedAt} />
        </div>

        <div className="flex items-center gap-2 xl:ml-auto">
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-white px-3 text-[11px] font-semibold text-ink/50 transition hover:text-ink"
          >
            View
          </button>

          <button
            type="button"
            aria-label={`Download ${document.name}`}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-ink/45 transition hover:text-ink"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line pt-3">
        <span className="text-[10px] text-ink/35">
          Document ID
        </span>

        <span className="font-mono text-[10px] font-semibold text-ink/50">
          {document.id}
        </span>

        <span className="h-1 w-1 rounded-full bg-ink/20" />

        <span className="text-[10px] text-ink/35">
          Uploaded by
        </span>

        <span className="text-[10px] font-semibold text-ink/50">
          {document.uploadedBy}
        </span>
      </div>
    </div>
  )
}

function Meta({
  label,
  value,
  mono = false,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="min-w-0">
      <p className="text-[9px] uppercase tracking-wide text-ink/30">
        {label}
      </p>

      <p
        className={`mt-1 truncate text-[10px] font-semibold text-ink/60 ${
          mono ? 'font-mono' : ''
        }`}
      >
        {value}
      </p>
    </div>
  )
}

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
  tone?: 'neutral' | 'teal' | 'amber'
}) {
  const iconClass =
    tone === 'teal'
      ? 'bg-emerald-500/10 text-emerald-600'
      : tone === 'amber'
        ? 'bg-amber-500/10 text-amber-600'
        : 'bg-ink/5 text-ink/55'

  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
              {label}
            </p>

            <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
              {value}
            </p>

            <p className="mt-1 text-[10px] text-ink/35">
              {detail}
            </p>
          </div>

          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconClass}`}
          >
            <Icon className="h-4 w-4" />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}