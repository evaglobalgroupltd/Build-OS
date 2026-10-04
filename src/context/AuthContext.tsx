import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { User, UserRole, ProfessionalType } from '@/types'
import { demoUsers } from '@/data/mockData'

interface AuthContextValue {
  user: User
  role: UserRole
  isAuthenticated: boolean
  setRole: (role: UserRole) => void
  logout: () => void
  login: (role: UserRole, professionalType?: ProfessionalType) => void
  /** Saves edits from the Profile page. Replace with an API call when the backend exists. */
  updateProfile: (patch: ProfilePatch) => void
}

export type ProfilePatch = Partial<Pick<User, 'fullName' | 'phone' | 'country' | 'company'>>

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('')

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('client')
  const [professionalType, setProfessionalType] = useState<ProfessionalType | undefined>(
    undefined
  )
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [edits, setEdits] = useState<Partial<Record<UserRole, ProfilePatch>>>({})

  const value = useMemo<AuthContextValue>(() => {
    const baseUser = demoUsers[role]

    // Only 'professional' carries a professionalType — every other role
    // (contractor, project_manager, client, market_place, admin) already
    // is its own specific UserRole, so there's nothing to attach.
    const merged: User = { ...baseUser, ...edits[role] }
    if (edits[role]?.fullName) merged.avatarInitials = initialsOf(merged.fullName) || baseUser.avatarInitials

    const user: User =
      role === 'professional' && professionalType ? { ...merged, professionalType } : merged

    return {
      user,
      role,
      isAuthenticated,
      setRole: (nextRole: UserRole) => {
        setRoleState(nextRole)
        if (nextRole !== 'professional') {
          setProfessionalType(undefined)
        }
      },
      logout: () => setIsAuthenticated(false),
      updateProfile: (patch: ProfilePatch) =>
        setEdits((current) => ({ ...current, [role]: { ...current[role], ...patch } })),
      login: (nextRole: UserRole, nextProfessionalType?: ProfessionalType) => {
        setRoleState(nextRole)
        setProfessionalType(nextRole === 'professional' ? nextProfessionalType : undefined)
        setIsAuthenticated(true)
      },
    }
  }, [role, professionalType, isAuthenticated, edits])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}