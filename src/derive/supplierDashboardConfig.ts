import {
  COVERAGE_STATES,
  MATERIAL_CATEGORIES,
  SUPPLY_CAPACITY_OPTIONS,
  getOptionLabel,
  getOptionLabels,
} from '@/data/projectOptions'

/* ============================================================
   SUPPLIER DASHBOARD DERIVATION LAYER
   ------------------------------------------------------------
   Same shape as clientDashboardConfig.ts / contractorDashboardConfig.ts:
   a pure function turning raw Project Studio answers (SUPPLIER_FLOW)
   into a typed config. No React, no storage access.

   The one thing unique to this one: `uncataloguedCategoryLabels`.
   The supplier told us at onboarding which material categories they
   supply. If their actual catalogue doesn't have anything listed in
   one of those categories yet, that's a real, actionable gap — a
   category they said they cover but buyers can't currently find
   anything from them in. The caller passes in the category values
   their catalogue already covers; this function does the diff.
   ============================================================ */

export interface SupplierDashboardConfig {
  hasProfile: boolean
  categoryLabels: string[]
  coverageStateLabels: string[]
  supplyCapacityLabel?: string
  /** True for 'large' or 'bulk' supply capacity — useful for surfacing higher-volume demand differently. */
  isHighVolume: boolean
  /** Categories the supplier said they supply but that aren't represented in their current catalogue. */
  uncataloguedCategoryLabels: string[]
}

export function deriveSupplierDashboardConfig(
  answers: Record<string, any>,
  /** Category values (MATERIAL_CATEGORIES.value) already represented in the supplier's catalogue. */
  coveredCategoryValues: string[] = [],
): SupplierDashboardConfig {
  const categoryValues: string[] = Array.isArray(answers.categories) ? answers.categories : []
  const coverageStateValues: string[] = Array.isArray(answers.coverageStates) ? answers.coverageStates : []
  const supplyCapacityValue: string | undefined = answers.supplyCapacity

  const hasProfile = categoryValues.length > 0 || coverageStateValues.length > 0 || Boolean(supplyCapacityValue)

  const uncataloguedValues = categoryValues.filter((value) => !coveredCategoryValues.includes(value))

  return {
    hasProfile,
    categoryLabels: getOptionLabels(MATERIAL_CATEGORIES, categoryValues),
    coverageStateLabels: getOptionLabels(COVERAGE_STATES, coverageStateValues),
    supplyCapacityLabel: getOptionLabel(SUPPLY_CAPACITY_OPTIONS, supplyCapacityValue),
    isHighVolume: supplyCapacityValue === 'large' || supplyCapacityValue === 'bulk',
    uncataloguedCategoryLabels: getOptionLabels(MATERIAL_CATEGORIES, uncataloguedValues),
  }
}