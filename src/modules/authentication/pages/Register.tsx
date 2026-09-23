import { useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  Briefcase,
  Building2,
  ClipboardList,
  Cog,
  Compass,
  Hammer,
  HardHat,
  Loader2,
  Ruler,
  ShieldCheck,
  Sparkles,
  Store,
  type LucideIcon,
} from 'lucide-react'

import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import type { ProfessionalType, UserRole } from '@/types'

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
   REGISTRATION CONTEXT
───────────────────────────────────────────── */

type RegistrationRole = 'client' | 'professional' | 'supplier'

type JoinProfessionalType =
  | 'architect'
  | 'engineer'
  | 'surveyor'
  | 'project_manager'
  | 'contractor'
  | 'artisan'
  | 'other_professional'

interface FormState {
  fullName: string
  country: string
  email: string
  phone: string
  password: string
}

type FormErrors = Partial<Record<keyof FormState | 'agreed', string>>

type Step = 0 | 1

/** Which fields belong to which step. */
const STEP_FIELDS: Record<Step, ReadonlyArray<keyof FormState | 'agreed'>> = {
  0: ['fullName', 'country', 'email', 'phone'],
  1: ['password', 'agreed'],
}

/** Used to move the cursor to the first invalid field. */
const FIELD_AUTOCOMPLETE: Record<keyof FormState, string> = {
  fullName: 'name',
  country: 'country-name',
  email: 'email',
  phone: 'tel',
  password: 'new-password',
}

/* ─────────────────────────────────────────────
   LABELS
───────────────────────────────────────────── */

const professionalLabels: Record<JoinProfessionalType, string> = {
  architect: 'Architect',
  engineer: 'Engineer',
  surveyor: 'Surveyor / Quantity Surveyor',
  project_manager: 'Project Manager',
  contractor: 'Contractor',
  artisan: 'Artisan',
  other_professional: 'Other Professional',
}

const roleLabels: Record<RegistrationRole, string> = {
  client: 'Client',
  professional: 'Professional',
  supplier: 'Supplier',
}

/* ─────────────────────────────────────────────
   ROLE DESTINATIONS
───────────────────────────────────────────── */

const roleHomePath: Record<UserRole, string> = {
  client: '/app/client',
  diaspora_client: '/app/client',
  contractor: '/app/contractor',
  project_manager: '/app/pm',
  professional: '/app/professional',
  market_place: '/app/market',
  admin: '/app/admin',
}

/* ─────────────────────────────────────────────
   VALIDATION
───────────────────────────────────────────── */

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function isValidPhone(value: string) {
  return /^[+\d][\d\s-]{6,}$/.test(value.trim())
}

/* ─────────────────────────────────────────────
   PASSWORD STRENGTH
   Guidance only — the enforced rule remains
   "at least 8 characters". Colors follow the
   brand palette rather than generic traffic-light red/green,
   and "Strong" is treated as the premium tier: a champagne
   highlight rather than just another shade of green.
───────────────────────────────────────────── */

const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong']
const STRENGTH_COLORS = ['', '#B94A3A', '#C9963B', '#1657FF', '#B8934A']

function assessPassword(value: string) {
  const checks = [
    { met: value.length >= 8, hint: 'Use at least 8 characters.' },
    {
      met: /[a-z]/.test(value) && /[A-Z]/.test(value),
      hint: 'Mix upper and lower case letters.',
    },
    { met: /\d/.test(value), hint: 'Add a number.' },
    { met: /[^A-Za-z0-9]/.test(value), hint: 'Add a symbol.' },
  ]

  const met = checks.filter((check) => check.met).length
  const tooShort = value.length > 0 && value.length < 8

  const score = value.length === 0 ? 0 : tooShort ? 1 : Math.max(1, met)

  return {
    score,
    label: tooShort ? 'Too short' : STRENGTH_LABELS[score],
    hint: checks.find((check) => !check.met)?.hint ?? '',
  }
}

function PasswordStrength({ value }: { value: string }) {
  const { score, label, hint } = assessPassword(value)
  const color = STRENGTH_COLORS[score] || '#E5E8ED'
  const isStrong = score === 4

  return (
    <div className="mt-3" aria-live="polite">
      <div className="flex items-center gap-3">
        <div className="flex flex-1 gap-1.5" aria-hidden="true">
          {[1, 2, 3, 4].map((segment) => (
            <span
              key={segment}
              className="h-[3px] flex-1 overflow-hidden rounded-full bg-[#E5E8ED]"
            >
              <span
                className="block h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: segment <= score ? '100%' : '0%',
                  backgroundColor: color,
                  boxShadow:
                    isStrong && segment <= score
                      ? '0 0 6px rgba(184,147,74,0.7)'
                      : 'none',
                }}
              />
            </span>
          ))}
        </div>

        <span
          className="flex w-[62px] items-center justify-end gap-1 text-right text-[11px] font-medium"
          style={{ color }}
        >
          {isStrong && <Sparkles size={10} strokeWidth={2.5} />}
          {label}
        </span>
      </div>

      <p className="mt-1.5 min-h-[16px] text-[11px] text-[#0B1220]/45">
        {value ? hint : 'Use at least 8 characters.'}
      </p>
    </div>
  )
}

/* ─────────────────────────────────────────────
   URL PARAMETER GUARDS
───────────────────────────────────────────── */

function isRegistrationRole(value: string | null): value is RegistrationRole {
  return value === 'client' || value === 'professional' || value === 'supplier'
}

function isJoinProfessionalType(
  value: string | null,
): value is JoinProfessionalType {
  return (
    value === 'architect' ||
    value === 'engineer' ||
    value === 'surveyor' ||
    value === 'project_manager' ||
    value === 'contractor' ||
    value === 'artisan' ||
    value === 'other_professional'
  )
}

/* ─────────────────────────────────────────────
   ACCOUNT RESOLUTION
───────────────────────────────────────────── */

function resolveAccount(
  role: RegistrationRole,
  joinProfessionalType?: JoinProfessionalType,
): {
  userRole: UserRole
  professionalType?: ProfessionalType
} {
  if (role === 'client') {
    return { userRole: 'client' }
  }

  if (role === 'supplier') {
    return { userRole: 'market_place' }
  }

  if (joinProfessionalType === 'contractor') {
    return { userRole: 'contractor' }
  }

  if (joinProfessionalType === 'project_manager') {
    return { userRole: 'project_manager' }
  }

  if (
    joinProfessionalType === 'architect' ||
    joinProfessionalType === 'engineer' ||
    joinProfessionalType === 'surveyor' ||
    joinProfessionalType === 'artisan' ||
    joinProfessionalType === 'other_professional'
  ) {
    return {
      userRole: 'professional',
      professionalType: joinProfessionalType,
    }
  }

  return { userRole: 'professional' }
}

/* ─────────────────────────────────────────────
   PRODUCT PANEL
───────────────────────────────────────────── */

function getPanelContent(
  role: RegistrationRole,
  joinProfessionalType?: JoinProfessionalType,
): AuthPanelContent {
  if (role === 'client') {
    return {
      eyebrow: 'For Clients',
      heading: 'Build with total visibility.',
      description:
        'Track budgets, milestones and payments in real time — no more guesswork on where your project stands.',
      activeChip: 'Client',
    }
  }

  if (role === 'supplier') {
    return {
      eyebrow: 'For Suppliers',
      heading: 'Reach verified buyers, faster.',
      description:
        'List your materials and services in front of clients and contractors actively sourcing for live projects.',
      activeChip: 'Supplier',
    }
  }

  if (joinProfessionalType === 'contractor') {
    return {
      eyebrow: 'For Contractors',
      heading: 'Get paid on your terms.',
      description:
        'Submit milestones, release escrow and keep every client updated without a single spreadsheet.',
      activeChip: 'Contractor',
    }
  }

  if (joinProfessionalType === 'project_manager') {
    return {
      eyebrow: 'For Project Managers',
      heading: 'Command every project from one place.',
      description:
        'Coordinate teams, timelines and approvals across every site you run — all from one dashboard.',
      activeChip: 'Project Manager',
    }
  }

  const label = joinProfessionalType
    ? professionalLabels[joinProfessionalType]
    : 'Professionals'

  return {
    eyebrow: 'For Professionals',
    heading: `Built for ${label}.`,
    description:
      'Manage proposals, milestones and client communication without leaving your workflow.',
    activeChip: 'Professional',
  }
}

/* ─────────────────────────────────────────────
   ACCOUNT PASS
   The one bold moment on this screen: the account type
   chosen on /join, presented like a membership card on a
   fine blueprint grid, with a slow light sweep on hover —
   the kind of restraint a foil-stamped card would earn.
───────────────────────────────────────────── */

function getContextIcon(
  role: RegistrationRole,
  joinProfessionalType?: JoinProfessionalType,
): LucideIcon {
  if (role === 'client') return Building2
  if (role === 'supplier') return Store

  switch (joinProfessionalType) {
    case 'architect':
      return Compass
    case 'engineer':
      return Cog
    case 'surveyor':
      return Ruler
    case 'project_manager':
      return ClipboardList
    case 'contractor':
      return HardHat
    case 'artisan':
      return Hammer
    default:
      return Briefcase
  }
}

const GRID_MASK = 'radial-gradient(90% 140% at 100% 0%, #000 0%, transparent 70%)'

function AccountPass({
  label,
  caption,
  Icon,
}: {
  label: string
  caption?: string
  Icon: LucideIcon
}) {
  return (
    <div className="group relative isolate overflow-hidden rounded-2xl bg-[#0B1220] px-5 py-4 text-white shadow-[0_22px_44px_-26px_rgba(11,18,32,0.75)] transition-shadow duration-500 hover:shadow-[0_28px_54px_-24px_rgba(11,18,32,0.85)]">
      {/* Blueprint grid, fading out from the top-right corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          maskImage: GRID_MASK,
          WebkitMaskImage: GRID_MASK,
        }}
      />

      {/* Cool glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-14 -z-10 h-40 w-40 rounded-full bg-[#1657FF]/35 blur-3xl"
      />

      {/* Champagne hairline along the top edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D8B978]/70 to-transparent"
      />

      {/* A slow light sweep, the way foil catches under a light — quiet, not a gimmick */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 transition-all duration-[1400ms] ease-out group-hover:left-[130%] group-hover:opacity-100 motion-reduce:hidden"
      />

      <div className="flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D8B978]/30 bg-[#D8B978]/10 text-[#D8B978]">
          <Icon size={19} strokeWidth={1.6} />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-white/50">Joining as</p>
          <p className="truncate text-[17px] font-semibold tracking-[-0.02em]">
            {label}
          </p>
          {caption && (
            <p className="mt-0.5 text-[11px] text-white/45">{caption}</p>
          )}
        </div>

        <Link
          to="/join"
          className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-medium text-white/70 transition-colors hover:border-[#D8B978]/60 hover:text-[#D8B978] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B978]/40"
        >
          Change
        </Link>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   STEP PROGRESS
───────────────────────────────────────────── */

const STEP_TITLES: Record<Step, string> = {
  0: 'About you',
  1: 'Secure your account',
}

function StepProgress({ step }: { step: Step }) {
  return (
    <div
      role="progressbar"
      aria-label="Registration progress"
      aria-valuemin={1}
      aria-valuemax={2}
      aria-valuenow={step + 1}
      aria-valuetext={`Step ${step + 1} of 2: ${STEP_TITLES[step]}`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[14px] font-semibold tracking-[-0.01em] text-[#0B1220]">
          {STEP_TITLES[step]}
        </p>
        <p className="text-[11px] tabular-nums text-[#0B1220]/40">
          Step {step + 1} of 2
        </p>
      </div>

      <div className="mt-3 flex gap-1.5" aria-hidden="true">
        {[0, 1].map((index) => (
          <span
            key={index}
            className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-[#E5E8ED]"
          >
            <span
              className={`absolute inset-y-0 left-0 bg-gradient-to-r from-[#1657FF] to-[#34A6FF] transition-[width] duration-700 ease-out motion-reduce:transition-none ${
                index <= step ? 'w-full' : 'w-0'
              }`}
            />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export function Register() {
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const roleParam = searchParams.get('role')
  const professionalTypeParam = searchParams.get('professionalType')

  const role: RegistrationRole = isRegistrationRole(roleParam)
    ? roleParam
    : 'client'

  const joinProfessionalType: JoinProfessionalType | undefined =
    role === 'professional' && isJoinProfessionalType(professionalTypeParam)
      ? professionalTypeParam
      : undefined

  const formRef = useRef<HTMLFormElement>(null)

  const [step, setStep] = useState<Step>(0)
  const [form, setForm] = useState<FormState>({
    fullName: '',
    country: '',
    email: '',
    phone: '',
    password: '',
  })

  const [agreed, setAgreed] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const revealed = useReveal(step)
  const { capsLock, capsHandlers } = useCapsLock()

  /* ─────────────────────────────────────────
     FORM HELPERS
  ───────────────────────────────────────── */

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((current) => ({ ...current, [key]: value }))

    if (errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }))
    }
  }

  function computeErrors(): FormErrors {
    const next: FormErrors = {}

    if (!form.fullName.trim()) {
      next.fullName = 'Enter your full name.'
    }

    if (!form.country.trim()) {
      next.country = 'Enter your country.'
    }

    if (!isValidEmail(form.email)) {
      next.email = 'Enter a valid email address.'
    }

    if (!isValidPhone(form.phone)) {
      next.phone = 'Enter a valid phone number.'
    }

    if (form.password.length < 8) {
      next.password = 'Password must be at least 8 characters.'
    }

    if (!agreed) {
      next.agreed = 'You need to accept the terms to continue.'
    }

    return next
  }

  /** Validates only the fields on the given step. */
  function validateStep(target: Step) {
    const all = computeErrors()
    const next: FormErrors = {}

    for (const key of STEP_FIELDS[target]) {
      if (all[key]) next[key] = all[key]
    }

    setErrors(next)

    const firstInvalid = STEP_FIELDS[target].find(
      (key): key is keyof FormState => key !== 'agreed' && !!next[key],
    )

    if (firstInvalid) {
      focusField(formRef.current, FIELD_AUTOCOMPLETE[firstInvalid])
    }

    return Object.keys(next).length === 0
  }

  function goToStep(next: Step) {
    setStep(next)
    setErrors({})

    window.setTimeout(() => {
      formRef.current
        ?.querySelector<HTMLInputElement>('input:not([type="checkbox"])')
        ?.focus()
    }, 80)
  }

  /* ─────────────────────────────────────────
     SUBMIT
  ───────────────────────────────────────── */

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting) return

    if (step === 0) {
      if (validateStep(0)) goToStep(1)
      return
    }

    if (!validateStep(1)) return

    setIsSubmitting(true)

    const { userRole, professionalType } = resolveAccount(
      role,
      joinProfessionalType,
    )

    /*
     * DEMO FLOW
     *
     * Replace this with authService/register()
     * when the backend authentication layer is connected.
     *
     * Production flow:
     *
     * 1. Submit registration payload.
     * 2. Validate duplicate email / phone.
     * 3. Create account.
     * 4. Persist the resolved role.
     * 5. Persist professionalType where applicable.
     * 6. Send email / phone verification.
     * 7. Begin onboarding.
     */

    window.setTimeout(() => {
      login(userRole, professionalType)

      showToast({
        tone: 'success',
        title: 'Account created',
        description: `Welcome to Build OS, ${
          form.fullName.split(' ')[0] || 'there'
        }.`,
      })

      setIsSubmitting(false)

      navigate(userRole === 'admin' ? roleHomePath[userRole] : '/onboarding')
    }, 500)
  }

  /* ─────────────────────────────────────────
     DISPLAY CONTEXT
  ───────────────────────────────────────── */

  const accountLabel =
    role === 'professional' && joinProfessionalType
      ? professionalLabels[joinProfessionalType]
      : roleLabels[role]

  const accountCaption =
    role === 'professional' && joinProfessionalType
      ? 'Professional account'
      : undefined

  const panel = getPanelContent(role, joinProfessionalType)
  const sheetId = `AUTH-02-${roleLabels[role].charAt(0)}`

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Two short steps to get started with Build OS."
      panel={panel}
      sheetId={sheetId}
      footer={
        <>
          Already registered?{' '}
          <Link
            to="/login"
            className="font-medium text-[#0B1220] underline-offset-4 transition-colors hover:text-[#1657FF] hover:underline"
          >
            Log in
          </Link>
        </>
      }
    >
      <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-7">
        <AccountPass
          label={accountLabel}
          caption={accountCaption}
          Icon={getContextIcon(role, joinProfessionalType)}
        />

        <StepProgress step={step} />

        <Reveal show={revealed}>
          {step === 0 ? (
            /* ─────────────────────────────────
               STEP 1 — ABOUT YOU
            ───────────────────────────────── */
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField
                  label="Full name"
                  value={form.fullName}
                  onChange={(event) => update('fullName', event.target.value)}
                  placeholder="Jane Doe"
                  error={errors.fullName}
                  autoComplete="name"
                  disabled={isSubmitting}
                />

                <FormField
                  label="Country"
                  value={form.country}
                  onChange={(event) => update('country', event.target.value)}
                  placeholder="Nigeria"
                  error={errors.country}
                  autoComplete="country-name"
                  disabled={isSubmitting}
                />
              </div>

              <FormField
                label="Email"
                type="email"
                value={form.email}
                onChange={(event) => update('email', event.target.value)}
                placeholder="you@example.com"
                error={errors.email}
                autoComplete="email"
                disabled={isSubmitting}
              />

              <FormField
                label="Phone"
                type="tel"
                value={form.phone}
                onChange={(event) => update('phone', event.target.value)}
                placeholder="+234"
                error={errors.phone}
                autoComplete="tel"
                disabled={isSubmitting}
              />
            </div>
          ) : (
            /* ─────────────────────────────────
               STEP 2 — SECURE YOUR ACCOUNT
            ───────────────────────────────── */
            <div className="space-y-6">
              {/* Recap, so the person can confirm who this is for */}
              <div className="flex items-center justify-between gap-4 rounded-xl border border-[#E5E8ED] bg-[#FAFBFC] px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-[#0B1220]">
                    {form.fullName.trim()}
                  </p>
                  <p className="truncate text-[12px] text-[#0B1220]/45">
                    {form.email.trim()}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => goToStep(0)}
                  disabled={isSubmitting}
                  className="shrink-0 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-[#0B1220]/50 transition-colors hover:bg-white hover:text-[#1657FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1657FF]/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Edit
                </button>
              </div>

              <div {...capsHandlers}>
                <FormField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(event) => update('password', event.target.value)}
                  placeholder="••••••••"
                  error={errors.password}
                  autoComplete="new-password"
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
                <PasswordStrength value={form.password} />
              </div>

              <div>
                <AuthCheckbox
                  checked={agreed}
                  onChange={(checked) => {
                    setAgreed(checked)

                    if (errors.agreed) {
                      setErrors((current) => ({ ...current, agreed: undefined }))
                    }
                  }}
                  disabled={isSubmitting}
                  invalid={!!errors.agreed}
                  textClassName="text-[12px] leading-[1.55] text-[#0B1220]/55"
                >
                  I agree to the Build OS{' '}
                  <span className="font-medium text-[#0B1220]/75">
                    terms of service
                  </span>{' '}
                  and{' '}
                  <span className="font-medium text-[#0B1220]/75">
                    escrow policy
                  </span>
                  .
                </AuthCheckbox>

                {errors.agreed && (
                  <p className="mt-1.5 pl-[30px] text-[11px] text-[#B94A3A]">
                    {errors.agreed}
                  </p>
                )}
              </div>
            </div>
          )}
        </Reveal>

        {/* ─────────────────────────────────────
            SUBMIT
        ───────────────────────────────────── */}

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
            {step === 0
              ? 'Continue'
              : isSubmitting
                ? 'Creating account…'
                : 'Create account'}
          </Button>

          {step === 1 && (
            <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-[#0B1220]/40">
              <ShieldCheck size={13} />
              Every account is verified before entering the workspace.
            </p>
          )}
        </div>
      </form>
    </AuthLayout>
  )
}