import { useState } from 'react'

import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { ArrowRight, Loader2 } from 'lucide-react'

import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'

import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/forms/FormField'
import { AuthLayout } from '@/layouts/AuthLayout'

type RegistrationRole = 'client' | 'professional' | 'supplier'

type ProfessionalType =
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

const professionalLabels: Record<ProfessionalType, string> = {
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

const roleHomePath: Record<RegistrationRole, string> = {
  client: '/app/client',
  professional: '/app/professional',
  supplier: '/app/market',
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function isValidPhone(value: string) {
  return /^[+\d][\d\s-]{6,}$/.test(value.trim())
}

function isRegistrationRole(value: string | null): value is RegistrationRole {
  return value === 'client' || value === 'professional' || value === 'supplier'
}

function isProfessionalType(value: string | null): value is ProfessionalType {
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

  const professionalType: ProfessionalType | undefined =
    role === 'professional' && isProfessionalType(professionalTypeParam)
      ? professionalTypeParam
      : undefined

  const [form, setForm] = useState<FormState>({
    fullName: '',
    country: '',
    email: '',
    phone: '',
    password: '',
  })

  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function validate() {
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

    setErrors(next)

    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    // Demo-only: real implementation should:
    // 1. Submit the registration payload to authService.
    // 2. Validate duplicate email/phone.
    // 3. Create the account with the selected role.
    // 4. Store professionalType when role === 'professional'.
    // 5. Send OTP / verification flow (BRD Sec. 24).

    window.setTimeout(() => {
      login(role)

      showToast({
        tone: 'success',
        title: 'Account created',
        description: `Welcome to Build OS, ${
          form.fullName.split(' ')[0] || 'there'
        }.`,
      })

      navigate(roleHomePath[role])
    }, 500)
  }

  const accountLabel =
    role === 'professional' && professionalType
      ? professionalLabels[professionalType]
      : roleLabels[role]

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Complete your details to get started with Build OS."
      footer={
        <>
          Already registered?{' '}
          <Link
            to="/login"
            className="font-medium text-ink hover:underline"
          >
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Selected account type */}
        <div className="rounded-xl border border-line bg-paper-2 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/35">
                Account type
              </p>

              <p className="mt-1 text-sm font-semibold text-ink">
                {accountLabel}
              </p>

              {role === 'professional' && professionalType && (
                <p className="mt-0.5 text-xs text-ink/45">
                  Professional account
                </p>
              )}
            </div>

            <Link
              to="/join"
              className="shrink-0 text-xs font-medium text-ink/55 hover:text-ink hover:underline"
            >
              Change
            </Link>
          </div>
        </div>

        {/* Personal details */}
        <div className="grid grid-cols-2 gap-3">
          <FormField
            label="Full name"
            value={form.fullName}
            onChange={(e) => update('fullName', e.target.value)}
            placeholder="Jane Doe"
            error={errors.fullName}
          />

          <FormField
            label="Country"
            value={form.country}
            onChange={(e) => update('country', e.target.value)}
            placeholder="Nigeria"
            error={errors.country}
          />
        </div>

        <FormField
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="you@example.com"
          error={errors.email}
        />

        <FormField
          label="Phone"
          value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
          placeholder="+234"
          error={errors.phone}
        />

        <FormField
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => update('password', e.target.value)}
          placeholder="••••••••"
          error={errors.password}
        />

        {/* Terms */}
        <div>
          <label className="flex items-start gap-2 text-xs text-ink/60">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5"
            />

            <span>
              I agree to the Build OS terms of service and escrow policy.
            </span>
          </label>

          {errors.agreed && (
            <p className="mt-1.5 text-xs text-brick">
              {errors.agreed}
            </p>
          )}
        </div>

        {/* Submit */}
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
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
    </AuthLayout>
  )
}