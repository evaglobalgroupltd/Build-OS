import { ShieldCheck } from 'lucide-react'
import type { FundingSource } from '@/modules/escrow/types'

const custodyLabel: Record<FundingSource, string> = {
  partner_escrow: 'Held by our escrow partner',
  build_os: 'Held by Build OS',
  direct_bank_transfer: 'Paid via direct bank transfer',
}

/**
 * Renders wherever payment/escrow status is shown. Exists so the frontend
 * never implies Build OS is a regulated custodian of client funds when it
 * isn't (BRD Lean-MVP scope: funds are partner-held or bank-transferred;
 * Build OS shows status and payment *recommendations*, not custody).
 *
 * Do not delete this or reword it to sound custodial without checking with
 * product/legal first — this is a compliance-relevant string, not filler copy.
 */
export function CustodyNotice({ fundingSource, custodian }: { fundingSource: FundingSource; custodian?: string }) {
  return (
    <div className="flex items-start gap-2.5 rounded-md border border-line bg-paper-2 px-3.5 py-3">
      <ShieldCheck size={16} className="mt-0.5 shrink-0 text-ink/40" />
      <div>
        <p className="text-xs font-medium text-ink/70">
          {custodyLabel[fundingSource]}
          {custodian ? ` — ${custodian}` : ''}
        </p>
        <p className="mt-0.5 text-xs text-ink/45">
          Build OS tracks and verifies milestones to recommend when payments
          release. It does not hold your funds.
        </p>
      </div>
    </div>
  )
}