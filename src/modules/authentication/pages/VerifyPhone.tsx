import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Loader2, Smartphone } from 'lucide-react'
import { useToast } from '@/context/ToastContext'
import { Button } from '@/components/ui/Button'
import { AuthLayout } from '@/layouts/AuthLayout'

/**
 * Verify Phone — Authentication module
 * BRD reference: Sec. 32.1
 *
 * Confirm a phone number via OTP.
 * Demo-only: real implementation wires this to authService.verifyPhoneOtp (Sec. 32.1).
 */

const CODE_LENGTH = 6
const RESEND_SECONDS = 30

function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 4) return phone
  return `••• ••• ${digits.slice(-4)}`
}

export function VerifyPhone() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [searchParams] = useSearchParams()
  const phone = searchParams.get('phone') ?? ''

  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(''))
  const [error, setError] = useState<string | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
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
    // Demo-only: real implementation calls authService.verifyPhoneOtp(phone, code) (Sec. 32.1)
    window.setTimeout(() => {
      setIsSubmitting(false)
      setIsVerified(true)
      showToast({ tone: 'success', title: 'Phone verified', description: 'Your phone number has been confirmed.' })
    }, 500)
  }

  function handleResend() {
    if (secondsLeft > 0) return
    setSecondsLeft(RESEND_SECONDS)
    setDigits(Array(CODE_LENGTH).fill(''))
    inputRefs.current[0]?.focus()
    // Demo-only: real implementation calls authService.resendPhoneOtp(phone) (Sec. 32.1)
    showToast({ tone: 'success', title: 'Code resent', description: 'Check your phone for a new code.' })
  }

  if (isVerified) {
    return (
      <AuthLayout
        title="Phone verified"
        subtitle="Your phone number has been confirmed."
        footer={
          <>
            <Link to="/login" className="font-medium text-ink hover:underline">
              Log in
            </Link>
          </>
        }
      >
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-teal-light text-teal">
            <CheckCircle2 size={22} aria-hidden="true" />
          </div>
          <p className="text-sm text-ink/60">You're all set. This number will be used for account notifications.</p>
          <Button className="w-full" icon={<ArrowRight size={15} />} onClick={() => navigate('/login')}>
            Go to log in
          </Button>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Verify your phone"
      subtitle={phone ? `Enter the 6-digit code sent to ${maskPhone(phone)}.` : 'Enter the 6-digit code sent to your phone.'}
      footer={
        <>
          Trouble receiving it?{' '}
          <Link to="/login" className="font-medium text-ink hover:underline">
            Back to log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-teal-light text-teal">
            <Smartphone size={22} aria-hidden="true" />
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