export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-shimmer rounded-md ${className}`} />
}

export function SkeletonCard() {
  return (
    <div className="rounded-lg border border-line bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-2.5 w-32" />
        </div>
        <Skeleton className="h-9 w-9 shrink-0 rounded-md" />
      </div>
    </div>
  )
}

export function SkeletonList({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="rounded-md border border-line p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3.5 w-1/3" />
              <Skeleton className="h-2.5 w-1/4" />
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <Skeleton className="mt-3 h-1.5 w-full" />
        </div>
      ))}
    </div>
  )
}
