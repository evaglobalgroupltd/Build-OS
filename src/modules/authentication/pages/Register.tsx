import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/forms/FormField'
import { AuthLayout } from '@/layouts/AuthLayout'
import type { UserRole } from '@/types'
import { roleLabels } from '@/config/navigation'

const roleHomePath: Record<UserRole, string> = {
  client: '/app/client',
  contractor: '/app/contractor',
  supplier: '/app/supplier',
  project_manager: '/app/pm',
  professional: '/app/professional',
  admin: '/app/admin',
}

interface FormState {
  fullName: string
  country: string
  email: string
  phone: string
  password: string
}

type FormErrors = Partial<Record<keyof FormState | 'agreed', string>>

export function Register() {
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [role, setRole] = useState<UserRole>('client')
  const [form, setForm] = useState<FormState>({ fullName: '', country: '', email: '', phone: '', password: '' })
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function validate() {
    const next: FormErrors = {}
    if (!form.fullName.trim()) next.fullName = 'Enter your full name.'
    if (!form.country.trim()) next.country = 'Enter your country.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email address.'
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) next.phone = 'Enter a valid phone number.'
    if (form.password.length < 8) next.password = 'Password must be at least 8 characters.'
    if (!agreed) next.agreed = 'You need to accept the terms to continue.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    // Demo-only: real implementation validates duplicates and sends OTP (Sec. 24)
    window.setTimeout(() => {
      login(role)
      showToast({
        tone: 'success',
        title: 'Account created',
        description: `Welcome to Build OS, ${form.fullName.split(' ')[0] || 'there'}.`,
      })
      navigate(roleHomePath[role])
    }, 500)
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Tell us who you are so we set up the right dashboard."
      footer={
        <>
          Already registered?{' '}
          <Link to="/login" className="font-medium text-ink hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink/60">I am a</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm text-ink focus:outline-none"
          >
            {(Object.keys(roleLabels) as UserRole[]).map((r) => (
              <option key={r} value={r}>
                {roleLabels[r]}
              </option>
            ))}
          </select>
        </div>

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

        <div>
          <label className="flex items-start gap-2 text-xs text-ink/60">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5"
            />
            I agree to the Build OS terms of service and escrow policy.
          </label>
          {errors.agreed && <p className="mt-1.5 text-xs text-brick">{errors.agreed}</p>}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
          icon={isSubmitting ? <Loader2 size={15} className="animate-spin" /> : <ArrowRight size={15} />}
        >
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
    </AuthLayout>
  )
}
