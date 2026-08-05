import { Construction } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

/**
 * Forgot Password — Authentication module
 * BRD reference: Sec. 32.1
 *
 * TODO: replace this placeholder with the real implementation.
 * Request a password reset link.
 */
export function ForgotPassword() {
  return (
    <Card>
      <EmptyState
        icon={Construction}
        title="Forgot Password"
        description="Request a password reset link."
        action={
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: Sec. 32.1
          </span>
        }
      />
    </Card>
  )
}
