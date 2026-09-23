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
  ArrowUpRight,
  ChevronDown,
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

  const verificationRate = Math.round(
    (verifiedCount / demoDocuments.length) * 100,
  )

  return (
    <div className="space-y-8 pb-8">

      {/* ================================================================ */}
      {/* Header                                                           */}
      {/* ================================================================ */}

      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

        <div className="max-w-2xl">

          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/35">
              Project vault
            </p>
          </div>

          <div className="flex items-start gap-4">

            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-ink/[0.07] bg-white shadow-[0_8px_24px_rgba(20,40,30,0.05)] sm:flex">
              <FolderOpen className="h-[19px] w-[19px] text-[#12613E]" />
            </div>

            <div>
              <h1 className="font-display text-[29px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[34px]">
                Project Documents
              </h1>

              <p className="mt-2 max-w-xl text-[12px] leading-5 text-ink/45 sm:text-[13px]">
                Your central record for land, design, approvals, contracts,
                procurement, monitoring and project evidence.
              </p>
            </div>

          </div>

        </div>

        <button
          type="button"
          className="
            group
            inline-flex
            h-11
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-ink
            px-5
            text-[11px]
            font-bold
            text-white
            shadow-[0_10px_25px_rgba(20,25,22,0.12)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:shadow-[0_14px_30px_rgba(20,25,22,0.16)]
          "
        >
          <Upload className="h-[14px] w-[14px] text-white/70 transition-transform duration-300 group-hover:-translate-y-0.5" />
          Upload document
        </button>

      </header>


      {/* ================================================================ */}
      {/* Document intelligence                                            */}
      {/* ================================================================ */}

      <section
        aria-label="Document overview"
        className="grid grid-cols-2 gap-3 xl:grid-cols-4"
      >

        <DocumentStat
          icon={FileText}
          label="Total documents"
          value={String(demoDocuments.length)}
          detail="Project records"
          index="01"
        />

        <DocumentStat
          icon={ShieldCheck}
          label="Verified"
          value={String(verifiedCount)}
          detail={`${verificationRate}% of project records`}
          tone="green"
          index="02"
        />

        <DocumentStat
          icon={FileCheck2}
          label="Required"
          value={String(requiredCount)}
          detail="Core project documents"
          index="03"
        />

        <DocumentStat
          icon={Eye}
          label="Pending review"
          value={String(pendingCount)}
          detail="Awaiting verification"
          tone={pendingCount > 0 ? 'amber' : 'default'}
          index="04"
        />

      </section>


      {/* ================================================================ */}
      {/* Document library                                                 */}
      {/* ================================================================ */}

      <Card className="overflow-hidden">

        {/* Library header */}

        <div className="border-b border-ink/[0.07] bg-white">

          <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/35">
                  Document library
                </p>

                <span className="h-1 w-1 rounded-full bg-ink/15" />

                <span className="text-[10px] font-medium text-ink/30">
                  Secure project record
                </span>
              </div>

              <h2 className="mt-1.5 font-display text-[19px] font-semibold tracking-[-0.025em] text-ink">
                Project archive
              </h2>
            </div>

            <span className="rounded-full border border-ink/[0.07] bg-[#F7F8F6] px-3 py-1.5 font-mono text-[9px] font-medium text-ink/40">
              {filteredDocuments.length} DOCUMENT
              {filteredDocuments.length === 1 ? '' : 'S'}
            </span>

          </div>


          {/* Search */}

          <div className="px-5 pb-4 sm:px-6">

            <div className="relative max-w-lg">

              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-ink/25" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by document, category or uploader..."
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-ink/[0.08]
                  bg-[#FAFBFA]
                  pl-10
                  pr-4
                  text-[11px]
                  text-ink
                  outline-none
                  transition
                  placeholder:text-ink/25
                  focus:border-[#12613E]/30
                  focus:bg-white
                  focus:ring-4
                  focus:ring-[#12613E]/5
                "
              />

            </div>

          </div>


          {/* Categories */}

          <div className="overflow-x-auto px-5 pb-5 sm:px-6">

            <div className="flex min-w-max gap-1.5">

              {categories.map((category) => {
                const active = activeCategory === category.id

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    className={[
                      'group relative whitespace-nowrap rounded-lg px-3.5 py-2 text-[10px] font-semibold transition-all duration-200',
                      active
                        ? 'bg-ink text-white shadow-[0_5px_14px_rgba(20,25,22,0.10)]'
                        : 'text-ink/40 hover:bg-ink/[0.045] hover:text-ink/75',
                    ].join(' ')}
                  >
                    {category.label}

                    {active && (
                      <span className="absolute inset-x-3 bottom-0.5 h-px rounded-full bg-white/30" />
                    )}
                  </button>
                )
              })}

            </div>

          </div>

        </div>


        {/* Documents */}

        <div className="divide-y divide-ink/[0.055]">

          {filteredDocuments.map((document) => (
            <DocumentRow
              key={document.id}
              document={document}
            />
          ))}

          {filteredDocuments.length === 0 && (
            <EmptyDocuments />
          )}

        </div>

      </Card>


      {/* ================================================================ */}
      {/* Digital Property Passport                                        */}
      {/* ================================================================ */}

      <section
        aria-label="Digital Property Passport"
        className="
          relative
          overflow-hidden
          rounded-[24px]
          bg-ink
          shadow-[0_18px_50px_rgba(20,25,22,0.14)]
        "
      >

        {/* Decorative architecture */}

        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-white/[0.055]" />
        <div className="pointer-events-none absolute -right-4 -top-12 h-52 w-52 rounded-full border border-white/[0.04]" />

        <div className="relative flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex max-w-3xl items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/[0.09] bg-white/[0.06]">
              <ShieldCheck className="h-[18px] w-[18px] text-white/75" />
            </div>

            <div>

              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">
                  Digital Property Passport
                </p>

                <span className="rounded-full border border-white/[0.08] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.08em] text-white/35">
                  Permanent record
                </span>
              </div>

              <h2 className="mt-2 font-display text-[21px] font-semibold tracking-[-0.025em] text-white">
                The complete history of your property.
              </h2>

              <p className="mt-2 max-w-2xl text-[11px] leading-5 text-white/45 sm:text-xs">
                Verified documents can become part of the property's
                permanent digital record — from land and design through
                construction, inspections, payments, warranties and handover.
              </p>

            </div>

          </div>

          <button
            type="button"
            className="
              group
              flex
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-white
              px-5
              py-3
              text-[10px]
              font-bold
              text-ink
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-white/95
              hover:shadow-[0_10px_25px_rgba(0,0,0,0.16)]
            "
          >
            View Property Passport
            <ArrowUpRight
              className="h-[13px] w-[13px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>

        </div>

      </section>


      {/* ================================================================ */}
      {/* Verification guidance                                            */}
      {/* ================================================================ */}

      <div className="flex items-start gap-3 rounded-2xl border border-ink/[0.065] bg-[#F8F9F7] p-4 sm:p-5">

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_3px_10px_rgba(20,40,30,0.04)]">
          <FileCheck2 className="h-[14px] w-[14px] text-[#12613E]/60" />
        </div>

        <div>

          <p className="text-[11px] font-semibold text-ink">
            Document verification
          </p>

          <p className="mt-1 max-w-4xl text-[10px] leading-5 text-ink/40 sm:text-[11px]">
            Uploaded project records retain their category, uploader,
            timestamp and verification status. Evidence remains linked to
            the relevant milestone, report, procurement record, payment or
            project event.
          </p>

        </div>

      </div>

    </div>
  )
}


/* -------------------------------------------------------------------------- */
/* Document row                                                               */
/* -------------------------------------------------------------------------- */

function DocumentRow({
  document,
}: {
  document: ProjectDocument
}) {
  return (
    <div
      className="
        group
        relative
        flex
        flex-col
        gap-4
        px-5
        py-5
        transition-all
        duration-200
        hover:bg-[#FAFBFA]
        sm:flex-row
        sm:items-center
        sm:px-6
      "
    >

      <div className="flex min-w-0 flex-1 items-start gap-4">

        {/* File icon */}

        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ink/[0.065] bg-white shadow-[0_4px_12px_rgba(20,40,30,0.035)]">

          <FileText className="h-[17px] w-[17px] text-ink/40" />

          <span className="absolute -bottom-1 -right-1 rounded-md border border-white bg-ink px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-[0.05em] text-white/80">
            {document.type}
          </span>

        </div>


        {/* Details */}

        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-2">

            <p className="truncate text-[11px] font-semibold text-ink sm:text-xs">
              {document.name}
            </p>

            {document.required && (
              <span className="rounded-full border border-ink/[0.06] bg-ink/[0.035] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.06em] text-ink/35">
                Required
              </span>
            )}

          </div>


          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] text-ink/30">

            <span className="capitalize">
              {document.category}
            </span>

            <span className="text-ink/15">•</span>

            <span>{document.size}</span>

            <span className="text-ink/15">•</span>

            <span>{document.uploadedAt}</span>

          </div>


          <p className="mt-1 text-[9px] text-ink/30">
            Uploaded by{' '}
            <span className="font-medium text-ink/45">
              {document.uploadedBy}
            </span>
          </p>

        </div>

      </div>


      {/* Actions */}

      <div className="flex items-center justify-between gap-4 sm:justify-end">

        <DocumentStatus status={document.status} />

        <div className="flex items-center gap-1 sm:opacity-40 sm:transition-opacity sm:group-hover:opacity-100">

          <button
            type="button"
            aria-label={`View ${document.name}`}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              text-ink/35
              transition
              hover:bg-white
              hover:text-ink
              hover:shadow-sm
            "
          >
            <Eye className="h-[14px] w-[14px]" />
          </button>

          <button
            type="button"
            aria-label={`Download ${document.name}`}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              text-ink/35
              transition
              hover:bg-white
              hover:text-ink
              hover:shadow-sm
            "
          >
            <Download className="h-[14px] w-[14px]" />
          </button>

        </div>

      </div>

    </div>
  )
}


/* -------------------------------------------------------------------------- */
/* Empty state                                                                */
/* -------------------------------------------------------------------------- */

function EmptyDocuments() {
  return (
    <div className="px-6 py-16 text-center">

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-ink/[0.06] bg-[#F7F8F6]">
        <File className="h-[18px] w-[18px] text-ink/25" />
      </div>

      <p className="mt-4 text-[12px] font-semibold text-ink">
        No documents found
      </p>

      <p className="mx-auto mt-1 max-w-xs text-[10px] leading-5 text-ink/35">
        Try another search term or select a different document category.
      </p>

    </div>
  )
}


/* -------------------------------------------------------------------------- */
/* Document stat                                                              */
/* -------------------------------------------------------------------------- */

function DocumentStat({
  icon: Icon,
  label,
  value,
  detail,
  tone = 'default',
  index,
}: {
  icon: React.ElementType
  label: string
  value: string
  detail: string
  tone?: 'default' | 'green' | 'amber'
  index: string
}) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-ink/[0.065]
        bg-white
        p-4
        shadow-[0_5px_18px_rgba(20,40,30,0.025)]
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_12px_28px_rgba(20,40,30,0.06)]
      "
    >

      <div className="flex items-start justify-between">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5F7F4]">
          <Icon
            className={[
              'h-[15px] w-[15px]',
              tone === 'green'
                ? 'text-[#12613E]'
                : tone === 'amber'
                  ? 'text-[#B85C12]'
                  : 'text-ink/35',
            ].join(' ')}
          />
        </div>

        <span className="font-mono text-[8px] tracking-[0.08em] text-ink/20">
          {index}
        </span>

      </div>


      <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.12em] text-ink/35">
        {label}
      </p>

      <p
        className={[
          'mt-1 font-display text-[25px] font-semibold tracking-[-0.035em]',
          tone === 'green'
            ? 'text-[#12613E]'
            : tone === 'amber'
              ? 'text-[#B85C12]'
              : 'text-ink',
        ].join(' ')}
      >
        {value}
      </p>

      <p className="mt-0.5 text-[9px] text-ink/30">
        {detail}
      </p>

      {/* Subtle bottom accent */}

      <div
        className={[
          'absolute bottom-0 left-4 right-4 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100',
          tone === 'green'
            ? 'bg-[#12613E]/20'
            : tone === 'amber'
              ? 'bg-[#B85C12]/20'
              : 'bg-ink/10',
        ].join(' ')}
      />

    </div>
  )
}


/* -------------------------------------------------------------------------- */
/* Document status                                                            */
/* -------------------------------------------------------------------------- */

function DocumentStatus({
  status,
}: {
  status: DocumentStatus
}) {
  if (status === 'verified') {
    return (
      <Badge tone="teal">
        <span className="inline-flex items-center gap-1.5">
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#12613E]/10">
            <CheckCircle2 className="h-[9px] w-[9px]" />
          </span>

          Verified
        </span>
      </Badge>
    )
  }

  if (status === 'pending_review') {
    return (
      <Badge tone="amber">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />
          Pending review
        </span>
      </Badge>
    )
  }

  return (
    <Badge tone="brick">
      Rejected
    </Badge>
  )
}