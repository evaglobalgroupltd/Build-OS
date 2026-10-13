import type { ButtonHTMLAttributes } from 'react'
import { Link, useLocation, type LinkProps } from 'react-router-dom'

import { useAppRoutes, type RouteKey } from '@/config/appRoutes'
import { toast, type ToastTone } from '@/context/ToastContext'

/* =============================================================================
 * Drop-in replacements for <button> in module pages. The wire-buttons script
 * swaps dead buttons for these, keeping the existing className/aria attributes.
 *
 *  RoleLink     navigates. Role-aware via `route`, or literal via `to`.
 *  PrintButton  "Export ..." actions: opens the browser print dialog, which
 *               can save the page as a PDF. Works with no backend.
 *  SoonButton   actions that need a backend (upload, approve, download...).
 *               Visibly inactive with a "Coming soon" tooltip, so nothing is
 *               silently dead. Replace with a real handler when the API exists.
 * ========================================================================== */

type RoleLinkProps = Omit<LinkProps, 'to'> & {
  /** Concept to resolve for the signed-in role (see config/appRoutes.ts). */
  route?: RouteKey
  /** Optional sub-path under that concept, e.g. "transactions" or "current/history". */
  sub?: string
  /** Literal target (absolute, or relative to the current route). Wins over `route`. */
  to?: string
  /** Used when this role has no `route`/`sub` page, e.g. a contractor's own company page vs. a client viewing one. */
  fallbackRoute?: RouteKey
  fallbackSub?: string
}

export function RoleLink({ route, sub, to, fallbackRoute, fallbackSub, children, ...rest }: RoleLinkProps) {
  const routes = useAppRoutes()
  const { pathname } = useLocation()

  let key = route
  let subPath = sub
  if (!to && key && !routes.can(key, subPath) && fallbackRoute) {
    key = fallbackRoute
    subPath = fallbackSub
  }

  // A role that has no such page never gets a button that goes nowhere.
  if (!to && key && !routes.can(key, subPath)) return null

  const target = to ?? (key ? routes.to(key, subPath) : routes.to('overview'))

  // ...and never a button that leads back to the page you are already on.
  if (key && !to && target.split('?')[0].replace(/\/$/, '') === pathname.replace(/\/$/, '')) return null

  return (
    <Link to={target} {...rest}>
      {children}
    </Link>
  )
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

type ActionProps = ButtonProps & {
  /** Confirmation shown after the click, e.g. "Milestone approved". */
  message: string
  description?: string
  tone?: ToastTone
}

/** In-page action. Replace `onClick` with a real API call when the backend exists. */
export function ActionButton({ message, description, tone = 'success', children, onClick, ...rest }: ActionProps) {
  return (
    <button
      type="button"
      {...rest}
      onClick={(event) => {
        onClick?.(event)
        toast[tone](message, description)
      }}
    >
      {children}
    </button>
  )
}

export function PrintButton({ children, onClick, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      onClick={(event) => {
        onClick?.(event)
        window.print()
      }}
    >
      {children}
    </button>
  )
}

export function SoonButton({ children, className = '', ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      aria-disabled="true"
      title="Coming soon"
      data-soon="true"
      onClick={(event) => event.preventDefault()}
      className={`${className} cursor-not-allowed opacity-60`}
    >
      {children}
    </button>
  )
}