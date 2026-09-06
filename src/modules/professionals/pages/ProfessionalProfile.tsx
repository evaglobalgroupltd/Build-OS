import {
  ArrowLeft,
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Star,
  Users,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

type Service = {
  name: string
  description: string
}

type Review = {
  id: string
  client: string
  rating: number
  date: string
  comment: string
  project: string
}

const professional = {
  id: 'PRO-0018',
  name: 'Adebayo & Partners',
  category: 'Architect',
  specialty: 'Residential Architecture',
  location: 'Abuja, FCT',
  experience: 14,
  trustScore: 94,
  rating: 4.9,
  reviews: 38,
  projects: 72,
  availability: 'Available',
  verifiedSince: '2024',
  verificationStatus: 'Verified',
  responseTime: '< 24 hours',
  completedThisYear: 18,
  bio: 'A professional architectural practice specialising in residential design, construction documentation and project coordination. The practice supports clients from concept development through technical documentation and project delivery.',
}

const services: Service[] = [
  {
    name: 'Residential Architecture',
    description:
      'Concept design, floor plans, elevations, sections and complete architectural documentation.',
  },
  {
    name: 'Construction Documentation',
    description:
      'Detailed drawings and schedules prepared for construction and contractor coordination.',
  },
  {
    name: 'Design Consultation',
    description:
      'Professional guidance on design direction, planning considerations and project requirements.',
  },
  {
    name: 'Project Coordination',
    description:
      'Technical coordination between architectural, engineering and construction teams.',
  },
]

const reviews: Review[] = [
  {
    id: 'REV-001',
    client: 'Verified Client',
    rating: 5,
    date: 'Aug 22, 2026',
    comment:
      'The drawings were detailed and delivered on schedule. Communication throughout the assignment was excellent.',
    project: 'Maitama Residence',
  },
  {
    id: 'REV-002',
    client: 'Verified Client',
    rating: 5,
    date: 'Jul 18, 2026',
    comment:
      'Strong technical understanding and very responsive to design changes. The final package was professionally prepared.',
    project: 'Jabi Duplex Construction',
  },
  {
    id: 'REV-003',
    client: 'Verified Client',
    rating: 4,
    date: 'Jun 30, 2026',
    comment:
      'Good experience overall. The team provided useful recommendations and handled the documentation well.',
    project: 'Gwarinpa Residential Development',
  },
]

export function ProfessionalProfile() {
  return (
    <div className="space-y-6">
      {/* Back navigation */}
      <button
        type="button"
        className="inline-flex items-center gap-2 text-xs font-semibold text-ink/45 transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to professionals
      </button>

      {/* Profile hero */}
      <Card className="overflow-hidden">
        <div className="h-24 bg-ink/[0.035]" />

        <div className="px-6 pb-6">
          <div className="-mt-9 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-3xl border-4 border-white bg-ink/5 font-display text-xl font-semibold text-ink shadow-sm">
                AP
              </div>

              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
                    {professional.name}
                  </h1>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[9px] font-semibold text-emerald-700">
                    <BadgeCheck className="h-3 w-3" />
                    {professional.verificationStatus}
                  </span>
                </div>

                <p className="mt-1 text-xs font-medium text-ink/45">
                  {professional.category} · {professional.specialty}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] text-ink/35">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {professional.location}
                  </span>

                  <span className="inline-flex items-center gap-1">
                    <BriefcaseBusiness className="h-3 w-3" />
                    {professional.experience} years experience
                  </span>

                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    Verified since {professional.verifiedSince}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-ink/[0.03]"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Message
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                Invite to project
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Trust and profile metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={ShieldCheck}
          label="Trust score"
          value={String(professional.trustScore)}
          suffix="/ 100"
          note="Excellent"
        />

        <MetricCard
          icon={Star}
          label="Client rating"
          value={professional.rating.toFixed(1)}
          suffix="/ 5"
          note={`${professional.reviews} reviews`}
        />

        <MetricCard
          icon={BriefcaseBusiness}
          label="Projects completed"
          value={String(professional.projects)}
          note="Verified project record"
        />

        <MetricCard
          icon={Clock3}
          label="Availability"
          value={professional.availability}
          note={`Response time ${professional.responseTime}`}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Main profile content */}
        <div className="space-y-6">
          <Card>
            <CardHeader
              title="About this professional"
              subtitle="Professional overview and practice information"
            />

            <CardBody>
              <p className="text-sm leading-7 text-ink/55">
                {professional.bio}
              </p>

              <div className="mt-6 grid gap-4 border-t border-line pt-5 sm:grid-cols-3">
                <ProfileStat
                  icon={Users}
                  label="Projects this year"
                  value={String(professional.completedThisYear)}
                />

                <ProfileStat
                  icon={FileCheck2}
                  label="Verified since"
                  value={professional.verifiedSince}
                />

                <ProfileStat
                  icon={Clock3}
                  label="Typical response"
                  value={professional.responseTime}
                />
              </div>
            </CardBody>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader
              title="Services"
              subtitle="Professional services available through the platform"
            />

            <div className="divide-y divide-line">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="flex gap-4 px-6 py-5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                    <CheckCircle2 className="h-4 w-4 text-ink/45" />
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-ink">
                      {service.name}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-ink/45">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader
              title="Client feedback"
              subtitle={`${professional.reviews} verified client reviews`}
            />

            <div className="divide-y divide-line">
              {reviews.map((review) => (
                <ReviewRow key={review.id} review={review} />
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trust score */}
          <Card>
            <CardHeader
              title="Trust score"
              subtitle="Platform reliability assessment"
            />

            <CardBody>
              <div className="flex items-end justify-between">
                <div>
                  <span className="font-display text-4xl font-semibold tracking-tight text-ink">
                    {professional.trustScore}
                  </span>

                  <span className="ml-1 text-xs text-ink/30">
                    / 100
                  </span>
                </div>

                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[9px] font-semibold text-emerald-700">
                  Excellent
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <ScoreBar label="Verification completeness" value={98} />
                <ScoreBar label="Professional credentials" value={96} />
                <ScoreBar label="Past project record" value={94} />
                <ScoreBar label="Client ratings" value={92} />
                <ScoreBar label="Timeliness" value={91} />
                <ScoreBar label="Quality of evidence" value={95} />
              </div>
            </CardBody>
          </Card>

          {/* Verification */}
          <Card>
            <CardHeader
              title="Verification"
              subtitle="Professional credentials and status"
            />

            <CardBody>
              <div className="space-y-4">
                <VerificationItem
                  label="Identity verified"
                  value="Verified"
                />

                <VerificationItem
                  label="Professional credentials"
                  value="Verified"
                />

                <VerificationItem
                  label="Practice information"
                  value="Verified"
                />

                <VerificationItem
                  label="Platform status"
                  value="Active"
                />
              </div>

              <div className="mt-5 rounded-xl bg-paper-2 p-3.5">
                <div className="flex gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

                  <p className="text-[10px] leading-5 text-ink/45">
                    Verification is required before professionals can
                    participate in paid platform transactions.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* CTA */}
          <Card>
            <CardBody>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
                <Award className="h-4 w-4 text-ink/45" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-ink">
                Work with this professional
              </h3>

              <p className="mt-1 text-xs leading-5 text-ink/45">
                Invite this verified professional to provide services on
                one of your projects.
              </p>

              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                Invite to project
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  suffix,
  note,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  suffix?: string
  note: string
}) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
            <Icon className="h-4 w-4 text-ink/45" />
          </div>

          <div className="text-right">
            <span className="font-display text-2xl font-semibold tracking-tight text-ink">
              {value}
            </span>

            {suffix && (
              <span className="ml-1 text-[10px] text-ink/30">
                {suffix}
              </span>
            )}
          </div>
        </div>

        <p className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-ink/40">
          {label}
        </p>

        <p className="mt-1 text-[10px] text-ink/35">{note}</p>
      </CardBody>
    </Card>
  )
}

function ProfileStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink/5">
        <Icon className="h-3.5 w-3.5 text-ink/40" />
      </div>

      <div>
        <p className="text-[9px] font-semibold uppercase tracking-wide text-ink/30">
          {label}
        </p>

        <p className="mt-0.5 text-xs font-semibold text-ink/65">
          {value}
        </p>
      </div>
    </div>
  )
}

function ScoreBar({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[9px] text-ink/45">{label}</p>

        <p className="text-[9px] font-semibold text-ink/55">
          {value}
        </p>
      </div>

      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink/5">
        <div
          className="h-full rounded-full bg-ink/50"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

function VerificationItem({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2.5">
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />

        <span className="text-xs text-ink/55">{label}</span>
      </div>

      <span className="text-[9px] font-semibold text-emerald-700">
        {value}
      </span>
    </div>
  )
}

function ReviewRow({ review }: { review: Review }) {
  return (
    <div className="px-6 py-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold text-ink">
              {review.client}
            </p>

            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[8px] font-semibold text-emerald-700">
              Verified
            </span>
          </div>

          <p className="mt-1 text-[9px] text-ink/35">
            {review.project} · {review.date}
          </p>
        </div>

        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={[
                'h-3 w-3',
                index < review.rating
                  ? 'fill-current text-amber-500'
                  : 'text-ink/15',
              ].join(' ')}
            />
          ))}
        </div>
      </div>

      <p className="mt-3 text-xs leading-5 text-ink/50">
        {review.comment}
      </p>
    </div>
  )
}