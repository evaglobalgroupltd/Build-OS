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
      'Funds are held by the designated escrow or payment partner. Build OS does not take custody of client funds.',
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
        role="note"
        aria-label="Payment custody information"
        className={[
          'group flex items-center gap-3 rounded-2xl',
          'border border-ink/[0.07]',
          'bg-[#F7F8F6]',
          'px-3.5 py-3',
          'transition-all duration-300',
          'hover:border-ink/[0.11]',
          'hover:bg-white',
          className,
        ].join(' ')}
      >
        {/* Icon */}
        <div
          className="
            flex h-8 w-8 shrink-0 items-center justify-center
            rounded-xl
            border border-ink/[0.06]
            bg-white
            shadow-[0_3px_12px_rgba(20,30,25,0.04)]
          "
        >
          <Icon className="h-3.5 w-3.5 text-ink/45" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-1.5">
            <p className="truncate text-[10.5px] font-semibold tracking-[-0.01em] text-ink/75">
              {config.label}
            </p>

            {custodian && (
              <>
                <span className="h-1 w-1 shrink-0 rounded-full bg-ink/20" />

                <span className="truncate text-[10px] font-medium text-ink/40">
                  {custodian}
                </span>
              </>
            )}
          </div>

          <p className="mt-0.5 truncate text-[9.5px] leading-4 text-ink/38">
            Build OS tracks payment status; it does not hold client funds.
          </p>
        </div>

        {/* Subtle directional affordance */}
        <ArrowUpRight
          className="
            h-3.5 w-3.5 shrink-0
            text-ink/20
            transition-all duration-300
            group-hover:-translate-y-0.5
            group-hover:translate-x-0.5
            group-hover:text-ink/40
          "
        />
      </div>
    )
  }

  return (
    <div
      role="note"
      aria-label="Payment custody information"
      className={[
        'overflow-hidden rounded-[20px]',
        'border border-ink/[0.07]',
        'bg-white',
        'shadow-[0_8px_30px_rgba(20,30,25,0.045)]',
        className,
      ].join(' ')}
    >
      {/* ===================================================== */}
      {/* Header                                                 */}
      {/* ===================================================== */}

      <div className="border-b border-ink/[0.06] px-5 py-4.5 sm:px-5.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            {/* Icon */}
            <div
              className="
                flex h-10 w-10 shrink-0 items-center justify-center
                rounded-[13px]
                border border-[#12613E]/10
                bg-[#EAF4EE]
                text-[#12613E]
              "
            >
              <Icon className="h-[17px] w-[17px]" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink/35">
                  Funding & custody
                </p>

                <span className="hidden h-1 w-1 rounded-full bg-[#12613E]/40 sm:block" />

                <span className="hidden text-[9px] font-semibold uppercase tracking-[0.12em] text-[#12613E]/65 sm:block">
                  Verified structure
                </span>
              </div>

              <h3 className="mt-1 font-display text-[14px] font-semibold tracking-[-0.02em] text-ink">
                {config.label}
              </h3>
            </div>
          </div>

          {/* Custodian */}
          {custodian && (
            <span
              className="
                hidden shrink-0 items-center
                rounded-full
                border border-ink/[0.07]
                bg-[#F7F8F6]
                px-2.5 py-1.5
                text-[9px]
                font-semibold
                text-ink/50
                sm:inline-flex
              "
            >
              {custodian}
            </span>
          )}
        </div>
      </div>

      {/* ===================================================== */}
      {/* Main disclosure                                        */}
      {/* ===================================================== */}

      <div className="px-5 py-5 sm:px-5.5">
        <p className="max-w-3xl text-[11.5px] leading-[1.8] text-ink/48">
          {config.description}
        </p>

        {/* Mobile custodian */}
        {custodian && (
          <div className="mt-3 flex sm:hidden">
            <span
              className="
                inline-flex items-center
                rounded-full
                border border-ink/[0.07]
                bg-[#F7F8F6]
                px-2.5 py-1.5
                text-[9px]
                font-semibold
                text-ink/50
              "
            >
              {custodian}
            </span>
          </div>
        )}

        {/* =================================================== */}
        {/* Build OS role                                        */}
        {/* =================================================== */}

        <div
          className="
            mt-5
            rounded-[16px]
            border border-ink/[0.06]
            bg-[#F7F8F6]
            p-3.5
            sm:p-4
          "
        >
          <div className="flex items-start gap-3">
            {/* Role icon */}
            <div
              className="
                mt-0.5
                flex h-8 w-8 shrink-0 items-center justify-center
                rounded-xl
                bg-white
                text-ink/40
                shadow-[0_2px_8px_rgba(20,30,25,0.035)]
                ring-1 ring-ink/[0.05]
              "
            >
              <WalletCards className="h-3.5 w-3.5" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink/40">
                  Build OS role
                </p>

                <span className="rounded-full bg-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.08em] text-ink/35 ring-1 ring-ink/[0.05]">
                  Platform
                </span>
              </div>

              <p className="mt-1.5 text-[10.5px] leading-[1.75] text-ink/48">
                Build OS tracks funding, verifies milestone evidence and
                payment conditions, and supports payment recommendations.
                It does not hold or custody client funds under the lean-MVP
                model.
              </p>
            </div>
          </div>
        </div>

        {/* =================================================== */}
        {/* Compliance footer                                    */}
        {/* =================================================== */}

        <div className="mt-4 flex items-center gap-2 px-0.5">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#12613E]/55" />

          <p className="text-[9.5px] leading-4 text-ink/35">
            Funding custody remains with the designated payment or escrow
            arrangement.
          </p>
        </div>
      </div>
    </div>
  )
}