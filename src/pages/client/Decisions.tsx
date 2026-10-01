import {
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Filter,
  Gavel,
  Info,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
  XCircle,
} from 'lucide-react'
import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'

import { DashboardLayout } from '@/layouts/DashboardLayout'
import { PopoverMenu, type MenuItem } from '@/components/ui/PopoverMenu'
import { SectionTabs } from '@/components/ui/HubLayout'
import { decisionTabs } from '@/pages/client/clientTabs'
import { CLIENT_ROUTES, useProjectHref } from '@/pages/client/clientRoutes'

/* =============================================================================
 * Build OS: Client Decisions   (route: /app/client/decisions)
 *
 * Every card, summary tile, menu and button here leads somewhere:
 *   - summary tiles      -> filter the list
 *   - card / title       -> opens the decision detail panel
 *   - "..." menu         -> project, messages, escrow
 *   - decision outcome   -> shows next steps (escrow / messages)
 * ============================================================================= */

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

type DecisionStatus = 'pending' | 'approved' | 'rejected' | 'clarification'
type DecisionPriority = 'high' | 'medium' | 'low'
type DecisionAction = 'approve' | 'reject' | 'clarify'

interface Decision {
  id: string
  title: string
  description: string
  project: string
  projectId: string
  category: string
  status: DecisionStatus
  priority: DecisionPriority
  requestedBy: string
  requestedDate: string
  deadline?: string
  financialImpact?: string
  financialValue?: number
  recommendation?: string
  requiresPayment?: boolean
}

/* -------------------------------------------------------------------------- */
/* Mock data                                                                   */
/* -------------------------------------------------------------------------- */

const INITIAL_DECISIONS: Decision[] = [
  {
    id: 'DEC-2026-015',
    title: 'Approve roofing milestone',
    description:
      'The contractor has submitted completion evidence for the roofing milestone. Review the evidence before approving the release.',
    project: 'Lekki Residence',
    projectId: '1',
    category: 'Milestone',
    status: 'pending',
    priority: 'high',
    requestedBy: 'Build Team',
    requestedDate: '29 Sep 2026',
    deadline: '01 Oct 2026',
    financialImpact: '₦4,500,000 held in escrow',
    financialValue: 4500000,
    recommendation:
      'The supervisor has verified the evidence. Approving releases the milestone payment and starts electrical and plumbing.',
    requiresPayment: true,
  },
  {
    id: 'DEC-2026-014',
    title: 'Approve revised foundation reinforcement',
    description:
      'The project team has recommended additional reinforcement following the latest structural inspection.',
    project: 'Gwarinpa Residence',
    projectId: 'gwarinpa-residence',
    category: 'Structural',
    status: 'pending',
    priority: 'high',
    requestedBy: 'Project Management',
    requestedDate: '28 Sep 2026',
    deadline: '02 Oct 2026',
    financialImpact: '+₦1,850,000',
    financialValue: 1850000,
    recommendation:
      'Approve the reinforcement to maintain the structural specification and avoid downstream delays.',
    requiresPayment: true,
  },
  {
    id: 'DEC-2026-013',
    title: 'Select imported bathroom fixtures',
    description:
      'Three fixture packages have been reviewed against the approved bathroom specification and supplier quotations.',
    project: 'Maitama Executive Residence',
    projectId: 'maitama-executive-residence',
    category: 'Procurement',
    status: 'pending',
    priority: 'medium',
    requestedBy: 'Procurement Team',
    requestedDate: '27 Sep 2026',
    deadline: '04 Oct 2026',
    financialImpact: '+₦920,000',
    financialValue: 920000,
    recommendation:
      'Package B offers the closest match to the approved specification within the current procurement allowance.',
    requiresPayment: true,
  },
  {
    id: 'DEC-2026-012',
    title: 'Approve electrical layout revision',
    description:
      'The electrical consultant has submitted a revised layout to accommodate the updated kitchen and home-office requirements.',
    project: 'Asokoro Smart Home',
    projectId: 'asokoro-smart-home',
    category: 'Design',
    status: 'clarification',
    priority: 'medium',
    requestedBy: 'Design Consultant',
    requestedDate: '25 Sep 2026',
    deadline: '03 Oct 2026',
    financialImpact: 'No immediate impact',
    financialValue: 0,
    recommendation:
      'Clarification has been requested regarding the additional circuits before approval.',
  },
  {
    id: 'DEC-2026-011',
    title: 'Approve milestone 03 completion',
    description:
      'The project manager has submitted evidence and verification documents for the completed blockwork milestone.',
    project: 'Gwarinpa Residence',
    projectId: 'gwarinpa-residence',
    category: 'Milestone',
    status: 'approved',
    priority: 'high',
    requestedBy: 'Project Management',
    requestedDate: '21 Sep 2026',
    financialImpact: '₦4,200,000 released',
    financialValue: 4200000,
    recommendation:
      'Verification was completed and the milestone was approved for escrow release.',
  },
  {
    id: 'DEC-2026-010',
    title: 'Approve external landscaping package',
    description:
      'The landscaping supplier submitted a final package covering hardscape, planting and irrigation.',
    project: 'Maitama Executive Residence',
    projectId: 'maitama-executive-residence',
    category: 'External Works',
    status: 'rejected',
    priority: 'low',
    requestedBy: 'Project Manager',
    requestedDate: '18 Sep 2026',
    financialImpact: '+₦1,400,000',
    financialValue: 1400000,
    recommendation:
      'The proposal was returned for revision because the irrigation scope exceeded the approved allowance.',
  },
]

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function formatNaira(value?: number) {
  if (typeof value !== 'number') return '—'

  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value)
}

const INTERACTIVE = 'a,button,input,textarea,select,[role="button"],[role="menu"]'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60 focus-visible:ring-offset-2'

/* -------------------------------------------------------------------------- */
/* Badges                                                                      */
/* -------------------------------------------------------------------------- */

const STATUS_CONFIG: Record<
  DecisionStatus,
  { label: string; icon: typeof CheckCircle2; className: string }
> = {
  pending: {
    label: 'Action required',
    icon: Clock3,
    className: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  approved: {
    label: 'Approved',
    icon: CheckCircle2,
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  rejected: {
    label: 'Rejected',
    icon: XCircle,
    className: 'border-red-200 bg-red-50 text-red-700',
  },
  clarification: {
    label: 'Clarification',
    icon: MessageSquare,
    className: 'border-blue-200 bg-blue-50 text-blue-700',
  },
}

function StatusBadge({ status }: { status: DecisionStatus }) {
  const item = STATUS_CONFIG[status]
  const Icon = item.icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${item.className}`}
    >
      <Icon size={12} strokeWidth={2} aria-hidden="true" />
      {item.label}
    </span>
  )
}

function PriorityBadge({ priority }: { priority: DecisionPriority }) {
  const config = {
    high: { label: 'High priority', className: 'text-red-600', dot: 'bg-red-500' },
    medium: {
      label: 'Medium priority',
      className: 'text-amber-600',
      dot: 'bg-amber-500',
    },
    low: { label: 'Low priority', className: 'text-ink/40', dot: 'bg-ink/25' },
  }[priority]

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] ${config.className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* Summary tile (clickable: filters the list)                                  */
/* -------------------------------------------------------------------------- */

function SummaryCard({
  label,
  value,
  description,
  icon: Icon,
  accent = 'default',
  active,
  onClick,
}: {
  label: string
  value: string | number
  description: string
  icon: typeof Gavel
  accent?: 'default' | 'amber' | 'green' | 'blue'
  active: boolean
  onClick: () => void
}) {
  const accentClasses = {
    default: 'bg-ink/[0.035] text-ink/55',
    amber: 'bg-amber-50 text-amber-700',
    green: 'bg-emerald-50 text-emerald-700',
    blue: 'bg-blue-50 text-blue-700',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group relative w-full overflow-hidden rounded-2xl border bg-white p-5 text-left shadow-[0_8px_30px_-24px_rgba(11,18,32,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(11,18,32,0.3)] ${focusRing} ${
        active ? 'border-ink/25 ring-4 ring-ink/[0.04]' : 'border-line/80'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink/35">
            {label}
          </p>
          <p className="mt-2 font-display text-[28px] font-medium tracking-[-0.035em] text-ink">
            {value}
          </p>
          <p className="mt-1 text-[11px] text-ink/40">{description}</p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${accentClasses[accent]}`}
        >
          <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
        </div>
      </div>
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/* Metadata item                                                               */
/* -------------------------------------------------------------------------- */

function MetaItem({
  icon: Icon,
  label,
  value,
  danger = false,
}: {
  icon: typeof Building2
  label: string
  value: string
  danger?: boolean
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon
        size={14}
        strokeWidth={1.65}
        className="mt-0.5 shrink-0 text-ink/30"
        aria-hidden="true"
      />
      <div className="min-w-0">
        <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
          {label}
        </p>
        <p
          className={`mt-1 truncate text-[11px] font-medium ${
            danger ? 'text-amber-700' : 'text-ink/65'
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Decision card                                                               */
/* -------------------------------------------------------------------------- */

function DecisionCard({
  decision,
  projectHref,
  onSelect,
}: {
  decision: Decision
  projectHref: string
  onSelect: (id: string) => void
}) {
  const canAct = decision.status === 'pending' || decision.status === 'clarification'

  const menu: MenuItem[] = [
    { label: 'View project', to: projectHref, icon: Building2 },
    { label: 'Ask about this decision', to: CLIENT_ROUTES.messages, icon: MessageSquare },
    ...((decision.financialValue ?? 0) > 0
      ? [{ label: 'View in escrow', to: CLIENT_ROUTES.escrow, icon: Wallet }]
      : []),
  ]

  const handleCardClick = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest(INTERACTIVE)) return
    onSelect(decision.id)
  }

  return (
    <article
      onClick={handleCardClick}
      className="group cursor-pointer overflow-hidden rounded-[22px] border border-line/80 bg-white shadow-[0_10px_35px_-28px_rgba(11,18,32,0.35)] transition-all duration-300 hover:border-ink/10 hover:shadow-[0_20px_50px_-28px_rgba(11,18,32,0.32)]"
    >
      <div
        className={`h-[2px] w-full ${
          decision.status === 'pending'
            ? 'bg-amber-400'
            : decision.status === 'approved'
              ? 'bg-emerald-500'
              : decision.status === 'rejected'
                ? 'bg-red-400'
                : 'bg-blue-400'
        }`}
      />

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink/[0.035] text-ink/55 ring-1 ring-inset ring-ink/[0.04]">
              <Gavel size={19} strokeWidth={1.65} aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <StatusBadge status={decision.status} />
                <PriorityBadge priority={decision.priority} />
              </div>

              <h3 className="text-[15px] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[16px]">
                <button
                  type="button"
                  onClick={() => onSelect(decision.id)}
                  className={`text-left hover:underline ${focusRing}`}
                >
                  {decision.title}
                </button>
              </h3>
            </div>
          </div>

          <PopoverMenu label={`More options for ${decision.title}`} items={menu} />
        </div>

        <p className="mt-5 max-w-3xl text-[13px] leading-6 text-ink/55">
          {decision.description}
        </p>

        <div className="mt-5 grid gap-3 border-y border-line/70 py-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetaItem icon={Building2} label="Project" value={decision.project} />
          <MetaItem icon={FileText} label="Category" value={decision.category} />
          <MetaItem icon={CalendarDays} label="Requested" value={decision.requestedDate} />
          <MetaItem
            icon={Clock3}
            label="Deadline"
            value={decision.deadline || 'No deadline'}
            danger={decision.status === 'pending' && Boolean(decision.deadline)}
          />
        </div>

        {decision.financialImpact && (
          <Link
            to={CLIENT_ROUTES.escrow}
            className={`mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line/70 bg-ink/[0.018] px-4 py-3 transition hover:border-ink/15 ${focusRing}`}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-ink/45 shadow-sm ring-1 ring-inset ring-ink/[0.05]">
                <Wallet size={15} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
                  Financial impact
                </p>
                <p className="mt-0.5 text-[12px] font-semibold text-ink/75">
                  {decision.financialImpact}
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-ink/40">
              {(decision.financialValue ?? 0) > 0
                ? formatNaira(decision.financialValue)
                : 'View escrow'}
              <ArrowRight size={12} aria-hidden="true" />
            </span>
          </Link>
        )}

        {decision.recommendation && (
          <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
            <div className="flex gap-3">
              <Sparkles
                size={15}
                strokeWidth={1.7}
                className="mt-0.5 shrink-0 text-blue-600"
                aria-hidden="true"
              />
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-blue-700/70">
                  Build OS recommendation
                </p>
                <p className="mt-1 text-[12px] leading-5 text-blue-950/65">
                  {decision.recommendation}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-[11px] text-ink/40">
            <span>Requested by</span>
            <span className="font-medium text-ink/60">{decision.requestedBy}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to={projectHref}
              className={`inline-flex h-9 items-center gap-2 rounded-xl border border-line bg-white px-3.5 text-[11px] font-semibold text-ink/60 transition-all hover:border-ink/15 hover:bg-ink/[0.025] hover:text-ink ${focusRing}`}
            >
              View project
              <ArrowRight size={13} strokeWidth={1.8} aria-hidden="true" />
            </Link>

            <button
              type="button"
              onClick={() => onSelect(decision.id)}
              className={`inline-flex h-9 items-center gap-2 rounded-xl px-4 text-[11px] font-semibold transition-all ${focusRing} ${
                canAct
                  ? 'bg-ink text-white shadow-[0_8px_18px_-10px_rgba(11,18,32,0.8)] hover:-translate-y-0.5 hover:bg-[#151d2d]'
                  : 'border border-line bg-white text-ink/70 hover:border-ink/15 hover:bg-ink/[0.025]'
              }`}
            >
              {canAct ? 'Review decision' : 'View details'}
              <ArrowRight size={13} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

/* -------------------------------------------------------------------------- */
/* Review / detail modal                                                       */
/* -------------------------------------------------------------------------- */

const RESULT_COPY: Record<
  DecisionAction,
  { title: string; body: (d: Decision) => string; icon: typeof CheckCircle2; tone: string }
> = {
  approve: {
    title: 'Decision approved',
    body: (d) =>
      d.requiresPayment
        ? 'Your approval has been recorded. Any related payment follows the escrow release rules.'
        : 'Your approval has been recorded against the project.',
    icon: CheckCircle2,
    tone: 'bg-emerald-50 text-emerald-700',
  },
  reject: {
    title: 'Decision rejected',
    body: () =>
      'Your rejection has been recorded. The project team will be asked to revise and resubmit.',
    icon: XCircle,
    tone: 'bg-red-50 text-red-700',
  },
  clarify: {
    title: 'Clarification requested',
    body: () =>
      'The project team has been asked for more context. You can follow up in Messages.',
    icon: MessageSquare,
    tone: 'bg-blue-50 text-blue-700',
  },
}

function DecisionReviewModal({
  decision,
  projectHref,
  onResolve,
  onClose,
}: {
  decision: Decision
  projectHref: string
  onResolve: (id: string, action: DecisionAction) => void
  onClose: () => void
}) {
  const [processing, setProcessing] = useState<DecisionAction | null>(null)
  const [result, setResult] = useState<DecisionAction | null>(null)

  const readOnly =
    !result && (decision.status === 'approved' || decision.status === 'rejected')

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const handleAction = (action: DecisionAction) => {
    setProcessing(action)

    /* Replace with the real API mutation, e.g. decisionsApi.update(id, action). */
    window.setTimeout(() => {
      onResolve(decision.id, action)
      setProcessing(null)
      setResult(action)
    }, 650)
  }

  const outcome = result ? RESULT_COPY[result] : null
  const OutcomeIcon = outcome?.icon

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="decision-review-title"
        className="max-h-[90vh] w-full max-w-[620px] overflow-y-auto rounded-[26px] border border-white/20 bg-white shadow-[0_30px_100px_-25px_rgba(11,18,32,0.55)]"
      >
        <div className="relative overflow-hidden bg-ink px-6 pb-6 pt-6 text-white sm:px-7">
          <span
            aria-hidden="true"
            className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl"
          />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07]">
                <Gavel
                  size={19}
                  strokeWidth={1.7}
                  className="text-amber-300"
                  aria-hidden="true"
                />
              </div>

              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">
                  {readOnly ? 'Decision record' : 'Decision review'} · {decision.id}
                </p>
                <h2
                  id="decision-review-title"
                  className="mt-1 text-[17px] font-semibold leading-snug"
                >
                  {decision.title}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close decision review"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/45 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={17} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="space-y-5 p-6 sm:p-7">
          {/* Outcome after acting */}
          {outcome && OutcomeIcon && result ? (
            <div className="space-y-5">
              <div className={`flex gap-3 rounded-2xl p-4 ${outcome.tone}`}>
                <OutcomeIcon size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[13px] font-semibold">{outcome.title}</p>
                  <p className="mt-1 text-[12px] leading-5 opacity-80">
                    {outcome.body(decision)}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5 border-t border-line pt-5">
                {result === 'approve' && decision.requiresPayment && (
                  <Link
                    to={CLIENT_ROUTES.escrow}
                    className="inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-4 text-[11px] font-semibold text-white hover:bg-[#151d2d]"
                  >
                    <Wallet size={15} aria-hidden="true" />
                    View in escrow
                  </Link>
                )}

                {result !== 'approve' && (
                  <Link
                    to={CLIENT_ROUTES.messages}
                    className="inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-4 text-[11px] font-semibold text-white hover:bg-[#151d2d]"
                  >
                    <MessageSquare size={15} aria-hidden="true" />
                    Open messages
                  </Link>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-11 items-center rounded-xl border border-line px-4 text-[11px] font-semibold text-ink/60 hover:bg-ink/[0.025]"
                >
                  Back to decisions
                </button>
              </div>
            </div>
          ) : (
            <>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                  Decision context
                </p>
                <p className="mt-2 text-[13px] leading-6 text-ink/60">
                  {decision.description}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  to={projectHref}
                  className="group rounded-xl border border-line bg-ink/[0.02] p-4 transition hover:border-ink/15"
                >
                  <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
                    Project
                  </p>
                  <p className="mt-1.5 flex items-center justify-between gap-2 text-[13px] font-semibold text-ink">
                    {decision.project}
                    <ArrowRight
                      size={13}
                      className="text-ink/30 transition group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </p>
                </Link>

                <Link
                  to={CLIENT_ROUTES.escrow}
                  className="group rounded-xl border border-line bg-ink/[0.02] p-4 transition hover:border-ink/15"
                >
                  <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
                    Financial impact
                  </p>
                  <p className="mt-1.5 flex items-center justify-between gap-2 text-[13px] font-semibold text-ink">
                    {decision.financialImpact || 'None'}
                    <ArrowRight
                      size={13}
                      className="text-ink/30 transition group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </p>
                </Link>
              </div>

              <dl className="grid gap-x-6 sm:grid-cols-2">
                <ModalRow label="Category" value={decision.category} />
                <ModalRow label="Requested by" value={decision.requestedBy} />
                <ModalRow label="Requested" value={decision.requestedDate} />
                <ModalRow label="Deadline" value={decision.deadline ?? 'None'} />
              </dl>

              {decision.recommendation && (
                <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                  <div className="flex gap-3">
                    <Info
                      size={16}
                      strokeWidth={1.7}
                      className="mt-0.5 shrink-0 text-blue-600"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-blue-700">
                        {readOnly ? 'Outcome' : 'Recommended action'}
                      </p>
                      <p className="mt-1.5 text-[12px] leading-5 text-blue-950/70">
                        {decision.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 rounded-xl border border-line bg-ink/[0.018] p-4">
                <ShieldCheck
                  size={16}
                  strokeWidth={1.7}
                  className="mt-0.5 shrink-0 text-ink/40"
                  aria-hidden="true"
                />
                <p className="text-[11px] leading-5 text-ink/45">
                  Your decision will be recorded against this project and reflected
                  in its operational audit trail.
                </p>
              </div>

              <div className="border-t border-line pt-5">
                {readOnly ? (
                  <div className="flex flex-wrap gap-2.5">
                    <Link
                      to={projectHref}
                      className="inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-4 text-[11px] font-semibold text-white hover:bg-[#151d2d]"
                    >
                      Open project
                      <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                    <Link
                      to={CLIENT_ROUTES.messages}
                      className="inline-flex h-11 items-center gap-2 rounded-xl border border-line px-4 text-[11px] font-semibold text-ink/60 hover:bg-ink/[0.025]"
                    >
                      <MessageSquare size={14} aria-hidden="true" />
                      Discuss in messages
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-2.5 sm:grid-cols-3">
                    <button
                      type="button"
                      disabled={Boolean(processing)}
                      onClick={() => handleAction('reject')}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-[11px] font-semibold text-red-600 transition-all hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <XCircle size={15} strokeWidth={1.8} aria-hidden="true" />
                      {processing === 'reject' ? 'Processing...' : 'Reject'}
                    </button>

                    <button
                      type="button"
                      disabled={Boolean(processing)}
                      onClick={() => handleAction('clarify')}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 text-[11px] font-semibold text-ink/60 transition-all hover:border-ink/15 hover:bg-ink/[0.025] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <MessageSquare size={15} strokeWidth={1.8} aria-hidden="true" />
                      {processing === 'clarify' ? 'Processing...' : 'Request clarification'}
                    </button>

                    <button
                      type="button"
                      disabled={Boolean(processing)}
                      onClick={() => handleAction('approve')}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-ink px-4 text-[11px] font-semibold text-white shadow-[0_10px_22px_-12px_rgba(11,18,32,0.8)] transition-all hover:-translate-y-0.5 hover:bg-[#151d2d] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Check size={15} strokeWidth={2} aria-hidden="true" />
                      {processing === 'approve' ? 'Processing...' : 'Approve'}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function ModalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line/70 py-2.5">
      <dt className="text-[11px] text-ink/45">{label}</dt>
      <dd className="text-right text-[12px] font-semibold text-ink">{value}</dd>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Filter select                                                               */
/* -------------------------------------------------------------------------- */

function FilterSelect({
  icon: Icon,
  value,
  onChange,
  options,
  label,
}: {
  icon?: typeof Filter
  value: string
  onChange: (value: string) => void
  options: [string, string][]
  label: string
}) {
  return (
    <div className="relative">
      {Icon && (
        <Icon
          size={13}
          strokeWidth={1.7}
          className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-ink/30"
          aria-hidden="true"
        />
      )}

      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`h-11 appearance-none rounded-xl border border-line bg-white pr-9 text-[11px] font-medium text-ink/60 outline-none transition-all hover:border-ink/15 focus:border-ink/20 focus:ring-2 focus:ring-ink/[0.05] ${
          Icon ? 'pl-9' : 'pl-3.5'
        }`}
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>

      <ChevronDown
        size={14}
        strokeWidth={1.7}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink/30"
        aria-hidden="true"
      />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Main page                                                                   */
/* -------------------------------------------------------------------------- */

export function ClientDecisionsPage() {
  const projectHref = useProjectHref()

  const [decisions, setDecisions] = useState<Decision[]>(INITIAL_DECISIONS)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'all' | DecisionStatus>('all')
  const [project, setProject] = useState('all')
  const [priority, setPriority] = useState<'all' | DecisionPriority>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedDecision = decisions.find((d) => d.id === selectedId) ?? null

  const projectNames = useMemo(
    () => Array.from(new Set(decisions.map((item) => item.project))),
    [decisions],
  )

  const filteredDecisions = useMemo(() => {
    const q = query.trim().toLowerCase()

    return decisions.filter((decision) => {
      const matchesQuery =
        !q ||
        decision.title.toLowerCase().includes(q) ||
        decision.project.toLowerCase().includes(q) ||
        decision.category.toLowerCase().includes(q)

      return (
        matchesQuery &&
        (status === 'all' || decision.status === status) &&
        (project === 'all' || decision.project === project) &&
        (priority === 'all' || decision.priority === priority)
      )
    })
  }, [decisions, query, status, project, priority])

  const pendingCount = decisions.filter((d) => d.status === 'pending').length
  const clarificationCount = decisions.filter((d) => d.status === 'clarification').length
  const approvedCount = decisions.filter((d) => d.status === 'approved').length
  const pendingValue = decisions
    .filter((d) => d.status === 'pending')
    .reduce((total, d) => total + (d.financialValue || 0), 0)

  const toggleStatus = (next: DecisionStatus) =>
    setStatus((current) => (current === next ? 'all' : next))

  const handleResolve = (id: string, action: DecisionAction) => {
    const nextStatus: DecisionStatus =
      action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'clarification'

    setDecisions((current) =>
      current.map((d) => (d.id === id ? { ...d, status: nextStatus } : d)),
    )
  }

  return (
    <DashboardLayout title="Decisions">
      <div className="min-h-full bg-[#f8f9fb]">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-line/70 bg-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute -right-32 -top-36 h-[360px] w-[360px] rounded-full bg-blue-500/[0.035] blur-3xl" />
            <div className="absolute -left-32 bottom-[-180px] h-[340px] w-[340px] rounded-full bg-amber-400/[0.035] blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-[1680px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5">
                <Gavel
                  size={12}
                  strokeWidth={1.8}
                  className="text-amber-700"
                  aria-hidden="true"
                />
                <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-amber-800">
                  Decision centre
                </span>
              </div>

              <h1 className="font-display text-[32px] font-medium tracking-[-0.04em] text-ink sm:text-[40px] lg:text-[46px]">
                Decisions that move
                <br className="hidden sm:block" />
                your projects forward.
              </h1>

              <p className="mt-4 max-w-2xl text-[13px] leading-6 text-ink/50 sm:text-[14px]">
                Review project decisions, understand their financial and operational
                impact, and provide approvals without losing visibility across your
                Build OS workspace.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <Link
                  to={CLIENT_ROUTES.escrow}
                  className={`inline-flex h-10 items-center gap-2 rounded-xl border border-line bg-white px-4 text-[11px] font-semibold text-ink/65 transition hover:border-ink/15 hover:text-ink ${focusRing}`}
                >
                  <Wallet size={14} aria-hidden="true" />
                  Open escrow
                </Link>
                <Link
                  to={CLIENT_ROUTES.messages}
                  className={`inline-flex h-10 items-center gap-2 rounded-xl border border-line bg-white px-4 text-[11px] font-semibold text-ink/65 transition hover:border-ink/15 hover:text-ink ${focusRing}`}
                >
                  <MessageSquare size={14} aria-hidden="true" />
                  Message project team
                </Link>
              </div>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-[1680px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
          <SectionTabs tabs={decisionTabs} label="Decision sections" />

          {/* Summary (click to filter) */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              label="Awaiting decision"
              value={pendingCount}
              description="Require your review"
              icon={Gavel}
              accent="amber"
              active={status === 'pending'}
              onClick={() => toggleStatus('pending')}
            />
            <SummaryCard
              label="Clarifications"
              value={clarificationCount}
              description="Awaiting additional context"
              icon={MessageSquare}
              accent="blue"
              active={status === 'clarification'}
              onClick={() => toggleStatus('clarification')}
            />
            <SummaryCard
              label="Approved"
              value={approvedCount}
              description="Decisions completed"
              icon={CheckCircle2}
              accent="green"
              active={status === 'approved'}
              onClick={() => toggleStatus('approved')}
            />
            <SummaryCard
              label="Pending value"
              value={formatNaira(pendingValue)}
              description="Financial impact under review"
              icon={Wallet}
              active={status === 'pending'}
              onClick={() => toggleStatus('pending')}
            />
          </section>

          {/* Toolbar */}
          <section className="mt-7 rounded-[22px] border border-line/80 bg-white p-3 shadow-[0_8px_30px_-25px_rgba(11,18,32,0.25)] sm:p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative min-w-0 flex-1">
                <Search
                  size={16}
                  strokeWidth={1.7}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search decisions, projects or categories..."
                  aria-label="Search decisions"
                  className="h-11 w-full rounded-xl border border-line bg-ink/[0.02] pl-10 pr-4 text-[12px] text-ink outline-none transition-all placeholder:text-ink/30 focus:border-ink/20 focus:bg-white focus:ring-2 focus:ring-ink/[0.05]"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <FilterSelect
                  label="Filter by status"
                  icon={Filter}
                  value={status}
                  onChange={(value) => setStatus(value as 'all' | DecisionStatus)}
                  options={[
                    ['all', 'All status'],
                    ['pending', 'Action required'],
                    ['clarification', 'Clarification'],
                    ['approved', 'Approved'],
                    ['rejected', 'Rejected'],
                  ]}
                />
                <FilterSelect
                  label="Filter by project"
                  value={project}
                  onChange={setProject}
                  options={[
                    ['all', 'All projects'],
                    ...projectNames.map((name): [string, string] => [name, name]),
                  ]}
                />
                <FilterSelect
                  label="Filter by priority"
                  value={priority}
                  onChange={(value) => setPriority(value as 'all' | DecisionPriority)}
                  options={[
                    ['all', 'All priorities'],
                    ['high', 'High priority'],
                    ['medium', 'Medium priority'],
                    ['low', 'Low priority'],
                  ]}
                />
              </div>
            </div>
          </section>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                Operational queue
              </p>
              <h2 className="mt-1 font-display text-[22px] font-medium tracking-[-0.025em] text-ink">
                Project decisions
              </h2>
            </div>

            <p className="text-[11px] text-ink/35">
              Showing{' '}
              <span className="font-semibold text-ink/55">{filteredDecisions.length}</span>{' '}
              of {decisions.length} decisions
            </p>
          </div>

          <section className="mt-5 space-y-4">
            {filteredDecisions.length > 0 ? (
              filteredDecisions.map((decision) => (
                <DecisionCard
                  key={decision.id}
                  decision={decision}
                  projectHref={projectHref(decision.projectId)}
                  onSelect={setSelectedId}
                />
              ))
            ) : (
              <div className="rounded-[22px] border border-dashed border-line bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-ink/[0.035] text-ink/35">
                  <Search size={20} strokeWidth={1.6} aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-[14px] font-semibold text-ink">
                  No decisions found
                </h3>
                <p className="mx-auto mt-1 max-w-md text-[12px] leading-5 text-ink/40">
                  Try adjusting your search or clearing one of the filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setStatus('all')
                    setProject('all')
                    setPriority('all')
                  }}
                  className="mt-5 inline-flex h-9 items-center rounded-xl bg-ink px-4 text-[11px] font-semibold text-white transition-colors hover:bg-[#151d2d]"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>

          <section className="mt-8 overflow-hidden rounded-[22px] border border-line bg-white">
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-white">
                  <ShieldCheck size={17} strokeWidth={1.7} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-ink">
                    Every decision is part of the project record.
                  </p>
                  <p className="mt-1 max-w-2xl text-[11px] leading-5 text-ink/40">
                    Approvals, rejections, clarifications and related project actions
                    are recorded within the operational history for accountability and
                    verification.
                  </p>
                </div>
              </div>

              <Link
                to={CLIENT_ROUTES.reports}
                className="inline-flex shrink-0 items-center gap-2 text-[11px] font-semibold text-ink/60 transition-colors hover:text-ink"
              >
                View reports
                <ArrowRight size={13} strokeWidth={1.8} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </main>

        {selectedDecision && (
          <DecisionReviewModal
            key={selectedDecision.id}
            decision={selectedDecision}
            projectHref={projectHref(selectedDecision.projectId)}
            onResolve={handleResolve}
            onClose={() => setSelectedId(null)}
          />
        )}
      </div>
    </DashboardLayout>
  )
}

export default ClientDecisionsPage