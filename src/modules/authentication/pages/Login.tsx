import { useMemo, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Check, Loader2, ShieldCheck } from 'lucide-react'

import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/forms/FormField'
import {
  AuthCheckbox,
  AuthLayout,
  CapsLockNote,
  PasswordToggle,
  Reveal,
  focusField,
  useCapsLock,
  useReveal,
  type AuthPanelContent,
} from '@/layouts/AuthLayout'

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

type IdentifierKind = 'email' | 'phone'

/**
 * Tells us how the identifier was understood, so the
 * form can confirm it back to the person as they type.
 */
function getIdentifierKind(value: string): IdentifierKind | null {
  const trimmed = value.trim()

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'email'
  if (/^[+\d][\d\s-]{6,}$/.test(trimmed)) return 'phone'

  return null
}

function getGreeting(date = new Date()) {
  const hour = date.getHours()

  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

const LOGIN_PANEL: AuthPanelContent = {
  eyebrow: 'Account access',
  heading: 'Pick up right where you left off.',
  description:
    'Your projects, approvals and payments — all synced and waiting for you.',
}

type LoginErrors = {
  email?: string
  password?: string
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export function Login() {
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const formRef = useRef<HTMLFormElement>(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const revealed = useReveal()
  const { capsLock, capsHandlers } = useCapsLock()
  const greeting = useMemo(() => getGreeting(), [])
  const identifierKind = getIdentifierKind(email)

  function validate() {
    const next: LoginErrors = {}
    const identifier = email.trim()

    if (!identifier) {
      next.email = 'Enter your email or phone number.'
    } else if (!getIdentifierKind(identifier)) {
      next.email = "That doesn't look like a valid email or phone number."
    }

    if (!password) {
      next.password = 'Enter your password.'
    } else if (password.length < 6) {
      next.password = 'Password must be at least 6 characters.'
    }

    setErrors(next)

    if (next.email) focusField(formRef.current, 'username')
    else if (next.password) focusField(formRef.current, 'current-password')

    return Object.keys(next).length === 0
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting) return
    if (!validate()) return

    setIsSubmitting(true)

    /*
     * Authentication should be handled by AuthContext/authService.
     *
     * IMPORTANT:
     * - The login screen must never ask the user to select a role.
     * - The authenticated account returned by the backend should
     *   contain the user's role.
     * - Redirect behaviour should therefore be determined from
     *   the authenticated user's role.
     *
     * `remember` should be passed to authService so the session
     * persists ("Keep me signed in").
     *
     * Replace the temporary demo block below with the real
     * authentication request when authService is connected.
     */

    window.setTimeout(() => {
      setIsSubmitting(false)

      // Temporary demo authentication.
      //
      // const account = await login(email, password, { remember })
      // navigate(getRoleDestination(account.role))
      //
      // The backend remains the source of truth for the role.

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
      subtitle={`${greeting}. Log in to your Build OS account.`}
      panel={LOGIN_PANEL}
      sheetId="AUTH-01"
      footer={
        <>
          Don't have an account?{' '}
          <Link
            to="/join"
            className="font-medium text-[#0B1220] underline-offset-4 transition-colors hover:text-[#1657FF] hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
        <Reveal show={revealed} index={0}>
          <FormField
            label="Email or phone"
            type="text"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)

              if (errors.email) {
                setErrors((current) => ({ ...current, email: undefined }))
              }
            }}
            placeholder="you@example.com"
            error={errors.email}
            autoComplete="username"
            disabled={isSubmitting}
            labelAction={
              identifierKind ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#1657FF]/[0.08] px-2 py-0.5 text-[11px] font-medium text-[#1657FF]">
                  <Check size={11} strokeWidth={2.5} />
                  {identifierKind === 'email' ? 'Email' : 'Phone'}
                </span>
              ) : undefined
            }
          />
        </Reveal>

        <Reveal show={revealed} index={1}>
          <div {...capsHandlers}>
            <FormField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)

                if (errors.password) {
                  setErrors((current) => ({ ...current, password: undefined }))
                }
              }}
              placeholder="••••••••"
              error={errors.password}
              autoComplete="current-password"
              disabled={isSubmitting}
              labelAction={
                <PasswordToggle
                  visible={showPassword}
                  onToggle={() => setShowPassword((v) => !v)}
                  disabled={isSubmitting}
                />
              }
            />

            <CapsLockNote visible={capsLock} />
          </div>
        </Reveal>

        <Reveal show={revealed} index={2}>
          <div className="flex items-center justify-between gap-4">
            <AuthCheckbox checked={remember} onChange={setRemember} disabled={isSubmitting}>
              Keep me signed in
            </AuthCheckbox>

            <Link
              to="/forgot-password"
              className="text-[13px] font-medium text-[#0B1220]/50 underline-offset-4 transition-colors hover:text-[#1657FF] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </Reveal>

        <Reveal show={revealed} index={3}>
          <div className="space-y-4">
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

            <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-[#0B1220]/40">
              <ShieldCheck size={13} />
              Your session is encrypted end to end.
            </p>
          </div>
        </Reveal>
      </form>
    </AuthLayout>
  )
}