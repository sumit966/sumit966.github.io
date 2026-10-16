import Link from "next/link";
import type { Project } from "@/data/projects";
import { ROLES } from "@/data/roles";
import ProjectArtwork from "./ProjectArtwork";
import { IconExternal, IconGithub } from "./Icons";

export default function ProjectCard({
  project,
  accent,
}: {
  project: Project;
  accent?: string;
}) {
  const tone =
    accent ??
    ROLES.find((role) => role.id === project.roles[0])?.accent ??
    "#7dd3fc";

  return (
    <article className="project-card">
      <ProjectArtwork kind={project.artwork} accent={tone} title={project.title} />
      <div className="project-body">
        <div className="project-meta">
          <span>{project.category}</span>
          {project.featured && <span className="chip-quiet">Featured</span>}
          {project.status !== "verified" && (
            <span className="chip-quiet">{project.status.replace("-", " ")}</span>
          )}
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul className="tech-row">
          {project.tech.slice(0, 6).map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <div className="project-actions">
          <a href={project.github} target="_blank" rel="noreferrer">
            <IconGithub width={15} height={15} /> GitHub
          </a>
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              <IconExternal width={15} height={15} /> Live demo
            </a>
          ) : null}
          {project.roles.slice(0, 2).map((roleId) => {
            const role = ROLES.find((item) => item.id === roleId);
            return role ? (
              <Link key={roleId} href={role.href}>
                {role.shortTitle}
              </Link>
            ) : null;
          })}
        </div>
      </div>
    </article>
  );
}
