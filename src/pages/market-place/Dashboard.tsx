import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Bookmark,
  Boxes,
  ChevronRight,
  CircleDollarSign,
  FileText,
  PackageCheck,
  Sparkles,
  Truck,
  Wallet,
} from 'lucide-react'

import { DashboardLayout } from '@/layouts/DashboardLayout'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MaterialRequestList } from '@/modules/procurement/components/MaterialRequestList'
import { materialRequests } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'
import { useProjectProfile } from '@/hooks/useProjectProfile'
import { deriveSupplierDashboardConfig } from '@/derive/supplierDashboardConfig'

const showcaseImages = [
  '/images/interior1.jpeg',
  '/images/interior2.jpeg',
  '/images/interior3.jpeg',
]

const catalogueHighlights = [
  {
    name: 'Finishing & Interiors',
    count: '14 items',
    avgOrder: '₦640,000',
    status: 'active',
    image: showcaseImages[0],
  },
  {
    name: 'Building Materials',
    count: '18 items',
    avgOrder: '₦1.2M',
    status: 'featured',
    image: showcaseImages[1],
  },
  {
    name: 'External Works',
    count: '10 items',
    avgOrder: '₦480,000',
    status: 'low',
    image: showcaseImages[2],
  },
]

// Maps this dashboard's catalogue display groupings to the MATERIAL_CATEGORIES
// values collected in the Project Studio questionnaire, so we can tell which
// of the supplier's declared categories are actually represented in their
// listed catalogue. A real backend would likely tag catalogue items with
// these category values directly, making this map unnecessary.
const CATALOGUE_CATEGORY_MAP: Record<string, string[]> = {
  'Finishing & Interiors': ['finishing', 'paint', 'tiles'],
  'Building Materials': ['cement', 'reinforcement', 'aggregates'],
  'External Works': ['roofing', 'timber'],
}

const catalogueStatusMeta = {
  active: { label: 'Active', bg: 'bg-white/15', text: 'text-white' },
  featured: { label: 'Featured', bg: 'bg-[#B85C12]', text: 'text-white' },
  low: { label: 'Low stock', bg: 'bg-white/15', text: 'text-amber-200' },
}

export function MarketDashboard() {
  const { user } = useAuth()
  const [catalogueView, setCatalogueView] = useState('categories')
  const [savedCategories, setSavedCategories] = useState([])

  // Single source of truth for the Project Studio (SUPPLIER_FLOW) answers.
  const profile = useProjectProfile()

  // What the supplier's current catalogue actually covers, derived from the
  // display data above. Passed into the derivation layer so it can diff
  // "what you said you supply" against "what's actually listed."
  const coveredCategoryValues = useMemo(
    () => Array.from(new Set(catalogueHighlights.flatMap((c) => CATALOGUE_CATEGORY_MAP[c.name] ?? []))),
    [],
  )

  const config = useMemo(
    () => deriveSupplierDashboardConfig(profile.answers ?? {}, coveredCategoryValues),
    [profile.answers, coveredCategoryValues],
  )

  const firstName = user.fullName.split(' ')[0]

  const toggleSaved = (name) => {
    setSavedCategories((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    )
  }

  return (
    <DashboardLayout title="Supplier Overview">

      {/* ===================================================== */}
      {/* Header */}
      {/* ===================================================== */}

      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">
              Supplier command
            </p>
          </div>

          <h1 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[34px]">
            Good afternoon, {firstName}
          </h1>

          <p className="mt-1.5 text-[13px] leading-5 text-ink/50">
            Keep your catalogue moving and stay ahead of today's demand.
          </p>
        </div>

        <div className="flex items-center gap-3">

          {user.verificationStatus !== 'verified' && (
            <Badge tone="amber">
              Verification pending
            </Badge>
          )}

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
            <Boxes size={14} />
            Manage catalogue
          </button>

        </div>
      </div>

      {/* ===================================================== */}
      {/* Supplier profile (from the Project Studio questionnaire) */}
      {/* ===================================================== */}

      {config.hasProfile && (
        <section aria-label="Supplier profile" className="mb-7">
          <Card>
            <CardHeader
              title="Your supplier profile"
              subtitle="From your Project Studio answers"
            />
            <CardBody className="pt-4">
              <div className="flex flex-wrap gap-2">
                {[
                  ...config.categoryLabels,
                  ...config.coverageStateLabels,
                  config.supplyCapacityLabel,
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
        aria-label="Supplier metrics"
        className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4"
      >

        <StatCard
          label="Catalogue items"
          value="42"
          icon={Boxes}
          tone="ink"
        />

        <StatCard
          label="Requests to quote"
          value="02"
          icon={FileText}
          tone="amber"
        />

        <StatCard
          label="Orders in transit"
          value="01"
          icon={Truck}
          tone="teal"
        />

        <StatCard
          label="Awaiting payment"
          value="₦1.8M"
          icon={Wallet}
          tone="amber"
        />

      </section>

      {/* ===================================================== */}
      {/* Business snapshot */}
      {/* ===================================================== */}

      <section
        aria-label="Supplier business snapshot"
        className="
          mb-7
          grid
          grid-cols-1
          gap-5
          xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.7fr)]
        "
      >

        {/* Main demand panel */}

        <div className="relative overflow-hidden rounded-[24px] bg-[#173629] p-6 text-white sm:p-7">

          <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-white/[0.035]" />
          <div className="absolute -bottom-24 right-16 h-40 w-40 rounded-full bg-[#B85C12]/10" />

          <div className="relative">

            <div className="flex items-start justify-between gap-4">

              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <PackageCheck size={18} />
                </div>

                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.15em] text-white/45">
                  Today's demand
                </p>

                <h2 className="mt-1.5 max-w-lg font-display text-[25px] font-semibold leading-tight tracking-[-0.025em] sm:text-[29px]">
                  2 quotation requests are waiting for your response.
                </h2>

                <p className="mt-3 max-w-xl text-[12px] leading-5 text-white/55">
                  {config.isHighVolume
                    ? 'Your declared capacity supports large-volume orders — bulk requests are prioritized to suppliers like you.'
                    : 'Respond quickly to keep your supplier ranking strong and improve your chances of winning the next order.'}
                </p>
              </div>

              <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 sm:flex">
                <ArrowUpRight size={16} />
              </div>

            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">

              <div className="rounded-2xl bg-white/[0.08] p-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-white/40">
                  Requests
                </p>

                <p className="mt-1 font-display text-xl font-semibold">
                  02
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.08] p-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-white/40">
                  In transit
                </p>

                <p className="mt-1 font-display text-xl font-semibold">
                  01
                </p>
              </div>

              <div className="hidden rounded-2xl bg-white/[0.08] p-4 sm:block">
                <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-white/40">
                  Catalogue
                </p>

                <p className="mt-1 font-display text-xl font-semibold">
                  42
                </p>
              </div>

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
              Review requests
              <ArrowUpRight size={14} />
            </button>

          </div>
        </div>

        {/* Finance card */}

        <Card className="overflow-hidden">

          <div className="border-b border-ink/[0.07] px-5 py-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
                  Cash position
                </p>

                <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                  Payments
                </h3>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F7EFE8] text-[#B85C12]">
                <CircleDollarSign size={17} />
              </div>

            </div>
          </div>

          <CardBody className="flex flex-col p-5">

            <div>
              <p className="text-[11px] text-ink/45">
                Pending settlement
              </p>

              <p className="mt-1 font-display text-[28px] font-semibold tracking-[-0.035em] text-ink">
                ₦1.8M
              </p>
            </div>

            <div className="mt-5 rounded-2xl bg-[#F4F7F4] p-4">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-ink/40">
                    Next settlement
                  </p>

                  <p className="mt-1 text-[12px] font-semibold text-ink">
                    Order #AM-1048
                  </p>
                </div>

                <span className="rounded-full bg-[#EAF4EE] px-2.5 py-1 text-[9px] font-bold text-[#12613E]">
                  Processing
                </span>

              </div>

              <p className="mt-3 text-[10px] leading-4 text-ink/45">
                Payment will be released after delivery confirmation.
              </p>

            </div>

            <button
              type="button"
              className="
                mt-5
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
                Open payment history
              </span>

              <ChevronRight size={15} />
            </button>

          </CardBody>
        </Card>

      </section>

      {/* ===================================================== */}
      {/* Catalogue gap — categories the supplier said they cover */}
      {/* at onboarding but that aren't represented in their      */}
      {/* current catalogue. Derived, not hardcoded — see         */}
      {/* src/derive/supplierDashboardConfig.ts.                  */}
      {/* ===================================================== */}

      {config.uncataloguedCategoryLabels.length > 0 && (
        <section aria-label="Catalogue gap" className="mb-7">
          <div className="flex items-start gap-3 rounded-2xl border border-[#B85C12]/20 bg-[#F8EEE6] px-5 py-4">

            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#B85C12]/15 text-[#B85C12]">
              <Boxes size={15} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-semibold text-[#7A3F0C]">
                You said you supply {config.uncataloguedCategoryLabels.join(', ')} — but{' '}
                {config.uncataloguedCategoryLabels.length === 1 ? "that category isn't" : "those categories aren't"}{' '}
                listed in your catalogue yet.
              </p>

              <p className="mt-1 text-[11px] leading-5 text-[#7A3F0C]/70">
                Buyers browsing those categories can't currently find anything from you.
              </p>

              <button
                type="button"
                className="mt-2.5 text-[11px] font-bold text-[#B85C12] underline underline-offset-2"
              >
                Add catalogue items
              </button>
            </div>

          </div>
        </section>
      )}

      {/* ===================================================== */}
      {/* Catalogue showcase */}
      {/* ===================================================== */}

      <section
        aria-label="Catalogue highlights"
        className="mb-7"
      >

        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
              Your catalogue
            </p>

            <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em] text-ink">
              What you're supplying
            </h2>
          </div>

          <div className="flex items-center gap-2">

            <div className="flex items-center gap-1 rounded-full border border-ink/[0.08] bg-white p-1">

              <button
                type="button"
                onClick={() => setCatalogueView('categories')}
                className={`
                  rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition
                  ${catalogueView === 'categories'
                    ? 'bg-ink text-white'
                    : 'text-ink/50 hover:text-ink'}
                `}
              >
                Categories
              </button>

              <button
                type="button"
                onClick={() => setCatalogueView('drafts')}
                className={`
                  flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition
                  ${catalogueView === 'drafts'
                    ? 'bg-ink text-white'
                    : 'text-ink/50 hover:text-ink'}
                `}
              >
                Drafts
                <span className="rounded-full bg-[#B85C12]/15 px-1.5 py-0.5 text-[9px] font-bold text-[#B85C12]">
                  3
                </span>
              </button>

            </div>

            <button
              type="button"
              className="
                hidden
                items-center
                gap-1
                text-xs
                font-semibold
                text-[#B85C12]
                sm:flex
              "
            >
              Manage catalogue
              <ChevronRight size={14} />
            </button>

          </div>

        </div>

        {catalogueView === 'categories' ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            {catalogueHighlights.map((category) => {
              const statusMeta = catalogueStatusMeta[category.status]
              const isSaved = savedCategories.includes(category.name)

              return (
                <article
                  key={category.name}
                  className="
                    group
                    relative
                    h-[220px]
                    overflow-hidden
                    rounded-[20px]
                    bg-ink
                  "
                >

                  <img
                    src={category.image}
                    alt={category.name}
                    className="
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-cover
                      transition
                      duration-500
                      group-hover:scale-105
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">

                    <span
                      className={`
                        flex items-center gap-1 rounded-full px-2.5 py-1
                        text-[9px] font-bold uppercase tracking-[0.08em]
                        ${statusMeta.bg} ${statusMeta.text}
                      `}
                    >
                      {category.status === 'featured' && <Sparkles size={10} />}
                      {statusMeta.label}
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleSaved(category.name)}
                      aria-pressed={isSaved}
                      aria-label={isSaved ? 'Remove from saved' : 'Save category'}
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        bg-white/15
                        text-white
                        backdrop-blur-sm
                        transition
                        hover:bg-white/25
                      "
                    >
                      <Bookmark
                        size={13}
                        className={isSaved ? 'fill-white' : ''}
                      />
                    </button>

                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4">

                    <div className="flex items-end justify-between gap-3">

                      <div className="min-w-0">
                        <h3 className="font-display text-[16px] font-semibold text-white">
                          {category.name}
                        </h3>

                        <p className="mt-1 text-[10px] text-white/55">
                          {category.count} currently listed
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-white/40">
                          Avg. order
                        </p>

                        <p className="mt-0.5 font-display text-[15px] font-semibold text-white">
                          {category.avgOrder}
                        </p>
                      </div>

                    </div>

                  </div>

                </article>
              )
            })}

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-[20px] border border-dashed border-ink/15 bg-white py-14 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F7EFE8] text-[#B85C12]">
              <FileText size={18} />
            </div>

            <p className="mt-3 text-[13px] font-semibold text-ink">
              3 categories saved as drafts
            </p>

            <p className="mt-1 max-w-xs text-[11px] leading-4 text-ink/45">
              Finish adding prices and photos to publish them to your live catalogue.
            </p>

            <button
              type="button"
              className="mt-4 rounded-full bg-ink px-4 py-2 text-[11px] font-semibold text-white transition hover:opacity-90"
            >
              Resume drafts
            </button>
          </div>
        )}

      </section>

      {/* ===================================================== */}
      {/* Incoming requests */}
      {/* ===================================================== */}

      <section
        className="mb-7"
        aria-label="Incoming material requests"
      >

        <Card>

          <CardHeader
            title="Incoming requests"
            subtitle="Material demand currently routed to your business"
          />

          <CardBody className="pt-4">

            <MaterialRequestList
              requests={materialRequests}
            />

          </CardBody>

        </Card>

      </section>

      {/* ===================================================== */}
      {/* Quick actions */}
      {/* ===================================================== */}

      <section aria-label="Supplier quick actions">

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
              <Boxes size={17} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-ink">
                Add catalogue item
              </p>

              <p className="mt-0.5 text-[10px] text-ink/45">
                Expand what contractors can order.
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
                Review quotations
              </p>

              <p className="mt-0.5 text-[10px] text-ink/45">
                Respond to open requests before they expire.
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
              <Truck size={17} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-ink">
                Track deliveries
              </p>

              <p className="mt-0.5 text-[10px] text-ink/45">
                Monitor orders currently on the road.
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