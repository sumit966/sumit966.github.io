import Link from "next/link";
import { ROLES } from "@/data/roles";
import { getProjectsByRole } from "@/data/projects";
import { IconArrow } from "./Icons";

export default function RoleGrid() {
  return (
    <section id="roles" className="section">
      <div className="container">
        <p className="eyebrow">Roles</p>
        <h2 className="section-title">Five ways to read the work</h2>
        <p className="section-copy">
          Same repositories, different lenses. Each page keeps only the skills and projects that fit that hiring brief.
        </p>
        <div className="role-grid">
          {ROLES.map((role) => (
            <Link key={role.id} href={role.href} className="role-card" style={{ "--accent": role.accent } as React.CSSProperties}>
              <span>{String(ROLES.indexOf(role) + 1).padStart(2, "0")}</span>
              <h3>{role.title}</h3>
              <p>{role.tagline}</p>
              <em>{getProjectsByRole(role.id).length} mapped projects</em>
              <b>
                Open page <IconArrow width={14} height={14} />
              </b>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
