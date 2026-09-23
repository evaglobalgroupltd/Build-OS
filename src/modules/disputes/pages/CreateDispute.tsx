
import { useState, type ChangeEvent, type FormEvent } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  FileText,
  LockKeyhole,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  Upload,
  X,
} from 'lucide-react'

import { Card, CardHeader, CardBody } from '@/components/ui/Card'

type DisputeCategory =
  | 'payment'
  | 'quality'
  | 'delay'
  | 'scope'
  | 'procurement'
  | 'delivery'
  | 'contract'
  | 'other'

interface EvidenceFile {
  id: string
  name: string
  size: number
}

const disputeCategories: {
  value: DisputeCategory
  label: string
  description: string
}[] = [
  {
    value: 'payment',
    label: 'Payment',
    description: 'Non-payment, delayed payment or disputed release.',
  },
  {
    value: 'quality',
    label: 'Quality',
    description: 'Poor workmanship, materials or deliverable quality.',
  },
  {
    value: 'delay',
    label: 'Delay',
    description: 'Missed milestone, delivery or project deadline.',
  },
  {
    value: 'scope',
    label: 'Scope',
    description: 'Disagreement about agreed project scope.',
  },
  {
    value: 'procurement',
    label: 'Procurement',
    description: 'Material request, quotation or procurement issue.',
  },
  {
    value: 'delivery',
    label: 'Delivery',
    description: 'Wrong, damaged, incomplete or late delivery.',
  },
  {
    value: 'contract',
    label: 'Contract',
    description: 'Issue relating to contractual obligations.',
  },
  {
    value: 'other',
    label: 'Other',
    description: 'Another issue requiring formal review.',
  },
]

const processSteps = [
  'Dispute opened',
  'Evidence submitted',
  'Payment protected where applicable',
  'Party response',
  'Administrative review',
  'Expert review if required',
  'Resolution',
  'Closure',
]

function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

export function CreateDispute() {
  const [category, setCategory] = useState<DisputeCategory | ''>('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [requestedResolution, setRequestedResolution] = useState('')
  const [files, setFiles] = useState<EvidenceFile[]>([])
  const [submitted, setSubmitted] = useState(false)

  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? [])

    const mappedFiles = selectedFiles.map((file) => ({
      id: `${file.name}-${file.lastModified}`,
      name: file.name,
      size: file.size,
    }))

    setFiles((current) => {
      const combined = [...current, ...mappedFiles]

      return combined.filter(
        (file, index, array) =>
          array.findIndex((item) => item.id === file.id) === index,
      )
    })

    event.target.value = ''
  }

  const removeFile = (id: string) => {
    setFiles((current) => current.filter((file) => file.id !== id))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!category || !title.trim() || !description.trim()) {
      return
    }

    // TODO:
    // Submit to disputesService.create(...)
    //
    // Backend should:
    // 1. Create the dispute.
    // 2. Attach evidence.
    // 3. Freeze the affected payment line where applicable.
    // 4. Create the audit trail.
    // 5. Notify the respondent and relevant project participants.

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        {/* ===================================================== */}
        {/* Success hero */}
        {/* ===================================================== */}

        <div className="relative overflow-hidden rounded-[28px] bg-[#173629] px-6 py-8 text-white sm:px-8 sm:py-10">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/[0.035]" />
          <div className="absolute -bottom-28 right-24 h-48 w-48 rounded-full bg-[#B85C12]/10" />

          <div className="relative flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-white/10 ring-1 ring-white/10">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
              Dispute management
            </p>

            <h1 className="mt-2 font-display text-[28px] font-semibold tracking-[-0.035em] sm:text-[34px]">
              Dispute submitted
            </h1>

            <p className="mt-3 max-w-xl text-[12px] leading-5 text-white/55">
              Your complaint and supporting evidence have been securely
              recorded. The relevant parties will be notified and the matter
              will proceed through the formal review process.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1.5 font-mono text-[10px] text-white/65 ring-1 ring-white/10">
                Status · Opened
              </span>

              <span className="rounded-full bg-white/10 px-3 py-1.5 font-mono text-[10px] text-white/65 ring-1 ring-white/10">
                Evidence · {files.length}
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================== */}
        {/* Confirmation card */}
        {/* ===================================================== */}

        <Card>
          <CardBody className="p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink/35">
                  Next step
                </p>

                <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                  Your dispute is now in review
                </h2>

                <p className="mt-1.5 max-w-xl text-[11px] leading-5 text-ink/45">
                  Keep any additional documentation available in case the
                  review team requests clarification or further evidence.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(20,40,30,0.12)]"
              >
                View disputes
                <ArrowRight size={14} />
              </button>
            </div>
          </CardBody>
        </Card>
      </div>
    )
  }

  const canSubmit =
    Boolean(category) && Boolean(title.trim()) && Boolean(description.trim())

  return (
    <div className="space-y-7">
      {/* ===================================================== */}
      {/* Header */}
      {/* ===================================================== */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">
              Dispute management
            </p>
          </div>

          <h1 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[36px]">
            Raise a dispute
          </h1>

          <p className="mt-1.5 max-w-2xl text-[13px] leading-5 text-ink/50">
            Submit a formal complaint with the relevant project details,
            supporting evidence and the resolution you are seeking.
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-ink/[0.07] bg-white px-3.5 py-2 sm:flex">
          <LockKeyhole size={13} className="text-ink/40" />
          <span className="text-[10px] font-semibold text-ink/50">
            Secure & auditable
          </span>
        </div>
      </div>

      {/* ===================================================== */}
      {/* Premium warning panel */}
      {/* ===================================================== */}

      <div className="relative overflow-hidden rounded-[22px] border border-[#B85C12]/15 bg-[#F8EEE6] px-5 py-4.5 sm:px-6 sm:py-5">
        <div className="absolute -right-10 -top-14 h-32 w-32 rounded-full bg-[#B85C12]/[0.04]" />

        <div className="relative flex gap-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#B85C12]/10 text-[#B85C12]">
            <AlertTriangle size={16} />
          </div>

          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-[#713C14]">
              Before opening a dispute
            </p>

            <p className="mt-1 text-[11px] leading-5 text-[#713C14]/65">
              Keep your submission factual and specific. Include evidence that
              directly supports your claim. Where applicable, the affected
              payment line may be protected while the matter is investigated.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.7fr)]">
          {/* ================================================= */}
          {/* Main form */}
          {/* ================================================= */}

          <Card className="overflow-hidden">
            <CardHeader
              title="Dispute information"
              subtitle="Tell us exactly what happened and what requires review"
            />

            <CardBody className="p-5 sm:p-6">
              <div className="space-y-7">
                {/* ----------------------------------------- */}
                {/* References */}
                {/* ----------------------------------------- */}

                <div>
                  <div className="mb-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/35">
                      References
                    </p>

                    <p className="mt-1 text-[11px] text-ink/40">
                      Connect this dispute to the relevant project or payment.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="projectId"
                        className="text-[11px] font-semibold text-ink/60"
                      >
                        Project ID
                      </label>

                      <input
                        id="projectId"
                        name="projectId"
                        placeholder="e.g. PRJ-2026-00421"
                        className="mt-2 h-11 w-full rounded-xl border border-ink/[0.08] bg-[#FAFBFA] px-3.5 text-[12px] text-ink outline-none transition placeholder:text-ink/25 focus:border-ink/25 focus:bg-white focus:ring-4 focus:ring-ink/[0.035]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="paymentId"
                        className="text-[11px] font-semibold text-ink/60"
                      >
                        Affected payment / milestone
                      </label>

                      <input
                        id="paymentId"
                        name="paymentId"
                        placeholder="Optional reference"
                        className="mt-2 h-11 w-full rounded-xl border border-ink/[0.08] bg-[#FAFBFA] px-3.5 text-[12px] text-ink outline-none transition placeholder:text-ink/25 focus:border-ink/25 focus:bg-white focus:ring-4 focus:ring-ink/[0.035]"
                      />
                    </div>
                  </div>
                </div>

                {/* ----------------------------------------- */}
                {/* Category */}
                {/* ----------------------------------------- */}

                <div>
                  <div className="mb-3">
                    <p className="text-[11px] font-semibold text-ink/60">
                      What is the dispute about?
                    </p>

                    <p className="mt-1 text-[11px] text-ink/40">
                      Select the category that most closely describes the
                      issue.
                    </p>
                  </div>

                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {disputeCategories.map((item) => {
                      const selected = category === item.value

                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setCategory(item.value)}
                          aria-pressed={selected}
                          className={`
                            group relative overflow-hidden rounded-[16px] border p-3.5 text-left
                            transition duration-200
                            ${
                              selected
                                ? 'border-ink/20 bg-[#F4F7F4] shadow-[0_8px_25px_rgba(20,40,30,0.05)]'
                                : 'border-ink/[0.07] bg-white hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-[0_8px_22px_rgba(20,40,30,0.045)]'
                            }
                          `}
                        >
                          {selected && (
                            <div className="absolute right-0 top-0 h-14 w-14 rounded-bl-[28px] bg-[#173629]/[0.035]" />
                          )}

                          <div className="relative flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-[12px] font-semibold text-ink">
                                {item.label}
                              </p>

                              <p className="mt-1 text-[10px] leading-4.5 text-ink/40">
                                {item.description}
                              </p>
                            </div>

                            <div
                              className={`
                                flex h-6 w-6 shrink-0 items-center justify-center rounded-full border
                                transition
                                ${
                                  selected
                                    ? 'border-ink bg-ink text-white'
                                    : 'border-ink/10 bg-white text-transparent'
                                }
                              `}
                            >
                              <Check size={12} strokeWidth={2.5} />
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* ----------------------------------------- */}
                {/* Title */}
                {/* ----------------------------------------- */}

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <label
                      htmlFor="title"
                      className="text-[11px] font-semibold text-ink/60"
                    >
                      Dispute title
                    </label>

                    <span className="text-[10px] text-ink/25">
                      {title.length}/120
                    </span>
                  </div>

                  <input
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Briefly describe the issue"
                    maxLength={120}
                    required
                    className="mt-2 h-12 w-full rounded-xl border border-ink/[0.08] bg-[#FAFBFA] px-3.5 text-[13px] text-ink outline-none transition placeholder:text-ink/25 focus:border-ink/25 focus:bg-white focus:ring-4 focus:ring-ink/[0.035]"
                  />
                </div>

                {/* ----------------------------------------- */}
                {/* Description */}
                {/* ----------------------------------------- */}

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <label
                      htmlFor="description"
                      className="text-[11px] font-semibold text-ink/60"
                    >
                      What happened?
                    </label>

                    <span className="text-[10px] text-ink/25">
                      {description.length}/3000
                    </span>
                  </div>

                  <textarea
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Explain what happened, when it happened and the specific obligation, payment, milestone, delivery or deliverable in dispute."
                    rows={7}
                    maxLength={3000}
                    required
                    className="mt-2 w-full resize-none rounded-xl border border-ink/[0.08] bg-[#FAFBFA] px-3.5 py-3.5 text-[12px] leading-5.5 text-ink outline-none transition placeholder:text-ink/25 focus:border-ink/25 focus:bg-white focus:ring-4 focus:ring-ink/[0.035]"
                  />
                </div>

                {/* ----------------------------------------- */}
                {/* Resolution */}
                {/* ----------------------------------------- */}

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <label
                        htmlFor="resolution"
                        className="text-[11px] font-semibold text-ink/60"
                      >
                        Requested resolution
                      </label>

                      <p className="mt-1 text-[10px] text-ink/40">
                        Tell the review team what outcome would resolve the
                        matter.
                      </p>
                    </div>

                    <span className="text-[10px] text-ink/25">
                      {requestedResolution.length}/1500
                    </span>
                  </div>

                  <textarea
                    id="resolution"
                    value={requestedResolution}
                    onChange={(event) =>
                      setRequestedResolution(event.target.value)
                    }
                    placeholder="What outcome would resolve this dispute?"
                    rows={4}
                    maxLength={1500}
                    className="mt-3 w-full resize-none rounded-xl border border-ink/[0.08] bg-[#FAFBFA] px-3.5 py-3.5 text-[12px] leading-5.5 text-ink outline-none transition placeholder:text-ink/25 focus:border-ink/25 focus:bg-white focus:ring-4 focus:ring-ink/[0.035]"
                  />
                </div>

                {/* ----------------------------------------- */}
                {/* Evidence */}
                {/* ----------------------------------------- */}

                <div>
                  <div className="mb-3">
                    <div className="flex items-center gap-2">
                      <p className="text-[11px] font-semibold text-ink/60">
                        Supporting evidence
                      </p>

                      <span className="rounded-full bg-[#F4F6F3] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.06em] text-ink/40">
                        Recommended
                      </span>
                    </div>

                    <p className="mt-1 text-[10px] leading-4.5 text-ink/40">
                      Upload photos, invoices, contracts, reports, delivery
                      records or other relevant documentation.
                    </p>
                  </div>

                  <label className="group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[20px] border border-dashed border-ink/10 bg-[#F7F9F7] px-6 py-9 text-center transition hover:border-[#B85C12]/30 hover:bg-[#FBF8F5]">
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#B85C12]/[0.025] transition group-hover:bg-[#B85C12]/[0.05]" />

                    <div className="relative flex h-12 w-12 items-center justify-center rounded-[14px] bg-white shadow-[0_6px_20px_rgba(20,40,30,0.06)]">
                      <Upload className="h-5 w-5 text-ink/45 transition group-hover:text-[#B85C12]" />
                    </div>

                    <p className="relative mt-3 text-[12px] font-semibold text-ink">
                      Upload evidence
                    </p>

                    <p className="relative mt-1 text-[10px] text-ink/35">
                      PDF, JPG, PNG, MP4 and common document formats
                    </p>

                    <input
                      type="file"
                      multiple
                      onChange={handleFiles}
                      className="sr-only"
                    />
                  </label>

                  {files.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {files.map((file) => (
                        <div
                          key={file.id}
                          className="group flex items-center justify-between gap-3 rounded-[15px] border border-ink/[0.07] bg-white p-3 transition hover:border-ink/15 hover:shadow-[0_6px_18px_rgba(20,40,30,0.04)]"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4F6F3] text-ink/45">
                              <FileText size={15} />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-[11px] font-semibold text-ink">
                                {file.name}
                              </p>

                              <p className="mt-0.5 text-[10px] text-ink/35">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFile(file.id)}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink/25 transition hover:bg-[#F8EEE6] hover:text-[#B85C12]"
                            aria-label={`Remove ${file.name}`}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ----------------------------------------- */}
                {/* Submit */}
                {/* ----------------------------------------- */}

                <div className="rounded-[18px] border border-ink/[0.07] bg-[#F7F9F7] p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-ink/45">
                        <LockKeyhole size={14} />
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold text-ink/65">
                          Secure audit trail
                        </p>

                        <p className="mt-0.5 max-w-md text-[10px] leading-4 text-ink/40">
                          Your submission and evidence will be permanently
                          recorded against the project dispute record.
                        </p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="
                        inline-flex h-11 shrink-0 items-center justify-center gap-2
                        rounded-full bg-ink px-5 text-xs font-bold text-white
                        transition duration-200
                        hover:-translate-y-0.5
                        hover:shadow-[0_12px_28px_rgba(20,40,30,0.16)]
                        disabled:cursor-not-allowed disabled:opacity-35
                        disabled:hover:translate-y-0 disabled:hover:shadow-none
                      "
                    >
                      Submit dispute
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* ================================================= */}
          {/* Right rail */}
          {/* ================================================= */}

          <div className="space-y-5">
            {/* --------------------------------------------- */}
            {/* Review process */}
            {/* --------------------------------------------- */}

            <Card className="overflow-hidden">
              <div className="border-b border-ink/[0.07] px-5 py-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/35">
                      Review process
                    </p>

                    <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                      What happens next
                    </h2>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F4F6F3] text-ink/50">
                    <MessageSquare size={16} />
                  </div>
                </div>
              </div>

              <CardBody className="p-5">
                <div>
                  {processSteps.map((step, index) => {
                    const isLast = index === processSteps.length - 1

                    return (
                      <div key={step} className="relative flex gap-3">
                        <div className="flex w-7 shrink-0 flex-col items-center">
                          <div className="z-10 flex h-7 w-7 items-center justify-center rounded-full border border-ink/10 bg-white text-[9px] font-bold text-ink/45 shadow-sm">
                            {index + 1}
                          </div>

                          {!isLast && (
                            <div className="h-8 w-px bg-ink/[0.08]" />
                          )}
                        </div>

                        <div className="pb-4 pt-1">
                          <p className="text-[11px] font-semibold text-ink/65">
                            {step}
                          </p>

                          {index === 0 && (
                            <p className="mt-0.5 text-[9px] leading-4 text-ink/35">
                              Your complaint enters the formal record.
                            </p>
                          )}

                          {index === 4 && (
                            <p className="mt-0.5 text-[9px] leading-4 text-ink/35">
                              The submitted facts and evidence are assessed.
                            </p>
                          )}

                          {index === 6 && (
                            <p className="mt-0.5 text-[9px] leading-4 text-ink/35">
                              Actions and outcome are documented.
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardBody>
            </Card>

            {/* --------------------------------------------- */}
            {/* Protection panel */}
            {/* --------------------------------------------- */}

            <div className="relative overflow-hidden rounded-[22px] bg-[#173629] p-5 text-white">
              <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-[#B85C12]/10" />

              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                  <ShieldAlert size={16} />
                </div>

                <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">
                  Payment protection
                </p>

                <h3 className="mt-1.5 font-display text-[17px] font-semibold leading-tight">
                  Protecting the disputed amount
                </h3>

                <p className="mt-2 text-[10px] leading-4.5 text-white/50">
                  Where applicable, the affected payment line may remain
                  protected while the dispute is being investigated.
                </p>

                <div className="mt-5 flex items-center gap-2 text-[9px] font-semibold text-white/50">
                  <Sparkles size={11} className="text-[#D58A4D]" />
                  <span>Recorded within the project audit trail</span>
                </div>
              </div>
            </div>

            {/* --------------------------------------------- */}
            {/* Guidance */}
            {/* --------------------------------------------- */}

            <Card>
              <CardBody className="p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/35">
                  Submission guidance
                </p>

                <div className="mt-4 space-y-2.5">
                  {[
                    'Use specific dates and references.',
                    'Describe the obligation or deliverable clearly.',
                    'Attach evidence that directly supports your claim.',
                    'State the outcome you are requesting.',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 rounded-xl bg-[#F7F9F7] p-3"
                    >
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EAF4EE] text-[#12613E]">
                        <Check size={10} strokeWidth={2.5} />
                      </div>

                      <p className="text-[10px] leading-4.5 text-ink/50">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="group mt-4 flex w-full items-center justify-between rounded-xl border border-ink/[0.07] px-3.5 py-3 text-[10px] font-semibold text-ink/60 transition hover:border-ink/15 hover:text-ink"
                >
                  <span>Dispute policy & guidance</span>
                  <ChevronRight
                    size={13}
                    className="text-ink/25 transition group-hover:translate-x-0.5 group-hover:text-ink/50"
                  />
                </button>
              </CardBody>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
