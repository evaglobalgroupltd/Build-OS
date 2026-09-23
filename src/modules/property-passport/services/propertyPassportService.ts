// Digital Property Passport module — API service layer
//
// BRD references:
// - Sec. 20.4: Digital Property Passport
// - Sec. 28.1: Backend / API architecture
//
// Architectural rule:
// This module is the single network boundary for the Digital Property
// Passport domain. Pages, components, hooks, and UI modules must never
// call fetch/axios directly.
//
// Responsibilities:
// - Define Passport API operations.
// - Keep endpoint construction centralized.
// - Preserve domain-level typing.
// - Provide a clean seam for the shared HTTP client.
// - Keep backend implementation details out of UI code.
//
// TODO:
// - Connect methods to the shared HTTP/API client once available.
// - Replace placeholder response types with final API contracts.
// - Align endpoint paths and query parameters with the backend.
// - Add authentication / authorization handling through the shared client.
// - Add API response normalization where required.
// - Add request cancellation / AbortSignal support if supported globally.

import type {
  PropertyPassport,
  PropertyPassportSection,
} from '@/types/propertyPassport'

/* -------------------------------------------------------------------------- */
/* API configuration                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Centralized endpoint configuration.
 *
 * Keeping the route structure here makes it easier to change the backend
 * contract later without touching consuming pages or components.
 */
const PASSPORT_BASE_PATH = '/properties'

const endpoints = {
  passport: (propertyId: string) =>
    `${PASSPORT_BASE_PATH}/${propertyId}/passport`,

  overview: (propertyId: string) =>
    `${PASSPORT_BASE_PATH}/${propertyId}/passport/overview`,

  section: (propertyId: string, section: PropertyPassportSection) =>
    `${PASSPORT_BASE_PATH}/${propertyId}/passport/${section}`,
} as const

/* -------------------------------------------------------------------------- */
/* API response types                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Placeholder section response.
 *
 * Replace `unknown` with a discriminated section-response union once the
 * backend contract is finalized.
 */
export type PropertyPassportSectionResponse = unknown

/**
 * Shared API error shape.
 *
 * This intentionally remains lightweight until the application's shared
 * HTTP client defines the canonical error contract.
 */
export interface PropertyPassportApiError {
  message: string
  status?: number
  code?: string
}

/* -------------------------------------------------------------------------- */
/* Internal helpers                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Validates identifiers before an API request is constructed.
 *
 * This prevents malformed URLs such as:
 * `/properties//passport`
 */
function assertPropertyId(propertyId: string): void {
  if (!propertyId.trim()) {
    throw new Error('A valid property ID is required.')
  }
}

/**
 * Validates Passport section identifiers.
 */
function assertSection(section: PropertyPassportSection): void {
  if (!String(section).trim()) {
    throw new Error('A valid Property Passport section is required.')
  }
}

/**
 * API placeholder used until the shared HTTP client is connected.
 *
 * Keeping the unimplemented boundary here means the public service API
 * remains stable when the actual HTTP client is introduced.
 */
function notImplemented(operation: string): never {
  throw new Error(
    `Property Passport API not implemented: ${operation}`,
  )
}

/* -------------------------------------------------------------------------- */
/* Property Passport service                                                    */
/* -------------------------------------------------------------------------- */

export const propertyPassportService = {
  /**
   * Get the complete Digital Property Passport for a property.
   *
   * Expected endpoint:
   * GET /properties/:propertyId/passport
   */
  async get(propertyId: string): Promise<PropertyPassport> {
    assertPropertyId(propertyId)

    const endpoint = endpoints.passport(propertyId)

    // TODO:
    // return apiClient.get<PropertyPassport>(endpoint)

    return notImplemented(`GET ${endpoint}`)
  },

  /**
   * Get the Passport overview for a property.
   *
   * Expected endpoint:
   * GET /properties/:propertyId/passport/overview
   */
  async getOverview(
    propertyId: string,
  ): Promise<PropertyPassport> {
    assertPropertyId(propertyId)

    const endpoint = endpoints.overview(propertyId)

    // TODO:
    // return apiClient.get<PropertyPassport>(endpoint)

    return notImplemented(`GET ${endpoint}`)
  },

  /**
   * Get a specific Passport section for a property.
   *
   * Supported sections currently include:
   * - ownership
   * - land-documents
   * - designs
   * - inspections
   * - contracts
   * - payments
   * - procurement
   * - handover
   * - warranties
   *
   * Expected endpoint:
   * GET /properties/:propertyId/passport/:section
   */
  async getSection(
    propertyId: string,
    section: PropertyPassportSection,
  ): Promise<PropertyPassportSectionResponse> {
    assertPropertyId(propertyId)
    assertSection(section)

    const endpoint = endpoints.section(propertyId, section)

    // TODO:
    // return apiClient.get<PropertyPassportSectionResponse>(endpoint)

    return notImplemented(`GET ${endpoint}`)
  },
} as const

/* -------------------------------------------------------------------------- */
/* Endpoint helpers                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Exposed endpoint builders are useful for:
 * - React Query keys
 * - request logging
 * - API integration tests
 * - debugging
 * - future cache invalidation
 *
 * They do not perform network requests.
 */
export const propertyPassportEndpoints = {
  passport: endpoints.passport,
  overview: endpoints.overview,
  section: endpoints.section,
} as const

/* -------------------------------------------------------------------------- */
/* Query key helpers                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Stable query keys for TanStack Query / React Query integration.
 *
 * These can later be consumed by hooks without duplicating string
 * conventions across the application.
 */
export const propertyPassportQueryKeys = {
  all: ['property-passport'] as const,

  property: (propertyId: string) =>
    ['property-passport', propertyId] as const,

  overview: (propertyId: string) =>
    ['property-passport', propertyId, 'overview'] as const,

  section: (
    propertyId: string,
    section: PropertyPassportSection,
  ) =>
    ['property-passport', propertyId, 'section', section] as const,
} as const