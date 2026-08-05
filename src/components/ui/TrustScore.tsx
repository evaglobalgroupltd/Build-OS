import { ShieldCheck } from 'lucide-react'

export function TrustScore({ score, size = 'md' }: { score: number; size?: 'sm' | 'md' }) {
  const tone = score >= 80 ? 'text-teal' : score >= 60 ? 'text-amber-dark' : 'text-brick'
  const dim = size === 'sm' ? 'h-7 w-7 text-[10px]' : 'h-9 w-9 text-xs'

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex ${dim} items-center justify-center rounded-full border-2 border-current ${tone} font-mono font-semibold`}
        title={`Trust score ${score} / 100`}
      >
        {score}
      </div>
      <div className="flex items-center gap-1 text-xs text-ink/50">
        <ShieldCheck size={13} className={tone} />
        Trust score
      </div>
    </div>
  )
}
