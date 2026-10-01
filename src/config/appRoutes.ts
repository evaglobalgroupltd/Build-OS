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

const BASE: Record<UserRole, string> = {
  client: '/app/client',
  contractor: '/app/contractor',
  market_place: '/app/market',
  project_manager: '/app/pm',
  professional: '/app/professional',
  admin: '/app/admin',
}

const ROLE_BY_BASE: Record<string, UserRole> = Object.fromEntries(
  (Object.entries(BASE) as [UserRole, string][]).map(([role, base]) => [base, role]),
)

/** Section path per role, relative to BASE. Omitted = that role has no such section. */
const SECTIONS: Record<UserRole, Partial<Record<RouteKey, string>>> = {
  client: {
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
  },
  contractor: {
    projects: 'available',
    money: 'payments',
    procurement: 'materials',
    reports: 'reports',
    disputes: 'disputes',
    milestones: 'milestones',
  },
  market_place: {
    money: 'payments',
    procurement: 'orders',
    disputes: 'disputes',
  },
  project_manager: {
    projects: 'projects',
    reports: 'reports',
    milestones: 'milestones',
    evidence: 'evidence',
    inspections: 'inspections',
  },
  professional: {
    money: 'payments',
  },
  admin: {
    projects: 'projects',
    money: 'escrow',
    procurement: 'procurement',
    reports: 'reports',
    disputes: 'disputes',
  },
}

/** Roles that have nested hub routes (so sub-paths resolve). Add a role when its hubs exist. */
const SUB_ROLES = new Set<UserRole>(['client'])

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
    if (SUB_ROLES.has(role)) parts.push(sub.replace(/^\/+|\/+$/g, ''))
    else warn(`Role "${role}" has no sub-pages yet, so "${key}/${sub}" links to "${key}" instead.`)
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