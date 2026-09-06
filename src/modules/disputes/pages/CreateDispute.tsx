import { useState, type ChangeEvent, type FormEvent } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileText,
  LockKeyhole,
  MessageSquare,
  ShieldAlert,
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
    // The backend should:
    // 1. Create the dispute.
    // 2. Attach evidence.
    // 3. Freeze the affected payment line where applicable.
    // 4. Create the audit trail.
    // 5. Notify the respondent and relevant project participants.

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card className="overflow-hidden">
        <div className="border-b border-line px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
            Dispute management
          </p>

          <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink">
            Dispute submitted
          </h2>
        </div>

        <CardBody>
          <div className="mx-auto flex max-w-xl flex-col items-center py-10 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>

            <h3 className="mt-5 font-display text-lg font-semibold text-ink">
              Your dispute has been opened
            </h3>

            <p className="mt-2 text-sm leading-6 text-ink/50">
              Build OS has recorded your complaint and supporting evidence.
              The affected payment line may be frozen while the dispute is
              reviewed.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-full border border-line bg-paper-2 px-3 py-1.5 font-mono text-xs text-ink/60">
                Status: Opened
              </span>

              <span className="rounded-full border border-line bg-paper-2 px-3 py-1.5 font-mono text-xs text-ink/60">
                Evidence: {files.length}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10">
            <ShieldAlert className="h-5 w-5 text-red-600" />
          </div>

          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
            Dispute management
          </span>
        </div>

        <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Raise a dispute
        </h1>

        <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
          Submit a formal complaint with the affected project, payment or
          delivery details and supporting evidence.
        </p>
      </div>

      {/* Warning */}
      <div className="flex gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] p-4">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

        <div>
          <p className="text-sm font-semibold text-ink">
            Before opening a dispute
          </p>

          <p className="mt-1 text-xs leading-5 text-ink/50">
            Provide factual information and upload evidence that supports
            your claim. Build OS may freeze an affected payment line while
            the dispute is investigated.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main form */}
          <Card className="overflow-hidden lg:col-span-2">
            <CardHeader
              title="Dispute information"
              subtitle="Describe the issue and identify what requires review"
            />

            <CardBody>
              <div className="space-y-6">
                {/* Project / payment reference */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="projectId"
                      className="text-xs font-semibold text-ink/60"
                    >
                      Project ID
                    </label>

                    <input
                      id="projectId"
                      name="projectId"
                      placeholder="e.g. PRJ-2026-00421"
                      className="mt-2 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none transition placeholder:text-ink/30 focus:border-ink/30 focus:ring-2 focus:ring-ink/5"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="paymentId"
                      className="text-xs font-semibold text-ink/60"
                    >
                      Affected payment / milestone
                    </label>

                    <input
                      id="paymentId"
                      name="paymentId"
                      placeholder="Optional reference"
                      className="mt-2 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none transition placeholder:text-ink/30 focus:border-ink/30 focus:ring-2 focus:ring-ink/5"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="text-xs font-semibold text-ink/60">
                    Dispute category
                  </label>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {disputeCategories.map((item) => {
                      const selected = category === item.value

                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setCategory(item.value)}
                          className={`rounded-xl border p-3 text-left transition ${
                            selected
                              ? 'border-ink bg-ink/[0.04] ring-1 ring-ink/10'
                              : 'border-line bg-white hover:bg-ink/[0.02]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-semibold text-ink">
                              {item.label}
                            </span>

                            {selected && (
                              <CheckCircle2 className="h-4 w-4 text-ink" />
                            )}
                          </div>

                          <p className="mt-1 text-xs leading-5 text-ink/40">
                            {item.description}
                          </p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="text-xs font-semibold text-ink/60"
                  >
                    Dispute title
                  </label>

                  <input
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Briefly describe the issue"
                    maxLength={120}
                    required
                    className="mt-2 h-11 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none transition placeholder:text-ink/30 focus:border-ink/30 focus:ring-2 focus:ring-ink/5"
                  />

                  <p className="mt-1.5 text-right text-[11px] text-ink/30">
                    {title.length}/120
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="text-xs font-semibold text-ink/60"
                  >
                    Description
                  </label>

                  <textarea
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Explain what happened, when it happened and the specific obligation or deliverable in dispute."
                    rows={7}
                    maxLength={3000}
                    required
                    className="mt-2 w-full resize-none rounded-xl border border-line bg-white px-3 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-ink/30 focus:border-ink/30 focus:ring-2 focus:ring-ink/5"
                  />

                  <p className="mt-1.5 text-right text-[11px] text-ink/30">
                    {description.length}/3000
                  </p>
                </div>

                {/* Requested resolution */}
                <div>
                  <label
                    htmlFor="resolution"
                    className="text-xs font-semibold text-ink/60"
                  >
                    Requested resolution
                  </label>

                  <textarea
                    id="resolution"
                    value={requestedResolution}
                    onChange={(event) =>
                      setRequestedResolution(event.target.value)
                    }
                    placeholder="What outcome would resolve this dispute?"
                    rows={4}
                    maxLength={1500}
                    className="mt-2 w-full resize-none rounded-xl border border-line bg-white px-3 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-ink/30 focus:border-ink/30 focus:ring-2 focus:ring-ink/5"
                  />
                </div>

                {/* Evidence */}
                <div>
                  <div>
                    <p className="text-xs font-semibold text-ink/60">
                      Supporting evidence
                    </p>

                    <p className="mt-1 text-xs text-ink/40">
                      Upload photos, invoices, contracts, reports, delivery
                      records or other relevant evidence.
                    </p>
                  </div>

                  <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-paper-2 px-6 py-8 text-center transition hover:border-ink/20 hover:bg-ink/[0.02]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                      <Upload className="h-5 w-5 text-ink/50" />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-ink">
                      Upload evidence
                    </p>

                    <p className="mt-1 text-xs text-ink/40">
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
                          className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white p-3"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5">
                              <FileText className="h-4 w-4 text-ink/50" />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-xs font-medium text-ink">
                                {file.name}
                              </p>

                              <p className="mt-0.5 text-[11px] text-ink/40">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFile(file.id)}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink/40 transition hover:bg-red-500/10 hover:text-red-600"
                            aria-label={`Remove ${file.name}`}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <div className="flex flex-col justify-between gap-4 border-t border-line pt-5 sm:flex-row sm:items-center">
                  <div className="flex items-start gap-2 text-xs text-ink/40">
                    <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0" />

                    <span>
                      Your submission and evidence will be recorded in the
                      project audit trail.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={!category || !title.trim() || !description.trim()}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-ink px-5 text-sm font-semibold text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Submit dispute
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Process */}
          <div className="space-y-6">
            <Card className="p-5">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-ink/50" />

                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
                  Review process
                </p>
              </div>

              <div className="mt-5 space-y-0">
                {[
                  'Dispute opened',
                  'Evidence submitted',
                  'Payment frozen where applicable',
                  'Party response',
                  'Admin review',
                  'Expert review if required',
                  'Resolution',
                  'Closure',
                ].map((step, index, array) => (
                  <div key={step} className="relative flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-white text-[10px] font-semibold text-ink/50">
                        {index + 1}
                      </div>

                      {index < array.length - 1 && (
                        <div className="h-7 w-px bg-line" />
                      )}
                    </div>

                    <p className="pt-1 text-xs leading-5 text-ink/55">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
                What happens next
              </p>

              <div className="mt-4 space-y-3">
                <div className="rounded-xl bg-paper-2 p-3">
                  <p className="text-xs font-semibold text-ink">
                    Evidence review
                  </p>

                  <p className="mt-1 text-xs leading-5 text-ink/40">
                    Build OS reviews the complaint and supporting evidence.
                  </p>
                </div>

                <div className="rounded-xl bg-paper-2 p-3">
                  <p className="text-xs font-semibold text-ink">
                    Payment protection
                  </p>

                  <p className="mt-1 text-xs leading-5 text-ink/40">
                    Affected funds can remain frozen while the matter is
                    investigated.
                  </p>
                </div>

                <div className="rounded-xl bg-paper-2 p-3">
                  <p className="text-xs font-semibold text-ink">
                    Resolution record
                  </p>

                  <p className="mt-1 text-xs leading-5 text-ink/40">
                    The final decision and actions are retained in the audit
                    trail.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}