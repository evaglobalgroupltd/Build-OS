import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { User, UserRole } from '@/types'
import { demoUsers } from '@/data/mockData'

interface AuthContextValue {
  user: User
  role: UserRole
  isAuthenticated: boolean
  setRole: (role: UserRole) => void
  logout: () => void
  login: (role: UserRole) => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('client')
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const value = useMemo<AuthContextValue>(
    () => ({
      user: demoUsers[role],
      role,
      isAuthenticated,
      setRole,
      logout: () => setIsAuthenticated(false),
      login: (nextRole: UserRole) => {
        setRole(nextRole)
        setIsAuthenticated(true)
      },
    }),
    [role, isAuthenticated],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
