export const ROLE_IDS = [
  "ai-ml-engineer",
  "full-stack-developer",
  "generative-ai-engineer",
  "data-analyst",
  "software-engineer",
] as const;

export type RoleId = (typeof ROLE_IDS)[number];

export type ProjectStatus = "verified" | "incomplete" | "needs-confirmation";

export type ArtworkKind =
  | "pipeline"
  | "vectors"
  | "rag"
  | "logs"
  | "vision"
  | "scan"
  | "network"
  | "agents"
  | "layers"
  | "charts"
  | "funnel"
  | "chat"
  | "kanban"
  | "links"
  | "queue"
  | "stream"
  | "shop"
  | "cloud"
  | "infra"
  | "enterprise";

export type Project = {
  id: string;
  title: string;
  repoName: string;
  github: string;
  description: string;
  problem: string;
  features: string[];
  tech: string[];
  roles: RoleId[];
  category: string;
  featured: boolean;
  status: ProjectStatus;
  liveUrl?: string;
  language?: string;
  artwork: ArtworkKind;
  inspected: "github-api-and-readme-exists";
};

/**
 * Canonical project catalogue.
 * Inspected 2026-10-16 via GitHub API for user sumit966 (25 public repos).
 * Descriptions and tech tags come from repository metadata / topics / README presence.
 * Metrics that appear below are copied from the repositories' own GitHub descriptions,
 * not independently re-measured.
 */
export const PROJECTS: Project[] = [
  {
    id: "rag-clinical-qa",
    title: "RAG Clinical Question Answering",
    repoName: "rag-clinical-qa",
    github: "https://github.com/sumit966/rag-clinical-qa",
    description:
      "RAG pipeline with LangChain and ChromaDB for clinical question answering, including hybrid search (BM25 + dense) and Reciprocal Rank Fusion.",
    problem: "Retrieve grounded answers from clinical documents instead of relying on unaided LLM recall.",
    features: [
      "LangChain retrieval pipeline with ChromaDB",
      "Hybrid search (BM25 + dense embeddings) and Reciprocal Rank Fusion",
      "FastAPI serving and Docker packaging",
      "Repository description states 92% answer relevance on clinical QA",
    ],
    tech: ["Python", "LangChain", "ChromaDB", "FastAPI", "Docker", "RAG"],
    roles: ["generative-ai-engineer", "ai-ml-engineer", "software-engineer"],
    category: "Generative AI",
    featured: true,
    status: "verified",
    language: "Python",
    artwork: "rag",
    inspected: "github-api-and-readme-exists",
  },
  {
    id: "mlops-loan-default",
    title: "MLOps Loan Default Pipeline",
    repoName: "mlops-loan-default",
    github: "https://github.com/sumit966/mlops-loan-default",
    description:
      "End-to-end MLOps pipeline for loan default prediction with MLflow, DVC, FastAPI, and GitHub Actions.",
    problem: "Train, track, version, and serve a credit-risk model as a repeatable pipeline.",
    features: [
      "Experiment tracking with MLflow and data versioning with DVC",
      "Model serving through FastAPI",
      "CI with GitHub Actions and Docker packaging",
      "Repository description mentions XGBoost AUC-ROC 0.94",
    ],
    tech: ["Python", "XGBoost", "MLflow", "DVC", "FastAPI", "Docker", "GitHub Actions", "Scikit-learn"],
    roles: ["ai-ml-engineer", "software-engineer", "data-analyst"],
    category: "MLOps",
    featured: true,
    status: "verified",
    language: "Python",
    artwork: "pipeline",
    inspected: "github-api-and-readme-exists",
  },
  {
    id: "pulseiq",
    title: "PulseIQ",
    repoName: "PulseIQ",
    github: "https://github.com/sumit966/PulseIQ",
    description:
      "Real-time AI analytics platform covering streaming, ML inference, LLM insights, and live dashboards.",
    problem: "Combine streaming analytics, classical ML, and LLM summaries in one operational view.",
    features: [
      "Streaming-oriented analytics stack (Kafka listed in topics)",
      "ML inference with scikit-learn",
      "LLM insights via Groq",
      "Live dashboards with Plotly and Streamlit",
    ],
    tech: ["Python", "Streamlit", "Kafka", "Scikit-learn", "Groq", "Plotly", "Docker"],
    roles: ["data-analyst", "ai-ml-engineer", "generative-ai-engineer"],
    category: "Analytics",
    featured: true,
    status: "verified",
    language: "Python",
    artwork: "stream",
    inspected: "github-api-and-readme-exists",
  },
  {
    id: "fintech-it-solutions",
    title: "Fintech IT Solutions",
    repoName: "fintech-it-solutions",
    github: "https://github.com/sumit966/fintech-it-solutions",
    liveUrl: "https://fintech-it-solutions.vercel.app",
    description:
      "Full-stack enterprise website for a bootstrapped startup. React, Node.js, MongoDB, JWT, and Gmail SMTP. Deployed on Vercel and Render.",
    problem: "Give a services company a production marketing and lead-capture product with authenticated backend workflows.",
    features: [
      "React frontend with Node/Express APIs",
      "MongoDB persistence and JWT authentication",
      "Email delivery via Gmail SMTP",
      "Verified live deployment on Vercel",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Vercel", "Render"],
    roles: ["full-stack-developer", "software-engineer"],
    category: "Product",
    featured: true,
    status: "verified",
    language: "HTML",
    artwork: "enterprise",
    inspected: "github-api-and-readme-exists",
  },
  {
    id: "multi-agent-research",
    title: "Multi-Agent Research Assistant",
    repoName: "multi-agent-research",
    github: "https://github.com/sumit966/multi-agent-research",
    description:
      "LangGraph multi-agent workflow with planner, researcher, writer, and evaluator agents that produce cited research reports.",
    problem: "Coordinate specialised agents so research answers stay cited and reviewed before return.",
    features: [
      "Planner, researcher, writer, and evaluator agent roles",
      "Tool calling for cited report generation",
      "FastAPI serving",
      "LangChain / LangGraph orchestration",
    ],
    tech: ["Python", "LangGraph", "LangChain", "OpenAI", "FastAPI"],
    roles: ["generative-ai-engineer", "ai-ml-engineer"],
    category: "Generative AI",
    featured: true,
    status: "verified",
    language: "Python",
    artwork: "agents",
    inspected: "github-api-and-readme-exists",
  },
  {
    id: "ai-document-chat",
    title: "AI Document Chat",
    repoName: "ai-document-chat",
    github: "https://github.com/sumit966/ai-document-chat",
    description:
      "Full-stack document chat: upload PDFs and query them through a RAG backend, with JWT auth. React, Node.js, FastAPI, PostgreSQL.",
    problem: "Let authenticated users talk to their own documents rather than a generic chatbot.",
    features: [
      "JWT login and document upload",
      "RAG-backed chat API",
      "React frontend with Node.js and FastAPI services",
      "PostgreSQL storage; Docker and GCP Cloud Run noted in the repository description",
    ],
    tech: ["React", "Node.js", "FastAPI", "PostgreSQL", "JWT", "Docker", "GCP", "RAG"],
    roles: ["full-stack-developer", "generative-ai-engineer", "software-engineer"],
    category: "Full Stack",
    featured: true,
    status: "verified",
    language: "Python",
    artwork: "chat",
    inspected: "github-api-and-readme-exists",
  },
  {
    id: "product-recommender-faiss",
    title: "Product Recommender with FAISS",
    repoName: "product-recommender-faiss",
    github: "https://github.com/sumit966/product-recommender-faiss",
    description:
      "Hybrid product recommender combining collaborative filtering with embedding similarity search in FAISS.",
    problem: "Recommend products using both interaction history and semantic similarity.",
    features: [
      "Collaborative filtering plus embedding similarity",
      "FAISS vector search",
      "Sentence Transformers and PyTorch",
      "FastAPI and Docker packaging",
    ],
    tech: ["Python", "PyTorch", "Sentence Transformers", "FAISS", "FastAPI", "Docker"],
    roles: ["ai-ml-engineer", "generative-ai-engineer"],
    category: "Machine Learning",
    featured: true,
    status: "verified",
    language: "Python",
    artwork: "vectors",
    inspected: "github-api-and-readme-exists",
  },
  {
    id: "military-vehicle-detection",
    title: "Military Vehicle Detection & Face Auth",
    repoName: "military-vehicle-detection",
    github: "https://github.com/sumit966/military-vehicle-detection",
    description:
      "Surveillance prototype using YOLOv8 for vehicle detection and Haar Cascade + LBPH for face authentication.",
    problem: "Detect vehicles and authenticate faces in a desktop surveillance workflow.",
    features: [
      "YOLOv8 object detection",
      "Haar Cascade and LBPH face authentication",
      "OpenCV processing",
      "Tkinter interface; GCP listed in topics",
    ],
    tech: ["Python", "YOLOv8", "OpenCV", "Tkinter", "GCP"],
    roles: ["ai-ml-engineer", "software-engineer"],
    category: "Computer Vision",
    featured: true,
    status: "verified",
    language: "Python",
    artwork: "vision",
    inspected: "github-api-and-readme-exists",
  },
  {
    id: "brain-tumor-detection",
    title: "Brain Tumor Detection from MRI",
    repoName: "brain-tumor-detection",
    github: "https://github.com/sumit966/brain-tumor-detection",
    description:
      "CNN classification of brain tumors from MRI scans using TensorFlow/Keras. Repository description states 93.18% accuracy across four tumor types.",
    problem: "Classify MRI slices into tumor categories with an inspectable deep-learning workflow.",
    features: [
      "CNN trained with TensorFlow/Keras",
      "Grad-CAM listed in repository topics",
      "ONNX export listed in topics",
      "Jupyter Notebook implementation",
    ],
    tech: ["Python", "TensorFlow", "Keras", "CNN", "Grad-CAM", "ONNX"],
    roles: ["ai-ml-engineer", "data-analyst"],
    category: "Computer Vision",
    featured: true,
    status: "verified",
    language: "Jupyter Notebook",
    artwork: "scan",
    inspected: "github-api-and-readme-exists",
  },
  {
    id: "ecommerce-analytics",
    title: "E-commerce Sales & Customer Analytics",
    repoName: "ecommerce-analytics",
    github: "https://github.com/sumit966/ecommerce-analytics",
    description:
      "Sales and customer analytics with RFM segmentation, cohort retention, and a business-insights dashboard.",
    problem: "Turn retail transactions into retention, revenue, and segment views.",
    features: [
      "RFM segmentation",
      "Cohort retention analysis",
      "SQL and Pandas modelling",
      "Power BI dashboard and FastAPI/Docker packaging listed in topics",
    ],
    tech: ["Python", "SQL", "Pandas", "Power BI", "FastAPI", "Docker"],
    roles: ["data-analyst", "ai-ml-engineer"],
    category: "Data Analytics",
    featured: true,
    status: "verified",
    language: "Python",
    artwork: "charts",
    inspected: "github-api-and-readme-exists",
  },
  {
    id: "llm-security-analyzer",
    title: "LLM Security Log Analyzer",
    repoName: "llm-security-analyzer",
    github: "https://github.com/sumit966/llm-security-analyzer",
    description:
      "LangGraph agent workflow that analyses security logs with the OpenAI API. Repository description mentions a self-reflection loop and hallucination under 3%.",
    problem: "Summarise security logs in natural language while checking the model against a reflection step.",
    features: [
      "LangGraph agent workflow",
      "OpenAI API integration",
      "Self-reflection evaluation loop stated in the repository",
      "FastAPI serving listed in topics",
    ],
    tech: ["Python", "LangGraph", "OpenAI", "FastAPI"],
    roles: ["generative-ai-engineer", "software-engineer"],
    category: "Generative AI",
    featured: false,
    status: "verified",
    language: "Python",
    artwork: "logs",
    inspected: "github-api-and-readme-exists",
  },
  {
    id: "llm-lora-finetuning",
    title: "Domain LLM Fine-Tuning with LoRA",
    repoName: "llm-lora-finetuning",
    github: "https://github.com/sumit966/llm-lora-finetuning",
    description:
      "Domain-specific LLM fine-tuning with LoRA, comparing the adapted model against the base model on a fixed evaluation set.",
    problem: "Adapt an open-source LLM to a domain Q&A set without full-model fine-tuning.",
    features: [
      "LoRA / PEFT-style fine-tuning workflow",
      "Fixed evaluation comparison versus the base model",
      "Training code published on GitHub",
    ],
    tech: ["Python", "PyTorch", "Hugging Face", "LoRA", "PEFT"],
    roles: ["generative-ai-engineer", "ai-ml-engineer"],
    category: "Generative AI",
    featured: false,
    status: "verified",
    language: "Python",
    artwork: "layers",
    inspected: "github-api-and-readme-exists",
  },
  {
    id: "android-botnet-detection",
    title: "Android Botnet Detection",
    repoName: "-android-botnet-detection",
    github: "https://github.com/sumit966/-android-botnet-detection",
    description:
      "Android botnet detection using SVM on 342 static application features. Published in IJRASET 2023 (DOI: 10.22214/ijraset.2023.49506).",
    problem: "Classify Android applications that communicate with botnet command-and-control infrastructure.",
    features: [
      "SVM classification on 342 static features",
      "Research publication with DOI listed on the repository",
      "Python / scikit-learn workflow",
    ],
    tech: ["Python", "Scikit-learn", "SVM"],
    roles: ["ai-ml-engineer", "software-engineer", "data-analyst"],
    category: "Research",
    featured: false,
    status: "verified",
    language: undefined,
    artwork: "network",
    inspected: "github-api-and-readme-exists",
  },
  {
    id: "customer-churn-analysis",
    title: "Customer Churn Analysis",
    repoName: "customer-churn-analysis",
    github: "https://github.com/sumit966/customer-churn-analysis",
    description:
      "Customer churn analysis and prediction using logistic regression and random forest, with ranking of churn drivers.",
    problem: "Identify which customers are likely to leave and which factors drive that risk.",
    features: [
      "Logistic regression and random forest models",
      "Churn-driver ranking",
      "SQL / Python analysis",
      "Power BI presentation listed in topics",
    ],
    tech: ["Python", "SQL", "Pandas", "Scikit-learn", "Power BI", "FastAPI", "Docker"],
    roles: ["data-analyst", "ai-ml-engineer"],
    category: "Data Analytics",
    featured: false,
    status: "verified",
    language: "Python",
    artwork: "funnel",
    inspected: "github-api-and-readme-exists",
  },
  {
    id: "collab-task-board",
    title: "Collaborative Task Board",
    repoName: "collab-task-board",
    github: "https://github.com/sumit966/collab-task-board",
    description:
      "Real-time collaborative Kanban board with WebSockets, JWT authentication, and role-based access.",
    problem: "Let a team create, assign, and move work items with live updates.",
    features: [
      "Kanban-style board",
      "Live updates over WebSockets",
      "JWT authentication and role-based access",
    ],
    tech: ["Python", "WebSockets", "JWT"],
    roles: ["full-stack-developer", "software-engineer"],
    category: "Full Stack",
    featured: false,
    status: "verified",
    language: "Python",
    artwork: "kanban",
    inspected: "github-api-and-readme-exists",
  },
  {
    id: "url-shortener-service",
    title: "URL Shortener Service",
    repoName: "url-shortener-service",
    github: "https://github.com/sumit966/url-shortener-service",
    description:
      "URL shortener with rate limiting, caching, and click analytics. FastAPI with SQLite.",
    problem: "Create and resolve short links with abuse controls and basic analytics.",
    features: [
      "REST API for create/resolve",
      "Rate limiting",
      "Click analytics",
      "Docker packaging",
    ],
    tech: ["Python", "FastAPI", "SQLite", "Docker"],
    roles: ["software-engineer", "full-stack-developer"],
    category: "Backend",
    featured: false,
    status: "verified",
    language: "Python",
    artwork: "links",
    inspected: "github-api-and-readme-exists",
  },
  {
    id: "background-job-queue",
    title: "Background Job Queue",
    repoName: "background-job-queue",
    github: "https://github.com/sumit966/background-job-queue",
    description:
      "Async job queue with priorities, retries, and status tracking, exposed through FastAPI and SQLite.",
    problem: "Run background work reliably without coupling it to request threads.",
    features: [
      "Priorities, retries, and status tracking",
      "REST APIs via FastAPI",
      "SQLite persistence",
    ],
    tech: ["Python", "FastAPI", "SQLite"],
    roles: ["software-engineer"],
    category: "Backend",
    featured: false,
    status: "verified",
    language: "Python",
    artwork: "queue",
    inspected: "github-api-and-readme-exists",
  },
  {
    id: "bloopville-prototype",
    title: "Bloopville Prototype",
    repoName: "bloopville-prototype",
    github: "https://github.com/sumit966/bloopville-prototype",
    description:
      "Character-brand e-commerce prototype as a native desktop app with Electron. Catalogue, admin dashboard, cart, and checkout.",
    problem: "Prototype a branded storefront as a desktop/PWA experience rather than a brochure site.",
    features: [
      "Electron desktop shell with vanilla JavaScript",
      "Admin dashboard, cart, and checkout",
      "Repository description notes a 2000-product catalogue",
    ],
    tech: ["JavaScript", "Electron", "Node.js"],
    roles: ["full-stack-developer"],
    category: "Product",
    featured: false,
    status: "verified",
    language: "JavaScript",
    artwork: "shop",
    inspected: "github-api-and-readme-exists",
  },
  {
    id: "cicd-pipeline-gcp",
    title: "CI/CD Pipeline on GCP",
    repoName: "cicd-pipeline-gcp",
    github: "https://github.com/sumit966/cicd-pipeline-gcp",
    description:
      "CI/CD pipeline with Docker, GitHub Actions, and GCP Compute Engine. Repository description states faster deployments; that figure is not independently re-measured here.",
    problem: "Automate build and deploy onto GCP virtual machines.",
    features: [
      "GitHub Actions workflows",
      "Dockerised FastAPI service",
      "GCP Compute Engine target; Terraform and Nginx listed in topics",
    ],
    tech: ["Docker", "GitHub Actions", "GCP", "FastAPI", "Terraform"],
    roles: ["software-engineer"],
    category: "DevOps",
    featured: false,
    status: "verified",
    artwork: "cloud",
    inspected: "github-api-and-readme-exists",
  },
  {
    id: "terraform-gcp-infrastructure",
    title: "Terraform GCP Infrastructure",
    repoName: "terraform-gcp-infrastructure",
    github: "https://github.com/sumit966/terraform-gcp-infrastructure",
    description:
      "Infrastructure as Code for GCP VPC, subnets, firewall, and Compute Engine VMs with multi-environment support.",
    problem: "Provision repeatable GCP network and VM baselines from code.",
    features: [
      "VPC, subnet, and firewall modules",
      "Compute Engine VM provisioning",
      "Multi-environment layout",
    ],
    tech: ["Terraform", "HCL", "GCP"],
    roles: ["software-engineer"],
    category: "Infrastructure",
    featured: false,
    status: "verified",
    language: "HCL",
    artwork: "infra",
    inspected: "github-api-and-readme-exists",
  },
  {
    id: "fintech-ai-portal",
    title: "Fintech AI Portal",
    repoName: "fintech-ai-portal",
    github: "https://github.com/sumit966/fintech-ai-portal",
    liveUrl: "https://fintech-ai-portal.vercel.app",
    description:
      "JavaScript application with a verified Vercel deployment. The GitHub description field is empty; details should be confirmed from the live app and repository source.",
    problem: "Ship a public fintech/AI web portal.",
    features: [
      "Public Vercel deployment verified from the GitHub homepage field",
      "JavaScript codebase",
    ],
    tech: ["JavaScript", "Vercel"],
    roles: ["full-stack-developer", "generative-ai-engineer"],
    category: "Product",
    featured: false,
    status: "needs-confirmation",
    language: "JavaScript",
    artwork: "enterprise",
    inspected: "github-api-and-readme-exists",
  },
  {
    id: "fintech-enterprise-platform",
    title: "Fintech Enterprise Platform",
    repoName: "FINTECH-ENTERPRISE-PLATFORM",
    github: "https://github.com/sumit966/FINTECH-ENTERPRISE-PLATFORM",
    liveUrl: "https://fintech-enterprise-platform.vercel.app",
    description:
      "TypeScript application with a verified Vercel deployment. The GitHub description field is empty; treat product claims as needing confirmation from the live app.",
    problem: "Deliver an enterprise fintech web platform.",
    features: [
      "TypeScript codebase",
      "Public Vercel deployment verified from the GitHub homepage field",
    ],
    tech: ["TypeScript", "Vercel"],
    roles: ["full-stack-developer", "software-engineer"],
    category: "Product",
    featured: false,
    status: "needs-confirmation",
    language: "TypeScript",
    artwork: "enterprise",
    inspected: "github-api-and-readme-exists",
  },
];

export const PROJECT_TECH = Array.from(
  new Set(PROJECTS.flatMap((project) => project.tech))
).sort();

export const PROJECT_CATEGORIES = Array.from(
  new Set(PROJECTS.map((project) => project.category))
).sort();

export function getProjectById(id: string) {
  return PROJECTS.find((project) => project.id === id);
}

export function getProjectsByRole(role: RoleId) {
  return PROJECTS.filter((project) => project.roles.includes(role));
}

export function getFeaturedProjects() {
  return PROJECTS.filter((project) => project.featured);
}
