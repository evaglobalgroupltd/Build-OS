/* =============================================================================
 * src/pages/client/clientRoutes.ts
 *
 * Single source of truth for client paths. Every entry must match a <Route> in
 * AppRoutes.tsx and (where relevant) an item in navByRole.client.
 * ========================================================================== */

import { useMemo } from 'react'

import { projects } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'

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
  dispute: (id: string | number) => `/app/client/disputes/${id}`,
  fundProject: '/app/client/escrow/fund',
  passportSection: (slug: string) => `/app/client/passport/${slug}`,

  /* Project Studio = the questionnaire route in AppRoutes. */
  studio: '/onboarding',

  /* Old name for escrow, kept so nothing importing it breaks. */
  vault: '/app/client/escrow',
} as const

/**
 * Turns a project id into a link that can never dead-end.
 *
 * - If the project belongs to the signed-in client, returns its detail page.
 * - Otherwise returns the portfolio list (instead of a "project not found").
 *
 * This matters while pages still use placeholder ids: nothing 404s, and once
 * real ids replace the placeholders the links resolve to the real project.
 */
export function useProjectHref() {
  const { user } = useAuth()
  const fullName = user?.fullName ?? ''

  return useMemo(() => {
    const mine = projects.filter((p) => p.clientName === fullName)

    return (projectId?: string | number): string => {
      const found = mine.find((p) => String(p.id) === String(projectId))
      return found ? CLIENT_ROUTES.project(found.id) : CLIENT_ROUTES.projects
    }
  }, [fullName])
}