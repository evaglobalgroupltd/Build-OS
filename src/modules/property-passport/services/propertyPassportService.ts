// Digital Property Passport module — API service layer
//
// BRD references:
// - Sec. 20.4: Digital Property Passport
// - Sec. 28.1: Backend / API architecture
//
// This is the single network boundary for the Property Passport module.
// Pages and components should never call fetch/axios directly.
//
// TODO:
// - Connect these methods to the shared HTTP/API client once the backend
//   contract is available.
// - Replace placeholder return types with the final API response types.
// - Align endpoint paths and query parameters with the backend contract.

import type {
  PropertyPassport,
  PropertyPassportSection,
} from '@/types/propertyPassport'

export const propertyPassportService = {
  /**
   * Get the complete Digital Property Passport for a property.
   */
  async get(propertyId: string): Promise<PropertyPassport> {
    throw new Error(
      `Property Passport API not implemented for property ${propertyId}`,
    )
  },

  /**
   * Get the Passport overview for a property.
   */
  async getOverview(
    propertyId: string,
  ): Promise<PropertyPassport> {
    throw new Error(
      `Property Passport overview API not implemented for property ${propertyId}`,
    )
  },

  /**
   * Get a specific Passport section for a property.
   *
   * Examples:
   * - ownership
   * - land-documents
   * - designs
   * - inspections
   * - contracts
   * - payments
   * - procurement
   * - handover
   * - warranties
   */
  async getSection(
    propertyId: string,
    section: PropertyPassportSection,
  ): Promise<unknown> {
    throw new Error(
      `Property Passport section API not implemented: ${propertyId}/${section}`,
    )
  },
}