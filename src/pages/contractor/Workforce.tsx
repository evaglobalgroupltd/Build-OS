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

import { useMemo, useState, useSyncExternalStore, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
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

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Modal } from '@/components/ui/Modal'
import { RoleLink } from '@/components/ui/ModuleActions'
import { FormField, SelectField, TextAreaField } from '@/components/forms/FormField'
import { toast } from '@/context/ToastContext'
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

const AVAILABILITY_META: Record<Availability, { label: string; tone: 'teal' | 'amber' | 'neutral' }> = {
  available: { label: 'Available now', tone: 'teal' },
  limited: { label: 'Limited slots', tone: 'amber' },
  booked: { label: 'Fully booked', tone: 'neutral' },
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
    const member = state.team.find((m) => m.id === id)
    setState({ team: state.team.filter((m) => m.id !== id) })
    if (member) toast.info(member.status === 'invited' ? 'Invitation cancelled' : 'Removed from team', member.name)
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
    toast.info(state.saved.includes(artisanId) ? 'Removed from saved artisans' : 'Saved to your shortlist')
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
    toast.success('Invitation sent', `${artisan.name} · ${project}`)
  },
  dismissInvite() {
    setState({ lastInvite: null })
  },
}

/* -------------------------------------------------------------------------- */
/* Shared bits                                                                */
/* -------------------------------------------------------------------------- */

const chipClass = (selected: boolean) =>
  [
    'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/20',
    selected ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink/65 hover:border-ink/25 hover:text-ink',
  ].join(' ')

function Avatar({ name, size = 'md' }: { name: string; size?: 'md' | 'lg' }) {
  return (
    <div
      className={[
        'flex shrink-0 items-center justify-center rounded-full bg-ink font-semibold text-white',
        size === 'lg' ? 'h-14 w-14 text-base' : 'h-11 w-11 text-sm',
      ].join(' ')}
      aria-hidden
    >
      {initials(name)}
    </div>
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
              checked ? 'border-teal/30 bg-teal-light' : 'border-line hover:bg-paper',
            ].join(' ')}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() =>
                onChange(checked ? value.filter((p) => p !== permission.key) : [...value, permission.key])
              }
              className="mt-0.5 h-4 w-4 accent-teal"
            />
            <span>
              <span className="block text-sm font-semibold text-ink">{permission.label}</span>
              <span className="block text-xs text-ink/50">{permission.hint}</span>
            </span>
          </label>
        )
      })}
    </div>
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

  const nameError = name.trim().length > 1 ? undefined : 'Enter their name.'
  const phoneError = /^[0-9+\s-]{10,15}$/.test(phone.trim()) ? undefined : 'Enter a valid phone number.'

  const submit = (event: FormEvent) => {
    event.preventDefault()
    setTouched(true)
    if (nameError || phoneError) return
    actions.addMember({ name: name.trim(), trade, phone: phone.trim(), project, status: 'invited', permissions })
    toast.success('Invitation sent', `${name.trim()} · ${project}`)
    onClose()
  }

  return (
    <Modal
      title="Add team member"
      subtitle="They get an invitation by SMS. You decide what they can do before they join."
      onClose={onClose}
    >
      <form onSubmit={submit} className="space-y-4" noValidate>
        <FormField
          label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Emeka Eze"
          error={touched ? nameError : undefined}
          autoFocus
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField label="Role / trade" value={trade} onChange={(e) => setTrade(e.target.value)}>
            {TEAM_ROLES.map((role) => (
              <option key={role}>{role}</option>
            ))}
          </SelectField>
          <SelectField label="Assign to project" value={project} onChange={(e) => setProject(e.target.value)}>
            {CONTRACTOR_PROJECTS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </SelectField>
        </div>

        <FormField
          label="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="08012345678"
          inputMode="tel"
          error={touched ? phoneError : undefined}
        />

        <div>
          <span className="mb-1.5 block text-xs font-medium text-ink/60">What can they do?</span>
          <PermissionPicker value={permissions} onChange={setPermissions} />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" icon={<Send className="h-4 w-4" />}>
            Send invitation
          </Button>
        </div>
      </form>
    </Modal>
  )
}

function MemberCard({ member }: { member: TeamMember }) {
  const [confirmRemove, setConfirmRemove] = useState(false)
  const invited = member.status === 'invited'

  return (
    <article className="rounded-2xl border border-line bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start gap-4">
        <Avatar name={member.name} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-ink">{member.name}</h3>
          <p className="text-sm text-ink/50">{member.trade}</p>
        </div>
        <Badge tone={invited ? 'amber' : 'teal'} dot>
          {invited ? 'Invited' : 'Active'}
        </Badge>
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
                  ? 'bg-teal-light text-teal hover:bg-teal/15'
                  : 'border border-dashed border-line text-ink/40 hover:border-ink/30 hover:text-ink/70',
              ].join(' ')}
            >
              <Icon className="h-3 w-3" />
              {permission.label}
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-ink/60">
        <span>{member.project}</span>
        <span className="inline-flex items-center gap-1.5 text-ink/45">
          <Phone className="h-3.5 w-3.5" />
          {member.phone}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
        {invited ? (
          <span className="inline-flex items-center gap-1.5 text-xs text-ink/50">
            <Clock3 className="h-3.5 w-3.5" />
            Waiting for them to accept
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs text-teal">
            <CheckCircle2 className="h-3.5 w-3.5" />
            On site
          </span>
        )}

        {confirmRemove ? (
          <span className="flex items-center gap-3 text-xs">
            <button type="button" onClick={() => actions.removeMember(member.id)} className="font-semibold text-brick hover:underline">
              Remove
            </button>
            <button type="button" onClick={() => setConfirmRemove(false)} className="font-medium text-ink/50 hover:underline">
              Keep
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmRemove(true)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-ink/40 transition hover:text-brick"
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
    <div className="space-y-7">
      {/* Hero (same pattern as My Bids) */}
      <section className="relative overflow-hidden rounded-[24px] bg-[#173629] px-6 py-7 text-white sm:px-8 sm:py-8">
        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-white/[0.035]" />
        <div className="absolute -bottom-32 right-16 h-64 w-64 rounded-full bg-[#B85C12]/10" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
              <Users className="h-4 w-4" />
              Workforce
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Build Team</h1>
            <p className="mt-2 text-sm leading-6 text-white/65">
              {team.length} members · you control who uploads proof, updates progress, and sees financials.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <RoleLink
              route="projects"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-xs font-semibold text-white transition hover:bg-white/10"
              to="/app/contractor/available?tab=artisans"
            >
              <Store className="h-4 w-4" />
              Find artisans
            </RoleLink>
            <button
              type="button"
              onClick={() => setAdding(true)}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-xs font-semibold text-ink transition hover:bg-white/90"
            >
              <Plus className="h-4 w-4" />
              Add Team Member
            </button>
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
              <dd className="text-2xl font-semibold">{value}</dd>
              <dt className="text-xs text-white/55">{label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
          <input
            aria-label="Search team"
            className="w-full rounded-md border border-line bg-white py-2.5 pl-10 pr-3 text-sm text-ink placeholder:text-ink/30 focus:outline-none"
            placeholder="Search by name, trade or project…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(['all', 'active', 'invited'] as const).map((value) => (
            <button key={value} type="button" onClick={() => setStatus(value)} aria-pressed={status === value} className={`${chipClass(status === value)} capitalize`}>
              {value}
            </button>
          ))}
        </div>
        <select
          className="rounded-md border border-line bg-white px-3 py-2.5 text-sm text-ink focus:outline-none lg:w-64"
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

      {visible.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No team members match"
          description="Clear the filters, or invite someone new."
          action={
            <Button size="sm" icon={<Plus className="h-4 w-4" />} onClick={() => setAdding(true)}>
              Add team member
            </Button>
          }
        />
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
        <SelectField label="Project" value={project} onChange={(e) => setProject(e.target.value)}>
          {CONTRACTOR_PROJECTS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </SelectField>

        <FormField
          label="Offered day rate (₦)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          inputMode="numeric"
          error={rateNumber ? undefined : 'Enter a day rate.'}
        />
        <p className="-mt-2 text-xs text-ink/40">
          Listed rate is {naira(artisan.dayRate)}.
          {rateNumber > 0 && rateNumber !== artisan.dayRate && <> Your offer is {rateNumber > artisan.dayRate ? 'above' : 'below'} it.</>}
        </p>

        <TextAreaField
          label="Message (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Scope, start date, anything they should know…"
        />

        <div>
          <span className="mb-1.5 block text-xs font-medium text-ink/60">Site access once they join</span>
          <PermissionPicker value={permissions} onChange={setPermissions} />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!rateNumber} icon={<Send className="h-4 w-4" />}>
            Send invitation
          </Button>
        </div>
      </form>
    </Modal>
  )
}

function ArtisanCard({ artisan, onInvite }: { artisan: Artisan; onInvite: (artisan: Artisan) => void }) {
  const { team, saved } = useWorkforce()
  const [showHistory, setShowHistory] = useState(false)

  const membership = team.find((member) => member.artisanId === artisan.id)
  const isSaved = saved.includes(artisan.id)
  const availability = AVAILABILITY_META[artisan.availability]

  return (
    <article className="flex flex-col rounded-2xl border border-line bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start gap-4">
        <Avatar name={artisan.name} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-lg font-semibold text-ink">{artisan.name}</h3>
            {artisan.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-teal" aria-label="Verified" />}
          </div>
          <p className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-medium text-ink/70">
            <Wrench className="h-3.5 w-3.5" />
            {artisan.trade}
          </p>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink/50">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {artisan.location}
            </span>
            <span className="inline-flex items-center gap-1 text-amber-dark">
              <Star className="h-3.5 w-3.5 fill-current" />
              {artisan.rating.toFixed(1)} ({artisan.reviews})
            </span>
          </p>
        </div>
        <Badge tone={availability.tone} dot>
          {availability.label}
        </Badge>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-3">
        {[
          [String(artisan.projects), 'Projects'],
          [`${artisan.years}y`, 'Experience'],
          [naira(artisan.dayRate), 'Day rate'],
        ].map(([value, label]) => (
          <div key={label} className="rounded-xl border border-line bg-paper px-3 py-3 text-center">
            <dd className="text-base font-semibold text-ink">{value}</dd>
            <dt className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink/45">{label}</dt>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-sm leading-6 text-ink/65">{artisan.bio}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {artisan.skills.map((skill) => (
          <span key={skill} className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-medium text-ink/65">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2.5">
        {membership ? (
          <RoleLink
            route="team"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-light px-5 py-2.5 text-sm font-semibold text-teal transition hover:bg-teal/15"
          >
            <CheckCircle2 className="h-4 w-4" />
            {membership.status === 'invited' ? 'Invited' : 'On your team'}
            <span className="hidden text-xs font-medium opacity-70 sm:inline">· {membership.project}</span>
          </RoleLink>
        ) : (
          <Button
            onClick={() => onInvite(artisan)}
            disabled={artisan.availability === 'booked'}
            icon={<UserPlus className="h-4 w-4" />}
            className="flex-1 sm:flex-none"
          >
            {artisan.availability === 'booked' ? 'Fully booked' : 'Invite to Project'}
          </Button>
        )}

        <Button
          variant="secondary"
          onClick={() => setShowHistory((open) => !open)}
          aria-expanded={showHistory}
          icon={<History className="h-4 w-4" />}
          iconRight={<ChevronDown className={`h-4 w-4 transition ${showHistory ? 'rotate-180' : ''}`} />}
        >
          View History
        </Button>

        <Button
          variant="secondary"
          onClick={() => actions.toggleSaved(artisan.id)}
          aria-pressed={isSaved}
          aria-label={isSaved ? `Remove ${artisan.name} from saved` : `Save ${artisan.name}`}
        >
          {isSaved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
        </Button>
      </div>

      {showHistory && (
        <div className="mt-4 rounded-xl bg-paper p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/45">Work history on Build OS</p>
          <ul className="mt-3 space-y-3">
            {artisan.history.map((job) => (
              <li key={`${job.project}-${job.year}`} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{job.project}</p>
                  <p className="text-xs text-ink/50">{job.note}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="inline-flex items-center gap-1 text-sm font-semibold text-amber-dark">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {job.rating.toFixed(1)}
                  </p>
                  <p className="text-xs text-ink/40">{job.year}</p>
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

  const selectClass = 'rounded-md border border-line bg-white px-3 py-2.5 text-sm text-ink focus:outline-none'

  return (
    <div className="space-y-5">
      {lastInvite && (
        <div role="status" className="flex items-start justify-between gap-4 rounded-xl border border-teal/25 bg-teal-light px-4 py-3 text-sm text-teal">
          <p>
            Invitation sent to <strong>{lastInvite.name}</strong> for {lastInvite.project}.{' '}
            <RoleLink route="team" className="inline-flex items-center gap-1 font-semibold underline-offset-2 hover:underline">
              Open Build Team <ArrowRight className="h-3.5 w-3.5" />
            </RoleLink>
          </p>
          <button type="button" onClick={actions.dismissInvite} aria-label="Dismiss" className="opacity-70 hover:opacity-100">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
        <input
          aria-label="Search artisans"
          className="w-full rounded-xl border border-line bg-white py-3.5 pl-11 pr-4 text-sm text-ink placeholder:text-ink/30 focus:outline-none"
          placeholder="Search artisans by trade, skill, name or location…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2.5">
        {['all', ...TRADES].map((t) => (
          <button key={t} type="button" aria-pressed={trade === t} onClick={() => setTrade(t)} className={chipClass(trade === t)}>
            {t === 'all' ? 'All trades' : t}
            <span className={trade === t ? 'text-white/70' : 'text-ink/40'}>{countFor(t)}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink/50">
          {visible.length} artisan{visible.length === 1 ? '' : 's'} · verified artisans have passed Build OS identity checks
        </p>
        <div className="flex flex-wrap items-center gap-2.5">
          <select className={selectClass} value={availability} onChange={(e) => setAvailability(e.target.value as 'all' | Availability)} aria-label="Availability">
            <option value="all">Any availability</option>
            <option value="available">Available now</option>
            <option value="limited">Limited slots</option>
            <option value="booked">Fully booked</option>
          </select>
          <select className={selectClass} value={sort} onChange={(e) => setSort(e.target.value as SortKey)} aria-label="Sort by">
            <option value="rating">Top rated</option>
            <option value="rate">Lowest day rate</option>
            <option value="experience">Most experienced</option>
            <option value="projects">Most projects</option>
          </select>
          <button type="button" onClick={() => setOnlySaved((v) => !v)} aria-pressed={onlySaved} className={chipClass(onlySaved)}>
            <Bookmark className="h-3.5 w-3.5" />
            Saved {saved.length}
          </button>
        </div>
      </div>

      {visible.length === 0 ? (
        <EmptyState icon={Search} title="No artisans match those filters" description="Try another trade or clear the search." />
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
            <button key={key} type="button" role="tab" aria-selected={selected} onClick={() => select(key)} className={`${chipClass(selected)} px-5 py-3 text-sm`}>
              <Icon className="h-4 w-4" />
              {label}
              <span className={selected ? 'text-white/70' : 'text-ink/40'}>{count}</span>
            </button>
          )
        })}
      </div>

      {tab === 'projects' ? <AvailableProjects /> : <ArtisanMarketplace />}
    </div>
  )
}
