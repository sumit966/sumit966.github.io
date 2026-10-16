"use client";

import { useMemo, useState } from "react";
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  PROJECT_TECH,
  type RoleId,
} from "@/data/projects";
import { ROLES } from "@/data/roles";
import ProjectCard from "./ProjectCard";

type SortKey = "featured" | "alpha";

export default function ProjectExplorer({
  initialRole = "all",
}: {
  initialRole?: RoleId | "all";
}) {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<RoleId | "all">(initialRole);
  const [tech, setTech] = useState("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = PROJECTS.filter((project) => {
      const hay = `${project.title} ${project.description} ${project.tech.join(" ")}`.toLowerCase();
      const matchesQuery = !q || hay.includes(q);
      const matchesRole = role === "all" || project.roles.includes(role);
      const matchesTech = tech === "all" || project.tech.includes(tech);
      const matchesCategory = category === "all" || project.category === category;
      return matchesQuery && matchesRole && matchesTech && matchesCategory;
    });
    list.sort((a, b) => {
      if (sort === "alpha") return a.title.localeCompare(b.title);
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.title.localeCompare(b.title);
    });
    return list;
  }, [query, role, tech, category, sort]);

  const active = Boolean(query) || role !== "all" || tech !== "all" || category !== "all";

  function reset() {
    setQuery("");
    setRole("all");
    setTech("all");
    setCategory("all");
    setSort("featured");
  }

  return (
    <div>
      <div className="filters">
        <label className="sr-only" htmlFor="project-search">
          Search projects
        </label>
        <input
          id="project-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, stack, or description"
        />
        <select value={role} onChange={(e) => setRole(e.target.value as RoleId | "all")} aria-label="Filter by role">
          <option value="all">All roles</option>
          {ROLES.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
        <select value={tech} onChange={(e) => setTech(e.target.value)} aria-label="Filter by technology">
          <option value="all">All technologies</option>
          {PROJECT_TECH.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
          <option value="all">All categories</option>
          {PROJECT_CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} aria-label="Sort projects">
          <option value="featured">Featured first</option>
          <option value="alpha">Alphabetical</option>
        </select>
        {active ? (
          <button type="button" className="btn btn-ghost" onClick={reset}>
            Reset filters
          </button>
        ) : null}
      </div>
      <p className="filter-count">
        {filtered.length} of {PROJECTS.length} verified repositories
      </p>
      {filtered.length ? (
        <div className="project-grid">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No projects match those filters.</p>
          <button type="button" className="btn btn-primary" onClick={reset}>
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
