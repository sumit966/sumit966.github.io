import type { Metadata } from "next";
import ProjectExplorer from "@/components/ProjectExplorer";

export const metadata: Metadata = {
  title: "Projects",
  description: "Searchable catalogue of verified GitHub repositories by Sumit Raj.",
};

export default function ProjectsPage() {
  return (
    <main className="page-head">
      <div className="container">
        <p className="eyebrow">Catalogue</p>
        <h1 className="section-title">Projects</h1>
        <p className="section-copy">
          Public repositories inspected from github.com/sumit966 on 16 Oct 2026. Live demos appear only when the GitHub homepage field contained a URL. Metrics quoted on cards come from those repositories’ own descriptions.
        </p>
        <ProjectExplorer />
      </div>
    </main>
  );
}
