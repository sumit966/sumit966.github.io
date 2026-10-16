import { JOURNEY } from "@/data/site";

export default function JourneyTimeline() {
  return (
    <section id="journey" className="section">
      <div className="container">
        <p className="eyebrow">Path</p>
        <h2 className="section-title">Journey</h2>
        <p className="section-copy">
          Only education, internship, and publication records already present in the live site or GitHub repositories are shown. Dates that could not be verified are omitted rather than invented.
        </p>
        <ol className="timeline">
          {JOURNEY.map((item) => (
            <li key={item.id}>
              <span className="timeline-kind">{item.kind}</span>
              <h3>{item.title}</h3>
              <p className="timeline-org">{item.org}</p>
              <p className="timeline-period">{item.period}</p>
              {"detail" in item && item.detail ? <p>{item.detail}</p> : null}
              {"points" in item && item.points ? (
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
