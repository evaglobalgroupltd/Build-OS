import {
  ArrowUpRight,
  Building2,
  Landmark,
  ShieldCheck,
  WalletCards,
} from 'lucide-react'
import type { FundingSource } from '@/modules/escrow/types'

type CustodyNoticeVariant = 'default' | 'compact'

interface CustodyNoticeProps {
  fundingSource: FundingSource
  custodian?: string
  variant?: CustodyNoticeVariant
  className?: string
}

interface FundingSourceConfig {
  label: string
  description: string
  icon: typeof ShieldCheck
}

const custodyConfig: Record<FundingSource, FundingSourceConfig> = {
  partner_escrow: {
    label: 'Funds held by escrow partner',
    description:
      'Funds are held by the designated escrow/payment partner. Build OS does not take custody of the funds.',
    icon: ShieldCheck,
  },

  build_os: {
    label: 'Build OS funding source',
    description:
      'This funding source is configured as Build OS. Confirm the applicable custody, licensing and settlement arrangement before enabling live transactions.',
    icon: Building2,
  },

  direct_bank_transfer: {
    label: 'Direct bank transfer',
    description:
      'Payment is settled through the designated bank channel. Build OS records payment status and verification but does not hold the funds.',
    icon: Landmark,
  },
}

/**
 * Compliance-critical escrow custody notice.
 *
 * BRD scope:
 * - Build OS may track escrow/payment status.
 * - Build OS may verify milestones and payment evidence.
 * - Build OS may make payment recommendations.
 * - Build OS must not imply custody of client funds unless the
 *   underlying regulated/custodial arrangement has been approved.
 *
 * Keep this component reusable anywhere funding, wallet, escrow,
 * milestone payment or settlement status is displayed.
 */
export function CustodyNotice({
  fundingSource,
  custodian,
  variant = 'default',
  className = '',
}: CustodyNoticeProps) {
  const config = custodyConfig[fundingSource]
  const Icon = config.icon

  if (variant === 'compact') {
    return (
      <div
        className={`flex items-center gap-2 rounded-xl border border-line bg-paper-2 px-3 py-2.5 ${className}`}
      >
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white">
          <Icon className="h-3.5 w-3.5 text-ink/45" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-semibold text-ink/70">
            {config.label}
            {custodian ? ` · ${custodian}` : ''}
          </p>

          <p className="mt-0.5 truncate text-[10px] text-ink/40">
            Build OS tracks payment status; it does not hold your funds.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      role="note"
      aria-label="Payment custody information"
      className={`rounded-2xl border border-line bg-paper-2 p-4 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-line">
          <Icon className="h-4 w-4 text-ink/50" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="text-xs font-semibold text-ink">
              {config.label}
            </p>

            {custodian && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[9px] font-semibold text-ink/45 ring-1 ring-line">
                {custodian}
              </span>
            )}
          </div>

          <p className="mt-1 text-[11px] leading-5 text-ink/45">
            {config.description}
          </p>

          <div className="mt-3 flex items-start gap-2 rounded-xl border border-ink/5 bg-white/70 px-3 py-2.5">
            <WalletCards className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink/35" />

            <p className="text-[10px] leading-5 text-ink/45">
              <span className="font-semibold text-ink/60">
                Build OS role:
              </span>{' '}
              tracks funding, verifies milestone evidence and payment
              conditions, and supports payment recommendations. It does not
              hold or custody client funds under the lean-MVP model.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}