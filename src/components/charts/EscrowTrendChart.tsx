import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface TrendPoint {
  month: string
  deposited: number
  released: number
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { name: string; value: number; color: string }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md border border-line bg-white px-3 py-2 shadow-sm">
      <p className="text-xs font-medium text-ink">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="mt-1 flex items-center gap-1.5 font-mono text-xs text-ink/70">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: p.color }} />
          {p.name}: ₦{p.value.toFixed(1)}M
        </p>
      ))}
    </div>
  )
}

export function EscrowTrendChart({ data }: { data: TrendPoint[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="depositedFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-teal)" stopOpacity={0.28} />
              <stop offset="100%" stopColor="var(--color-teal)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="releasedFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-amber)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="var(--color-amber)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--color-line)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: 'var(--color-ink)', fillOpacity: 0.5, fontSize: 11 }}
            axisLine={{ stroke: 'var(--color-line)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'var(--color-ink)', fillOpacity: 0.5, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₦${v}M`}
            width={48}
          />
          <Tooltip content={<ChartTooltip />} />
          <Area
            type="monotone"
            dataKey="deposited"
            name="Deposited"
            stroke="var(--color-teal)"
            strokeWidth={2}
            fill="url(#depositedFill)"
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="released"
            name="Released"
            stroke="var(--color-amber)"
            strokeWidth={2}
            fill="url(#releasedFill)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
