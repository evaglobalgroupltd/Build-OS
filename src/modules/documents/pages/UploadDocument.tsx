import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  File,
  FileText,
  FolderOpen,
  LockKeyhole,
  ShieldCheck,
  UploadCloud,
  X,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const documentCategories = [
  'Land & Ownership',
  'Contracts',
  'Design',
  'Approvals',
  'Procurement',
  'Inspection',
  'Reports',
  'Payments',
  'Insurance',
  'Warranties',
  'Other',
]

const projects = [
  {
    id: 'PRJ-2026-00421',
    name: 'Abuja Residential Development',
  },
  {
    id: 'PRJ-2026-00387',
    name: 'Lagos Commercial Development',
  },
]

export function UploadDocument() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <UploadCloud className="h-5 w-5 text-ink/60" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Document management
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Upload Document
            </h1>

            <Badge tone="neutral">New document</Badge>
          </div>

          <p className="mt-1 max-w-2xl text-sm text-ink/50">
            Add project, ownership, contract, procurement, inspection or
            compliance records to your secure document vault.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink/60 transition hover:bg-ink/[0.02] hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to vault
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Main form */}
        <div className="space-y-6">
          <Card>
            <CardHeader
              title="Document information"
              subtitle="Tell Build OS how this document should be classified and stored"
            />

            <CardBody>
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Project */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="project"
                    className="text-xs font-semibold text-ink"
                  >
                    Project
                  </label>

                  <p className="mt-1 text-[11px] text-ink/40">
                    Associate the document with the relevant Build OS project.
                  </p>

                  <div className="relative mt-2">
                    <FolderOpen className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />

                    <select
                      id="project"
                      defaultValue={projects[0].id}
                      className="h-11 w-full appearance-none rounded-xl border border-line bg-paper-2 pl-10 pr-4 text-xs font-medium text-ink outline-none focus:border-ink/20 focus:ring-2 focus:ring-ink/5"
                    >
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name} · {project.id}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="text-xs font-semibold text-ink"
                  >
                    Document category
                  </label>

                  <p className="mt-1 text-[11px] text-ink/40">
                    Select the category that best describes the record.
                  </p>

                  <select
                    id="category"
                    defaultValue=""
                    className="mt-2 h-11 w-full rounded-xl border border-line bg-paper-2 px-3 text-xs font-medium text-ink outline-none focus:border-ink/20 focus:ring-2 focus:ring-ink/5"
                  >
                    <option value="" disabled>
                      Select category
                    </option>

                    {documentCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Document name */}
                <div>
                  <label
                    htmlFor="document-name"
                    className="text-xs font-semibold text-ink"
                  >
                    Document name
                  </label>

                  <p className="mt-1 text-[11px] text-ink/40">
                    Use a clear and recognisable document name.
                  </p>

                  <input
                    id="document-name"
                    type="text"
                    placeholder="e.g. Approved Building Drawings"
                    className="mt-2 h-11 w-full rounded-xl border border-line bg-paper-2 px-3 text-xs text-ink outline-none placeholder:text-ink/30 focus:border-ink/20 focus:ring-2 focus:ring-ink/5"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="text-xs font-semibold text-ink"
                  >
                    Description
                  </label>

                  <p className="mt-1 text-[11px] text-ink/40">
                    Optional context to help authorised users understand the
                    document.
                  </p>

                  <textarea
                    id="description"
                    rows={4}
                    placeholder="Briefly describe what this document contains..."
                    className="mt-2 w-full resize-none rounded-xl border border-line bg-paper-2 px-3 py-3 text-xs leading-5 text-ink outline-none placeholder:text-ink/30 focus:border-ink/20 focus:ring-2 focus:ring-ink/5"
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Upload */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Select document"
              subtitle="Upload a PDF, image, spreadsheet, archive or other supported project record"
            />

            <CardBody>
              <label
                htmlFor="document-file"
                className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-ink/15 bg-paper-2 px-6 py-12 text-center transition hover:border-ink/25 hover:bg-ink/[0.02]"
              >
                <input
                  id="document-file"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png,.zip"
                />

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-line">
                  <UploadCloud className="h-6 w-6 text-ink/45 transition group-hover:text-ink/70" />
                </div>

                <p className="mt-4 text-sm font-semibold text-ink">
                  Drop your document here
                </p>

                <p className="mt-1 text-xs text-ink/40">
                  or click to browse files
                </p>

                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {['PDF', 'DOCX', 'XLSX', 'JPG', 'PNG', 'ZIP'].map(
                    (type) => (
                      <span
                        key={type}
                        className="rounded-full bg-white px-2.5 py-1 font-mono text-[9px] font-semibold text-ink/40 ring-1 ring-line"
                      >
                        {type}
                      </span>
                    ),
                  )}
                </div>

                <p className="mt-4 text-[10px] text-ink/30">
                  Maximum file size: 50 MB
                </p>
              </label>

              {/* Example selected file state */}
              <div className="mt-4 rounded-xl border border-line bg-white p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-paper-2">
                    <FileText className="h-4 w-4 text-ink/45" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-ink">
                      No document selected
                    </p>

                    <p className="mt-0.5 text-[10px] text-ink/35">
                      Your selected file will appear here before submission.
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label="Remove selected document"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-ink/25 transition hover:bg-red-500/5 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Access */}
          <Card>
            <CardHeader
              title="Access and verification"
              subtitle="Control how the uploaded document enters the project record"
            />

            <CardBody>
              <div className="space-y-3">
                <AccessOption
                  icon={LockKeyhole}
                  title="Project participants only"
                  description="Only authorised users assigned to this project can access the document."
                  checked
                />

                <AccessOption
                  icon={ShieldCheck}
                  title="Submit for verification"
                  description="Build OS will review the document before it can be treated as verified project evidence."
                  checked
                />
              </div>
            </CardBody>
          </Card>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="h-11 rounded-xl border border-line bg-white px-5 text-xs font-semibold text-ink/55 transition hover:text-ink"
            >
              Save as draft
            </button>

            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-ink px-6 text-xs font-semibold text-white transition hover:bg-ink/90"
            >
              <UploadCloud className="h-4 w-4" />
              Upload document
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
              Upload checklist
            </p>

            <div className="mt-5 space-y-4">
              <ChecklistItem
                title="Project selected"
                description="Document must belong to an active project."
              />

              <ChecklistItem
                title="Correct category"
                description="Classification determines how the document is organised."
              />

              <ChecklistItem
                title="Readable evidence"
                description="Documents should be complete and legible."
              />

              <ChecklistItem
                title="Verification"
                description="Required evidence may be reviewed by Build OS Admin."
              />
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Secure document storage
                </p>

                <p className="mt-1 text-xs leading-5 text-ink/40">
                  Uploaded records are linked to the project and protected by
                  role-based access controls and audit logging.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                <AlertCircle className="h-4 w-4 text-amber-600" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Verification matters
                </p>

                <p className="mt-1 text-xs leading-5 text-ink/40">
                  Ownership, compliance, financial and technical documents may
                  require additional verification before they can support
                  project decisions.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5">
                <File className="h-4 w-4 text-ink/55" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Supported records
                </p>

                <p className="mt-1 text-xs leading-5 text-ink/40">
                  Contracts, drawings, title documents, approvals, reports,
                  invoices, inspection evidence, warranties and other
                  project-related records.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function AccessOption({
  icon: Icon,
  title,
  description,
  checked,
}: {
  icon: typeof LockKeyhole
  title: string
  description: string
  checked: boolean
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-paper-2 p-4 transition hover:border-ink/15">
      <input
        type="checkbox"
        defaultChecked={checked}
        className="mt-1 h-4 w-4 rounded border-line accent-current"
      />

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
        <Icon className="h-4 w-4 text-ink/45" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-ink">{title}</p>

        <p className="mt-1 text-[11px] leading-5 text-ink/40">
          {description}
        </p>
      </div>
    </label>
  )
}

function ChecklistItem({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
      </div>

      <div>
        <p className="text-xs font-semibold text-ink">{title}</p>

        <p className="mt-1 text-[10px] leading-5 text-ink/40">
          {description}
        </p>
      </div>
    </div>
  )
}