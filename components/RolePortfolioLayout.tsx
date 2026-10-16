import Link from "next/link";
import type { Role } from "@/data/roles";
import type { Project } from "@/data/projects";
import { SITE } from "@/data/site";
import ProjectCard from "./ProjectCard";
import ResumeButton from "./ResumeButton";
import { IconGithub } from "./Icons";

export default function RolePortfolioLayout({
  role,
  projects,
}: {
  role: Role;
  projects: Project[];
}) {
  return (
    <main>
      <section className="role-hero" style={{ "--accent": role.accent, "--accent-soft": role.accentSoft } as React.CSSProperties}>
        <div className="container">
          <Link className="back-link" href="/">
            Back to portfolio
          </Link>
          <p className="eyebrow">{role.shortTitle}</p>
          <h1>{role.title}</h1>
          <p className="lede">{role.tagline}</p>
          <p className="hero-intro">{role.intro}</p>
          <div className="hero-actions">
            <ResumeButton file={role.resumeFile} />
            <a className="btn btn-ghost" href={SITE.github} target="_blank" rel="noreferrer">
              <IconGithub width={16} height={16} /> GitHub
            </a>
            <Link className="btn btn-ghost" href="/projects">
              All projects
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="section-title">Skills evidenced in repositories</h2>
          <div className="skill-grid">
            {Object.entries(role.skills).map(([group, items]) => (
              <div key={group} className="skill-card">
                <h3>{group}</h3>
                <ul>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="section-title">Projects for this role</h2>
          <p className="section-copy">
            {projects.length} repositories mapped from the shared project catalogue.
          </p>
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} accent={role.accent} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
