import {
  Home as HomeIcon,
  Globe2,
  Users,
  Boxes,
  ClipboardCheck,
  Award,
  ShieldCheck,
} from 'lucide-react'

import type { UserRole } from '@/types'

/**
 * Shared role metadata.
 *
 * This file is no longer used to render a role picker on Login/Register.
 * Role selection happens on /join, while the authenticated user's role
 * should come from AuthContext / the backend.
 *
 * Keep this metadata available for dashboards, navigation and other
 * role-aware UI that may need an icon or accent.
 */
export const roleMeta: Record<
  UserRole,
  {
    icon: typeof HomeIcon
    accent: 'brick' | 'teal' | 'amber'
  }
> = {
  client: {
    icon: HomeIcon,
    accent: 'brick',
  },

  diaspora_client: {
    icon: Globe2,
    accent: 'brick',
  },

  contractor: {
    icon: Users,
    accent: 'teal',
  },

  market_place: {
    icon: Boxes,
    accent: 'teal',
  },

  project_manager: {
    icon: ClipboardCheck,
    accent: 'amber',
  },

  professional: {
    icon: Award,
    accent: 'amber',
  },

  admin: {
    icon: ShieldCheck,
    accent: 'brick',
  },
}

export const accentClasses = {
  brick: {
    active: 'border-brick bg-brick-light text-brick',
    icon: 'text-brick',
  },

  teal: {
    active: 'border-teal bg-teal-light text-teal',
    icon: 'text-teal',
  },

  amber: {
    active: 'border-amber-dark bg-amber/10 text-amber-dark',
    icon: 'text-amber-dark',
  },
} as const

/**
 * Role order is retained for any role-aware UI that genuinely needs
 * to display roles.
 *
 * It is intentionally NOT used by Login or Register anymore.
 *
 * Admin is kept here for internal/admin-facing UI but should never be
 * presented as a public registration option.
 */
export const roleOrder: UserRole[] = [
  'client',
  'diaspora_client',
  'contractor',
  'market_place',
  'project_manager',
  'professional',
  'admin',
]

/**
 * Dashboard destinations.
 *
 * Login should eventually use the authenticated user's role from
 * AuthContext rather than accepting a role from the UI.
 *
 * Registration currently uses the selected account type from /join.
 */
export const roleHomePath: Record<UserRole, string> = {
  client: '/app/client',

  diaspora_client: '/app/diaspora',

  contractor: '/app/contractor',

  market_place: '/app/market',

  project_manager: '/app/pm',

  professional: '/app/professional',

  admin: '/app/admin',
}