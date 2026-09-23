import { useMemo, useState } from 'react'
import type { ComponentType, ReactNode } from 'react'
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Image,
  Info,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Wallet,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type MilestoneStatus = 'Draft' | 'Pending Approval'

type MilestoneEvidenceType =
  | 'Photos'
  | 'Videos'
  | 'Completion Notes'
  | 'Material Usage'
  | 'Labour Summary'
  | 'Inspection Request'
  | 'Receipts'
  | 'Professional Sign-off'

interface MilestoneFormData {
  name: string
  description: string
  phase: string
  amount: string
  startDate: string
  dueDate: string
  paymentPercentage: string
  requiresProfessionalSignOff: boolean
  requiresClientApproval: boolean
  requiresPmVerification: boolean
  evidenceTypes: MilestoneEvidenceType[]
}

/* -------------------------------------------------------------------------- */
/* Configuration                                                              */
/* -------------------------------------------------------------------------- */

const milestonePhases = [
  'Site Clearing',
  'Excavation',
  'Foundation',
  'Damp Proof Course',
  'Block Work',
  'Columns & Beams',
  'Roofing',
  'MEP Rough-ins',
  'Plastering',
  'Flooring',
  'Painting',
  'Fittings',
  'External Works',
  'Final Completion',
  'Handover',
  'Custom',
]

const evidenceOptions: {
  value: MilestoneEvidenceType
  label: string
  description: string
  icon: ComponentType<{ className?: string }>
}[] = [
  {
    value: 'Photos',
    label: 'Site photos',
    description: 'Visual evidence showing completed work.',
    icon: Image,
  },
  {
    value: 'Videos',
    label: 'Site videos',
    description: 'Video evidence demonstrating completion.',
    icon: PlayCircle,
  },
  {
    value: 'Completion Notes',
    label: 'Completion notes',
    description: 'Contractor statement confirming completion.',
    icon: FileText,
  },
  {
    value: 'Material Usage',
    label: 'Material usage',
    description: 'Materials consumed during the milestone.',
    icon: ClipboardCheck,
  },
  {
    value: 'Labour Summary',
    label: 'Labour summary',
    description: 'Labour deployed and work completed.',
    icon: ClipboardCheck,
  },
  {
    value: 'Inspection Request',
    label: 'Inspection request',
    description: 'Request for PM or professional inspection.',
    icon: FileCheck2,
  },
  {
    value: 'Receipts',
    label: 'Receipts',
    description: 'Relevant procurement and expenditure records.',
    icon: FileText,
  },
  {
    value: 'Professional Sign-off',
    label: 'Professional sign-off',
    description: 'Technical approval where required.',
    icon: ShieldCheck,
  },
]

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function CreateMilestone() {
  const [form, setForm] = useState<MilestoneFormData>({
    name: '',
    description: '',
    phase: '',
    amount: '',
    startDate: '',
    dueDate: '',
    paymentPercentage: '',
    requiresProfessionalSignOff: false,
    requiresClientApproval: true,
    requiresPmVerification: true,
    evidenceTypes: ['Photos', 'Completion Notes'],
  })

  const [status, setStatus] = useState<MilestoneStatus>('Draft')
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateField = <K extends keyof MilestoneFormData>(
    field: K,
    value: MilestoneFormData[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))

    setError(null)
  }

  const toggleEvidence = (evidence: MilestoneEvidenceType) => {
    setForm((current) => ({
      ...current,
      evidenceTypes: current.evidenceTypes.includes(evidence)
        ? current.evidenceTypes.filter((item) => item !== evidence)
        : [...current.evidenceTypes, evidence],
    }))

    setError(null)
  }

  const validationError = useMemo(() => {
    if (!form.name.trim()) {
      return 'Add a milestone name before continuing.'
    }

    if (!form.phase) {
      return 'Select the project phase for this milestone.'
    }

    if (!form.amount || Number(form.amount) <= 0) {
      return 'Enter a valid milestone payment amount.'
    }

    if (!form.dueDate) {
      return 'Set a target completion date.'
    }

    if (
      form.startDate &&
      new Date(form.dueDate) < new Date(form.startDate)
    ) {
      return 'The target completion date cannot be before the start date.'
    }

    if (
      form.paymentPercentage &&
      (Number(form.paymentPercentage) <= 0 ||
        Number(form.paymentPercentage) > 100)
    ) {
      return 'Payment percentage must be between 1% and 100%.'
    }

    if (!form.description.trim()) {
      return 'Describe the expected milestone outcome.'
    }

    if (form.evidenceTypes.length === 0) {
      return 'Select at least one evidence requirement.'
    }

    return null
  }, [form])

  const handleSaveDraft = () => {
    setStatus('Draft')
    setError(null)
    setShowSuccess(true)

    window.setTimeout(() => {
      setShowSuccess(false)
    }, 2500)
  }

  const handleSubmit = () => {
    if (validationError) {
      setError(validationError)
      return
    }

    setStatus('Pending Approval')
    setError(null)
    setShowSuccess(true)

    window.setTimeout(() => {
      setShowSuccess(false)
    }, 2500)
  }

  const formattedAmount = form.amount
    ? `₦${Number(form.amount).toLocaleString()}`
    : 'Not set'

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                               */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden border-0 shadow-sm">
        <div className="relative overflow-hidden bg-[#0B1220] px-6 py-7 text-white sm:px-8 sm:py-8">
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[#1657FF]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#34A6FF]/10 blur-3xl" />

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                aria-label="Go back"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white/70 transition hover:bg-white/[0.1] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                    Project controls
                  </span>

                  <span className="h-1 w-1 rounded-full bg-[#34A6FF]" />

                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                    Milestone creation
                  </span>
                </div>

                <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  Create milestone
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
                  Define the work, payment, evidence and approval conditions
                  that must be satisfied before this milestone can progress.
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <StatusBadge status={status} />
            </div>
          </div>

          <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
            <HeroMetric
              label="Approval chain"
              value="PM + Client"
              description="Verification before release"
            />

            <HeroMetric
              label="Evidence"
              value={`${form.evidenceTypes.length} requirements`}
              description="Supporting milestone proof"
            />

            <HeroMetric
              label="Payment"
              value={formattedAmount}
              description="Protected through escrow"
            />
          </div>
        </div>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Feedback                                                            */}
      {/* ------------------------------------------------------------------ */}

      {showSuccess && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.05] px-4 py-3.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
          </div>

          <div>
            <p className="text-xs font-semibold text-emerald-800">
              {status === 'Pending Approval'
                ? 'Milestone submitted'
                : 'Draft saved'}
            </p>

            <p className="mt-0.5 text-[11px] leading-5 text-emerald-700/70">
              {status === 'Pending Approval'
                ? 'The milestone has entered the configured approval workflow.'
                : 'Your milestone configuration has been saved as a draft.'}
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-500/15 bg-rose-500/[0.04] px-4 py-3.5 text-rose-700">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />

          <div>
            <p className="text-xs font-semibold">Review required</p>
            <p className="mt-0.5 text-[11px] leading-5 text-rose-700/70">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Main workspace                                                      */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          {/* Basic details */}
          <Card>
            <CardHeader
              title="Milestone details"
              subtitle="Define the scope and commercial value of the work."
            />

            <CardBody>
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  label="Milestone name"
                  required
                  className="md:col-span-2"
                >
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      updateField('name', event.target.value)
                    }
                    placeholder="e.g. Foundation completed"
                    className={inputClassName}
                  />
                </FormField>

                <FormField label="Project phase" required>
                  <select
                    value={form.phase}
                    onChange={(event) =>
                      updateField('phase', event.target.value)
                    }
                    className={inputClassName}
                  >
                    <option value="">Select phase</option>

                    {milestonePhases.map((phase) => (
                      <option key={phase} value={phase}>
                        {phase}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Payment amount" required>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-ink/35">
                      ₦
                    </span>

                    <input
                      type="number"
                      min="0"
                      inputMode="decimal"
                      value={form.amount}
                      onChange={(event) =>
                        updateField('amount', event.target.value)
                      }
                      placeholder="0.00"
                      className={`${inputClassName} pl-8`}
                    />
                  </div>
                </FormField>

                <FormField label="Start date">
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />

                    <input
                      type="date"
                      value={form.startDate}
                      onChange={(event) =>
                        updateField('startDate', event.target.value)
                      }
                      className={`${inputClassName} pl-10`}
                    />
                  </div>
                </FormField>

                <FormField label="Target completion" required>
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />

                    <input
                      type="date"
                      min={form.startDate || undefined}
                      value={form.dueDate}
                      onChange={(event) =>
                        updateField('dueDate', event.target.value)
                      }
                      className={`${inputClassName} pl-10`}
                    />
                  </div>
                </FormField>

                <FormField label="Payment allocation">
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      inputMode="decimal"
                      value={form.paymentPercentage}
                      onChange={(event) =>
                        updateField(
                          'paymentPercentage',
                          event.target.value,
                        )
                      }
                      placeholder="e.g. 15"
                      className={`${inputClassName} pr-9`}
                    />

                    <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-ink/35">
                      %
                    </span>
                  </div>
                </FormField>

                <FormField
                  label="Scope & expected outcome"
                  required
                  className="md:col-span-2"
                >
                  <textarea
                    rows={6}
                    value={form.description}
                    onChange={(event) =>
                      updateField('description', event.target.value)
                    }
                    placeholder="Describe exactly what must be completed, the expected outcome and any important acceptance conditions..."
                    className={`${inputClassName} h-auto resize-none py-3.5`}
                  />

                  <p className="mt-2 text-[11px] leading-5 text-ink/35">
                    Keep the description specific enough for an independent
                    reviewer to determine whether the milestone is complete.
                  </p>
                </FormField>
              </div>
            </CardBody>
          </Card>

          {/* Evidence */}
          <Card>
            <CardHeader
              title="Evidence requirements"
              subtitle="Specify the proof required before the milestone can enter approval."
            />

            <CardBody>
              <div className="grid gap-3 sm:grid-cols-2">
                {evidenceOptions.map((option) => {
                  const selected = form.evidenceTypes.includes(option.value)
                  const Icon = option.icon

                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleEvidence(option.value)}
                      className={`group flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                        selected
                          ? 'border-[#1657FF]/20 bg-[#1657FF]/[0.04] shadow-sm'
                          : 'border-line bg-white hover:-translate-y-0.5 hover:border-ink/10 hover:shadow-sm'
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                          selected
                            ? 'bg-[#1657FF] text-white'
                            : 'bg-ink/[0.04] text-ink/40 group-hover:bg-ink/[0.06]'
                        }`}
                      >
                        {selected ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Icon className="h-4 w-4" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-semibold text-ink">
                            {option.label}
                          </p>

                          {selected && (
                            <span className="font-mono text-[8px] font-semibold uppercase tracking-wider text-[#1657FF]">
                              Selected
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-[11px] leading-5 text-ink/45">
                          {option.description}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#1657FF]/10 bg-[#1657FF]/[0.035] p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1657FF]/10 text-[#1657FF]">
                  <Info className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-ink">
                    Evidence does not equal approval
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-ink/45">
                    Uploaded evidence supports verification. Payment remains
                    protected until the configured approval conditions are
                    satisfied.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Approval controls */}
          <Card>
            <CardHeader
              title="Approval controls"
              subtitle="Configure who must verify and approve the milestone."
            />

            <CardBody>
              <div className="space-y-3">
                <ApprovalControl
                  title="Project Manager verification"
                  description="The PM verifies evidence and confirms that the contracted work has been completed."
                  checked={form.requiresPmVerification}
                  onChange={(checked) =>
                    updateField('requiresPmVerification', checked)
                  }
                  required
                />

                <ApprovalControl
                  title="Client approval"
                  description="The client confirms acceptance before the associated payment can be released."
                  checked={form.requiresClientApproval}
                  onChange={(checked) =>
                    updateField('requiresClientApproval', checked)
                  }
                  required
                />

                <ApprovalControl
                  title="Professional sign-off"
                  description="Require an architect, engineer or other qualified professional where the milestone has technical approval requirements."
                  checked={form.requiresProfessionalSignOff}
                  onChange={(checked) =>
                    updateField(
                      'requiresProfessionalSignOff',
                      checked,
                    )
                  }
                />
              </div>
            </CardBody>
          </Card>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Sidebar                                                           */}
        {/* ---------------------------------------------------------------- */}

        <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
          {/* Live summary */}
          <Card className="overflow-hidden">
            <div className="border-b border-line bg-paper-2 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                    Live configuration
                  </p>

                  <h2 className="mt-1 font-display text-base font-semibold text-ink">
                    Milestone summary
                  </h2>
                </div>

                <Sparkles className="h-4 w-4 text-[#1657FF]" />
              </div>
            </div>

            <CardBody>
              <div className="space-y-4">
                <SummaryRow
                  label="Milestone"
                  value={form.name || 'Not defined'}
                />

                <SummaryRow
                  label="Phase"
                  value={form.phase || 'Not selected'}
                />

                <SummaryRow
                  label="Payment"
                  value={formattedAmount}
                  emphasized
                />

                <SummaryRow
                  label="Allocation"
                  value={
                    form.paymentPercentage
                      ? `${form.paymentPercentage}%`
                      : 'Not set'
                  }
                />

                <SummaryRow
                  label="Evidence"
                  value={`${form.evidenceTypes.length} selected`}
                />

                <SummaryRow
                  label="PM verification"
                  value={
                    form.requiresPmVerification
                      ? 'Required'
                      : 'Not required'
                  }
                />

                <SummaryRow
                  label="Client approval"
                  value={
                    form.requiresClientApproval
                      ? 'Required'
                      : 'Not required'
                  }
                />

                <SummaryRow
                  label="Professional"
                  value={
                    form.requiresProfessionalSignOff
                      ? 'Required'
                      : 'Not required'
                  }
                />
              </div>
            </CardBody>
          </Card>

          {/* Workflow */}
          <Card>
            <CardHeader
              title="Release workflow"
              subtitle="How this milestone reaches payment release."
            />

            <CardBody>
              <div className="space-y-0">
                <WorkflowStep
                  number="01"
                  title="Complete"
                  description="Contractor completes the defined milestone."
                  active
                />

                <WorkflowStep
                  number="02"
                  title="Submit evidence"
                  description="Required evidence is uploaded to Build OS."
                  active
                />

                <WorkflowStep
                  number="03"
                  title="Verify"
                  description="PM and professional reviewers validate the work."
                  active
                />

                <WorkflowStep
                  number="04"
                  title="Approve"
                  description="Client confirms milestone acceptance."
                  active
                />

                <WorkflowStep
                  number="05"
                  title="Release"
                  description="Eligible escrow payment is released."
                  active={false}
                  last
                />
              </div>
            </CardBody>
          </Card>

          {/* Escrow */}
          <Card>
            <div className="relative overflow-hidden bg-[#0B1220] p-5 text-white">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#1657FF]/20 blur-2xl" />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <Wallet className="h-4 w-4 text-[#34A6FF]" />
                  </div>

                  <div>
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">
                      Payment protection
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      Escrow protected
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-5 text-white/45">
                  Funds remain protected until the milestone satisfies its
                  evidence, verification and approval requirements.
                </p>

                <div className="mt-5 space-y-3">
                  <DarkRule text="Required evidence uploaded" />
                  <DarkRule text="Verification completed" />
                  <DarkRule text="Client approval recorded" />
                  <DarkRule text="No active payment dispute" />
                </div>
              </div>
            </div>
          </Card>

          {/* Governance */}
          <Card>
            <CardBody>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/[0.04]">
                  <ShieldCheck className="h-4 w-4 text-ink/50" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-ink">
                    Governance protected
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-ink/45">
                    Creation, edits, evidence, verification, approval,
                    rejection and payment decisions should remain part of the
                    project audit trail.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </aside>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Footer actions                                                      */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden">
        <CardBody>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#1657FF]" />

                <p className="text-xs font-semibold text-ink">
                  Ready to continue?
                </p>
              </div>

              <p className="mt-1.5 max-w-xl text-xs leading-5 text-ink/40">
                Save your configuration as a draft or submit the milestone
                into the configured approval workflow.
              </p>
            </div>

            <div className="flex flex-col-reverse gap-2 sm:flex-row">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 text-xs font-semibold text-ink/60 transition-all hover:border-ink/10 hover:bg-paper-2 hover:text-ink"
              >
                <FileText className="h-4 w-4" />
                Save draft
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0B1220] px-5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#1657FF] hover:shadow-md"
              >
                <CheckCircle2 className="h-4 w-4" />
                Submit for approval
              </button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Components                                                                 */
/* -------------------------------------------------------------------------- */

function FormField({
  label,
  required,
  children,
  className = '',
}: {
  label: string
  required?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/40">
        {label}

        {required && (
          <span className="ml-1 text-rose-500">*</span>
        )}
      </span>

      {children}
    </label>
  )
}

function ApprovalControl({
  title,
  description,
  checked,
  onChange,
  required,
}: {
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
  required?: boolean
}) {
  return (
    <div
      className={`flex items-start gap-4 rounded-2xl border p-4 ${
        checked
          ? 'border-[#1657FF]/15 bg-[#1657FF]/[0.025]'
          : 'border-line bg-white'
      }`}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={required}
        onClick={() => !required && onChange(!checked)}
        className={`relative mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
          checked ? 'bg-[#1657FF]' : 'bg-ink/15'
        } ${required ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
      >
        <span
          className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold text-ink">
            {title}
          </p>

          {required && (
            <span className="rounded-full bg-ink/[0.04] px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-wider text-ink/40">
              Required
            </span>
          )}
        </div>

        <p className="mt-1 text-[11px] leading-5 text-ink/45">
          {description}
        </p>
      </div>
    </div>
  )
}

function SummaryRow({
  label,
  value,
  emphasized = false,
}: {
  label: string
  value: string
  emphasized?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
      <span className="text-[11px] text-ink/40">
        {label}
      </span>

      <span
        className={`max-w-[62%] text-right ${
          emphasized
            ? 'font-display text-sm font-semibold text-ink'
            : 'text-xs font-semibold text-ink'
        }`}
      >
        {value}
      </span>
    </div>
  )
}

function WorkflowStep({
  number,
  title,
  description,
  active,
  last = false,
}: {
  number: string
  title: string
  description: string
  active: boolean
  last?: boolean
}) {
  return (
    <div className="relative flex gap-3 pb-5">
      {!last && (
        <span className="absolute left-[15px] top-8 h-[calc(100%-16px)] w-px bg-line" />
      )}

      <div
        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
          active
            ? 'bg-[#1657FF] text-white'
            : 'border border-line bg-white text-ink/30'
        }`}
      >
        {active ? <Check className="h-3.5 w-3.5" /> : number}
      </div>

      <div className="pt-0.5">
        <p className="text-xs font-semibold text-ink">
          {title}
        </p>

        <p className="mt-1 text-[11px] leading-5 text-ink/40">
          {description}
        </p>
      </div>
    </div>
  )
}

function DarkRule({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400/10">
        <Check className="h-2.5 w-2.5 text-emerald-400" />
      </div>

      <span className="text-[10px] text-white/45">
        {text}
      </span>
    </div>
  )
}

function StatusBadge({
  status,
}: {
  status: MilestoneStatus
}) {
  const pending = status === 'Pending Approval'

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 ${
        pending
          ? 'border-amber-300/20 bg-amber-400/10 text-amber-200'
          : 'border-white/10 bg-white/[0.06] text-white/60'
      }`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-50 ${
            pending ? 'bg-amber-300' : 'bg-white/50'
          }`}
        />

        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
            pending ? 'bg-amber-300' : 'bg-white/50'
          }`}
        />
      </span>

      <span className="text-[10px] font-semibold uppercase tracking-[0.12em]">
        {status}
      </span>
    </div>
  )
}

function HeroMetric({
  label,
  value,
  description,
}: {
  label: string
  value: string
  description: string
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4">
      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-white/30">
        {label}
      </p>

      <p className="mt-2 font-display text-lg font-semibold tracking-tight text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-white/35">
        {description}
      </p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Shared styles                                                              */
/* -------------------------------------------------------------------------- */

const inputClassName =
  'h-11 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink outline-none transition-all placeholder:text-ink/25 focus:border-[#1657FF]/30 focus:ring-4 focus:ring-[#1657FF]/[0.06]'