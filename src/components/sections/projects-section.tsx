import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section } from "@/components/sections/section";
import type { Project } from "@/lib/content";

type ProjectsSectionProps = {
  projects: Project[];
};

function partitionProjectsByEmphasis(projects: Project[]) {
  const primary: Project[] = [];
  const secondary: Project[] = [];
  for (const project of projects) {
    if (project.emphasis === "secondary") secondary.push(project);
    else primary.push(project);
  }
  return { primary, secondary };
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { primary: primaryProjects, secondary: secondaryProjects } =
    partitionProjectsByEmphasis(projects);

  return (
    <Section
      id="projects"
      title="Projects"
      description="Selected work across automation, infrastructure, and platform operations."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {primaryProjects.map((project) => (
          <Card
            key={project.title}
            className="terminal-pattern glass-panel noise-overlay border-border/80 bg-zinc-900/40 transition-colors hover:bg-zinc-900/55"
          >
            <CardHeader className="space-y-2 pb-3">
              <CardTitle className="text-base leading-6">
                <span className="terminal-accent mr-2">{">"}</span>
                {project.title}
              </CardTitle>
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {project.company}
              </p>
              <CardDescription className="line-clamp-4 text-sm leading-6">
                {project.summary}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      {secondaryProjects.length > 0 ? (
        <div className="mt-6 space-y-2 pt-2">
          <p className="text-[11px] uppercase tracking-[0.14em] text-zinc-400">Additional Projects</p>
          <ul className="space-y-2">
            {secondaryProjects.map((project) => (
              <li
                key={project.title}
                className="py-2"
              >
                <p className="text-sm text-zinc-100">
                  {project.href ? (
                    <Link
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 hover:text-emerald-300"
                    >
                      {project.title}
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  ) : (
                    project.title
                  )}
                  <span className="ml-2 text-[11px] uppercase tracking-[0.12em] text-zinc-500">
                    {project.company}
                  </span>
                </p>
                <p className="text-sm leading-6 text-zinc-300">{project.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  );
}
