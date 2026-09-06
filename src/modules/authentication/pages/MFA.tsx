import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Loader2, ShieldCheck } from 'lucide-react'
import { useToast } from '@/context/ToastContext'
import { Button } from '@/components/ui/Button'
import { AuthLayout } from '@/layouts/AuthLayout'

/**
 * Multi-Factor Authentication — Authentication module
 * BRD reference: Sec. 32.1
 *
 * Second-factor verification during login.
 * Demo-only: real implementation wires this to authService.verifyMfaCode (Sec. 32.1)
 * and should redirect back to the role dashboard the user was headed to before MFA.
 */

const CODE_LENGTH = 6
const RESEND_SECONDS = 30

export function MFA() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(''))
  const [error, setError] = useState<string | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (secondsLeft <= 0) return
    const timer = window.setInterval(() => setSecondsLeft((s) => s - 1), 1000)
    return () => window.clearInterval(timer)
  }, [secondsLeft])

  const code = digits.join('')

  function setDigit(index: number, value: string) {
    const char = value.replace(/\D/g, '').slice(-1)
    setDigits((prev) => {
      const next = [...prev]
      next[index] = char
      return next
    })
    if (char && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH)
    if (!pasted) return
    e.preventDefault()
    const next = Array(CODE_LENGTH).fill('')
    pasted.split('').forEach((char, i) => {
      next[i] = char
    })
    setDigits(next)
    inputRefs.current[Math.min(pasted.length, CODE_LENGTH - 1)]?.focus()
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (code.length < CODE_LENGTH) {
      setError('Enter the full 6-digit code.')
      return
    }
    setError(undefined)

    setIsSubmitting(true)
    // Demo-only: real implementation calls authService.verifyMfaCode (Sec. 32.1)
    window.setTimeout(() => {
      setIsSubmitting(false)
      showToast({ tone: 'success', title: 'Verified', description: 'Two-factor check passed.' })
      // TODO: redirect to the role dashboard the user was headed to before MFA, not '/login'
      navigate('/login')
    }, 500)
  }

  function handleResend() {
    if (secondsLeft > 0) return
    setSecondsLeft(RESEND_SECONDS)
    setDigits(Array(CODE_LENGTH).fill(''))
    inputRefs.current[0]?.focus()
    showToast({ tone: 'success', title: 'Code resent', description: 'Check your device for a new code.' })
  }

  return (
    <AuthLayout
      title="Two-factor verification"
      subtitle="Enter the 6-digit code from your authenticator app or SMS."
      footer={
        <>
          Trouble signing in?{' '}
          <Link to="/login" className="font-medium text-ink hover:underline">
            Back to log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-teal-light text-teal">
            <ShieldCheck size={22} aria-hidden="true" />
          </div>

          <div className="flex justify-center gap-2" onPaste={handlePaste}>
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? 'one-time-code' : 'off'}
                maxLength={1}
                value={digit}
                onChange={(e) => setDigit(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`h-12 w-10 rounded-md border text-center text-lg font-medium text-ink focus:outline-none focus:ring-2 focus:ring-teal/40 ${
                  error ? 'border-brick' : 'border-line'
                }`}
              />
            ))}
          </div>
          {error && <p className="text-xs text-brick">{error}</p>}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
          icon={isSubmitting ? <Loader2 size={15} className="animate-spin" /> : <ArrowRight size={15} />}
        >
          {isSubmitting ? 'Verifying…' : 'Verify'}
        </Button>

        <p className="text-center text-xs text-ink/40">
          {secondsLeft > 0 ? (
            <>Resend code in {secondsLeft}s</>
          ) : (
            <button type="button" onClick={handleResend} className="font-medium text-ink/70 hover:text-ink hover:underline">
              Resend code
            </button>
          )}
        </p>
      </form>
    </AuthLayout>
  )
}