import CinematicIntro from "@/components/CinematicIntro";
import HeroSection from "@/components/HeroSection";
import RoleGrid from "@/components/RoleGrid";
import ProjectCard from "@/components/ProjectCard";
import JourneyTimeline from "@/components/JourneyTimeline";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import { getFeaturedProjects } from "@/data/projects";
import Link from "next/link";

export default function HomePage() {
  const featured = getFeaturedProjects().slice(0, 6);

  return (
    <>
      <CinematicIntro />
      <main>
        <HeroSection />
        <RoleGrid />
        <section className="section">
          <div className="container">
            <p className="eyebrow">Selected work</p>
            <h2 className="section-title">Featured projects</h2>
            <p className="section-copy">
              Chosen for documentation quality, role relevance, and working public repositories — not recency alone.
            </p>
            <div className="project-grid">
              {featured.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/projects">
                View all projects
              </Link>
            </div>
          </div>
        </section>
        <JourneyTimeline />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}
