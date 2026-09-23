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
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('client')
  const [professionalType, setProfessionalType] = useState<ProfessionalType | undefined>(
    undefined
  )
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const value = useMemo<AuthContextValue>(() => {
    const baseUser = demoUsers[role]

    // Only 'professional' carries a professionalType — every other role
    // (contractor, project_manager, client, market_place, admin) already
    // is its own specific UserRole, so there's nothing to attach.
    const user: User =
      role === 'professional' && professionalType
        ? { ...baseUser, professionalType }
        : baseUser

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
      login: (nextRole: UserRole, nextProfessionalType?: ProfessionalType) => {
        setRoleState(nextRole)
        setProfessionalType(nextRole === 'professional' ? nextProfessionalType : undefined)
        setIsAuthenticated(true)
      },
    }
  }, [role, professionalType, isAuthenticated])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}