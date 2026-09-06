import { useState } from 'react'
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Image,
  Info,
  Plus,
  ShieldCheck,
  Upload,
  Wallet,
  X,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

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
  icon: React.ComponentType<{ className?: string }>
}[] = [
  {
    value: 'Photos',
    label: 'Photos',
    description: 'Site photos showing completed work.',
    icon: Image,
  },
  {
    value: 'Videos',
    label: 'Videos',
    description: 'Video evidence of completed work.',
    icon: Image,
  },
  {
    value: 'Completion Notes',
    label: 'Completion notes',
    description: 'Contractor completion statement.',
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
    description: 'Request for PM/professional inspection.',
    icon: ShieldCheck,
  },
  {
    value: 'Receipts',
    label: 'Receipts',
    description: 'Relevant procurement or expenditure records.',
    icon: FileText,
  },
  {
    value: 'Professional Sign-off',
    label: 'Professional sign-off',
    description: 'Required technical approval where applicable.',
    icon: ShieldCheck,
  },
]

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

  const updateField = <K extends keyof MilestoneFormData>(
    field: K,
    value: MilestoneFormData[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const toggleEvidence = (evidence: MilestoneEvidenceType) => {
    setForm((current) => ({
      ...current,
      evidenceTypes: current.evidenceTypes.includes(evidence)
        ? current.evidenceTypes.filter((item) => item !== evidence)
        : [...current.evidenceTypes, evidence],
    }))
  }

  const handleSaveDraft = () => {
    setStatus('Draft')
    setShowSuccess(true)

    window.setTimeout(() => {
      setShowSuccess(false)
    }, 2500)
  }

  const handleSubmit = () => {
    setStatus('Pending Approval')
    setShowSuccess(true)

    window.setTimeout(() => {
      setShowSuccess(false)
    }, 2500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="overflow-hidden">
        <div className="border-b border-line bg-paper-2 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <button
                type="button"
                className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white text-ink/55 transition-colors hover:bg-paper-2 hover:text-ink"
                onClick={() => window.history.back()}
                aria-label="Go back"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                  Milestones / Create
                </p>

                <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
                  Create Milestone
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/50">
                  Define a project milestone, its payment amount, evidence
                  requirements and approval chain before work is released for
                  payment.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={
                  status === 'Pending Approval'
                    ? 'inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-700'
                    : 'inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-3 py-1.5 text-xs font-semibold text-ink/50'
                }
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {status}
              </span>
            </div>
          </div>
        </div>

        <div className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <HeaderMetric
            label="Approval"
            value="PM + Client"
            description="Required before payment"
          />

          <HeaderMetric
            label="Evidence"
            value={`${form.evidenceTypes.length} requirements`}
            description="Supporting milestone proof"
          />

          <HeaderMetric
            label="Payment"
            value={form.amount ? `₦${form.amount}` : 'Not set'}
            description="Released after verification"
          />
        </div>
      </Card>

      {/* Success message */}
      {showSuccess && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-700">
          <CheckCircle2 className="h-4 w-4 shrink-0" />

          <span>
            {status === 'Pending Approval'
              ? 'Milestone submitted for approval.'
              : 'Milestone draft saved successfully.'}
          </span>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Main form */}
        <div className="space-y-6 xl:col-span-2">
          {/* Basic details */}
          <Card>
            <CardHeader
              title="Milestone details"
              subtitle="Define what must be completed before this milestone can be approved."
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
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-ink/35">
                      ₦
                    </span>

                    <input
                      type="number"
                      min="0"
                      value={form.amount}
                      onChange={(event) =>
                        updateField('amount', event.target.value)
                      }
                      placeholder="0"
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

                <FormField label="Target completion date" required>
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />

                    <input
                      type="date"
                      value={form.dueDate}
                      onChange={(event) =>
                        updateField('dueDate', event.target.value)
                      }
                      className={`${inputClassName} pl-10`}
                    />
                  </div>
                </FormField>

                <FormField label="Payment percentage">
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
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
                  label="Description"
                  required
                  className="md:col-span-2"
                >
                  <textarea
                    rows={5}
                    value={form.description}
                    onChange={(event) =>
                      updateField('description', event.target.value)
                    }
                    placeholder="Describe the work that must be completed and the expected outcome..."
                    className={`${inputClassName} h-auto resize-none py-3`}
                  />
                </FormField>
              </div>
            </CardBody>
          </Card>

          {/* Evidence requirements */}
          <Card>
            <CardHeader
              title="Evidence requirements"
              subtitle="Select the evidence required before the milestone can move to approval."
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
                      onClick={() => toggleEvidence(option.value)}
                      className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                        selected
                          ? 'border-ink/20 bg-ink/[0.03]'
                          : 'border-line bg-white hover:bg-paper-2'
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          selected ? 'bg-ink text-white' : 'bg-ink/5'
                        }`}
                      >
                        {selected ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Icon className="h-4 w-4 text-ink/45" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-ink">
                          {option.label}
                        </p>

                        <p className="mt-1 text-[11px] leading-5 text-ink/45">
                          {option.description}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-xl bg-paper-2 p-4">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink/40" />

                <p className="text-xs leading-5 text-ink/50">
                  Evidence should be sufficient for independent verification.
                  Contractor evidence alone does not authorize payment release.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Approval chain */}
          <Card>
            <CardHeader
              title="Approval controls"
              subtitle="Define the verification and approval chain for this milestone."
            />

            <CardBody>
              <div className="space-y-3">
                <ApprovalControl
                  title="Project Manager verification"
                  description="PM reviews milestone evidence and confirms that the work has been completed."
                  checked={form.requiresPmVerification}
                  onChange={(checked) =>
                    updateField('requiresPmVerification', checked)
                  }
                  required
                />

                <ApprovalControl
                  title="Client approval"
                  description="Client approves the milestone before the associated payment can be released."
                  checked={form.requiresClientApproval}
                  onChange={(checked) =>
                    updateField('requiresClientApproval', checked)
                  }
                  required
                />

                <ApprovalControl
                  title="Professional sign-off"
                  description="Require an architect, engineer or other professional to approve the milestone where technically necessary."
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

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader
              title="Milestone summary"
              subtitle="Review the payment and verification structure."
            />

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
                  value={
                    form.amount
                      ? `₦${Number(form.amount).toLocaleString()}`
                      : 'Not set'
                  }
                />

                <SummaryRow
                  label="Evidence"
                  value={`${form.evidenceTypes.length} selected`}
                />

                <SummaryRow
                  label="PM verification"
                  value={form.requiresPmVerification ? 'Required' : 'Not required'}
                />

                <SummaryRow
                  label="Client approval"
                  value={form.requiresClientApproval ? 'Required' : 'Not required'}
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

          {/* Escrow rule */}
          <Card>
            <CardHeader
              title="Escrow payment rule"
              subtitle="Build OS payment protection"
            />

            <CardBody>
              <div className="rounded-xl border border-line bg-paper-2 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white">
                    <Wallet className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-ink">
                      Payment remains protected
                    </p>

                    <p className="mt-1 text-[11px] text-ink/45">
                      Release follows verification and approval.
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <RuleItem text="Required evidence uploaded" />
                  <RuleItem text="PM / professional verification" />
                  <RuleItem text="Client approval" />
                  <RuleItem text="No active dispute on payment line" />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Audit */}
          <Card>
            <CardHeader
              title="Governance"
              subtitle="Milestone activity is auditable."
            />

            <CardBody>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                  <ShieldCheck className="h-4 w-4 text-ink/50" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-ink">
                    Audit trail enabled
                  </p>

                  <p className="mt-1 text-xs leading-5 text-ink/45">
                    Creation, edits, approvals, rejections, evidence,
                    payment decisions and status changes should be recorded.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Actions */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-ink">
                Ready to continue?
              </p>

              <p className="mt-1 text-xs text-ink/40">
                Save this milestone as a draft or submit it for the configured
                approval workflow.
              </p>
            </div>

            <div className="flex flex-col-reverse gap-2 sm:flex-row">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink/60 transition-colors hover:bg-paper-2 hover:text-ink"
              >
                <FileText className="h-4 w-4" />
                Save draft
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                <CheckCircle2 className="h-4 w-4" />
                Create milestone
              </button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function FormField({
  label,
  required,
  children,
  className = '',
}: {
  label: string
  required?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-wide text-ink/40">
        {label}
        {required && <span className="ml-1 text-rose-500">*</span>}
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
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-white p-4 transition-colors hover:bg-paper-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        disabled={required}
        className="mt-1 h-4 w-4 rounded border-line accent-ink"
      />

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold text-ink">{title}</p>

          {required && (
            <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-ink/40">
              Required
            </span>
          )}
        </div>

        <p className="mt-1 text-xs leading-5 text-ink/45">
          {description}
        </p>
      </div>
    </label>
  )
}

function SummaryRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
      <span className="text-xs text-ink/40">{label}</span>

      <span className="max-w-[60%] text-right text-xs font-semibold text-ink">
        {value}
      </span>
    </div>
  )
}

function RuleItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />

      <span className="text-[11px] text-ink/50">{text}</span>
    </div>
  )
}

function HeaderMetric({
  label,
  value,
  description,
}: {
  label: string
  value: string
  description: string
}) {
  return (
    <div className="px-6 py-4 sm:px-7">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
        {label}
      </p>

      <p className="mt-1 font-display text-lg font-semibold text-ink">
        {value}
      </p>

      <p className="mt-1 text-xs text-ink/40">{description}</p>
    </div>
  )
}

const inputClassName =
  'h-11 w-full rounded-xl border border-line bg-white px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-ink/25'