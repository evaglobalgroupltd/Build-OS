import type { Project } from '@/types/project'

const KEY_PREFIX = 'buildos_projects_'

function readAll(clientId: string): Project[] {
  try {
    const raw = localStorage.getItem(KEY_PREFIX + clientId)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeAll(clientId: string, projects: Project[]) {
  try {
    localStorage.setItem(KEY_PREFIX + clientId, JSON.stringify(projects))
  } catch {
    // ignore
  }
}

export function getProjects(clientId: string): Project[] {
  return readAll(clientId)
}

export function getActiveProject(clientId: string): Project | undefined {
  return readAll(clientId).find((p) => p.status === 'active')
}

const TYPE_LABELS: Record<string, string> = {
  'family-home': 'Family Home',
  apartments: 'Apartments',
  commercial: 'Commercial Project',
  hospitality: 'Hospitality Project',
  renovation: 'Renovation',
  community: 'Community Project',
  other: 'Project',
}

const LOCATION_LABELS: Record<string, string> = {
  lagos: 'Lagos',
  abuja: 'Abuja',
  rivers: 'Rivers',
  oyo: 'Oyo',
  kano: 'Kano',
}

function buildProjectName(answers: Record<string, any>) {
  const type = TYPE_LABELS[answers.projectType] ?? 'Project'
  const loc = LOCATION_LABELS[answers.location] ?? ''
  return loc ? `${loc} ${type}` : type
}

export function createProject(
  clientId: string,
  clientName: string,
  answers: Record<string, any>
): Project {
  const now = new Date().toISOString()

  const project: Project = {
    id: crypto.randomUUID(),
    clientId,
    clientName,
    name: buildProjectName(answers),
    status: 'active',
    escrowBalance: 0,
    progressPercent: 0,
    pendingApprovals: 0,
    projectType: answers.projectType,
    propertyType: answers.propertyType ?? undefined,
    location: { state: answers.location, details: answers.landDetails ?? undefined },
    landStatus: answers.landStatus,
    stage: answers.stage,
    budgetRange: answers.budget ?? undefined,
    style: answers.feel ?? [],
    priorities: answers.priorities ?? [],
    inspiration: answers.inspiration ?? undefined,
    notes: answers.notes ?? undefined,
    createdAt: now,
    updatedAt: now,
  }

  writeAll(clientId, [...readAll(clientId), project])
  return project
}