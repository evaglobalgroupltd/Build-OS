import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'
import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Banknote,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Copy,
  CreditCard,
  FileCheck2,
  Landmark,
  Loader2,
  LockKeyhole,
  ShieldCheck,
  WalletCards,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { DetailPanel, DetailRow } from '@/components/ui/DetailPanel'
import { CustodyNotice } from '@/modules/escrow/components/CustodyNotice'
import { CLIENT_ROUTES } from '@/pages/client/clientRoutes'

/* =============================================================================
 * Funding.tsx  (route: /app/client/escrow/fund)
 *
 * Flow:  Choose project + amount  ->  Review  ->  Instruction created
 *
 * What this version does differently from the first draft:
 *  - Amount is typed as digits only and shown with thousands separators
 *    (4500000 -> 4,500,000) and spelled out in words underneath, so a wrong
 *    zero is obvious before anything is reviewed.
 *  - The progress bar shows already funded + this funding against the budget.
 *  - Validation is live once the field is touched, and failed submits scroll
 *    to and focus the first problem.
 *  - Changing project re-validates the amount against the new project.
 *  - Fully funded projects can't be selected.
 *  - High-value amounts get an extra "double-check" notice.
 *  - Submit is async-safe: loading state, no double submit, error message.
 *  - Instruction ID can be copied from the confirmation panel.
 *  - Smallest text sizes raised so nothing is below 10px.
 *
 * Everything lives in this one file on purpose.
 * ============================================================================= */

/* -------------------------------------------------------------------------- */
/* Types & constants                                                           */
/* -------------------------------------------------------------------------- */

type FundingSource = 'partner_escrow' | 'direct_bank_transfer'
type Step = 'form' | 'review' | 'submitted'

interface ProjectOption {
  id: string
  name: string
  budget: number
  funded: number
}

/* Replace with real project data (e.g. from useProjects / escrowApi). */
const PROJECTS: ProjectOption[] = [
  {
    id: 'PRJ-2026-00421',
    name: 'Abuja Residential Development',
    budget: 48_500_000,
    funded: 31_200_000,
  },
  {
    id: 'PRJ-2026-00387',
    name: 'Lagos Commercial Development',
    budget: 72_000_000,
    funded: 45_800_000,
  },
]

const PURPOSES = [
  ['project', 'General project funding'],
  ['milestone', 'Specific milestone'],
  ['materials', 'Materials and procurement'],
  ['professional', 'Professional services'],
  ['contingency', 'Approved contingency'],
] as const

const ALLOCATIONS = [
  {
    id: 'construction',
    icon: Building2,
    title: 'Construction and labour',
    description: 'Approved contractor work and project milestones',
  },
  {
    id: 'materials',
    icon: CreditCard,
    title: 'Materials',
    description: 'Approved procurement and supplier payments',
  },
  {
    id: 'professional',
    icon: ShieldCheck,
    title: 'Professional services',
    description: 'Architecture, engineering and specialist services',
  },
  {
    id: 'contingency',
    icon: WalletCards,
    title: 'Contingency',
    description: 'Approved unforeseen project costs',
  },
] as const

const SOURCE_LABEL: Record<FundingSource, string> = {
  partner_escrow: 'Approved escrow partner',
  direct_bank_transfer: 'Designated bank transfer',
}

/** Amounts at or above this get an extra "double-check" notice. */
const LARGE_AMOUNT = 20_000_000

/** 12 digits = up to ₦999,999,999,999. */
const MAX_DIGITS = 12

const focusRing =
  'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink/[0.07]'

const inputBase =
  'w-full border border-ink/[0.08] bg-[#F8F9F7] text-ink outline-none transition-all placeholder:text-ink/30 focus:border-ink/20 focus:bg-white focus:ring-4 focus:ring-ink/[0.035]'

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

const formatNaira = (n: number) =>
  `₦${n.toLocaleString('en-NG', { maximumFractionDigits: 0 })}`

/** Compact: ₦4.50M. Used for budgets and balances. */
const formatM = (n: number) => `₦${(n / 1_000_000).toFixed(2)}M`

const remainingOf = (p: ProjectOption) => Math.max(p.budget - p.funded, 0)

const percent = (part: number, whole: number) =>
  whole > 0 ? Math.min(Math.max((part / whole) * 100, 0), 100) : 0

const ONES = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
  'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
  'sixteen', 'seventeen', 'eighteen', 'nineteen',
]
const TENS = [
  '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty',
  'ninety',
]
const SCALES = ['', 'thousand', 'million', 'billion']

function belowThousand(n: number): string {
  const parts: string[] = []
  const hundreds = Math.floor(n / 100)
  const rest = n % 100

  if (hundreds) parts.push(`${ONES[hundreds]} hundred`)

  if (rest) {
    if (rest < 20) parts.push(ONES[rest])
    else {
      const t = TENS[Math.floor(rest / 10)]
      const o = rest % 10
      parts.push(o ? `${t}-${ONES[o]}` : t)
    }
  }

  return parts.join(' and ')
}

/** 4500000 -> "Four million, five hundred thousand naira". */
function amountInWords(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return ''

  const chunks: string[] = []
  let rest = Math.floor(n)
  let scale = 0

  while (rest > 0 && scale < SCALES.length) {
    const chunk = rest % 1000
    if (chunk) {
      chunks.unshift(`${belowThousand(chunk)}${SCALES[scale] ? ` ${SCALES[scale]}` : ''}`)
    }
    rest = Math.floor(rest / 1000)
    scale += 1
  }

  const text = chunks.join(', ')
  return `${text.charAt(0).toUpperCase()}${text.slice(1)} naira`
}

/* -------------------------------------------------------------------------- */
/* Main page                                                                   */
/* -------------------------------------------------------------------------- */

export function Funding() {
  const [projectId, setProjectId] = useState(
    () => (PROJECTS.find((p) => remainingOf(p) > 0) ?? PROJECTS[0]).id,
  )
  const [amount, setAmount] = useState('') // digits only
  const [amountTouched, setAmountTouched] = useState(false)
  const [source, setSource] = useState<FundingSource>('partner_escrow')
  const [reference, setReference] = useState('')
  const [purpose, setPurpose] = useState<string>('project')
  const [allocations, setAllocations] = useState<string[]>([])
  const [confirmed, setConfirmed] = useState(false)

  const [attempted, setAttempted] = useState(false)
  const [step, setStep] = useState<Step>('form')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [instructionId, setInstructionId] = useState('')
  const [copied, setCopied] = useState(false)

  const amountRef = useRef<HTMLInputElement>(null)
  const confirmRef = useRef<HTMLInputElement>(null)
  const copyTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(copyTimer.current), [])

  /* ---------------------------- Derived values ---------------------------- */

  const project = PROJECTS.find((p) => p.id === projectId) ?? PROJECTS[0]
  const remaining = remainingOf(project)
  const amountValue = Number(amount) || 0
  const amountRemaining = Math.max(remaining - amountValue, 0)
  const formattedAmount = amountValue > 0 ? formatNaira(amountValue) : '₦0'
  const words = useMemo(() => amountInWords(amountValue), [amountValue])
  const isLarge = amountValue >= LARGE_AMOUNT && amountValue <= remaining

  const fundedPct = percent(project.funded, project.budget)
  const thisPct = percent(Math.min(amountValue, remaining), project.budget)

  const showAmountError = attempted || amountTouched

  const amountError = !showAmountError
    ? null
    : remaining <= 0
      ? 'This project is fully funded.'
      : amountValue <= 0
        ? 'Enter the amount you want to add.'
        : amountValue > remaining
          ? `That is above the remaining ${formatM(remaining)} for this project.`
          : null

  const confirmError =
    attempted && !confirmed
      ? 'Confirm that you understand this instruction to continue.'
      : null

  const purposeLabel = PURPOSES.find(([value]) => value === purpose)?.[1] ?? ''
  const activeStep = step === 'form' ? 0 : step === 'review' ? 1 : 2

  /* ------------------------------- Handlers ------------------------------- */

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value
      .replace(/\D/g, '')
      .replace(/^0+(?=\d)/, '')
      .slice(0, MAX_DIGITS)

    setAmount(digits)
  }

  const setQuickAmount = (fraction: number) => {
    setAmount(String(Math.round(remaining * fraction)))
    setAmountTouched(true)
  }

  const selectProject = (id: string) => {
    const next = PROJECTS.find((p) => p.id === id)
    if (!next || remainingOf(next) <= 0) return

    setProjectId(id)
    /* Re-check the typed amount against the newly selected project. */
    if (amount) setAmountTouched(true)
  }

  const toggleAllocation = (id: string) =>
    setAllocations((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    )

  const handleContinue = () => {
    setAttempted(true)

    const amountOk = remaining > 0 && amountValue > 0 && amountValue <= remaining

    if (!amountOk) {
      amountRef.current?.focus()
      amountRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    if (!confirmed) {
      confirmRef.current?.focus()
      confirmRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setSubmitError(null)
    setStep('review')
  }

  const submitFunding = async () => {
    if (submitting) return

    setSubmitting(true)
    setSubmitError(null)

    try {
      /*
       * Replace with the real API call, e.g.
       *
       *   const { id } = await escrowApi.createFunding({
       *     projectId, amount: amountValue, source, reference, purpose, allocations,
       *   })
       *   setInstructionId(id)
       */
      await new Promise((resolve) => window.setTimeout(resolve, 700))

      setInstructionId(`FND-${Date.now().toString().slice(-6)}`)
      setStep('submitted')
    } catch {
      setSubmitError(
        'We could not create the funding instruction. Nothing was sent. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setAmount('')
    setAmountTouched(false)
    setReference('')
    setPurpose('project')
    setAllocations([])
    setConfirmed(false)
    setAttempted(false)
    setSubmitError(null)
    setCopied(false)
    setStep('form')
  }

  const closePanel = () => {
    if (submitting) return
    if (step === 'submitted') resetForm()
    else setStep('form')
  }

  const copyInstructionId = async () => {
    try {
      await navigator.clipboard.writeText(instructionId)
      setCopied(true)
      window.clearTimeout(copyTimer.current)
      copyTimer.current = window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* Clipboard can be blocked; the ID is still visible on screen. */
    }
  }

  /* -------------------------------- Render -------------------------------- */

  return (
    <div className="min-h-full space-y-7 pb-12">
      {/* ===================================================================
       * HEADER
       * =================================================================== */}
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-[31px] font-semibold leading-tight tracking-[-0.04em] text-ink sm:text-[38px]">
              Add funds to your project
            </h1>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#12613E]/10 bg-[#EAF4EE] px-3 py-1.5 text-[11px] font-semibold text-[#12613E]">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Protected workflow
            </span>
          </div>

          <p className="mt-2 max-w-2xl text-[13px] leading-6 text-ink/55">
            Choose a project and an amount. You will review everything before
            any payment is started.
          </p>
        </div>

        <Link
          to={CLIENT_ROUTES.escrow}
          className={`group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-ink/[0.09] bg-white px-4 py-2.5 text-xs font-semibold text-ink shadow-[0_5px_18px_rgba(20,30,25,0.035)] transition-all hover:-translate-y-0.5 hover:border-ink/20 ${focusRing}`}
        >
          <ArrowLeft
            className="h-3.5 w-3.5 text-ink/40 transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          Back to escrow
        </Link>
      </header>

      {/* ===================================================================
       * TRUST STRIP
       * =================================================================== */}
      <div className="grid gap-3 sm:grid-cols-3">
        <TrustItem
          icon={LockKeyhole}
          title="Controlled funds"
          description="Money follows the approved project workflow."
        />
        <TrustItem
          icon={FileCheck2}
          title="Clear approvals"
          description="Every payment is verified before release."
        />
        <TrustItem
          icon={ShieldCheck}
          title="Review first"
          description="Nothing is sent when you enter an amount."
        />
      </div>

      <CustodyNotice fundingSource={source} custodian="Approved escrow partner" />

      {/* ===================================================================
       * MAIN LAYOUT
       * =================================================================== */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <main className="min-w-0 space-y-5">
          <StepIndicator activeStep={activeStep} />

          {/* ------------------------------ Project ------------------------------ */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Which project are you funding?"
              subtitle="Pick the project that should receive the money."
            />

            <CardBody className="p-3 sm:p-4">
              <div className="space-y-3" role="radiogroup" aria-label="Project">
                {PROJECTS.map((item) => (
                  <ProjectOptionCard
                    key={item.id}
                    project={item}
                    checked={item.id === projectId}
                    onSelect={() => selectProject(item.id)}
                  />
                ))}
              </div>
            </CardBody>
          </Card>

          {/* ------------------------------ Amount ------------------------------- */}
          <Card className="overflow-hidden border-ink/[0.08]">
            <div className="border-b border-ink/[0.06] bg-[#FBFCFA] px-5 py-5 sm:px-7 sm:py-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-white shadow-[0_5px_15px_rgba(20,30,25,0.12)]">
                    <Banknote className="h-4 w-4" aria-hidden="true" />
                  </div>

                  <label
                    htmlFor="amount"
                    className="text-[14px] font-semibold text-ink"
                  >
                    How much would you like to add?
                  </label>
                </div>

                <div className="hidden items-center gap-1.5 rounded-full border border-ink/[0.07] bg-white px-3 py-1.5 sm:flex">
                  <LockKeyhole className="h-3 w-3 text-ink/35" aria-hidden="true" />
                  <span className="text-[11px] font-medium text-ink/45">
                    Secure entry
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex w-14 items-center justify-center">
                    <span className="font-display text-[22px] font-semibold text-ink/30">
                      ₦
                    </span>
                  </div>

                  <input
                    ref={amountRef}
                    id="amount"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={amount ? Number(amount).toLocaleString('en-NG') : ''}
                    onChange={handleAmountChange}
                    onBlur={() => amount && setAmountTouched(true)}
                    aria-invalid={Boolean(amountError)}
                    aria-describedby={amountError ? 'amount-error' : 'amount-help'}
                    placeholder="0"
                    className={`w-full rounded-[20px] border bg-white py-5 pl-[58px] pr-5 font-display text-[30px] font-semibold tracking-[-0.04em] text-ink outline-none transition-all placeholder:text-ink/20 focus:ring-4 sm:py-6 sm:text-[38px] ${
                      amountError
                        ? 'border-red-300 focus:border-red-300 focus:ring-red-100'
                        : 'border-ink/[0.09] focus:border-ink/20 focus:ring-ink/[0.035]'
                    }`}
                  />
                </div>

                {amountError ? (
                  <p
                    id="amount-error"
                    role="alert"
                    className="mt-2 text-[12px] font-medium text-red-600"
                  >
                    {amountError}
                  </p>
                ) : (
                  <p
                    id="amount-help"
                    aria-live="polite"
                    className="mt-2 min-h-[20px] text-[12px] leading-5 text-ink/50"
                  >
                    {words || 'You will review the amount before any payment is started.'}
                  </p>
                )}

                {isLarge && (
                  <div
                    role="note"
                    className="mt-3 flex gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-amber-900"
                  >
                    <AlertTriangle
                      className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
                      aria-hidden="true"
                    />
                    <p className="text-[12px] leading-5">
                      This is a high-value amount. Check the figure above and the
                      payment channel below before you continue.
                    </p>
                  </div>
                )}

                {/* Budget bar: already funded + this funding */}
                <div className="mt-6">
                  <div className="flex items-center justify-between gap-3 text-[12px]">
                    <span className="font-medium text-ink/55">
                      Budget funded after this payment
                    </span>
                    <span className="font-mono font-semibold text-ink/70">
                      {(fundedPct + thisPct).toFixed(1)}%
                    </span>
                  </div>

                  <div
                    className="mt-2 flex h-2 overflow-hidden rounded-full bg-ink/[0.06]"
                    role="img"
                    aria-label={`${fundedPct.toFixed(0)} percent already funded, plus ${thisPct.toFixed(0)} percent from this payment`}
                  >
                    <div
                      className="h-full bg-[#12613E]/55 transition-all duration-500"
                      style={{ width: `${fundedPct}%` }}
                    />
                    <div
                      className="h-full bg-ink transition-all duration-500"
                      style={{ width: `${thisPct}%` }}
                    />
                  </div>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-ink/45">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#12613E]/55" />
                      Already funded
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-ink" />
                      This payment
                    </span>
                  </div>
                </div>

                {/* Quick amounts */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <QuickAmount label="25%" disabled={remaining <= 0} onClick={() => setQuickAmount(0.25)} />
                  <QuickAmount label="50%" disabled={remaining <= 0} onClick={() => setQuickAmount(0.5)} />
                  <QuickAmount label="75%" disabled={remaining <= 0} onClick={() => setQuickAmount(0.75)} />
                  <QuickAmount
                    label="Full remaining"
                    disabled={remaining <= 0}
                    onClick={() => setQuickAmount(1)}
                    featured
                  />
                </div>
                <p className="mt-2 text-[11px] text-ink/40">
                  Percentages are of the {formatM(remaining)} still required.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 divide-x divide-ink/[0.06] bg-white">
              <MiniFinancial label="Project budget" value={formatM(project.budget)} />
              <MiniFinancial label="Already funded" value={formatM(project.funded)} />
              <MiniFinancial label="Still required" value={formatM(remaining)} emphasis />
            </div>
          </Card>

          {/* --------------------------- Payment method --------------------------- */}
          <Card>
            <CardHeader
              title="How would you like to pay?"
              subtitle="Choose one of the approved payment channels."
            />

            <CardBody>
              <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Payment method">
                <FundingMethod
                  title="Escrow partner"
                  description="Funds are held by the approved escrow and payment partner."
                  icon={ShieldCheck}
                  checked={source === 'partner_escrow'}
                  onSelect={() => setSource('partner_escrow')}
                  recommended
                />
                <FundingMethod
                  title="Bank transfer"
                  description="Transfer through the designated project bank account."
                  icon={Landmark}
                  checked={source === 'direct_bank_transfer'}
                  onSelect={() => setSource('direct_bank_transfer')}
                />
              </div>
            </CardBody>
          </Card>

          {/* ------------------------------- Details ------------------------------- */}
          <Card>
            <CardHeader
              title="Add details"
              subtitle="Optional. Helps us match and allocate the funds."
            />

            <CardBody>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="reference" className="text-[12px] font-semibold text-ink/65">
                    Payment reference
                  </label>
                  <input
                    id="reference"
                    type="text"
                    maxLength={60}
                    value={reference}
                    onChange={(event) => setReference(event.target.value)}
                    placeholder="e.g. Project top-up"
                    className={`${inputBase} mt-2 h-11 rounded-xl px-3.5 text-[13px]`}
                  />
                </div>

                <div>
                  <label htmlFor="funding-purpose" className="text-[12px] font-semibold text-ink/65">
                    What is this for?
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="funding-purpose"
                      value={purpose}
                      onChange={(event) => setPurpose(event.target.value)}
                      className={`${inputBase} h-11 appearance-none rounded-xl px-3.5 pr-10 text-[13px] font-medium`}
                    >
                      {PURPOSES.map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* ------------------------------ Allocation ------------------------------ */}
          <Card>
            <CardHeader
              title="Where should the funds be used?"
              subtitle="Optional. Select one or more intended uses."
            />

            <CardBody>
              <div className="grid gap-3 sm:grid-cols-2">
                {ALLOCATIONS.map((allocation) => (
                  <AllocationRow
                    key={allocation.id}
                    icon={allocation.icon}
                    title={allocation.title}
                    description={allocation.description}
                    selected={allocations.includes(allocation.id)}
                    onToggle={() => toggleAllocation(allocation.id)}
                  />
                ))}
              </div>
            </CardBody>
          </Card>

          {/* ------------------------------ Confirmation ------------------------------ */}
          <Card className="overflow-hidden">
            <CardBody className="p-0">
              <div className="flex items-start gap-4 bg-[#F8FAF8] p-5 sm:p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[#12613E] shadow-[0_4px_14px_rgba(18,97,62,0.06)]">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-ink">
                    One last confirmation
                  </p>
                  <p className="mt-1.5 text-[12px] leading-5 text-ink/55">
                    This step only creates a funding instruction. You will see
                    every detail on the next screen before any payment is made.
                  </p>
                </div>
              </div>

              <div className="border-t border-ink/[0.06] p-5 sm:p-6">
                <label className="flex cursor-pointer items-start gap-3.5">
                  <input
                    ref={confirmRef}
                    type="checkbox"
                    checked={confirmed}
                    onChange={(event) => setConfirmed(event.target.checked)}
                    aria-invalid={Boolean(confirmError)}
                    aria-describedby={confirmError ? 'confirm-error' : undefined}
                    className="peer sr-only"
                  />

                  <span
                    aria-hidden="true"
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all peer-focus-visible:ring-4 peer-focus-visible:ring-ink/[0.08] ${
                      confirmed
                        ? 'border-ink bg-ink'
                        : confirmError
                          ? 'border-red-300 bg-white'
                          : 'border-ink/20 bg-white'
                    }`}
                  >
                    {confirmed && <Check className="h-3 w-3 text-white" />}
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[13px] font-semibold text-ink">
                      I understand and approve this funding instruction
                    </span>
                    <span className="mt-1.5 block text-[12px] leading-5 text-ink/55">
                      Funds are processed through the payment channel I selected.
                      Build OS does not take custody of client funds.
                    </span>
                  </span>
                </label>

                {confirmError && (
                  <p
                    id="confirm-error"
                    role="alert"
                    className="mt-3 pl-[34px] text-[12px] font-medium text-red-600"
                  >
                    {confirmError}
                  </p>
                )}
              </div>
            </CardBody>
          </Card>

          {/* ------------------------------ Primary action ------------------------------ */}
          <div className="sticky bottom-4 z-20">
            <div className="rounded-[22px] border border-ink/[0.08] bg-white/95 p-3 shadow-[0_18px_50px_rgba(20,30,25,0.12)] backdrop-blur-xl sm:p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="hidden min-w-0 sm:block">
                  <p className="text-[11px] font-medium text-ink/45">
                    Amount to review
                  </p>
                  <p className="mt-0.5 truncate font-display text-[20px] font-semibold tracking-[-0.025em] text-ink">
                    {formattedAmount}
                  </p>
                </div>

                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
                  <Link
                    to={CLIENT_ROUTES.escrow}
                    className={`inline-flex h-11 items-center justify-center rounded-full border border-ink/[0.09] bg-white px-5 text-xs font-semibold text-ink/60 transition hover:border-ink/15 hover:text-ink ${focusRing}`}
                  >
                    Cancel
                  </Link>

                  <button
                    type="button"
                    onClick={handleContinue}
                    disabled={remaining <= 0}
                    className={`group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-ink px-7 text-xs font-semibold text-white shadow-[0_8px_22px_rgba(20,30,25,0.14)] transition-all hover:-translate-y-0.5 hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 ${focusRing}`}
                  >
                    Review funding
                    <ArrowRight
                      className="h-3.5 w-3.5 text-white/60 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* ===================================================================
         * SIDEBAR
         * =================================================================== */}
        <aside className="space-y-5">
          {/* Summary */}
          <Card className="overflow-hidden">
            <div className="bg-ink p-5 text-white sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-white/55">
                    Funding summary
                  </p>
                  <p className="mt-2 truncate font-display text-[28px] font-semibold tracking-[-0.035em]">
                    {formattedAmount}
                  </p>
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <WalletCards className="h-4 w-4 text-white/75" aria-hidden="true" />
                </div>
              </div>

              <p className="mt-1 text-[11px] text-white/50">Proposed funding amount</p>
            </div>

            <CardBody className="p-5">
              <div className="flex items-start gap-3 rounded-[16px] bg-[#F7F8F6] p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-ink/45 shadow-sm">
                  <Building2 className="h-4 w-4" aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <p className="text-[13px] font-semibold leading-4 text-ink">
                    {project.name}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-ink/40">{project.id}</p>
                </div>
              </div>

              <div className="mt-5 space-y-3.5">
                <SummaryRow label="Project budget" value={formatM(project.budget)} />
                <SummaryRow label="Already funded" value={formatM(project.funded)} />
                <SummaryRow label="Payment channel" value={SOURCE_LABEL[source]} />
                <SummaryRow label="This funding" value={formattedAmount} strong />

                <div className="border-t border-ink/[0.06] pt-4">
                  <div className="flex items-end justify-between gap-4">
                    <span className="text-[12px] font-medium text-ink/50">
                      Still required after this
                    </span>
                    <span className="font-display text-[19px] font-semibold tracking-[-0.025em] text-ink">
                      {formatM(amountRemaining)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to={CLIENT_ROUTES.escrow}
                className={`mt-5 flex items-center justify-between rounded-xl border border-ink/[0.07] px-3.5 py-3 text-[12px] font-semibold text-ink/60 transition hover:border-ink/15 hover:text-ink ${focusRing}`}
              >
                View escrow activity
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </CardBody>
          </Card>

          {/* Protection */}
          <Card className="overflow-hidden">
            <div className="border-b border-[#12613E]/10 bg-[#F5F8F5] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#12613E] shadow-sm">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                </div>
                <p className="text-[13px] font-semibold text-ink">
                  How your money stays protected
                </p>
              </div>
            </div>

            <CardBody className="space-y-4 p-5">
              <ProtectionRow
                icon={LockKeyhole}
                title="Controlled custody"
                description="Build OS does not hold client funds."
              />
              <ProtectionRow
                icon={FileCheck2}
                title="Evidence and approval"
                description="Payments are released only after verification."
              />
              <ProtectionRow
                icon={CircleHelp}
                title="Full visibility"
                description="Funding activity stays linked to the project."
              />
            </CardBody>
          </Card>

          {/* Process */}
          <Card className="p-5">
            <p className="text-[13px] font-semibold text-ink">What happens next</p>

            <ol className="mt-5">
              <ProcessStep
                number="1"
                title="Choose"
                description="Select the project and enter your amount."
                current={activeStep === 0}
                done={activeStep > 0}
              />
              <ProcessStep
                number="2"
                title="Review"
                description="Check every detail before continuing."
                current={activeStep === 1}
                done={activeStep > 1}
              />
              <ProcessStep
                number="3"
                title="Pay"
                description="Complete payment through the selected channel."
                current={activeStep === 2}
                done={false}
                last
              />
            </ol>
          </Card>

          <div className="rounded-[18px] border border-ink/[0.07] bg-white p-5">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#F7F8F6] text-ink/45">
                <CircleHelp className="h-4 w-4" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[12px] font-semibold text-ink">
                  Unsure about a large transfer?
                </p>
                <p className="mt-1 text-[12px] leading-5 text-ink/50">
                  Check your project and escrow activity first, or message the
                  project team before you continue.
                </p>
                <Link
                  to={CLIENT_ROUTES.messages}
                  className={`mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink/70 hover:text-ink ${focusRing}`}
                >
                  Message the project team
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ===================================================================
       * REVIEW / SUBMITTED PANEL
       * =================================================================== */}
      {step !== 'form' && (
        <DetailPanel
          open
          onClose={closePanel}
          eyebrow={step === 'review' ? 'Step 2 of 3' : 'Funding instruction'}
          title={step === 'review' ? 'Review before payment' : 'Funding instruction created'}
          footer={
            step === 'review' ? (
              <>
                <button
                  type="button"
                  onClick={submitFunding}
                  disabled={submitting}
                  className={`inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-xs font-semibold text-white shadow-[0_6px_18px_rgba(20,30,25,0.10)] transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                      Creating instruction...
                    </>
                  ) : (
                    <>
                      Continue to payment
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('form')}
                  disabled={submitting}
                  className={`inline-flex h-11 items-center rounded-full border border-ink/[0.09] px-5 text-xs font-semibold text-ink/60 transition hover:text-ink disabled:opacity-50 ${focusRing}`}
                >
                  Edit details
                </button>
              </>
            ) : (
              <>
                <Link
                  to={CLIENT_ROUTES.escrow}
                  className={`inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-xs font-semibold text-white transition hover:bg-ink/90 ${focusRing}`}
                >
                  <WalletCards className="h-3.5 w-3.5" aria-hidden="true" />
                  View escrow
                </Link>

                <button
                  type="button"
                  onClick={resetForm}
                  className={`inline-flex h-11 items-center rounded-full border border-ink/[0.09] px-5 text-xs font-semibold text-ink/60 transition hover:text-ink ${focusRing}`}
                >
                  Fund another project
                </button>
              </>
            )
          }
        >
          {step === 'review' && (
            <div className="mb-5 rounded-[18px] border border-[#12613E]/10 bg-[#F5F8F5] p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#12613E] shadow-sm">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-ink">
                    Check everything below
                  </p>
                  <p className="mt-1 text-[12px] leading-5 text-ink/55">
                    No payment has been sent yet. Continuing creates a funding
                    instruction you can then complete.
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 'review' && submitError && (
            <div
              role="alert"
              className="mb-5 flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700"
            >
              <AlertTriangle className="mt-0.5 h-[18px] w-[18px] shrink-0" aria-hidden="true" />
              <p className="text-[12px] leading-5">{submitError}</p>
            </div>
          )}

          {step === 'submitted' && (
            <div className="mb-5 rounded-2xl bg-[#EAF4EE] p-4 text-[#12613E]">
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold">Instruction recorded</p>
                  <p className="mt-1 text-[12px] leading-5 opacity-85">
                    Continue with the selected payment channel to complete the
                    transaction. Funds are only counted once the payment is
                    confirmed.
                  </p>

                  <button
                    type="button"
                    onClick={copyInstructionId}
                    className={`mt-3 inline-flex items-center gap-2 rounded-lg border border-[#12613E]/15 bg-white px-3 py-2 font-mono text-[12px] font-semibold text-[#12613E] transition hover:bg-white/80 ${focusRing}`}
                    aria-label={`Copy instruction ID ${instructionId}`}
                  >
                    {instructionId}
                    {copied ? (
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    <span className="font-sans text-[11px] font-medium opacity-70" aria-live="polite">
                      {copied ? 'Copied' : 'Copy'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          <dl className="divide-y divide-line border-y border-line">
            <DetailRow label="Project" value={project.name} />
            <DetailRow label="Amount" value={formatNaira(amountValue)} />
            <DetailRow label="Payment channel" value={SOURCE_LABEL[source]} />
            <DetailRow label="Purpose" value={purposeLabel} />

            {reference.trim() && <DetailRow label="Reference" value={reference.trim()} />}

            {allocations.length > 0 && (
              <DetailRow
                label="Allocation"
                value={ALLOCATIONS.filter((a) => allocations.includes(a.id))
                  .map((a) => a.title)
                  .join(', ')}
              />
            )}

            <DetailRow label="Still required after this" value={formatM(amountRemaining)} />
          </dl>

          {words && (
            <p className="mt-3 text-[12px] leading-5 text-ink/50">{words}.</p>
          )}

          <div className="mt-5 flex gap-2 rounded-xl bg-[#F7F8F6] p-3.5">
            <LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink/35" aria-hidden="true" />
            <p className="text-[12px] leading-5 text-ink/50">
              Build OS does not take custody of client funds. Payment is
              processed through the selected channel.
            </p>
          </div>
        </DetailPanel>
      )}
    </div>
  )
}

/* =============================================================================
 * TRUST ITEM
 * ============================================================================= */

function TrustItem({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof ShieldCheck
  title: string
  description: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-[16px] border border-ink/[0.06] bg-white px-4 py-3.5 shadow-[0_4px_16px_rgba(20,30,25,0.025)]">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F7F8F6] text-ink/50">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <p className="text-[12px] font-semibold text-ink">{title}</p>
        <p className="mt-0.5 text-[11px] leading-4 text-ink/50">{description}</p>
      </div>
    </div>
  )
}

/* =============================================================================
 * STEP INDICATOR
 * ============================================================================= */

function StepIndicator({ activeStep }: { activeStep: number }) {
  const steps = ['Choose', 'Review', 'Pay']

  return (
    <nav
      aria-label="Funding progress"
      className="rounded-[18px] border border-ink/[0.06] bg-white px-4 py-4 sm:px-5"
    >
      <ol className="flex items-center">
        {steps.map((label, index) => {
          const current = activeStep === index
          const done = activeStep > index

          return (
            <li
              key={label}
              aria-current={current ? 'step' : undefined}
              className="flex min-w-0 flex-1 items-center last:flex-none"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold transition-all ${
                    current
                      ? 'bg-ink text-white shadow-[0_4px_12px_rgba(20,30,25,0.12)]'
                      : done
                        ? 'bg-[#EAF4EE] text-[#12613E]'
                        : 'bg-[#F7F8F6] text-ink/40'
                  }`}
                >
                  {done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : index + 1}
                </span>

                <span
                  className={`truncate text-[12px] font-semibold ${
                    current ? 'text-ink' : done ? 'text-[#12613E]' : 'text-ink/40'
                  }`}
                >
                  {label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`mx-3 h-px flex-1 ${
                    done ? 'bg-[#12613E]/25' : 'bg-ink/[0.08]'
                  }`}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/* =============================================================================
 * PROJECT CARD
 * ============================================================================= */

function ProjectOptionCard({
  project,
  checked,
  onSelect,
}: {
  project: ProjectOption
  checked: boolean
  onSelect: () => void
}) {
  const remaining = remainingOf(project)
  const progress = percent(project.funded, project.budget)
  const full = remaining <= 0

  return (
    <label
      className={`group block ${full ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <input
        type="radio"
        name="project"
        value={project.id}
        checked={checked}
        disabled={full}
        onChange={onSelect}
        className="peer sr-only"
      />

      <div
        className={`relative overflow-hidden rounded-[18px] border p-4 transition-all duration-300 peer-focus-visible:ring-4 peer-focus-visible:ring-ink/[0.08] ${
          full
            ? 'border-ink/[0.06] bg-[#F8F9F7] opacity-70'
            : checked
              ? 'border-[#12613E]/25 bg-[#FBFDFB] shadow-[0_10px_30px_rgba(18,97,62,0.055)]'
              : 'border-ink/[0.07] bg-white hover:border-ink/[0.13] hover:shadow-[0_10px_30px_rgba(20,30,25,0.045)]'
        }`}
      >
        {checked && (
          <div className="absolute bottom-0 left-0 top-0 w-0.5 bg-[#12613E]" />
        )}

        <div className="flex items-start gap-3.5">
          <div
            aria-hidden="true"
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
              checked ? 'border-[#12613E] bg-[#12613E]' : 'border-ink/20 bg-white'
            }`}
          >
            {checked && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[14px] font-semibold tracking-[-0.01em] text-ink">
                    {project.name}
                  </p>

                  {full && (
                    <span className="inline-flex rounded-full bg-ink/[0.06] px-2 py-0.5 text-[11px] font-semibold text-ink/55">
                      Fully funded
                    </span>
                  )}
                </div>

                <p className="mt-1 font-mono text-[11px] text-ink/40">{project.id}</p>
              </div>

              <div className="sm:text-right">
                <p className="text-[11px] font-medium text-ink/45">Still required</p>
                <p className="mt-0.5 font-display text-[19px] font-semibold tracking-[-0.025em] text-ink">
                  {formatM(remaining)}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-medium text-ink/45">Project funded</span>
                <span className="font-mono font-semibold text-ink/55">
                  {progress.toFixed(1)}%
                </span>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
                <div
                  className="h-full rounded-full bg-[#12613E]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-ink/[0.06] pt-3.5">
              <ProjectMetric label="Budget" value={formatM(project.budget)} />
              <ProjectMetric label="Funded" value={formatM(project.funded)} />
              <ProjectMetric label="Remaining" value={formatM(remaining)} />
            </div>
          </div>
        </div>
      </div>
    </label>
  )
}

function ProjectMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-medium text-ink/40">{label}</p>
      <p className="mt-0.5 truncate font-mono text-[12px] font-semibold text-ink/65">
        {value}
      </p>
    </div>
  )
}

/* =============================================================================
 * QUICK AMOUNT
 * ============================================================================= */

function QuickAmount({
  label,
  onClick,
  featured = false,
  disabled = false,
}: {
  label: string
  onClick: () => void
  featured?: boolean
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full border px-4 py-2 text-[12px] font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-40 ${focusRing} ${
        featured
          ? 'border-ink/[0.10] bg-ink text-white hover:bg-ink/90'
          : 'border-ink/[0.08] bg-white text-ink/60 hover:border-ink/15 hover:text-ink'
      }`}
    >
      {label}
    </button>
  )
}

/* =============================================================================
 * FINANCIAL MINI CARD
 * ============================================================================= */

function MiniFinancial({
  label,
  value,
  emphasis = false,
}: {
  label: string
  value: string
  emphasis?: boolean
}) {
  return (
    <div className="min-w-0 px-3 py-4 sm:px-5">
      <p className="truncate text-[11px] font-medium text-ink/45">{label}</p>
      <p
        className={`mt-1 truncate font-mono text-[13px] font-semibold ${
          emphasis ? 'text-[#12613E]' : 'text-ink/65'
        }`}
      >
        {value}
      </p>
    </div>
  )
}

/* =============================================================================
 * FUNDING METHOD
 * ============================================================================= */

function FundingMethod({
  title,
  description,
  icon: Icon,
  checked,
  onSelect,
  recommended = false,
}: {
  title: string
  description: string
  icon: typeof ShieldCheck
  checked: boolean
  onSelect: () => void
  recommended?: boolean
}) {
  return (
    <label className="group block cursor-pointer">
      <input
        type="radio"
        name="funding-source"
        checked={checked}
        onChange={onSelect}
        className="peer sr-only"
      />

      <div
        className={`relative h-full overflow-hidden rounded-[17px] border p-4 transition-all duration-300 peer-focus-visible:ring-4 peer-focus-visible:ring-ink/[0.08] ${
          checked
            ? 'border-[#12613E]/25 bg-[#F5F8F5] shadow-[0_8px_24px_rgba(18,97,62,0.045)]'
            : 'border-ink/[0.07] bg-[#F8F9F7] hover:border-ink/[0.12] hover:bg-white'
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_3px_12px_rgba(20,30,25,0.035)] transition-colors ${
              checked ? 'text-[#12613E]' : 'text-ink/45'
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[13px] font-semibold text-ink">{title}</p>
                {recommended && (
                  <span className="rounded-full bg-[#EAF4EE] px-2 py-0.5 text-[11px] font-semibold text-[#12613E]">
                    Recommended
                  </span>
                )}
              </div>

              <span
                aria-hidden="true"
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all ${
                  checked
                    ? 'border-[#12613E] bg-[#12613E]'
                    : 'border-ink/15 bg-white'
                }`}
              >
                {checked && <Check className="h-2.5 w-2.5 text-white" />}
              </span>
            </div>

            <p className="mt-1.5 text-[12px] leading-5 text-ink/55">{description}</p>
          </div>
        </div>
      </div>
    </label>
  )
}

/* =============================================================================
 * ALLOCATION
 * ============================================================================= */

function AllocationRow({
  icon: Icon,
  title,
  description,
  selected,
  onToggle,
}: {
  icon: typeof Building2
  title: string
  description: string
  selected: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`group flex items-center gap-3 rounded-[16px] border p-3.5 text-left transition-all duration-300 ${focusRing} ${
        selected
          ? 'border-[#12613E]/25 bg-[#F5F8F5]'
          : 'border-ink/[0.06] bg-[#F8F9F7] hover:border-ink/[0.10] hover:bg-white'
      }`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_3px_10px_rgba(20,30,25,0.025)] ${
          selected ? 'text-[#12613E]' : 'text-ink/45'
        }`}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-ink">{title}</p>
        <p className="mt-0.5 text-[12px] leading-4 text-ink/50">{description}</p>
      </div>

      <span
        aria-hidden="true"
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
          selected ? 'border-[#12613E] bg-[#12613E]' : 'border-ink/15 bg-white'
        }`}
      >
        {selected && <Check className="h-2.5 w-2.5 text-white" />}
      </span>
    </button>
  )
}

/* =============================================================================
 * SUMMARY ROW
 * ============================================================================= */

function SummaryRow({
  label,
  value,
  strong = false,
}: {
  label: string
  value: string
  strong?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-[12px] text-ink/50">{label}</span>
      <span
        className={`text-right font-mono text-[12px] ${
          strong ? 'font-bold text-ink' : 'font-medium text-ink/65'
        }`}
      >
        {value}
      </span>
    </div>
  )
}

/* =============================================================================
 * PROTECTION ROW
 * ============================================================================= */

function ProtectionRow({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof ShieldCheck
  title: string
  description: string
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F7F8F6] text-ink/45">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      </div>

      <div>
        <p className="text-[12px] font-semibold text-ink">{title}</p>
        <p className="mt-0.5 text-[12px] leading-4 text-ink/50">{description}</p>
      </div>
    </div>
  )
}

/* =============================================================================
 * PROCESS STEP
 * ============================================================================= */

function ProcessStep({
  number,
  title,
  description,
  current,
  done,
  last = false,
}: {
  number: string
  title: string
  description: string
  current: boolean
  done: boolean
  last?: boolean
}) {
  return (
    <li className="relative flex gap-3.5" aria-current={current ? 'step' : undefined}>
      {!last && (
        <div
          aria-hidden="true"
          className="absolute bottom-[-18px] left-[13px] top-9 w-px bg-ink/[0.08]"
        />
      )}

      <div
        className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-[11px] font-semibold transition-all ${
          current
            ? 'bg-ink text-white shadow-[0_4px_12px_rgba(20,30,25,0.10)]'
            : done
              ? 'bg-[#EAF4EE] text-[#12613E]'
              : 'bg-[#F7F8F6] text-ink/40 ring-1 ring-ink/[0.05]'
        }`}
      >
        {done ? <Check className="h-3 w-3" aria-hidden="true" /> : number}
      </div>

      <div className="min-w-0 pb-5">
        <p className={`text-[12px] font-semibold ${current ? 'text-ink' : 'text-ink/65'}`}>
          {title}
        </p>
        <p className="mt-0.5 text-[12px] leading-5 text-ink/50">{description}</p>
      </div>
    </li>
  )
}

export default Funding