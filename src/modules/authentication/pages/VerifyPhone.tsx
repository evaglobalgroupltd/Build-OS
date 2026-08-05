import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Verify Phone — Authentication module
 * BRD reference: Sec. 32.1
 *
 * TODO: replace this placeholder with the real implementation.
 * Confirm a phone number via OTP.
 */
export function VerifyPhone() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Verify Phone"
        description="Confirm a phone number via OTP."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 32.1
          </span>
        }
      />
    </Card>
  )
}
