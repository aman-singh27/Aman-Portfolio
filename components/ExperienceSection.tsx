import {
  certifications,
  education,
  experiences,
  independentVenture,
} from "../data/experience";
import { profile } from "../data/portfolio";
import "./ExperienceSection.css";

export default function ExperienceSection() {
  return (
    <section
      className="experience section-space"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="section-label">
        <span>04 / LEARNING BY DOING</span>
        <span>( EXPERIENCE )</span>
      </div>

      <div className="experience-heading">
        <h2 id="experience-title">
          Different chapters.
          <br />
          <em>One curious mind.</em>
        </h2>
        <div className="experience-heading-copy">
          <p>
            From AI tools and product engineering to campus software and a
            hands-on photo booth. Every role has added something to the way I
            build.
          </p>
          <a
            className="text-link experience-resume"
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
          >
            The full story, in my resume
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </a>
        </div>
      </div>

      <ol className="experience-cards" aria-label="Work experience, most recent first">
        {experiences.map((item, index) => (
          <li className="experience-position" key={item.id}>
            <article
              className={`experience-card experience-card-${item.id}`}
              aria-labelledby={`experience-${item.id}`}
            >
              <div className="experience-card-top">
                <span className="experience-card-chapter">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.focus}
                </span>
                <span className="experience-monogram" aria-hidden="true">{item.mark}</span>
              </div>
              <div className="experience-card-identity">
                <h3 id={`experience-${item.id}`}>{item.displayName}</h3>
                {item.organizationDetail && (
                  <p className="experience-organization-detail">{item.organizationDetail}</p>
                )}
                <p className="experience-role">{item.role}</p>
              </div>
              <p className="experience-description">{item.description}</p>
              <p className="experience-period">{item.period}</p>
            </article>
          </li>
        ))}
      </ol>

      <aside className="experience-venture" aria-label="Independent venture">
        <div className="experience-venture-label">
          <span className="experience-venture-dot" aria-hidden="true" />
          <span>BUILDING NEXT</span>
        </div>
        <div className="experience-venture-title">
          <h3>{independentVenture.name}</h3>
          <span>{independentVenture.status}</span>
        </div>
        <p>{independentVenture.description}</p>
      </aside>

      <div className="learning-grid">
        <div>
          <h3 className="eyebrow">THE ACADEMIC CHAPTER</h3>
          {education.map((item) => (
            <div className="education-item" key={item.title}>
              <span>{item.period}</span>
              <h4>{item.title}</h4>
              <p>{item.institution}</p>
              <p className="education-detail">{item.detail}</p>
            </div>
          ))}
        </div>
        <div>
          <h3 className="eyebrow">A FEW THINGS LEARNED ALONG THE WAY</h3>
          <ul className="certification-list">
            {certifications.map((item) => (
              <li key={item.title}>
                <span>
                  {item.title}
                  {"detail" in item ? <small> · {item.detail}</small> : null}
                </span>
                <span>{item.issuer}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
