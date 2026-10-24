# Aman Singh - Portfolio

A React and TypeScript portfolio built with Vite. Desktop scroll scenes connect a pinned opening, rotating 3D wireframe, rising introduction panel, horizontal expertise rail, and layered project panels. The page also includes category filters, project-detail dialogs, experience and education, FAQs, and email actions.

No API key, backend, database, or environment file is required to run this portfolio. External project demos are separate applications with their own availability and storage limits.

## Run locally

Install Node.js and npm, then run from the repository root:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Use the following checks before publishing:

```sh
npm run typecheck
npm run build
npm run preview
```

`build` runs TypeScript checking and writes the static website to `dist/`. `typecheck` is also available separately. `preview` serves the built output locally for review.

## Edit the content

- `data/portfolio.ts`: profile, capabilities, project type, and combined project collection.
- `data/localProjects.ts`: nine selected projects recovered from local source.
- `data/experience.ts`: current resume-backed roles, education, certifications, and the separately marked Tenary venture.
- `App.tsx`: page structure, introduction, process copy, FAQs, contact actions, and navigation.
- `components/WorkShowcase.tsx`: project filters, detail dialogs, and original concept illustrations. The illustrations are labelled concept visuals and are not screenshots of live interfaces.
- `components/ExperienceSection.tsx` and its CSS: a responsive career grid with two prominent recent roles, two earlier roles, and a separate Tenary venture strip.
- `components/ScrollChoreography.tsx` and its CSS: GSAP ScrollTrigger scenes, responsive pinning, and scroll timing. Mobile and short viewports keep natural document flow. Reduced motion and the pause control remove the pinned scenes.
- `components/ExtendedProjectArtwork.tsx` and its CSS: original artwork for the expanded project collection.
- `components/KineticGlobe.tsx`: native Canvas2D sphere projection, animation lifecycle, and visibility-aware rendering.
- `src/index.css` and `components/WorkShowcase.css`: layout, typography, colors, responsive styles, and motion preferences.
- `index.html`: page title, description, social metadata, favicon, fonts, and JavaScript-free contact information.

Each project uses the `PortfolioProject` type. Give it a stable `id`, one supported category (`Development`, `Automation`, `AI systems`, or `Design`), a year, summary, tags, and context/approach/outcome paragraphs. Set `url` to `null` when no project-specific destination is known; the detail dialog will offer email contact instead. A concise optional `status` appears on the project card and in its dialog. Search matches names, summaries, and tools. Search and category changes safely rebuild the scroll scenes. Add a dedicated concept illustration for new IDs.

The downloadable resume is the verified September 2026 version (identical to an October copy). The page includes four roles, CGPA 9.0, and 12 selected projects after the user's curation. Only categories containing projects appear as filters. Tenary is separately marked in development, as the user confirmed. Evidence lives in `docs/experience-refresh-audit.md`, the local/Antigravity/expanded inventories, `docs/completed-project-checks.md`, and `docs/public-project-links.md`. Earlier content audits preserve discovery history; current selection and layout checks live in `docs/experience-redesign-verification.md`.

Only implemented deliverables enter the completed collection. A finished frontend does not imply a working enquiry backend; a delivered employer module does not claim ownership of the company platform; a navigation MVP does not imply campus-wide deployment. Incomplete integrations, failed builds, plans, duplicates, and upstream downloads stay in the inventory. Verify new outcomes, public URLs, and client media permission before publishing new claims.

Splitly is a developer assignment. Its case study describes temporary demo storage and does not imply employment at the named company. Keep those practical limits with the project notes.

## Assets

`public/Aman_Singh_Resume.pdf` is the latest verified resume, and `public/favicon.png` is the favicon. `public/robots.txt` is copied into the published output. Files in `public/` keep their names and are available from the site root. The About portrait is `src/images/aman-portrait.jpeg`, supplied by Aman for this section. Imported source assets are processed and fingerprinted by Vite.

Anton and DM Sans Latin WOFF2 assets are stored in `public/fonts/`, with their source metadata and SIL Open Font License notices. Use local font faces and system-font fallbacks; see `public/fonts/README.md`. Concept project visuals are built from HTML/CSS/SVG. Older components and generated images remain in the repository but are not imported by the current page; review references before removing them or their dependencies.

## Review workflow

1. Update the content and its evidence notes.
2. Run type checking and the production build.
3. Review the built page at desktop and mobile widths, including a narrow phone and landscape orientation.
4. Check navigation, project filters, project dialogs (keyboard/Escape/focus return), FAQs, email copying, resume access, outbound links, and reduced-motion behavior.
5. Deploy the reviewed `dist/` output.

Audit documents belong in `docs/`. Browser screenshots and traces in `output/` and `.playwright-cli/` are generated review artifacts and are ignored by Git.

## Deploy to a static host

Use any static hosting platform that can run the build or accept the built files:

- Install command: `npm ci`
- Build command: `npm run build`
- Publish/output directory: `dist`

The page uses section hashes rather than application routes, so it does not require a backend route handler. The current configuration assumes hosting at a domain root. For a subdirectory deployment, configure Vite's `base` and update root-relative public asset links such as the resume and favicon to match that location.

After deployment, check the actual public page, resume, favicon, email links, and project destinations. Add a canonical URL, sitemap, and social preview image only after the final public domain and assets are confirmed.
