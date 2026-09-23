import { useMemo } from 'react'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock,
  FileText,
  FolderCheck,
  Mail,
  Wallet,
} from 'lucide-react'

import { DashboardLayout } from '@/layouts/DashboardLayout'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useAuth } from '@/context/AuthContext'
import { useProjectProfile } from '@/hooks/useProjectProfile'
import { deriveProfessionalDashboardConfig } from '@/derive/professionalDashboardConfig'

// `state` / `specialty` map to COVERAGE_STATES / PROFESSIONAL_SPECIALIZATIONS
// values (see src/data/projectOptions.ts). In mock data today; a real API
// response should carry these same fields so config.matchesInvitation works
// unchanged.
const invitations = [
  {
    id: 1,
    project: 'Abuja Terrace (3 Units)',
    service: 'Structural Engineering Review',
    status: 'New',
    location: 'Abuja, FCT',
    state: 'abuja',
    specialty: 'structural',
    deadline: 'Respond by 24 Jun',
    image: '/images/yea10.jpeg',
  },
  {
    id: 2,
    project: 'Lekki 4-Bedroom Duplex',
    service: 'Interior Design Consultation',
    status: 'Proposal sent',
    location: 'Lekki, Lagos',
    state: 'lagos',
    specialty: 'interiors',
    deadline: 'Awaiting client',
    image: '/images/yea9.jpeg',
  },
]

const deliverables = [
  {
    project: 'Abuja Terrace (3 Units)',
    task: 'Structural review report',
    due: 'Due tomorrow',
    progress: 80,
  },
  {
    project: 'Lekki 4-Bedroom Duplex',
    task: 'Interior concept package',
    due: 'Due in 5 days',
    progress: 45,
  },
]

export function ProfessionalDashboard() {
  const { user } = useAuth()

  // Single source of truth for the Project Studio (PROFESSIONAL_FLOW) answers.
  const profile = useProjectProfile()

  // Derivation layer: labels + the invitation-matching predicate live here,
  // not inline in JSX — see src/derive/professionalDashboardConfig.ts.
  const config = useMemo(
    () => deriveProfessionalDashboardConfig(profile.answers ?? {}),
    [profile.answers],
  )

  // Matched-first ordering, same reasoning as the contractor marketplace:
  // profile-fit invitations surface without hiding the rest when the
  // profile is incomplete or nothing matches.
  const sortedInvitations = useMemo(() => {
    return [...invitations].sort((a, b) => {
      const aMatch = config.matchesInvitation(a) ? 0 : 1
      const bMatch = config.matchesInvitation(b) ? 0 : 1
      return aMatch - bMatch
    })
  }, [config])

  const featured = sortedInvitations[0]
  const featuredIsMatch = config.hasProfile && config.matchesInvitation(featured)

  const firstName = user.fullName.split(' ')[0]

  return (
    <DashboardLayout title="Professional Overview">

      {/* ===================================================== */}
      {/* Header */}
      {/* ===================================================== */}

      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">
              Professional studio
            </p>
          </div>

          <h1 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[34px]">
            Good afternoon, {firstName}
          </h1>

          <p className="mt-1.5 max-w-xl text-[13px] leading-5 text-ink/50">
            Your opportunities, active engagements, and upcoming deliverables
            in one place.
          </p>
        </div>

        <div className="flex items-center gap-3">

          <div className="hidden items-center gap-2 rounded-full border border-ink/[0.07] bg-white px-3.5 py-2.5 sm:flex">
            {config.isFullyBooked ? (
              <>
                <Clock size={14} className="text-[#B85C12]" />
                <span className="text-[11px] font-semibold text-ink/65">
                  Fully booked
                </span>
              </>
            ) : (
              <>
                <CheckCircle2 size={14} className="text-[#12613E]" />
                <span className="text-[11px] font-semibold text-ink/65">
                  Profile active
                </span>
              </>
            )}
          </div>

          <button
            type="button"
            className="
              flex
              items-center
              gap-2
              rounded-full
              bg-ink
              px-4
              py-2.5
              text-xs
              font-semibold
              text-white
              transition
              hover:opacity-90
            "
          >
            <BriefcaseBusiness size={14} />
            Browse opportunities
          </button>

        </div>
      </div>

      {/* ===================================================== */}
      {/* Professional profile (from the Project Studio questionnaire) */}
      {/* ===================================================== */}

      {config.hasProfile && (
        <section aria-label="Professional profile" className="mb-7">
          <Card>
            <CardHeader
              title="Your professional profile"
              subtitle="From your Project Studio answers — drives which invitations are highlighted below"
            />
            <CardBody className="pt-4">
              <div className="flex flex-wrap gap-2">
                {[
                  ...config.specializationLabels,
                  ...config.coverageStateLabels,
                  config.capacityLabel,
                ]
                  .filter((tag): tag is string => Boolean(tag))
                  .map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#F4F6F3] px-3 py-1.5 text-[11px] font-semibold text-ink/70"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </CardBody>
          </Card>
        </section>
      )}

      {/* ===================================================== */}
      {/* Metrics */}
      {/* ===================================================== */}

      <section
        aria-label="Professional metrics"
        className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4"
      >

        <StatCard
          label="New invitations"
          value="02"
          icon={Mail}
          tone="amber"
        />

        <StatCard
          label="Proposals active"
          value="01"
          icon={FileText}
          tone="ink"
        />

        <StatCard
          label="Deliverables due"
          value="01"
          icon={FolderCheck}
          tone="teal"
        />

        <StatCard
          label="Earned this month"
          value="₦450K"
          icon={Wallet}
          tone="teal"
        />

      </section>

      {/* ===================================================== */}
      {/* Featured opportunity */}
      {/* Now the top of the matched-first list rather than a     */}
      {/* hardcoded slot, so it reflects the current profile.      */}
      {/* ===================================================== */}

      <section
        aria-label="Featured opportunity"
        className="mb-7"
      >

        <div
          className="
            relative
            min-h-[270px]
            overflow-hidden
            rounded-[24px]
            bg-ink
          "
        >

          <img
            src="/images/estate4.jpeg"
            alt="Featured construction project"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />

          <div className="relative flex min-h-[270px] items-end p-6 sm:p-8">

            <div className="max-w-xl text-white">

              <div className="mb-4 flex items-center gap-2">

                <span className="rounded-full bg-white/15 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] backdrop-blur-sm">
                  Featured opportunity
                </span>

                <span className="rounded-full bg-[#B85C12] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em]">
                  {featured.status === 'New' ? 'New' : featured.status}
                </span>

                {featuredIsMatch && (
                  <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] backdrop-blur-sm">
                    <CheckCircle2 size={10} />
                    Matches you
                  </span>
                )}

              </div>

              <h2 className="font-display text-[25px] font-semibold leading-tight tracking-[-0.025em] sm:text-[30px]">
                {featured.service}
              </h2>

              <p className="mt-2 text-[12px] leading-5 text-white/65">
                {featured.project} needs a qualified professional to
                review the package before the project progresses.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] text-white/60">

                <span className="flex items-center gap-1.5">
                  <BriefcaseBusiness size={12} />
                  {featured.location}
                </span>

                <span className="flex items-center gap-1.5">
                  <CalendarClock size={12} />
                  {featured.deadline}
                </span>

                <span className="flex items-center gap-1.5">
                  <CircleDollarSign size={12} />
                  Professional fee
                </span>

              </div>

              <button
                type="button"
                className="
                  mt-6
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white
                  px-5
                  py-2.5
                  text-xs
                  font-bold
                  text-ink
                  transition
                  hover:bg-white/90
                "
              >
                Review invitation
                <ArrowUpRight size={14} />
              </button>

            </div>

          </div>
        </div>

      </section>

      {/* ===================================================== */}
      {/* Invitations + Earnings */}
      {/* ===================================================== */}

      <div className="mb-7 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.75fr)]">

        {/* Invitations */}

        <section aria-label="Service invitations">

          <Card>

            <CardHeader
              title="Recent invitations"
              subtitle="Projects looking for your expertise"
            />

            <CardBody className="pt-2">

              <div className="divide-y divide-ink/[0.07]">

                {sortedInvitations.map((invitation) => {
                  const isMatch = config.hasProfile && config.matchesInvitation(invitation)

                  return (
                    <div
                      key={invitation.id}
                      className="
                        group
                        flex
                        flex-col
                        gap-4
                        py-4
                        first:pt-3
                        last:pb-3
                        sm:flex-row
                        sm:items-center
                      "
                    >

                      {/* Project image */}

                      <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-[13px] sm:h-16 sm:w-24">

                        <img
                          src={invitation.image}
                          alt=""
                          className="
                            h-full
                            w-full
                            object-cover
                            transition
                            duration-500
                            group-hover:scale-105
                          "
                        />

                        <div className="absolute inset-0 bg-black/10" />

                      </div>

                      {/* Details */}

                      <div className="min-w-0 flex-1">

                        <div className="flex flex-wrap items-center gap-2">

                          <p className="font-display text-[14px] font-semibold tracking-[-0.01em] text-ink">
                            {invitation.service}
                          </p>

                          <Badge
                            tone={
                              invitation.status === 'New'
                                ? 'amber'
                                : 'neutral'
                            }
                          >
                            {invitation.status}
                          </Badge>

                          {isMatch && (
                            <Badge tone="teal">
                              Matches you
                            </Badge>
                          )}

                        </div>

                        <p className="mt-1 text-[11px] font-medium text-ink/60">
                          {invitation.project}
                        </p>

                        <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-ink/40">

                          <span>
                            {invitation.location}
                          </span>

                          <span>
                            {invitation.deadline}
                          </span>

                        </div>

                      </div>

                      <button
                        type="button"
                        className="
                          flex
                          shrink-0
                          items-center
                          gap-1.5
                          text-[11px]
                          font-bold
                          text-[#B85C12]
                          transition
                          hover:gap-2.5
                        "
                      >
                        Open
                        <ChevronRight size={14} />
                      </button>

                    </div>
                  )
                })}

              </div>

            </CardBody>

          </Card>

        </section>

        {/* Earnings */}

        <section aria-label="Professional earnings">

          <Card className="h-full overflow-hidden">

            <div className="border-b border-ink/[0.07] px-5 py-5">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
                    Earnings
                  </p>

                  <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                    This month
                  </h2>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
                  <CircleDollarSign size={17} />
                </div>

              </div>

            </div>

            <CardBody className="p-5">

              <p className="text-[11px] text-ink/45">
                Total earned
              </p>

              <p className="mt-1 font-display text-[29px] font-semibold tracking-[-0.035em] text-ink">
                ₦450K
              </p>

              <div className="mt-5 space-y-3">

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-ink/45">
                    Paid
                  </span>

                  <span className="font-semibold text-ink">
                    ₦320K
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
                  <div
                    className="h-full rounded-full bg-[#12613E]"
                    style={{ width: '71%' }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-ink/45">
                    Pending
                  </span>

                  <span className="font-semibold text-[#B85C12]">
                    ₦130K
                  </span>
                </div>

              </div>

              <button
                type="button"
                className="
                  mt-6
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-ink/[0.08]
                  px-4
                  py-3
                  text-xs
                  font-semibold
                  text-ink
                  transition
                  hover:border-ink/20
                "
              >
                <span className="flex items-center gap-2">
                  <Wallet size={14} />
                  View payment history
                </span>

                <ChevronRight size={15} />
              </button>

            </CardBody>

          </Card>

        </section>

      </div>

      {/* ===================================================== */}
      {/* Deliverables */}
      {/* ===================================================== */}

      <section
        className="mb-7"
        aria-label="Upcoming deliverables"
      >

        <Card>

          <CardHeader
            title="Upcoming deliverables"
            subtitle="Work currently assigned to you"
          />

          <CardBody className="pt-2">

            <div className="divide-y divide-ink/[0.07]">

              {deliverables.map((deliverable) => (
                <div
                  key={deliverable.task}
                  className="
                    flex
                    flex-col
                    gap-4
                    py-4
                    first:pt-3
                    last:pb-3
                    sm:flex-row
                    sm:items-center
                  "
                >

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/[0.045] text-ink/60">
                    <FolderCheck size={16} />
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="text-[12px] font-semibold text-ink">
                      {deliverable.task}
                    </p>

                    <p className="mt-1 text-[10px] text-ink/40">
                      {deliverable.project}
                    </p>

                  </div>

                  <div className="w-full sm:w-[180px]">

                    <div className="mb-1.5 flex items-center justify-between">

                      <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-ink/35">
                        Progress
                      </span>

                      <span className="text-[10px] font-semibold text-ink/60">
                        {deliverable.progress}%
                      </span>

                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
                      <div
                        className="h-full rounded-full bg-[#B85C12]"
                        style={{
                          width: `${deliverable.progress}%`,
                        }}
                      />
                    </div>

                  </div>

                  <span
                    className="
                      shrink-0
                      rounded-full
                      bg-[#F7EFE8]
                      px-3
                      py-1.5
                      text-[9px]
                      font-bold
                      text-[#B85C12]
                    "
                  >
                    {deliverable.due}
                  </span>

                </div>
              ))}

            </div>

          </CardBody>

        </Card>

      </section>

      {/* ===================================================== */}
      {/* Quick actions */}
      {/* ===================================================== */}

      <section aria-label="Professional actions">

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

          <button
            type="button"
            className="
              group
              flex
              items-center
              gap-4
              rounded-[18px]
              border
              border-ink/[0.07]
              bg-white
              p-4
              text-left
              transition
              hover:-translate-y-0.5
              hover:shadow-[0_12px_30px_rgba(20,40,30,0.06)]
            "
          >

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7EFE8] text-[#B85C12]">
              <BriefcaseBusiness size={17} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-ink">
                Find opportunities
              </p>

              <p className="mt-0.5 text-[10px] text-ink/45">
                Discover projects matching your expertise.
              </p>
            </div>

            <ChevronRight
              size={15}
              className="text-ink/25 transition group-hover:text-ink/50"
            />

          </button>

          <button
            type="button"
            className="
              group
              flex
              items-center
              gap-4
              rounded-[18px]
              border
              border-ink/[0.07]
              bg-white
              p-4
              text-left
              transition
              hover:-translate-y-0.5
              hover:shadow-[0_12px_30px_rgba(20,40,30,0.06)]
            "
          >

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
              <FileText size={17} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-ink">
                Manage proposals
              </p>

              <p className="mt-0.5 text-[10px] text-ink/45">
                Track proposals you've sent to clients.
              </p>
            </div>

            <ChevronRight
              size={15}
              className="text-ink/25 transition group-hover:text-ink/50"
            />

          </button>

          <button
            type="button"
            className="
              group
              flex
              items-center
              gap-4
              rounded-[18px]
              border
              border-ink/[0.07]
              bg-white
              p-4
              text-left
              transition
              hover:-translate-y-0.5
              hover:shadow-[0_12px_30px_rgba(20,40,30,0.06)]
            "
          >

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/[0.05] text-ink/60">
              <FolderCheck size={17} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-ink">
                Open deliverables
              </p>

              <p className="mt-0.5 text-[10px] text-ink/45">
                Upload and manage your project work.
              </p>
            </div>

            <ChevronRight
              size={15}
              className="text-ink/25 transition group-hover:text-ink/50"
            />

          </button>

        </div>

      </section>

    </DashboardLayout>
  )
}