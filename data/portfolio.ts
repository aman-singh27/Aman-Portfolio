import { localProjects } from "./localProjects";
export {
  experiences,
  education,
  certifications,
  independentVenture,
} from "./experience";

/** Portfolio content refreshed from the latest 2026 resume and verified local project sources.
 * See docs/experience-refresh-audit.md and the project inventory reports.
 */
export const profile = {
  name: "Aman Singh",
  role: "Full-stack developer & automation engineer",
  location: "Studying at Manipal University Jaipur",
  email: "amansingh271204@gmail.com",
  github: "https://github.com/aman-singh27",
  linkedin: "https://www.linkedin.com/in/aman-singh-401a48306/",
  resume: "/Aman_Singh_Resume.pdf",
};

export type ProjectCategory =
  "Development" | "Automation" | "AI systems" | "Design";

export interface PortfolioProject {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  summary: string;
  tags: string[];
  url: string | null;
  linkLabel: string;
  context: string;
  approach: string;
  outcome: string;
  featured: boolean;
  status?: string;
}

export const projects: PortfolioProject[] = [
  ...localProjects,
  {
    id: "splitly",
    title: "Splitly",
    category: "Development",
    year: "2026",
    summary:
      "An expense-sharing app that makes every split and balance explainable.",
    tags: ["Django", "React", "TypeScript", "SQLite"],
    url: "https://splitly-decentro.onrender.com",
    linkLabel: "View demo",
    context:
      "Built as a developer assignment in October 2026: help a group record expenses, choose equal or custom shares, and understand who owes whom.",
    approach:
      "Paired a React interface with Django REST Framework, exact integer money calculations, transaction services, retry-safe creates, debt explanations, and protected optional receipt uploads.",
    outcome:
      "Published a responsive demo with documented API contracts and backend, frontend, and browser tests. The demo uses temporary storage and records payments made elsewhere; it does not transfer money.",
    featured: true,
    status: "Developer assignment",
  },
  {
    id: "medvault",
    title: "MedVault",
    category: "AI systems",
    year: "2024",
    summary:
      "Emergency medical records, with access control and AI-assisted report parsing.",
    tags: ["React", "Firebase", "Supabase", "Gemini AI"],
    url: "https://github.com/aman-singh27/Med_Vault",
    linkLabel: "View source",
    context:
      "Healthcare providers need a clear route to critical patient information during emergencies.",
    approach:
      "Built authentication and role-based access with Firebase, modeled patient records in Firestore, and integrated Supabase document storage with Gemini report parsing.",
    outcome:
      "Connected patient records, protected document access, and extraction of symptoms and risk markers in one full-stack project.",
    featured: true,
  },
  {
    id: "muj-eats",
    title: "MUJ Eats",
    category: "Automation",
    year: "2025",
    summary:
      "A WhatsApp food-ordering workflow connecting hostel students with vendors.",
    tags: ["n8n", "WhatsApp Cloud API", "Google Cloud"],
    url: null,
    linkLabel: "Project details",
    context:
      "Student food orders required repetitive coordination between customers and vendors.",
    approach:
      "Created a WhatsApp chatbot with order confirmations, vendor routing, status updates, and a serverless backend using Cloud Functions and n8n.",
    outcome:
      "Automated vendor notifications and order coordination, keeping the ordering flow inside WhatsApp.",
    featured: true,
  },
];

export const capabilities = [
  {
    title: "Full-stack development",
    description:
      "From responsive interfaces to authentication, structured data, and product dashboards.",
    tools: [
      "React",
      "TypeScript",
      "Django",
      "Express",
      "Firebase",
      "Supabase",
      "REST APIs",
      "React Native",
    ],
  },
  {
    title: "Workflow automation",
    description:
      "Connect tools and move repetitive work through reliable, reusable workflows.",
    tools: [
      "n8n",
      "Make.com",
      "Python",
      "Buffer",
      "Webhooks",
      "WhatsApp Cloud API",
      "Google Cloud Functions",
    ],
  },
  {
    title: "AI systems & agents",
    description:
      "Bring language models and document understanding into practical product workflows.",
    tools: [
      "Gemini",
      "OpenRouter",
      "Mistral",
      "OCR pipelines",
      "Relevance AI",
      "Prompt engineering",
      "Python",
    ],
  },
  {
    title: "Product & interface design",
    description:
      "Translate product needs into clear user flows, reusable components, and accessible interfaces.",
    tools: [
      "Figma",
      "Design systems",
      "Responsive UI",
      "Prototyping",
      "SketchUp",
      "Git",
      "CI/CD basics",
    ],
  },
];
