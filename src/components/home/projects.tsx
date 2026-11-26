import { ArrowUpRight, Github } from "lucide-react";
import { Annotation, Button, Label, Panel, Tag } from "@/components/ds";
import { projects } from "@/lib/resume";
import { ProjectImage } from "./project-image";

type Project = (typeof projects)[number] & { buttonText?: string; buttonUrl?: string };

const MAX_TAGS = 4;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const sourceUrl = project.buttonUrl ?? project.githubUrl;
  return (
    <article className="media-mono-group flex flex-col border-b border-line md:odd:border-r">
      <div className="relative aspect-video border-b border-line bg-fill-strong">
        <ProjectImage src={project.image} title={project.title} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <Label>{String(index + 1).padStart(2, "0")} {"//"} {project.category}</Label>
          <h3 className="font-sans text-lg font-semibold tracking-tight">{project.title}</h3>
        </div>
        <ul className="flex flex-wrap gap-2">
          {project.technologies.slice(0, MAX_TAGS).map((tech) => (
            <li key={tech}>
              <Tag>{tech.trim()}</Tag>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {project.liveUrl && (
            <Button href={project.liveUrl} size="sm" icon={<ArrowUpRight className="size-4" />}>
              Live
            </Button>
          )}
          {sourceUrl && sourceUrl !== project.liveUrl && (
            <Button
              href={sourceUrl}
              size="sm"
              variant="ghost"
              icon={project.buttonText ? undefined : <Github className="size-4" />}
            >
              {project.buttonText ?? "Source"}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <Panel
      id="projects"
      annotation={<Annotation side="right">things i built</Annotation>}
      label="Work // Projects"
      meta={`Total: ${String(projects.length).padStart(2, "0")}`}
      footer={
        <>
          <Label>Sheet 04</Label>
          <Label>Grid: 02_col</Label>
        </>
      }
    >
      <div className="-mb-px grid md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </Panel>
  );
}
