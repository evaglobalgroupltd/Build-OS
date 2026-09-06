import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Loader2, MailCheck } from 'lucide-react'
import { useToast } from '@/context/ToastContext'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/forms/FormField'
import { AuthLayout } from '@/layouts/AuthLayout'

/**
 * Forgot Password — Authentication module
 * BRD reference: Sec. 32.1
 *
 * Request a password reset link.
 * Demo-only: real implementation wires this to authService (Sec. 32.1)
 * and should not reveal whether an email exists in the system.
 */

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function ForgotPassword() {
  const { showToast } = useToast()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) {
      setError('Enter your email address.')
      return
    }
    if (!isValidEmail(email)) {
      setError("That doesn't look like a valid email address.")
      return
    }
    setError(undefined)

    setIsSubmitting(true)
    // Demo-only: real implementation calls authService.requestPasswordReset (Sec. 32.1)
    window.setTimeout(() => {
      setIsSubmitting(false)
      setIsSent(true)
      showToast({
        tone: 'success',
        title: 'Reset link sent',
        description: `Check ${email.trim()} for instructions.`,
      })
    }, 500)
  }

  if (isSent) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We've sent a password reset link if an account exists for that address."
        footer={
          <>
            Remembered it after all?{' '}
            <Link to="/login" className="font-medium text-ink hover:underline">
              Log in
            </Link>
          </>
        }
      >
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-teal-light text-teal">
            <MailCheck size={22} aria-hidden="true" />
          </div>
          <p className="text-sm text-ink/60">
            The link expires in 30 minutes. If it doesn't show up, check your spam folder or try again below.
          </p>
          <Button variant="secondary" onClick={() => setIsSent(false)} className="w-full">
            Try a different email
          </Button>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Forgot password"
      subtitle="Enter your email and we'll send you a link to reset it."
      footer={
        <>
          Remembered it after all?{' '}
          <Link to="/login" className="font-medium text-ink hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          error={error}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
          icon={isSubmitting ? <Loader2 size={15} className="animate-spin" /> : <ArrowRight size={15} />}
        >
          {isSubmitting ? 'Sending link…' : 'Send reset link'}
        </Button>
      </form>
    </AuthLayout>
  )
}