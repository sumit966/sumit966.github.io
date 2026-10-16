import { SITE } from "@/data/site";
import { IconGithub, IconLinkedin, IconMail } from "./Icons";

export default function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="container contact">
        <p className="eyebrow">Contact</p>
        <h2 className="section-title">Let’s collaborate</h2>
        <p className="section-copy">
          Open to internships, applied research, and product engineering roles across AI, data, and software. Reach out with a problem, a dataset, or a product brief.
        </p>
        <div className="contact-grid">
          <a className="contact-card" href={`mailto:${SITE.email}`}>
            <IconMail width={18} height={18} />
            <span>Email</span>
            <strong>{SITE.email}</strong>
          </a>
          <a className="contact-card" href={SITE.github} target="_blank" rel="noreferrer">
            <IconGithub width={18} height={18} />
            <span>GitHub</span>
            <strong>github.com/sumit966</strong>
          </a>
          <a className="contact-card" href={SITE.linkedin} target="_blank" rel="noreferrer">
            <IconLinkedin width={18} height={18} />
            <span>LinkedIn</span>
            <strong>er-sumit-raj-</strong>
          </a>
        </div>
      </div>
    </section>
  );
}
