import {
  Award,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  Globe2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

const contractor = {
  name: 'Apex Build & Engineering Ltd.',
  registration: 'RC 1847291',
  category: 'General Building Contractor',
  location: 'Abuja, Nigeria',
  website: 'www.apexbuild.example',
  email: 'projects@apexbuild.example',
  phone: '+234 800 000 0000',
  verified: true,
  trustScore: 91,
  rating: 4.8,
  reviews: 42,
  completedProjects: 18,
  activeProjects: 6,
  yearsExperience: 9,
  onTimeDelivery: 94,
  compliance: 98,
}

const verificationItems = [
  'Company registration',
  'Tax identification',
  'Business identity',
  'Bank account',
  'Professional credentials',
  'Insurance documentation',
]

const projects = [
  {
    name: 'Gwarinpa Residential Development',
    status: 'Completed',
    value: '₦24.5M',
    progress: 100,
    rating: '4.9',
  },
  {
    name: 'Maitama Duplex Construction',
    status: 'In Progress',
    value: '₦38.2M',
    progress: 72,
    rating: '4.8',
  },
  {
    name: 'Jabi Commercial Renovation',
    status: 'In Progress',
    value: '₦12.8M',
    progress: 54,
    rating: '4.7',
  },
]

const specialties = [
  'Residential Construction',
  'Commercial Buildings',
  'Renovation',
  'Civil Works',
  'Project Delivery',
]

export function ContractorDetails() {
  return (
    <div className="space-y-6">
      {/* Profile header */}
      <Card className="overflow-hidden">
        <div className="border-b border-line bg-paper-2 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-ink text-xl font-bold text-white shadow-sm">
                AB
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
                    {contractor.name}
                  </h1>

                  {contractor.verified && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm text-ink/50">
                  {contractor.category}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink/45">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {contractor.location}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" />
                    {contractor.registration}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {contractor.yearsExperience} years experience
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-ink/[0.03]"
              >
                <Mail className="h-3.5 w-3.5" />
                Contact
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                Invite to project
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
          <ProfileMetric
            icon={ShieldCheck}
            label="Trust score"
            value={`${contractor.trustScore}/100`}
            description="Excellent standing"
          />

          <ProfileMetric
            icon={Star}
            label="Client rating"
            value={contractor.rating}
            description={`${contractor.reviews} verified reviews`}
          />

          <ProfileMetric
            icon={CheckCircle2}
            label="Completed"
            value={contractor.completedProjects.toString()}
            description="Projects delivered"
          />

          <ProfileMetric
            icon={Clock3}
            label="On-time delivery"
            value={`${contractor.onTimeDelivery}%`}
            description="Milestones on schedule"
          />
        </div>
      </Card>

      {/* Main content */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* About / company */}
        <div className="space-y-6 xl:col-span-2">
          <Card>
            <CardHeader
              title="Company profile"
              subtitle="Business information and contractor capabilities"
            />

            <CardBody>
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <InfoItem
                  icon={Building2}
                  label="Legal entity"
                  value={contractor.name}
                />

                <InfoItem
                  icon={FileCheck2}
                  label="Registration"
                  value={contractor.registration}
                />

                <InfoItem
                  icon={MapPin}
                  label="Operating location"
                  value={contractor.location}
                />

                <InfoItem
                  icon={Users}
                  label="Active projects"
                  value={`${contractor.activeProjects} projects`}
                />

                <InfoItem
                  icon={Mail}
                  label="Business email"
                  value={contractor.email}
                />

                <InfoItem
                  icon={Phone}
                  label="Phone"
                  value={contractor.phone}
                />

                <InfoItem
                  icon={Globe2}
                  label="Website"
                  value={contractor.website}
                />

                <InfoItem
                  icon={Award}
                  label="Experience"
                  value={`${contractor.yearsExperience} years`}
                />
              </div>

              <div className="mt-7 border-t border-line pt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Core capabilities
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="rounded-full border border-line bg-paper-2 px-3 py-1.5 text-xs font-medium text-ink/60"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Performance */}
          <Card>
            <CardHeader
              title="Performance profile"
              subtitle="Indicators contributing to the contractor's trust score"
            />

            <CardBody>
              <div className="space-y-6">
                <PerformanceRow
                  label="Project completion"
                  value={96}
                  description="Successful completion history"
                />

                <PerformanceRow
                  label="On-time performance"
                  value={contractor.onTimeDelivery}
                  description="Milestones delivered according to schedule"
                />

                <PerformanceRow
                  label="Quality performance"
                  value={92}
                  description="Inspection and client quality ratings"
                />

                <PerformanceRow
                  label="Client satisfaction"
                  value={96}
                  description="Average feedback across completed projects"
                />

                <PerformanceRow
                  label="Compliance"
                  value={contractor.compliance}
                  description="Verification and documentation status"
                />
              </div>
            </CardBody>
          </Card>

          {/* Projects */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Project history"
              subtitle="Recent projects and delivery performance"
            />

            <div className="divide-y divide-line">
              {projects.map((project) => (
                <div
                  key={project.name}
                  className="px-6 py-5 transition-colors hover:bg-ink/[0.02]"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-ink">
                          {project.name}
                        </h3>

                        <span
                          className={
                            project.status === 'Completed'
                              ? 'rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-700'
                              : 'rounded-full bg-amber-500/10 px-2 py-1 text-[10px] font-semibold text-amber-700'
                          }
                        >
                          {project.status}
                        </span>
                      </div>

                      <div className="mt-3 max-w-md">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-ink/40">Progress</span>
                          <span className="font-semibold text-ink/60">
                            {project.progress}%
                          </span>
                        </div>

                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink/5">
                          <div
                            className="h-full rounded-full bg-ink transition-all duration-500"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-7 text-xs">
                      <div>
                        <p className="text-ink/40">Contract</p>
                        <p className="mt-1 font-semibold text-ink">
                          {project.value}
                        </p>
                      </div>

                      <div>
                        <p className="text-ink/40">Rating</p>
                        <p className="mt-1 flex items-center gap-1 font-semibold text-ink">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          {project.rating}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trust card */}
          <Card className="overflow-hidden">
            <div className="border-b border-line bg-paper-2 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                    Build OS trust
                  </p>

                  <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                    Contractor standing
                  </h2>
                </div>

                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
            </div>

            <CardBody>
              <div className="flex items-center justify-center">
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-[9px] border-ink/10">
                  <div className="text-center">
                    <p className="font-display text-3xl font-bold tracking-tight text-ink">
                      {contractor.trustScore}
                    </p>
                    <p className="text-[10px] font-medium text-ink/40">
                      OUT OF 100
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Excellent standing
                </span>
              </div>

              <p className="mt-4 text-center text-xs leading-5 text-ink/45">
                Based on delivery history, quality, compliance, client
                feedback and dispute performance.
              </p>
            </CardBody>
          </Card>

          {/* Verification */}
          <Card>
            <CardHeader
              title="Verification"
              subtitle="Business credentials reviewed by Build OS"
            />

            <CardBody>
              <div className="space-y-3">
                {verificationItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-paper-2 px-3 py-3"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    </div>

                    <span className="text-xs font-medium text-ink/65">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t border-line pt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink/40">
                    Verification status
                  </span>

                  <span className="font-semibold text-emerald-700">
                    Verified
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Marketplace summary */}
          <Card>
            <CardHeader
              title="Marketplace activity"
              subtitle="Current contractor activity on Build OS"
            />

            <CardBody>
              <div className="space-y-4">
                <ActivityMetric
                  label="Active projects"
                  value={contractor.activeProjects.toString()}
                />

                <ActivityMetric
                  label="Completed projects"
                  value={contractor.completedProjects.toString()}
                />

                <ActivityMetric
                  label="Client rating"
                  value={`${contractor.rating} / 5`}
                />

                <ActivityMetric
                  label="Compliance"
                  value={`${contractor.compliance}%`}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

interface ProfileMetricProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
}

function ProfileMetric({
  icon: Icon,
  label,
  value,
  description,
}: ProfileMetricProps) {
  return (
    <div className="px-6 py-5 sm:px-7">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
          <Icon className="h-4 w-4 text-ink/55" />
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
            {label}
          </p>

          <p className="mt-0.5 font-display text-xl font-semibold text-ink">
            {value}
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-ink/40">{description}</p>
    </div>
  )
}

interface InfoItemProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5">
        <Icon className="h-4 w-4 text-ink/50" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-medium text-ink">
          {value}
        </p>
      </div>
    </div>
  )
}

interface PerformanceRowProps {
  label: string
  value: number
  description: string
}

function PerformanceRow({
  label,
  value,
  description,
}: PerformanceRowProps) {
  const safeValue = Math.min(Math.max(value, 0), 100)

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-ink">{label}</p>
          <p className="mt-0.5 text-xs text-ink/40">{description}</p>
        </div>

        <span className="text-sm font-semibold text-ink">
          {safeValue}%
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/5">
        <div
          className="h-full rounded-full bg-ink transition-all duration-500"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  )
}

function ActivityMetric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between border-b border-line pb-3 last:border-0 last:pb-0">
      <span className="text-xs text-ink/45">{label}</span>
      <span className="text-sm font-semibold text-ink">{value}</span>
    </div>
  )
}