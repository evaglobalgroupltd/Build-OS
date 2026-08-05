import type { ReactNode } from 'react'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@/context/ToastContext'
import { ToastViewport } from '@/components/feedback/ToastViewport'

// Central place to stack app-wide providers (auth, query client, theme, etc.)
// as the app grows, so app/App.tsx doesn't turn into a wall of nested providers.
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        {children}
        <ToastViewport />
      </ToastProvider>
    </AuthProvider>
  )
}
