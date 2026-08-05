import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface ProgressPoint {
  name: string
  progressPercent: number
}

function toneForProgress(percent: number) {
  if (percent >= 70) return 'var(--color-teal)'
  if (percent >= 30) return 'var(--color-amber)'
  return 'var(--color-ink)'
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { payload: ProgressPoint }[]
}) {
  if (!active || !payload?.length) return null
  const point = payload[0].payload
  return (
    <div className="rounded-md border border-line bg-white px-3 py-2 shadow-sm">
      <p className="text-xs font-medium text-ink">{point.name}</p>
      <p className="mt-1 font-mono text-xs text-ink/70">{point.progressPercent}% complete</p>
    </div>
  )
}

export function ProjectProgressChart({ data }: { data: ProgressPoint[] }) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, left: 4, bottom: 4 }}>
          <CartesianGrid stroke="var(--color-line)" strokeDasharray="3 3" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fill: 'var(--color-ink)', fillOpacity: 0.5, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={150}
            tick={{ fill: 'var(--color-ink)', fillOpacity: 0.7, fontSize: 10.5 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: 'var(--color-ink)', fillOpacity: 0.04 }} />
          <Bar dataKey="progressPercent" radius={[0, 4, 4, 0]} barSize={16} isAnimationActive={false}>
            {data.map((d) => (
              <Cell key={d.name} fill={toneForProgress(d.progressPercent)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
