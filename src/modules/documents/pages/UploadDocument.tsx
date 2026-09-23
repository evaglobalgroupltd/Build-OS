import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
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
    <div className="space-y-7">
      {/* ─────────────────────────────────────────────────────────────
          PAGE HEADER
      ───────────────────────────────────────────────────────────── */}
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-line bg-white shadow-[0_4px_14px_rgba(11,18,32,0.04)]">
              <UploadCloud className="h-4.5 w-4.5 text-[#1657FF]" />
            </div>

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1657FF]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/35">
                Document management
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-[34px]">
              Upload Document
            </h1>

            <span className="inline-flex items-center rounded-full border border-line bg-white px-2.5 py-1 text-[10px] font-semibold text-ink/45">
              New document
            </span>
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/45">
            Add a project record to the secure vault and define how it should
            be classified, accessed and verified.
          </p>
        </div>

        <button
          type="button"
          className="group inline-flex w-fit items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink/55 shadow-[0_4px_14px_rgba(11,18,32,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/10 hover:text-ink hover:shadow-[0_8px_20px_rgba(11,18,32,0.06)]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back to vault
        </button>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          WORKFLOW INDICATOR
      ───────────────────────────────────────────────────────────── */}
      <section className="overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_8px_28px_rgba(11,18,32,0.035)]">
        <div className="grid divide-y divide-line sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          <WorkflowStep
            number="01"
            title="Classify"
            description="Project & category"
            active
          />

          <WorkflowStep
            number="02"
            title="Attach"
            description="Select your file"
          />

          <WorkflowStep
            number="03"
            title="Protect"
            description="Access & verification"
          />

          <WorkflowStep
            number="04"
            title="Submit"
            description="Add to project record"
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT
      ───────────────────────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_310px] xl:grid-cols-[minmax(0,1fr)_330px]">
        {/* Main form */}
        <div className="min-w-0 space-y-6">
          {/* Document information */}
          <Card className="overflow-hidden rounded-[22px]">
            <CardHeader
              title="Document information"
              subtitle="Tell Build OS how this record should be classified and stored"
            />

            <CardBody>
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Project */}
                <div className="sm:col-span-2">
                  <FormLabel
                    htmlFor="project"
                    label="Project"
                    description="Associate this document with the relevant Build OS project."
                  />

                  <div className="relative mt-2.5">
                    <FolderOpen className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/25" />

                    <select
                      id="project"
                      defaultValue={projects[0].id}
                      className="h-12 w-full appearance-none rounded-xl border border-line bg-[#F6F8FC] pl-10 pr-11 text-xs font-medium text-ink outline-none transition-all duration-200 hover:border-ink/10 focus:border-[#1657FF]/30 focus:bg-white focus:ring-4 focus:ring-[#1657FF]/[0.06]"
                    >
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name} · {project.id}
                        </option>
                      ))}
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/25" />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <FormLabel
                    htmlFor="category"
                    label="Document category"
                    description="Choose the classification that best describes the record."
                  />

                  <div className="relative mt-2.5">
                    <select
                      id="category"
                      defaultValue=""
                      className="h-12 w-full appearance-none rounded-xl border border-line bg-[#F6F8FC] px-3.5 pr-10 text-xs font-medium text-ink outline-none transition-all duration-200 hover:border-ink/10 focus:border-[#1657FF]/30 focus:bg-white focus:ring-4 focus:ring-[#1657FF]/[0.06]"
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

                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/25" />
                  </div>
                </div>

                {/* Document name */}
                <div>
                  <FormLabel
                    htmlFor="document-name"
                    label="Document name"
                    description="Use a clear and recognisable name."
                  />

                  <input
                    id="document-name"
                    type="text"
                    placeholder="e.g. Approved Building Drawings"
                    className="mt-2.5 h-12 w-full rounded-xl border border-line bg-[#F6F8FC] px-3.5 text-xs font-medium text-ink outline-none transition-all duration-200 placeholder:text-ink/25 hover:border-ink/10 focus:border-[#1657FF]/30 focus:bg-white focus:ring-4 focus:ring-[#1657FF]/[0.06]"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <FormLabel
                    htmlFor="description"
                    label="Description"
                    description="Optional context to help authorised users understand the document."
                  />

                  <textarea
                    id="description"
                    rows={4}
                    placeholder="Briefly describe what this document contains..."
                    className="mt-2.5 w-full resize-none rounded-xl border border-line bg-[#F6F8FC] px-3.5 py-3.5 text-xs leading-5 text-ink outline-none transition-all duration-200 placeholder:text-ink/25 hover:border-ink/10 focus:border-[#1657FF]/30 focus:bg-white focus:ring-4 focus:ring-[#1657FF]/[0.06]"
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* File upload */}
          <Card className="overflow-hidden rounded-[22px]">
            <CardHeader
              title="Select document"
              subtitle="Attach the file that should become part of the project record"
            />

            <CardBody>
              <label
                htmlFor="document-file"
                className="group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[20px] border border-dashed border-ink/15 bg-[#F6F8FC] px-6 py-14 text-center transition-all duration-300 hover:border-[#1657FF]/25 hover:bg-[#1657FF]/[0.025]"
              >
                <input
                  id="document-file"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png,.zip"
                />

                {/* Decorative glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#1657FF]/[0.05] blur-3xl transition duration-500 group-hover:bg-[#1657FF]/[0.09]" />

                <div className="relative flex h-16 w-16 items-center justify-center rounded-[20px] border border-line bg-white shadow-[0_8px_24px_rgba(11,18,32,0.06)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#1657FF]/15">
                  <UploadCloud className="h-7 w-7 text-[#1657FF]/65 transition-colors duration-300 group-hover:text-[#1657FF]" />
                </div>

                <p className="relative mt-5 text-sm font-semibold text-ink">
                  Drop your document here
                </p>

                <p className="relative mt-1 text-xs text-ink/35">
                  or click anywhere to browse your files
                </p>

                <div className="relative mt-5 flex flex-wrap justify-center gap-1.5">
                  {['PDF', 'DOCX', 'XLSX', 'JPG', 'PNG', 'ZIP'].map(
                    (type) => (
                      <span
                        key={type}
                        className="rounded-full border border-line bg-white px-2.5 py-1 font-mono text-[8px] font-semibold tracking-wide text-ink/35"
                      >
                        {type}
                      </span>
                    ),
                  )}
                </div>

                <div className="relative mt-5 flex items-center gap-2 text-[9px] text-ink/25">
                  <span className="h-1 w-1 rounded-full bg-ink/20" />
                  Maximum file size 50 MB
                  <span className="h-1 w-1 rounded-full bg-ink/20" />
                </div>
              </label>

              {/* Selected file */}
              <div className="mt-4 rounded-[16px] border border-line bg-white p-3.5 transition-colors hover:border-ink/10">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6F8FC]">
                    <FileText className="h-4.5 w-4.5 text-ink/35" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-xs font-semibold text-ink">
                        No document selected
                      </p>
                    </div>

                    <p className="mt-0.5 text-[10px] leading-4 text-ink/30">
                      Your selected file will appear here before submission.
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label="Remove selected document"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink/20 transition hover:bg-red-500/[0.06] hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Access and verification */}
          <Card className="overflow-hidden rounded-[22px]">
            <CardHeader
              title="Access and verification"
              subtitle="Define how this record enters the project evidence system"
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

          {/* Form actions */}
          <div className="flex flex-col-reverse gap-3 rounded-[20px] border border-line bg-white p-4 shadow-[0_6px_22px_rgba(11,18,32,0.025)] sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/25">
                Ready to submit?
              </p>

              <p className="mt-1 text-[11px] text-ink/35">
                You can save this record as a draft and complete it later.
              </p>
            </div>

            <div className="flex flex-col-reverse gap-2 sm:flex-row">
              <button
                type="button"
                className="h-11 rounded-xl border border-line bg-white px-5 text-xs font-semibold text-ink/50 transition hover:border-ink/10 hover:bg-[#F6F8FC] hover:text-ink"
              >
                Save as draft
              </button>

              <button
                type="button"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0B1220] px-6 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(11,18,32,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1657FF] hover:shadow-[0_10px_24px_rgba(22,87,255,0.18)]"
              >
                <UploadCloud className="h-4 w-4" />
                Upload document
              </button>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────
            SIDEBAR
        ───────────────────────────────────────────────────────── */}
        <aside className="space-y-5">
          {/* Upload checklist */}
          <Card className="overflow-hidden rounded-[22px]">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                    Upload checklist
                  </p>

                  <p className="mt-1 text-xs font-semibold text-ink">
                    Before you submit
                  </p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#1657FF]/[0.07]">
                  <CheckCircle2 className="h-4 w-4 text-[#1657FF]" />
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <ChecklistItem
                  step="01"
                  title="Project selected"
                  description="The document must belong to an active project."
                />

                <ChecklistItem
                  step="02"
                  title="Correct category"
                  description="Classification determines how the record is organised."
                />

                <ChecklistItem
                  step="03"
                  title="Readable evidence"
                  description="Documents should be complete and legible."
                />

                <ChecklistItem
                  step="04"
                  title="Verification"
                  description="Required evidence may be reviewed by Build OS Admin."
                  last
                />
              </div>
            </CardBody>
          </Card>

          {/* Security */}
          <Card className="overflow-hidden rounded-[22px]">
            <CardBody>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1657FF]/[0.08]">
                  <ShieldCheck className="h-4.5 w-4.5 text-[#1657FF]" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">
                    Secure document storage
                  </p>

                  <p className="mt-1.5 text-[11px] leading-5 text-ink/40">
                    Uploaded records are linked to the project and protected
                    by role-based access controls and audit logging.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-line pt-4">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                </span>

                <span className="text-[10px] font-semibold text-ink/45">
                  Access-controlled record
                </span>
              </div>
            </CardBody>
          </Card>

          {/* Verification */}
          <Card className="overflow-hidden rounded-[22px]">
            <CardBody>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/[0.08]">
                  <AlertCircle className="h-4.5 w-4.5 text-amber-600" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">
                    Verification matters
                  </p>

                  <p className="mt-1.5 text-[11px] leading-5 text-ink/40">
                    Ownership, compliance, financial and technical records may
                    require additional verification before supporting project
                    decisions.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Supported files */}
          <Card className="overflow-hidden rounded-[22px]">
            <CardBody>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6F8FC]">
                  <File className="h-4.5 w-4.5 text-ink/45" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">
                    Supported records
                  </p>

                  <p className="mt-1.5 text-[11px] leading-5 text-ink/40">
                    Contracts, drawings, title documents, approvals, reports,
                    invoices, inspection evidence, warranties and other
                    project records.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-4">
                {['PDF', 'DOCX', 'XLSX', 'CSV', 'JPG', 'PNG', 'ZIP'].map(
                  (type) => (
                    <span
                      key={type}
                      className="rounded-md bg-[#F6F8FC] px-2 py-1 font-mono text-[8px] font-semibold text-ink/30"
                    >
                      {type}
                    </span>
                  ),
                )}
              </div>
            </CardBody>
          </Card>
        </aside>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   FORM LABEL
───────────────────────────────────────────────────────────────────── */

function FormLabel({
  htmlFor,
  label,
  description,
}: {
  htmlFor: string
  label: string
  description: string
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-xs font-semibold text-ink"
      >
        {label}
      </label>

      <p className="mt-1 text-[10px] leading-4 text-ink/35">
        {description}
      </p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   WORKFLOW STEP
───────────────────────────────────────────────────────────────────── */

function WorkflowStep({
  number,
  title,
  description,
  active = false,
}: {
  number: string
  title: string
  description: string
  active?: boolean
}) {
  return (
    <div
      className={`relative flex items-center gap-3 px-4 py-4 sm:px-5 ${
        active ? 'bg-[#1657FF]/[0.025]' : ''
      }`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border font-mono text-[9px] font-semibold ${
          active
            ? 'border-[#1657FF]/15 bg-[#1657FF]/[0.08] text-[#1657FF]'
            : 'border-line bg-[#F6F8FC] text-ink/30'
        }`}
      >
        {number}
      </div>

      <div className="min-w-0">
        <p
          className={`text-[11px] font-semibold ${
            active ? 'text-ink' : 'text-ink/55'
          }`}
        >
          {title}
        </p>

        <p className="mt-0.5 truncate text-[9px] text-ink/30">
          {description}
        </p>
      </div>

      {active && (
        <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-[#1657FF] sm:left-5 sm:right-5" />
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   ACCESS OPTION
───────────────────────────────────────────────────────────────────── */

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
    <label
      className={`group flex cursor-pointer items-start gap-3 rounded-[16px] border p-4 transition-all duration-200 ${
        checked
          ? 'border-[#1657FF]/15 bg-[#1657FF]/[0.025]'
          : 'border-line bg-[#F6F8FC]'
      } hover:border-[#1657FF]/20`}
    >
      <input
        type="checkbox"
        defaultChecked={checked}
        className="mt-1 h-4 w-4 shrink-0 rounded border-line accent-[#1657FF]"
      />

      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
          checked
            ? 'bg-[#1657FF]/[0.08] text-[#1657FF]'
            : 'bg-white text-ink/40'
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold text-ink">
            {title}
          </p>

          {checked && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#1657FF]/[0.07] px-2 py-0.5 text-[8px] font-semibold text-[#1657FF]">
              <CheckCircle2 className="h-2.5 w-2.5" />
              Enabled
            </span>
          )}
        </div>

        <p className="mt-1 text-[10px] leading-5 text-ink/40">
          {description}
        </p>
      </div>
    </label>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   CHECKLIST ITEM
───────────────────────────────────────────────────────────────────── */

function ChecklistItem({
  step,
  title,
  description,
  last = false,
}: {
  step: string
  title: string
  description: string
  last?: boolean
}) {
  return (
    <div className="relative flex gap-3">
      {!last && (
        <div className="absolute left-[10px] top-6 h-[calc(100%+8px)] w-px bg-line" />
      )}

      <div className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1657FF]/[0.08] font-mono text-[7px] font-bold text-[#1657FF]">
        {step}
      </div>

      <div className="min-w-0 pb-1">
        <p className="text-xs font-semibold text-ink">
          {title}
        </p>

        <p className="mt-1 text-[10px] leading-5 text-ink/35">
          {description}
        </p>
      </div>
    </div>
  )
}