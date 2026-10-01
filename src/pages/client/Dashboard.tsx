/* =============================================================================
 * src/pages/client/Dashboard.tsx
 *
 * Client workspace: overview, project detail, decisions, messages, updates.
 *
 * Exports (all imported by AppRoutes):
 *   ClientDashboard
 *   ClientProjectPage
 *   ClientDecisionsPage
 *   ClientMessagesPage
 *   ClientUpdatesPage
 *
 * Also exports CLIENT_ROUTES so other client pages can reuse the same paths.
 *
 * NAVIGATION RULES USED IN THIS FILE
 * ---------------------------------------------------------------------------
 * 1. Every path comes from CLIENT_ROUTES, and every CLIENT_ROUTES entry
 *    matches a <Route> in AppRoutes.tsx and a nav item in navByRole.client.
 * 2. Cards that hold *content* (a milestone, an update, a dispute, an evidence
 *    photo) open a detail panel that shows more information. The panel then
 *    offers a link to the full page where that makes sense.
 * 3. Cards that summarise a whole *area* (funds, decisions, projects) go to
 *    that area's page.
 * 4. Nothing links to the page it is already on.
 * ========================================================================== */

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'

import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Clock,
  FileBarChart,
  Gavel,
  Image as ImageIcon,
  MessageCircle,
  PackageSearch,
  Pencil,
  Plus,
  Send,
  Wallet,
  X,
} from 'lucide-react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import { DashboardLayout } from '@/layouts/DashboardLayout'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { ProjectCard } from '@/modules/projects/components/ProjectCard'
import { ProjectProgressChart } from '@/components/charts/ProjectProgressChart'
import { SkeletonCard } from '@/components/feedback/Skeleton'
import { useMockLoading } from '@/hooks/useMockLoading'
import { projects, disputes } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'
import { useProjectProfile } from '@/hooks/useProjectProfile'
import { deriveClientDashboardConfig } from '@/derive/clientDashboardConfig'

import {
  PROJECT_TYPES,
  PROPERTY_TYPES,
  COVERAGE_STATES,
  LAND_STATUS_OPTIONS,
  INVESTMENT_BANDS,
  PRIORITIES,
  getOptionLabel,
  getOptionLabels,
  getBandRange,
} from '@/data/projectOptions'

/* -------------------------------------------------------------------------- */
/* Routes: single source of truth (must match AppRoutes + navByRole.client)   */
/* -------------------------------------------------------------------------- */

export const CLIENT_ROUTES = {
  overview: '/app/client',
  projects: '/app/client/projects',
  newProject: '/app/client/projects/new',
  project: (id: string | number) => `/app/client/projects/${id}`,
  editProject: (id: string | number) => `/app/client/projects/${id}/edit`,
  decisions: '/app/client/decisions',
  escrow: '/app/client/escrow',
  procurement: '/app/client/procurement',
  reports: '/app/client/reports',
  messages: '/app/client/messages',
  updates: '/app/client/updates',
  passport: '/app/client/passport',
  disputes: '/app/client/disputes',

  /* Project Studio = the questionnaire route in AppRoutes ("/onboarding"). */
  studio: '/onboarding',

  /* Backwards-compatible alias: "vault" was the old name for escrow. */
  vault: '/app/client/escrow',
} as const

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type Project = (typeof projects)[number]
type Dispute = (typeof disputes)[number]

type MilestoneStatus = 'complete' | 'current' | 'pending'
type UpdateKind = 'evidence' | 'approval' | 'document'
type ActivityTone = 'complete' | 'current' | 'muted'

interface Milestone {
  id: string
  label: string
  status: MilestoneStatus
  amount: number
  phase: string
  inspector: string
  summary: string
  deliverables: string[]
  date?: string
  due?: string
  evidenceCount?: number
}

interface UpdateEntry {
  id: string
  text: string
  meta: string
  detail: string
  tone: ActivityTone
  kind: UpdateKind
}

interface ChatMessage {
  id: string
  from: 'client' | 'contractor'
  author: string
  text: string
  time: string
}

/* -------------------------------------------------------------------------- */
/* Static mock content                                                        */
/* -------------------------------------------------------------------------- */

const PROJECT_IMAGES = [
  '/images/estate1.jpeg',
  '/images/estate2.jpeg',
  '/images/estate3.jpeg',
  '/images/estate4.jpeg',
  '/images/estate5.jpeg',
]

const EMPTY_ANSWERS = {} as Parameters<typeof deriveClientDashboardConfig>[0]

/* Amounts and inspector match the contractor's Project Center (total ₦25M). */
const MILESTONES: Milestone[] = [
  {
    id: 'foundation',
    label: 'Foundation',
    status: 'complete',
    amount: 4_500_000,
    date: '2 Jun',
    phase: 'Completed and released',
    inspector: 'Engr. Bala Yusuf',
    summary: 'Site set-out, excavation, footings and the ground-floor slab.',
    deliverables: [
      'Excavation to design depth',
      'Reinforcement inspection before the pour',
      'Concrete footings and ground slab cured',
    ],
  },
  {
    id: 'structure',
    label: 'Structure',
    status: 'complete',
    amount: 6_750_000,
    date: '12 Jun',
    phase: 'Completed and released',
    inspector: 'Engr. Bala Yusuf',
    summary: 'Columns, beams, block work and upper-floor slab.',
    deliverables: [
      'Columns and beams cast and cured',
      'Block work to roof level',
      'Upper-floor slab inspected',
    ],
  },
  {
    id: 'roofing',
    label: 'Roofing',
    status: 'current',
    amount: 4_500_000,
    due: '26 Jun',
    evidenceCount: 9,
    phase: 'Evidence submitted, awaiting your review',
    inspector: 'Engr. Bala Yusuf',
    summary: 'Roof structure, waterproofing, roof covering and drainage.',
    deliverables: [
      'Roof trusses fixed and braced',
      'Waterproofing layer applied',
      'Roof covering and gutters installed',
    ],
  },
  {
    id: 'mep',
    label: 'Electrical/Plumbing',
    status: 'pending',
    amount: 3_750_000,
    due: '18 Jul',
    phase: 'Starts once roofing is approved',
    inspector: 'Engr. Bala Yusuf',
    summary: 'First-fix electrical and plumbing, conduits, pipework and testing.',
    deliverables: [
      'Conduit and cable first-fix',
      'Water supply and drainage pipework',
      'Pressure and continuity tests',
    ],
  },
  {
    id: 'finishing',
    label: 'Finishing',
    status: 'pending',
    amount: 3_750_000,
    phase: 'Not started',
    inspector: 'Engr. Bala Yusuf',
    summary: 'Plastering, tiling, painting, fittings and fixtures.',
    deliverables: [
      'Plastering and screeding',
      'Tiling, joinery and painting',
      'Fixtures and fittings installed',
    ],
  },
  {
    id: 'handover',
    label: 'Handover',
    status: 'pending',
    amount: 1_750_000,
    phase: 'Not started',
    inspector: 'Engr. Bala Yusuf',
    summary: 'Final inspection, snagging and handover of documents.',
    deliverables: [
      'Snagging list closed out',
      'Final inspection signed off',
      'Handover pack added to your Property Passport',
    ],
  },
]

const UPDATES: UpdateEntry[] = [
  {
    id: 'u1',
    text: 'Roofing evidence uploaded: 9 photos awaiting your review.',
    meta: 'Grace Aliyu · Supervisor · Adeyemi 5-Bedroom Duplex · 20 Jun',
    detail:
      'Your supervisor uploaded 9 photos covering the roof structure, waterproofing and covering. Nothing is released until you approve.',
    tone: 'current',
    kind: 'evidence',
  },
  {
    id: 'u2',
    text: 'Structure milestone approved. ₦6.75M released to contractor.',
    meta: 'You · Approved · Adeyemi 5-Bedroom Duplex · 12 Jun',
    detail:
      'You approved the Structure milestone after the inspection by Engr. Bala Yusuf. The payment moved from escrow to the contractor.',
    tone: 'complete',
    kind: 'approval',
  },
  {
    id: 'u3',
    text: 'Foundation milestone approved. ₦4.5M released to contractor.',
    meta: 'You · Approved · Adeyemi 5-Bedroom Duplex · 2 Jun',
    detail:
      'You approved the Foundation milestone. The payment moved from escrow to the contractor.',
    tone: 'complete',
    kind: 'approval',
  },
  {
    id: 'u4',
    text: 'Site survey completed and shared to your documents.',
    meta: 'Engr. Bala Yusuf · Engineer · Adeyemi 5-Bedroom Duplex · 24 May',
    detail:
      'The site survey is saved in your Property Passport together with the other project documents.',
    tone: 'muted',
    kind: 'document',
  },
]

/* Where each kind of update should take you when you want the full record. */
const UPDATE_ACTION: Record<UpdateKind, { label: string; to: string }> = {
  evidence: { label: 'Review evidence', to: CLIENT_ROUTES.decisions },
  approval: { label: 'View escrow record', to: CLIENT_ROUTES.escrow },
  document: { label: 'Open Property Passport', to: CLIENT_ROUTES.passport },
}

const EVIDENCE_CAPTIONS = [
  'Roof trusses, north elevation',
  'Roof trusses, south elevation',
  'Truss bracing and fixings',
  'Waterproofing layer, main roof',
  'Waterproofing layer, upper terrace',
  'Roof covering, front slope',
  'Roof covering, rear slope',
  'Gutters and downpipes',
  'Completed roof from the street',
]

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    from: 'contractor',
    author: 'Site contractor',
    text: 'Good morning. Roofing is complete and the evidence has been uploaded for your review.',
    time: '09:12',
  },
  {
    id: 'm2',
    from: 'client',
    author: 'You',
    text: 'Thanks. I will go through the photos today.',
    time: '09:40',
  },
  {
    id: 'm3',
    from: 'contractor',
    author: 'Site contractor',
    text: 'Electrical and plumbing first-fix starts as soon as the roofing milestone is approved.',
    time: '09:44',
  },
]

const ACTIVITY_DOT: Record<ActivityTone, string> = {
  complete: 'bg-[#12613E]',
  current: 'bg-[#B85C12]',
  muted: 'bg-ink/25',
}

const STATUS_PILL: Record<MilestoneStatus, { label: string; cls: string }> = {
  complete: { label: 'Released', cls: 'bg-[#EAF4EE] text-[#12613E]' },
  current: { label: 'Under review', cls: 'bg-[#F5E8DD] text-[#B85C12]' },
  pending: { label: 'Upcoming', cls: 'bg-ink/[0.06] text-ink/50' },
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function formatNaira(value: number): string {
  const safe = Number.isFinite(value) ? value : 0

  if (Math.abs(safe) >= 1_000_000) {
    return `₦${Number((safe / 1_000_000).toFixed(2))}M`
  }

  return `₦${safe.toLocaleString('en-NG')}`
}

function clampPercent(value: unknown): number {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n)) return 0
  return Math.min(100, Math.max(0, Math.round(n)))
}

function getGreeting(date = new Date()): string {
  const hour = date.getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

function getProjectLocation(project: Project): string {
  const raw = (project as unknown as Record<string, unknown>).location
  return typeof raw === 'string' && raw.trim() ? raw : 'Abuja, FCT'
}

function humanize(value: unknown): string {
  return String(value ?? '').replace(/_/g, ' ')
}

const releasedTotal = MILESTONES.filter((m) => m.status === 'complete').reduce(
  (sum, m) => sum + m.amount,
  0,
)

const inReviewTotal = MILESTONES.filter((m) => m.status === 'current').reduce(
  (sum, m) => sum + m.amount,
  0,
)

const contractValue = MILESTONES.reduce((sum, m) => sum + m.amount, 0)

const currentMilestone = MILESTONES.find((m) => m.status === 'current')

/* -------------------------------------------------------------------------- */
/* Shared client data                                                         */
/* -------------------------------------------------------------------------- */

function useClientData() {
  const { user } = useAuth()
  const fullName: string = user?.fullName ?? ''

  const { data, isLoading } = useMockLoading(() => {
    const myProjects = projects.filter((p) => p.clientName === fullName)

    return {
      myProjects,
      totalEscrow: myProjects.reduce((s, p) => s + (p.escrowBalance ?? 0), 0),
      pendingApprovals: myProjects.reduce(
        (s, p) => s + (p.pendingApprovals ?? 0),
        0,
      ),
    }
  })

  return { fullName, data, isLoading }
}

/* -------------------------------------------------------------------------- */
/* Shared styles                                                              */
/* -------------------------------------------------------------------------- */

const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-[#B85C12]/40 focus-visible:ring-offset-2'

const btnLight = `inline-flex items-center justify-center gap-2 rounded-full border border-ink/[0.10] bg-white px-4 py-2.5 text-xs font-semibold text-ink transition hover:border-ink/20 hover:shadow-sm ${focusRing}`

const btnWhite = `inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-ink transition hover:bg-white/90 ${focusRing}`

const btnDark = `flex w-full items-center justify-between rounded-xl bg-ink px-4 py-3 text-xs font-semibold text-white transition hover:opacity-90 ${focusRing}`

const btnAmber = `inline-flex items-center justify-center gap-2 rounded-full bg-[#B85C12] px-5 py-2.5 text-xs font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`

const textLinkAmber = `inline-flex items-center gap-1 text-xs font-semibold text-[#B85C12] hover:underline ${focusRing}`

const cardHover =
  'transition hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(20,40,30,0.07)]'

/* -------------------------------------------------------------------------- */
/* Small UI components                                                        */
/* -------------------------------------------------------------------------- */

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
      {children}
    </p>
  )
}

function Meter({
  percent,
  color = 'bg-[#12613E]',
}: {
  percent: number
  color?: string
}) {
  const value = clampPercent(percent)

  return (
    <div
      className="h-2 overflow-hidden rounded-full bg-ink/[0.07]"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

/**
 * Makes a whole visual card clickable without nesting anchors.
 *
 * - Clicks on inner links/buttons keep working normally.
 * - `overrideLinks` forces every inner <a> to go to `to` instead. Use it around
 *   components we don't control (e.g. ProjectCard) whose own links may point
 *   somewhere unexpected.
 */
function ClickableSurface({
  to,
  children,
  className = '',
  ariaLabel,
  overrideLinks = false,
}: {
  to: string
  children: ReactNode
  className?: string
  ariaLabel: string
  overrideLinks?: boolean
}) {
  const navigate = useNavigate()
  const INTERACTIVE = 'a,button,input,textarea,select,[role="button"]'

  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!overrideLinks) return
    const anchor = (event.target as HTMLElement).closest('a')
    if (anchor && event.currentTarget.contains(anchor)) {
      event.preventDefault()
      event.stopPropagation()
      navigate(to)
    }
  }

  const handleClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest(INTERACTIVE)) return
    navigate(to)
  }

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    if ((event.target as HTMLElement).closest(INTERACTIVE)) return
    event.preventDefault()
    navigate(to)
  }

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label={ariaLabel}
      onClickCapture={handleClickCapture}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`${focusRing} cursor-pointer ${className}`}
    >
      {children}
    </div>
  )
}

function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-7">
      <Link
        to={CLIENT_ROUTES.overview}
        className={`mb-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-ink/50 hover:text-ink ${focusRing}`}
      >
        <ArrowLeft size={13} />
        Back to overview
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-1.5 font-display text-[28px] font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-[32px]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1.5 text-[13px] leading-5 text-ink/50">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
    </div>
  )
}

function EmptyPanel({
  icon,
  title,
  copy,
  action,
}: {
  icon: ReactNode
  title: string
  copy: string
  action?: ReactNode
}) {
  return (
    <Card>
      <CardBody className="flex flex-col items-center gap-2 py-12 text-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink/[0.05] text-ink/35">
          {icon}
        </div>
        <p className="mt-2 text-sm font-semibold text-ink">{title}</p>
        <p className="max-w-sm text-xs leading-5 text-ink/45">{copy}</p>
        {action && <div className="mt-3">{action}</div>}
      </CardBody>
    </Card>
  )
}

function LoadingGrid() {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      aria-label="Loading"
      aria-busy="true"
    >
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Detail panel (slide-over). Rendered in a portal so card hover transforms   */
/* can never break its fixed positioning.                                     */
/* -------------------------------------------------------------------------- */

function SidePanel({
  open,
  onClose,
  eyebrow,
  title,
  children,
  footer,
}: {
  open: boolean
  onClose: () => void
  eyebrow?: string
  title: string
  children: ReactNode
  footer?: ReactNode
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current()
    }

    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-ink/[0.07] px-5 py-5">
          <div className="min-w-0">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h2 className="mt-1 font-display text-xl font-semibold leading-tight text-ink">
              {title}
            </h2>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/[0.10] text-ink/60 transition hover:text-ink ${focusRing}`}
          >
            <X size={15} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>

        {footer && (
          <div className="flex flex-wrap gap-3 border-t border-ink/[0.07] px-5 py-4">
            {footer}
          </div>
        )}
      </aside>
    </div>,
    document.body,
  )
}

function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <dt className="text-[11px] text-ink/45">{label}</dt>
      <dd className="text-right text-[12px] font-semibold text-ink">{value}</dd>
    </div>
  )
}

/* ---- Milestone detail ---------------------------------------------------- */

function MilestoneDrawer({
  milestone,
  onClose,
}: {
  milestone: Milestone | null
  onClose: () => void
}) {
  if (!milestone) return null

  const pill = STATUS_PILL[milestone.status]

  const next =
    milestone.status === 'complete'
      ? `Approved${milestone.date ? ` on ${milestone.date}` : ''}. ${formatNaira(milestone.amount)} was released to the contractor from escrow.`
      : milestone.status === 'current'
        ? `Your contractor submitted ${milestone.evidenceCount ?? 0} photos. Review them, then approve to release ${formatNaira(milestone.amount)} or request changes. Funds stay in escrow until you decide.`
        : `This stage hasn't been submitted yet. ${formatNaira(milestone.amount)} stays protected in escrow until the work is verified and you approve it.`

  return (
    <SidePanel
      open
      onClose={onClose}
      eyebrow="Milestone"
      title={milestone.label}
      footer={
        <>
          {milestone.status === 'current' && (
            <Link to={CLIENT_ROUTES.decisions} className={btnAmber}>
              <ClipboardCheck size={14} />
              Review evidence
            </Link>
          )}

          {milestone.status === 'complete' && (
            <Link to={CLIENT_ROUTES.escrow} className={btnAmber}>
              <Wallet size={14} />
              View in escrow
            </Link>
          )}

          <Link to={CLIENT_ROUTES.messages} className={btnLight}>
            <MessageCircle size={14} />
            Message contractor
          </Link>
        </>
      }
    >
      <div className="flex items-center justify-between">
        <p className="font-display text-[28px] font-semibold tracking-[-0.03em] text-ink">
          {formatNaira(milestone.amount)}
        </p>

        <span
          className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] ${pill.cls}`}
        >
          {pill.label}
        </span>
      </div>

      <p className="mt-3 text-[12px] leading-5 text-ink/60">{milestone.summary}</p>

      <dl className="mt-5 divide-y divide-ink/[0.06] border-y border-ink/[0.06]">
        <DetailRow label="Stage" value={milestone.phase} />
        <DetailRow label="Inspector" value={milestone.inspector} />
        {milestone.date && <DetailRow label="Approved" value={milestone.date} />}
        {milestone.due && <DetailRow label="Due" value={milestone.due} />}
        {milestone.evidenceCount !== undefined && (
          <DetailRow
            label="Evidence"
            value={`${milestone.evidenceCount} photos`}
          />
        )}
        <DetailRow
          label="Share of contract"
          value={`${Math.round((milestone.amount / contractValue) * 100)}%`}
        />
      </dl>

      <h3 className="mt-6 text-[11px] font-bold uppercase tracking-[0.1em] text-ink/40">
        What this stage includes
      </h3>

      <ul className="mt-3 space-y-2.5">
        {milestone.deliverables.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[12px] text-ink/70">
            <CheckCircle2
              size={14}
              className={`mt-0.5 shrink-0 ${
                milestone.status === 'complete' ? 'text-[#12613E]' : 'text-ink/25'
              }`}
            />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-2xl bg-[#F4F6F3] p-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink/40">
          What happens next
        </p>
        <p className="mt-1.5 text-[12px] leading-5 text-ink/70">{next}</p>
      </div>
    </SidePanel>
  )
}

/** Returns an `open` function and the drawer element to render once. */
function useMilestoneDrawer() {
  const [active, setActive] = useState<Milestone | null>(null)

  const drawer = (
    <MilestoneDrawer milestone={active} onClose={() => setActive(null)} />
  )

  return { open: setActive, drawer }
}

/* ---- Update detail ------------------------------------------------------- */

function UpdateDrawer({
  entry,
  onClose,
}: {
  entry: UpdateEntry | null
  onClose: () => void
}) {
  if (!entry) return null

  const action = UPDATE_ACTION[entry.kind]
  const kindLabel =
    entry.kind === 'evidence'
      ? 'Evidence'
      : entry.kind === 'approval'
        ? 'Approval'
        : 'Document'

  return (
    <SidePanel
      open
      onClose={onClose}
      eyebrow={kindLabel}
      title="Update details"
      footer={
        <>
          <Link to={action.to} className={btnAmber}>
            {action.label}
            <ChevronRight size={13} />
          </Link>

          <Link to={CLIENT_ROUTES.messages} className={btnLight}>
            <MessageCircle size={14} />
            Ask a question
          </Link>
        </>
      }
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-2 h-2 w-2 shrink-0 rounded-full ${ACTIVITY_DOT[entry.tone]}`}
        />
        <p className="text-[14px] font-semibold leading-6 text-ink">{entry.text}</p>
      </div>

      <p className="mt-4 text-[12px] leading-5 text-ink/60">{entry.detail}</p>

      <div className="mt-5 rounded-2xl bg-[#F4F6F3] p-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink/40">
          Logged as
        </p>
        <p className="mt-1.5 text-[12px] leading-5 text-ink/70">{entry.meta}</p>
      </div>
    </SidePanel>
  )
}

function UpdateList({ entries }: { entries: UpdateEntry[] }) {
  const [selected, setSelected] = useState<UpdateEntry | null>(null)

  return (
    <>
      <ul className="flex flex-col gap-2">
        {entries.map((entry) => (
          <li key={entry.id}>
            <button
              type="button"
              onClick={() => setSelected(entry)}
              className={`group flex w-full items-start gap-3 rounded-2xl p-3 text-left transition hover:bg-ink/[0.025] ${focusRing}`}
            >
              <span
                className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${ACTIVITY_DOT[entry.tone]}`}
              />

              <div className="min-w-0 flex-1">
                <p className="text-[12px] leading-5 text-ink/75">{entry.text}</p>
                <p className="mt-0.5 text-[10px] leading-4 text-ink/40">
                  {entry.meta}
                </p>
              </div>

              <ChevronRight
                size={13}
                className="mt-1 shrink-0 text-ink/20 transition group-hover:translate-x-0.5 group-hover:text-[#B85C12]"
              />
            </button>
          </li>
        ))}
      </ul>

      <UpdateDrawer entry={selected} onClose={() => setSelected(null)} />
    </>
  )
}

/* ---- Dispute detail ------------------------------------------------------ */

function DisputeDrawer({
  dispute,
  onClose,
}: {
  dispute: Dispute | null
  onClose: () => void
}) {
  if (!dispute) return null

  return (
    <SidePanel
      open
      onClose={onClose}
      eyebrow="Issue or dispute"
      title={String(dispute.category)}
      footer={
        <>
          <Link to={CLIENT_ROUTES.disputes} className={btnAmber}>
            <Gavel size={14} />
            Open disputes centre
          </Link>

          <Link to={CLIENT_ROUTES.messages} className={btnLight}>
            <MessageCircle size={14} />
            Message contractor
          </Link>
        </>
      }
    >
      <p className="font-display text-[28px] font-semibold tracking-[-0.03em] text-ink">
        {formatNaira(dispute.amount)}
      </p>
      <p className="mt-1 text-[11px] text-ink/45">Amount in dispute</p>

      <dl className="mt-5 divide-y divide-ink/[0.06] border-y border-ink/[0.06]">
        <DetailRow label="Category" value={String(dispute.category)} />
        <DetailRow label="Status" value={humanize(dispute.status)} />
        <DetailRow label="Raised with" value={String(dispute.respondent)} />
      </dl>

      <div className="mt-6 rounded-2xl bg-[#F4F6F3] p-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink/40">
          What happens next
        </p>
        <p className="mt-1.5 text-[12px] leading-5 text-ink/70">
          Disputed funds stay in escrow while the Build OS team reviews the
          evidence from both sides. You will be notified of every step, and you
          can add information from the disputes centre.
        </p>
      </div>
    </SidePanel>
  )
}

/* ---- Evidence photo viewer ---------------------------------------------- */

function EvidenceViewer({
  index,
  total,
  label,
  onChange,
  onClose,
}: {
  index: number | null
  total: number
  label: string
  onChange: (next: number) => void
  onClose: () => void
}) {
  if (index === null) return null

  return (
    <SidePanel
      open
      onClose={onClose}
      eyebrow={`${label} evidence`}
      title={`Photo ${index + 1} of ${total}`}
      footer={
        <>
          <button
            type="button"
            onClick={() => onChange((index - 1 + total) % total)}
            className={btnLight}
          >
            <ChevronLeft size={14} />
            Previous
          </button>

          <button
            type="button"
            onClick={() => onChange((index + 1) % total)}
            className={btnLight}
          >
            Next
            <ChevronRight size={14} />
          </button>

          <button type="button" onClick={onClose} className={btnAmber}>
            Back to decision
          </button>
        </>
      }
    >
      <div className="overflow-hidden rounded-2xl bg-[#18271F]">
        <img
          src={PROJECT_IMAGES[index % PROJECT_IMAGES.length]}
          alt={EVIDENCE_CAPTIONS[index] ?? `Evidence photo ${index + 1}`}
          className="aspect-[4/3] w-full object-cover"
        />
      </div>

      <p className="mt-4 text-[14px] font-semibold text-ink">
        {EVIDENCE_CAPTIONS[index] ?? `Evidence photo ${index + 1}`}
      </p>

      <dl className="mt-3 divide-y divide-ink/[0.06] border-y border-ink/[0.06]">
        <DetailRow label="Uploaded by" value="Grace Aliyu (Supervisor)" />
        <DetailRow label="Uploaded" value="20 Jun" />
        <DetailRow label="Milestone" value={label} />
      </dl>
    </SidePanel>
  )
}

/* ---- Milestone stepper --------------------------------------------------- */

function MilestoneStepper({
  milestones,
  onSelect,
}: {
  milestones: Milestone[]
  onSelect: (milestone: Milestone) => void
}) {
  return (
    <div className="overflow-x-auto pb-1">
      <ol className="flex min-w-max items-center">
        {milestones.map((milestone, index) => (
          <li key={milestone.id} className="flex items-center">
            <button
              type="button"
              onClick={() => onSelect(milestone)}
              aria-label={`${milestone.label}: view milestone details`}
              className={`flex flex-col items-center gap-2 rounded-xl px-1 py-1 transition hover:bg-ink/[0.03] ${focusRing}`}
            >
              <div
                className={[
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-[10px] font-bold',
                  milestone.status === 'complete'
                    ? 'border-[#12613E] bg-[#12613E] text-white'
                    : milestone.status === 'current'
                      ? 'border-[#B85C12] bg-[#F8EEE6] text-[#B85C12]'
                      : 'border-ink/15 bg-white text-ink/30',
                ].join(' ')}
              >
                {milestone.status === 'complete' ? (
                  <Check size={14} />
                ) : milestone.status === 'current' ? (
                  <Clock size={13} />
                ) : (
                  index + 1
                )}
              </div>

              <span
                className={[
                  'w-[92px] text-center text-[10px] font-semibold leading-tight',
                  milestone.status === 'pending' ? 'text-ink/35' : 'text-ink/70',
                ].join(' ')}
              >
                {milestone.label}
              </span>
            </button>

            {index < milestones.length - 1 && (
              <div
                className={[
                  'mb-5 h-[2px] w-6 sm:w-10',
                  milestone.status === 'complete' ? 'bg-[#12613E]' : 'bg-ink/10',
                ].join(' ')}
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ========================================================================== */
/* 1. CLIENT DASHBOARD                                                        */
/* ========================================================================== */

const QUICK_ACCESS = [
  {
    label: 'Procurement',
    copy: 'Materials, quotations and orders for your build.',
    to: CLIENT_ROUTES.procurement,
    icon: PackageSearch,
  },
  {
    label: 'Reports',
    copy: 'Progress, cost and inspection reports.',
    to: CLIENT_ROUTES.reports,
    icon: FileBarChart,
  },
  {
    label: 'Property Passport',
    copy: 'Verified documents and history for your property.',
    to: CLIENT_ROUTES.passport,
    icon: BadgeCheck,
  },
  {
    label: 'Messages',
    copy: 'Talk to your contractor and supervisor.',
    to: CLIENT_ROUTES.messages,
    icon: MessageCircle,
  },
] as const

export function ClientDashboard() {
  const { fullName, data, isLoading } = useClientData()
  const profile = useProjectProfile()
  const milestoneDrawer = useMilestoneDrawer()
  const [activeDispute, setActiveDispute] = useState<Dispute | null>(null)

  const answers = (
    profile as unknown as {
      answers?: Parameters<typeof deriveClientDashboardConfig>[0]
    }
  ).answers

  const config = useMemo(
    () => deriveClientDashboardConfig(answers ?? EMPTY_ANSWERS),
    [answers],
  )

  const profileTags = [
    getOptionLabel(PROJECT_TYPES, profile.get('projectType')),
    getOptionLabel(PROPERTY_TYPES, profile.get('propertyType')),
    getOptionLabel(COVERAGE_STATES, profile.get('location')),
    getOptionLabel(LAND_STATUS_OPTIONS, profile.get('landStatus')),
    getBandRange(INVESTMENT_BANDS, profile.get('budget')),
    ...getOptionLabels(PRIORITIES, profile.get<string[]>('priorities', [])),
  ].filter((tag): tag is string => Boolean(tag))

  const firstName = fullName.trim().split(/\s+/)[0] || 'there'
  const featured = data?.myProjects[0]
  const featuredProgress = clampPercent(featured?.progressPercent)
  const protectedTotal = data?.totalEscrow ?? 0

  const protectedShare = clampPercent(
    protectedTotal + releasedTotal > 0
      ? (protectedTotal / (protectedTotal + releasedTotal)) * 100
      : 0,
  )

  const pending = data?.pendingApprovals ?? 0

  return (
    <DashboardLayout title="Client Overview">
      {/* Header */}
      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">
              Private client workspace
            </p>
          </div>

          <h1 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[34px]">
            {getGreeting()}, {firstName}
          </h1>

          <p className="mt-1.5 text-[13px] leading-5 text-ink/50">
            Here's the latest across your properties, funds and project
            decisions.
          </p>
        </div>

        <Link to={CLIENT_ROUTES.decisions} className={`${btnLight} w-fit`}>
          <ClipboardCheck size={14} />
          Review decisions
          {!isLoading && pending > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F5E8DD] px-1 text-[9px] font-bold text-[#B85C12]">
              {pending}
            </span>
          )}
        </Link>
      </div>

      {/* Project profile */}
      {profile.hasProfile && (
        <section aria-label="Project profile" className="mb-7">
          <ClickableSurface
            to={CLIENT_ROUTES.studio}
            ariaLabel="Open Project Studio"
          >
            <Card className={cardHover}>
              <CardHeader
                title="Your project profile"
                subtitle="From your Project Studio answers"
              />

              <CardBody className="pt-4">
                {profileTags.length > 0 ? (
                  <>
                    <div className="flex flex-wrap gap-2">
                      {profileTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#F4F6F3] px-3 py-1.5 text-[11px] font-semibold text-ink/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className={`${textLinkAmber} mt-4`}>
                      Update your answers
                      <ChevronRight size={13} />
                    </span>
                  </>
                ) : (
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <p className="text-[12px] text-ink/45">
                      Complete your Project Studio profile to personalize this
                      dashboard.
                    </p>
                    <span className={textLinkAmber}>
                      Open Project Studio
                      <ChevronRight size={13} />
                    </span>
                  </div>
                )}
              </CardBody>
            </Card>
          </ClickableSurface>
        </section>
      )}

      {isLoading || !data ? (
        <LoadingGrid />
      ) : (
        <>
          {/* Vision */}
          {config.showVisionCard && config.visionImage && (
            <section aria-label="Your vision and current state" className="mb-7">
              <Card className="overflow-hidden">
                <CardHeader
                  title="Your vision, and where you are today"
                  subtitle={
                    config.visionLabel
                      ? `Building a ${config.visionLabel.toLowerCase()}`
                      : undefined
                  }
                />

                <CardBody className="pt-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <ClickableSurface
                      to={CLIENT_ROUTES.studio}
                      ariaLabel="Open project vision in Project Studio"
                      className="group relative h-[220px] overflow-hidden rounded-[18px] bg-[#18271F]"
                    >
                      <img
                        src={config.visionImage}
                        alt={config.visionLabel ?? 'Your project vision'}
                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#12613E]">
                          The vision
                        </span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <p className="font-display text-[18px] font-semibold text-white">
                          {config.visionLabel}
                        </p>
                        <p className="mt-1 text-[11px] leading-4 text-white/65">
                          {config.nextStepTitle}
                        </p>
                      </div>
                    </ClickableSurface>

                    {featured ? (
                      <ClickableSurface
                        to={CLIENT_ROUTES.project(featured.id)}
                        ariaLabel={`Open ${featured.name}`}
                        className="group relative h-[220px] overflow-hidden rounded-[18px] bg-[#18271F]"
                      >
                        <img
                          src={PROJECT_IMAGES[0]}
                          alt="Current state of your build"
                          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                        <div className="absolute left-4 top-4">
                          <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#B85C12]">
                            Today
                          </span>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-5">
                          <p className="font-display text-[18px] font-semibold text-white">
                            {featuredProgress}% complete
                          </p>
                          <p className="mt-1 text-[11px] leading-4 text-white/65">
                            {featured.name}
                          </p>
                        </div>
                      </ClickableSurface>
                    ) : (
                      <ClickableSurface
                        to={CLIENT_ROUTES.newProject}
                        ariaLabel="Create your first project"
                        className="flex h-[220px] flex-col items-center justify-center gap-2 rounded-[18px] bg-[#F4F6F3] px-6 text-center transition hover:bg-[#ECEFEA]"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink/40">
                          <Plus size={17} />
                        </div>
                        <p className="text-[12.5px] font-semibold text-ink/70">
                          {config.nextStepTitle}
                        </p>
                        <p className="max-w-[220px] text-[11px] leading-5 text-ink/45">
                          {config.nextStepCopy}
                        </p>
                      </ClickableSurface>
                    )}
                  </div>
                </CardBody>
              </Card>
            </section>
          )}

          {/* Metrics */}
          <section
            aria-label="Client overview"
            className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4"
          >
            <Link
              to={CLIENT_ROUTES.projects}
              className={`block rounded-[20px] ${focusRing}`}
            >
              <StatCard
                label="Properties in progress"
                value={String(data.myProjects.length)}
                icon={Building2}
                tone="ink"
              />
            </Link>

            <Link
              to={CLIENT_ROUTES.escrow}
              className={`block rounded-[20px] ${focusRing}`}
            >
              <StatCard
                label="Capital protected"
                value={formatNaira(data.totalEscrow)}
                icon={Wallet}
                tone="teal"
                hint="Held until milestones are approved"
              />
            </Link>

            <Link
              to={CLIENT_ROUTES.decisions}
              className={`block rounded-[20px] ${focusRing}`}
            >
              <StatCard
                label="Awaiting your review"
                value={String(data.pendingApprovals)}
                icon={ClipboardCheck}
                tone="amber"
              />
            </Link>

            <Link
              to={CLIENT_ROUTES.disputes}
              className={`block rounded-[20px] ${focusRing}`}
            >
              <StatCard
                label="Active disputes"
                value={String(disputes.length)}
                icon={Gavel}
                tone="brick"
              />
            </Link>
          </section>

          {/* Featured project */}
          {featured && (
            <section
              aria-label="Featured property"
              className="mb-7 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.75fr)]"
            >
              <ClickableSurface
                to={CLIENT_ROUTES.project(featured.id)}
                ariaLabel={`Open ${featured.name}`}
                className="group relative min-h-[390px] overflow-hidden rounded-[24px] bg-[#18271F] shadow-[0_18px_50px_rgba(20,40,30,0.11)]"
              >
                <img
                  src={PROJECT_IMAGES[0]}
                  alt={`${featured.name}, featured property`}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                <div className="absolute left-5 top-5">
                  <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#12613E]">
                    Your active build
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                  <div className="mb-3 flex items-center gap-4 text-[11px] text-white/70">
                    <span>{getProjectLocation(featured)}</span>
                    <span className="h-3 w-px bg-white/30" />
                    <span>{featuredProgress}% complete</span>
                  </div>

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 className="max-w-xl font-display text-[27px] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[32px]">
                        {featured.name}
                      </h2>
                      <p className="mt-2 text-[12px] text-white/60">
                        Construction is progressing according to the current
                        milestone plan.
                      </p>
                    </div>

                    <span className={btnWhite}>
                      View project
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </ClickableSurface>

              {/* Funds */}
              <Card className="overflow-hidden">
                <div className="border-b border-ink/[0.07] px-5 py-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <Eyebrow>Capital overview</Eyebrow>
                      <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                        Your funds
                      </h3>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
                      <CircleDollarSign size={17} />
                    </div>
                  </div>
                </div>

                <CardBody className="flex h-full flex-col p-5">
                  <Link
                    to={CLIENT_ROUTES.escrow}
                    className={`block rounded-2xl ${focusRing}`}
                  >
                    <p className="text-[11px] text-ink/45">Currently protected</p>
                    <p className="mt-1 font-display text-[28px] font-semibold tracking-[-0.035em] text-ink">
                      {formatNaira(data.totalEscrow)}
                    </p>
                    <div className="mt-4">
                      <Meter percent={protectedShare} />
                    </div>
                    <div className="mt-2 flex justify-between text-[10px] text-ink/40">
                      <span>Protected funds</span>
                      <span>{protectedShare}%</span>
                    </div>
                  </Link>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Link
                      to={CLIENT_ROUTES.decisions}
                      className={`rounded-2xl bg-[#F4F6F3] p-4 transition hover:bg-[#ECEFEA] ${focusRing}`}
                    >
                      <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-ink/40">
                        In review
                      </p>
                      <p className="mt-1 font-display text-base font-semibold text-[#B85C12]">
                        {formatNaira(inReviewTotal)}
                      </p>
                    </Link>

                    <Link
                      to={CLIENT_ROUTES.escrow}
                      className={`rounded-2xl border border-ink/[0.07] p-4 transition hover:bg-ink/[0.025] ${focusRing}`}
                    >
                      <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-ink/40">
                        Released
                      </p>
                      <p className="mt-1 font-display text-base font-semibold text-ink">
                        {formatNaira(releasedTotal)}
                      </p>
                    </Link>
                  </div>

                  <Link to={CLIENT_ROUTES.escrow} className={`${btnDark} mt-6`}>
                    <span className="flex items-center gap-2">
                      <Wallet size={14} />
                      Open financial vault
                    </span>
                    <ChevronRight size={15} />
                  </Link>
                </CardBody>
              </Card>
            </section>
          )}

          {/* Build progress + updates */}
          {featured && config.showMilestoneTracker && (
            <section
              aria-label="Build progress and recent updates"
              className="mb-7 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)]"
            >
              <Card>
                <CardBody className="p-5 sm:p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <Eyebrow>{featured.name}</Eyebrow>
                      <h3 className="mt-1 font-display text-xl font-semibold text-ink">
                        Build progress
                      </h3>
                      <p className="mt-1 text-[12px] text-ink/50">
                        Select a stage to see what it includes, who inspects it
                        and what happens next.
                      </p>
                    </div>

                    <Link
                      to={CLIENT_ROUTES.messages}
                      className={`${btnLight} shrink-0`}
                    >
                      <MessageCircle size={14} />
                      Message contractor
                    </Link>
                  </div>

                  <div className="mt-7">
                    <MilestoneStepper
                      milestones={MILESTONES}
                      onSelect={milestoneDrawer.open}
                    />
                  </div>

                  <div className="mb-2 mt-6 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-ink/55">
                      Overall completion
                    </span>
                    <Link
                      to={CLIENT_ROUTES.project(featured.id)}
                      className="text-[11px] font-bold text-ink hover:text-[#B85C12]"
                    >
                      {featuredProgress}%
                    </Link>
                  </div>

                  <Link
                    to={CLIENT_ROUTES.project(featured.id)}
                    aria-label="Open project progress"
                    className={`block rounded-full ${focusRing}`}
                  >
                    <Meter percent={featuredProgress} color="bg-[#B85C12]" />
                  </Link>

                  {currentMilestone && (
                    <Link
                      to={CLIENT_ROUTES.decisions}
                      className={`mt-5 flex items-start gap-3 rounded-2xl border border-[#B85C12]/20 bg-[#F8EEE6] px-4 py-3 transition hover:border-[#B85C12]/40 ${focusRing}`}
                    >
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#B85C12]/15 text-[#B85C12]">
                        <Clock size={13} />
                      </div>
                      <p className="flex-1 text-[12px] leading-5 text-[#7A3F0C]">
                        <span className="font-semibold">Awaiting you:</span>{' '}
                        {currentMilestone.label.toLowerCase()} evidence has been
                        submitted for your review.
                      </p>
                      <ChevronRight
                        size={15}
                        className="mt-1 shrink-0 text-[#B85C12]"
                      />
                    </Link>
                  )}
                </CardBody>
              </Card>

              <Card>
                <div className="flex items-center justify-between border-b border-ink/[0.07] px-5 py-5">
                  <div>
                    <Eyebrow>Timeline</Eyebrow>
                    <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                      Recent updates
                    </h3>
                  </div>
                  <Link to={CLIENT_ROUTES.updates} className={textLinkAmber}>
                    View all
                  </Link>
                </div>

                <CardBody className="pt-4">
                  <UpdateList entries={UPDATES} />
                </CardBody>
              </Card>
            </section>
          )}

          {/* Getting started */}
          {featured && !config.showMilestoneTracker && profile.hasProfile && (
            <section aria-label="Getting started" className="mb-7">
              <ClickableSurface
                to={CLIENT_ROUTES.studio}
                ariaLabel="Continue in Project Studio"
              >
                <Card className={cardHover}>
                  <CardBody className="flex flex-col items-center gap-2 py-10 text-center">
                    <p className="text-sm font-semibold text-ink">
                      {config.nextStepTitle}
                    </p>
                    <p className="max-w-sm text-xs leading-5 text-ink/45">
                      {config.nextStepCopy}
                    </p>
                    <span className={`${textLinkAmber} mt-2`}>
                      Continue in Project Studio
                      <ChevronRight size={13} />
                    </span>
                  </CardBody>
                </Card>
              </ClickableSurface>
            </section>
          )}

          {/* Portfolio chart */}
          {data.myProjects.length > 0 && (
            <section className="mb-7" aria-label="Portfolio progress">
              <ClickableSurface
                to={CLIENT_ROUTES.projects}
                ariaLabel="Open all project progress"
              >
                <Card className={cardHover}>
                  <CardHeader
                    title="Portfolio progress"
                    subtitle="How each active build is tracking against its delivery plan"
                  />
                  <CardBody>
                    <ProjectProgressChart
                      data={data.myProjects.map((project) => ({
                        name: project.name,
                        progressPercent: project.progressPercent,
                      }))}
                    />
                    <div className="mt-4 flex items-center justify-end">
                      <span className={textLinkAmber}>
                        Open portfolio
                        <ChevronRight size={13} />
                      </span>
                    </div>
                  </CardBody>
                </Card>
              </ClickableSurface>
            </section>
          )}

          {/* Projects */}
          <section className="mb-7" aria-label="Project portfolio">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <Eyebrow>Portfolio</Eyebrow>
                <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em] text-ink">
                  Your properties
                </h2>
                <p className="mt-1 text-[11px] text-ink/45">
                  Track progress, milestones and contractor activity.
                </p>
              </div>

              <Link
                to={CLIENT_ROUTES.projects}
                className={`${textLinkAmber} shrink-0`}
              >
                View all projects
                <ChevronRight size={14} />
              </Link>
            </div>

            {data.myProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {data.myProjects.map((project) => (
                  <ClickableSurface
                    key={project.id}
                    to={CLIENT_ROUTES.project(project.id)}
                    ariaLabel={`Open ${project.name}`}
                    overrideLinks
                    className={`rounded-[20px] border border-ink/[0.07] bg-white p-1 ${cardHover}`}
                  >
                    <ProjectCard project={project} />

                    <div className="flex items-center justify-between border-t border-ink/[0.06] px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF4EE] text-[#12613E]">
                          <CheckCircle2 size={13} />
                        </div>
                        <span className="text-[10px] font-medium text-ink/45">
                          Milestone tracking active
                        </span>
                      </div>

                      <span
                        className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#B85C12]"
                        aria-hidden="true"
                      >
                        Open project
                        <ChevronRight size={12} />
                      </span>
                    </div>
                  </ClickableSurface>
                ))}
              </div>
            ) : (
              <ClickableSurface
                to={CLIENT_ROUTES.newProject}
                ariaLabel="Create a new project"
              >
                <EmptyPanel
                  icon={<Building2 size={19} />}
                  title="Your portfolio is empty"
                  copy="Create a project to start planning your property journey, or wait for a project to be assigned to your account."
                  action={
                    <span className={textLinkAmber}>
                      Create a project
                      <ChevronRight size={13} />
                    </span>
                  }
                />
              </ClickableSurface>
            )}
          </section>

          {/* Decisions + disputes */}
          <div className="mb-7 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.7fr)]">
            <ClickableSurface
              to={CLIENT_ROUTES.decisions}
              ariaLabel="Open decisions waiting for you"
            >
              <Card className={`h-full ${cardHover}`}>
                <CardHeader
                  title="Decisions waiting for you"
                  subtitle="Items that may need your approval"
                />

                <CardBody className="pt-4">
                  {data.pendingApprovals === 0 ? (
                    <div className="flex items-center gap-3 py-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
                        <CheckCircle2 size={17} />
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-ink">
                          Nothing waiting
                        </p>
                        <p className="mt-0.5 text-[11px] text-ink/45">
                          You're fully caught up with project approvals.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 rounded-2xl bg-[#F7F4EF] p-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F5E8DD] text-[#B85C12]">
                        <ClipboardCheck size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[12px] font-semibold text-ink">
                          {data.pendingApprovals} milestone
                          {data.pendingApprovals === 1 ? '' : 's'} require
                          {data.pendingApprovals === 1 ? 's' : ''} approval
                        </p>
                        <p className="mt-1 text-[10px] text-ink/45">
                          Review submitted evidence before funds can be
                          released.
                        </p>
                      </div>
                      <ChevronRight size={16} className="shrink-0 text-ink/30" />
                    </div>
                  )}
                </CardBody>
              </Card>
            </ClickableSurface>

            <Card className="h-full">
              <div className="flex items-start justify-between gap-3 border-b border-ink/[0.07] px-5 py-5">
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    Issues &amp; disputes
                  </h3>
                  <p className="mt-1 text-[11px] text-ink/45">
                    Select one to see the details
                  </p>
                </div>
                <Link to={CLIENT_ROUTES.disputes} className={textLinkAmber}>
                  View all
                </Link>
              </div>

              <CardBody className="pt-4">
                {disputes.length === 0 ? (
                  <div className="flex items-center gap-3 py-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
                      <CheckCircle2 size={15} />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-ink">
                        All clear
                      </p>
                      <p className="mt-0.5 text-[10px] text-ink/45">
                        No active disputes.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {disputes.slice(0, 3).map((dispute) => (
                      <button
                        key={dispute.id}
                        type="button"
                        onClick={() => setActiveDispute(dispute)}
                        aria-label={`View dispute: ${dispute.category}`}
                        className={`block w-full rounded-2xl border border-brick/10 bg-brick-light/30 p-4 text-left transition hover:border-brick/25 ${focusRing}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-[11px] font-bold text-brick">
                            {dispute.category}
                          </p>
                          <span className="rounded-lg bg-white/80 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-brick">
                            {humanize(dispute.status)}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[10px] text-ink/45">
                          With {dispute.respondent}
                        </p>
                        <p className="mt-2 font-display text-[14px] font-semibold text-ink">
                          {formatNaira(dispute.amount)}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          </div>

          {/* Quick access to the remaining workspace areas */}
          <section aria-label="Workspace shortcuts" className="mb-2">
            <div className="mb-4">
              <Eyebrow>Workspace</Eyebrow>
              <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em] text-ink">
                Everything else in your workspace
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {QUICK_ACCESS.map(({ label, copy, to, icon: Icon }) => (
                <Link
                  key={label}
                  to={to}
                  className={`group rounded-[20px] border border-ink/[0.07] bg-white p-5 ${cardHover} ${focusRing}`}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F4F6F3] text-ink/60 transition group-hover:bg-[#F5E8DD] group-hover:text-[#B85C12]">
                    <Icon size={16} />
                  </div>
                  <p className="mt-3 text-[13px] font-semibold text-ink">{label}</p>
                  <p className="mt-1 text-[11px] leading-4 text-ink/45">{copy}</p>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}

      {milestoneDrawer.drawer}
      <DisputeDrawer
        dispute={activeDispute}
        onClose={() => setActiveDispute(null)}
      />
    </DashboardLayout>
  )
}

/* ========================================================================== */
/* 2. PROJECT DETAIL                                                          */
/* ========================================================================== */

export function ClientProjectPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const { data, isLoading } = useClientData()
  const milestoneDrawer = useMilestoneDrawer()

  const projectIndex =
    data?.myProjects.findIndex((p) => String(p.id) === projectId) ?? -1

  const project = projectIndex >= 0 ? data?.myProjects[projectIndex] : undefined

  const image = PROJECT_IMAGES[Math.max(projectIndex, 0) % PROJECT_IMAGES.length]

  return (
    <DashboardLayout title={project?.name ?? 'Project'}>
      {isLoading || !data ? (
        <LoadingGrid />
      ) : !project ? (
        <>
          <PageHeader eyebrow="Project" title="Project not found" />

          <ClickableSurface
            to={CLIENT_ROUTES.projects}
            ariaLabel="Return to your properties"
          >
            <EmptyPanel
              icon={<Building2 size={19} />}
              title="We couldn't find that project"
              copy="It may have been removed, or it isn't assigned to your account."
              action={
                <span className={textLinkAmber}>
                  Back to your properties
                  <ChevronRight size={13} />
                </span>
              }
            />
          </ClickableSurface>
        </>
      ) : (
        <>
          <PageHeader
            eyebrow={getProjectLocation(project)}
            title={project.name}
            subtitle="Milestones, protected funds and contractor activity for this build."
            action={
              <div className="flex flex-wrap gap-2">
                <Link
                  to={CLIENT_ROUTES.editProject(project.id)}
                  className={btnLight}
                >
                  <Pencil size={14} />
                  Edit project
                </Link>

                <Link to={CLIENT_ROUTES.messages} className={btnAmber}>
                  <MessageCircle size={14} />
                  Message contractor
                </Link>
              </div>
            }
          />

          <section className="mb-7 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)]">
            {/* Hero: informational only, so it does not link back to itself */}
            <div className="relative min-h-[280px] overflow-hidden rounded-[24px] bg-[#18271F]">
              <img
                src={image}
                alt={project.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="font-display text-[26px] font-semibold text-white">
                  {clampPercent(project.progressPercent)}% complete
                </p>
                <p className="mt-1 text-[12px] text-white/65">
                  {getProjectLocation(project)}
                </p>
              </div>
            </div>

            <Card>
              <CardBody className="p-5">
                <Link
                  to={CLIENT_ROUTES.escrow}
                  className={`block rounded-2xl ${focusRing}`}
                >
                  <Eyebrow>Funds</Eyebrow>
                  <p className="mt-2 font-display text-[26px] font-semibold tracking-[-0.03em] text-ink">
                    {formatNaira(project.escrowBalance ?? 0)}
                  </p>
                  <p className="mt-1 text-[11px] text-ink/45">
                    Protected in escrow
                  </p>
                </Link>

                <Link
                  to={CLIENT_ROUTES.decisions}
                  className={`mt-5 flex items-center justify-between gap-3 rounded-2xl bg-[#F7F4EF] p-4 transition hover:bg-[#F3EEE6] ${focusRing}`}
                >
                  <div>
                    <p className="text-[12px] font-semibold text-ink">
                      {project.pendingApprovals ?? 0} awaiting your review
                    </p>
                    <p className="mt-0.5 text-[10px] text-ink/45">
                      Approve to release funds.
                    </p>
                  </div>
                  <span className={textLinkAmber}>
                    Review
                    <ChevronRight size={13} />
                  </span>
                </Link>

                <Link to={CLIENT_ROUTES.escrow} className={`${btnDark} mt-4`}>
                  <span className="flex items-center gap-2">
                    <Wallet size={14} />
                    Open financial vault
                  </span>
                  <ChevronRight size={15} />
                </Link>
              </CardBody>
            </Card>
          </section>

          <Card className="mb-7">
            <CardHeader
              title="Project details"
              subtitle="At a glance"
            />
            <CardBody className="pt-2">
              <dl className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                <DetailRow label="Location" value={getProjectLocation(project)} />
                <DetailRow label="Contract value" value={formatNaira(contractValue)} />
                <DetailRow label="Released so far" value={formatNaira(releasedTotal)} />
                <DetailRow label="Inspector" value="Engr. Bala Yusuf" />
              </dl>
            </CardBody>
          </Card>

          <Card className="mb-7">
            <CardHeader
              title="Milestones"
              subtitle="Funds are released only after you approve each stage"
            />

            <CardBody className="pt-4">
              <MilestoneStepper
                milestones={MILESTONES}
                onSelect={milestoneDrawer.open}
              />

              <ul className="mt-6 divide-y divide-ink/[0.06]">
                {MILESTONES.map((m) => (
                  <li key={m.id}>
                    <button
                      type="button"
                      onClick={() => milestoneDrawer.open(m)}
                      className={`flex w-full items-center justify-between gap-4 rounded-xl px-2 py-3 text-left transition hover:bg-ink/[0.025] ${focusRing}`}
                    >
                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold text-ink">
                          {m.label}
                        </p>
                        <p className="mt-0.5 text-[10px] text-ink/45">
                          {m.status === 'complete'
                            ? `Approved${m.date ? ` · ${m.date}` : ''}`
                            : m.status === 'current'
                              ? 'Evidence submitted · awaiting your review'
                              : m.due
                                ? `Due ${m.due}`
                                : 'Not started'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <p className="shrink-0 font-display text-[13px] font-semibold text-ink">
                          {formatNaira(m.amount)}
                        </p>
                        <ChevronRight size={14} className="text-ink/25" />
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>

          <Card>
            <div className="flex items-center justify-between border-b border-ink/[0.07] px-5 py-5">
              <h3 className="font-display text-lg font-semibold text-ink">
                Recent updates
              </h3>
              <Link to={CLIENT_ROUTES.updates} className={textLinkAmber}>
                View all
              </Link>
            </div>

            <CardBody className="pt-4">
              <UpdateList entries={UPDATES} />
            </CardBody>
          </Card>
        </>
      )}

      {milestoneDrawer.drawer}
    </DashboardLayout>
  )
}

/* ========================================================================== */
/* 3. DECISIONS                                                               */
/* ========================================================================== */

type DecisionState =
  | 'pending'
  | 'confirming'
  | 'changes'
  | 'approved'
  | 'changesSent'

export function ClientDecisionsPage() {
  const { data, isLoading } = useClientData()
  const [state, setState] = useState<DecisionState>('pending')
  const [note, setNote] = useState('')
  const [photo, setPhoto] = useState<number | null>(null)

  const PHOTO_COUNT = currentMilestone?.evidenceCount ?? 9
  const hasPending = (data?.pendingApprovals ?? 0) > 0 && !!currentMilestone

  const submitChanges = () => {
    if (!note.trim()) return
    setState('changesSent')
  }

  return (
    <DashboardLayout title="Decisions">
      <PageHeader
        eyebrow="Approvals"
        title="Decisions waiting for you"
        subtitle="Review the contractor's evidence before any funds are released."
        action={
          <Link to={CLIENT_ROUTES.messages} className={btnLight}>
            <MessageCircle size={14} />
            Message contractor
          </Link>
        }
      />

      {isLoading || !data ? (
        <LoadingGrid />
      ) : !hasPending && state === 'pending' ? (
        <ClickableSurface
          to={CLIENT_ROUTES.projects}
          ariaLabel="Go to your properties"
        >
          <EmptyPanel
            icon={<CheckCircle2 size={19} />}
            title="Nothing waiting"
            copy="You're fully caught up with project approvals."
            action={
              <span className={textLinkAmber}>
                Go to your properties
                <ChevronRight size={13} />
              </span>
            }
          />
        </ClickableSurface>
      ) : (
        <Card>
          <CardBody className="p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5E8DD] text-[#B85C12]">
                  <ClipboardCheck size={17} />
                </div>

                <div>
                  <Eyebrow>{data.myProjects[0]?.name ?? 'Your project'}</Eyebrow>
                  <h3 className="mt-1 font-display text-xl font-semibold text-ink">
                    {currentMilestone?.label ?? 'Milestone'} milestone
                  </h3>
                  <p className="mt-1 text-[12px] leading-5 text-ink/50">
                    {PHOTO_COUNT} photos submitted by Grace Aliyu (Supervisor) ·
                    20 Jun
                  </p>
                </div>
              </div>

              <Link
                to={CLIENT_ROUTES.escrow}
                className={`rounded-xl sm:text-right ${focusRing}`}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-ink/40">
                  Held in escrow
                </p>
                <p className="mt-1 font-display text-[22px] font-semibold text-ink">
                  {formatNaira(inReviewTotal)}
                </p>
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-5">
              {Array.from({ length: PHOTO_COUNT }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPhoto(i)}
                  className={`flex aspect-square items-center justify-center rounded-xl bg-[#F4F6F3] text-ink/30 transition hover:bg-[#EDEFEA] hover:text-[#B85C12] ${focusRing}`}
                  aria-label={`View evidence photo ${i + 1}`}
                >
                  <ImageIcon size={18} />
                </button>
              ))}
            </div>

            {(state === 'pending' ||
              state === 'confirming' ||
              state === 'changes') && (
              <div className="mt-6 border-t border-ink/[0.07] pt-5">
                {state === 'pending' && (
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setState('confirming')}
                      className={btnAmber}
                    >
                      <Check size={14} />
                      Approve milestone
                    </button>

                    <button
                      type="button"
                      onClick={() => setState('changes')}
                      className={btnLight}
                    >
                      Request changes
                    </button>
                  </div>
                )}

                {state === 'confirming' && (
                  <div className="rounded-2xl border border-[#B85C12]/20 bg-[#F8EEE6] p-4">
                    <p className="text-[12px] leading-5 text-[#7A3F0C]">
                      Approving will release{' '}
                      <span className="font-semibold">
                        {formatNaira(inReviewTotal)}
                      </span>{' '}
                      to the contractor. This can't be undone.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setState('approved')}
                        className={btnAmber}
                      >
                        Confirm and release funds
                      </button>

                      <button
                        type="button"
                        onClick={() => setState('pending')}
                        className={btnLight}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {state === 'changes' && (
                  <div>
                    <label
                      htmlFor="changes-note"
                      className="text-[11px] font-semibold text-ink/60"
                    >
                      What needs to change?
                    </label>

                    <textarea
                      id="changes-note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={4}
                      placeholder="Describe what the contractor should fix or re-submit…"
                      className={`mt-2 w-full rounded-2xl border border-ink/[0.10] bg-white p-3 text-[12px] text-ink placeholder:text-ink/30 ${focusRing}`}
                    />

                    <div className="mt-3 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={submitChanges}
                        disabled={!note.trim()}
                        className={btnAmber}
                      >
                        Send to contractor
                      </button>

                      <button
                        type="button"
                        onClick={() => setState('pending')}
                        className={btnLight}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {state === 'approved' && (
              <Link
                to={CLIENT_ROUTES.escrow}
                className={`mt-6 flex items-center gap-3 rounded-2xl bg-[#EAF4EE] p-4 ${focusRing}`}
              >
                <CheckCircle2 size={18} className="shrink-0 text-[#12613E]" />
                <p className="text-[12px] font-semibold text-[#12613E]">
                  Milestone approved. {formatNaira(inReviewTotal)} released to the
                  contractor. View the escrow record.
                </p>
                <ChevronRight size={15} className="ml-auto text-[#12613E]" />
              </Link>
            )}

            {state === 'changesSent' && (
              <Link
                to={CLIENT_ROUTES.messages}
                className={`mt-6 flex items-center gap-3 rounded-2xl bg-[#F4F6F3] p-4 ${focusRing}`}
              >
                <MessageCircle size={18} className="shrink-0 text-ink/50" />
                <p className="text-[12px] font-semibold text-ink/70">
                  Your request was sent. Funds stay in escrow until you approve.
                  Open messages.
                </p>
                <ChevronRight size={15} className="ml-auto text-ink/30" />
              </Link>
            )}
          </CardBody>
        </Card>
      )}

      <EvidenceViewer
        index={photo}
        total={PHOTO_COUNT}
        label={currentMilestone?.label ?? 'Milestone'}
        onChange={setPhoto}
        onClose={() => setPhoto(null)}
      />
    </DashboardLayout>
  )
}

/* ========================================================================== */
/* 4. MESSAGES                                                                */
/* ========================================================================== */

export function ClientMessagesPage() {
  const { data } = useClientData()

  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [draft, setDraft] = useState('')
  const endRef = useRef<HTMLDivElement | null>(null)

  const firstProject = data?.myProjects[0]

  useEffect(() => {
    endRef.current?.scrollIntoView?.({ behavior: 'smooth', block: 'end' })
  }, [messages.length])

  const send = () => {
    const text = draft.trim()
    if (!text) return

    setMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        from: 'client',
        author: 'You',
        text,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ])

    setDraft('')
  }

  return (
    <DashboardLayout title="Messages">
      <PageHeader
        eyebrow="Contractor"
        title="Message your contractor"
        subtitle="Conversations stay on record alongside your milestones and escrow."
        action={
          <Link
            to={
              firstProject
                ? CLIENT_ROUTES.project(firstProject.id)
                : CLIENT_ROUTES.projects
            }
            className={btnLight}
          >
            <Building2 size={14} />
            {firstProject ? 'Open project' : 'Your properties'}
          </Link>
        }
      />

      <Card>
        <CardBody className="p-0">
          <div
            className="flex max-h-[460px] min-h-[320px] flex-col gap-4 overflow-y-auto p-5 sm:p-6"
            role="log"
            aria-live="polite"
            aria-label="Conversation with contractor"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.from === 'client' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={[
                    'max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[70%]',
                    m.from === 'client'
                      ? 'rounded-br-md bg-ink text-white'
                      : 'rounded-bl-md bg-[#F4F6F3] text-ink',
                  ].join(' ')}
                >
                  <p className="text-[12px] leading-5">{m.text}</p>
                  <p
                    className={`mt-1 text-[9px] ${
                      m.from === 'client' ? 'text-white/50' : 'text-ink/40'
                    }`}
                  >
                    {m.author} · {m.time}
                  </p>
                </div>
              </div>
            ))}

            <div ref={endRef} />
          </div>

          <div className="flex items-end gap-3 border-t border-ink/[0.07] p-4">
            <label htmlFor="client-message" className="sr-only">
              Message
            </label>

            <textarea
              id="client-message"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  send()
                }
              }}
              rows={2}
              placeholder="Write a message…  (Enter to send, Shift+Enter for a new line)"
              className={`flex-1 resize-none rounded-2xl border border-ink/[0.10] bg-white p-3 text-[12px] text-ink placeholder:text-ink/30 ${focusRing}`}
            />

            <button
              type="button"
              onClick={send}
              disabled={!draft.trim()}
              className={btnAmber}
              aria-label="Send message"
            >
              <Send size={14} />
              Send
            </button>
          </div>
        </CardBody>
      </Card>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        <Link to={CLIENT_ROUTES.decisions} className={textLinkAmber}>
          Review decisions
          <ChevronRight size={13} />
        </Link>
        <Link to={CLIENT_ROUTES.updates} className={textLinkAmber}>
          Project updates
          <ChevronRight size={13} />
        </Link>
        <Link to={CLIENT_ROUTES.disputes} className={textLinkAmber}>
          Raise an issue
          <ChevronRight size={13} />
        </Link>
      </div>
    </DashboardLayout>
  )
}

/* ========================================================================== */
/* 5. UPDATES                                                                 */
/* ========================================================================== */

const UPDATE_FILTERS: { id: 'all' | UpdateKind; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'approval', label: 'Approvals' },
  { id: 'document', label: 'Documents' },
]

export function ClientUpdatesPage() {
  const [filter, setFilter] = useState<'all' | UpdateKind>('all')

  const visible = useMemo(
    () => (filter === 'all' ? UPDATES : UPDATES.filter((u) => u.kind === filter)),
    [filter],
  )

  return (
    <DashboardLayout title="Updates">
      <PageHeader
        eyebrow="Timeline"
        title="Recent updates"
        subtitle="Everything that has happened on your builds, newest first. Select an update to see the details."
        action={
          <Link to={CLIENT_ROUTES.messages} className={btnLight}>
            <MessageCircle size={14} />
            Open messages
          </Link>
        }
      />

      <div
        className="mb-5 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter updates"
      >
        {UPDATE_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={[
              'rounded-full px-4 py-2 text-[11px] font-semibold transition',
              focusRing,
              filter === f.id
                ? 'bg-ink text-white'
                : 'border border-ink/[0.10] bg-white text-ink/60 hover:text-ink',
            ].join(' ')}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <ClickableSurface
          to={CLIENT_ROUTES.projects}
          ariaLabel="Open your projects"
        >
          <EmptyPanel
            icon={<Clock size={19} />}
            title="No updates here yet"
            copy="New activity in this category will appear here."
            action={
              <span className={textLinkAmber}>
                View projects
                <ChevronRight size={13} />
              </span>
            }
          />
        </ClickableSurface>
      ) : (
        <Card>
          <CardBody className="p-5 sm:p-6">
            <UpdateList entries={visible} />
          </CardBody>
        </Card>
      )}
    </DashboardLayout>
  )
}