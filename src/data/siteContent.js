import {
  ShieldCheck,
  Wallet,
  Building2,
  Users,
  Boxes,
  ClipboardCheck,
  Award,
  FileCheck2,
  UserCheck,
  FolderCheck,
  ScrollText,
  Compass,
  HardHat,
  PackageCheck,
} from 'lucide-react'

export const roleCards = [
  {
    icon: Building2,
    title: 'Clients & Diaspora Investors',
    body: 'Build at home from anywhere. Fund escrow, review verified bids, and monitor every milestone remotely.',
  },
  {
    icon: Users,
    title: 'Contractors',
    body: 'Access verified projects, submit transparent bids and get paid when approved milestones are completed.',
  },
  {
    icon: Boxes,
    title: 'Market Place',
    body: 'Respond to verified demand, deliver approved materials and receive payment against confirmed delivery.',
  },
  {
    icon: ClipboardCheck,
    title: 'Project Managers',
    body: 'Inspect, verify and report every phase with evidence connected directly to project decisions.',
  },
  {
    icon: Award,
    title: 'Professionals',
    body: 'Architects, engineers and surveyors manage scoped services and deliverables in one workflow.',
  },
  {
    icon: ShieldCheck,
    title: 'Build OS Admin',
    body: 'Govern verification, compliance, financial controls and disputes with complete oversight.',
  },
]

export const pillars = [
  {
    icon: UserCheck,
    number: '01',
    title: 'Verified people',
    body: 'Every client, contractor, supplier, professional and administrator is registered and checked before they can transact.',
  },
  {
    icon: FolderCheck,
    number: '02',
    title: 'Verified projects',
    body: 'Land, title documents, budgets, scope and risk are reviewed before execution begins.',
  },
  {
    icon: ScrollText,
    number: '03',
    title: 'Verified payments',
    body: 'Every release is connected to evidence, independent verification and client approval.',
  },
]

export const stakeholders = [
  'Property Owners',
  'Investors',
  'Diaspora Clients',
  'Developers',
  'Contractors',
  'Market Place',
  'Architects',
  'Engineers',
  'Surveyors',
  'Project Managers',
  'Financial Partners',
  'Institutions',
]

export const steps = [
  {
    n: '01',
    title: 'Acquire & verify',
    body: 'Land, ownership, location and documentation are checked before execution begins.',
    icon: FileCheck2,
  },
  {
    n: '02',
    title: 'Design & approve',
    body: 'Surveys, architecture, engineering and approvals are coordinated in one workflow.',
    icon: Compass,
  },
  {
    n: '03',
    title: 'Bid & award',
    body: 'Verified contractors are compared by price, trust score, capacity and risk.',
    icon: Users,
  },
  {
    n: '04',
    title: 'Fund & control',
    body: 'Project funds are protected in controlled wallets and released against evidence.',
    icon: Wallet,
  },
  {
    n: '05',
    title: 'Build & monitor',
    body: 'Work, materials, milestones and site evidence are tracked as execution happens.',
    icon: HardHat,
  },
  {
    n: '06',
    title: 'Verify & handover',
    body: 'Completion is verified and compiled into a permanent Digital Property Passport.',
    icon: PackageCheck,
  },
]

export const stats = [
  ['₦2.1B+', 'Escrow protected'],
  ['340+', 'Verified contractors'],
  ['96%', 'Milestones delivered on spec'],
  ['48hrs', 'Average dispute resolution'],
]

export const walletLines = [
  ['Materials', '₦21.8M', 'Reserved'],
  ['Labour', '₦18.2M', 'Controlled'],
  ['Professional', '₦7.4M', 'Verified'],
  ['Contingency', '₦4.0M', 'Available'],
]

export const financialControls = [
  'Milestone-based releases',
  'Payment freezing on dispute',
  'Partial acceptance',
  'Refund controls',
  'Procurement wallets',
  'Immutable audit trail',
]

export const procurementItems = [
  ['Cement — 42.5R', '120 bags', '₦1,020,000'],
  ['Reinforcement — Y16', '4.2 tons', '₦4,830,000'],
  ['Sharp sand', '18 trips', '₦540,000'],
  ['Granite', '15 trips', '₦780,000'],
]

export const procurementStages = [
  ['Requested', 'done'],
  ['Quoted', 'done'],
  ['Fund reserved', 'done'],
  ['Delivered', 'pending'],
]

export const evidenceTimeline = [
  ['09:42', 'Foundation milestone verified'],
  ['11:18', 'Engineer uploaded inspection report'],
  ['13:04', 'Material delivery confirmed on site'],
  ['15:26', 'Client approved payment release'],
]

export const controlMatrix = [
  'KYC & business verification',
  'Project readiness assessment',
  'Structured contractor bidding',
  'Escrow & wallet controls',
  'Procurement verification',
  'Milestone approvals',
  'Site evidence & monitoring',
  'Dispute resolution',
  'Immutable audit trails',
  'Digital Property Passport',
]

export const galleryItems = [
  {
    src: '/images/estate1.jpeg',
    label: 'Plot 14, Guzape District',
    tag: 'Handover',
  },
  {
    src: '/images/Real5.jpeg',
    label: 'Foundation phase, Karsana',
    tag: 'In progress',
  },
  {
    src: '/images/interior2.jpeg',
    label: 'Interior fit-out, Jabi',
    tag: 'Finishing',
  },
  {
    src: '/images/Real3.jpeg',
    label: 'Completed build, Lugbe',
    tag: 'Verified',
  },
]

export const trustFeatures = [
  {
    icon: Wallet,
    title: 'Milestone escrow',
    body: 'Released only on verified progress.',
  },
  {
    icon: ShieldCheck,
    title: 'Trust score',
    body: 'Participants are continuously assessed.',
  },
  {
    icon: ScrollText,
    title: 'Dispute assurance',
    body: 'Frozen funds and evidence review.',
  },
  {
    icon: FileCheck2,
    title: 'Property Passport',
    body: 'A verified record from land to handover.',
  },
]