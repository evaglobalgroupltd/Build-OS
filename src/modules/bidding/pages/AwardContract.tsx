
import {
  AlertTriangle,
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronRight,
  Clock3,
  DollarSign,
  FileCheck2,
  ShieldCheck,
  Star,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface SelectedBid {
  bidId: string
  projectId: string
  projectName: string
  contractorName: string
  contractorCompany: string
  amount: number
  currency: 'NGN' | 'USD'
  timelineWeeks: number
  trustScore: number
  rating: number
  completedProjects: number
  verified: boolean
  materialCost: number
  labourCost: number
  equipmentCost: number
  logisticsCost: number
  overhead: number
  profit: number
  contingency: number
  paymentMilestones: {
    name: string
    percentage: number
    amount: number
  }[]
  bidValidityDays: number
  assumptions: string[]
  riskFlags: string[]
}

const selectedBid: SelectedBid = {
  bidId: 'BID-2048',
  projectId: 'PRJ-1048',
  projectName: 'Luxury Residential Development',
  contractorName: 'Ahmed Construction Ltd',
  contractorCompany: 'Ahmed Construction & Engineering Ltd',
  amount: 76_500_000,
  currency: 'NGN',
  timelineWeeks: 30,
  trustScore: 94,
  rating: 4.9,
  completedProjects: 27,
  verified: true,
  materialCost: 31_500_000,
  labourCost: 17_200_000,
  equipmentCost: 8_400_000,
  logisticsCost: 4_600_000,
  overhead: 3_800_000,
  profit: 6_500_000,
  contingency: 4_500_000,
  paymentMilestones: [
    {
      name: 'Mobilisation',
      percentage: 10,
      amount: 7_650_000,
    },
    {
      name: 'Foundation and substructure',
      percentage: 20,
      amount: 15_300_000,
    },
    {
      name: 'Structure and roofing',
      percentage: 30,
      amount: 22_950_000,
    },
    {
      name: 'MEP and finishing',
      percentage: 30,
      amount: 22_950_000,
    },
    {
      name: 'Handover',
      percentage: 10,
      amount: 7_650_000,
    },
  ],
  bidValidityDays: 30,
  assumptions: [
    'Client provides unrestricted site access.',
    'Approved drawings remain unchanged after contract award.',
    'Major statutory approval fees are excluded unless stated in the scope.',
  ],
  riskFlags: [],
}

function formatAmount(amount: number, currency: string) {
  const symbol = currency === 'NGN' ? '₦' : '$'

  if (amount >= 1_000_000) {
    return `${symbol}${(amount / 1_000_000).toFixed(1)}M`
  }

  if (amount >= 1_000) {
    return `${symbol}${(amount / 1_000).toFixed(0)}K`
  }

  return `${symbol}${amount.toLocaleString()}`
}

const financialItems = [
  ['Materials', 'materialCost'],
  ['Labour', 'labourCost'],
  ['Equipment', 'equipmentCost'],
  ['Logistics', 'logisticsCost'],
  ['Overhead', 'overhead'],
  ['Profit', 'profit'],
  ['Contingency', 'contingency'],
] as const

export function AwardContract() {
  const bid = selectedBid

  const totalBreakdown =
    bid.materialCost +
    bid.labourCost +
    bid.equipmentCost +
    bid.logisticsCost +
    bid.overhead +
    bid.profit +
    bid.contingency

  const riskFree = bid.riskFlags.length === 0

  return (
    <div className="space-y-7">
      {/* ------------------------------------------------------------------ */}
      {/* Executive header                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden rounded-[24px] bg-[#173629] px-6 py-7 text-white sm:px-8 sm:py-8">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/[0.035]" />
        <div className="absolute -bottom-28 right-24 h-56 w-56 rounded-full bg-[#B85C12]/10" />
        <div className="absolute left-[42%] top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-white/[0.018]" />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                <Award className="h-4 w-4 text-white/80" />
              </div>

              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/40">
                Contract award
              </span>

              <span className="h-1 w-1 rounded-full bg-white/20" />

              <span className="font-mono text-[9px] tracking-wide text-white/35">
                {bid.bidId}
              </span>
            </div>

            <h1 className="mt-5 font-display text-[29px] font-semibold leading-tight tracking-[-0.04em] sm:text-[36px]">
              Ready to award the project.
            </h1>

            <p className="mt-3 max-w-2xl text-[12px] leading-5 text-white/50 sm:text-[13px] sm:leading-6">
              Review the selected contractor, commercial structure and
              delivery terms before moving the project into contract
              execution.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4 lg:min-w-[190px]">
            <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/35">
              Selected bid
            </p>

            <p className="mt-1.5 font-display text-[25px] font-semibold tracking-[-0.025em]">
              {formatAmount(bid.amount, bid.currency)}
            </p>

            <div className="mt-2 flex items-center gap-1.5 text-[9px] text-white/40">
              <CheckCircle2 className="h-3 w-3 text-[#9AD5B4]" />
              Selected for award
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Project + contractor                                                */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.75fr)]">
        <Card className="overflow-hidden rounded-[22px] border-ink/[0.07]">
          <div className="border-b border-ink/[0.06] px-5 py-5 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="teal">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="h-3 w-3" />
                      Selected bid
                    </span>
                  </Badge>

                  {bid.verified && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF4EE] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.06em] text-[#12613E]">
                      <ShieldCheck className="h-3 w-3" />
                      Verified contractor
                    </span>
                  )}
                </div>

                <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.13em] text-ink/30">
                  Project
                </p>

                <h2 className="mt-1 font-display text-[21px] font-semibold tracking-[-0.025em] text-ink">
                  {bid.projectName}
                </h2>

                <p className="mt-1 font-mono text-[9px] tracking-wide text-ink/30">
                  {bid.projectId}
                </p>
              </div>

              <div className="rounded-2xl bg-[#F6F8F5] px-4 py-3 sm:text-right">
                <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-ink/30">
                  Contract value
                </p>

                <p className="mt-1 font-display text-[20px] font-semibold tracking-[-0.02em] text-ink">
                  {formatAmount(bid.amount, bid.currency)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-2.5 p-5 sm:grid-cols-3 sm:p-6">
            <div className="rounded-[17px] bg-[#F6F8F5] p-4">
              <p className="text-[8px] font-bold uppercase tracking-[0.11em] text-ink/30">
                Contractor
              </p>

              <p className="mt-2 truncate text-[12px] font-semibold text-ink">
                {bid.contractorName}
              </p>

              <p className="mt-1 truncate text-[10px] text-ink/40">
                {bid.contractorCompany}
              </p>
            </div>

            <div className="rounded-[17px] bg-[#F6F8F5] p-4">
              <p className="text-[8px] font-bold uppercase tracking-[0.11em] text-ink/30">
                Delivery
              </p>

              <p className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-ink">
                <Clock3 className="h-3.5 w-3.5 text-[#B85C12]" />
                {bid.timelineWeeks} weeks
              </p>

              <p className="mt-1 text-[10px] text-ink/40">
                Proposed completion period
              </p>
            </div>

            <div className="rounded-[17px] bg-[#F6F8F5] p-4">
              <p className="text-[8px] font-bold uppercase tracking-[0.11em] text-ink/30">
                Bid validity
              </p>

              <p className="mt-2 text-[13px] font-semibold text-ink">
                {bid.bidValidityDays} days
              </p>

              <p className="mt-1 text-[10px] text-ink/40">
                Commercial terms remain valid
              </p>
            </div>
          </div>
        </Card>

        {/* ---------------------------------------------------------------- */}
        {/* Contractor assessment                                             */}
        {/* ---------------------------------------------------------------- */}
        <Card className="relative overflow-hidden rounded-[22px] border-ink/[0.07] p-5 sm:p-6">
          <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#EAF4EE]/70" />

          <div className="relative">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/30">
              Contractor assessment
            </p>

            <h2 className="mt-1 font-display text-[19px] font-semibold tracking-[-0.025em] text-ink">
              Trust & performance
            </h2>

            <div className="mt-6 flex items-center gap-4">
              <div className="relative flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full border-[5px] border-[#12613E]/10 bg-[#F6F8F5]">
                <div className="absolute inset-0 rounded-full border-[3px] border-[#12613E]/60 border-l-transparent border-b-transparent" />

                <span className="font-display text-[21px] font-bold tracking-[-0.03em] text-ink">
                  {bid.trustScore}
                </span>
              </div>

              <div>
                <p className="text-[13px] font-semibold text-ink">
                  Trust score
                </p>

                <p className="mt-1 text-[10px] font-medium text-[#12613E]">
                  Strong verified standing
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-0 border-t border-ink/[0.06]">
              <div className="flex items-center justify-between border-b border-ink/[0.05] py-3">
                <span className="text-[10px] text-ink/40">
                  Client rating
                </span>

                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-ink">
                  <Star className="h-3.5 w-3.5 fill-current text-[#B85C12]" />
                  {bid.rating}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-ink/[0.05] py-3">
                <span className="text-[10px] text-ink/40">
                  Completed projects
                </span>

                <span className="text-[11px] font-semibold text-ink">
                  {bid.completedProjects}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-[10px] text-ink/40">
                  Verification
                </span>

                <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#12613E]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Financial breakdown                                                 */}
      {/* ------------------------------------------------------------------ */}
      <Card className="overflow-hidden rounded-[22px] border-ink/[0.07]">
        <div className="flex flex-col gap-4 border-b border-ink/[0.06] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8EEE6]">
              <DollarSign className="h-4 w-4 text-[#B85C12]" />
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/30">
                Bid financials
              </p>

              <h2 className="mt-1 font-display text-[19px] font-semibold tracking-[-0.025em] text-ink">
                Cost breakdown
              </h2>
            </div>
          </div>

          <div className="rounded-full bg-[#F6F8F5] px-3 py-1.5">
            <span className="text-[9px] font-semibold text-ink/40">
              Total submitted value
            </span>
            <span className="ml-2 font-mono text-[10px] font-bold text-ink">
              {formatAmount(totalBreakdown, bid.currency)}
            </span>
          </div>
        </div>

        <div className="grid gap-px bg-ink/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {financialItems.map(([label, key]) => (
            <div key={label} className="bg-white p-5">
              <p className="text-[8px] font-bold uppercase tracking-[0.11em] text-ink/30">
                {label}
              </p>

              <p className="mt-2 font-mono text-[13px] font-semibold text-ink">
                {formatAmount(bid[key], bid.currency)}
              </p>
            </div>
          ))}

          <div className="bg-white p-5 sm:col-span-2 lg:col-span-1">
            <p className="text-[8px] font-bold uppercase tracking-[0.11em] text-ink/30">
              Profit
            </p>

            <p className="mt-2 font-mono text-[13px] font-semibold text-[#12613E]">
              {formatAmount(bid.profit, bid.currency)}
            </p>
          </div>

          <div className="bg-[#173629] p-5">
            <p className="text-[8px] font-bold uppercase tracking-[0.11em] text-white/40">
              Total bid
            </p>

            <p className="mt-2 font-display text-[18px] font-semibold tracking-[-0.02em] text-white">
              {formatAmount(totalBreakdown, bid.currency)}
            </p>
          </div>
        </div>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Payment milestones                                                   */}
      {/* ------------------------------------------------------------------ */}
      <Card className="overflow-hidden rounded-[22px] border-ink/[0.07]">
        <div className="border-b border-ink/[0.06] px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/30">
                Payment structure
              </p>

              <h2 className="mt-1 font-display text-[19px] font-semibold tracking-[-0.025em] text-ink">
                Proposed milestones
              </h2>

              <p className="mt-1 max-w-2xl text-[10px] leading-5 text-ink/40">
                Payments remain subject to evidence, verification and approval
                under the Build OS escrow controls.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#EAF4EE] px-3 py-1.5 text-[9px] font-bold text-[#12613E]">
              <ShieldCheck className="h-3 w-3" />
              Escrow controlled
            </span>
          </div>
        </div>

        <div className="divide-y divide-ink/[0.06]">
          {bid.paymentMilestones.map((milestone, index) => (
            <div
              key={milestone.name}
              className="group px-5 py-4 transition-colors duration-200 hover:bg-[#F9FAF8] sm:px-6"
            >
              <div className="flex items-center gap-4">
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F6F8F5] font-mono text-[10px] font-bold text-ink/50">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[12px] font-semibold text-ink">
                        {milestone.name}
                      </p>

                      <p className="mt-0.5 text-[9px] text-ink/35">
                        {milestone.percentage}% of contract value
                      </p>
                    </div>

                    <p className="font-mono text-[12px] font-bold text-ink">
                      {formatAmount(milestone.amount, bid.currency)}
                    </p>
                  </div>

                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-ink/[0.05]">
                    <div
                      className="h-full rounded-full bg-[#173629] transition-all duration-500"
                      style={{ width: `${milestone.percentage * 3.3333}%` }}
                    />
                  </div>
                </div>

                <ChevronRight className="hidden h-4 w-4 shrink-0 text-ink/15 transition-transform duration-200 group-hover:translate-x-0.5 sm:block" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Assumptions + risk review                                           */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-[22px] border-ink/[0.07] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F6F8F5]">
              <FileCheck2 className="h-4 w-4 text-ink/55" />
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/30">
                Bid assumptions
              </p>

              <h2 className="mt-1 font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">
                Commercial assumptions
              </h2>
            </div>
          </div>

          <div className="mt-5 space-y-2.5">
            {bid.assumptions.map((assumption, index) => (
              <div
                key={assumption}
                className="flex gap-3 rounded-[16px] bg-[#F6F8F5] p-3.5"
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white">
                  <span className="font-mono text-[8px] font-bold text-ink/35">
                    {index + 1}
                  </span>
                </div>

                <p className="text-[10px] leading-5 text-ink/50">
                  {assumption}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[22px] border-ink/[0.07] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                riskFree ? 'bg-[#EAF4EE]' : 'bg-[#F8EEE6]'
              }`}
            >
              <AlertTriangle
                className={`h-4 w-4 ${
                  riskFree ? 'text-[#12613E]' : 'text-[#B85C12]'
                }`}
              />
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/30">
                Risk review
              </p>

              <h2 className="mt-1 font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">
                Award readiness
              </h2>
            </div>
          </div>

          {riskFree ? (
            <div className="mt-5 rounded-[18px] border border-[#12613E]/10 bg-[#EAF4EE] p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#12613E]" />
                </div>

                <p className="text-[11px] font-bold text-[#12613E]">
                  No outstanding bid risks
                </p>
              </div>

              <p className="mt-2 pl-9 text-[10px] leading-5 text-[#12613E]/65">
                The selected bid currently has no flagged commercial or
                verification risks.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-2">
              {bid.riskFlags.map((risk) => (
                <div
                  key={risk}
                  className="flex gap-2.5 rounded-[16px] bg-red-500/[0.05] p-3.5 text-[10px] leading-5 text-red-600"
                >
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  {risk}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Final award action                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden rounded-[22px] bg-[#173629] px-5 py-6 text-white sm:px-7 sm:py-7">
        <div className="absolute -right-12 -top-20 h-48 w-48 rounded-full bg-white/[0.035]" />
        <div className="absolute -bottom-16 right-20 h-36 w-36 rounded-full bg-[#B85C12]/10" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <ShieldCheck className="h-4 w-4 text-[#9AD5B4]" />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-white/55">
                Award readiness
              </p>
            </div>

            <h2 className="mt-3 font-display text-[21px] font-semibold tracking-[-0.025em]">
              Ready for contract award
            </h2>

            <p className="mt-2 max-w-xl text-[10px] leading-5 text-white/45 sm:text-[11px]">
              By awarding this bid, the contractor will be designated for the
              project. Contract execution, escrow funding and milestone
              controls will continue through the relevant Build OS workflows.
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            <div className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3">
              <p className="text-[8px] font-bold uppercase tracking-[0.10em] text-white/30">
                Award value
              </p>

              <p className="mt-1 font-display text-[17px] font-semibold">
                {formatAmount(bid.amount, bid.currency)}
              </p>
            </div>

            <button
              type="button"
              className="
                group
                inline-flex
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-white
                px-5
                py-3.5
                text-[11px]
                font-bold
                text-[#173629]
                shadow-[0_10px_30px_rgba(0,0,0,0.14)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#F6F8F5]
              "
            >
              Award contract
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
