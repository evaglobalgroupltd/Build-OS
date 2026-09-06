import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { ArrowRight, Loader2 } from 'lucide-react'

import { useAuth } from '@/context/AuthContext'

import { useToast } from '@/context/ToastContext'

import { Button } from '@/components/ui/Button'

import { FormField } from '@/components/forms/FormField'

import { AuthLayout } from '@/layouts/AuthLayout'

function isValidEmailOrPhone(value: string) {
  const trimmed = value.trim()

  const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)

  const looksLikePhone = /^[+\d][\d\s-]{6,}$/.test(trimmed)

  return looksLikeEmail || looksLikePhone
}

export function Login() {
  const { login } = useAuth()

  const { showToast } = useToast()

  const navigate = useNavigate()

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState<{
    email?: string
    password?: string
  }>({})

  const [isSubmitting, setIsSubmitting] = useState(false)

  function validate() {
    const next: typeof errors = {}

    if (!email.trim()) {
      next.email = 'Enter your email or phone number.'
    } else if (!isValidEmailOrPhone(email)) {
      next.email = "That doesn't look like a valid email or phone number."
    }

    if (!password) {
      next.password = 'Enter your password.'
    } else if (password.length < 6) {
      next.password = 'Password must be at least 6 characters.'
    }

    setErrors(next)

    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    // Demo-only: real implementation should authenticate through
    // authService (BRD Sec. 32.1).
    //
    // The authenticated account returned by the server must contain
    // the user's role. The frontend must never ask the user to choose
    // a role during login.
    //
    // After authentication, the app should redirect according to
    // the role returned by the authenticated account.

    window.setTimeout(() => {
      // Temporary demo behaviour.
      // AuthContext should eventually determine the actual role.
      login('client')

      showToast({
        tone: 'success',
        title: 'Welcome back',
        description: 'You have successfully logged in.',
      })

      navigate('/app/client')
    }, 500)
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to your Build OS account."
      footer={
        <>
          Don't have an account?{' '}
          <Link
            to="/join"
            className="font-medium text-ink hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField
          label="Email or phone"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          error={errors.email}
        />

        <FormField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          error={errors.password}
          labelAction={
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-ink/40 hover:text-ink/70"
            >
              Forgot password?
            </Link>
          }
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
          icon={
            isSubmitting ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <ArrowRight size={15} />
            )
          }
        >
          {isSubmitting ? 'Logging in…' : 'Log in'}
        </Button>
      </form>
    </AuthLayout>
  )
}