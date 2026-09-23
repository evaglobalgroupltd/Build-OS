
import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Calculator,
  CheckCircle2,
  Clock3,
  FileText,
  Info,
  Plus,
  Send,
  ShieldCheck,
  Trash2,
  WalletCards,
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

  const milestoneIsValid = milestoneTotal === 100
  const canSubmit = milestoneIsValid && totalCost > 0

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
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* ─────────────────────────────────────────────────────────────
          PREMIUM HEADER
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-[24px] bg-[#173629] px-6 py-7 text-white sm:px-8 sm:py-8">
        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-white/[0.035]" />
        <div className="absolute -bottom-32 right-20 h-64 w-64 rounded-full bg-[#B85C12]/10" />
        <div className="absolute left-[42%] top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-white/[0.018]" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.09] ring-1 ring-white/10">
                <FileText className="h-4.5 w-4.5 text-white/80" />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.20em] text-white/35">
                  Contractor marketplace
                </p>
                <p className="mt-0.5 text-[10px] font-medium text-white/55">
                  Commercial proposal studio
                </p>
              </div>
            </div>

            <h1 className="mt-6 font-display text-[30px] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[38px]">
              Build a proposal
              <br className="hidden sm:block" /> worth considering.
            </h1>

            <p className="mt-4 max-w-xl text-[12px] leading-6 text-white/50 sm:text-[13px]">
              Present your scope, commercial structure, delivery approach and
              payment terms with complete clarity.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-stretch">
            <div className="min-w-[128px] rounded-2xl bg-white/[0.07] px-4 py-3.5 ring-1 ring-white/[0.06]">
              <div className="flex items-center gap-2">
                <WalletCards className="h-3.5 w-3.5 text-[#D88A46]" />
                <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-white/35">
                  Bid value
                </span>
              </div>

              <p className="mt-2 font-display text-[19px] font-semibold tracking-[-0.02em]">
                ₦{totalCost.toLocaleString()}
              </p>
            </div>

            <div className="min-w-[128px] rounded-2xl bg-white/[0.07] px-4 py-3.5 ring-1 ring-white/[0.06]">
              <div className="flex items-center gap-2">
                <Clock3 className="h-3.5 w-3.5 text-white/45" />
                <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-white/35">
                  Valid for
                </span>
              </div>

              <p className="mt-2 font-display text-[19px] font-semibold tracking-[-0.02em]">
                {bidValidity || '—'}
                <span className="ml-1 text-[10px] font-medium text-white/40">
                  days
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PROPOSAL PROGRESS
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 rounded-[20px] border border-ink/[0.07] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF4EE]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#12613E]" />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink/35">
              Proposal readiness
            </p>
            <p className="mt-0.5 text-[11px] font-medium text-ink/55">
              Complete each commercial section before submitting.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-ink/[0.06]">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                canSubmit ? 'w-full bg-[#12613E]' : 'w-1/2 bg-[#B85C12]'
              }`}
            />
          </div>

          <span className="text-[9px] font-bold uppercase tracking-[0.10em] text-ink/35">
            {canSubmit ? 'Ready to submit' : 'In progress'}
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PROJECT SCOPE
      ───────────────────────────────────────────────────────────── */}
      <Card className="overflow-hidden rounded-[22px] border-ink/[0.07]">
        <CardHeader
          title="Project scope"
          subtitle="Define precisely what your proposal covers."
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

            <Field label="Delivery timeline" required>
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

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-wide text-ink/30">
                  weeks
                </span>
              </div>
            </Field>

            <div className="lg:col-span-2">
              <Field label="Scope of work" required>
                <textarea
                  value={scope}
                  onChange={(event) => setScope(event.target.value)}
                  placeholder="Describe the work, deliverables, interfaces and responsibilities covered by this proposal."
                  className="textarea min-h-36"
                  required
                />
              </Field>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          COST BREAKDOWN
      ───────────────────────────────────────────────────────────── */}
      <Card className="overflow-hidden rounded-[22px] border-ink/[0.07]">
        <CardHeader
          title="Commercial schedule"
          subtitle="Build a transparent cost structure from quantities and rates."
          action={
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F6F8F5] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.10em] text-ink/40">
              <Calculator className="h-3 w-3" />
              Live calculation
            </div>
          }
        />

        <CardBody>
          <div className="overflow-x-auto">
            <div className="min-w-[820px]">
              <div className="grid grid-cols-[2fr_1fr_1fr_1.25fr_40px] gap-3 border-b border-ink/[0.07] pb-3 text-[8px] font-bold uppercase tracking-[0.13em] text-ink/30">
                <span>Description</span>
                <span>Quantity</span>
                <span>Unit</span>
                <span>Rate</span>
                <span />
              </div>

              <div className="divide-y divide-ink/[0.06]">
                {costs.map((item, index) => {
                  const subtotal =
                    (Number(item.quantity) || 0) *
                    (Number(item.rate) || 0)

                  return (
                    <div
                      key={item.id}
                      className="group grid grid-cols-[2fr_1fr_1fr_1.25fr_40px] items-center gap-3 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F6F8F5] font-mono text-[9px] font-semibold text-ink/30">
                          {String(index + 1).padStart(2, '0')}
                        </span>

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
                      </div>

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

                      <div>
                        <div className="relative">
                          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-ink/30">
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
                        </div>

                        {subtotal > 0 && (
                          <div className="mt-1.5 flex items-center justify-between px-1">
                            <span className="text-[8px] font-semibold uppercase tracking-wide text-ink/25">
                              Subtotal
                            </span>

                            <span className="font-mono text-[9px] font-semibold text-ink/45">
                              ₦{subtotal.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeCostItem(item.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-ink/20 transition-all duration-200 hover:bg-red-500/[0.07] hover:text-red-500"
                        aria-label="Remove cost item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-5 border-t border-ink/[0.06] pt-5 sm:flex-row sm:items-end sm:justify-between">
            <button
              type="button"
              onClick={addCostItem}
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-ink/[0.09] bg-white px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-ink/50 transition-all hover:border-[#173629]/20 hover:bg-[#F6F8F5] hover:text-ink"
            >
              <Plus className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-90" />
              Add cost item
            </button>

            <div className="relative overflow-hidden rounded-[18px] bg-[#173629] px-5 py-4 text-right text-white">
              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-white/[0.035]" />

              <div className="relative">
                <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-white/35">
                  Estimated bid value
                </p>

                <p className="mt-1 font-display text-[25px] font-semibold tracking-[-0.025em]">
                  ₦{totalCost.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          EXECUTION APPROACH
      ───────────────────────────────────────────────────────────── */}
      <Card className="overflow-hidden rounded-[22px] border-ink/[0.07]">
        <CardHeader
          title="Execution approach"
          subtitle="Show the client how you intend to deliver the work."
        />

        <CardBody>
          <Field label="Methodology and approach" required>
            <textarea
              value={approach}
              onChange={(event) => setApproach(event.target.value)}
              placeholder="Describe your execution methodology, workforce, quality controls, procurement approach, reporting and key delivery strategy."
              className="textarea min-h-40"
              required
            />
          </Field>

          <div className="mt-4 flex items-start gap-3 rounded-2xl bg-[#F6F8F5] px-4 py-3.5">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink/30" />

            <p className="text-[10px] leading-5 text-ink/40">
              Strong proposals make the delivery method easy to understand:
              explain who will execute the work, how quality will be controlled
              and how progress will be reported.
            </p>
          </div>
        </CardBody>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          PAYMENT MILESTONES
      ───────────────────────────────────────────────────────────── */}
      <Card className="overflow-hidden rounded-[22px] border-ink/[0.07]">
        <CardHeader
          title="Payment milestones"
          subtitle="Structure the commercial release points across the project."
        />

        <CardBody>
          <div className="space-y-3">
            {milestones.map((milestone, index) => {
              const percentage = Number(milestone.percentage) || 0

              return (
                <div
                  key={milestone.id}
                  className="group relative overflow-hidden rounded-[18px] border border-ink/[0.07] bg-white p-4 transition-all duration-200 hover:border-ink/[0.12] hover:shadow-[0_10px_30px_rgba(20,40,30,0.04)]"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F6F8F5] font-mono text-[9px] font-bold text-ink/35">
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      <div className="min-w-0 flex-1">
                        <label className="text-[8px] font-bold uppercase tracking-[0.12em] text-ink/30">
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
                    </div>

                    <div className="w-full sm:w-[180px]">
                      <label className="text-[8px] font-bold uppercase tracking-[0.12em] text-ink/30">
                        Allocation
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

                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-ink/30">
                          %
                        </span>
                      </div>

                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-ink/[0.05]">
                        <div
                          className="h-full rounded-full bg-[#B85C12] transition-all duration-300"
                          style={{
                            width: `${Math.min(Math.max(percentage, 0), 100)}%`,
                          }}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeMilestone(milestone.id)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-ink/20 transition-all duration-200 hover:bg-red-500/[0.07] hover:text-red-500"
                      aria-label="Remove milestone"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-5 flex flex-col gap-4 border-t border-ink/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={addMilestone}
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-ink/[0.09] bg-white px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-ink/50 transition-all hover:border-[#173629]/20 hover:bg-[#F6F8F5] hover:text-ink"
            >
              <Plus className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-90" />
              Add milestone
            </button>

            <div
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[10px] font-bold ${
                milestoneIsValid
                  ? 'bg-[#EAF4EE] text-[#12613E]'
                  : 'bg-[#F8EEE6] text-[#9A4D0A]'
              }`}
            >
              {milestoneIsValid ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                <Info className="h-3.5 w-3.5" />
              )}

              {milestoneIsValid
                ? 'Payment structure balanced'
                : `Milestones total: ${milestoneTotal}%`}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          TERMS + VALIDITY
      ───────────────────────────────────────────────────────────── */}
      <Card className="overflow-hidden rounded-[22px] border-ink/[0.07]">
        <CardHeader
          title="Terms & assumptions"
          subtitle="Make commercial conditions clear before the client reviews your proposal."
        />

        <CardBody>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Field label="Assumptions and exclusions">
                <textarea
                  value={assumptions}
                  onChange={(event) =>
                    setAssumptions(event.target.value)
                  }
                  placeholder="List assumptions, exclusions, client dependencies, site conditions, material assumptions or variation conditions."
                  className="textarea min-h-36"
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

              <div className="mt-3 rounded-2xl bg-[#F6F8F5] p-3.5">
                <div className="flex items-start gap-2.5">
                  <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink/30" />

                  <p className="text-[10px] leading-5 text-ink/40">
                    Your quoted price and commercial terms remain valid for
                    this period.
                  </p>
                </div>
              </div>
            </Field>
          </div>
        </CardBody>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          FINAL REVIEW
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-[22px] bg-[#173629] px-5 py-6 text-white sm:px-7 sm:py-7">
        <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-white/[0.035]" />
        <div className="absolute -bottom-24 right-32 h-40 w-40 rounded-full bg-[#B85C12]/10" />

        <div className="relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.08]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-white/65" />
                </div>

                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/35">
                  Final review
                </span>
              </div>

              <h2 className="mt-4 font-display text-[20px] font-semibold tracking-[-0.025em] sm:text-[23px]">
                Your proposal is ready when the numbers are right.
              </h2>

              <p className="mt-2 max-w-xl text-[11px] leading-5 text-white/45">
                Review your pricing, timeline, assumptions and payment
                structure carefully before sending the proposal to the client.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl bg-white/[0.07] px-4 py-3 ring-1 ring-white/[0.06]">
              <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-white/30">
                Proposal value
              </p>

              <p className="mt-1 font-display text-[21px] font-semibold tracking-[-0.02em]">
                ₦{totalCost.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SUBMISSION NOTICE
      ───────────────────────────────────────────────────────────── */}
      <div className="flex gap-3 rounded-[18px] border border-[#B85C12]/15 bg-[#FBF6F1] px-4 py-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#B85C12]/70" />

        <div>
          <p className="text-[11px] font-bold text-ink">
            Before you submit
          </p>

          <p className="mt-1 text-[10px] leading-5 text-ink/45">
            Ensure your pricing, timeline, assumptions and payment milestones
            are accurate. Submitted bids may be reviewed by the client and
            compared with other verified contractor proposals.
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ACTIONS
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-ink/[0.09] bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-[0.08em] text-ink/50 transition-all duration-200 hover:border-ink/[0.15] hover:bg-[#F6F8F5] hover:text-ink"
        >
          Save draft
        </button>

        <button
          type="submit"
          disabled={!canSubmit}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#173629] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_10px_25px_rgba(23,54,41,0.12)] transition-all duration-200 hover:bg-[#214838] hover:shadow-[0_14px_30px_rgba(23,54,41,0.18)] disabled:cursor-not-allowed disabled:opacity-35 disabled:shadow-none"
        >
          <Send className="h-3.5 w-3.5" />
          Submit bid
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.10em] text-ink/45">
        {label}
        {required && <span className="ml-1 text-[#B85C12]">*</span>}
      </label>

      {children}
    </div>
  )
}