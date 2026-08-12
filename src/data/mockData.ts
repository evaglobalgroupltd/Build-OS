import type { User, UserRole } from '@/types'
import type { Project } from '@/modules/projects/types'
import type { Bid } from '@/modules/bidding/types'
import type { EscrowTransaction } from '@/modules/escrow/types'
import type { Dispute } from '@/modules/disputes/types'
import type { MaterialRequest } from '@/modules/procurement/types'

// Demo users, one per role, used by the role switcher in this scaffold.
export const demoUsers: Record<UserRole, User> = {
  client: {
    id: 'u-client-1',
    fullName: 'Amaka Obi',
    email: 'amaka.obi@example.com',
    role: 'client',
    avatarInitials: 'AO',
    verificationStatus: 'verified',
    trustScore: 88,
    country: 'United Kingdom (Diaspora)',
  },

  contractor: {
    id: 'u-contractor-1',
    fullName: 'Segun Adeyemi',
    email: 'segun@primebuildltd.com',
    role: 'contractor',
    avatarInitials: 'SA',
    verificationStatus: 'verified',
    trustScore: 79,
    country: 'Nigeria',
  },

  supplier: {
    id: 'u-supplier-1',
    fullName: 'Chika Nwosu',
    email: 'chika@nwosumaterials.com',
    role: 'supplier',
    avatarInitials: 'CN',
    verificationStatus: 'pending',
    trustScore: 71,
    country: 'Nigeria',
  },

  project_manager: {
    id: 'u-pm-1',
    fullName: 'Ibrahim Musa',
    email: 'ibrahim.musa@buildos.com',
    role: 'project_manager',
    avatarInitials: 'IM',
    verificationStatus: 'verified',
    trustScore: 92,
    country: 'Nigeria',
  },

  professional: {
    id: 'u-pro-1',
    fullName: 'Funmi Bello',
    email: 'funmi@belloarchitects.com',
    role: 'professional',
    avatarInitials: 'FB',
    verificationStatus: 'verified',
    trustScore: 85,
    country: 'Nigeria',
  },

  admin: {
    id: 'u-admin-1',
    fullName: 'Tola Fashina',
    email: 'tola@buildos.com',
    role: 'admin',
    avatarInitials: 'TF',
    verificationStatus: 'verified',
    trustScore: 100,
    country: 'Nigeria',
  },
}

export const projects: Project[] = [
  {
    id: 'p-1001',
    name: 'Lekki 4-Bedroom Duplex',
    location: 'Lekki, Lagos',
    clientId: 'u-client-1',
    clientName: 'Amaka Obi',
    stage: 'in_progress',
    budget: 68_000_000,
    currency: 'NGN',
    escrowBalance: 24_500_000,
    progressPercent: 42,
    contractorName: 'Prime Build Ltd',
    startDate: '2026-02-10',
    targetCompletionDate: '2026-12-01',
    openDisputes: 0,
    pendingApprovals: 2,
  },

  {
    id: 'p-1002',
    name: 'Abuja Terrace (3 Units)',
    location: 'Guzape, Abuja',
    clientId: 'u-client-1',
    clientName: 'Amaka Obi',
    stage: 'bidding',
    budget: 145_000_000,
    currency: 'NGN',
    escrowBalance: 0,
    progressPercent: 0,
    startDate: '2026-09-01',
    targetCompletionDate: '2027-08-01',
    openDisputes: 0,
    pendingApprovals: 5,
  },

  {
    id: 'p-1003',
    name: 'Ibadan Bungalow Renovation',
    location: 'Bodija, Ibadan',
    clientId: 'u-client-2',
    clientName: 'Wale Fashola',
    stage: 'monitoring',
    budget: 21_000_000,
    currency: 'NGN',
    escrowBalance: 6_200_000,
    progressPercent: 76,
    contractorName: 'Solid Foundation Ltd',
    startDate: '2025-11-01',
    targetCompletionDate: '2026-06-15',
    openDisputes: 1,
    pendingApprovals: 1,
  },
]

export const bids: Bid[] = [
  {
    id: 'b-1',
    projectId: 'p-1002',
    contractorName: 'Prime Build Ltd',
    trustScore: 79,
    verified: true,
    amount: 141_500_000,
    currency: 'NGN',
    timelineWeeks: 44,
    status: 'shortlisted',
  },

  {
    id: 'b-2',
    projectId: 'p-1002',
    contractorName: 'Zenith Structures',
    trustScore: 64,
    verified: true,
    amount: 137_000_000,
    currency: 'NGN',
    timelineWeeks: 48,
    status: 'submitted',
  },

  {
    id: 'b-3',
    projectId: 'p-1002',
    contractorName: 'Concrete & Co',
    trustScore: 58,
    verified: false,
    amount: 129_800_000,
    currency: 'NGN',
    timelineWeeks: 50,
    status: 'submitted',
  },
]

export const escrowTransactions: EscrowTransaction[] = [
  {
    id: 'e-1',
    projectId: 'p-1001',
    type: 'deposit',
    amount: 20_000_000,
    currency: 'NGN',
    milestoneLabel: 'Initial Deposit',
    date: '2026-02-12',
    fundingSource: 'Client Wallet',
  },

  {
    id: 'e-2',
    projectId: 'p-1001',
    type: 'release',
    amount: 8_000_000,
    currency: 'NGN',
    milestoneLabel: 'Foundation Complete',
    date: '2026-03-30',
    fundingSource: 'Escrow Account',
  },

  {
    id: 'e-3',
    projectId: 'p-1001',
    type: 'deposit',
    amount: 12_500_000,
    currency: 'NGN',
    milestoneLabel: 'Milestone 2 Top-up',
    date: '2026-05-18',
    fundingSource: 'Client Wallet',
  },

  {
    id: 'e-4',
    projectId: 'p-1003',
    type: 'freeze',
    amount: 2_100_000,
    currency: 'NGN',
    milestoneLabel: 'Under Dispute Review',
    date: '2026-07-02',
    fundingSource: 'Escrow Account',
  },
]

export const disputes: Dispute[] = [
  {
    id: 'd-1',
    projectId: 'p-1003',
    category: 'Quality of Work',
    raisedBy: 'Wale Fashola',
    respondent: 'Solid Foundation Ltd',
    amount: 2_100_000,
    status: 'under_review',
    openedDate: '2026-07-01',
  },
]

export const materialRequests: MaterialRequest[] = [
  {
    id: 'm-1',
    projectId: 'p-1001',
    item: 'Dangote Cement (50kg bags)',
    quantity: '600 bags',
    status: 'ordered',
    supplierName: 'Nwosu Materials',
  },

  {
    id: 'm-2',
    projectId: 'p-1001',
    item: '12mm Reinforcement Rods',
    quantity: '4 tons',
    status: 'quoted',
  },

  {
    id: 'm-3',
    projectId: 'p-1001',
    item: 'Roofing Sheets (Aluminium)',
    quantity: '350 sheets',
    status: 'requested',
  },
]

// Monthly escrow activity, used by the escrow trend chart (Sec. 18).
// Real implementation: aggregate escrowTransactions server-side by month.
export const escrowMonthlyTrend = [
  {
    month: 'Feb',
    deposited: 20.0,
    released: 0,
  },

  {
    month: 'Mar',
    deposited: 4.0,
    released: 8.0,
  },

  {
    month: 'Apr',
    deposited: 6.5,
    released: 5.0,
  },

  {
    month: 'May',
    deposited: 12.5,
    released: 9.0,
  },

  {
    month: 'Jun',
    deposited: 8.0,
    released: 11.5,
  },

  {
    month: 'Jul',
    deposited: 5.0,
    released: 7.0,
  },
]