import { CheckCircle2, XCircle, Info, X } from 'lucide-react'
import { useToast } from '@/context/ToastContext'
import type { ToastTone } from '@/context/ToastContext'

const toneMeta: Record<ToastTone, { icon: typeof CheckCircle2; classes: string }> = {
  success: { icon: CheckCircle2, classes: 'border-teal/25 bg-teal-light text-teal' },
  error: { icon: XCircle, classes: 'border-brick/25 bg-brick-light text-brick' },
  info: { icon: Info, classes: 'border-line bg-white text-ink' },
}

export function ToastViewport() {
  const { toasts, dismissToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:items-end">
      {toasts.map((toast) => {
        const meta = toneMeta[toast.tone]
        const Icon = meta.icon
        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex w-full max-w-sm animate-toast-in items-start gap-3 rounded-lg border px-4 py-3 shadow-lg ${meta.classes}`}
          >
            <Icon size={18} className="mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{toast.title}</p>
              {toast.description && <p className="mt-0.5 text-xs opacity-80">{toast.description}</p>}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
              className="shrink-0 opacity-50 hover:opacity-100"
            >
              <X size={15} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
