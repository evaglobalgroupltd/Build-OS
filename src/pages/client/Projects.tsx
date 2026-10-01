// src/pages/client/Projects.tsx
// Thin wrappers that put the projects-module pages inside DashboardLayout.

import { useParams } from 'react-router-dom'

import { DashboardLayout } from '@/layouts/DashboardLayout'
import { ProjectList } from '@/modules/projects/pages/ProjectList'
import { ProjectDetails } from '@/modules/projects/pages/ProjectDetails'
import { CreateProject } from '@/modules/projects/pages/CreateProject'
import { EditProject } from '@/modules/projects/pages/EditProject'
import { projects } from '@/data/mockData'
import type { Project } from '@/modules/projects/types'

/** /app/client/projects  and  /app/client/projects/:projectId */
export function ProjectsPage() {
  const { projectId } = useParams<{ projectId: string }>()

  if (!projectId) {
    return (
      <DashboardLayout title="Your projects">
        <ProjectList />
      </DashboardLayout>
    )
  }

  const project = (projects as unknown as Project[]).find(
    (p) => String(p.id) === projectId,
  )

  return (
    <DashboardLayout title={project?.name ?? 'Project'}>
      <ProjectDetails project={project} />
    </DashboardLayout>
  )
}

/** /app/client/projects/new */
export function CreateProjectPage() {
  return (
    <DashboardLayout title="New project">
      <CreateProject />
    </DashboardLayout>
  )
}

/** /app/client/projects/:projectId/edit */
export function EditProjectPage() {
  return (
    <DashboardLayout title="Edit project">
      <EditProject />
    </DashboardLayout>
  )
}