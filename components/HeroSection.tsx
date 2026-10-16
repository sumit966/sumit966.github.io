"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { SITE } from "@/data/site";
import { PROJECTS } from "@/data/projects";
import { ROLES } from "@/data/roles";
import { IconArrow, IconGithub, IconLinkedin, IconMail } from "./Icons";
import ResumeButton from "./ResumeButton";

const ParticleWave = dynamic(() => import("./ParticleWave"), { ssr: false });

export default function HeroSection() {
  return (
    <section id="home" className="hero">
      <ParticleWave />
      <div className="hero-shade" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Engineering portfolio</p>
          <h1>
            {SITE.name.split(" ")[0]}
            <span> {SITE.name.split(" ")[1]}</span>
          </h1>
          <p className="lede">{SITE.tagline}</p>
          <p className="hero-intro">{SITE.intro}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/projects">
              Explore projects <IconArrow width={16} height={16} />
            </Link>
            <Link className="btn btn-ghost" href="#roles">
              Explore my roles
            </Link>
            <ResumeButton file="Sumit_Raj_AI_ML_Engineer.pdf" className="btn btn-ghost" />
          </div>
          <div className="hero-social">
            <a href={SITE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <IconGithub width={18} height={18} />
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <IconLinkedin width={18} height={18} />
            </a>
            <a href={`mailto:${SITE.email}`} aria-label="Email">
              <IconMail width={18} height={18} />
            </a>
          </div>
          <dl className="hero-stats">
            <div>
              <dt>Verified repos</dt>
              <dd>{PROJECTS.length}</dd>
            </div>
            <div>
              <dt>Role pages</dt>
              <dd>{ROLES.length}</dd>
            </div>
            <div>
              <dt>Live demos</dt>
              <dd>{PROJECTS.filter((p) => p.liveUrl).length}</dd>
            </div>
          </dl>
        </div>
      </div>
      <a className="scroll-hint" href="#roles">
        Scroll
      </a>
    </section>
  );
}
