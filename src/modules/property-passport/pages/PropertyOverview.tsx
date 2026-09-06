import {
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Home,
  MapPin,
  ShieldCheck,
  Tag,
} from 'lucide-react'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

/**
 * Property Overview — Digital Property Passport module
 * BRD reference: Sec. 20.4
 *
 * Summary of the property and its status.
 *
 * TODO:
 * - Replace static property data with API-backed property information.
 * - Link property details to the project's primary property record.
 * - Add verified property metadata when the backend model is defined.
 * - Calculate project/property status from live Passport records.
 */

const property = {
  name: 'Project Property',
  propertyId: 'PROP-001',
  type: 'Residential Property',
  location: 'Project Location',
  status: 'Under Development',
  startDate: '05 May 2026',
  expectedCompletion: 'December 2026',
}

const statusItems = [
  {
    label: 'Ownership',
    status: 'Verified',
    icon: ShieldCheck,
  },
  {
    label: 'Land Documents',
    status: 'Verified',
    icon: FileCheck2,
  },
  {
    label: 'Designs',
    status: 'Verified',
    icon: CheckCircle2,
  },
  {
    label: 'Inspections',
    status: 'Review',
    icon: ClipboardCheck,
  },
  {
    label: 'Handover',
    status: 'Pending',
    icon: FileCheck2,
  },
]

export function PropertyOverview() {
  const verifiedItems = statusItems.filter(
    (item) => item.status === 'Verified',
  ).length

  const completion = Math.round(
    (verifiedItems / statusItems.length) * 100,
  )

  return (
    <div className="space-y-6">
      <Card>
        <div className="border-b border-line bg-paper-2 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
                  <Home className="h-4 w-4 text-ink/55" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/40">
                    Digital Property Passport
                  </p>

                  <h1 className="mt-0.5 font-display text-2xl font-semibold tracking-tight text-ink">
                    Property Overview
                  </h1>
                </div>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/50">
                Summary of the property, its identifying information and its
                current Passport status.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              {property.status}
            </span>
          </div>
        </div>

        <CardBody>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DetailCard
              icon={Home}
              label="Property"
              value={property.name}
            />

            <DetailCard
              icon={Tag}
              label="Property ID"
              value={property.propertyId}
            />

            <DetailCard
              icon={MapPin}
              label="Location"
              value={property.location}
            />

            <DetailCard
              icon={Home}
              label="Property type"
              value={property.type}
            />
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader
            title="Property status"
            subtitle="Current status of the property within the project lifecycle"
          />

          <CardBody>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Current status
                </p>

                <p className="mt-1 font-display text-2xl font-semibold text-ink">
                  {property.status}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
                <Home className="h-5 w-5 text-amber-600" />
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <DateItem
                icon={CalendarDays}
                label="Project start"
                value={property.startDate}
              />

              <DateItem
                icon={CalendarDays}
                label="Expected completion"
                value={property.expectedCompletion}
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Passport status"
            subtitle="Status of the property's core Passport records"
          />

          <CardBody>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-2xl font-semibold text-ink">
                  {completion}%
                </p>

                <p className="mt-1 text-xs text-ink/45">
                  {verifiedItems} of {statusItems.length} core areas verified
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/5">
                <ShieldCheck className="h-5 w-5 text-ink/50" />
              </div>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-ink/5">
              <div
                className="h-full rounded-full bg-ink"
                style={{ width: `${completion}%` }}
              />
            </div>

            <p className="mt-4 text-xs leading-5 text-ink/45">
              Some Passport records still require review or completion before
              the property's permanent record can be considered complete.
            </p>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Record status"
          subtitle="Overview of the property's principal Digital Property Passport areas"
        />

        <div className="divide-y divide-line">
          {statusItems.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.label}
                className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-ink/[0.02]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                    <Icon className="h-4 w-4 text-ink/50" />
                  </div>

                  <p className="text-sm font-semibold text-ink">
                    {item.label}
                  </p>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                    item.status === 'Verified'
                      ? 'bg-emerald-500/10 text-emerald-700'
                      : item.status === 'Review'
                        ? 'bg-amber-500/10 text-amber-700'
                        : 'bg-ink/5 text-ink/45'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            )
          })}
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Property record"
          subtitle="Permanent property information"
        />

        <CardBody>
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
              <FileCheck2 className="h-4 w-4 text-ink/55" />
            </div>

            <p className="text-xs leading-5 text-ink/50">
              The Property Overview provides the high-level reference for the
              build and its Digital Property Passport. Detailed ownership,
              land, design, inspection, contract, procurement, payment and
              handover records remain in their respective Passport sections.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function DetailCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-line bg-paper-2 px-5 py-4">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-ink/35" />

        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
          {label}
        </p>
      </div>

      <p className="mt-2 truncate text-sm font-semibold text-ink">
        {value}
      </p>
    </div>
  )
}

function DateItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-line bg-paper-2 px-4 py-3">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-ink/35" />

        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
          {label}
        </p>
      </div>

      <p className="mt-2 text-sm font-semibold text-ink">{value}</p>
    </div>
  )
}