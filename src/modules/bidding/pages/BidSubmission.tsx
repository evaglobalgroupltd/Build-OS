import { useMemo, useState } from 'react'
import {
  Calculator,
  CheckCircle2,
  Clock3,
  FileText,
  Info,
  Plus,
  Send,
  Trash2,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

interface CostItem {
  id: string
  description: string
  quantity: string
  unit: string
  rate: string
}

interface PaymentMilestone {
  id: string
  name: string
  percentage: string
}

const initialCosts: CostItem[] = [
  {
    id: 'materials-1',
    description: '',
    quantity: '',
    unit: 'item',
    rate: '',
  },
]

const initialMilestones: PaymentMilestone[] = [
  {
    id: 'milestone-1',
    name: 'Mobilisation',
    percentage: '20',
  },
  {
    id: 'milestone-2',
    name: 'Mid-project milestone',
    percentage: '40',
  },
  {
    id: 'milestone-3',
    name: 'Completion and handover',
    percentage: '40',
  },
]

export function BidSubmission() {
  const [projectPhase, setProjectPhase] = useState('')
  const [scope, setScope] = useState('')
  const [timelineWeeks, setTimelineWeeks] = useState('')
  const [bidValidity, setBidValidity] = useState('30')
  const [approach, setApproach] = useState('')
  const [assumptions, setAssumptions] = useState('')
  const [costs, setCosts] = useState<CostItem[]>(initialCosts)
  const [milestones, setMilestones] =
    useState<PaymentMilestone[]>(initialMilestones)

  const totalCost = useMemo(() => {
    return costs.reduce((total, item) => {
      const quantity = Number(item.quantity) || 0
      const rate = Number(item.rate) || 0

      return total + quantity * rate
    }, 0)
  }, [costs])

  const milestoneTotal = useMemo(() => {
    return milestones.reduce(
      (total, milestone) => total + (Number(milestone.percentage) || 0),
      0,
    )
  }, [milestones])

  function updateCost(
    id: string,
    field: keyof CostItem,
    value: string,
  ) {
    setCosts((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    )
  }

  function addCostItem() {
    setCosts((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        description: '',
        quantity: '',
        unit: 'item',
        rate: '',
      },
    ])
  }

  function removeCostItem(id: string) {
    setCosts((current) => {
      if (current.length === 1) return current
      return current.filter((item) => item.id !== id)
    })
  }

  function updateMilestone(
    id: string,
    field: keyof PaymentMilestone,
    value: string,
  ) {
    setMilestones((current) =>
      current.map((milestone) =>
        milestone.id === id
          ? { ...milestone, [field]: value }
          : milestone,
      ),
    )
  }

  function addMilestone() {
    setMilestones((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name: '',
        percentage: '',
      },
    ])
  }

  function removeMilestone(id: string) {
    setMilestones((current) => {
      if (current.length === 1) return current
      return current.filter((milestone) => milestone.id !== id)
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // TODO: connect to biddingService.submitBid() when the API contract is ready.
    console.log({
      projectPhase,
      scope,
      timelineWeeks,
      bidValidity,
      approach,
      assumptions,
      costs,
      totalCost,
      milestones,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <FileText className="h-5 w-5 text-ink/65" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Contractor bidding
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Submit a bid
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Prepare a transparent commercial proposal covering scope,
            quantities, costs, delivery timeline and payment milestones.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white px-3 py-2 text-xs font-medium text-ink/55">
          <Clock3 className="h-4 w-4" />
          Bid validity: {bidValidity || '—'} days
        </div>
      </div>

      {/* Project scope */}
      <Card>
        <CardHeader
          title="Project scope"
          subtitle="Define the work you are proposing to deliver."
        />

        <CardBody>
          <div className="grid gap-5 lg:grid-cols-2">
            <Field label="Project phase" required>
              <select
                value={projectPhase}
                onChange={(event) => setProjectPhase(event.target.value)}
                className="input"
                required
              >
                <option value="">Select project phase</option>
                <option value="foundation">Foundation</option>
                <option value="structure">Structure</option>
                <option value="roofing">Roofing</option>
                <option value="mep">MEP</option>
                <option value="finishing">Finishing</option>
                <option value="full-project">Full project</option>
                <option value="specialist">Specialist scope</option>
              </select>
            </Field>

            <Field label="Timeline" required>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={timelineWeeks}
                  onChange={(event) =>
                    setTimelineWeeks(event.target.value)
                  }
                  placeholder="e.g. 24"
                  className="input pr-20"
                  required
                />

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink/35">
                  weeks
                </span>
              </div>
            </Field>

            <div className="lg:col-span-2">
              <Field label="Scope of work" required>
                <textarea
                  value={scope}
                  onChange={(event) => setScope(event.target.value)}
                  placeholder="Describe the work, deliverables and responsibilities covered by this bid."
                  className="textarea min-h-32"
                  required
                />
              </Field>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Cost breakdown */}
      <Card>
        <CardHeader
          title="Cost breakdown"
          subtitle="Provide transparent quantities, rates and estimated costs."
          action={
            <div className="flex items-center gap-2 text-xs text-ink/40">
              <Calculator className="h-4 w-4" />
              Auto-calculated
            </div>
          }
        />

        <CardBody>
          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              <div className="grid grid-cols-[2fr_1fr_1fr_1.2fr_40px] gap-3 border-b border-line pb-3 text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                <span>Description</span>
                <span>Quantity</span>
                <span>Unit</span>
                <span>Rate</span>
                <span />
              </div>

              <div className="divide-y divide-line">
                {costs.map((item) => {
                  const subtotal =
                    (Number(item.quantity) || 0) *
                    (Number(item.rate) || 0)

                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-[2fr_1fr_1fr_1.2fr_40px] items-center gap-3 py-3"
                    >
                      <input
                        value={item.description}
                        onChange={(event) =>
                          updateCost(
                            item.id,
                            'description',
                            event.target.value,
                          )
                        }
                        placeholder="e.g. 12mm reinforcement bars"
                        className="input"
                      />

                      <input
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={(event) =>
                          updateCost(
                            item.id,
                            'quantity',
                            event.target.value,
                          )
                        }
                        placeholder="0"
                        className="input"
                      />

                      <select
                        value={item.unit}
                        onChange={(event) =>
                          updateCost(
                            item.id,
                            'unit',
                            event.target.value,
                          )
                        }
                        className="input"
                      >
                        <option value="item">Item</option>
                        <option value="m²">m²</option>
                        <option value="m³">m³</option>
                        <option value="m">m</option>
                        <option value="kg">kg</option>
                        <option value="ton">ton</option>
                        <option value="day">day</option>
                        <option value="lot">lot</option>
                      </select>

                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-ink/35">
                          ₦
                        </span>

                        <input
                          type="number"
                          min="0"
                          value={item.rate}
                          onChange={(event) =>
                            updateCost(
                              item.id,
                              'rate',
                              event.target.value,
                            )
                          }
                          placeholder="0"
                          className="input pl-7"
                        />

                        {subtotal > 0 && (
                          <span className="mt-1 block text-[10px] text-ink/35">
                            ₦{subtotal.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeCostItem(item.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-ink/30 transition-colors hover:bg-red-500/10 hover:text-red-500"
                        aria-label="Remove cost item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={addCostItem}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-xs font-semibold text-ink/60 transition-colors hover:bg-ink/[0.03] hover:text-ink"
          >
            <Plus className="h-3.5 w-3.5" />
            Add cost item
          </button>

          <div className="mt-6 flex justify-end">
            <div className="rounded-xl bg-paper-2 px-5 py-4 text-right">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                Estimated bid value
              </p>

              <p className="mt-1 font-display text-2xl font-bold tracking-tight text-ink">
                ₦{totalCost.toLocaleString()}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Approach */}
      <Card>
        <CardHeader
          title="Execution approach"
          subtitle="Explain how you intend to execute and control the work."
        />

        <CardBody>
          <Field label="Methodology and approach" required>
            <textarea
              value={approach}
              onChange={(event) => setApproach(event.target.value)}
              placeholder="Describe your execution methodology, workforce, quality controls, procurement approach, reporting and key delivery strategy."
              className="textarea min-h-36"
              required
            />
          </Field>
        </CardBody>
      </Card>

      {/* Payment milestones */}
      <Card>
        <CardHeader
          title="Payment milestones"
          subtitle="Define when payment should become eligible for release."
        />

        <CardBody>
          <div className="space-y-3">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className="grid gap-3 rounded-xl border border-line p-4 sm:grid-cols-[1fr_180px_40px] sm:items-center"
              >
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                    Milestone {index + 1}
                  </label>

                  <input
                    value={milestone.name}
                    onChange={(event) =>
                      updateMilestone(
                        milestone.id,
                        'name',
                        event.target.value,
                      )
                    }
                    placeholder="e.g. Foundation completed"
                    className="input mt-1"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                    Percentage
                  </label>

                  <div className="relative mt-1">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={milestone.percentage}
                      onChange={(event) =>
                        updateMilestone(
                          milestone.id,
                          'percentage',
                          event.target.value,
                        )
                      }
                      className="input pr-8"
                    />

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink/35">
                      %
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeMilestone(milestone.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-ink/30 transition-colors hover:bg-red-500/10 hover:text-red-500"
                  aria-label="Remove milestone"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={addMilestone}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-line px-3 py-2 text-xs font-semibold text-ink/60 transition-colors hover:bg-ink/[0.03] hover:text-ink"
            >
              <Plus className="h-3.5 w-3.5" />
              Add milestone
            </button>

            <div
              className={
                milestoneTotal === 100
                  ? 'flex items-center gap-2 text-xs font-semibold text-emerald-600'
                  : 'flex items-center gap-2 text-xs font-semibold text-amber-600'
              }
            >
              {milestoneTotal === 100 ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <Info className="h-4 w-4" />
              )}

              Milestones total: {milestoneTotal}%
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Assumptions + validity */}
      <Card>
        <CardHeader
          title="Terms & assumptions"
          subtitle="Document the conditions attached to your proposal."
        />

        <CardBody>
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Field label="Assumptions and exclusions">
                <textarea
                  value={assumptions}
                  onChange={(event) =>
                    setAssumptions(event.target.value)
                  }
                  placeholder="List assumptions, exclusions, client dependencies, site conditions, material assumptions or variation conditions."
                  className="textarea min-h-32"
                />
              </Field>
            </div>

            <Field label="Bid validity" required>
              <select
                value={bidValidity}
                onChange={(event) => setBidValidity(event.target.value)}
                className="input"
                required
              >
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
              </select>

              <p className="mt-2 text-xs leading-5 text-ink/40">
                Your quoted price and terms remain valid for this period.
              </p>
            </Field>
          </div>
        </CardBody>
      </Card>

      {/* Submission notice */}
      <div className="flex gap-3 rounded-xl border border-ink/10 bg-paper-2 p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink/45" />

        <div>
          <p className="text-sm font-semibold text-ink">
            Before you submit
          </p>

          <p className="mt-1 text-xs leading-5 text-ink/45">
            Ensure your pricing, timeline, assumptions and payment milestones
            are accurate. Submitted bids may be reviewed by the client and
            compared with other verified contractor proposals.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
        <button
          type="button"
          className="rounded-xl border border-line px-5 py-2.5 text-xs font-semibold text-ink/60 transition-colors hover:bg-ink/[0.03] hover:text-ink"
        >
          Save draft
        </button>

        <button
          type="submit"
          disabled={milestoneTotal !== 100 || totalCost <= 0}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-xs font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send className="h-3.5 w-3.5" />
          Submit bid
        </button>
      </div>
    </form>
  )
}

interface FieldProps {
  label: string
  required?: boolean
  children: React.ReactNode
}

function Field({ label, required, children }: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-ink/65">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {children}
    </div>
  )
}