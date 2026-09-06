import { useMemo, useState } from 'react'
import {
  CheckCircle2,
  Download,
  Eye,
  File,
  FileCheck2,
  FileText,
  FolderOpen,
  Search,
  ShieldCheck,
  Upload,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

type DocumentCategory =
  | 'land'
  | 'design'
  | 'approvals'
  | 'contracts'
  | 'procurement'
  | 'monitoring'
  | 'payments'
  | 'warranties'
  | 'handover'

type DocumentStatus = 'verified' | 'pending_review' | 'rejected'

type ProjectDocument = {
  id: string
  name: string
  category: DocumentCategory
  type: string
  size: string
  uploadedBy: string
  uploadedAt: string
  status: DocumentStatus
  required?: boolean
}

const categories: {
  id: 'all' | DocumentCategory
  label: string
}[] = [
  { id: 'all', label: 'All documents' },
  { id: 'land', label: 'Land' },
  { id: 'design', label: 'Design' },
  { id: 'approvals', label: 'Approvals' },
  { id: 'contracts', label: 'Contracts' },
  { id: 'procurement', label: 'Procurement' },
  { id: 'monitoring', label: 'Monitoring' },
  { id: 'payments', label: 'Payments' },
  { id: 'warranties', label: 'Warranties' },
  { id: 'handover', label: 'Handover' },
]

const demoDocuments: ProjectDocument[] = [
  {
    id: 'DOC-001',
    name: 'Survey Plan.pdf',
    category: 'land',
    type: 'PDF',
    size: '2.4 MB',
    uploadedBy: 'Project Manager',
    uploadedAt: '20 Aug 2026',
    status: 'verified',
    required: true,
  },
  {
    id: 'DOC-002',
    name: 'Title Documents.pdf',
    category: 'land',
    type: 'PDF',
    size: '4.1 MB',
    uploadedBy: 'Project Manager',
    uploadedAt: '20 Aug 2026',
    status: 'verified',
    required: true,
  },
  {
    id: 'DOC-003',
    name: 'Approved Architectural Drawings.pdf',
    category: 'design',
    type: 'PDF',
    size: '8.6 MB',
    uploadedBy: 'Architect',
    uploadedAt: '22 Aug 2026',
    status: 'verified',
    required: true,
  },
  {
    id: 'DOC-004',
    name: 'Building Approval.pdf',
    category: 'approvals',
    type: 'PDF',
    size: '1.8 MB',
    uploadedBy: 'Project Manager',
    uploadedAt: '23 Aug 2026',
    status: 'verified',
    required: true,
  },
  {
    id: 'DOC-005',
    name: 'Construction Contract.pdf',
    category: 'contracts',
    type: 'PDF',
    size: '3.2 MB',
    uploadedBy: 'Project Manager',
    uploadedAt: '24 Aug 2026',
    status: 'verified',
    required: true,
  },
  {
    id: 'DOC-006',
    name: 'BOQ.xlsx',
    category: 'procurement',
    type: 'XLSX',
    size: '486 KB',
    uploadedBy: 'Quantity Surveyor',
    uploadedAt: '24 Aug 2026',
    status: 'verified',
    required: true,
  },
  {
    id: 'DOC-007',
    name: 'Weekly Progress Report — Week 6.pdf',
    category: 'monitoring',
    type: 'PDF',
    size: '2.7 MB',
    uploadedBy: 'Project Manager',
    uploadedAt: '28 Aug 2026',
    status: 'verified',
  },
  {
    id: 'DOC-008',
    name: 'Block Work Site Evidence.zip',
    category: 'monitoring',
    type: 'ZIP',
    size: '18.2 MB',
    uploadedBy: 'Site Team',
    uploadedAt: '29 Aug 2026',
    status: 'pending_review',
  },
  {
    id: 'DOC-009',
    name: 'Milestone Payment Record.pdf',
    category: 'payments',
    type: 'PDF',
    size: '1.1 MB',
    uploadedBy: 'Finance',
    uploadedAt: '29 Aug 2026',
    status: 'verified',
  },
]

export function ProjectDocuments() {
  const [activeCategory, setActiveCategory] = useState<
    'all' | DocumentCategory
  >('all')
  const [search, setSearch] = useState('')

  const filteredDocuments = useMemo(() => {
    const query = search.trim().toLowerCase()

    return demoDocuments.filter((document) => {
      const matchesCategory =
        activeCategory === 'all' || document.category === activeCategory

      const matchesSearch =
        !query ||
        document.name.toLowerCase().includes(query) ||
        document.uploadedBy.toLowerCase().includes(query) ||
        document.category.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, search])

  const verifiedCount = demoDocuments.filter(
    (document) => document.status === 'verified',
  ).length

  const pendingCount = demoDocuments.filter(
    (document) => document.status === 'pending_review',
  ).length

  const requiredCount = demoDocuments.filter(
    (document) => document.required,
  ).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
              <FolderOpen className="h-5 w-5 text-ink/50" />
            </div>

            <div>
              <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
                Project Documents
              </h1>

              <p className="mt-1 text-sm text-ink/45">
                Project records, evidence, approvals and supporting documents.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white"
        >
          <Upload className="h-4 w-4" />
          Upload document
        </button>
      </div>

      {/* Document status */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DocumentStat
          icon={FileText}
          label="Total documents"
          value={String(demoDocuments.length)}
          detail="Project records"
        />

        <DocumentStat
          icon={ShieldCheck}
          label="Verified"
          value={String(verifiedCount)}
          detail="Approved records"
        />

        <DocumentStat
          icon={FileCheck2}
          label="Required"
          value={String(requiredCount)}
          detail="Core project documents"
        />

        <DocumentStat
          icon={Eye}
          label="Pending review"
          value={String(pendingCount)}
          detail="Awaiting verification"
          tone={pendingCount > 0 ? 'amber' : 'default'}
        />
      </div>

      {/* Document controls */}
      <Card>
        <div className="border-b border-line p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search documents..."
                className="h-10 w-full rounded-lg border border-line bg-white pl-9 pr-3 text-xs text-ink outline-none placeholder:text-ink/30 focus:border-ink/30"
              />
            </div>

            <span className="font-mono text-[10px] text-ink/35">
              {filteredDocuments.length} document
              {filteredDocuments.length === 1 ? '' : 's'}
            </span>
          </div>

          {/* Categories */}
          <div className="mt-4 flex gap-1 overflow-x-auto pb-1">
            {categories.map((category) => {
              const active = activeCategory === category.id

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={[
                    'whitespace-nowrap rounded-lg px-3 py-2 text-[11px] font-semibold transition-colors',
                    active
                      ? 'bg-ink text-white'
                      : 'text-ink/45 hover:bg-ink/5 hover:text-ink',
                  ].join(' ')}
                >
                  {category.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Documents */}
        <div className="divide-y divide-line">
          {filteredDocuments.map((document) => (
            <DocumentRow
              key={document.id}
              document={document}
            />
          ))}

          {filteredDocuments.length === 0 && (
            <div className="px-6 py-12 text-center">
              <File className="mx-auto h-6 w-6 text-ink/20" />

              <p className="mt-3 text-sm font-semibold text-ink">
                No documents found
              </p>

              <p className="mt-1 text-xs text-ink/40">
                Try another search term or document category.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Digital Property Passport */}
      <div className="rounded-xl border border-line bg-ink p-5 text-white">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
              <ShieldCheck className="h-5 w-5 text-white/70" />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                Digital Property Passport
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold">
                Permanent project record
              </h2>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-white/50">
                Documents and verified records can form part of the property's
                permanent digital record, including design, approvals,
                construction, inspections, payments, warranties and handover.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="shrink-0 rounded-lg bg-white px-4 py-2.5 text-[11px] font-semibold text-ink"
          >
            View Property Passport
          </button>
        </div>
      </div>

      {/* Upload guidance */}
      <div className="rounded-xl border border-line bg-paper-2 p-4">
        <div className="flex items-start gap-3">
          <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-ink/35" />

          <div>
            <p className="text-xs font-semibold text-ink">
              Document verification
            </p>

            <p className="mt-1 text-xs leading-5 text-ink/45">
              Uploaded project records should retain their category,
              uploader, timestamp and verification status. Documents used as
              project evidence should remain linked to the relevant milestone,
              report, procurement record, payment or project event.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Document row                                                                */
/* -------------------------------------------------------------------------- */

function DocumentRow({
  document,
}: {
  document: ProjectDocument
}) {
  return (
    <div className="group flex flex-col gap-4 p-4 transition-colors hover:bg-ink/[0.015] sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink/5">
          <FileText className="h-4 w-4 text-ink/45" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-xs font-semibold text-ink">
              {document.name}
            </p>

            {document.required && (
              <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[9px] font-semibold text-ink/40">
                Required
              </span>
            )}
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-ink/35">
            <span>{document.category}</span>
            <span>·</span>
            <span>{document.type}</span>
            <span>·</span>
            <span>{document.size}</span>
            <span>·</span>
            <span>{document.uploadedAt}</span>
          </div>

          <p className="mt-1 text-[10px] text-ink/30">
            Uploaded by {document.uploadedBy}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <DocumentStatus status={document.status} />

        <div className="flex items-center gap-1 opacity-70 sm:opacity-0 sm:group-hover:opacity-100">
          <button
            type="button"
            aria-label={`View ${document.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink/40 hover:bg-ink/5 hover:text-ink"
          >
            <Eye className="h-4 w-4" />
          </button>

          <button
            type="button"
            aria-label={`Download ${document.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink/40 hover:bg-ink/5 hover:text-ink"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Shared components                                                           */
/* -------------------------------------------------------------------------- */

function DocumentStat({
  icon: Icon,
  label,
  value,
  detail,
  tone = 'default',
}: {
  icon: React.ElementType
  label: string
  value: string
  detail: string
  tone?: 'default' | 'amber'
}) {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
          {label}
        </span>

        <Icon className="h-4 w-4 text-ink/30" />
      </div>

      <p
        className={[
          'mt-3 font-display text-xl font-semibold',
          tone === 'amber' ? 'text-amber-700' : 'text-ink',
        ].join(' ')}
      >
        {value}
      </p>

      <p className="mt-1 text-[10px] text-ink/35">{detail}</p>
    </div>
  )
}

function DocumentStatus({
  status,
}: {
  status: DocumentStatus
}) {
  if (status === 'verified') {
    return (
      <Badge tone="teal">
        <span className="inline-flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Verified
        </span>
      </Badge>
    )
  }

  if (status === 'pending_review') {
    return <Badge tone="amber">Pending review</Badge>
  }

  return <Badge tone="brick">Rejected</Badge>
}