import { getProjectsByRole, type RoleId } from "./projects";

export type Role = {
  id: RoleId;
  title: string;
  shortTitle: string;
  href: string;
  accent: string;
  accentSoft: string;
  tagline: string;
  intro: string;
  resumeFile: string;
  skills: Record<string, string[]>;
};

export const ROLES: Role[] = [
  {
    id: "ai-ml-engineer",
    title: "AI / ML Engineer",
    shortTitle: "AI / ML",
    href: "/roles/ai-ml-engineer",
    accent: "#7dd3fc",
    accentSoft: "rgba(125, 211, 252, 0.16)",
    tagline: "Models, evaluation, and inference systems you can operate.",
    intro:
      "Work in this track focuses on supervised learning, computer vision, recommenders, and MLOps — training, tracking, and serving models from repositories that actually exist on GitHub.",
    resumeFile: "Sumit_Raj_AI_ML_Engineer.pdf",
    skills: {
      "Languages": ["Python", "SQL"],
      "Machine learning": ["Scikit-learn", "XGBoost", "PyTorch", "TensorFlow", "Keras"],
      "Computer vision": ["YOLOv8", "OpenCV", "CNN", "Grad-CAM"],
      "MLOps": ["MLflow", "DVC", "FastAPI", "Docker", "GitHub Actions"],
    },
  },
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    shortTitle: "Full Stack",
    href: "/roles/full-stack-developer",
    accent: "#a78bfa",
    accentSoft: "rgba(167, 139, 250, 0.16)",
    tagline: "Product surfaces, APIs, auth, and deployments.",
    intro:
      "These projects cover React and Node services, JWT auth, real-time boards, Electron prototypes, and verified Vercel deployments.",
    resumeFile: "Sumit_Raj_Full_Stack_Developer.pdf",
    skills: {
      Frontend: ["React", "JavaScript", "TypeScript", "HTML"],
      Backend: ["Node.js", "Express", "FastAPI", "JWT", "WebSockets"],
      Data: ["MongoDB", "PostgreSQL", "SQLite"],
      Delivery: ["Docker", "Vercel", "Render", "GCP"],
    },
  },
  {
    id: "generative-ai-engineer",
    title: "Generative AI Engineer",
    shortTitle: "Generative AI",
    href: "/roles/generative-ai-engineer",
    accent: "#c4b5fd",
    accentSoft: "rgba(196, 181, 253, 0.16)",
    tagline: "RAG, agents, embeddings, and evaluation loops.",
    intro:
      "This page maps to repositories built around LangChain, LangGraph, vector search, LoRA fine-tuning, and document chat — plus LLM-assisted analytics.",
    resumeFile: "Sumit_Raj_GenAI_Engineer.pdf",
    skills: {
      Orchestration: ["LangChain", "LangGraph", "OpenAI", "Groq"],
      Retrieval: ["ChromaDB", "FAISS", "Sentence Transformers", "RAG"],
      Adaptation: ["LoRA", "PEFT", "Hugging Face", "PyTorch"],
      Serving: ["FastAPI", "Docker"],
    },
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    shortTitle: "Data",
    href: "/roles/data-analyst",
    accent: "#5eead4",
    accentSoft: "rgba(94, 234, 212, 0.16)",
    tagline: "Cleaning, cohorts, dashboards, and decision metrics.",
    intro:
      "Analytics work here is grounded in SQL/Pandas modelling, RFM and cohort analysis, churn modelling, and dashboarding with Power BI, Plotly, and Streamlit.",
    resumeFile: "Sumit_Raj_Data_Analyst.pdf",
    skills: {
      Analysis: ["SQL", "Python", "Pandas", "Exploratory analysis"],
      Modelling: ["RFM", "Cohort analysis", "Logistic regression", "Random forest"],
      Visualization: ["Power BI", "Plotly", "Streamlit"],
      Serving: ["FastAPI", "Docker"],
    },
  },
  {
    id: "software-engineer",
    title: "Software Engineer",
    shortTitle: "Software",
    href: "/roles/software-engineer",
    accent: "#93c5fd",
    accentSoft: "rgba(147, 197, 253, 0.16)",
    tagline: "APIs, infrastructure, testing, and maintainable systems.",
    intro:
      "This track emphasises backend services, job queues, URL routing, CI/CD, Terraform, and production-shaped Python/TypeScript repositories.",
    resumeFile: "Sumit_Raj_Software_Engineer.pdf",
    skills: {
      Languages: ["Python", "TypeScript", "JavaScript", "HCL"],
      Services: ["FastAPI", "REST APIs", "SQLite", "JWT"],
      Platform: ["Docker", "GitHub Actions", "GCP", "Terraform"],
      Practice: ["Rate limiting", "Retries", "Infrastructure as code"],
    },
  },
];

export function getRole(id: string) {
  return ROLES.find((role) => role.id === id);
}

export function getRoleWithProjects(id: RoleId) {
  const role = getRole(id);
  if (!role) return undefined;
  return { role, projects: getProjectsByRole(id) };
}
