/* =============================================================================
 * src/pages/contractor/Workforce.tsx
 *
 * Contractor workforce, in one file on purpose (store + both pages):
 *
 *   BuildTeamPage    /app/contractor/team        your people, and what each may do
 *   MarketplacePage  /app/contractor/available   Project Marketplace | Artisan Marketplace
 *
 * They share one tiny store so the two stay in sync: invite an artisan from the
 * marketplace and they show up on the Build Team as "Invited".
 *
 * BACKEND LATER: replace the `store` section with API calls. The pages only use
 * `useWorkforce()` and the `actions` object, so nothing else has to change.
 * ========================================================================== */

import {
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronDown,
  Clock3,
  History,
  Lock,
  MapPin,
  Phone,
  Plus,
  Search,
  Send,
  Star,
  Store,
  Trash2,
  Unlock,
  UserPlus,
  Users,
  Wrench,
  X,
} from 'lucide-react'

import { useAppRoutes } from '@/config/appRoutes'
import { AvailableProjects } from '@/modules/bidding/pages/AvailableProjects'

/* -------------------------------------------------------------------------- */
/* Types & constants                                                          */
/* -------------------------------------------------------------------------- */

type Permission = 'proof' | 'progress' | 'financials'
type MemberStatus = 'active' | 'invited'
type Availability = 'available' | 'limited' | 'booked'

interface TeamMember {
  id: string
  name: string
  trade: string
  phone: string
  project: string
  status: MemberStatus
  permissions: Permission[]
  /** Set when the person came from the Artisan Marketplace. */
  artisanId?: string
  dayRate?: number
}

interface Artisan {
  id: string
  name: string
  trade: string
  location: string
  rating: number
  reviews: number
  projects: number
  years: number
  dayRate: number
  availability: Availability
  verified: boolean
  phone: string
  bio: string
  skills: string[]
  history: { project: string; year: string; rating: number; note: string }[]
}

const PERMISSIONS: { key: Permission; label: string; hint: string }[] = [
  { key: 'proof', label: 'Upload proof', hint: 'Photos, videos and delivery notes for milestones' },
  { key: 'progress', label: 'Update progress', hint: 'Post site progress and daily logs' },
  { key: 'financials', label: 'View financials', hint: 'See payments, rates and escrow status' },
]

/** Projects this contractor can place people on. */
const CONTRACTOR_PROJECTS = ['Adeyemi 5-Bedroom Duplex', 'Grace Chapel Auditorium', 'Lekki Residence']

const TRADES = [
  'Mason / Bricklayer',
  'Carpenter',
  'Electrician',
  'Plumber',
  'Tiler',
  'Welder / Fabricator',
  'POP & Ceiling',
  'Steel Fixer / Iron Bender',
]

const TEAM_ROLES = ['Engineer', 'Supervisor', ...TRADES]

const AVAILABILITY_META: Record<Availability, { label: string; className: string }> = {
  available: { label: 'Available now', className: 'bg-emerald-50 text-emerald-700' },
  limited: { label: 'Limited slots', className: 'bg-amber-50 text-amber-700' },
  booked: { label: 'Fully booked', className: 'bg-slate-100 text-slate-500' },
}

const naira = (n: number) => `₦${n.toLocaleString('en-NG')}`

const initials = (name: string) =>
  name
    .replace(/^(engr|dr|mr|mrs)\.?\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('')

/* -------------------------------------------------------------------------- */
/* Mock data                                                                  */
/* -------------------------------------------------------------------------- */

const ARTISANS: Artisan[] = [
  {
    id: 'art-1',
    name: 'Sunday Effiong',
    trade: 'Mason / Bricklayer',
    location: 'Lugbe, Abuja',
    rating: 4.9,
    reviews: 23,
    projects: 31,
    years: 12,
    dayRate: 12000,
    availability: 'available',
    verified: true,
    phone: '08020000002',
    bio: 'Master mason with a sharp eye for level work. Has set out and built shells for diaspora duplexes and a church auditorium across the FCT.',
    skills: ['Block work', 'Plastering', 'Screeding', 'Setting out'],
    history: [
      { project: 'Adeyemi 5-Bedroom Duplex', year: '2026', rating: 5, note: 'Foundation walls and block work, finished two days early.' },
      { project: 'Grace Chapel Auditorium', year: '2025', rating: 4.8, note: 'Setting out and external plastering.' },
    ],
  },
  {
    id: 'art-2',
    name: 'Musa Danladi',
    trade: 'Electrician',
    location: 'Wuse, Abuja',
    rating: 4.8,
    reviews: 18,
    projects: 26,
    years: 9,
    dayRate: 15000,
    availability: 'limited',
    verified: true,
    phone: '08020000004',
    bio: 'Certified electrician handling everything from conduit runs to inverter and smart-home pre-wiring. COREN-supervised installations.',
    skills: ['First & second fix', 'Distribution boards', 'Solar/inverter', 'Smart-home pre-wiring'],
    history: [
      { project: 'Grace Chapel Auditorium', year: '2026', rating: 4.9, note: 'Full electrical install including backup power.' },
      { project: 'Maitama Duplex', year: '2025', rating: 4.7, note: 'Conduit runs and distribution boards.' },
    ],
  },
  {
    id: 'art-3',
    name: 'Ifeanyi Nwosu',
    trade: 'Carpenter',
    location: 'Kubwa, Abuja',
    rating: 4.7,
    reviews: 15,
    projects: 22,
    years: 8,
    dayRate: 13000,
    availability: 'available',
    verified: true,
    phone: '08020000003',
    bio: 'Finish carpenter and formwork specialist. Builds roof structures, fits doors, and crafts built-in wardrobes and kitchens.',
    skills: ['Roof carpentry', 'Formwork', 'Doors & frames', 'Built-in furniture'],
    history: [
      { project: 'Adeyemi 5-Bedroom Duplex', year: '2026', rating: 4.6, note: 'Roof structure and door frames.' },
      { project: 'Gwarinpa Terrace', year: '2025', rating: 4.8, note: 'Built-in wardrobes for six units.' },
    ],
  },
  {
    id: 'art-4',
    name: 'Patrick Obi',
    trade: 'Plumber',
    location: 'Lokogoma, Abuja',
    rating: 4.6,
    reviews: 11,
    projects: 17,
    years: 7,
    dayRate: 12500,
    availability: 'available',
    verified: false,
    phone: '08020000005',
    bio: 'Plumbing contractor for residential and commercial builds. Handles concealed pipework, water treatment tie-ins, and sanitary fit-out.',
    skills: ['Soil & waste', 'Pressurised supply', 'Borehole connection', 'Sanitary fittings'],
    history: [
      { project: 'Grace Chapel Auditorium', year: '2026', rating: 4.6, note: 'Concealed pipework and sanitary fit-out.' },
    ],
  },
  {
    id: 'art-5',
    name: 'Chidi Okafor',
    trade: 'Tiler',
    location: 'Garki, Abuja',
    rating: 4.8,
    reviews: 14,
    projects: 19,
    years: 10,
    dayRate: 14000,
    availability: 'limited',
    verified: true,
    phone: '08020000011',
    bio: 'Floor and wall tiling specialist. Large-format porcelain, mosaics and waterproofed wet areas with clean, even grout lines.',
    skills: ['Large-format tiles', 'Mosaics', 'Waterproofing', 'Grouting'],
    history: [
      { project: 'Lekki Residence', year: '2026', rating: 4.9, note: 'Large-format porcelain across ground floor.' },
      { project: 'Maitama Duplex', year: '2025', rating: 4.7, note: 'Bathrooms and wet areas.' },
    ],
  },
  {
    id: 'art-6',
    name: 'Yakubu Garba',
    trade: 'Welder / Fabricator',
    location: 'Karu, Abuja',
    rating: 4.5,
    reviews: 9,
    projects: 14,
    years: 11,
    dayRate: 16000,
    availability: 'available',
    verified: true,
    phone: '08020000012',
    bio: 'Structural and ornamental welder. Gates, railings, burglar proofing and steel roof trusses, fabricated on site or in his workshop.',
    skills: ['Roof trusses', 'Gates & railings', 'Burglar proofing', 'Site welding'],
    history: [
      { project: 'Grace Chapel Auditorium', year: '2026', rating: 4.5, note: 'Steel roof trusses and gates.' },
    ],
  },
  {
    id: 'art-7',
    name: 'Emeka Eze',
    trade: 'POP & Ceiling',
    location: 'Gwarinpa, Abuja',
    rating: 4.7,
    reviews: 12,
    projects: 18,
    years: 8,
    dayRate: 11500,
    availability: 'available',
    verified: true,
    phone: '08020000013',
    bio: 'POP and suspended ceiling installer with clean cornice work and concealed lighting channels for modern interiors.',
    skills: ['POP ceilings', 'Cornices', 'Concealed lighting', 'Wall finishes'],
    history: [
      { project: 'Gwarinpa Terrace', year: '2026', rating: 4.8, note: 'Ceiling and cornice work across six units.' },
    ],
  },
  {
    id: 'art-8',
    name: 'Aminu Sani',
    trade: 'Steel Fixer / Iron Bender',
    location: 'Jikwoyi, Abuja',
    rating: 4.6,
    reviews: 10,
    projects: 21,
    years: 13,
    dayRate: 13500,
    availability: 'booked',
    verified: true,
    phone: '08020000014',
    bio: 'Reinforcement specialist for foundations, columns and slabs. Reads structural drawings accurately and keeps cover and spacing to spec.',
    skills: ['Foundations', 'Columns & beams', 'Slab reinforcement', 'Bar bending schedules'],
    history: [
      { project: 'Adeyemi 5-Bedroom Duplex', year: '2026', rating: 4.7, note: 'Column and slab reinforcement.' },
      { project: 'Lekki Residence', year: '2025', rating: 4.5, note: 'Raft foundation steel.' },
    ],
  },
]

const INITIAL_TEAM: TeamMember[] = [
  { id: 'tm-1', name: 'Engr. Bala Yusuf', trade: 'Engineer', phone: '08020000001', project: 'Adeyemi 5-Bedroom Duplex', status: 'active', permissions: ['proof', 'progress', 'financials'] },
  { id: 'tm-2', name: 'Sunday Effiong', trade: 'Mason / Bricklayer', phone: '08020000002', project: 'Adeyemi 5-Bedroom Duplex', status: 'active', permissions: ['proof', 'progress'], artisanId: 'art-1', dayRate: 12000 },
  { id: 'tm-3', name: 'Ifeanyi Nwosu', trade: 'Carpenter', phone: '08020000003', project: 'Adeyemi 5-Bedroom Duplex', status: 'active', permissions: ['proof'], artisanId: 'art-3', dayRate: 13000 },
  { id: 'tm-4', name: 'Musa Danladi', trade: 'Electrician', phone: '08020000004', project: 'Grace Chapel Auditorium', status: 'active', permissions: ['proof', 'progress'], artisanId: 'art-2', dayRate: 15000 },
  { id: 'tm-5', name: 'Patrick Obi', trade: 'Plumber', phone: '08020000005', project: 'Grace Chapel Auditorium', status: 'invited', permissions: ['proof'], artisanId: 'art-4', dayRate: 12500 },
  { id: 'tm-6', name: 'Grace Aliyu', trade: 'Supervisor', phone: '08020000006', project: 'Adeyemi 5-Bedroom Duplex', status: 'active', permissions: ['proof', 'progress', 'financials'] },
]

/* -------------------------------------------------------------------------- */
/* Store (swap for API calls when the backend exists)                         */
/* -------------------------------------------------------------------------- */

interface WorkforceState {
  team: TeamMember[]
  saved: string[]
  /** Last invitation sent from the marketplace, shown as a confirmation banner. */
  lastInvite: { name: string; project: string } | null
}

let state: WorkforceState = { team: INITIAL_TEAM, saved: ['art-2'], lastInvite: null }
let nextId = 100
const listeners = new Set<() => void>()

const setState = (patch: Partial<WorkforceState>) => {
  state = { ...state, ...patch }
  listeners.forEach((listener) => listener())
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function useWorkforce() {
  return useSyncExternalStore(subscribe, () => state)
}

const actions = {
  addMember(input: Omit<TeamMember, 'id'>) {
    setState({ team: [{ ...input, id: `tm-${nextId++}` }, ...state.team] })
  },
  removeMember(id: string) {
    setState({ team: state.team.filter((member) => member.id !== id) })
  },
  togglePermission(id: string, permission: Permission) {
    setState({
      team: state.team.map((member) =>
        member.id !== id
          ? member
          : {
              ...member,
              permissions: member.permissions.includes(permission)
                ? member.permissions.filter((p) => p !== permission)
                : [...member.permissions, permission],
            },
      ),
    })
  },
  toggleSaved(artisanId: string) {
    setState({
      saved: state.saved.includes(artisanId)
        ? state.saved.filter((id) => id !== artisanId)
        : [...state.saved, artisanId],
    })
  },
  inviteArtisan(artisan: Artisan, project: string, permissions: Permission[], dayRate: number) {
    actions.addMember({
      name: artisan.name,
      trade: artisan.trade,
      phone: artisan.phone,
      project,
      status: 'invited',
      permissions,
      artisanId: artisan.id,
      dayRate,
    })
    setState({ lastInvite: { name: artisan.name, project } })
  },
  dismissInvite() {
    setState({ lastInvite: null })
  },
}

/* -------------------------------------------------------------------------- */
/* Shared UI                                                                  */
/* -------------------------------------------------------------------------- */

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#B85C12] focus:ring-2 focus:ring-[#B85C12]/15'

function Avatar({ name, size = 'md' }: { name: string; size?: 'md' | 'lg' }) {
  return (
    <div
      className={[
        'flex shrink-0 items-center justify-center rounded-full bg-[#9A4E26] font-bold text-white',
        size === 'lg' ? 'h-14 w-14 text-base' : 'h-11 w-11 text-sm',
      ].join(' ')}
      aria-hidden
    >
      {initials(name)}
    </div>
  )
}

function Modal({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string
  subtitle?: string
  onClose: () => void
  children: ReactNode
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#0B1F16]/50 p-4 backdrop-blur-[2px] sm:items-center"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#173629]">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
      {children}
    </label>
  )
}

function PermissionPicker({
  value,
  onChange,
}: {
  value: Permission[]
  onChange: (next: Permission[]) => void
}) {
  return (
    <div className="space-y-2">
      {PERMISSIONS.map((permission) => {
        const checked = value.includes(permission.key)
        return (
          <label
            key={permission.key}
            className={[
              'flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition',
              checked ? 'border-[#B85C12]/40 bg-[#FFF7F0]' : 'border-slate-200 hover:bg-slate-50',
            ].join(' ')}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() =>
                onChange(checked ? value.filter((p) => p !== permission.key) : [...value, permission.key])
              }
              className="mt-0.5 h-4 w-4 accent-[#B85C12]"
            />
            <span>
              <span className="block text-sm font-semibold text-slate-800">{permission.label}</span>
              <span className="block text-xs text-slate-500">{permission.hint}</span>
            </span>
          </label>
        )
      })}
    </div>
  )
}

function PrimaryButton({
  children,
  onClick,
  type = 'button',
  disabled,
  className = '',
}: {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-2xl bg-[#9A4E26] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition',
        'hover:bg-[#843F1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B85C12] focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      ].join(' ')}
    >
      {children}
    </button>
  )
}

/* ========================================================================== */
/* BUILD TEAM                                                                 */
/* ========================================================================== */

function AddMemberModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [trade, setTrade] = useState(TEAM_ROLES[0]!)
  const [project, setProject] = useState(CONTRACTOR_PROJECTS[0]!)
  const [permissions, setPermissions] = useState<Permission[]>(['proof'])
  const [touched, setTouched] = useState(false)

  const phoneOk = /^[0-9+\s-]{10,15}$/.test(phone.trim())
  const valid = name.trim().length > 1 && phoneOk

  const submit = (event: FormEvent) => {
    event.preventDefault()
    setTouched(true)
    if (!valid) return
    actions.addMember({
      name: name.trim(),
      trade,
      phone: phone.trim(),
      project,
      status: 'invited',
      permissions,
    })
    onClose()
  }

  return (
    <Modal
      title="Add team member"
      subtitle="They get an invitation by SMS. You decide what they can do before they join."
      onClose={onClose}
    >
      <form onSubmit={submit} className="space-y-4" noValidate>
        <Field label="Full name">
          <input
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Emeka Eze"
            autoFocus
          />
          {touched && name.trim().length <= 1 && <p className="mt-1 text-xs text-red-600">Enter their name.</p>}
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Role / trade">
            <select className={inputClass} value={trade} onChange={(e) => setTrade(e.target.value)}>
              {TEAM_ROLES.map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>
          </Field>
          <Field label="Assign to project">
            <select className={inputClass} value={project} onChange={(e) => setProject(e.target.value)}>
              {CONTRACTOR_PROJECTS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Phone number">
          <input
            className={inputClass}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="08012345678"
            inputMode="tel"
          />
          {touched && !phoneOk && <p className="mt-1 text-xs text-red-600">Enter a valid phone number.</p>}
        </Field>

        <div>
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            What can they do?
          </span>
          <PermissionPicker value={permissions} onChange={setPermissions} />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            Cancel
          </button>
          <PrimaryButton type="submit">
            <Send className="h-4 w-4" />
            Send invitation
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  )
}

function MemberCard({ member }: { member: TeamMember }) {
  const [confirmRemove, setConfirmRemove] = useState(false)
  const invited = member.status === 'invited'

  return (
    <article className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start gap-4">
        <Avatar name={member.name} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold text-[#173629]">{member.name}</h3>
          <p className="text-sm text-slate-500">{member.trade}</p>
        </div>
        <span
          className={[
            'rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide',
            invited ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700',
          ].join(' ')}
        >
          {invited ? 'Invited' : 'Active'}
        </span>
      </div>

      {/* Access: tap a chip to grant or revoke */}
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={`Access for ${member.name}`}>
        {PERMISSIONS.map((permission) => {
          const granted = member.permissions.includes(permission.key)
          const Icon = granted ? Unlock : Lock
          return (
            <button
              key={permission.key}
              type="button"
              aria-pressed={granted}
              title={granted ? `Revoke: ${permission.hint}` : `Grant: ${permission.hint}`}
              onClick={() => actions.togglePermission(member.id, permission.key)}
              className={[
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition',
                granted
                  ? 'bg-[#FDF1E7] text-[#9A4E26] hover:bg-[#FBE5D3]'
                  : 'border border-dashed border-slate-300 text-slate-400 hover:border-[#B85C12]/50 hover:text-[#9A4E26]',
              ].join(' ')}
            >
              <Icon className="h-3 w-3" />
              {permission.label}
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600">
        <span>{member.project}</span>
        <span className="inline-flex items-center gap-1.5 text-slate-500">
          <Phone className="h-3.5 w-3.5" />
          {member.phone}
        </span>
      </div>

      {member.dayRate !== undefined && member.permissions.includes('financials') === false && (
        <p className="mt-2 text-xs text-slate-400">Day rate {naira(member.dayRate)} · hidden from them</p>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        {invited ? (
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
            <Clock3 className="h-3.5 w-3.5" />
            Waiting for them to accept
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            On site
          </span>
        )}

        {confirmRemove ? (
          <span className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => actions.removeMember(member.id)}
              className="font-bold text-red-600 hover:underline"
            >
              Remove
            </button>
            <button type="button" onClick={() => setConfirmRemove(false)} className="font-semibold text-slate-500 hover:underline">
              Keep
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmRemove(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition hover:text-red-600"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {invited ? 'Cancel invite' : 'Remove'}
          </button>
        )}
      </div>
    </article>
  )
}

export function BuildTeamPage() {
  const { team } = useWorkforce()
  const { routes } = useWorkspaceRoutes()

  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'all' | MemberStatus>('all')
  const [project, setProject] = useState('all')
  const [adding, setAdding] = useState(false)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return team.filter(
      (member) =>
        (status === 'all' || member.status === status) &&
        (project === 'all' || member.project === project) &&
        (q === '' || `${member.name} ${member.trade} ${member.project}`.toLowerCase().includes(q)),
    )
  }, [team, query, status, project])

  const active = team.filter((m) => m.status === 'active').length
  const invited = team.length - active
  const projectsCovered = new Set(team.map((m) => m.project)).size
  const canSeeMoney = team.filter((m) => m.permissions.includes('financials')).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-[24px] bg-[#173629] px-6 py-7 text-white sm:px-8">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/[0.04]" />
        <div className="absolute -bottom-24 right-24 h-44 w-44 rounded-full bg-[#B85C12]/10" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/60">
              <Users className="h-4 w-4" />
              Workforce
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Build Team</h1>
            <p className="mt-2 text-sm leading-6 text-white/70">
              {team.length} members · you control who uploads proof, updates progress, and sees financials.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to={`${routes.projects}?tab=artisans`}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Store className="h-4 w-4" />
              Find artisans
            </Link>
            <PrimaryButton onClick={() => setAdding(true)} className="bg-[#B85C12] hover:bg-[#A0510F]">
              <Plus className="h-4 w-4" />
              Add Team Member
            </PrimaryButton>
          </div>
        </div>

        <dl className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ['Active on site', active],
            ['Invitations pending', invited],
            ['Projects covered', projectsCovered],
            ['Can see financials', canSeeMoney],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white/[0.07] px-4 py-3">
              <dd className="text-2xl font-bold">{value}</dd>
              <dt className="text-xs text-white/60">{label}</dt>
            </div>
          ))}
        </dl>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            className={`${inputClass} pl-10`}
            placeholder="Search by name, trade or project…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(['all', 'active', 'invited'] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setStatus(value)}
              aria-pressed={status === value}
              className={[
                'rounded-full px-4 py-2 text-sm font-semibold capitalize transition',
                status === value
                  ? 'bg-[#9A4E26] text-white'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
              ].join(' ')}
            >
              {value}
            </button>
          ))}
        </div>
        <select
          className={`${inputClass} lg:w-64`}
          value={project}
          onChange={(e) => setProject(e.target.value)}
          aria-label="Filter by project"
        >
          <option value="all">All projects</option>
          {CONTRACTOR_PROJECTS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Members */}
      {visible.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <Users className="mx-auto h-8 w-8 text-slate-300" />
          <p className="mt-3 text-sm font-semibold text-slate-700">No team members match.</p>
          <p className="mt-1 text-sm text-slate-500">Clear the filters, or invite someone new.</p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {visible.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      )}

      {adding && <AddMemberModal onClose={() => setAdding(false)} />}
    </div>
  )
}

/* ========================================================================== */
/* MARKETPLACE: Project Marketplace | Artisan Marketplace                      */
/* ========================================================================== */

function InviteModal({ artisan, onClose }: { artisan: Artisan; onClose: () => void }) {
  const [project, setProject] = useState(CONTRACTOR_PROJECTS[0]!)
  const [rate, setRate] = useState(String(artisan.dayRate))
  const [note, setNote] = useState('')
  const [permissions, setPermissions] = useState<Permission[]>(['proof', 'progress'])

  const rateNumber = Number(rate.replace(/[^0-9]/g, ''))

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!rateNumber) return
    actions.inviteArtisan(artisan, project, permissions, rateNumber)
    onClose()
  }

  return (
    <Modal
      title={`Invite ${artisan.name}`}
      subtitle={`${artisan.trade} · ${artisan.location}. They can accept or decline from their phone.`}
      onClose={onClose}
    >
      <form onSubmit={submit} className="space-y-4">
        <Field label="Project">
          <select className={inputClass} value={project} onChange={(e) => setProject(e.target.value)}>
            {CONTRACTOR_PROJECTS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </Field>

        <Field label="Offered day rate (₦)">
          <input className={inputClass} value={rate} onChange={(e) => setRate(e.target.value)} inputMode="numeric" />
          <p className="mt-1 text-xs text-slate-500">
            Listed rate is {naira(artisan.dayRate)}.
            {rateNumber > 0 && rateNumber !== artisan.dayRate && (
              <> Your offer is {rateNumber > artisan.dayRate ? 'above' : 'below'} it.</>
            )}
          </p>
        </Field>

        <Field label="Message (optional)">
          <textarea
            className={`${inputClass} min-h-[84px] resize-y`}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Scope, start date, anything they should know…"
          />
        </Field>

        <div>
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Site access once they join
          </span>
          <PermissionPicker value={permissions} onChange={setPermissions} />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            Cancel
          </button>
          <PrimaryButton type="submit" disabled={!rateNumber}>
            <Send className="h-4 w-4" />
            Send invitation
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  )
}

function ArtisanCard({
  artisan,
  onInvite,
}: {
  artisan: Artisan
  onInvite: (artisan: Artisan) => void
}) {
  const { team, saved } = useWorkforce()
  const [showHistory, setShowHistory] = useState(false)

  const membership = team.find((member) => member.artisanId === artisan.id)
  const isSaved = saved.includes(artisan.id)
  const availability = AVAILABILITY_META[artisan.availability]
  const { routes } = useWorkspaceRoutes()

  return (
    <article className="flex flex-col rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start gap-4">
        <Avatar name={artisan.name} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-lg font-bold text-[#173629]">{artisan.name}</h3>
            {artisan.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-emerald-600" aria-label="Verified" />}
          </div>
          <p className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#9A4E26]">
            <Wrench className="h-3.5 w-3.5" />
            {artisan.trade}
          </p>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {artisan.location}
            </span>
            <span className="inline-flex items-center gap-1 text-amber-600">
              <Star className="h-3.5 w-3.5 fill-current" />
              {artisan.rating.toFixed(1)} ({artisan.reviews})
            </span>
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${availability.className}`}
        >
          {availability.label}
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-3">
        {[
          [String(artisan.projects), 'Projects'],
          [`${artisan.years}y`, 'Experience'],
          [naira(artisan.dayRate), 'Day rate'],
        ].map(([value, label]) => (
          <div key={label} className="rounded-2xl border border-[#F3E1D0] bg-[#FFF8F1] px-3 py-3 text-center">
            <dd className="text-base font-bold text-[#173629]">{value}</dd>
            <dt className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">{label}</dt>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-sm leading-6 text-slate-600">{artisan.bio}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {artisan.skills.map((skill) => (
          <span key={skill} className="rounded-full bg-[#FDF1E7] px-3 py-1 text-xs font-semibold text-[#9A4E26]">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2.5">
        {membership ? (
          <Link
            to={routes.team}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-50 px-5 py-2.5 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100"
          >
            <CheckCircle2 className="h-4 w-4" />
            {membership.status === 'invited' ? 'Invited' : 'On your team'}
            <span className="hidden text-xs font-medium text-emerald-600/80 sm:inline">· {membership.project}</span>
          </Link>
        ) : (
          <PrimaryButton
            onClick={() => onInvite(artisan)}
            disabled={artisan.availability === 'booked'}
            className="flex-1 sm:flex-none"
          >
            <UserPlus className="h-4 w-4" />
            {artisan.availability === 'booked' ? 'Fully booked' : 'Invite to Project'}
          </PrimaryButton>
        )}

        <button
          type="button"
          onClick={() => setShowHistory((open) => !open)}
          aria-expanded={showHistory}
          className="inline-flex items-center gap-2 rounded-2xl border border-[#E8D3BF] px-4 py-2.5 text-sm font-bold text-[#9A4E26] transition hover:bg-[#FFF8F1]"
        >
          <History className="h-4 w-4" />
          View History
          <ChevronDown className={`h-4 w-4 transition ${showHistory ? 'rotate-180' : ''}`} />
        </button>

        <button
          type="button"
          onClick={() => actions.toggleSaved(artisan.id)}
          aria-pressed={isSaved}
          aria-label={isSaved ? `Remove ${artisan.name} from saved` : `Save ${artisan.name}`}
          className="rounded-2xl border border-[#E8D3BF] p-2.5 text-[#9A4E26] transition hover:bg-[#FFF8F1]"
        >
          {isSaved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
        </button>
      </div>

      {showHistory && (
        <div className="mt-4 rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Work history on Build OS</p>
          <ul className="mt-3 space-y-3">
            {artisan.history.map((job) => (
              <li key={`${job.project}-${job.year}`} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{job.project}</p>
                  <p className="text-xs text-slate-500">{job.note}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="inline-flex items-center gap-1 text-sm font-bold text-amber-600">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {job.rating.toFixed(1)}
                  </p>
                  <p className="text-xs text-slate-400">{job.year}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}

type SortKey = 'rating' | 'rate' | 'experience' | 'projects'

function ArtisanMarketplace() {
  const { saved, lastInvite } = useWorkforce()
  const { routes } = useWorkspaceRoutes()

  const [query, setQuery] = useState('')
  const [trade, setTrade] = useState('all')
  const [availability, setAvailability] = useState<'all' | Availability>('all')
  const [onlySaved, setOnlySaved] = useState(false)
  const [sort, setSort] = useState<SortKey>('rating')
  const [inviting, setInviting] = useState<Artisan | null>(null)

  const countFor = (t: string) => ARTISANS.filter((a) => t === 'all' || a.trade === t).length

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = ARTISANS.filter(
      (a) =>
        (trade === 'all' || a.trade === trade) &&
        (availability === 'all' || a.availability === availability) &&
        (!onlySaved || saved.includes(a.id)) &&
        (q === '' || `${a.name} ${a.trade} ${a.location} ${a.skills.join(' ')}`.toLowerCase().includes(q)),
    )
    const by: Record<SortKey, (a: Artisan, b: Artisan) => number> = {
      rating: (a, b) => b.rating - a.rating,
      rate: (a, b) => a.dayRate - b.dayRate,
      experience: (a, b) => b.years - a.years,
      projects: (a, b) => b.projects - a.projects,
    }
    return [...list].sort(by[sort])
  }, [query, trade, availability, onlySaved, sort, saved])

  return (
    <div className="space-y-5">
      {lastInvite && (
        <div
          role="status"
          className="flex items-start justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        >
          <p>
            Invitation sent to <strong>{lastInvite.name}</strong> for {lastInvite.project}.{' '}
            <Link to={routes.team} className="inline-flex items-center gap-1 font-bold underline-offset-2 hover:underline">
              Open Build Team <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </p>
          <button type="button" onClick={actions.dismissInvite} aria-label="Dismiss" className="text-emerald-600 hover:text-emerald-800">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          className={`${inputClass} rounded-2xl py-3.5 pl-11`}
          placeholder="Search artisans by trade, skill, name or location…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Trade chips */}
      <div className="flex flex-wrap gap-2.5">
        {['all', ...TRADES].map((t) => {
          const selected = trade === t
          return (
            <button
              key={t}
              type="button"
              aria-pressed={selected}
              onClick={() => setTrade(t)}
              className={[
                'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition',
                selected
                  ? 'bg-[#9A4E26] text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
              ].join(' ')}
            >
              {t === 'all' ? 'All trades' : t}
              <span className={selected ? 'text-white/80' : 'text-[#B85C12]'}>{countFor(t)}</span>
            </button>
          )
        })}
      </div>

      {/* Secondary controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          {visible.length} artisan{visible.length === 1 ? '' : 's'} · verified artisans have passed Build OS identity checks
        </p>
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            className={`${inputClass} !w-auto`}
            value={availability}
            onChange={(e) => setAvailability(e.target.value as 'all' | Availability)}
            aria-label="Availability"
          >
            <option value="all">Any availability</option>
            <option value="available">Available now</option>
            <option value="limited">Limited slots</option>
            <option value="booked">Fully booked</option>
          </select>
          <select
            className={`${inputClass} !w-auto`}
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            aria-label="Sort by"
          >
            <option value="rating">Top rated</option>
            <option value="rate">Lowest day rate</option>
            <option value="experience">Most experienced</option>
            <option value="projects">Most projects</option>
          </select>
          <button
            type="button"
            onClick={() => setOnlySaved((v) => !v)}
            aria-pressed={onlySaved}
            className={[
              'inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition',
              onlySaved ? 'bg-[#FDF1E7] text-[#9A4E26]' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
            ].join(' ')}
          >
            <Bookmark className="h-4 w-4" />
            Saved {saved.length}
          </button>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <Search className="mx-auto h-8 w-8 text-slate-300" />
          <p className="mt-3 text-sm font-semibold text-slate-700">No artisans match those filters.</p>
          <p className="mt-1 text-sm text-slate-500">Try another trade or clear the search.</p>
        </div>
      ) : (
        <div className="grid items-start gap-5 xl:grid-cols-2">
          {visible.map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} onInvite={setInviting} />
          ))}
        </div>
      )}

      {inviting && <InviteModal artisan={inviting} onClose={() => setInviting(null)} />}
    </div>
  )
}

export function MarketplacePage() {
  const [params, setParams] = useSearchParams()
  const tab = params.get('tab') === 'artisans' ? 'artisans' : 'projects'

  const select = (next: 'projects' | 'artisans') => {
    const copy = new URLSearchParams(params)
    if (next === 'artisans') copy.set('tab', 'artisans')
    else copy.delete('tab')
    setParams(copy, { replace: true })
  }

  const tabs = [
    { key: 'projects' as const, label: 'Project Marketplace', icon: Store, count: 2 },
    { key: 'artisans' as const, label: 'Artisan Marketplace', icon: Users, count: ARTISANS.length },
  ]

  return (
    <div className="space-y-6">
      <div role="tablist" aria-label="Marketplace" className="flex flex-wrap gap-3">
        {tabs.map(({ key, label, icon: Icon, count }) => {
          const selected = tab === key
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => select(key)}
              className={[
                'inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-bold transition',
                selected
                  ? 'bg-[#9A4E26] text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
              ].join(' ')}
            >
              <Icon className="h-4 w-4" />
              {label}
              <span className={selected ? 'text-white/80' : 'text-[#B85C12]'}>{count}</span>
            </button>
          )
        })}
      </div>

      {tab === 'projects' ? <AvailableProjects /> : <ArtisanMarketplace />}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Local helper: role-aware links (kept here so the file stays self-contained) */
/* -------------------------------------------------------------------------- */

function useWorkspaceRoutes() {
  const app = useAppRoutes()
  return {
    routes: {
      projects: app.to('projects'),
      team: app.to('team'),
    },
  }
}
