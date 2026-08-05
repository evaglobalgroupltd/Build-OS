import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { ProjectCard } from '@/modules/projects/components/ProjectCard'
import { projects } from '@/data/mockData'

export function ProjectList() {
  return (
    <Card>
      <CardHeader title="Projects" subtitle="Every project across your account" />
      <CardBody className="space-y-4">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </CardBody>
    </Card>
  )
}
