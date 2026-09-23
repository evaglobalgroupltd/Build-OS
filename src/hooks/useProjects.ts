import { useCallback, useEffect, useState } from 'react'
import { getProjects } from '@/lib/projectStore'
import type { Project } from '@/types/project'

export function useProjects(clientId: string | undefined) {
  const [projects, setProjects] = useState<Project[]>([])

  const refresh = useCallback(() => {
    if (!clientId) return
    setProjects(getProjects(clientId))
  }, [clientId])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { projects, refresh }
}