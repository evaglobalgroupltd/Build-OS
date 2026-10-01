import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import {
  ShieldCheck, Wallet, Building2, Users, Boxes, ClipboardCheck, Award,
  ArrowRight, FileCheck2, CheckCircle2, UserCheck, FolderCheck, ScrollText,
  Compass, HardHat, PackageCheck, CreditCard, ScanSearch, LockKeyhole,
  Activity, ChevronDown, Landmark, FileText, BadgeCheck, Workflow,
  ShieldAlert, ArrowUpRight, Menu, X, type LucideIcon,
} from 'lucide-react'

import { PublicLayout } from '@/layouts/PublicLayout'

/**
 * PUBLIC SITE, single file.
 * Exports: Home, Solutions, Projects, About, Contact, Privacy, Terms, ScrollManager
 */

/* =========================================================
   SHARED UI, HEADER, FOOTER, PAGE WRAPPER, SCROLL MANAGER
========================================================= */

/* =========================================================
   SHARED UI
========================================================= */

export function SectionLabel({
  children,
  dark = false,
}: {
  children: ReactNode
  dark?: boolean
}) {
  return (
    <p
      className={`font-mono text-[10px] font-semibold uppercase tracking-[0.2em] ${
        dark ? 'text-sky-300' : 'text-teal'
      }`}
    >
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
  center = false,
}: {
  eyebrow: string
  title: ReactNode
  description?: string
  dark?: boolean
  center?: boolean
}) {
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <SectionLabel dark={dark}>{eyebrow}</SectionLabel>

      <h2
        className={`mt-4 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-4xl lg:text-5xl ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-5 max-w-2xl text-sm leading-7 sm:text-base ${
            dark ? 'text-white/50' : 'text-ink/50'
          } ${center ? 'mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export function ProductBadge({
  children,
  dark = false,
}: {
  children: ReactNode
  dark?: boolean
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] ${
        dark
          ? 'border-white/10 bg-white/[0.06] text-white/55'
          : 'border-ink/10 bg-white text-ink/45'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dark ? 'bg-sky-300' : 'bg-teal'}`}
      />
      {children}
    </span>
  )
}

export function PrimaryButton({
  children,
  to = '/join',
}: {
  children: ReactNode
  to?: string
}) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1657FF] to-[#34A6FF] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-16px_rgba(22,87,255,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_45px_-14px_rgba(22,87,255,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1657FF] focus-visible:ring-offset-2"
    >
      {children}
      <ArrowRight
        size={16}
        aria-hidden="true"
        className="transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  )
}

export function SecondaryButton({
  children,
  to = '/login',
  dark = false,
}: {
  children: ReactNode
  to?: string
  dark?: boolean
}) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1657FF] focus-visible:ring-offset-2 ${
        dark
          ? 'border-white/15 bg-white/[0.05] text-white hover:border-white/25 hover:bg-white/[0.09]'
          : 'border-ink/10 bg-white/80 text-ink shadow-sm hover:border-teal/25 hover:bg-white'
      }`}
    >
      {children}
    </Link>
  )
}

/* =========================================================
   HEADER
========================================================= */

const NAV_LINKS = [
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'Ecosystem', to: '/#ecosystem' },
  { label: 'Protection', to: '/#protection' },
  { label: 'Projects', to: '/projects' },
  { label: 'FAQ', to: '/#faq' },
] as const

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()

  // Close the mobile menu whenever the route or hash changes.
  useEffect(() => {
    setOpen(false)
  }, [pathname, hash])

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/[0.06] bg-paper/85 backdrop-blur-xl">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Build OS home">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-ink/5">
            <img
              src="/images/BuildOs.png"
              alt=""
              className="h-6 w-6 object-contain"
            />
          </div>

          <div>
            <p className="font-display text-sm font-bold tracking-tight text-ink">
              Build OS
            </p>
            <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-ink/35">
              Construction operating system
            </p>
          </div>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-xs font-medium text-ink/50 transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 sm:flex">
          <Link
            to="/login"
            className="rounded-xl px-4 py-2.5 text-xs font-semibold text-ink/55 transition-colors hover:text-ink"
          >
            Log in
          </Link>

          <PrimaryButton>Start a project</PrimaryButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 bg-white lg:hidden"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-ink/10 bg-paper px-5 py-5 lg:hidden"
        >
          <nav aria-label="Mobile" className="space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-ink/65 hover:bg-white hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex gap-2 border-t border-ink/10 pt-4">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-xl border border-ink/10 bg-white px-4 py-3 text-center text-xs font-semibold text-ink"
            >
              Log in
            </Link>

            <Link
              to="/join"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-xl bg-ink px-4 py-3 text-center text-xs font-semibold text-white"
            >
              Start a project
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

/* =========================================================
   FOOTER
========================================================= */

const PRODUCT_LINKS = [
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'Ecosystem', to: '/#ecosystem' },
  { label: 'Protection', to: '/#protection' },
  { label: 'Projects', to: '/projects' },
  { label: 'FAQ', to: '/#faq' },
] as const

const PLATFORM_LINKS = [
  { label: 'Clients', to: '/solutions/clients' },
  { label: 'Contractors', to: '/solutions/contractors' },
  { label: 'Professionals', to: '/solutions/professionals' },
  { label: 'Marketplace', to: '/solutions/suppliers' },
] as const

const COMPANY_LINKS = [
  { label: 'About Build OS', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
] as const

const linkClass =
  'block text-xs text-white/45 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none'

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: ReadonlyArray<{ label: string; to: string }>
}) {
  return (
    <nav aria-label={title}>
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/25">
        {title}
      </p>

      <div className="mt-4 space-y-3">
        {links.map((link) => (
          <Link key={link.label} to={link.to} className={linkClass}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5" aria-label="Build OS home">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
                <img
                  src="/images/BuildOs.png"
                  alt=""
                  className="h-6 w-6 object-contain"
                />
              </div>

              <div>
                <p className="font-display text-sm font-bold">Build OS</p>

                <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-white/30">
                  Construction operating system
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-white/35">
              A controlled operating layer for property development and
              construction execution — connecting people, projects, money and
              evidence.
            </p>
          </div>

          <FooterColumn title="Product" links={PRODUCT_LINKS} />
          <FooterColumn title="Platform" links={PLATFORM_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[8px] text-white/20">
            © {new Date().getFullYear()} Build OS. All rights reserved.
          </p>

          <p className="font-mono text-[8px] text-white/20">
            PEOPLE · PROJECTS · MONEY · EVIDENCE
          </p>
        </div>
      </div>
    </footer>
  )
}

/* =========================================================
   PAGE WRAPPER + HERO
========================================================= */

/** Header + main + footer wrapper used by every public page. */
export function PublicPage({ children }: { children: ReactNode }) {
  return (
    <PublicLayout>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </PublicLayout>
  )
}

/** Standard top-of-page section for inner public pages. */
export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
}: {
  eyebrow: string
  title: ReactNode
  description: string
  actions?: ReactNode
  aside?: ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-paper">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(22,87,255,0.07),transparent_32%),radial-gradient(circle_at_80%_30%,rgba(52,166,255,0.06),transparent_30%)]" />

      <div
        className={`mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-24 lg:pt-40 ${
          aside ? 'lg:grid-cols-[1.05fr_0.95fr]' : ''
        }`}
      >
        <div className="max-w-3xl">
          <SectionLabel>{eyebrow}</SectionLabel>

          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-ink/55 sm:text-lg sm:leading-8">
            {description}
          </p>

          {actions && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {actions}
            </div>
          )}
        </div>

        {aside}
      </div>
    </section>
  )
}

/* =========================================================
   SCROLL MANAGER
========================================================= */

/**
 * Handles scroll position on every navigation:
 *  - `/#section` scrolls smoothly to that element (works from any page)
 *  - any other navigation scrolls back to the top
 *
 * Mount once inside the router, next to <Routes>.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return undefined
    }

    const id = decodeURIComponent(hash.slice(1))
    let frame = 0
    let attempts = 0

    // The target may not be in the DOM yet right after a route change,
    // so retry for a few frames before giving up.
    const scrollToTarget = () => {
      const element = document.getElementById(id)

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      if (attempts < 30) {
        attempts += 1
        frame = requestAnimationFrame(scrollToTarget)
      }
    }

    frame = requestAnimationFrame(scrollToTarget)

    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])

  return null
}

/* =========================================================
   HOME PAGE  (route: /)
========================================================= */

/* =========================================================
   DATA
========================================================= */

const processSteps = [
  {
    number: '01',
    title: 'Define & verify',
    body: 'Establish the project scope, land, ownership, documentation, budget and execution requirements before work begins.',
    icon: FileCheck2,
  },
  {
    number: '02',
    title: 'Design & approve',
    body: 'Coordinate surveys, architecture, engineering, approvals and professional deliverables from one controlled record.',
    icon: Compass,
  },
  {
    number: '03',
    title: 'Bid & award',
    body: 'Compare verified contractors and professionals using price, capability, trust and project-specific requirements.',
    icon: Users,
  },
  {
    number: '04',
    title: 'Fund & control',
    body: 'Structure project funds into controlled wallets and connect financial releases to approved execution milestones.',
    icon: Wallet,
  },
  {
    number: '05',
    title: 'Build & monitor',
    body: 'Track construction, procurement, site activity, reports, evidence and milestone progress as work happens.',
    icon: HardHat,
  },
  {
    number: '06',
    title: 'Verify & handover',
    body: 'Close the project with verified evidence, documentation and a permanent Digital Property Passport.',
    icon: PackageCheck,
  },
]

const ecosystem = [
  {
    title: 'Clients & Investors',
    slug: 'clients',
    body: 'Define projects, fund controlled wallets, review bids, approve milestones and maintain visibility from anywhere.',
    icon: Building2,
    image: '/images/estate1.jpeg',
  },
  {
    title: 'Contractors',
    slug: 'contractors',
    body: 'Discover verified opportunities, submit structured bids, execute approved scopes and receive milestone payments.',
    icon: HardHat,
    image: '/images/Real5.jpeg',
  },
  {
    title: 'Professionals',
    slug: 'professionals',
    body: 'Architects, engineers and surveyors manage professional scopes, documents, inspections and deliverables.',
    icon: Award,
    image: '/images/interior2.jpeg',
  },
  {
    title: 'Suppliers',
    slug: 'suppliers',
    body: 'Respond to verified demand, quote against structured requests, deliver approved materials and document receipt.',
    icon: Boxes,
    image: '/images/Real4.jpeg',
  },
]

const controlFeatures = [
  {
    icon: UserCheck,
    eyebrow: '01 / PEOPLE',
    title: 'Verified participants',
    body: 'Identity, business and professional verification create a stronger foundation for every project relationship.',
  },
  {
    icon: FolderCheck,
    eyebrow: '02 / PROJECTS',
    title: 'Verified projects',
    body: 'Land, title, scope, budgets, permits and readiness are structured before execution moves forward.',
  },
  {
    icon: LockKeyhole,
    eyebrow: '03 / MONEY',
    title: 'Controlled funds',
    body: 'Project finances are organized around milestones, approvals, procurement and auditable payment events.',
  },
  {
    icon: ScanSearch,
    eyebrow: '04 / EVIDENCE',
    title: 'Evidence-backed execution',
    body: 'Reports, inspections, photos, documents and milestone evidence form a continuous project record.',
  },
  {
    icon: ShieldAlert,
    eyebrow: '05 / RISK',
    title: 'Risk & dispute controls',
    body: 'Issues can be surfaced, documented and routed through structured review instead of informal conversations.',
  },
  {
    icon: ScrollText,
    eyebrow: '06 / RECORD',
    title: 'Digital Property Passport',
    body: 'The project closes with a permanent record connecting property history, documentation and verified execution.',
  },
]

const walletLines: [string, string, string][] = [
  ['Materials', '₦21.8M', 'Reserved'],
  ['Labour', '₦18.2M', 'Controlled'],
  ['Professional', '₦7.4M', 'Verified'],
  ['Contingency', '₦4.0M', 'Available'],
]

const procurementItems: [string, string, string][] = [
  ['Cement — 42.5R', '120 bags', '₦1,020,000'],
  ['Reinforcement — Y16', '4.2 tons', '₦4,830,000'],
  ['Sharp sand', '18 trips', '₦540,000'],
  ['Granite', '15 trips', '₦780,000'],
]

const evidenceTimeline: [string, string][] = [
  ['09:42', 'Foundation milestone verified'],
  ['11:18', 'Engineer uploaded inspection report'],
  ['13:04', 'Material delivery confirmed on site'],
  ['15:26', 'Client approved payment release'],
]

const trustControls = [
  'KYC & business verification',
  'Project readiness assessment',
  'Structured contractor bidding',
  'Escrow & wallet controls',
  'Procurement verification',
  'Milestone approvals',
  'Site evidence & monitoring',
  'Dispute resolution',
  'Immutable audit trails',
  'Digital Property Passport',
]

const faqs = [
  {
    question: 'What is Build OS?',
    answer:
      'Build OS is a construction and property-development operating platform designed to connect people, projects, money, procurement and evidence into one controlled execution workflow.',
  },
  {
    question: 'Who is Build OS for?',
    answer:
      'Build OS is designed for clients, diaspora investors, developers, contractors, architects, engineers, surveyors, project managers, suppliers and other participants involved in property development.',
  },
  {
    question: 'How are project payments controlled?',
    answer:
      'Project funds can be structured into controlled financial workflows where releases are connected to defined milestones, approvals and supporting evidence rather than informal payment requests.',
  },
  {
    question: 'Can clients monitor projects remotely?',
    answer:
      'Yes. The platform is designed around centralized project records, milestone status, evidence, documents, financial activity and reporting so project stakeholders can maintain visibility without being physically present on site.',
  },
  {
    question: 'What happens when there is a dispute?',
    answer:
      'Disputed activity can be isolated and reviewed against the project agreement, milestone requirements and available evidence before a financial or execution decision is made.',
  },
  {
    question: 'What is the Digital Property Passport?',
    answer:
      'It is the permanent project record that brings together key property, construction, documentation, verification and handover information into one structured history.',
  },
]

const gallery = [
  {
    image: '/images/estate1.jpeg',
    eyebrow: 'PROPERTY',
    title: 'Plot 14, Guzape District',
    status: 'Handover',
  },
  {
    image: '/images/Real5.jpeg',
    eyebrow: 'EXECUTION',
    title: 'Foundation phase, Karsana',
    status: 'In progress',
  },
  {
    image: '/images/interior2.jpeg',
    eyebrow: 'FINISHING',
    title: 'Interior fit-out, Jabi',
    status: 'Finishing',
  },
]

const projectExperience = [
  { label: 'Documents', Icon: FileText },
  { label: 'Milestones', Icon: ClipboardCheck },
  { label: 'Evidence', Icon: ScanSearch },
  { label: 'Financial controls', Icon: Wallet },
]

const passportHighlights = [
  { label: 'Property identity', Icon: Landmark },
  { label: 'Project documents', Icon: FileText },
  { label: 'Verification history', Icon: BadgeCheck },
  { label: 'Milestone record', Icon: ClipboardCheck },
]

const procurementStages = [
  { label: 'Requested', done: true },
  { label: 'Quoted', done: true },
  { label: 'Reserved', done: true },
  { label: 'Delivered', done: false },
]

/* =========================================================
   HERO PRODUCT CARD
========================================================= */

function ProjectCommandCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-10 rounded-full bg-teal/10 blur-3xl" />

      <div className="relative rounded-[1.8rem] border border-white/70 bg-white/75 p-2 shadow-[0_50px_120px_-50px_rgba(11,18,32,0.45)] backdrop-blur-2xl">
        <div className="overflow-hidden rounded-[1.35rem] border border-ink/10 bg-paper">
          <div className="relative h-48 overflow-hidden">
            <img
              src="/images/estate2.jpeg"
              alt="Active construction project"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

            <div className="absolute left-4 top-4">
              <ProductBadge>Live project</ProductBadge>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/45">
                  Active project
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-white">
                  Plot 14, Guzape District
                </p>
              </div>

              <div className="rounded-full bg-white/90 px-2.5 py-1 font-mono text-[9px] font-semibold text-teal">
                67% COMPLETE
              </div>
            </div>
          </div>

          <div className="border-b border-ink/10 bg-white px-5 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-light">
                  <img
                    src="/images/BuildOs.png"
                    alt=""
                    className="h-5 w-5 object-contain"
                  />
                </div>

                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-ink/30">
                    Build OS
                  </p>
                  <p className="text-xs font-semibold text-ink">
                    Project Command Center
                  </p>
                </div>
              </div>

              <span className="flex items-center gap-1.5 rounded-full bg-teal-light px-2.5 py-1 font-mono text-[8px] font-semibold text-teal">
                <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                VERIFIED
              </span>
            </div>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-ink/5 bg-white p-4">
                <p className="text-[10px] text-ink/35">Controlled balance</p>
                <p className="mt-1.5 font-mono text-sm font-semibold text-ink">
                  ₦18.4M
                </p>
                <p className="mt-1 text-[9px] text-teal">Protected</p>
              </div>

              <div className="rounded-xl border border-ink/5 bg-white p-4">
                <p className="text-[10px] text-ink/35">Milestones</p>
                <p className="mt-1.5 font-mono text-sm font-semibold text-ink">
                  4 / 6
                </p>
                <p className="mt-1 text-[9px] text-teal">On track</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-ink/5 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink/35">
                  Execution progress
                </span>

                <span className="font-mono text-[10px] font-semibold text-teal">
                  67%
                </span>
              </div>

              <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-paper-2">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-teal to-sky-400" />
              </div>

              <div className="mt-3 flex justify-between text-[9px] text-ink/30">
                <span>Foundation</span>
                <span>Structure</span>
                <span>Finishing</span>
                <span>Handover</span>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {[
                ['Land title', 'Verified'],
                ['Building permit', 'Verified'],
                ['Foundation', 'Approved'],
              ].map(([label, status]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-xl border border-ink/5 bg-white px-3.5 py-3"
                >
                  <span className="text-xs text-ink/55">{label}</span>

                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-teal">
                    <CheckCircle2 size={12} />
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-ink/10 bg-white px-5 py-3">
            <span className="font-mono text-[8px] text-ink/25">
              BOS-2026-0417
            </span>

            <span className="flex items-center gap-1.5 font-mono text-[8px] font-semibold text-laterite">
              <Activity size={10} />
              LIVE RECORD
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-[9px] text-ink/30">
        One controlled record from land to handover.
      </p>
    </div>
  )
}

/* =========================================================
   HOME
========================================================= */

export function Home() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null)

  return (
    <PublicPage>
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative isolate min-h-[760px] overflow-hidden bg-paper">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0 -z-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(22,87,255,0.07),transparent_32%),radial-gradient(circle_at_80%_30%,rgba(52,166,255,0.06),transparent_30%)]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(11,18,32,1) 1px, transparent 1px), linear-gradient(90deg, rgba(11,18,32,1) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        {/* Architectural image, pushed to the right */}
        <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[58%] lg:block">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/images/estate5.jpeg"
              alt=""
              className="h-full w-full object-cover object-center opacity-[0.88]"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/80 via-[35%] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-paper/35 via-transparent to-paper/40" />
            <div className="absolute inset-0 bg-[#0B1220]/[0.08] mix-blend-multiply" />
          </div>
        </div>

        {/* Mobile image treatment */}
        <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[390px] w-full lg:hidden">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/images/estate5.jpeg"
              alt=""
              className="h-full w-full object-cover object-center opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-paper/10 via-paper/55 to-paper" />
          </div>
        </div>

        {/* Main content */}
        <div className="mx-auto flex min-h-[760px] max-w-7xl items-center px-6 pb-16 pt-28 sm:px-8 lg:px-10 lg:pb-20 lg:pt-32">
          <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
            {/* LEFT: headline */}
            <div className="relative z-10 max-w-3xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-ink/[0.09] bg-white/75 px-3.5 py-2 shadow-[0_8px_30px_rgba(11,18,32,0.05)] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
                </span>

                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/60">
                  The operating system for modern development
                </span>
              </div>

              <h1 className="max-w-[850px] text-[3.5rem] font-semibold leading-[0.98] tracking-[-0.055em] text-ink sm:text-[4.5rem] lg:text-[5.35rem] xl:text-[5.7rem]">
                Build with
                <span className="block bg-gradient-to-r from-[#1657FF] via-[#2478FF] to-[#34A6FF] bg-clip-text text-transparent">
                  confidence.
                </span>
              </h1>

              <p className="mt-7 max-w-[650px] text-base leading-7 text-ink/60 sm:text-lg sm:leading-8">
                From land and design to procurement, construction and handover,
                Build OS brings every stakeholder, document, naira and
                milestone into one intelligent control layer.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/join"
                  className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(11,18,32,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1657FF] hover:shadow-[0_18px_40px_rgba(22,87,255,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1657FF] focus-visible:ring-offset-2"
                >
                  Start a project
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>

                <Link
                  to="/#how-it-works"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-ink/[0.10] bg-white/65 px-6 py-3.5 text-sm font-semibold text-ink backdrop-blur-md transition-all duration-300 hover:border-ink/20 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1657FF] focus-visible:ring-offset-2"
                >
                  See how Build OS works
                </Link>
              </div>

              <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs font-medium text-ink/45">
                {[
                  'Verified participants',
                  'Milestone-controlled funds',
                  'Evidence-backed progress',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-teal/10 text-teal"
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT: floating product command center */}
            <div className="relative z-10 flex min-h-[470px] items-center justify-center lg:justify-end">
              <div className="absolute right-[5%] top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-[#1657FF]/10 blur-[90px]" />

              <div className="relative w-full max-w-[520px] lg:-mr-3 xl:-mr-8">
                {/* Floating label */}
                <div className="absolute -left-6 top-8 z-20 hidden -rotate-3 rounded-xl border border-white/70 bg-white/90 px-4 py-3 shadow-[0_20px_50px_rgba(11,18,32,0.12)] backdrop-blur-xl lg:block">
                  <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink/35">
                    Project health
                  </div>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-teal" />
                    <span className="text-sm font-semibold text-ink">
                      On track
                    </span>
                  </div>
                </div>

                {/* Main dashboard card */}
                <div className="relative overflow-hidden rounded-[26px] border border-white/70 bg-[#0B1220]/95 p-3 shadow-[0_35px_90px_rgba(11,18,32,0.28)] backdrop-blur-2xl">
                  <div className="flex h-10 items-center justify-between rounded-xl bg-white/[0.045] px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                    </div>

                    <div className="rounded-md bg-white/[0.05] px-3 py-1 text-[9px] font-medium tracking-wide text-white/30">
                      BUILD OS / PROJECT CONTROL
                    </div>

                    <div className="h-6 w-6 rounded-full bg-white/10" />
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/35">
                          Active project
                        </div>

                        <div className="mt-1.5 text-lg font-semibold tracking-tight text-white">
                          Eva Group Residence
                        </div>

                        <div className="mt-1 text-[10px] text-white/35">
                          Abuja · Residential Development
                        </div>
                      </div>

                      <div className="rounded-full border border-teal/20 bg-teal/10 px-2.5 py-1 text-[9px] font-semibold text-teal">
                        LIVE
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.035] p-4">
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-[9px] uppercase tracking-[0.14em] text-white/30">
                            Project progress
                          </div>

                          <div className="mt-1 text-3xl font-semibold tracking-[-0.04em] text-white">
                            68%
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-[9px] uppercase tracking-[0.14em] text-white/30">
                            Current stage
                          </div>

                          <div className="mt-1 text-xs font-semibold text-white/75">
                            Construction
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                        <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#1657FF] to-[#34A6FF]" />
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.035] p-4">
                        <div className="text-[9px] uppercase tracking-[0.14em] text-white/30">
                          Protected funds
                        </div>

                        <div className="mt-2 text-xl font-semibold tracking-tight text-white">
                          ₦25.0M
                        </div>

                        <div className="mt-1.5 flex items-center gap-1.5 text-[9px] text-teal">
                          <span aria-hidden="true">●</span>
                          Milestone controlled
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.035] p-4">
                        <div className="text-[9px] uppercase tracking-[0.14em] text-white/30">
                          Risk status
                        </div>

                        <div className="mt-2 text-xl font-semibold tracking-tight text-white">
                          Low
                        </div>

                        <div className="mt-1.5 text-[9px] text-white/35">
                          No critical exceptions
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 rounded-2xl border border-white/[0.06] bg-white/[0.035] p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/30">
                          Recent activity
                        </div>

                        <div className="text-[9px] text-white/25">Live</div>
                      </div>

                      <div className="mt-3 space-y-3">
                        <div className="flex items-center gap-3">
                          <div
                            aria-hidden="true"
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-[10px] text-teal"
                          >
                            ✓
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="truncate text-[10px] font-medium text-white/70">
                              Milestone evidence submitted
                            </div>
                            <div className="mt-0.5 text-[8px] text-white/25">
                              4 minutes ago
                            </div>
                          </div>

                          <span className="text-[9px] font-medium text-teal">
                            Review
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div
                            aria-hidden="true"
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#1657FF]/10 text-[10px] text-[#5C9BFF]"
                          >
                            ₦
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="truncate text-[10px] font-medium text-white/70">
                              Procurement request approved
                            </div>
                            <div className="mt-0.5 text-[8px] text-white/25">
                              18 minutes ago
                            </div>
                          </div>

                          <span className="text-[9px] font-medium text-white/30">
                            ₦1.8M
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating verification card */}
                <div className="absolute -bottom-7 -left-3 hidden w-[210px] rounded-2xl border border-white/80 bg-white/90 p-3.5 shadow-[0_20px_50px_rgba(11,18,32,0.14)] backdrop-blur-xl sm:block">
                  <div className="flex items-center gap-3">
                    <div
                      aria-hidden="true"
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal/10 text-sm font-bold text-teal"
                    >
                      ✓
                    </div>

                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-[0.13em] text-ink/30">
                        Verification
                      </div>

                      <div className="mt-0.5 text-xs font-semibold text-ink">
                        12 participants cleared
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating evidence card */}
                <div className="absolute -right-4 bottom-12 hidden w-[165px] rotate-2 rounded-2xl border border-white/70 bg-white/90 p-3 shadow-[0_20px_50px_rgba(11,18,32,0.14)] backdrop-blur-xl md:block">
                  <div className="text-[9px] font-bold uppercase tracking-[0.13em] text-ink/30">
                    Evidence
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-ink/5" />

                    <div>
                      <div className="text-[10px] font-semibold text-ink">
                        Site update
                      </div>
                      <div className="text-[8px] text-ink/35">
                        3 photos verified
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-paper to-transparent" />
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section
        id="how-it-works"
        className="scroll-mt-20 border-b border-line bg-white"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionHeading
            eyebrow="How Build OS works"
            title={
              <>
                One workflow.
                <br />
                <span className="text-ink/35">From land to handover.</span>
              </>
            }
            description="Every stage creates a controlled record that feeds the next stage of execution. Nothing important should disappear between conversations, spreadsheets and site visits."
          />

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="group relative overflow-hidden rounded-2xl border border-line bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:border-teal/20 hover:bg-white hover:shadow-[0_28px_60px_-38px_rgba(22,87,255,0.45)]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-semibold text-teal">
                    {step.number}
                  </span>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-ink/35 shadow-sm transition-colors group-hover:bg-teal-light group-hover:text-teal">
                    <step.icon size={17} />
                  </div>
                </div>

                <h3 className="mt-8 font-display text-lg font-semibold tracking-tight text-ink">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-ink/45">
                  {step.body}
                </p>

                <div className="mt-7 h-px w-8 bg-teal/40 transition-all duration-300 group-hover:w-16" />
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-ink/10 bg-paper p-5 sm:p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-teal shadow-sm">
                  <Workflow size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-ink">
                    Every stage feeds the next.
                  </p>
                  <p className="mt-1 text-xs text-ink/40">
                    One project record instead of disconnected tools.
                  </p>
                </div>
              </div>

              <ArrowRight size={18} className="hidden text-ink/20 md:block" />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ECOSYSTEM
      ===================================================== */}

      <section
        id="ecosystem"
        className="scroll-mt-20 border-b border-line bg-paper"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionHeading
            eyebrow="The Build OS ecosystem"
            title={
              <>
                Everyone needed to build.
                <br />
                <span className="text-ink/35">One operating layer.</span>
              </>
            }
            description="Clients, professionals, contractors, suppliers and project managers work from the same project record, the same requirements and the same controlled workflow."
          />

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {ecosystem.map((item, index) => (
              <Link
                key={item.slug}
                to={`/solutions/${item.slug}`}
                aria-label={`Explore the ${item.title} workflow`}
                className="group relative block min-h-[330px] overflow-hidden rounded-[1.5rem] border border-line bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1657FF] focus-visible:ring-offset-2"
              >
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-65 transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/5" />

                <div className="relative flex h-full min-h-[330px] flex-col justify-between p-6 sm:p-7">
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-md">
                      <item.icon size={18} />
                    </div>

                    <span className="font-mono text-[9px] text-white/35">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="max-w-md">
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-sky-300">
                      Build OS participant
                    </p>

                    <h3 className="mt-2 font-display text-xl font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-white/55">
                      {item.body}
                    </p>

                    <div className="mt-5 flex items-center gap-1.5 text-[10px] font-semibold text-white/70">
                      Explore workflow
                      <ArrowUpRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-14 border-t border-ink/10 pt-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/30">
              One project. Every participant.
            </p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {[
                'Property Owners',
                'Diaspora Investors',
                'Developers',
                'Contractors',
                'Architects',
                'Engineers',
                'Surveyors',
                'Project Managers',
                'Suppliers',
                'Financial Partners',
                'Institutions',
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-ink/10 bg-white px-3.5 py-2 text-xs text-ink/45"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROTECTION
      ===================================================== */}

      <section
        id="protection"
        className="scroll-mt-20 border-b border-line bg-white"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionHeading
            eyebrow="The protection layer"
            title={
              <>
                Everything behind your build.
                <br />
                <span className="text-ink/35">In one controlled system.</span>
              </>
            }
            description="Build OS is designed to create accountability across the people, project decisions, money, materials and evidence that determine whether a build succeeds."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {controlFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-line bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_28px_60px_-38px_rgba(22,87,255,0.35)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-light text-teal">
                  <feature.icon size={18} />
                </div>

                <p className="mt-6 font-mono text-[9px] font-semibold tracking-[0.15em] text-ink/25">
                  {feature.eyebrow}
                </p>

                <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-ink/45">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          PROJECT EXPERIENCE
      ===================================================== */}

      <section className="border-b border-white/5">
        <div className="navy-gradient">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="grid items-center gap-16 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="text-white">
                <SectionHeading
                  dark
                  eyebrow="Inside the project"
                  title={
                    <>
                      Your project should
                      <br />
                      <span className="text-white/30">
                        tell one clear story.
                      </span>
                    </>
                  }
                  description="From documents and drawings to milestones, financial activity and site evidence, Build OS is designed around one continuously updated project record."
                />

                <ul className="mt-8 space-y-3">
                  {projectExperience.map(({ label, Icon }) => (
                    <li
                      key={label}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
                    >
                      <Icon size={15} className="text-sky-300" />

                      <span className="text-sm text-white/65">{label}</span>

                      <CheckCircle2
                        size={13}
                        className="ml-auto text-white/20"
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <ProjectCommandCard />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINANCIAL CONTROL
      ===================================================== */}

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-light text-teal">
                <LockKeyhole size={18} />
              </div>

              <SectionHeading
                eyebrow="Financial control"
                title={
                  <>
                    Money follows evidence.
                    <br />
                    <span className="text-ink/35">Not instructions.</span>
                  </>
                }
                description="Controlled project wallets create a clearer relationship between budget, execution, approval and payment."
              />

              <ul className="mt-7 space-y-3">
                {[
                  'Milestone-based releases',
                  'Payment freezing on dispute',
                  'Partial acceptance',
                  'Refund controls',
                  'Procurement wallets',
                  'Immutable audit trail',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-ink/55"
                  >
                    <CheckCircle2 size={15} className="text-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.7rem] border border-line bg-white p-2 shadow-[0_30px_80px_-50px_rgba(11,18,32,0.35)]">
              <div className="rounded-[1.35rem] border border-line bg-ink p-6 sm:p-7">
                <div className="flex items-start justify-between border-b border-white/10 pb-6">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
                      Project wallet
                    </p>

                    <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-white">
                      ₦84,200,000
                    </p>

                    <p className="mt-1 text-xs text-white/30">
                      Protected project balance
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-ink">
                    <Wallet size={18} />
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  {walletLines.map(([label, amount, status]) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-white/50">
                        <CreditCard size={13} />
                      </div>

                      <div className="flex-1">
                        <p className="text-xs font-medium text-white/75">
                          {label}
                        </p>

                        <p className="mt-0.5 font-mono text-[9px] uppercase text-white/25">
                          {status}
                        </p>
                      </div>

                      <p className="font-mono text-xs text-white/65">
                        {amount}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3 rounded-xl border border-sky-300/10 bg-sky-300/10 p-4">
                  <ShieldCheck size={16} className="shrink-0 text-sky-300" />

                  <p className="text-[11px] leading-5 text-white/55">
                    Release requires approved evidence — not instruction alone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCUREMENT
      ===================================================== */}

      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <div className="overflow-hidden rounded-[1.5rem] border border-line">
                <img
                  src="/images/Real4.jpeg"
                  alt="Construction materials"
                  loading="lazy"
                  className="h-[360px] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  '/images/Real5.jpeg',
                  '/images/Real6.jpeg',
                  '/images/Real7.jpeg',
                ].map((src) => (
                  <div
                    key={src}
                    className="h-24 overflow-hidden rounded-xl border border-line"
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-light text-teal">
                <PackageCheck size={18} />
              </div>

              <SectionHeading
                eyebrow="Procurement"
                title={
                  <>
                    Materials controlled
                    <br />
                    <span className="text-ink/35">like capital.</span>
                  </>
                }
                description="Every material request can connect scope, quantity, supplier quotation, funding, delivery evidence and payment in one workflow."
              />

              <div className="mt-8 rounded-[1.5rem] border border-line bg-paper p-2">
                <div className="rounded-[1.15rem] border border-line bg-white p-5">
                  <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-ink/30">
                        Material request #0248
                      </p>

                      <p className="mt-1 font-display text-sm font-semibold text-ink">
                        Foundation phase
                      </p>
                    </div>

                    <span className="rounded-full bg-teal-light px-3 py-1 font-mono text-[8px] font-semibold text-teal">
                      APPROVED
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    {procurementItems.map(([name, quantity, price]) => (
                      <div
                        key={name}
                        className="flex items-center gap-3 rounded-xl border border-line bg-paper px-3.5 py-3"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-teal">
                          <PackageCheck size={14} />
                        </div>

                        <div className="flex-1">
                          <p className="text-xs font-medium text-ink">
                            {name}
                          </p>

                          <p className="mt-0.5 font-mono text-[9px] text-ink/30">
                            {quantity}
                          </p>
                        </div>

                        <p className="font-mono text-[10px] text-ink/50">
                          {price}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {procurementStages.map(({ label, done }) => (
                      <div
                        key={label}
                        className="rounded-xl border border-line bg-paper py-3 text-center"
                      >
                        <p className="font-mono text-[7px] uppercase tracking-wide text-ink/30">
                          {label}
                        </p>

                        <p
                          className={`mt-1 text-sm font-semibold ${
                            done ? 'text-teal' : 'text-ink/20'
                          }`}
                        >
                          {done ? '✓' : '—'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          EVIDENCE
      ===================================================== */}

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-laterite-light text-laterite">
                <ScanSearch size={18} />
              </div>

              <SectionHeading
                eyebrow="Evidence layer"
                title={
                  <>
                    Know what happened.
                    <br />
                    <span className="text-ink/35">When. Where. Who.</span>
                  </>
                }
                description="Reports, inspections, photos, material deliveries and milestone approvals become part of one continuous project timeline."
              />

              <div className="mt-7 flex gap-3">
                {[
                  '/images/Real5.jpeg',
                  '/images/Real6.jpeg',
                  '/images/Real7.jpeg',
                ].map((src, index) => (
                  <div
                    key={src}
                    className="h-20 w-20 overflow-hidden rounded-xl border border-line"
                  >
                    <img
                      src={src}
                      alt={`Site evidence photo ${index + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-line bg-white p-2 shadow-[0_30px_80px_-50px_rgba(11,18,32,0.25)]">
              <div className="rounded-[1.3rem] border border-line bg-paper p-6">
                <div className="flex items-center gap-3 border-b border-dashed border-ink/10 pb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white">
                    <ScanSearch size={17} />
                  </div>

                  <div>
                    <p className="font-display text-sm font-semibold text-ink">
                      Evidence timeline
                    </p>

                    <p className="font-mono text-[8px] text-ink/30">
                      Plot 14, Guzape District
                    </p>
                  </div>

                  <span className="ml-auto rounded-full bg-teal-light px-2.5 py-1 font-mono text-[8px] font-semibold text-teal">
                    LIVE
                  </span>
                </div>

                <div className="relative mt-7">
                  <div
                    aria-hidden="true"
                    className="absolute bottom-1 left-[5px] top-1 w-px bg-ink/10"
                  />

                  <ol className="space-y-7">
                  {evidenceTimeline.map(([time, event], index) => (
                    <li key={event} className="relative flex gap-4">
                      <div className="relative z-10 mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-white bg-teal shadow-[0_0_0_3px_rgba(22,87,255,0.1)]" />

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs font-medium text-ink">
                            {event}
                          </span>

                          <span className="font-mono text-[9px] text-ink/25">
                            {time}
                          </span>
                        </div>

                        <p className="mt-1 font-mono text-[8px] text-ink/25">
                          Evidence package #{118 + index}
                        </p>
                      </div>
                    </li>
                  ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROPERTY PASSPORT
      ===================================================== */}

      <section className="border-b border-white/5">
        <div className="navy-gradient">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <SectionHeading
                  dark
                  eyebrow="The permanent record"
                  title={
                    <>
                      Your build shouldn&apos;t
                      <br />
                      <span className="text-white/30">
                        disappear after handover.
                      </span>
                    </>
                  }
                  description="The Digital Property Passport brings the project's critical property, construction, documentation and verification history together into a lasting record."
                />

                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {passportHighlights.map(({ label, Icon }) => (
                    <li
                      key={label}
                      className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
                    >
                      <Icon size={16} className="text-sky-300" />

                      <p className="mt-3 text-xs font-medium text-white/65">
                        {label}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <div className="absolute -inset-8 rounded-full bg-sky-400/10 blur-3xl" />

                <div className="relative rounded-[1.6rem] border border-white/10 bg-white/[0.05] p-2 backdrop-blur-xl">
                  <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-5">
                      <div>
                        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/30">
                          Digital Property Passport
                        </p>

                        <p className="mt-2 font-display text-lg font-semibold text-white">
                          Plot 14 · Guzape
                        </p>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-ink">
                        <ShieldCheck size={17} />
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2">
                      {[
                        ['Land title', 'Verified'],
                        ['Survey', 'Verified'],
                        ['Design', 'Approved'],
                        ['Construction', 'Active'],
                        ['Payments', 'Controlled'],
                        ['Handover', 'Pending'],
                      ].map(([label, status]) => (
                        <div
                          key={label}
                          className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
                        >
                          <p className="text-[10px] text-white/30">{label}</p>

                          <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-white/70">
                            <CheckCircle2 size={12} className="text-sky-300" />
                            {status}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between rounded-xl border border-sky-300/10 bg-sky-300/[0.07] px-4 py-3">
                      <span className="font-mono text-[8px] text-white/30">
                        BOS-PASSPORT-0417
                      </span>

                      <span className="text-[9px] font-semibold text-sky-300">
                        VERIFIED RECORD
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROJECT GALLERY
      ===================================================== */}

      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="On the ground"
              title={
                <>
                  Real places.
                  <br />
                  <span className="text-ink/35">Real execution.</span>
                </>
              }
              description="Use project imagery to give the platform a physical presence — not just another collection of software screens."
            />

            <Link
              to="/projects"
              className="group flex items-center gap-2 text-xs font-semibold text-teal"
            >
              Explore projects
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-[1.35fr_0.8fr_0.8fr]">
            {gallery.map((item, index) => (
              <div
                key={item.title}
                className={`group relative overflow-hidden rounded-[1.5rem] ${
                  index === 0 ? 'min-h-[430px]' : 'min-h-[300px]'
                }`}
              >
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

                <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[8px] font-semibold text-ink backdrop-blur">
                  {item.status}
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/45">
                    {item.eyebrow}
                  </p>

                  <p className="mt-1 font-display text-lg font-semibold text-white">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TRUST
      ===================================================== */}

      <section className="border-b border-white/5">
        <div className="navy-gradient text-white">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
            <SectionHeading
              dark
              center
              eyebrow="Trust & governance"
              title={
                <>
                  The bridge between
                  <br />
                  <span className="text-white/30">promise and delivery.</span>
                </>
              }
              description="Construction becomes more accountable when agreements, money, execution and evidence are connected instead of scattered across informal channels."
            />

            <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
              {trustControls.map((control, index) => (
                <li
                  key={control}
                  className="flex items-center gap-3 bg-ink px-5 py-5"
                >
                  <span className="font-mono text-[8px] text-white/20">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="flex-1 text-xs text-white/60">
                    {control}
                  </span>

                  <CheckCircle2
                    size={13}
                    className="shrink-0 text-sky-300/60"
                  />
                </li>
              ))}
            </ul>

            <div className="mt-12 grid gap-3 md:grid-cols-4">
              {[
                ['Agreement', 'Signed'],
                ['Funds', 'Controlled'],
                ['Work', 'Verified'],
                ['Payment', 'Released'],
              ].map(([title, status], index) => (
                <div
                  key={title}
                  className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <p className="font-mono text-[8px] text-white/20">
                    0{index + 1}
                  </p>

                  <p className="mt-5 text-sm font-semibold text-white/80">
                    {title}
                  </p>

                  <p className="mt-1 text-xs text-sky-300">{status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}

      <section
        id="faq"
        className="scroll-mt-20 border-b border-line bg-paper"
      >
        <div className="mx-auto max-w-4xl px-5 py-20 sm:px-6 lg:py-28">
          <SectionHeading
            center
            eyebrow="Frequently asked"
            title={
              <>
                Clear answers.
                <br />
                <span className="text-ink/35">No construction jargon.</span>
              </>
            }
          />

          <div className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
            {faqs.map((faq, index) => {
              const open = faqOpen === index

              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    id={`faq-button-${index}`}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setFaqOpen(open ? null : index)}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1657FF] focus-visible:ring-offset-2"
                  >
                    <span className="text-sm font-semibold text-ink sm:text-base">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={17}
                      aria-hidden="true"
                      className={`shrink-0 text-ink/35 transition-transform ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {open && (
                    <div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-button-${index}`}
                      className="pb-5 pr-10"
                    >
                      <p className="text-sm leading-7 text-ink/50">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="relative overflow-hidden bg-paper">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-teal/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-6 lg:py-32">
          <ProductBadge>Ready when you are</ProductBadge>

          <h2 className="mt-6 font-display text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-ink sm:text-5xl lg:text-6xl">
            Build with visibility.
            <br />
            <span className="brand-gradient-text">Execute with confidence.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-ink/50 sm:text-base">
            Start your project with a verification layer designed to connect
            the people, money, decisions and evidence behind every build.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <PrimaryButton to="/join">Start a project</PrimaryButton>

            <SecondaryButton to="/register?role=professional">
              Join as a Professional
            </SecondaryButton>
          </div>

          <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[10px] text-ink/35">
            <li className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-teal" />
              Verification
            </li>

            <li className="flex items-center gap-1.5">
              <Wallet size={13} className="text-teal" />
              Financial controls
            </li>

            <li className="flex items-center gap-1.5">
              <ScanSearch size={13} className="text-teal" />
              Evidence
            </li>

            <li className="flex items-center gap-1.5">
              <ScrollText size={13} className="text-teal" />
              Property Passport
            </li>
          </ul>
        </div>
      </section>
    </PublicPage>
  )
}

/* =========================================================
   SOLUTIONS, PROJECTS, ABOUT, CONTACT, PRIVACY, TERMS
========================================================= */

/* =========================================================
   SOLUTIONS  (/solutions/:audience)
========================================================= */

type Solution = {
  slug: string
  name: string
  /** Role value understood by /register?role= */
  role: string
  icon: LucideIcon
  image: string
  headline: [string, string]
  intro: string
  journey: { title: string; body: string }[]
  workspace: string[]
  cta: string
}

const SOLUTIONS: Solution[] = [
  {
    slug: 'clients',
    name: 'Clients & Investors',
    role: 'client',
    icon: Building2,
    image: '/images/estate1.jpeg',
    headline: ['Own the project.', 'See every step.'],
    intro:
      'Define your project, fund controlled wallets, review bids, approve milestones and keep full visibility from anywhere.',
    journey: [
      {
        title: 'Define your project',
        body: 'Set the scope, land details, documents and budget so contractors bid against the same requirements.',
      },
      {
        title: 'Review verified bids',
        body: 'Compare contractors and professionals on price, capability and trust, side by side.',
      },
      {
        title: 'Fund controlled wallets',
        body: 'Money is held against milestones and only released when approved evidence supports the work.',
      },
      {
        title: 'Approve and receive your Passport',
        body: 'Sign off completed milestones and close with a permanent Digital Property Passport.',
      },
    ],
    workspace: [
      'Project and milestone tracking',
      'Escrow-protected project wallet',
      'Procurement oversight',
      'Reports and site evidence',
      'Structured dispute review',
      'Digital Property Passport',
    ],
    cta: 'Start a project',
  },
  {
    slug: 'contractors',
    name: 'Contractors',
    role: 'contractor',
    icon: HardHat,
    image: '/images/Real5.jpeg',
    headline: ['Win verified work.', 'Get paid on milestones.'],
    intro:
      'Discover verified opportunities, submit structured bids, execute approved scopes and receive milestone payments.',
    journey: [
      {
        title: 'Find projects',
        body: 'Browse verified projects with clear scope, budget and readiness information.',
      },
      {
        title: 'Submit a structured bid',
        body: 'Price against defined requirements instead of informal quotes and phone calls.',
      },
      {
        title: 'Deliver and document',
        body: 'Log progress, materials and site reports as work happens, building the evidence for each milestone.',
      },
      {
        title: 'Get paid on approval',
        body: 'When a milestone is approved, payment is released from the controlled project wallet.',
      },
    ],
    workspace: [
      'Available projects',
      'Bids and awards',
      'Milestone delivery',
      'Materials requests',
      'Site reports',
      'Payments and disputes',
    ],
    cta: 'Join as a contractor',
  },
  {
    slug: 'professionals',
    name: 'Professionals',
    role: 'professional',
    icon: Award,
    image: '/images/interior2.jpeg',
    headline: ['Your expertise.', 'One controlled record.'],
    intro:
      'Architects, engineers and surveyors manage professional scopes, documents, inspections and deliverables in one place.',
    journey: [
      {
        title: 'Receive invitations',
        body: 'Get invited to projects that match your discipline and credentials.',
      },
      {
        title: 'Send a proposal',
        body: 'Set out your scope, fee and timeline in a structured proposal.',
      },
      {
        title: 'Submit deliverables',
        body: 'Upload drawings, surveys, reports and approvals against the project record.',
      },
      {
        title: 'Receive payment',
        body: 'Fees are tied to approved deliverables, so the payment trail is clear for everyone.',
      },
    ],
    workspace: [
      'Project invitations',
      'Proposals',
      'Deliverables and documents',
      'Inspections',
      'Payments',
    ],
    cta: 'Join as a professional',
  },
  {
    slug: 'suppliers',
    name: 'Suppliers',
    role: 'market_place',
    icon: Boxes,
    image: '/images/Real4.jpeg',
    headline: ['Respond to real demand.', 'Deliver with proof.'],
    intro:
      'Respond to verified demand, quote against structured requests, deliver approved materials and document receipt.',
    journey: [
      {
        title: 'List your catalogue',
        body: 'Publish the materials and products you supply so projects can find you.',
      },
      {
        title: 'Quote on requests',
        body: 'Answer structured material requests with clear quantities and prices.',
      },
      {
        title: 'Fulfil orders',
        body: 'Confirm approved orders and schedule deliveries to site.',
      },
      {
        title: 'Confirm delivery, get paid',
        body: 'Delivery is documented on the project record, and payment follows confirmation.',
      },
    ],
    workspace: [
      'Catalogue',
      'Quotations',
      'Orders',
      'Deliveries',
      'Payments',
      'Disputes',
    ],
    cta: 'Join as a supplier',
  },
]

export function Solutions() {
  const { audience } = useParams<{ audience: string }>()
  const solution = SOLUTIONS.find((item) => item.slug === audience)

  if (!solution) {
    return <Navigate to="/solutions/clients" replace />
  }

  const Icon = solution.icon
  const registerPath = `/register?role=${solution.role}`

  return (
    <PublicPage>
      <PageHero
        eyebrow={solution.name}
        title={
          <>
            {solution.headline[0]}
            <br />
            <span className="text-ink/35">{solution.headline[1]}</span>
          </>
        }
        description={solution.intro}
        actions={
          <>
            <PrimaryButton to={registerPath}>{solution.cta}</PrimaryButton>
            <SecondaryButton to="/login">Log in</SecondaryButton>
          </>
        }
        aside={
          <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-ink">
            <img
              src={solution.image}
              alt=""
              className="h-[340px] w-full object-cover opacity-80 sm:h-[420px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-md">
                <Icon size={18} />
              </div>
              <p className="font-display text-lg font-semibold text-white">
                {solution.name}
              </p>
            </div>
          </div>
        }
      />

      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionHeading
            eyebrow="Your workflow"
            title={
              <>
                How it works
                <br />
                <span className="text-ink/35">for {solution.name}.</span>
              </>
            }
          />

          <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {solution.journey.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-line bg-paper p-7"
              >
                <span className="font-mono text-[10px] font-semibold text-teal">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 font-display text-lg font-semibold tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink/45">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionHeading
            eyebrow="Your workspace"
            title={
              <>
                Everything you need,
                <br />
                <span className="text-ink/35">in one place.</span>
              </>
            }
          />

          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {solution.workspace.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-4 text-sm text-ink/65"
              >
                <CheckCircle2 size={16} className="shrink-0 text-teal" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-14 border-t border-ink/10 pt-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/30">
              Other participants
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {SOLUTIONS.filter((item) => item.slug !== solution.slug).map(
                (item) => (
                  <Link
                    key={item.slug}
                    to={`/solutions/${item.slug}`}
                    className="rounded-full border border-ink/10 bg-white px-3.5 py-2 text-xs text-ink/55 transition-colors hover:border-teal/30 hover:text-ink"
                  >
                    {item.name}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-6 lg:py-28">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-ink/50 sm:text-base">
            Create your account and set up your Build OS workspace.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryButton to={registerPath}>{solution.cta}</PrimaryButton>
            <SecondaryButton to="/contact">Talk to us</SecondaryButton>
          </div>
        </div>
      </section>
    </PublicPage>
  )
}

/* =========================================================
   PROJECTS  (/projects)
========================================================= */

type ShowcaseProject = {
  image: string
  category: string
  title: string
  status: string
}

// Placeholder showcase content. Replace with real projects (or load from your API).
const SHOWCASE: ShowcaseProject[] = [
  {
    image: '/images/estate1.jpeg',
    category: 'Property',
    title: 'Plot 14, Guzape District',
    status: 'Handover',
  },
  {
    image: '/images/Real5.jpeg',
    category: 'Execution',
    title: 'Foundation phase, Karsana',
    status: 'In progress',
  },
  {
    image: '/images/interior2.jpeg',
    category: 'Finishing',
    title: 'Interior fit-out, Jabi',
    status: 'Finishing',
  },
  {
    image: '/images/estate2.jpeg',
    category: 'Property',
    title: 'Residential development, Abuja',
    status: 'In progress',
  },
  {
    image: '/images/Real4.jpeg',
    category: 'Procurement',
    title: 'Materials delivery, Foundation phase',
    status: 'Delivered',
  },
  {
    image: '/images/Real6.jpeg',
    category: 'Execution',
    title: 'Structural works, site review',
    status: 'In review',
  },
]

export function Projects() {
  return (
    <PublicPage>
      <PageHero
        eyebrow="On the ground"
        title={
          <>
            Real places.
            <br />
            <span className="text-ink/35">Real execution.</span>
          </>
        }
        description="A look at the kind of work Build OS is built to manage, from land and design to procurement, construction and handover."
        actions={
          <>
            <PrimaryButton>Start a project</PrimaryButton>
            <SecondaryButton to="/contact">Talk to us</SecondaryButton>
          </>
        }
      />

      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SHOWCASE.map((project) => (
              <li
                key={project.title}
                className="group relative min-h-[340px] overflow-hidden rounded-[1.5rem] border border-line bg-ink"
              >
                <img
                  src={project.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

                <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[8px] font-semibold text-ink backdrop-blur">
                  {project.status}
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/55">
                    {project.category}
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold text-white">
                    {project.title}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-xs text-ink/40">
            Sample projects shown for illustration.
          </p>
        </div>
      </section>
    </PublicPage>
  )
}

/* =========================================================
   ABOUT  (/about)
========================================================= */

const PILLARS = [
  {
    icon: UserCheck,
    title: 'People',
    body: 'Verified clients, contractors, professionals and suppliers, so every relationship starts from a stronger foundation.',
  },
  {
    icon: FolderCheck,
    title: 'Projects',
    body: 'Land, scope, budget, permits and readiness are structured before execution moves forward.',
  },
  {
    icon: LockKeyhole,
    title: 'Money',
    body: 'Project funds are organised around milestones and approvals, with an auditable payment trail.',
  },
  {
    icon: ScanSearch,
    title: 'Evidence',
    body: 'Reports, inspections, photos and documents form one continuous record of what happened, when and by whom.',
  },
]

export function About() {
  return (
    <PublicPage>
      <PageHero
        eyebrow="About Build OS"
        title={
          <>
            Construction should run on
            <br />
            <span className="text-ink/35">records, not guesswork.</span>
          </>
        }
        description="Build OS is a construction and property-development operating platform. It connects people, projects, money, procurement and evidence into one controlled workflow, from land to handover."
        actions={
          <>
            <PrimaryButton>Start a project</PrimaryButton>
            <SecondaryButton to="/contact">Contact us</SecondaryButton>
          </>
        }
      />

      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <SectionHeading
            eyebrow="The problem"
            title={
              <>
                Too much depends on
                <br />
                <span className="text-ink/35">informal channels.</span>
              </>
            }
          />

          <div className="space-y-5 text-sm leading-7 text-ink/55 sm:text-base">
            <p>
              Property projects often run on scattered messages, spreadsheets,
              verbal agreements and site visits. Payments get requested
              informally, progress is hard to verify, and owners who are far
              from the site have little visibility.
            </p>
            <p>
              Build OS replaces that with one structured record. Agreements,
              funds, execution and evidence are connected, so decisions are
              made against facts that everyone on the project can see.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionHeading
            eyebrow="What we connect"
            title={
              <>
                Four things decide
                <br />
                <span className="text-ink/35">whether a build succeeds.</span>
              </>
            }
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-line bg-white p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-light text-teal">
                  <pillar.icon size={18} />
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink/45">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-ink/50">
            Want the detail?{' '}
            <Link
              to="/#how-it-works"
              className="font-semibold text-teal underline-offset-4 hover:underline"
            >
              See how Build OS works
            </Link>
            .
          </p>
        </div>
      </section>
    </PublicPage>
  )
}

/* =========================================================
   CONTACT  (/contact)
========================================================= */

// TODO: replace with your real support address before launch.
const CONTACT_EMAIL = 'contact@your-domain.com'

const TOPICS = [
  'Starting a project',
  'Joining as a contractor or professional',
  'Supplier or marketplace',
  'Partnerships',
  'Something else',
] as const

type Field = 'name' | 'email' | 'message'
type Errors = Partial<Record<Field, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputClass =
  'mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-teal focus:ring-2 focus:ring-teal/20'

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState<string>(TOPICS[0])
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (): Errors => {
    const next: Errors = {}

    if (!name.trim()) next.name = 'Enter your name.'

    if (!email.trim()) next.email = 'Enter your email address.'
    else if (!EMAIL_PATTERN.test(email.trim()))
      next.email = 'Enter a valid email address, like name@example.com.'

    if (message.trim().length < 10)
      next.message = 'Write at least 10 characters so we can help.'

    return next
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    const subject = `Build OS enquiry: ${topic}`
    const body = `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`

    setSubmitted(true)
  }

  return (
    <PublicPage>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Talk to the
            <br />
            <span className="text-ink/35">Build OS team.</span>
          </>
        }
        description="Questions about starting a project, joining the platform or working together? Send us a message and we will get back to you."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-2xl px-5 py-20 sm:px-6 lg:py-28">
          {submitted ? (
            <div
              role="status"
              className="rounded-2xl border border-line bg-paper p-8"
            >
              <p className="font-display text-xl font-semibold text-ink">
                Your email app should be opening.
              </p>
              <p className="mt-2 text-sm leading-6 text-ink/55">
                Send the drafted message from there. If nothing opened, email us
                directly at{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-semibold text-teal underline-offset-4 hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-xs font-semibold text-ink hover:border-teal/30"
              >
                Write another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="text-sm font-medium text-ink">
                  Full name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className={`${inputClass} ${errors.name ? 'border-red-400' : 'border-ink/10'}`}
                />
                {errors.name && (
                  <p id="contact-name-error" className="mt-1.5 text-xs text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="text-sm font-medium text-ink">
                  Email address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className={`${inputClass} ${errors.email ? 'border-red-400' : 'border-ink/10'}`}
                />
                {errors.email && (
                  <p id="contact-email-error" className="mt-1.5 text-xs text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-topic" className="text-sm font-medium text-ink">
                  What is this about?
                </label>
                <select
                  id="contact-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className={`${inputClass} border-ink/10`}
                >
                  {TOPICS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="text-sm font-medium text-ink">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={`${inputClass} resize-y ${errors.message ? 'border-red-400' : 'border-ink/10'}`}
                />
                {errors.message && (
                  <p id="contact-message-error" className="mt-1.5 text-xs text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#1657FF] to-[#34A6FF] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-16px_rgba(22,87,255,0.75)] transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1657FF] focus-visible:ring-offset-2"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </section>
    </PublicPage>
  )
}

/* =========================================================
   PRIVACY + TERMS  (/privacy, /terms)
========================================================= */

// TODO: have a qualified lawyer review and finalise this text before launch.
const LAST_UPDATED = 'September 29, 2026'

type LegalSection = { heading: string; body: string[] }

function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string
  title: string
  intro: string
  sections: LegalSection[]
}) {
  return (
    <PublicPage>
      <PageHero eyebrow={eyebrow} title={title} description={intro} />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 lg:py-24">
          <p className="text-xs text-ink/40">Last updated: {LAST_UPDATED}</p>

          <div className="mt-8 space-y-10">
            {sections.map((section, index) => (
              <section key={section.heading}>
                <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
                  {index + 1}. {section.heading}
                </h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 text-sm leading-7 text-ink/60"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <p className="mt-14 border-t border-ink/10 pt-6 text-sm text-ink/50">
            Questions about this page? Please{' '}
            <Link
              to="/contact"
              className="font-semibold text-teal underline-offset-4 hover:underline"
            >
              contact us
            </Link>
            .
          </p>
        </div>
      </section>
    </PublicPage>
  )
}

export function Privacy() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      intro="How Build OS collects, uses and protects personal information."
      sections={[
        {
          heading: 'Information we collect',
          body: [
            'We collect information you give us directly, such as your name, contact details, business details, verification documents and project information. We also collect basic technical data, such as device, browser and usage information, when you use the platform.',
          ],
        },
        {
          heading: 'How we use information',
          body: [
            'We use information to provide and secure the platform, verify participants, operate project workflows, process payments, communicate with you and meet legal obligations.',
          ],
        },
        {
          heading: 'Sharing',
          body: [
            'Information is shared with other participants on a project only as needed for that project. We use service providers who process data on our behalf, and we may disclose information where the law requires it. We do not sell personal information.',
          ],
        },
        {
          heading: 'Security and retention',
          body: [
            'We use technical and organisational measures to protect your information. We keep it only as long as needed for the purposes above, including project, audit and legal record-keeping.',
          ],
        },
        {
          heading: 'Your rights',
          body: [
            'Subject to applicable data protection law, including the Nigeria Data Protection Act 2023, you may ask to access, correct or delete your personal information, or object to certain processing. Contact us to make a request.',
          ],
        },
      ]}
    />
  )
}

export function Terms() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of use"
      intro="The rules for using the Build OS platform."
      sections={[
        {
          heading: 'Using Build OS',
          body: [
            'By creating an account or using the platform you agree to these terms. You must give accurate information, keep your login details secure and use the platform only for lawful purposes.',
          ],
        },
        {
          heading: 'Accounts and verification',
          body: [
            'Some features require identity, business or professional verification. We may suspend or restrict accounts that fail verification or breach these terms.',
          ],
        },
        {
          heading: 'Projects, payments and milestones',
          body: [
            'Build OS provides tools to structure projects, hold funds against milestones and record evidence. Agreements between participants remain between those participants. Payment releases follow the milestone and approval rules set for each project.',
          ],
        },
        {
          heading: 'Disputes',
          body: [
            'If a participant raises a dispute, related payments may be held while the matter is reviewed against the project agreement and available evidence.',
          ],
        },
        {
          heading: 'Liability',
          body: [
            'To the extent the law allows, Build OS is not liable for indirect or consequential loss arising from use of the platform. Nothing in these terms limits liability that cannot be limited by law.',
          ],
        },
        {
          heading: 'Changes',
          body: [
            'We may update these terms from time to time. Continued use of the platform after an update means you accept the updated terms.',
          ],
        },
      ]}
    />
  )
}