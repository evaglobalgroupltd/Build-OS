/* =============================================================================
 * src/config/appRoutes.ts   (v3)
 *
 * Shared module pages (DisputeList, Transactions, MaterialRequests...) are used
 * by several roles, so they ask for a *concept* and get the right path:
 *
 *   routes.to('procurement', 'new')   client -> /app/client/procurement/new
 *
 * What changed in v3
 *  - The role now comes from the URL you are on (/app/client/... => client),
 *    falling back to the signed-in role. A link can no longer jump to "/" because
 *    the auth role string didn't match a key here.
 *  - In development, a console warning explains exactly why a link fell back to
 *    the dashboard (unknown role, or that role has no such section).
 *
 * Reminder: a link only works if a <Route> exists for it. If a click lands on the
 * dashboard, the route is missing from your router (the "/app/client/*" fallback
 * redirects to the overview). See clientHubs.tsx for the client route table.
 * ========================================================================== */

import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { useAuth } from '@/context/AuthContext'
import type { UserRole } from '@/types'

export type RouteKey =
  | 'overview'
  | 'projects'
  | 'money' //        escrow (client/admin) or payments (contractor/market/professional)
  | 'procurement'
  | 'reports'
  | 'disputes'
  | 'milestones'
  | 'evidence'
  | 'inspections'
  | 'documents'
  | 'messages'
  | 'updates'
  | 'passport'
  | 'decisions'
  | 'profile'
  | 'team' //         contractor's build team

const BASE: Record<UserRole, string> = {
  client: '/app/client',
  diaspora_client: '/app/client',
  contractor: '/app/contractor',
  market_place: '/app/market',
  project_manager: '/app/pm',
  professional: '/app/professional',
  admin: '/app/admin',
}

const ROLE_BY_BASE: Record<string, UserRole> = Object.fromEntries(
  (Object.entries(BASE) as [UserRole, string][])
    .filter(([role]) => role !== 'diaspora_client') // shares /app/client with 'client'
    .map(([role, base]) => [base, role]),
)

/** Section path per role, relative to BASE. Omitted = that role has no such section. */
const CLIENT_SECTIONS: Partial<Record<RouteKey, string>> = {
  profile: 'profile',
  projects: 'projects',
  money: 'escrow',
  procurement: 'procurement',
  reports: 'reports',
  disputes: 'disputes',
  milestones: 'milestones',
  evidence: 'evidence',
  documents: 'documents',
  messages: 'messages',
  updates: 'updates',
  passport: 'passport',
  decisions: 'decisions',
}

const SECTIONS: Record<UserRole, Partial<Record<RouteKey, string>>> = {
  client: CLIENT_SECTIONS,
  diaspora_client: CLIENT_SECTIONS,
  contractor: {
    profile: 'profile',
    projects: 'available',
    team: 'team',
    money: 'payments',
    procurement: 'materials',
    reports: 'reports',
    disputes: 'disputes',
    milestones: 'milestones',
    messages: 'messages',
    updates: 'updates',
    decisions: 'decisions',
    documents: 'documents',
    evidence: 'evidence',
  },
  market_place: {
    profile: 'profile',
    projects: 'orders',
    money: 'payments',
    procurement: 'orders',
    disputes: 'disputes',
    messages: 'messages',
    updates: 'updates',
    decisions: 'decisions',
    documents: 'documents',
  },
  project_manager: {
    profile: 'profile',
    projects: 'projects',
    reports: 'reports',
    milestones: 'milestones',
    evidence: 'evidence',
    inspections: 'inspections',
    messages: 'messages',
    updates: 'updates',
    documents: 'documents',
  },
  professional: {
    profile: 'profile',
    projects: 'invitations',
    money: 'payments',
    messages: 'messages',
    updates: 'updates',
    decisions: 'decisions',
    documents: 'documents',
  },
  admin: {
    profile: 'profile',
    projects: 'projects',
    money: 'escrow',
    procurement: 'procurement',
    reports: 'reports',
    disputes: 'disputes',
    evidence: 'compliance',
    documents: 'documents',
    messages: 'messages',
    updates: 'updates',
    decisions: 'decisions',
  },
}

/**
 * Sub-pages each role really has, per concept. Module pages ask for things like
 * routes.to('disputes', 'current/evidence'); a sub-path only gets appended when it is
 * listed here, otherwise the link lands on the section's main page instead of a dead
 * route. ":id" matches any single segment (the demo pages use "current" as a stand-in id).
 * Client has every sub-page, so it is unrestricted.
 *
 * Adding a nested <Route> for a role? Add its sub-path here too.
 */
const COMMON_SUBS: Partial<Record<RouteKey, string[]>> = {
  updates: ['notifications', 'preferences'],
  documents: ['upload', ':id', ':id/history'],
  disputes: ['new', ':id', ':id/evidence', ':id/responses', ':id/resolution'],
}

const SUBS: Partial<Record<UserRole, Partial<Record<RouteKey, string[]>>>> = {
  contractor: {
    ...COMMON_SUBS,
    money: ['transactions', 'requests'],
    procurement: ['new'],
    milestones: [':id'],
    evidence: [':id'],
  },
  market_place: {
    ...COMMON_SUBS,
    money: ['transactions', 'requests'],
  },
  project_manager: {
    ...COMMON_SUBS,
    evidence: [':id', ':id/review'],
  },
  professional: {
    ...COMMON_SUBS,
    money: ['transactions', 'requests'],
  },
  admin: {
    ...COMMON_SUBS,
    money: ['transactions', 'approvals', 'requests', 'frozen', 'refunds'],
    reports: ['financial', 'audit', 'compliance', 'projects'],
    evidence: ['audit-logs', 'settings'],
  },
}

const CLIENT_ROLES = new Set<UserRole>(['client', 'diaspora_client'])

function subAllowed(role: UserRole, key: RouteKey, sub: string): boolean {
  if (CLIENT_ROLES.has(role)) return true
  const normalized = sub
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .map((seg) => (seg === 'current' ? ':id' : seg))
    .join('/')
  return (SUBS[role]?.[key] ?? []).some((pattern) => {
    const p = pattern.split('/')
    const n = normalized.split('/')
    return p.length === n.length && p.every((seg, i) => seg === ':id' ? n[i] !== '' : seg === n[i])
  })
}

const isDev = Boolean((import.meta as unknown as { env?: { DEV?: boolean } }).env?.DEV)

function warn(message: string) {
  if (isDev) console.warn(`[appRoutes] ${message}`)
}

/** Pure version (usable outside React). */
export function routeFor(role: UserRole, key: RouteKey, sub?: string): string {
  const base = BASE[role]

  if (!base) {
    warn(`Unknown role "${String(role)}". Falling back to /app. Valid roles: ${Object.keys(BASE).join(', ')}`)
    return '/app'
  }

  if (key === 'overview') return base

  const section = SECTIONS[role]?.[key]
  if (!section) {
    warn(`Role "${role}" has no "${key}" section. Sending to its dashboard (${base}).`)
    return base
  }

  const parts = [base, section]
  if (sub) {
    if (subAllowed(role, key, sub)) parts.push(sub.replace(/^\/+|\/+$/g, ''))
    else warn(`Role "${role}" has no "${key}/${sub}" page, so the link goes to "${key}" instead.`)
  }

  return parts.join('/')
}

export function hasRoute(role: UserRole, key: RouteKey): boolean {
  return key === 'overview' || Boolean(SECTIONS[role]?.[key])
}

/** /app/client/escrow/fund -> "client" (null if the path isn't under a known role). */
export function roleFromPath(pathname: string): UserRole | null {
  const match = pathname.match(/^\/app\/[^/]+/)
  return match ? (ROLE_BY_BASE[match[0]] ?? null) : null
}

export function useAppRoutes() {
  const { role: authRole } = useAuth()
  const { pathname } = useLocation()

  // Where you are wins over who you are: on /app/client/* links stay in the client area.
  const role = (roleFromPath(pathname) ?? authRole) as UserRole

  return useMemo(
    () => ({
      role,
      to: (key: RouteKey, sub?: string) => routeFor(role, key, sub),
      has: (key: RouteKey) => hasRoute(role, key),
    }),
    [role],
  )
}