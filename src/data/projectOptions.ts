import {
  Home as HomeIcon,
  Building2,
  Building,
  Sparkles,
  Leaf,
  Gem,
  Clock3,
  MapPin,
  Wallet,
  FileCheck2,
  ScrollText,
  HardHat,
  Layers,
  CheckCircle2,
  Trees,
  ShieldCheck,
  Sun,
  Briefcase,
  Truck,
  Wrench,
  Users,
  Package,
  Award,
  Pencil,
  type LucideIcon,
} from 'lucide-react'

/* ============================================================
   SHARED PROJECT STUDIO OPTIONS
   ------------------------------------------------------------
   Single source of truth for every option catalog used by the
   Project Studio questionnaire AND by any dashboard that needs
   to turn a raw stored answer (e.g. "duplex") into a label
   (e.g. "Duplex"), or match a profile against real inventory
   (e.g. a contractor's coverage states against open tenders,
   or a supplier's categories against their own catalogue).

   Rule: ProjectQuestionnaire.tsx defines NO option lists of its
   own. If a question offers choices, the choices live here, so
   the label a person picked and the label a dashboard shows can
   never drift apart. Import from here in the questionnaire and
   in any derive/*DashboardConfig.ts file.
   ============================================================ */

export type StudioOption = {
  value: string
  label: string
  description?: string
  icon?: LucideIcon
  image?: string
}

/**
 * `floor` and `ceiling` are in millions of naira (₦M).
 * A band covers floor <= amount < ceiling; `ceiling: null` means open-ended.
 */
export type InvestmentBand = {
  value: string
  label: string
  range: string
  floor: number
  ceiling: number | null
}

/* ---------- Shared across roles ---------- */

export const COVERAGE_STATES: StudioOption[] = [
  { value: 'lagos', label: 'Lagos', icon: MapPin },
  { value: 'abuja', label: 'Abuja (FCT)', icon: MapPin },
  { value: 'rivers', label: 'Rivers', icon: MapPin },
  { value: 'oyo', label: 'Oyo', icon: MapPin },
  { value: 'kano', label: 'Kano', icon: MapPin },
  { value: 'other', label: 'Other states', icon: MapPin },
]

export const CAPACITY_OPTIONS: StudioOption[] = [
  { value: 'one', label: '1 project', icon: Briefcase },
  { value: 'few', label: '2\u20133 projects', icon: Briefcase },
  { value: 'several', label: '4+ projects', icon: Briefcase },
  { value: 'booked', label: 'Fully booked for now', icon: Clock3 },
]

/* ---------- Client ---------- */

export const PROJECT_TYPES: StudioOption[] = [
  { value: 'family-home', label: 'Family Home', description: 'A comfortable home built for everyday living and long-term family life.', icon: HomeIcon, image: '/images/interior1.jpeg' },
  { value: 'apartments', label: 'Apartments', description: 'Multi-unit residential buildings for rental or personal investment.', icon: Building2, image: '/images/estate4.jpeg' },
  { value: 'commercial', label: 'Commercial', description: 'Office, retail, or mixed-use spaces designed for business growth.', icon: Building, image: '/images/Real2.jpeg' },
  { value: 'hospitality', label: 'Hospitality', description: 'Hotels, guest houses, and leisure properties with standout guest experiences.', icon: Sparkles, image: '/images/estate1.jpeg' },
  { value: 'renovation', label: 'Renovation', description: 'Transform or expand an existing structure with a clear scope and budget.', icon: Layers, image: '/images/interior3.jpeg' },
  { value: 'community', label: 'Community', description: 'Schools, worship centres, and shared spaces that serve many people.', icon: Building2, image: '/images/estate5.jpeg' },
  { value: 'other', label: 'Something Else', description: 'A unique project vision that does not fit the categories above.', icon: Sparkles, image: '/images/yea9.jpeg' },
]

export const PROPERTY_TYPES: StudioOption[] = [
  { value: 'duplex', label: 'Duplex', description: 'Two-level home with shared or separate living spaces.', icon: Building, image: '/images/Real1.jpeg' },
  { value: 'bungalow', label: 'Bungalow', description: 'Single-storey home with easy access and efficient layout.', icon: HomeIcon, image: '/images/estate2.jpeg' },
  { value: 'villa', label: 'Villa / Mansion', description: 'Spacious luxury residence with premium finishes.', icon: Gem, image: '/images/interior2.jpeg' },
  { value: 'investment', label: 'Investment Property', description: 'Built primarily for income, resale, or portfolio growth.', icon: Wallet, image: '/images/Real4.jpeg' },
  { value: 'multi-family', label: 'Multi-family Home', description: 'Several households under one coordinated build programme.', icon: Building2, image: '/images/Real3.jpeg' },
  { value: 'unsure', label: 'Not Sure Yet', description: 'We\u2019ll help you decide during your professional consultation.', icon: Sparkles, image: '/images/yea5.jpeg' },
]

export const HOME_FEELINGS: StudioOption[] = [
  { value: 'warm', label: 'Warm & Family-Oriented' },
  { value: 'modern', label: 'Modern & Elegant' },
  { value: 'luxurious', label: 'Luxurious' },
  { value: 'smart', label: 'Smart Home Ready' },
  { value: 'peaceful', label: 'Peaceful & Private' },
  { value: 'entertaining', label: 'Great for Entertaining' },
  { value: 'minimal', label: 'Minimal & Calm' },
  { value: 'bold', label: 'Bold & Statement-Making' },
  { value: 'nature', label: 'Connected to Nature' },
  { value: 'heritage', label: 'Rooted in Heritage' },
  { value: 'resort', label: 'Resort-Like Escape' },
  { value: 'practical', label: 'Practical & Low-Maintenance' },
]

export const PRIORITIES: StudioOption[] = [
  { value: 'security', label: 'Security & Privacy', icon: ShieldCheck },
  { value: 'light', label: 'Natural Light', icon: Sun },
  { value: 'completion', label: 'Fast Completion', icon: Clock3 },
  { value: 'expansion', label: 'Future Expansion', icon: Layers },
  { value: 'energy', label: 'Energy Efficiency', icon: Leaf },
  { value: 'outdoor', label: 'Outdoor Living', icon: Trees },
  { value: 'smart', label: 'Smart Home Ready', icon: Sparkles },
  { value: 'maintenance', label: 'Low Maintenance', icon: CheckCircle2 },
  { value: 'accessibility', label: 'Accessibility', icon: HomeIcon },
  { value: 'rental', label: 'Rental Yield', icon: Wallet },
]

export const INVESTMENT_BANDS: InvestmentBand[] = [
  { value: 'starter', label: 'Starter', range: '\u20a620M \u2013 \u20a650M', floor: 20, ceiling: 50 },
  { value: 'family', label: 'Family', range: '\u20a650M \u2013 \u20a6150M', floor: 50, ceiling: 150 },
  { value: 'premium', label: 'Premium', range: '\u20a6150M \u2013 \u20a6300M', floor: 150, ceiling: 300 },
  { value: 'luxury', label: 'Luxury', range: '\u20a6300M+', floor: 300, ceiling: null },
]

export const LAND_STATUS_OPTIONS: StudioOption[] = [
  { value: 'owned', label: 'I already own land', description: 'You have a plot and are ready to move into design or construction.', icon: HomeIcon },
  { value: 'searching', label: 'I am looking for land', description: 'You need help finding or evaluating land before design begins.', icon: Trees },
  { value: 'design', label: 'I only need a design', description: 'You want architectural drawings before choosing a contractor.', icon: FileCheck2 },
  { value: 'drawings', label: 'I already have drawings', description: 'Your plans are ready and you need contractor bids or project setup.', icon: CheckCircle2 },
  { value: 'contractor', label: 'I already have a contractor', description: 'Your build team is chosen and you want milestone protection next.', icon: HardHat },
]

/** Follow-up to LAND_STATUS_OPTIONS = "owned". */
export const OWNED_LAND_READINESS_OPTIONS: StudioOption[] = [
  { value: 'documented', label: 'Title & documents ready', description: 'Survey, title and approvals are in order.', icon: FileCheck2 },
  { value: 'in-progress', label: 'Documentation in progress', description: 'Some paperwork is still being sorted out.', icon: ScrollText },
  { value: 'not-surveyed', label: 'Not yet surveyed', description: 'The land hasn\u2019t been formally surveyed.', icon: MapPin },
  { value: 'unsure', label: 'Not sure', description: 'We can help you verify this before moving forward.', icon: Sparkles },
]

/** Follow-up to LAND_STATUS_OPTIONS = "design". */
export const DESIGN_NEED_OPTIONS: StudioOption[] = [
  { value: 'architectural', label: 'Full architectural drawings', description: 'Complete design from concept to construction drawings.', icon: Pencil },
  { value: 'structural', label: 'Structural engineering only', description: 'You already have a design and need engineering sign-off.', icon: HardHat },
  { value: 'interior', label: 'Interior design', description: 'Layout, finishes and furnishing plans.', icon: Sparkles },
  { value: 'unsure', label: 'Not sure yet', description: 'A professional can help you scope this out.', icon: Sparkles },
]

/** Follow-up to LAND_STATUS_OPTIONS = "drawings". */
export const DRAWINGS_NEED_OPTIONS: StudioOption[] = [
  { value: 'bids', label: 'Contractor bids', description: 'Compare verified contractors against your drawings.', icon: HardHat },
  { value: 'funding', label: 'Milestone-controlled funding', description: 'Set up controlled wallets before construction starts.', icon: Wallet },
  { value: 'both', label: 'Both', description: 'Contractor bids and funding controls together.', icon: CheckCircle2 },
  { value: 'unsure', label: 'Not sure', description: 'We can walk you through the options.', icon: Sparkles },
]

/** Follow-up to LAND_STATUS_OPTIONS = "contractor". */
export const CONTRACTOR_NEED_OPTIONS: StudioOption[] = [
  { value: 'payments', label: 'Milestone payment protection', description: 'Release funds only against approved, evidenced progress.', icon: ShieldCheck },
  { value: 'monitoring', label: 'Progress monitoring & evidence', description: 'Site reports, photos and inspections in one record.', icon: FileCheck2 },
  { value: 'disputes', label: 'Dispute support', description: 'A structured process if something goes wrong.', icon: ScrollText },
  { value: 'unsure', label: 'Not sure yet', description: 'We can help you decide once we see your project.', icon: Sparkles },
]

export const STAGE_OPTIONS: StudioOption[] = [
  { value: 'idea', label: 'Idea stage', icon: Sparkles },
  { value: 'land', label: 'Land acquisition', icon: MapPin },
  { value: 'design', label: 'Design & planning', icon: ScrollText },
  { value: 'approval', label: 'Government approval', icon: FileCheck2 },
  { value: 'construction', label: 'Construction started', icon: HardHat },
  { value: 'finishing', label: 'Finishing stage', icon: HomeIcon },
]

/**
 * Which project stages make sense for each land-status answer. The land-status
 * question already captures land acquisition, so a client who owns land is
 * never asked about it again.
 */
const STAGE_VALUES_BY_LAND_STATUS: Record<string, string[]> = {
  searching: ['idea', 'land', 'design', 'approval'],
  owned: ['idea', 'design', 'approval', 'construction', 'finishing'],
  design: ['idea', 'design', 'approval'],
  drawings: ['design', 'approval', 'construction', 'finishing'],
  contractor: ['approval', 'construction', 'finishing'],
}

/** First-person wording used when the client is choosing a stage in the questionnaire. */
const CLIENT_STAGE_LABELS: Record<string, string> = {
  idea: 'I\u2019m planning and exploring ideas',
  land: 'I\u2019m currently acquiring land',
  design: 'Design and planning',
  approval: 'Permits and approvals',
  construction: 'Construction is underway',
  finishing: 'Finishing and final touches',
}

/**
 * Stage options for the questionnaire, narrowed by the client's land status.
 * Values are always a subset of STAGE_OPTIONS, so dashboards can keep labelling
 * a stored stage with getOptionLabel(STAGE_OPTIONS, value).
 */
export function getStageOptionsForLandStatus(landStatus: string | undefined | null): StudioOption[] {
  const allowed = landStatus ? STAGE_VALUES_BY_LAND_STATUS[landStatus] : undefined
  if (!allowed) return STAGE_OPTIONS

  return STAGE_OPTIONS
    .filter((option) => allowed.includes(option.value))
    .map((option) => ({ ...option, label: CLIENT_STAGE_LABELS[option.value] ?? option.label }))
}

/* ---------- Contractor ---------- */

/**
 * Pulled out of ProjectQuestionnaire.tsx's CONTRACTOR_FLOW so the
 * contractor dashboard's derivation layer can label and match against
 * the same values the questionnaire collects, instead of maintaining
 * a second copy that can drift out of sync.
 */
export const CONTRACTOR_SPECIALTIES: StudioOption[] = [
  { value: 'residential', label: 'Residential construction', icon: HomeIcon },
  { value: 'commercial', label: 'Commercial construction', icon: Building },
  { value: 'renovation', label: 'Renovation & remodeling', icon: Layers },
  { value: 'civil', label: 'Civil / infrastructure', icon: HardHat },
  { value: 'electrical', label: 'Electrical', icon: Sparkles },
  { value: 'plumbing', label: 'Plumbing & mechanical', icon: Wrench },
]

/** Same reasoning as CONTRACTOR_SPECIALTIES — shared between the questionnaire and dashboards. */
export const TEAM_SIZE_OPTIONS: StudioOption[] = [
  { value: 'solo', label: 'Just me', description: 'Independent contractor.', icon: HardHat },
  { value: 'small', label: 'Small team', description: '2\u201310 people.', icon: Users },
  { value: 'mid', label: 'Mid-size crew', description: '11\u201350 people.', icon: Users },
  { value: 'large', label: 'Large company', description: '50+ people.', icon: Building2 },
]

/* ---------- Supplier ---------- */

export const SUPPLY_CAPACITY_OPTIONS: StudioOption[] = [
  { value: 'small', label: 'Small volume', description: 'Individual site orders.', icon: Truck },
  { value: 'medium', label: 'Medium volume', description: 'Multiple concurrent sites.', icon: Truck },
  { value: 'large', label: 'Large volume', description: 'Large developments.', icon: Truck },
  { value: 'bulk', label: 'Bulk / wholesale', description: 'Distributor-scale supply.', icon: Truck },
]

/**
 * Pulled out of ProjectQuestionnaire.tsx's SUPPLIER_FLOW so the supplier
 * dashboard can label a supplier's chosen categories AND diff them
 * against the supplier's actual catalogue — see supplierDashboardConfig.ts.
 */
export const MATERIAL_CATEGORIES: StudioOption[] = [
  { value: 'cement', label: 'Cement & concrete', icon: Package },
  { value: 'reinforcement', label: 'Reinforcement & steel', icon: Package },
  { value: 'aggregates', label: 'Aggregates (sand, granite)', icon: Package },
  { value: 'roofing', label: 'Roofing', icon: Package },
  { value: 'electrical', label: 'Electrical', icon: Package },
  { value: 'plumbing', label: 'Plumbing', icon: Package },
  { value: 'finishing', label: 'Finishing & fittings', icon: Package },
  { value: 'timber', label: 'Timber & woodwork', icon: Package },
  { value: 'tiles', label: 'Tiles & flooring', icon: Package },
  { value: 'paint', label: 'Paint & coatings', icon: Package },
]

/* ---------- Professional / Project manager ---------- */

/**
 * Pulled out of ProjectQuestionnaire.tsx's PROFESSIONAL_FLOW so the
 * professional dashboard can label and match against the same values
 * the questionnaire collects. Deliberately separate from
 * CONTRACTOR_SPECIALTIES — architects/engineers/designers and
 * contractors describe their specialty differently, and conflating
 * the two catalogs would force awkward shared values on both flows.
 */
export const PROFESSIONAL_SPECIALIZATIONS: StudioOption[] = [
  { value: 'residential', label: 'Residential design', icon: HomeIcon },
  { value: 'commercial', label: 'Commercial design', icon: Building },
  { value: 'structural', label: 'Structural engineering', icon: HardHat },
  { value: 'interiors', label: 'Interior design', icon: Sparkles },
  { value: 'survey', label: 'Survey & measurement', icon: MapPin },
  { value: 'consulting', label: 'Consulting & advisory', icon: Award },
]

/**
 * Pulled out of ProjectQuestionnaire.tsx's PROJECT_MANAGER_FLOW. Kept
 * separate from CONTRACTOR_SPECIALTIES and PROFESSIONAL_SPECIALIZATIONS —
 * a PM's "kinds of projects I manage" is its own small vocabulary
 * (residential/commercial/infrastructure/renovation), not a subset of
 * either.
 */
export const PROJECT_MANAGEMENT_SPECIALIZATIONS: StudioOption[] = [
  { value: 'residential', label: 'Residential', icon: HomeIcon },
  { value: 'commercial', label: 'Commercial', icon: Building },
  { value: 'infrastructure', label: 'Infrastructure', icon: HardHat },
  { value: 'renovation', label: 'Renovation', icon: Layers },
]

/* ---------- Lookup helpers (used by dashboards) ---------- */

/** Find the full option for a stored value. */
export function getOption(catalog: StudioOption[], value: string | undefined | null): StudioOption | undefined {
  if (!value) return undefined
  return catalog.find((option) => option.value === value)
}

/** True when a stored value still exists in the catalog (useful for ignoring stale answers). */
export function hasOption(catalog: StudioOption[], value: string | undefined | null): boolean {
  return getOption(catalog, value) !== undefined
}

/** Turn a single stored value (e.g. "duplex") into its label (e.g. "Duplex"). */
export function getOptionLabel(catalog: StudioOption[], value: string | undefined | null): string | undefined {
  return getOption(catalog, value)?.label
}

/** Turn an array of stored values into an array of labels, dropping any that don't match. */
export function getOptionLabels(catalog: StudioOption[], values: string[] | undefined | null): string[] {
  if (!values || !values.length) return []
  return values
    .map((value) => getOptionLabel(catalog, value))
    .filter((label): label is string => Boolean(label))
}

/** Turn a stored investment band value (e.g. "premium") into its display range (e.g. "₦150M – ₦300M"). */
export function getBandRange(bands: InvestmentBand[], value: string | undefined | null): string | undefined {
  if (!value) return undefined
  return bands.find((band) => band.value === value)?.range
}

/**
 * Find the band containing an amount given in millions of naira
 * (e.g. 75 → "family"). A boundary belongs to the higher band, so 150 is
 * "premium". Returns undefined for amounts below the lowest band.
 */
export function getBandForAmount(bands: InvestmentBand[], amountInMillions: number): InvestmentBand | undefined {
  return bands.find(
    (band) => amountInMillions >= band.floor && (band.ceiling === null || amountInMillions < band.ceiling)
  )
}