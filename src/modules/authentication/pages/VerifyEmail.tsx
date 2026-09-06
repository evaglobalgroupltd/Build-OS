import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Loader2, MailCheck, ShieldAlert } from 'lucide-react'
import { useToast } from '@/context/ToastContext'
import { Button } from '@/components/ui/Button'
import { AuthLayout } from '@/layouts/AuthLayout'

/**
 * Verify Email — Authentication module
 * BRD reference: Sec. 32.1
 *
 * Confirm an email address via one-time link.
 * Demo-only: real implementation wires this to authService.verifyEmail(token) (Sec. 32.1),
 * which validates the token server-side (expiry + single-use).
 */

type Status = 'verifying' | 'success' | 'invalid'

const RESEND_SECONDS = 30

export function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const { showToast } = useToast()

  const [status, setStatus] = useState<Status>(token ? 'verifying' : 'invalid')
  const [secondsLeft, setSecondsLeft] = useState(0)

  useEffect(() => {
    if (!token) return
    setStatus('verifying')
    // Demo-only: real implementation calls authService.verifyEmail(token) (Sec. 32.1)
    const timer = window.setTimeout(() => setStatus('success'), 800)
    return () => window.clearTimeout(timer)
  }, [token])

  useEffect(() => {
    if (secondsLeft <= 0) return
    const timer = window.setInterval(() => setSecondsLeft((s) => s - 1), 1000)
    return () => window.clearInterval(timer)
  }, [secondsLeft])

  function handleResend() {
    if (secondsLeft > 0) return
    setSecondsLeft(RESEND_SECONDS)
    // Demo-only: real implementation calls authService.resendVerificationEmail() (Sec. 32.1)
    showToast({ tone: 'success', title: 'Verification email sent', description: 'Check your inbox for a new link.' })
  }

  if (status === 'verifying') {
    return (
      <AuthLayout title="Verifying your email" subtitle="This will just take a moment.">
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-teal-light text-teal">
            <Loader2 size={22} className="animate-spin" aria-hidden="true" />
          </div>
          <p className="text-sm text-ink/60">Confirming your one-time link…</p>
        </div>
      </AuthLayout>
    )
  }

  if (status === 'success') {
    return (
      <AuthLayout
        title="Email verified"
        subtitle="Your email address has been confirmed."
        footer={
          <>
            <Link to="/login" className="font-medium text-ink hover:underline">
              Log in
            </Link>
          </>
        }
      >
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-teal-light text-teal">
            <CheckCircle2 size={22} aria-hidden="true" />
          </div>
          <p className="text-sm text-ink/60">Thanks for confirming your email. You're all set to log in.</p>
          <Button className="w-full" icon={<ArrowRight size={15} />} onClick={() => (window.location.href = '/login')}>
            Go to log in
          </Button>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Link invalid or expired"
      subtitle="This verification link is no longer valid."
      footer={
        <>
          <Link to="/login" className="font-medium text-ink hover:underline">
            Back to log in
          </Link>
        </>
      }
    >
      <div className="flex flex-col items-center gap-4 py-4 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-brick-light text-brick">
          <ShieldAlert size={22} aria-hidden="true" />
        </div>
        <p className="text-sm text-ink/60">
          Verification links expire after 30 minutes and can only be used once. We can send a new one to your inbox.
        </p>
        <Button
          className="w-full"
          disabled={secondsLeft > 0}
          icon={secondsLeft > 0 ? undefined : <MailCheck size={15} />}
          onClick={handleResend}
        >
          {secondsLeft > 0 ? `Resend available in ${secondsLeft}s` : 'Resend verification email'}
        </Button>
      </div>
    </AuthLayout>
  )
}