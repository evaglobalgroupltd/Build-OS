import type { Project } from '@/types/project'

export function buildDashboardModules(project?: Project): string[] {
  if (!project) return []

  const modules = ['project-overview']

  if (project.landStatus === 'searching') modules.push('land-search')
  if (project.stage === 'idea' || project.stage === 'design') modules.push('architect', 'design')
  if (project.stage === 'construction') modules.push('construction', 'milestones', 'site-monitoring')
  if (project.stage === 'finishing') modules.push('finishing', 'milestones')
  if (project.budgetRange) modules.push('budget')

  modules.push('documents', 'messages')
  return modules
}