// src/config/roles.ts

/**
 * Canonical app-role type, re-exported under the `AppRole` name used by
 * layout components (Sidebar, Topbar) and role-aware UI.
 *
 * The source of truth for the role union itself stays in `@/types` as
 * `UserRole` — this file exists so layout code can import `AppRole`
 * without reaching into the core types module directly.
 */
export type { UserRole as AppRole } from '@/types'