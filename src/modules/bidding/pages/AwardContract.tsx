import {
  AlertTriangle,
  ArrowRight,
  Award,
  CheckCircle2,
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <Award className="h-5 w-5 text-ink/70" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Contract Award
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Award Contract
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Review the selected bid and confirm the contractor award before
            the project moves into contract execution.
          </p>
        </div>

        <Badge tone="teal">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Selected bid
          </span>
        </Badge>
      </div>

      {/* Project + contractor */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Project
              </p>

              <h2 className="mt-1 font-display text-xl font-semibold text-ink">
                {bid.projectName}
              </h2>

              <p className="mt-1 font-mono text-[10px] text-ink/35">
                {bid.projectId}
              </p>
            </div>

            <div className="rounded-xl bg-paper-2 px-4 py-3 text-right">
              <p className="text-[10px] uppercase tracking-wide text-ink/35">
                Selected bid
              </p>
              <p className="mt-1 font-mono text-lg font-semibold text-ink">
                {formatAmount(bid.amount, bid.currency)}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-line p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                Contractor
              </p>

              <p className="mt-1.5 text-sm font-semibold text-ink">
                {bid.contractorName}
              </p>

              <p className="mt-0.5 text-xs text-ink/40">
                {bid.contractorCompany}
              </p>
            </div>

            <div className="rounded-xl border border-line p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                Delivery
              </p>

              <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-ink">
                <Clock3 className="h-3.5 w-3.5 text-ink/45" />
                {bid.timelineWeeks} weeks
              </p>
            </div>

            <div className="rounded-xl border border-line p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                Bid validity
              </p>

              <p className="mt-1.5 text-sm font-semibold text-ink">
                {bid.bidValidityDays} days
              </p>
            </div>
          </div>
        </Card>

        {/* Contractor trust */}
        <Card className="p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
            Contractor assessment
          </p>

          <h2 className="mt-1 font-display text-lg font-semibold text-ink">
            Trust & performance
          </h2>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-ink/10">
              <span className="font-display text-xl font-bold text-ink">
                {bid.trustScore}
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold text-ink">
                Trust score
              </p>

              <p className="mt-1 text-xs text-emerald-700">
                Excellent standing
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3 border-t border-line pt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-ink/40">Client rating</span>

              <span className="flex items-center gap-1 font-semibold text-ink">
                <Star className="h-3.5 w-3.5 fill-current" />
                {bid.rating}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-ink/40">Completed projects</span>
              <span className="font-semibold text-ink">
                {bid.completedProjects}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-ink/40">Verification</span>

              <span className="flex items-center gap-1 text-emerald-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Financial breakdown */}
      <Card className="overflow-hidden">
        <div className="border-b border-line px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <DollarSign className="h-4 w-4 text-ink/60" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Bid financials
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Cost breakdown
              </h2>
            </div>
          </div>
        </div>

        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Materials', bid.materialCost],
            ['Labour', bid.labourCost],
            ['Equipment', bid.equipmentCost],
            ['Logistics', bid.logisticsCost],
            ['Overhead', bid.overhead],
            ['Profit', bid.profit],
            ['Contingency', bid.contingency],
            ['Total bid', totalBreakdown],
          ].map(([label, amount]) => (
            <div key={label} className="bg-white p-5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                {label}
              </p>

              <p
                className={
                  label === 'Total bid'
                    ? 'mt-1.5 font-mono text-base font-bold text-ink'
                    : 'mt-1.5 font-mono text-sm font-semibold text-ink'
                }
              >
                {formatAmount(Number(amount), bid.currency)}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Payment milestones */}
      <Card className="overflow-hidden">
        <div className="border-b border-line px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
            Payment structure
          </p>

          <h2 className="mt-1 font-display text-lg font-semibold text-ink">
            Proposed milestones
          </h2>

          <p className="mt-1 text-xs text-ink/40">
            Payments should remain subject to evidence, verification and
            approval under the Build OS escrow controls.
          </p>
        </div>

        <div className="divide-y divide-line">
          {bid.paymentMilestones.map((milestone, index) => (
            <div
              key={milestone.name}
              className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 font-mono text-xs font-semibold text-ink/60">
                  {index + 1}
                </div>

                <div>
                  <p className="text-sm font-medium text-ink">
                    {milestone.name}
                  </p>

                  <p className="mt-0.5 text-xs text-ink/40">
                    {milestone.percentage}% of contract value
                  </p>
                </div>
              </div>

              <p className="font-mono text-sm font-semibold text-ink">
                {formatAmount(milestone.amount, bid.currency)}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Assumptions and risk */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <FileCheck2 className="h-5 w-5 text-ink/50" />

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Bid assumptions
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Commercial assumptions
              </h2>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {bid.assumptions.map((assumption) => (
              <div
                key={assumption}
                className="flex gap-3 rounded-xl bg-paper-2 p-3"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

                <p className="text-xs leading-5 text-ink/55">
                  {assumption}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-ink/50" />

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Risk review
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Award readiness
              </h2>
            </div>
          </div>

          {bid.riskFlags.length === 0 ? (
            <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />

                <p className="text-sm font-semibold text-emerald-700">
                  No outstanding bid risks
                </p>
              </div>

              <p className="mt-1 text-xs leading-5 text-emerald-700/70">
                The selected bid currently has no flagged commercial or
                verification risks.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-2">
              {bid.riskFlags.map((risk) => (
                <div
                  key={risk}
                  className="flex gap-2 rounded-xl bg-red-500/5 p-3 text-xs text-red-600"
                >
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  {risk}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Award confirmation */}
      <Card className="border-ink/10 bg-paper-2 p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />

              <p className="text-sm font-semibold text-ink">
                Ready for contract award
              </p>
            </div>

            <p className="mt-2 max-w-2xl text-xs leading-5 text-ink/45">
              By awarding this bid, the contractor will be designated for the
              project. Contract execution, escrow funding and milestone
              controls will continue through the relevant Build OS workflows.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-ink/90"
          >
            Award contract
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </Card>
    </div>
  )
}