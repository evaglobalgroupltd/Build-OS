import { useEffect, useState } from 'react'

/**
 * Simulates the loading state a real API call would have.
 *
 * `data/mockData.ts` is synchronous, so without this every page would
 * "load" instantly and none of the skeleton states would ever be
 * exercised or reviewed. Wrap any mock read with this hook to get a
 * realistic loading → content transition now, then swap the mock value
 * for a real fetch later — the calling component doesn't change.
 *
 * @example
 * const { data: projects, isLoading } = useMockLoading(() => mockProjects)
 */
export function useMockLoading<T>(getData: () => T, delayMs = 500) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    setIsLoading(true)
    const timer = window.setTimeout(() => {
      setData(getData())
      setIsLoading(false)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, delayMs)
    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, isLoading }
}
