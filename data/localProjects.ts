import type { PortfolioProject } from "./portfolio";

/**
 * Completed, scoped deliverables recovered from local source and resume evidence.
 * Provenance and qualifications live in docs/*project*inventory.md,
 * docs/expanded-project-search.md and docs/completed-project-checks.md.
 * Public source destinations are verified in docs/public-project-links.md; private or unknown URLs remain null.
 */
export const localProjects: PortfolioProject[] = [
  {
    id: "jobintel",
    title: "JobIntel",
    category: "Development",
    year: "2026",
    summary:
      "A hiring-intelligence workspace connecting job discovery, company research and CRM workflows.",
    tags: ["React", "FastAPI", "PostgreSQL", "HubSpot"],
    url: "https://github.com/aman-singh27/ACE-CONSULTING",
    linkLabel: "View source",
    context:
      "Recruitment research scattered job postings, company information and CRM records across separate tools.",
    approach:
      "Built a React workspace and FastAPI backend with normalized ingestion, company matching, scoring, scheduled jobs, SQLAlchemy persistence and HubSpot synchronization.",
    outcome:
      "Delivered a B2B hiring-intelligence product to a recruitment client, bringing jobs, companies, ingestion runs and CRM actions into one workflow.",
    status: "Client delivery",
    featured: true,
  },
  {
    id: "navpal",
    title: "NavPal",
    category: "Development",
    year: "2026",
    summary:
      "Indoor navigation with editable campus maps, QR anchors and shortest-path routing.",
    tags: ["Next.js", "TypeScript", "MongoDB", "Zustand"],
    url: null,
    linkLabel: "Project details",
    context:
      "Finding rooms and moving between floors needs building-aware directions and maps that administrators can maintain.",
    approach:
      "Contributed a map-building and navigation workflow with persistent map sessions, graph editing, QR entry points, stairs and elevator routing, and teacher/admin access flows.",
    outcome:
      "Built the navigation application and administration workflow with the team. Campus-wide deployment was under review when documented in my resume.",
    status: "Deployment under review",
    featured: true,
  },
  {
    id: "po-tracker",
    title: "PO Tracker",
    category: "Development",
    year: "2026",
    summary:
      "A purchase-order workspace that turns spreadsheet entry into a traceable team workflow.",
    tags: ["Django", "React", "TypeScript", "REST APIs"],
    url: "https://github.com/aman-singh27/PO-Tracker",
    linkLabel: "View source",
    context:
      "Spreadsheet-based purchase orders made revisions, record searches and ambiguous historical entries difficult to manage together.",
    approach:
      "Built multi-user order entry and search, paste-based entry, revision history, workbook migration and a review queue for ambiguous records.",
    outcome:
      "Completed the first release with a structured order workflow and audit history. Automated PDF extraction remains outside this release.",
    status: "Release 1",
    featured: true,
  },
  {
    id: "rkitect-sketchup-tools",
    title: "rkitect · SketchUp Tools",
    category: "AI systems",
    year: "2026",
    summary:
      "Rendering workflows inside SketchUp, from viewport capture to 360° views and iterative edits.",
    tags: ["Ruby", "SketchUp", "TypeScript", "AI rendering"],
    url: null,
    linkLabel: "Project details",
    context:
      "Architects need to move from a working model to visual exploration without repeatedly exporting between disconnected tools.",
    approach:
      "Contributed plugin and rendering workflows connecting model capture, unified viewpoints, panorama generation and iterative AI edits to the rkitect backend.",
    outcome:
      "Delivered rendering modules as part of the rkitect team. This case study covers my contribution to the plugin workflow.",
    status: "Company contribution",
    featured: true,
  },
  {
    id: "qpaper",
    title: "Question Paper Predictor",
    category: "AI systems",
    year: "2026",
    summary:
      "An exam-preparation workspace that turns past papers into organized questions and subject insights.",
    tags: ["React", "TypeScript", "Firebase", "Gemini"],
    url: "https://github.com/ananyasingh2601/question-paper-predictor",
    linkLabel: "View source",
    context:
        "A collaborative exam-preparation project helping students organize past papers and understand which topics keep appearing.",
    approach:
        "Contributed protected branch, year and subject views, with paper uploads, OCR, question extraction, topic inference, deduplication and analysis APIs.",
    outcome:
      "Completed paper organization and analysis workflows that help students focus revision on recurring topics.",
      status: "Team project",
    featured: true,
  },
  {
    id: "photobooth",
    title: "PhotoBooth",
    category: "Development",
    year: "2026",
    summary:
      "A connected photo-booth workflow from Android capture to a desktop gallery and custom photo strips.",
    tags: ["Kotlin", "CameraX", "FastAPI", "PySide6"],
    url: "https://github.com/aman-singh27/photo_app",
    linkLabel: "View source",
    context:
      "A busy photo booth needs a predictable handoff between camera capture, photo selection, strip creation and the print queue.",
    approach:
      "Built a session-based Android capture and upload flow, a desktop gallery with vintage filters and strip previews, and a separate receiver for completed strips.",
    outcome:
      "Packaged the Android app and implemented the capture-to-strip workflow with a print-queue handoff. Physical printing depends on the event's printer setup.",
    status: "Connected capture workflow",
    featured: true,
  },
  {
    id: "rkitect-content-engine",
    title: "rkitect · Content Engine",
    category: "Automation",
    year: "2026",
    summary:
      "A coordinated research-to-content pipeline with quality checks, review and publishing integrations.",
    tags: ["Python", "Flask", "LLM agents", "Buffer"],
    url: null,
    linkLabel: "Project details",
    context:
      "Consistent brand content requires research, channel-specific writing, visual direction and review before scheduling.",
    approach:
      "Built coordinated research, filtering, generation and QA stages, with runtime brand context, image workflows, review controls and publishing integrations.",
    outcome:
      "Delivered the content-generation and review pipeline during my rkitect role, connecting approved content to scheduling and engagement feedback.",
    status: "Company contribution",
    featured: false,
  },
  {
    id: "ambient-expenses",
    title: "Ambient Expense Tracker",
    category: "Development",
    year: "2026",
    summary:
      "A browser expense tracker for bank and cash entries, spending review and portable exports.",
    tags: ["React", "TypeScript", "localStorage", "Vite"],
    url: null,
    linkLabel: "Project details",
    context:
      "Personal expense tracking needs a simple way to review entries, identify counterparties and understand spending without losing control of the data.",
    approach:
      "Built onboarding, a transaction feed, review queues, bank/cash wallets, analytics, settings and CSV export with browser-local persistence.",
    outcome:
      "Completed the web app with working ledger and review flows. Native Android notification ingestion and widgets are outside this browser release.",
    status: "Browser app",
    featured: false,
  },
  {
    id: "campus-hub",
    title: "Campus Hub",
    category: "Development",
    year: "2025",
    summary:
      "A student platform bringing campus events, registrations and food ordering into one place.",
    tags: ["JavaScript", "Firebase", "Authentication", "Web apps"],
    url: null,
    linkLabel: "Project details",
    context:
      "Campus activities and food orders need clear discovery, registration and ordering flows for students.",
    approach:
      "Contributed to the university team's platform, working on authentication, role-based access and event/food workflows as the product evolved toward a MERN architecture.",
    outcome:
      "Helped build the student-facing experience and supporting access flows through collaborative sprint delivery.",
    status: "Team contribution",
    featured: false,
  },
];
