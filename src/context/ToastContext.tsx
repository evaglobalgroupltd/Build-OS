import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

export type ToastTone = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  tone: ToastTone
  title: string
  description?: string
}

interface ToastContextValue {
  toasts: Toast[]
  showToast: (toast: Omit<Toast, 'id'>) => void
  dismissToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

/* -----------------------------------------------------------------------------
 * `toast` works anywhere (no hook needed), so a button in any module page can do
 *   onClick={() => toast.success('Milestone approved')}
 * ToastProvider listens and shows it. Use useToast() when you are already in a
 * component that has it.
 * -------------------------------------------------------------------------- */
type ToastListener = (toast: Omit<Toast, 'id'>) => void
const listeners = new Set<ToastListener>()
const emit = (tone: ToastTone, title: string, description?: string) =>
  listeners.forEach((listener) => listener({ tone, title, description }))

export const toast = {
  success: (title: string, description?: string) => emit('success', title, description),
  info: (title: string, description?: string) => emit('info', title, description),
  error: (title: string, description?: string) => emit('error', title, description),
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = crypto.randomUUID()
      setToasts((current) => [...current, { ...toast, id }])
      // auto-dismiss after 4.5s so the queue never silently piles up
      window.setTimeout(() => dismissToast(id), 4500)
    },
    [dismissToast],
  )

  useEffect(() => {
    listeners.add(showToast)
    return () => {
      listeners.delete(showToast)
    }
  }, [showToast])

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
