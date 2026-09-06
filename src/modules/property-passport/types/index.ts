// Digital Property Passport module — shared types
//
// BRD references:
// - Sec. 20.4: Digital Property Passport
//
// Keep module-specific types here.
// Only cross-cutting types (User, UserRole, etc.) belong in the root
// src/types directory.

export type PropertyPassportSection =
  | 'overview'
  | 'ownership'
  | 'land-documents'
  | 'designs'
  | 'inspections'
  | 'contracts'
  | 'payments'
  | 'procurement'
  | 'handover'
  | 'warranties'

export type PropertyPassportStatus =
  | 'draft'
  | 'in-progress'
  | 'under-review'
  | 'verified'
  | 'completed'

export type PropertyPassportRecordStatus =
  | 'pending'
  | 'review'
  | 'verified'
  | 'rejected'

export interface PropertyPassport {
  id: string
  propertyId: string
  status: PropertyPassportStatus
  sections: PropertyPassportSection[]
  createdAt?: string
  updatedAt?: string
}

export interface PropertyPassportRecord {
  id: string
  propertyId: string
  section: PropertyPassportSection
  status: PropertyPassportRecordStatus
  title: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

export interface PropertyOverview {
  propertyId: string
  name: string
  type: string
  location: string
  status: string
  startDate?: string
  expectedCompletion?: string
}

export interface OwnershipRecord extends PropertyPassportRecord {
  section: 'ownership'
  ownerName: string
  ownershipType: string
  titleReference?: string
  acquisitionDate?: string
}

export interface LandDocument extends PropertyPassportRecord {
  section: 'land-documents'
  documentType: 'land-survey' | 'certificate-of-occupancy' | 'allocation'
  documentName: string
  documentUrl?: string
  documentDate?: string
}

export interface DesignRecord extends PropertyPassportRecord {
  section: 'designs'
  designType: string
  documentName?: string
  documentUrl?: string
  revision?: string
}

export interface InspectionRecord extends PropertyPassportRecord {
  section: 'inspections'
  inspectionType: string
  inspectionDate?: string
  findings?: string
  inspectorName?: string
}

export interface ContractRecord extends PropertyPassportRecord {
  section: 'contracts'
  contractType?: string
  partyName?: string
  signedDate?: string
  documentUrl?: string
}

export interface PaymentRecord extends PropertyPassportRecord {
  section: 'payments'
  reference: string
  amount: number
  currency: string
  paymentDate?: string
  receiptUrl?: string
}

export interface ProcurementRecord extends PropertyPassportRecord {
  section: 'procurement'
  material: string
  quantity: string
  supplierName?: string
  procurementDate?: string
  documentUrl?: string
}

export interface HandoverRecord extends PropertyPassportRecord {
  section: 'handover'
  handoverDate?: string
  signOffDate?: string
  signedOffBy?: string
  checklistComplete: boolean
}

export interface WarrantyRecord extends PropertyPassportRecord {
  section: 'warranties'
  subject: string
  category: 'materials' | 'workmanship'
  providerName?: string
  startDate?: string
  expiryDate?: string
  documentUrl?: string
}