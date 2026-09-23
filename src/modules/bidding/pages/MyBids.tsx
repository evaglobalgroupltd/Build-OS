
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  FileText,
  Filter,
  Gavel,
  Send,
  ShieldCheck,
  TrendingUp,
  XCircle,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { BidList } from '@/modules/bidding/components/BidList'
import { bids } from '@/data/mockData'

export function MyBids() {
  const submittedCount = bids.filter(
    (bid) => bid.status === 'submitted',
  ).length

  const shortlistedCount = bids.filter(
    (bid) => bid.status === 'shortlisted',
  ).length

  const awardedCount = bids.filter(
    (bid) => bid.status === 'awarded',
  ).length

  const rejectedCount = bids.filter(
    (bid) => bid.status === 'rejected',
  ).length

  const activeCount = submittedCount + shortlistedCount

  return (
    <div className="space-y-7">
      {/* ─────────────────────────────────────────────────────────────
          PREMIUM HERO
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-[24px] bg-[#173629] px-6 py-7 text-white sm:px-8 sm:py-8">
        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-white/[0.035]" />
        <div className="absolute -bottom-32 right-16 h-64 w-64 rounded-full bg-[#B85C12]/10" />
        <div className="absolute left-[45%] top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-white/[0.018]" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.09] ring-1 ring-white/10">
                <Gavel className="h-4.5 w-4.5 text-white/80" />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.20em] text-white/35">
                  Contractor marketplace
                </p>

                <p className="mt-0.5 text-[10px] font-medium text-white/55">
                  Proposal portfolio
                </p>
              </div>
            </div>

            <h1 className="mt-6 font-display text-[30px] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[38px]">
              Your bids,
              <br className="hidden sm:block" /> in motion.
            </h1>

            <p className="mt-4 max-w-xl text-[12px] leading-6 text-white/50 sm:text-[13px]">
              Keep every proposal visible, understand where opportunities
              stand and stay ready for the next project.
            </p>
          </div>

          <button
            type="button"
            className="group inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-[0.08em] text-[#173629] shadow-[0_10px_25px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F8FAF7] hover:shadow-[0_14px_30px_rgba(0,0,0,0.16)]"
          >
            Find projects
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Hero intelligence strip */}
        <div className="relative mt-8 grid grid-cols-2 gap-2.5 border-t border-white/[0.07] pt-5 sm:grid-cols-4">
          <HeroMetric
            label="Total proposals"
            value={bids.length}
          />

          <HeroMetric
            label="Active"
            value={activeCount}
          />

          <HeroMetric
            label="Shortlisted"
            value={shortlistedCount}
          />

          <HeroMetric
            label="Awarded"
            value={awardedCount}
            accent
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          EXECUTIVE SUMMARY
      ───────────────────────────────────────────────────────────── */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink/30">
              Portfolio overview
            </p>

            <p className="mt-1 text-[11px] text-ink/40">
              Current position across your submitted proposals.
            </p>
          </div>

          {rejectedCount > 0 && (
            <span className="hidden text-[9px] font-semibold text-ink/30 sm:block">
              {rejectedCount} proposal{rejectedCount === 1 ? '' : 's'} closed
            </span>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Total bids"
            value={bids.length}
            description="All submitted proposals"
            icon={FileText}
            eyebrow="Portfolio"
            tone="neutral"
          />

          <SummaryCard
            label="Awaiting review"
            value={submittedCount}
            description="Currently under review"
            icon={Clock3}
            eyebrow="In progress"
            tone="amber"
          />

          <SummaryCard
            label="Shortlisted"
            value={shortlistedCount}
            description="Moved to the next stage"
            icon={TrendingUp}
            eyebrow="Opportunity"
            tone="teal"
          />

          <SummaryCard
            label="Awarded"
            value={awardedCount}
            description={`${rejectedCount} rejected`}
            icon={CheckCircle2}
            eyebrow="Won"
            tone="green"
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          BID PIPELINE
      ───────────────────────────────────────────────────────────── */}
      <Card className="overflow-hidden rounded-[22px] border-ink/[0.07]">
        <CardHeader
          title="Submitted proposals"
          subtitle="Review the bids currently moving through your commercial pipeline."
          action={
            <button
              type="button"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/[0.08] bg-white px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.08em] text-ink/45 transition-all duration-200 hover:border-ink/[0.14] hover:bg-[#F6F8F5] hover:text-ink"
            >
              <Filter className="h-3 w-3 transition-transform duration-200 group-hover:rotate-12" />
              Filter
            </button>
          }
        />

        <CardBody>
          {bids.length > 0 ? (
            <BidList bids={bids} />
          ) : (
            <EmptyBidsState />
          )}
        </CardBody>
      </Card>

      {/* ─────────────────────────────────────────────────────────────
          PIPELINE FOOTER
      ───────────────────────────────────────────────────────────── */}
      {bids.length > 0 && (
        <section className="relative overflow-hidden rounded-[22px] bg-[#F6F8F5] px-5 py-5 sm:px-6">
          <div className="absolute -right-12 -top-16 h-36 w-36 rounded-full bg-[#173629]/[0.025]" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white">
                <ShieldCheck className="h-3.5 w-3.5 text-[#12613E]" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.10em] text-ink/45">
                  Marketplace profile
                </p>

                <p className="mt-1 max-w-xl text-[10px] leading-5 text-ink/40">
                  Keep your proposals clear, commercially transparent and
                  consistent to strengthen the information clients see when
                  reviewing your bids.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="group inline-flex w-fit shrink-0 items-center gap-2 text-[9px] font-bold uppercase tracking-[0.08em] text-[#173629] transition-colors hover:text-[#B85C12]"
            >
              View profile
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>
        </section>
      )}
    </div>
  )
}

interface HeroMetricProps {
  label: string
  value: number
  accent?: boolean
}

function HeroMetric({
  label,
  value,
  accent = false,
}: HeroMetricProps) {
  return (
    <div className="rounded-2xl bg-white/[0.055] px-4 py-3 ring-1 ring-white/[0.04]">
      <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-white/30">
        {label}
      </p>

      <p
        className={`mt-1.5 font-display text-[20px] font-semibold tracking-[-0.025em] ${
          accent ? 'text-[#E4A36C]' : 'text-white'
        }`}
      >
        {value}
      </p>
    </div>
  )
}

interface SummaryCardProps {
  label: string
  value: number
  description: string
  eyebrow: string
  icon: React.ComponentType<{ className?: string }>
  tone: 'neutral' | 'amber' | 'teal' | 'green'
}

function SummaryCard({
  label,
  value,
  description,
  eyebrow,
  icon: Icon,
  tone,
}: SummaryCardProps) {
  const toneStyles = {
    neutral: {
      icon: 'bg-ink/[0.045] text-ink/45',
      accent: 'bg-ink/[0.12]',
      number: 'text-ink',
    },
    amber: {
      icon: 'bg-[#F8EEE6] text-[#B85C12]',
      accent: 'bg-[#B85C12]',
      number: 'text-ink',
    },
    teal: {
      icon: 'bg-[#EAF4EE] text-[#12613E]',
      accent: 'bg-[#12613E]',
      number: 'text-ink',
    },
    green: {
      icon: 'bg-[#EAF4EE] text-[#12613E]',
      accent: 'bg-[#173629]',
      number: 'text-ink',
    },
  }

  const styles = toneStyles[tone]

  return (
    <Card className="group relative overflow-hidden rounded-[20px] border-ink/[0.07] bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(20,40,30,0.06)]">
      <div
        className={`absolute inset-x-0 top-0 h-0.5 ${styles.accent}`}
      />

      <CardBody>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-ink/30">
              {eyebrow}
            </p>

            <p className="mt-1.5 text-[10px] font-semibold text-ink/45">
              {label}
            </p>

            <p
              className={`mt-2 font-display text-[27px] font-semibold tracking-[-0.035em] ${styles.number}`}
            >
              {value}
            </p>

            <p className="mt-1 text-[10px] leading-4 text-ink/35">
              {description}
            </p>
          </div>

          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${styles.icon}`}
          >
            <Icon className="h-4 w-4" />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

function EmptyBidsState() {
  return (
    <div className="relative overflow-hidden rounded-[20px] border border-dashed border-ink/[0.10] bg-[#FBFCFA] px-6 py-16 text-center">
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#173629]/[0.025]" />
      <div className="absolute -bottom-16 left-8 h-32 w-32 rounded-full bg-[#B85C12]/[0.035]" />

      <div className="relative">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_8px_25px_rgba(20,40,30,0.06)] ring-1 ring-ink/[0.05]">
          <Gavel className="h-5 w-5 text-ink/30" />
        </div>

        <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.16em] text-ink/30">
          Proposal portfolio
        </p>

        <h3 className="mt-2 font-display text-[20px] font-semibold tracking-[-0.025em] text-ink">
          No bids submitted yet
        </h3>

        <p className="mx-auto mt-2 max-w-sm text-[11px] leading-5 text-ink/40">
          Explore available projects and submit your first proposal to begin
          building your contractor record.
        </p>

        <button
          type="button"
          className="group mt-6 inline-flex items-center gap-2 rounded-full bg-[#173629] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#214838] hover:shadow-[0_10px_25px_rgba(23,54,41,0.14)]"
        >
          <Send className="h-3.5 w-3.5" />
          Browse projects
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  )
}