
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
    <div className="space-y-7 pb-8">

      {/* ===================================================== */}
      {/* Back navigation */}
      {/* ===================================================== */}

      <button
        type="button"
        className="
          group
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-ink/[0.07]
          bg-white
          px-3.5
          py-2
          text-[10px]
          font-semibold
          text-ink/45
          shadow-[0_4px_16px_rgba(20,30,25,0.025)]
          transition-all
          hover:border-ink/[0.14]
          hover:text-ink
        "
      >
        <ArrowLeft
          className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
        />
        Back to professionals
      </button>

      {/* ===================================================== */}
      {/* Profile Hero */}
      {/* ===================================================== */}

      <section aria-label="Professional profile">

        <Card className="relative overflow-hidden">

          {/* Premium cover */}

          <div className="relative h-28 overflow-hidden bg-ink sm:h-32">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_20%_100%,rgba(255,255,255,0.06),transparent_35%)]" />

            <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

            <div className="absolute right-6 top-5 hidden text-right sm:block">
              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/30">
                Professional registry
              </p>

              <p className="mt-1 font-mono text-[9px] text-white/45">
                {professional.id}
              </p>
            </div>

          </div>

          <div className="px-5 pb-6 sm:px-7">

            <div className="-mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

              {/* Identity */}

              <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end">

                <div className="relative flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-[24px] border-[4px] border-white bg-[#F0F2F0] font-display text-xl font-semibold tracking-[-0.04em] text-ink shadow-[0_12px_30px_rgba(15,25,20,0.12)]">
                  AP

                  <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-white bg-[#12613E] shadow-sm">
                    <BadgeCheck className="h-3.5 w-3.5 text-white" />
                  </span>
                </div>

                <div className="min-w-0 pb-1">

                  <div className="flex flex-wrap items-center gap-2.5">

                    <h1 className="font-display text-[25px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[29px]">
                      {professional.name}
                    </h1>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF4EE] px-2.5 py-1.5 text-[8.5px] font-bold uppercase tracking-[0.05em] text-[#12613E]">
                      <BadgeCheck className="h-3 w-3" />
                      {professional.verificationStatus}
                    </span>

                  </div>

                  <p className="mt-1.5 text-[11px] font-medium text-ink/45">
                    {professional.category}
                    <span className="mx-1.5 text-ink/20">·</span>
                    {professional.specialty}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[9.5px] text-ink/35">

                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" />
                      {professional.location}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <BriefcaseBusiness className="h-3 w-3" />
                      {professional.experience} years experience
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3 w-3" />
                      Verified since {professional.verifiedSince}
                    </span>

                  </div>

                </div>

              </div>

              {/* Actions */}

              <div className="flex flex-col gap-2 sm:flex-row">

                <button
                  type="button"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-[13px]
                    border
                    border-ink/[0.08]
                    bg-white
                    px-4
                    py-3
                    text-[10px]
                    font-bold
                    text-ink/65
                    transition-all
                    hover:border-ink/[0.16]
                    hover:bg-ink/[0.025]
                  "
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  Message
                </button>

                <button
                  type="button"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-[13px]
                    bg-ink
                    px-4
                    py-3
                    text-[10px]
                    font-bold
                    text-white
                    shadow-[0_8px_20px_rgba(15,20,18,0.12)]
                    transition-all
                    hover:-translate-y-0.5
                    hover:shadow-[0_12px_26px_rgba(15,20,18,0.16)]
                  "
                >
                  Invite to project
                  <ChevronRight className="h-3.5 w-3.5 text-white/60" />
                </button>

              </div>

            </div>

          </div>

        </Card>

      </section>

      {/* ===================================================== */}
      {/* Profile Metrics */}
      {/* ===================================================== */}

      <section
        aria-label="Professional metrics"
        className="grid grid-cols-2 gap-3 xl:grid-cols-4"
      >

        <MetricCard
          icon={ShieldCheck}
          label="Trust score"
          value={String(professional.trustScore)}
          suffix="/ 100"
          note="Excellent"
          accent="teal"
        />

        <MetricCard
          icon={Star}
          label="Client rating"
          value={professional.rating.toFixed(1)}
          suffix="/ 5"
          note={`${professional.reviews} reviews`}
          accent="amber"
        />

        <MetricCard
          icon={BriefcaseBusiness}
          label="Projects completed"
          value={String(professional.projects)}
          note="Verified project record"
          accent="ink"
        />

        <MetricCard
          icon={Clock3}
          label="Availability"
          value={professional.availability}
          note={`Response time ${professional.responseTime}`}
          accent="blue"
        />

      </section>

      {/* ===================================================== */}
      {/* Main Content */}
      {/* ===================================================== */}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)]">

        {/* =================================================== */}
        {/* Main column */}
        {/* =================================================== */}

        <div className="space-y-5">

          {/* About */}

          <Card>

            <CardHeader
              title="About this professional"
              subtitle="Professional overview and practice information"
            />

            <CardBody>

              <p className="max-w-3xl text-[12px] leading-6 text-ink/50 sm:text-[13px] sm:leading-7">
                {professional.bio}
              </p>

              <div className="mt-6 grid gap-3 border-t border-ink/[0.07] pt-5 sm:grid-cols-3">

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

            <div className="divide-y divide-ink/[0.07]">

              {services.map((service, index) => (
                <div
                  key={service.name}
                  className="
                    group
                    flex
                    gap-4
                    px-5
                    py-5
                    transition-colors
                    hover:bg-ink/[0.012]
                    sm:px-6
                  "
                >

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-ink/[0.045] text-ink/45 transition-colors group-hover:bg-[#EAF4EE] group-hover:text-[#12613E]">
                    <span className="font-mono text-[9px] font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="min-w-0">

                    <h3 className="text-[12px] font-bold tracking-[-0.005em] text-ink">
                      {service.name}
                    </h3>

                    <p className="mt-1.5 max-w-2xl text-[10.5px] leading-5 text-ink/40">
                      {service.description}
                    </p>

                  </div>

                  <ChevronRight className="ml-auto mt-1 h-3.5 w-3.5 shrink-0 text-ink/15 transition-transform group-hover:translate-x-0.5 group-hover:text-ink/35" />

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

            <div className="divide-y divide-ink/[0.07]">

              {reviews.map((review) => (
                <ReviewRow key={review.id} review={review} />
              ))}

            </div>

          </Card>

        </div>

        {/* =================================================== */}
        {/* Sidebar */}
        {/* =================================================== */}

        <div className="space-y-5">

          {/* Trust score */}

          <Card className="overflow-hidden">

            <CardHeader
              title="Trust score"
              subtitle="Platform reliability assessment"
            />

            <CardBody>

              <div className="flex items-end justify-between">

                <div>

                  <span className="font-display text-[43px] font-semibold leading-none tracking-[-0.055em] text-ink">
                    {professional.trustScore}
                  </span>

                  <span className="ml-1 text-[10px] font-medium text-ink/25">
                    / 100
                  </span>

                </div>

                <span className="rounded-full bg-[#EAF4EE] px-2.5 py-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-[#12613E]">
                  Excellent
                </span>

              </div>

              {/* Overall progress */}

              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">

                <div
                  className="h-full rounded-full bg-[#12613E]"
                  style={{
                    width: `${professional.trustScore}%`,
                  }}
                />

              </div>

              <div className="mt-5 space-y-4">

                <ScoreBar
                  label="Verification completeness"
                  value={98}
                />

                <ScoreBar
                  label="Professional credentials"
                  value={96}
                />

                <ScoreBar
                  label="Past project record"
                  value={94}
                />

                <ScoreBar
                  label="Client ratings"
                  value={92}
                />

                <ScoreBar
                  label="Timeliness"
                  value={91}
                />

                <ScoreBar
                  label="Quality of evidence"
                  value={95}
                />

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

              <div className="mt-5 rounded-[15px] border border-[#12613E]/[0.08] bg-[#F5F9F6] p-3.5">

                <div className="flex gap-2.5">

                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#12613E]" />

                  <p className="text-[9.5px] leading-5 text-ink/45">
                    Verification is required before professionals can
                    participate in paid platform transactions.
                  </p>

                </div>

              </div>

            </CardBody>

          </Card>

          {/* CTA */}

          <Card className="overflow-hidden">

            <CardBody>

              <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#F7EFE8] text-[#B85C12]">
                <Award className="h-4 w-4" />
              </div>

              <h3 className="mt-4 font-display text-[15px] font-semibold tracking-[-0.015em] text-ink">
                Work with this professional
              </h3>

              <p className="mt-1.5 text-[10.5px] leading-5 text-ink/40">
                Invite this verified professional to provide services on
                one of your projects.
              </p>

              <button
                type="button"
                className="
                  mt-5
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-[13px]
                  bg-ink
                  px-4
                  py-3
                  text-[10px]
                  font-bold
                  text-white
                  transition-all
                  hover:-translate-y-0.5
                  hover:shadow-[0_10px_24px_rgba(15,20,18,0.13)]
                "
              >
                Invite to project
                <ChevronRight className="h-3.5 w-3.5 text-white/60" />
              </button>

            </CardBody>

          </Card>

        </div>

      </div>

    </div>
  )
}

/* ============================================================= */
/* Metric Card                                                     */
/* ============================================================= */

function MetricCard({
  icon: Icon,
  label,
  value,
  suffix,
  note,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  suffix?: string
  note: string
  accent: 'teal' | 'amber' | 'ink' | 'blue'
}) {
  const accents = {
    teal: 'bg-[#EAF4EE] text-[#12613E]',
    amber: 'bg-[#F7EFE8] text-[#B85C12]',
    ink: 'bg-ink/[0.05] text-ink/55',
    blue: 'bg-[#EEF3FF] text-[#315BCB]',
  }

  return (
    <Card className="group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(20,30,25,0.055)]">

      <CardBody>

        <div className="flex items-start justify-between gap-3">

          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${accents[accent]}`}
          >
            <Icon className="h-4 w-4" />
          </div>

          <div className="text-right">

            <span className="font-display text-[24px] font-semibold leading-none tracking-[-0.04em] text-ink">
              {value}
            </span>

            {suffix && (
              <span className="ml-1 text-[9px] font-medium text-ink/25">
                {suffix}
              </span>
            )}

          </div>

        </div>

        <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.13em] text-ink/35">
          {label}
        </p>

        <p className="mt-1 text-[10px] text-ink/35">
          {note}
        </p>

      </CardBody>

    </Card>
  )
}

/* ============================================================= */
/* Profile Stat                                                    */
/* ============================================================= */

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

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-ink/[0.045]">
        <Icon className="h-3.5 w-3.5 text-ink/40" />
      </div>

      <div className="min-w-0">

        <p className="text-[8.5px] font-bold uppercase tracking-[0.1em] text-ink/25">
          {label}
        </p>

        <p className="mt-1 truncate text-[11px] font-bold text-ink/65">
          {value}
        </p>

      </div>

    </div>
  )
}

/* ============================================================= */
/* Trust Score Bar                                                 */
/* ============================================================= */

function ScoreBar({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div>

      <div className="flex items-center justify-between gap-3">

        <p className="text-[9px] font-medium text-ink/45">
          {label}
        </p>

        <p className="text-[9px] font-bold text-ink/55">
          {value}
        </p>

      </div>

      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-ink/[0.06]">

        <div
          className="h-full rounded-full bg-ink/45 transition-all duration-500"
          style={{
            width: `${value}%`,
          }}
        />

      </div>

    </div>
  )
}

/* ============================================================= */
/* Verification Item                                               */
/* ============================================================= */

function VerificationItem({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between gap-4">

      <div className="flex min-w-0 items-center gap-2.5">

        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EAF4EE]">
          <CheckCircle2 className="h-3 w-3 text-[#12613E]" />
        </div>

        <span className="truncate text-[10.5px] font-medium text-ink/55">
          {label}
        </span>

      </div>

      <span className="shrink-0 text-[8.5px] font-bold uppercase tracking-[0.04em] text-[#12613E]">
        {value}
      </span>

    </div>
  )
}

/* ============================================================= */
/* Review Row                                                      */
/* ============================================================= */

function ReviewRow({ review }: { review: Review }) {
  return (
    <article className="px-5 py-5 sm:px-6">

      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">

          <div className="flex flex-wrap items-center gap-2">

            <p className="text-[11px] font-bold text-ink">
              {review.client}
            </p>

            <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF4EE] px-2 py-1 text-[7.5px] font-bold uppercase tracking-[0.04em] text-[#12613E]">
              <BadgeCheck className="h-2.5 w-2.5" />
              Verified
            </span>

          </div>

          <p className="mt-1 text-[8.5px] font-medium text-ink/30">
            {review.project}
            <span className="mx-1.5 text-ink/15">·</span>
            {review.date}
          </p>

        </div>

        <div className="flex shrink-0 items-center gap-0.5">

          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={[
                'h-3 w-3',
                index < review.rating
                  ? 'fill-current text-[#B85C12]'
                  : 'text-ink/10',
              ].join(' ')}
            />
          ))}

        </div>

      </div>

      <p className="mt-3 max-w-3xl text-[10.5px] leading-5 text-ink/45">
        {review.comment}
      </p>

    </article>
  )
}