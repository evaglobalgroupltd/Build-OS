import {
  useEffect,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Check,
  Eye,
  EyeOff,
  ShieldCheck,
} from 'lucide-react'

/* =========================================================
   TYPES
========================================================= */

export interface AuthPanelContent {
  eyebrow?: string
  heading: string
  description: string
  activeChip?: string
}

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
  panel?: AuthPanelContent
  sheetId?: string
}

/* =========================================================
   DEFAULT PANEL
========================================================= */

const DEFAULT_PANEL: AuthPanelContent = {
  eyebrow: 'Build OS',
  heading: 'Build with visibility. Execute with confidence.',
  description:
    'One operating layer connecting people, projects, money and evidence across the built environment.',
}

/* =========================================================
   PRODUCT ROLES
========================================================= */

const ROLE_INDEX = [
  'Clients & Investors',
  'Professionals',
  'Contractors',
  'Project Managers',
  'Suppliers',
]

/* =========================================================
   TRUST ITEMS
========================================================= */

const TRUST_ITEMS = [
  { label: 'Verified participants' },
  { label: 'Controlled project funds' },
  { label: 'Evidence-backed progress' },
]

/* =========================================================
   HELPERS
========================================================= */

function todayStamp() {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date())
}

/* =========================================================
   DECORATIVE GRID
   A drafting-table surface, not a generic gradient mesh —
   the grid, the compass point and the registration marks
   are drawn the way a set of construction drawings would be.
========================================================= */

function ArchitecturalGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '220px 220px',
        }}
      />

      <div className="absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full border border-white/[0.05]" />
      <div className="absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full border border-white/[0.04]" />
      <div className="absolute -right-8 top-12 h-[180px] w-[180px] rounded-full border border-white/[0.035]" />

      <div className="absolute bottom-[-180px] left-[-120px] h-[420px] w-[420px] rounded-full bg-[#1657FF]/10 blur-[100px]" />
      <div className="absolute right-[8%] top-[6%] h-[220px] w-[220px] rounded-full bg-[#D8B978]/[0.06] blur-[90px]" />

      <div className="absolute right-[16%] top-[24%] h-2 w-2 rounded-full bg-sky-300/70 shadow-[0_0_25px_rgba(52,166,255,0.8)]" />
    </div>
  )
}

/* =========================================================
   CORNER MARKS
   Registration marks the way a drawing sheet is aligned
   to a plotter — quiet, technical, never decorative.
========================================================= */

function CornerMarks() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      <span className="absolute left-6 top-6 h-5 w-5 border-l border-t border-white/10" />
      <span className="absolute right-6 top-6 h-5 w-5 border-r border-t border-white/10" />
      <span className="absolute bottom-6 left-6 h-5 w-5 border-b border-l border-white/10" />
      <span className="absolute bottom-6 right-6 h-5 w-5 border-b border-r border-white/10" />
    </div>
  )
}

/* =========================================================
   ROLE INDEX
========================================================= */

function RoleIndex() {
  return (
    <div className="hidden xl:block">
      <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-white/25">
        Built for the ecosystem
      </p>

      <div className="mt-4 space-y-2.5">
        {ROLE_INDEX.map((role) => (
          <div
            key={role}
            className="flex items-center gap-3 text-[10px] text-white/35"
          >
            <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-[#D8B978]/50" />
            <span>{role}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* =========================================================
   TRUST ROW
========================================================= */

function TrustRow() {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3">
      {TRUST_ITEMS.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 text-[10px] text-white/40"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-300/10 text-sky-300">
            <Check size={11} strokeWidth={2.5} />
          </span>
          {item.label}
        </div>
      ))}
    </div>
  )
}

/* =========================================================
   PRODUCT SIGNAL
========================================================= */

function ProductSignal({ sheetId }: { sheetId: string }) {
  return (
    <div className="absolute bottom-8 left-8 right-8 hidden items-center justify-between border-t border-white/10 pt-5 lg:flex">
      <div>
        <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/20">
          Build OS platform · Rev. A
        </p>
        <p className="mt-1 text-[10px] text-white/35">
          People · Projects · Money · Evidence
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/15">
          {sheetId}
        </span>

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_10px_rgba(52,166,255,0.8)]" />
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/25">
            Secure workspace
          </span>
        </div>
      </div>
    </div>
  )
}

/* =========================================================
   AUTH LAYOUT
========================================================= */

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
  panel = DEFAULT_PANEL,
  sheetId = 'AUTH / 01',
}: AuthLayoutProps) {
  const activePanel = panel ?? DEFAULT_PANEL

  return (
    <main className="min-h-screen bg-[#F6F8FC] text-[#0B1220]">
      {/* =====================================================
          PAGE AMBIENCE
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#1657FF]/[0.035] blur-[110px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#34A6FF]/[0.035] blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0B1220 1px, transparent 1px),
              linear-gradient(to bottom, #0B1220 1px, transparent 1px)
            `,
            backgroundSize: '72px 72px',
          }}
        />
      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="relative z-20 border-b border-[#0B1220]/[0.06] bg-[#F6F8FC]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-7 lg:px-10">
          <Link to="/" className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-[0_8px_25px_rgba(11,18,32,0.08)] ring-1 ring-[#0B1220]/[0.05] transition-transform duration-300 group-hover:-translate-y-0.5">
              <img
                src="/images/BuildOs.png"
                alt="Build OS"
                className="h-6 w-6 object-contain"
              />
            </div>

            <div>
              <p className="font-display text-sm font-bold tracking-tight text-[#0B1220]">
                Build OS
              </p>
              <p className="hidden font-mono text-[7px] uppercase tracking-[0.16em] text-[#0B1220]/30 sm:block">
                Construction operating system
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[8px] uppercase tracking-[0.16em] text-[#0B1220]/25 sm:block">
              {sheetId}
            </span>
            <span className="h-1 w-1 rounded-full bg-[#D8B978]" />
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#0B1220]/30">
              Secure access
            </span>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        <div className="overflow-hidden rounded-[28px] border border-[#0B1220]/[0.07] bg-white shadow-[0_35px_100px_-45px_rgba(11,18,32,0.25)]">
          <div className="grid min-h-[calc(100vh-130px)] lg:grid-cols-[minmax(0,1fr)_500px] xl:grid-cols-[minmax(0,1fr)_540px]">
            {/* =================================================
                LEFT — PRODUCT / BRAND EXPERIENCE
            ================================================= */}

            <section className="relative hidden overflow-hidden bg-[#0B1220] lg:block">
              <ArchitecturalGrid />
              <CornerMarks />

              {/* Champagne hairline framing the panel, top edge */}
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#D8B978]/40 to-transparent" />

              <div className="relative z-10 flex min-h-full flex-col justify-between p-10 xl:p-14">
                {/* Top */}
                <div>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 backdrop-blur-xl">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_12px_rgba(52,166,255,0.8)]" />
                      <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        Build OS platform
                      </span>
                    </div>

                    <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/20">
                      {sheetId}
                    </span>
                  </div>

                  {/* Hero */}
                  <div className="mt-20 max-w-[690px] xl:mt-24">
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D8B978]">
                      {activePanel.eyebrow ?? 'Build OS'}
                    </p>

                    <h1 className="mt-5 max-w-[650px] font-display text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-5xl xl:text-[4.2rem]">
                      {activePanel.heading}
                    </h1>

                    <p className="mt-6 max-w-xl text-sm leading-7 text-white/45 sm:text-base">
                      {activePanel.description}
                    </p>

                    <div className="mt-8 h-px w-16 bg-gradient-to-r from-[#D8B978] to-transparent" />
                  </div>

                  {/* Product snapshot */}
                  <div className="mt-14 max-w-[600px]">
                    <div className="rounded-[22px] border border-white/10 bg-white/[0.045] p-2 backdrop-blur-xl">
                      <div className="rounded-[17px] border border-white/10 bg-white/[0.035] p-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/25">
                              Operating layer
                            </p>
                            <p className="mt-1.5 font-display text-sm font-semibold text-white/80">
                              One project record
                            </p>
                          </div>

                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#0B1220]">
                            <ShieldCheck size={16} />
                          </div>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {[
                            ['People', '82%'],
                            ['Projects', '64%'],
                            ['Money', '91%'],
                            ['Evidence', '73%'],
                          ].map(([label, fill]) => (
                            <div
                              key={label}
                              className="rounded-xl border border-white/10 bg-white/[0.035] p-3"
                            >
                              <p className="mt-1 text-[10px] font-medium text-white/60">
                                {label}
                              </p>

                              <div className="mt-4 h-px w-full bg-white/10">
                                <div
                                  className="h-full bg-[#D8B978]/60"
                                  style={{ width: fill }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 flex items-center gap-3 rounded-xl border border-sky-300/10 bg-sky-300/[0.06] px-3.5 py-3">
                          <div className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_10px_rgba(52,166,255,0.8)]" />
                          <p className="text-[9px] text-white/40">
                            Your workspace connects the critical records behind every build.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <RoleIndex />
                  </div>
                </div>

                {/* Bottom */}
                <div className="mt-14">
                  <TrustRow />
                </div>
              </div>

              <ProductSignal sheetId={sheetId} />
            </section>

            {/* =================================================
                RIGHT — AUTH EXPERIENCE
            ================================================= */}

            <section className="relative flex min-h-[680px] flex-col bg-white">
              {/* Mobile brand panel */}
              <div className="relative overflow-hidden bg-[#0B1220] px-6 py-8 lg:hidden">
                <ArchitecturalGrid />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
                      <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        Build OS
                      </span>
                    </div>

                    <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/20">
                      {sheetId}
                    </span>
                  </div>

                  <h2 className="mt-8 max-w-xl font-display text-3xl font-semibold leading-[1] tracking-[-0.04em] text-white">
                    {activePanel.heading}
                  </h2>

                  <p className="mt-4 max-w-lg text-xs leading-6 text-white/45">
                    {activePanel.description}
                  </p>
                </div>
              </div>

              {/* Form content */}
              <div className="flex flex-1 flex-col px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12 xl:px-14">
                <div className="mx-auto flex w-full max-w-[390px] flex-1 flex-col">
                  {/* Form eyebrow */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#1E8E6E]">
                        Secure workspace access
                      </p>
                      <div className="mt-2 h-px w-8 bg-[#1E8E6E]/50" />
                    </div>

                    {activePanel.activeChip && (
                      <span className="rounded-full border border-[#0B1220]/10 bg-[#F6F8FC] px-3 py-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-[#0B1220]/40">
                        {activePanel.activeChip}
                      </span>
                    )}
                  </div>

                  {/* Heading */}
                  <div className="mt-9">
                    <h2 className="font-display text-3xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#0B1220] sm:text-[2.15rem]">
                      {title}
                    </h2>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-[#0B1220]/45">
                      {subtitle}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="my-8 flex items-center gap-3">
                    <span className="h-px flex-1 bg-[#0B1220]/[0.07]" />
                    <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-[#0B1220]/20">
                      Build OS
                    </span>
                    <span className="h-px flex-1 bg-[#0B1220]/[0.07]" />
                  </div>

                  {/* Form */}
                  <div className="flex-1">{children}</div>

                  {/* Footer */}
                  {footer && (
                    <div className="mt-8 border-t border-[#0B1220]/[0.07] pt-6">
                      {footer}
                    </div>
                  )}

                  {/* Bottom metadata */}
                  <div className="mt-8 flex items-center justify-between border-t border-[#0B1220]/[0.06] pt-4">
                    <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-[#0B1220]/20">
                      Build OS · Secure access
                    </span>
                    <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-[#0B1220]/20">
                      {todayStamp()}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Outside shell metadata */}
        <div className="mt-4 flex items-center justify-between px-1">
          <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-[#0B1220]/20">
            People · Projects · Money · Evidence
          </p>
          <Link
            to="/"
            className="group hidden items-center gap-1 font-mono text-[7px] uppercase tracking-[0.15em] text-[#0B1220]/20 transition-colors hover:text-[#1657FF] sm:flex"
          >
            Build OS platform
            <ArrowUpRight
              size={9}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </main>
  )
}

/* =========================================================
   REVEAL
   One orchestrated entrance per step/screen, with an
   optional stagger index for a short list of fields —
   not a scattered fade on every element.
========================================================= */

export function useReveal(dependency?: unknown) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(false)
    const id = window.setTimeout(() => setShow(true), 30)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependency])

  return show
}

export function Reveal({
  show,
  index = 0,
  children,
  className = '',
}: {
  show: boolean
  index?: number
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      } ${className}`}
      style={{ transitionDelay: show ? `${index * 70}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}

/* =========================================================
   PASSWORD TOGGLE
========================================================= */

export function PasswordToggle({
  visible,
  onToggle,
  label = 'Show password',
  disabled = false,
}: {
  visible: boolean
  onToggle: () => void
  label?: string
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-label={visible ? 'Hide password' : label}
      className="group absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#0B1220]/25 transition-all hover:bg-[#0B1220]/[0.04] hover:text-[#0B1220]/60 focus:outline-none focus:ring-2 focus:ring-[#1657FF]/15 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {visible ? (
        <EyeOff
          size={16}
          strokeWidth={1.8}
          className="transition-transform group-hover:scale-105"
        />
      ) : (
        <Eye
          size={16}
          strokeWidth={1.8}
          className="transition-transform group-hover:scale-105"
        />
      )}
    </button>
  )
}

/* =========================================================
   CAPS LOCK
========================================================= */

export function useCapsLock() {
  const [capsLock, setCapsLock] = useState(false)

  const update = (event: KeyboardEvent<HTMLInputElement>) => {
    setCapsLock(event.getModifierState('CapsLock'))
  }

  return {
    capsLock,
    capsHandlers: {
      onKeyDown: update,
      onKeyUp: update,
    },
  }
}

export function CapsLockNote({
  visible,
  children = 'Caps Lock is on',
}: {
  visible: boolean
  children?: ReactNode
}) {
  if (!visible) return null

  return (
    <div className="mt-2 flex items-center gap-2 rounded-lg border border-[#C9963B]/20 bg-[#C9963B]/[0.07] px-3 py-2 text-[10px] font-medium text-[#8A6420]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#C9963B]" />
      {children}
    </div>
  )
}

/* =========================================================
   CHECKBOX
========================================================= */

export function AuthCheckbox({
  checked,
  onChange,
  children,
  disabled = false,
  invalid = false,
  textClassName = '',
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  children: ReactNode
  disabled?: boolean
  invalid?: boolean
  textClassName?: string
}) {
  return (
    <label
      className={`group flex cursor-pointer items-start gap-3 ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      }`}
    >
      <span className="relative mt-0.5 shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          disabled={disabled}
          className="peer sr-only"
        />

        <span
          className={`
            flex h-[18px] w-[18px] items-center justify-center
            rounded-[5px] border bg-white shadow-sm transition-all
            peer-focus-visible:ring-2 peer-focus-visible:ring-[#1657FF]/20
            peer-checked:border-[#1657FF] peer-checked:bg-[#1657FF]
            ${invalid ? 'border-[#B94A3A]/50' : 'border-[#0B1220]/15'}
          `}
        >
          <Check
            size={11}
            strokeWidth={3}
            className="scale-0 text-white transition-transform peer-checked:scale-100"
          />
        </span>
      </span>

      <span
        className={
          textClassName ||
          'text-xs leading-5 text-[#0B1220]/45 transition-colors group-hover:text-[#0B1220]/65'
        }
      >
        {children}
      </span>
    </label>
  )
}

/* =========================================================
   FOCUS FIELD
   Moves the cursor to the first invalid field by matching
   the autoComplete attribute the field was given.
========================================================= */

export function focusField(
  container: HTMLFormElement | null,
  autoComplete: string,
) {
  requestAnimationFrame(() => {
    const element = container?.querySelector<HTMLInputElement>(
      `[autocomplete="${autoComplete}"]`,
    )

    if (!element) return

    element.focus()
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
}