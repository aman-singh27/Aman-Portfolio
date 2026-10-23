import React, { useEffect, useRef, useState } from "react";
import {
  projects,
  type PortfolioProject,
  type ProjectCategory,
} from "../data/portfolio";
import "./WorkShowcase.css";
import ExtendedProjectArtwork, {
  getProjectSurface,
} from "./ExtendedProjectArtwork";

const projectCategories: ProjectCategory[] = [
  "Development",
  "Automation",
  "AI systems",
  "Design",
];
const filters: Array<"All" | ProjectCategory> = [
  "All",
  ...projectCategories.filter((category) =>
    projects.some((project) => project.category === category),
  ),
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"} />
    </svg>
  );
}

/** Original concept illustrations. These represent the work, not live interfaces. */
function ProjectArtwork({ id, title }: { id: string; title: string }) {
  if (id === "splitly")
    return (
      <div className="work-art work-art-split" aria-hidden="true">
        <span className="work-art-caption">SHARED MOMENTS. SIMPLE MATH.</span>
        <div className="work-split-ring" />
        <div className="work-split-ring work-split-ring-two" />
        <div className="work-split-brand">
          splitly<span>↗</span>
        </div>
        <div className="work-split-copy">
          Good times.
          <br />
          <i>Fair shares.</i>
        </div>
        <div className="work-split-receipt">
          <span className="work-mini-label">THE WEEKEND PLAN</span>
          <div className="work-split-avatars">
            <i>A</i>
            <i>R</i>
            <i>S</i>
            <i>+1</i>
          </div>
          <strong>
            One trip.
            <br />
            All square.
          </strong>
          <div className="work-split-bars">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="work-split-total">
            <span>EVERY SHARE</span>
            <b>EXPLAINED. ✓</b>
          </div>
        </div>
        <span className="work-art-foot">EXPENSES / BALANCES / CLARITY</span>
      </div>
    );
  if (id === "cleanomatics-workspace")
    return (
      <div className="work-art work-art-tasks" aria-hidden="true">
        <span className="work-art-caption">
          MAKE ROOM FOR THE WORK THAT MATTERS.
        </span>
        <div className="work-tasks-type">
          A little order.
          <br />
          <em>A lot of focus.</em>
        </div>
        <div className="work-task-board">
          <div className="work-task-board-head">
            <span className="work-task-logo">↗</span>
            <strong>Workspace</strong>
            <span>YOUR DAY, IN VIEW.</span>
          </div>
          <div className="work-task-columns">
            <div>
              <span>
                TO DO <i>02</i>
              </span>
              <div className="work-task-note">
                <b>Plan the next big thing.</b>
                <small>PLANNING</small>
                <i />
              </div>
              <div className="work-task-note">
                <b>Make it make sense.</b>
                <small>PRODUCT</small>
                <i />
              </div>
            </div>
            <div>
              <span>
                IN PROGRESS <i>01</i>
              </span>
              <div className="work-task-note work-task-note-active">
                <b>
                  Less noise.
                  <br />
                  More progress.
                </b>
                <small>DEVELOPMENT</small>
                <i />
              </div>
            </div>
            <div>
              <span>
                DONE <i>01</i>
              </span>
              <div className="work-task-note">
                <b>Ship something good.</b>
                <small>COMPLETE ✓</small>
                <i />
              </div>
            </div>
          </div>
        </div>
        <span className="work-art-foot">TASKS / SEARCH / FILTERS / FLOW</span>
      </div>
    );
  if (id === "medvault")
    return (
      <div className="work-art work-art-health" aria-hidden="true">
        <span className="work-art-caption">
          CONNECTED CARE / PROTECTED BY DESIGN
        </span>
        <div className="work-health-orbit work-orbit-one" />
        <div className="work-health-orbit work-orbit-two" />
        <div className="work-health-symbol">
          <svg viewBox="0 0 100 100">
            <path
              d="M40 15h20v25h25v20H60v25H40V60H15V40h25Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="work-health-record">
          <span className="work-mini-label">PATIENT RECORD</span>
          <strong>Care, connected.</strong>
          <div className="work-record-line" />
          <div className="work-record-line work-record-short" />
          <div className="work-health-pulse">
            <svg viewBox="0 0 240 50">
              <path
                d="M0 25h50l12-15 15 30 16-35 15 20h20l10-10 14 10h88"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <span className="work-record-lock">
            <svg viewBox="0 0 20 20">
              <rect x="5" y="9" width="10" height="8" rx="2" />
              <path d="M7 9V6a3 3 0 0 1 6 0v3" />
            </svg>
            Role-based access
          </span>
        </div>
        <span className="work-art-word work-health-word">MedVault</span>
        <span className="work-art-foot">FULL-STACK + APPLIED AI</span>
      </div>
    );

  if (id === "muj-eats")
    return (
      <div className="work-art work-art-food" aria-hidden="true">
        <span className="work-art-caption">CAMPUS CRAVINGS. CONNECTED.</span>
        <div className="work-food-type">
          GOOD
          <br />
          <span>FOOD.</span>
          <br />
          NO FUSS.
        </div>
        <div className="work-food-phone">
          <div className="work-phone-header">
            <span>m.</span>
            <div>
              MUJ Eats<small>Campus food, in a chat.</small>
            </div>
          </div>
          <div className="work-chat work-chat-in">Late night cravings?</div>
          <div className="work-chat work-chat-out">
            The usual, please.<span>✓✓</span>
          </div>
          <div className="work-food-order">
            <div className="work-food-icon">↗</div>
            <div>
              One message.
              <br />
              <strong>Order in motion.</strong>
            </div>
          </div>
          <div className="work-chat work-chat-in">Sent to your vendor. ✓</div>
          <div className="work-phone-input">
            Your next order <b>↑</b>
          </div>
        </div>
        <div className="work-food-sticker">
          CAMPUS
          <br />
          FOOD <span>✳</span>
        </div>
        <span className="work-art-foot">WHATSAPP × WORKFLOW AUTOMATION</span>
      </div>
    );

  if (id === "aman-star")
    return (
      <div className="work-art work-art-store" aria-hidden="true">
        <span className="work-art-caption">FROM BROWSE TO BUSINESS</span>
        <div className="work-store-board">
          <div className="work-store-nav">
            <strong>
              amanstar<span>✳</span>
            </strong>
            <span>TECH, SIMPLIFIED. ↗</span>
          </div>
          <div className="work-store-head">
            A smarter
            <br />
            way to <em>shop.</em>
          </div>
          <div className="work-store-product">
            <div className="work-device-screen">
              <span />
              <i />
              <i />
              <i />
            </div>
            <div className="work-device-base" />
            <div className="work-device-shadow" />
          </div>
          <div className="work-store-bottom">
            <span>EXPLORE. CONNECT. ORDER.</span>
            <div>Find your next upgrade ↗</div>
          </div>
        </div>
        <div className="work-store-badge">
          BUILT
          <br />
          FOR THE
          <br />
          <b>EVERYDAY.</b>
        </div>
        <span className="work-art-foot">
          COMMERCE / CATALOG / CONVERSATIONS
        </span>
      </div>
    );

  if (id === "invoice-automation")
    return (
      <div className="work-art work-art-invoice" aria-hidden="true">
        <span className="work-art-caption">LESS INPUT. MORE INTELLIGENCE.</span>
        <div className="work-invoice-grid" />
        <div className="work-flow-line" />
        <div className="work-invoice-paper">
          <span className="work-mini-label">DOCUMENT / 001</span>
          <strong>Invoice.</strong>
          <div className="work-paper-lines">
            <i />
            <i />
            <i />
          </div>
          <div className="work-paper-total">
            <span>TOTAL</span>
            <b>Extracted ↗</b>
          </div>
        </div>
        <div className="work-ai-node">
          <span>✳</span>
          <strong>AI</strong>
        </div>
        <div className="work-extract-node">
          <svg viewBox="0 0 30 30">
            <path d="m7 15 6 6L24 9" />
          </svg>
          <span>
            STRUCTURED
            <br />& CONNECTED
          </span>
        </div>
        <div className="work-invoice-type">
          Paperwork.
          <br />
          <span>Meet workflow.</span>
        </div>
        <span className="work-art-foot">OCR → EXTRACTION → RECONCILIATION</span>
      </div>
    );

  return <ExtendedProjectArtwork id={id} title={title} />;
}

export default function WorkShowcase() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<PortfolioProject | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const visible = projects.filter(
    (project) =>
      (filter === "All" || project.category === filter) &&
      `${project.title} ${project.summary} ${project.tags.join(" ")}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  useEffect(() => {
    sectionRef.current?.dispatchEvent(
      new CustomEvent("portfolio:work-filter", { bubbles: true }),
    );
  }, [filter, query]);
  const changeFilter = (next: (typeof filters)[number], nextQuery = query) => {
    if (next === filter && nextQuery === query) return;
    sectionRef.current?.dispatchEvent(
      new CustomEvent("portfolio:work-before-filter", { bubbles: true }),
    );
    setFilter(next);
    setQuery(nextQuery);
  };

  useEffect(() => {
    if (!selected || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [selected]);

  return (
    <section
      ref={sectionRef}
      className="work-section"
      id="work"
      aria-labelledby="work-heading"
    >
      <div className="work-section-top">
        <span className="work-eyebrow">
          <i /> SELECTED WORK
        </span>
        <span className="work-eyebrow">IDEAS, BUILT INTO REAL THINGS. ↙</span>
      </div>
      <div className="work-heading-row">
        <h2 id="work-heading">
          PROOF OF
          <br />
          <span>POSSIBILITY.</span>
        </h2>
        <p>
          Products, workflows, websites,
          <br />
          and experiences I’ve built.
          <br />
          <span>Each one, a different problem.</span>
        </p>
      </div>
      <div className="work-toolbar">
        <div className="work-filters" role="group" aria-label="Filter projects">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => changeFilter(item)}
            >
              {item}
              {filter === item && <span aria-hidden="true">↗</span>}
            </button>
          ))}
        </div>
        <label className="work-search">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <circle cx="10" cy="10" r="6.5" />
            <path d="m15 15 6 6" />
          </svg>
          <input
            type="search"
            aria-label="Search projects"
            placeholder="Find a project"
            value={query}
            maxLength={100}
            onChange={(event) => changeFilter(filter, event.target.value)}
          />
        </label>
        <span className="work-count" role="status" aria-live="polite">
          {String(visible.length).padStart(2, "0")} PROJECT
          {visible.length !== 1 ? "S" : ""}
        </span>
      </div>
      <div className="work-grid">
        {visible.map((project) => (
          <article
            className="work-card"
            key={project.id}
            data-project={project.id}
            style={
              {
                "--project-surface": getProjectSurface(project.id),
              } as React.CSSProperties
            }
          >
            <button
              className="work-art-button"
              type="button"
              aria-label={`Explore ${project.title} case study`}
              aria-haspopup="dialog"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setSelected(project);
              }}
            >
              <ProjectArtwork id={project.id} title={project.title} />
              <span className="work-art-action">
                <Arrow diagonal />
              </span>
              <span className="work-art-label">CONCEPT VISUAL</span>
              {project.status && (
                <span className="work-status">{project.status}</span>
              )}
            </button>
            <div className="work-card-meta">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>
            <div className="work-card-title">
              <h3>{project.title}</h3>
              <button
                type="button"
                className="work-detail-button"
                aria-label={`Read ${project.title} case study`}
                aria-haspopup="dialog"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setSelected(project);
                }}
              >
                <Arrow diagonal />
              </button>
            </div>
            <p className="work-card-summary">{project.summary}</p>
            <div className="work-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
        {visible.length === 0 && (
          <div className="work-empty">
            <p>No projects match this search.</p>
            <button type="button" onClick={() => changeFilter("All", "")}>
              Clear filters <span aria-hidden="true">↗</span>
            </button>
          </div>
        )}
      </div>
      <div className="work-section-bottom">
        <span>SMALL DETAILS. BIG DIFFERENCE.</span>
        <a
          href="https://github.com/aman-singh27"
          target="_blank"
          rel="noopener noreferrer"
        >
          More on GitHub <Arrow diagonal />
        </a>
      </div>
      <dialog
        ref={dialogRef}
        className="work-dialog"
        aria-labelledby="work-dialog-heading"
        onCancel={(event) => {
          event.preventDefault();
          setSelected(null);
        }}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.target === event.currentTarget &&
            (event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom)
          )
            setSelected(null);
        }}
      >
        {selected && (
          <>
            <div className="work-dialog-top">
              <span className="work-eyebrow">
                PROJECT NOTES / {selected.year}
              </span>
              <button
                type="button"
                className="work-dialog-close"
                onClick={() => setSelected(null)}
                aria-label="Close case study"
                autoFocus
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m6 6 12 12M6 18 18 6" />
                </svg>
              </button>
            </div>
            <div className="work-dialog-content">
              <span className="work-dialog-category">
                {selected.category}
                {selected.status ? ` · ${selected.status}` : ""}
              </span>
              <h2 id="work-dialog-heading">{selected.title}</h2>
              <p className="work-dialog-summary">{selected.summary}</p>
              <div className="work-tags">
                {selected.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="work-case-section">
                <span>01 / THE CONTEXT</span>
                <p>{selected.context}</p>
              </div>
              <div className="work-case-section">
                <span>02 / THE APPROACH</span>
                <p>{selected.approach}</p>
              </div>
              <div className="work-case-section">
                <span>03 / THE OUTCOME</span>
                <p>{selected.outcome}</p>
              </div>
              <div className="work-dialog-footer">
                {selected.url ? (
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selected.linkLabel} <Arrow diagonal />
                  </a>
                ) : (
                  <a
                    href={`mailto:amansingh271204@gmail.com?subject=${encodeURIComponent(`Tell me about ${selected.title}`)}`}
                  >
                    Let’s talk about this project <Arrow diagonal />
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
