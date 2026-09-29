// Temporary mock data for the marketplace supplier list.
//
// MarketList.tsx uses this in place of MarketService.list() until that
// endpoint is wired up. Remove this file once the real API call is in
// place (see the "Temporary data source" comment in MarketList.tsx).

import type { MarketSupplier } from '@/modules/market/services/MarketService'

export const mockSuppliers: MarketSupplier[] = [
  {
    id: 'sup-001',
    name: 'Lagos Building Materials Co.',
    initials: 'LB',
    category: 'General Materials',
    location: 'Lagos, Nigeria',
    status: 'Verified',
    trustScore: 92,
    rating: 4.7,
    reviews: 138,
    products: 214,
    deliveries: 1042,
    onTimeDelivery: 96,
    deliveryCoverage: 'Lagos & Ogun',
    specialties: ['Cement & Concrete', 'General Materials'],
  },
  {
    id: 'sup-002',
    name: 'SteelWorks Nigeria',
    initials: 'SW',
    category: 'Steel & Reinforcement',
    location: 'Port Harcourt, Nigeria',
    status: 'Verified',
    trustScore: 88,
    rating: 4.5,
    reviews: 94,
    products: 76,
    deliveries: 512,
    onTimeDelivery: 91,
    deliveryCoverage: 'Rivers & Bayelsa',
    specialties: ['Steel & Reinforcement'],
  },
  {
    id: 'sup-003',
    name: 'RoofPro Supplies',
    initials: 'RP',
    category: 'Roofing',
    location: 'Abuja, Nigeria',
    status: 'Pending Review',
    trustScore: 71,
    rating: 4.1,
    reviews: 31,
    products: 48,
    deliveries: 190,
    onTimeDelivery: 84,
    deliveryCoverage: 'FCT',
    specialties: ['Roofing', 'Finishing'],
  },
]
