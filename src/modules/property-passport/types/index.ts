// Digital Property Passport module — shared domain types
//
// BRD references:
// - Sec. 20.4: Digital Property Passport
// - Sec. 28.1: Backend / API architecture
//
// Architectural rule:
// Keep Passport-specific domain types in this module.
// Cross-cutting types such as User, UserRole, Project, etc. belong in
// the root `src/types` directory.
//
// Design goals:
// - Strong domain typing.
// - Consistent record structure across Passport sections.
// - Clear separation between Passport state and record state.
// - Easy extension as the backend contract evolves.
// - Safe reuse across pages, components, hooks, services, and API clients.

/* -------------------------------------------------------------------------- */
/* Passport sections                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Sections that make up the Digital Property Passport.
 *
 * `overview` represents the Passport's executive summary and does not
 * normally contain a standard PropertyPassportRecord.
 */
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

/**
 * Sections that contain independently managed records.
 */
export type PropertyPassportRecordSection = Exclude<
  PropertyPassportSection,
  'overview'
>

/* -------------------------------------------------------------------------- */
/* Passport lifecycle                                                          */
/* -------------------------------------------------------------------------- */

export type PropertyPassportStatus =
  | 'draft'
  | 'in-progress'
  | 'under-review'
  | 'verified'
  | 'completed'

/**
 * Status of an individual Passport record.
 */
export type PropertyPassportRecordStatus =
  | 'pending'
  | 'review'
  | 'verified'
  | 'rejected'

/* -------------------------------------------------------------------------- */
/* Shared domain primitives                                                     */
/* -------------------------------------------------------------------------- */

export interface PropertyPassportDocument {
  id?: string
  name: string
  url?: string
  type?: string
  uploadedAt?: string
}

/**
 * Lightweight audit metadata shared by Passport records.
 */
export interface PropertyPassportAudit {
  createdAt?: string
  updatedAt?: string
  createdBy?: string
  updatedBy?: string
}

/**
 * Optional verification metadata.
 *
 * This supports the BRD requirement for evidence, verification, and
 * auditability without coupling the Passport module to the global User type.
 */
export interface PropertyPassportVerification {
  verifiedAt?: string
  verifiedBy?: string
  verificationNote?: string
}

/* -------------------------------------------------------------------------- */
/* Passport                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Digital Property Passport aggregate.
 *
 * Represents the complete permanent property record.
 */
export interface PropertyPassport
  extends PropertyPassportAudit,
    PropertyPassportVerification {
  id: string
  propertyId: string

  status: PropertyPassportStatus

  /**
   * Sections currently available on the Passport.
   */
  sections: PropertyPassportSection[]

  /**
   * Optional completion percentage supplied by the backend.
   *
   * Expected range: 0–100.
   */
  completionPercentage?: number

  /**
   * Number of verified records currently contributing to the Passport.
   */
  verifiedRecordCount?: number

  /**
   * Total records currently registered on the Passport.
   */
  totalRecordCount?: number
}

/* -------------------------------------------------------------------------- */
/* Passport record                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Base record shared by every Passport section.
 */
export interface PropertyPassportRecord
  extends PropertyPassportAudit,
    PropertyPassportVerification {
  id: string
  propertyId: string

  section: PropertyPassportRecordSection

  status: PropertyPassportRecordStatus

  title: string
  description?: string

  /**
   * Optional supporting documents attached to this record.
   */
  documents?: PropertyPassportDocument[]
}

/* -------------------------------------------------------------------------- */
/* Property overview                                                           */
/* -------------------------------------------------------------------------- */

export interface PropertyOverview {
  propertyId: string

  name: string
  type: string
  location: string
  status: string

  startDate?: string
  expectedCompletion?: string
}

/* -------------------------------------------------------------------------- */
/* Ownership                                                                  */
/* -------------------------------------------------------------------------- */

export type OwnershipType =
  | 'freehold'
  | 'leasehold'
  | 'joint'
  | 'corporate'
  | 'other'

export interface OwnershipRecord extends PropertyPassportRecord {
  section: 'ownership'

  ownerName: string
  ownershipType: OwnershipType | string

  titleReference?: string
  acquisitionDate?: string
}

/* -------------------------------------------------------------------------- */
/* Land documents                                                              */
/* -------------------------------------------------------------------------- */

export type LandDocumentType =
  | 'land-survey'
  | 'certificate-of-occupancy'
  | 'allocation'

export interface LandDocument extends PropertyPassportRecord {
  section: 'land-documents'

  documentType: LandDocumentType

  documentName: string
  documentUrl?: string
  documentDate?: string
}

/* -------------------------------------------------------------------------- */
/* Designs                                                                    */
/* -------------------------------------------------------------------------- */

export interface DesignRecord extends PropertyPassportRecord {
  section: 'designs'

  designType: string

  documentName?: string
  documentUrl?: string
  revision?: string
}

/* -------------------------------------------------------------------------- */
/* Inspections                                                                */
/* -------------------------------------------------------------------------- */

export interface InspectionRecord extends PropertyPassportRecord {
  section: 'inspections'

  inspectionType: string

  inspectionDate?: string
  findings?: string
  inspectorName?: string
}

/* -------------------------------------------------------------------------- */
/* Contracts                                                                  */
/* -------------------------------------------------------------------------- */

export interface ContractRecord extends PropertyPassportRecord {
  section: 'contracts'

  contractType?: string
  partyName?: string
  signedDate?: string
  documentUrl?: string
}

/* -------------------------------------------------------------------------- */
/* Payments                                                                   */
/* -------------------------------------------------------------------------- */

export interface PaymentRecord extends PropertyPassportRecord {
  section: 'payments'

  reference: string
  amount: number
  currency: string

  paymentDate?: string
  receiptUrl?: string
}

/* -------------------------------------------------------------------------- */
/* Procurement                                                                */
/* -------------------------------------------------------------------------- */

export interface ProcurementRecord extends PropertyPassportRecord {
  section: 'procurement'

  material: string
  quantity: string

  supplierName?: string
  procurementDate?: string
  documentUrl?: string
}

/* -------------------------------------------------------------------------- */
/* Handover                                                                   */
/* -------------------------------------------------------------------------- */

export interface HandoverRecord extends PropertyPassportRecord {
  section: 'handover'

  handoverDate?: string
  signOffDate?: string
  signedOffBy?: string

  checklistComplete: boolean
}

/* -------------------------------------------------------------------------- */
/* Warranties                                                                 */
/* -------------------------------------------------------------------------- */

export type WarrantyCategory =
  | 'materials'
  | 'workmanship'

export interface WarrantyRecord extends PropertyPassportRecord {
  section: 'warranties'

  subject: string
  category: WarrantyCategory

  providerName?: string

  startDate?: string
  expiryDate?: string

  documentUrl?: string
}

/* -------------------------------------------------------------------------- */
/* Section → record mapping                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Canonical mapping between Passport sections and their record types.
 *
 * This becomes especially useful when building:
 * - API clients
 * - React Query hooks
 * - section-specific components
 * - reusable record tables
 * - typed route loaders
 */
export interface PropertyPassportRecordMap {
  ownership: OwnershipRecord
  'land-documents': LandDocument
  designs: DesignRecord
  inspections: InspectionRecord
  contracts: ContractRecord
  payments: PaymentRecord
  procurement: ProcurementRecord
  handover: HandoverRecord
  warranties: WarrantyRecord
}

/**
 * Strongly typed record lookup by section.
 */
export type PropertyPassportRecordFor<
  TSection extends PropertyPassportRecordSection,
> = PropertyPassportRecordMap[TSection]

/**
 * Union of every concrete Passport record.
 */
export type AnyPropertyPassportRecord =
  PropertyPassportRecordMap[PropertyPassportRecordSection]

/* -------------------------------------------------------------------------- */
/* Passport section metadata                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Useful for navigation, dashboards, section summaries, and API-driven
 * Passport interfaces.
 */
export interface PropertyPassportSectionSummary {
  section: PropertyPassportSection

  label: string

  status: PropertyPassportRecordStatus | PropertyPassportStatus

  recordCount?: number
  verifiedCount?: number

  lastUpdatedAt?: string
}

/* -------------------------------------------------------------------------- */
/* Type guards                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Runtime helper for distinguishing the Passport overview from record-based
 * sections.
 */
export function isPropertyPassportRecordSection(
  section: PropertyPassportSection,
): section is PropertyPassportRecordSection {
  return section !== 'overview'
}

/**
 * Runtime helper for validating Passport sections received from APIs,
 * route parameters, or external data sources.
 */
export function isPropertyPassportSection(
  value: string,
): value is PropertyPassportSection {
  return (
    value === 'overview' ||
    value === 'ownership' ||
    value === 'land-documents' ||
    value === 'designs' ||
    value === 'inspections' ||
    value === 'contracts' ||
    value === 'payments' ||
    value === 'procurement' ||
    value === 'handover' ||
    value === 'warranties'
  )
}

/* -------------------------------------------------------------------------- */
/* Status helpers                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Determines whether a Passport status represents a finalized state.
 */
export function isFinalPropertyPassportStatus(
  status: PropertyPassportStatus,
): boolean {
  return status === 'verified' || status === 'completed'
}

/**
 * Determines whether an individual Passport record has passed verification.
 */
export function isVerifiedPropertyPassportRecord(
  record: PropertyPassportRecord,
): boolean {
  return record.status === 'verified'
}