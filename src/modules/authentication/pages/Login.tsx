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
  const [role, setRole] = useState<UserRole>('client')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function validate() {
    const next: typeof errors = {}
    if (!email.trim()) next.email = 'Enter your email or phone number.'
    else if (!isValidEmailOrPhone(email)) next.email = "That doesn't look like a valid email or phone number."
    if (!password) next.password = 'Enter your password.'
    else if (password.length < 6) next.password = 'Password must be at least 6 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    // Demo-only auth: real implementation wires this to authService (Sec. 32.1)
    window.setTimeout(() => {
      login(role)
      showToast({ tone: 'success', title: 'Welcome back', description: `Logged in as ${roleLabels[role]}.` })
      navigate(roleHomePath[role])
    }, 500)
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to your Build OS account."
      footer={
        <>
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-ink hover:underline">
            Register
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink/60">Log in as</label>
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
            <Link to="/forgot-password" className="text-xs font-medium text-ink/40 hover:text-ink/70">
              Forgot password?
            </Link>
          }
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
          icon={isSubmitting ? <Loader2 size={15} className="animate-spin" /> : <ArrowRight size={15} />}
        >
          {isSubmitting ? 'Logging in…' : 'Log in'}
        </Button>
      </form>
    </AuthLayout>
  )
}
