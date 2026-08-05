export function ProgressBar({ percent, tone = 'amber' }: { percent: number; tone?: 'amber' | 'teal' }) {
  const barColor = tone === 'amber' ? 'bg-amber' : 'bg-teal'
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/8">
      <div
        className={`h-full rounded-full ${barColor} transition-all duration-500`}
        style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
      />
    </div>
  )
}
