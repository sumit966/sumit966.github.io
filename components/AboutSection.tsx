export default function AboutSection() {
  return (
    <section id="about" className="section about">
      <div className="container about-grid">
        <div>
          <p className="eyebrow">About</p>
          <h2 className="section-title">How I like to build</h2>
        </div>
        <div className="about-copy">
          <p>
            I care about systems that stay understandable after the demo: data that can be versioned, models that can be evaluated, APIs that fail loudly, and interfaces that do not hide complexity behind decoration.
          </p>
          <p>
            The work on this site is organised by hiring role so a reviewer can see the relevant repositories without wading through every experiment. Each project card is backed by a public GitHub repository inspected for this rebuild.
          </p>
          <p>
            Interests that show up repeatedly in the code: retrieval-augmented generation, computer vision prototypes, analytics dashboards, and small production-shaped backend services.
          </p>
          <div className="about-diagram" aria-hidden>
            <span>Observe</span>
            <i />
            <span>Model</span>
            <i />
            <span>Serve</span>
            <i />
            <span>Evaluate</span>
          </div>
        </div>
      </div>
    </section>
  );
}
