/* =============================================================================
 * src/pages/Profile.tsx
 *
 * One profile page for every role: /app/<role>/profile
 * (the account menu's "View profile" and the legacy /profile both land here).
 *
 * Sections: summary, personal details (editable), verification & trust,
 * security (password), preferences, sign out.
 *
 * BACKEND LATER: `updateProfile` (AuthContext) and `submitPassword` below are
 * the only two places that need real API calls.
 * ========================================================================== */

import { useState, type FormEvent, type ReactNode } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {
  BadgeCheck,
  Bell,
  CheckCircle2,
  Clock3,
  FileText,
  KeyRound,
  LogOut,
  Mail,
  MapPin,
  ShieldCheck,
  UserCircle,
} from 'lucide-react'

import { useAppRoutes } from '@/config/appRoutes'
import { roleLabels } from '@/config/navigation'
import { useAuth } from '@/context/AuthContext'
import type { VerificationStatus } from '@/types'

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#1657FF] focus:ring-2 focus:ring-[#1657FF]/15 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500'

const VERIFICATION: Record<VerificationStatus, { label: string; className: string; icon: typeof BadgeCheck; hint: string }> = {
  verified: {
    label: 'Verified',
    className: 'bg-emerald-50 text-emerald-700',
    icon: BadgeCheck,
    hint: 'Your identity and documents have been checked. Other users see a verified badge on your profile.',
  },
  pending: {
    label: 'Pending review',
    className: 'bg-amber-50 text-amber-700',
    icon: Clock3,
    hint: 'Your documents are being reviewed. This usually takes one to two working days.',
  },
  rejected: {
    label: 'Not approved',
    className: 'bg-red-50 text-red-700',
    icon: ShieldCheck,
    hint: 'Your last submission was not approved. Review the feedback and submit your documents again.',
  },
  resubmission_required: {
    label: 'Resubmission needed',
    className: 'bg-amber-50 text-amber-700',
    icon: Clock3,
    hint: 'We need updated documents before we can finish verifying you.',
  },
  unverified: {
    label: 'Not verified',
    className: 'bg-slate-100 text-slate-600',
    icon: ShieldCheck,
    hint: 'Submit your documents to get a verified badge and unlock higher payment limits.',
  },
}

function trustTone(score: number) {
  if (score >= 80) return { label: 'Excellent', bar: 'bg-emerald-500' }
  if (score >= 60) return { label: 'Good', bar: 'bg-[#1657FF]' }
  if (score >= 40) return { label: 'Fair', bar: 'bg-amber-500' }
  return { label: 'Building', bar: 'bg-red-500' }
}

function Section({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: typeof UserCircle
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          {description && <p className="mt-0.5 text-sm text-slate-500">{description}</p>}
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string
  hint?: string
  error?: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
      {children}
      {error ? (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      ) : (
        hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>
      )}
    </label>
  )
}

function Banner({ tone, children }: { tone: 'success' | 'error'; children: ReactNode }) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={[
        'mb-4 flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm',
        tone === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700',
      ].join(' ')}
    >
      {tone === 'success' && <CheckCircle2 className="h-4 w-4 shrink-0" />}
      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Personal details                                                           */
/* -------------------------------------------------------------------------- */

function DetailsForm() {
  const { user, role, updateProfile } = useAuth()

  const [fullName, setFullName] = useState(user.fullName)
  const [phone, setPhone] = useState(user.phone ?? '')
  const [country, setCountry] = useState(user.country)
  const [company, setCompany] = useState(user.company ?? '')
  const [saved, setSaved] = useState(false)
  const [touched, setTouched] = useState(false)

  const showsCompany = role !== 'client' && role !== 'diaspora_client'
  const nameError = fullName.trim().length < 2 ? 'Enter your full name.' : undefined
  const phoneError = phone.trim() && !/^[0-9+\s-]{10,15}$/.test(phone.trim()) ? 'Enter a valid phone number.' : undefined

  const dirty =
    fullName !== user.fullName ||
    phone !== (user.phone ?? '') ||
    country !== user.country ||
    company !== (user.company ?? '')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    setTouched(true)
    if (nameError || phoneError) return
    updateProfile({
      fullName: fullName.trim(),
      phone: phone.trim() || undefined,
      country: country.trim(),
      company: company.trim() || undefined,
    })
    setSaved(true)
  }

  return (
    <form onSubmit={submit} noValidate>
      {saved && !dirty && <Banner tone="success">Your details have been saved.</Banner>}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" error={touched ? nameError : undefined}>
          <input
            className={inputClass}
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value)
              setSaved(false)
            }}
          />
        </Field>

        <Field label="Email" hint="Your sign-in email. Contact support to change it.">
          <input className={inputClass} value={user.email} disabled />
        </Field>

        <Field label="Phone" error={touched ? phoneError : undefined}>
          <input
            className={inputClass}
            value={phone}
            inputMode="tel"
            placeholder="08012345678"
            onChange={(e) => {
              setPhone(e.target.value)
              setSaved(false)
            }}
          />
        </Field>

        <Field label="Country / location">
          <input
            className={inputClass}
            value={country}
            onChange={(e) => {
              setCountry(e.target.value)
              setSaved(false)
            }}
          />
        </Field>

        {showsCompany && (
          <Field label="Company / organisation" hint="Shown to clients next to your name.">
            <input
              className={inputClass}
              value={company}
              onChange={(e) => {
                setCompany(e.target.value)
                setSaved(false)
              }}
            />
          </Field>
        )}
      </div>

      <div className="mt-5 flex items-center justify-end gap-3">
        {dirty && (
          <button
            type="button"
            onClick={() => {
              setFullName(user.fullName)
              setPhone(user.phone ?? '')
              setCountry(user.country)
              setCompany(user.company ?? '')
              setTouched(false)
            }}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            Discard
          </button>
        )}
        <button
          type="submit"
          disabled={!dirty}
          className="rounded-xl bg-[#0B1220] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1c2740] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save changes
        </button>
      </div>
    </form>
  )
}

/* -------------------------------------------------------------------------- */
/* Password                                                                   */
/* -------------------------------------------------------------------------- */

function PasswordForm() {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [result, setResult] = useState<'idle' | 'done'>('idle')
  const [touched, setTouched] = useState(false)

  const errors = {
    current: current ? undefined : 'Enter your current password.',
    next:
      next.length < 8
        ? 'Use at least 8 characters.'
        : !/[0-9]/.test(next) || !/[A-Za-z]/.test(next)
          ? 'Include letters and numbers.'
          : next === current
            ? 'Choose a password you have not used here.'
            : undefined,
    confirm: confirm === next ? undefined : 'Passwords do not match.',
  }

  // Replace with an API call when the backend exists.
  const submitPassword = () => {
    setResult('done')
    setCurrent('')
    setNext('')
    setConfirm('')
    setTouched(false)
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    setTouched(true)
    if (errors.current || errors.next || errors.confirm) return
    submitPassword()
  }

  return (
    <form onSubmit={submit} noValidate className="max-w-md space-y-4">
      {result === 'done' && <Banner tone="success">Password updated.</Banner>}

      <Field label="Current password" error={touched ? errors.current : undefined}>
        <input type="password" autoComplete="current-password" className={inputClass} value={current} onChange={(e) => setCurrent(e.target.value)} />
      </Field>
      <Field label="New password" error={touched ? errors.next : undefined} hint="At least 8 characters, with letters and numbers.">
        <input type="password" autoComplete="new-password" className={inputClass} value={next} onChange={(e) => setNext(e.target.value)} />
      </Field>
      <Field label="Confirm new password" error={touched ? errors.confirm : undefined}>
        <input type="password" autoComplete="new-password" className={inputClass} value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      </Field>

      <button
        type="submit"
        className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
      >
        Update password
      </button>
    </form>
  )
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export function ProfilePage() {
  const { user, role, logout } = useAuth()
  const app = useAppRoutes()
  const navigate = useNavigate()

  const verification = VERIFICATION[user.verificationStatus]
  const VerificationIcon = verification.icon
  const trust = trustTone(user.trustScore)

  const signOut = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Summary */}
      <div className="flex flex-col gap-5 rounded-3xl bg-[#0B1220] p-6 text-white sm:flex-row sm:items-center sm:p-8">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white/10 text-2xl font-bold ring-4 ring-white/10">
          {user.avatarInitials}
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-2xl font-bold tracking-tight">{user.fullName}</h1>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/70">
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white">
              {roleLabels[role]}
            </span>
            {user.company && <span>{user.company}</span>}
            <span className="inline-flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              {user.email}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {user.country}
            </span>
          </p>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1.5 self-start rounded-full px-3 py-1.5 text-xs font-bold sm:self-center ${verification.className}`}
        >
          <VerificationIcon className="h-3.5 w-3.5" />
          {verification.label}
        </span>
      </div>

      <Section icon={UserCircle} title="Personal details" description="Keep your contact details current so teammates and clients can reach you.">
        {/* key resets the form when the role is switched */}
        <DetailsForm key={role} />
      </Section>

      <Section icon={ShieldCheck} title="Verification & trust" description={verification.hint}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <div className="flex items-end justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Trust score</p>
              <p className="text-sm font-bold text-slate-900">
                {user.trustScore}
                <span className="font-medium text-slate-400"> / 100 · {trust.label}</span>
              </p>
            </div>
            <div
              className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-valuenow={user.trustScore}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Trust score"
            >
              <div className={`h-full rounded-full ${trust.bar}`} style={{ width: `${user.trustScore}%` }} />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Built from completed milestones, on-time payments, verification and dispute history.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-2">
            <Link
              to={app.to('documents')}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <FileText className="h-4 w-4 text-slate-400" />
              {user.verificationStatus === 'verified' || user.verificationStatus === 'pending' ? 'View my documents' : 'Submit verification documents'}
            </Link>
          </div>
        </div>
      </Section>

      <Section icon={KeyRound} title="Security" description="Change your password. You will stay signed in on this device.">
        <PasswordForm />
      </Section>

      <Section icon={Bell} title="Notifications" description="Choose what Build OS tells you about, and how.">
        <Link
          to={app.to('updates', 'preferences')}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <Bell className="h-4 w-4 text-slate-400" />
          Notification preferences
        </Link>
      </Section>

      <Section icon={LogOut} title="Sign out" description="End your session on this device.">
        <button
          type="button"
          onClick={signOut}
          className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 text-sm font-bold text-red-700 transition hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </Section>
    </div>
  )
}

/** Legacy `/profile` link: send the signed-in user to their own profile. */
export function ProfileRedirect() {
  const { isAuthenticated } = useAuth()
  const app = useAppRoutes()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Navigate to={app.to('profile')} replace />
}
