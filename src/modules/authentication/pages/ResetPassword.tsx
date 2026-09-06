import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Loader2, ShieldAlert } from 'lucide-react'
import { useToast } from '@/context/ToastContext'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/forms/FormField'
import { AuthLayout } from '@/layouts/AuthLayout'

/**
 * Reset Password — Authentication module
 * BRD reference: Sec. 32.1
 *
 * Set a new password from a reset link.
 * Demo-only: real implementation wires this to authService.resetPassword (Sec. 32.1),
 * which validates the token server-side (expiry + single-use).
 */

interface FormState {
  password: string
  confirmPassword: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

function BrandMark() {
  return (
    <div className="mb-6 flex justify-center">
      <Link to="/" className="inline-flex items-center gap-2.5">
        <img
          src="/images/BuildOs.png"
          alt="Build OS"
          className="h-9 w-9 rounded-lg object-contain"
        />
        <span className="font-display text-sm font-semibold tracking-tight text-ink">
          Build OS
        </span>
      </Link>
    </div>
  )
}

export function ResetPassword() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [form, setForm] = useState<FormState>({ password: '', confirmPassword: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDone, setIsDone] = useState(false)

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function validate() {
    const next: FormErrors = {}
    if (form.password.length < 8) next.password = 'Password must be at least 8 characters.'
    if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords don't match."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    // Demo-only: real implementation calls authService.resetPassword(token, password) (Sec. 32.1)
    window.setTimeout(() => {
      setIsSubmitting(false)
      setIsDone(true)
      showToast({ tone: 'success', title: 'Password updated', description: 'You can now log in with your new password.' })
    }, 500)
  }

  if (!token) {
    return (
      <AuthLayout
        title="Link invalid or expired"
        subtitle="This password reset link is no longer valid."
        footer={
          <>
            Need a new one?{' '}
            <Link to="/forgot-password" className="font-medium text-ink hover:underline">
              Request another link
            </Link>
          </>
        }
      >
        <BrandMark />
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-brick-light text-brick">
            <ShieldAlert size={22} aria-hidden="true" />
          </div>
          <p className="text-sm text-ink/60">
            Reset links expire after 30 minutes and can only be used once. Request a fresh link to continue.
          </p>
          <Button className="w-full" onClick={() => navigate('/forgot-password')}>
            Request new link
          </Button>
        </div>
      </AuthLayout>
    )
  }

  if (isDone) {
    return (
      <AuthLayout
        title="Password updated"
        subtitle="Your password has been reset successfully."
        footer={
          <>
            <Link to="/login" className="font-medium text-ink hover:underline">
              Log in
            </Link>
          </>
        }
      >
        <BrandMark />
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-teal-light text-teal">
            <CheckCircle2 size={22} aria-hidden="true" />
          </div>
          <p className="text-sm text-ink/60">
            You're all set. Use your new password the next time you log in.
          </p>
          <Button className="w-full" icon={<ArrowRight size={15} />} onClick={() => navigate('/login')}>
            Go to log in
          </Button>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Choose a strong password you haven't used before."
      footer={
        <>
          Remembered your old one?{' '}
          <Link to="/login" className="font-medium text-ink hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <BrandMark />
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField
          label="New password"
          type="password"
          value={form.password}
          onChange={(e) => update('password', e.target.value)}
          placeholder="••••••••"
          error={errors.password}
        />

        <FormField
          label="Confirm password"
          type="password"
          value={form.confirmPassword}
          onChange={(e) => update('confirmPassword', e.target.value)}
          placeholder="••••••••"
          error={errors.confirmPassword}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
          icon={isSubmitting ? <Loader2 size={15} className="animate-spin" /> : <ArrowRight size={15} />}
        >
          {isSubmitting ? 'Updating…' : 'Update password'}
        </Button>
      </form>
    </AuthLayout>
  )
}