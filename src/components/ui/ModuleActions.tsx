import type { ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

import { useAppRoutes, type RouteKey } from '@/config/appRoutes'

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
}

export function RoleLink({ route, sub, to, children, ...rest }: RoleLinkProps) {
  const routes = useAppRoutes()
  const target = to ?? (route ? routes.to(route, sub) : routes.to('overview'))

  return (
    <Link to={target} {...rest}>
      {children}
    </Link>
  )
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

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