// ============================================================
// PROFILE DATA - Source of Truth (based on 5 resumes)
// ============================================================

const PROFILE_DATA = {
  name: "Sumit Raj",
  title: "AI/ML · GenAI · Data · Full Stack · Software Engineer",
  location: "Patna, India",
  phone: "+91 9472441137",
  email: "info.sr0909@gmail.com",
  linkedin: "https://www.linkedin.com/in/er-sumit-raj-/",
  github: "https://github.com/sumit966",
  portfolio: "https://sumit966-github-io.vercel.app",

  education: [
    {
      degree: "M.Tech, Applied AI and Machine Learning",
      institution: "VNIT Nagpur",
      year: "2024 - May 2026",
      cgpa: "6.53/10",
    },
    {
      degree: "B.E., Computer Science",
      institution: "Dr. D.Y. Patil Institute of Technology, Pune",
      year: "2019 - 2023",
      cgpa: "7.89/10",
    },
  ],

  experience: {
    role: "Software Engineer Intern",
    company: "Salesforce (Remote)",
    duration: "Feb 2022 - May 2022",
    points: [
      "Built Python bulk data-processing pipelines, cutting manual data handling by ~40%",
      "Integrated Salesforce APIs into optimized backend workflows, improving efficiency by ~25%",
      "Wrote SQL queries with joins and aggregations for CRM data analysis",
      "Analyzed 10,000+ CRM records with SQL to identify business trends",
      "Built Power BI dashboards for stakeholders, reducing manual reporting by 60%",
    ],
    tech: ["Python", "Java", "SQL", "Salesforce APIs", "Power BI"],
  },

  // ============================================================
  // 5 ROLES
  // ============================================================
  roles: {

    "ai-ml": {
      title: "AI/ML Engineer",
      slug: "ai-ml",
      faIcon: "fa-robot",
      tagline: "Building intelligent systems with deep learning, computer vision, and NLP.",
      resume: "Sumit_Raj_AI_ML_Engineer.pdf",
      skills: {
        "Languages": ["Python", "SQL"],
        "Machine Learning & Deep Learning": ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "CNN", "RNN", "LSTM"],
        "Computer Vision": ["OpenCV", "YOLOv8", "Haar Cascade", "Object Detection", "Image Classification"],
        "GenAI & NLP": ["LLMs", "RAG", "LangChain", "LangGraph", "Hugging Face", "Transformers", "Prompt Engineering", "Embeddings", "LoRA Fine-tuning"],
        "MLOps & Data": ["MLflow", "FastAPI", "Docker", "GitHub Actions CI/CD", "Git", "FAISS", "ChromaDB", "Pandas", "NumPy"],
        "Building": ["DVC", "Recommendation Systems", "Model Serving", "Evaluation Metrics"],
      },
      projectIds: [
        "mlops-loan-default",
        "product-recommender",
        "rag-clinical-qa",
        "llm-security-analyzer",
        "military-vehicle-detection",
        "brain-tumor-detection",
        "android-botnet-detection",
      ],
    },

    "genai": {
      title: "Generative AI Engineer",
      slug: "genai",
      faIcon: "fa-brain",
      tagline: "Building LLM-powered applications with RAG, agents, and prompt engineering.",
      resume: "Sumit_Raj_GenAI_Engineer.pdf",
      skills: {
        "LLMs & GenAI": ["LLMs", "RAG", "LangChain", "LangGraph", "Prompt Engineering", "OpenAI API", "Hugging Face", "Transformers", "LoRA Fine-tuning", "Embeddings", "Agent Workflows"],
        "Retrieval": ["ChromaDB", "FAISS", "Sentence Transformers", "Hybrid Search (BM25 + Dense)"],
        "Deep Learning": ["PyTorch", "TensorFlow", "Scikit-learn"],
        "Backend & Deployment": ["Python", "SQL", "FastAPI", "Docker", "GitHub Actions CI/CD", "Git"],
        "Building": ["PEFT", "Tool Calling", "Multi-Agent Systems", "LLM Evaluation"],
      },
      projectIds: [
        "multi-agent-research",
        "llm-lora-finetuning",
        "rag-clinical-qa",
        "llm-security-analyzer",
        "military-vehicle-detection",
        "brain-tumor-detection",
        "android-botnet-detection",
      ],
    },

    "data-analyst": {
      title: "Data Analyst",
      slug: "data-analyst",
      faIcon: "fa-chart-bar",
      tagline: "Transforming raw data into actionable business insights with SQL, Python, and BI tools.",
      resume: "Sumit_Raj_Data_Analyst.pdf",
      skills: {
        "Analysis": ["SQL (Joins, Aggregations)", "Python", "Pandas", "NumPy", "Exploratory Data Analysis", "Data Cleaning", "Statistics", "Probability", "KPI Definition"],
        "Visualization & BI": ["Power BI", "Matplotlib", "Seaborn", "Dashboards", "Data Visualization"],
        "Databases": ["MySQL", "PostgreSQL", "SQLite"],
        "Languages & Tools": ["Python", "SQL", "R", "Scikit-learn", "Git", "GitHub"],
        "Building": ["DAX", "Cohort Analysis", "RFM Segmentation", "Window Functions"],
      },
      projectIds: [
        "ecommerce-analytics",
        "customer-churn-analysis",
        "rag-clinical-qa",
        "llm-security-analyzer",
        "military-vehicle-detection",
        "brain-tumor-detection",
        "android-botnet-detection",
      ],
    },

    "full-stack": {
      title: "Full Stack Developer",
      slug: "full-stack",
      faIcon: "fa-laptop-code",
      tagline: "Building end-to-end web apps with React, Node.js, and FastAPI.",
      resume: "Sumit_Raj_Full_Stack_Developer.pdf",
      skills: {
        "Frontend": ["React.js", "JavaScript", "TypeScript"],
        "Backend": ["Node.js", "FastAPI", "REST APIs", "Microservices (basic)"],
        "Languages": ["JavaScript", "TypeScript", "Python", "Java", "SQL"],
        "Databases": ["MySQL", "PostgreSQL", "MongoDB"],
        "Tools & DevOps": ["Git", "GitHub", "Docker", "GitHub Actions CI/CD", "GCP", "Linux"],
        "Building": ["JWT Authentication", "WebSockets", "Role-Based Access"],
      },
      projectIds: [
        "ai-document-chat",
        "collab-task-board",
        "rag-clinical-qa",
        "llm-security-analyzer",
        "military-vehicle-detection",
        "brain-tumor-detection",
        "android-botnet-detection",
      ],
    },

    "software-engineer": {
      title: "Software Engineer",
      slug: "software-engineer",
      faIcon: "fa-cogs",
      tagline: "Building clean, scalable software with strong DSA and OOP foundations.",
      resume: "Sumit_Raj_Software_Engineer.pdf",
      skills: {
        "Languages": ["Java", "Python", "JavaScript", "C++", "SQL"],
        "Backend": ["REST APIs", "FastAPI", "Node.js", "Object-Oriented Programming", "Microservices (basic)", "SDLC"],
        "Databases": ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
        "DevOps & Cloud": ["Docker", "GitHub Actions CI/CD", "Git", "Linux", "GCP"],
        "Fundamentals": ["Data Structures and Algorithms", "Problem Solving"],
        "Building": ["Redis Caching", "Rate Limiting", "Unit Testing with pytest"],
      },
      projectIds: [
        "url-shortener-service",
        "background-job-queue",
        "rag-clinical-qa",
        "llm-security-analyzer",
        "military-vehicle-detection",
        "brain-tumor-detection",
        "android-botnet-detection",
      ],
    },
  },

  // ============================================================
  // PROJECTS (14 total - all from your GitHub + resumes)
  // ============================================================
  projects: {

    "mlops-loan-default": {
      title: "End-to-End MLOps Pipeline for Loan Default Prediction",
      faIcon: "fa-stream",
      category: "mlops",
      prototype: "training-loss",
      year: "2024",
      tech: "Python, Scikit-learn, MLflow, DVC, FastAPI, Docker, GitHub Actions",
      desc: "Production MLOps pipeline tracking experiments with MLflow, versioning data with DVC, and serving the best model via FastAPI.",
      bullets: [
        "Built a training pipeline that tracks experiments with MLflow and versions data with DVC",
        "Served the best model through a FastAPI endpoint packaged in Docker",
        "Automated tests and deployment with GitHub Actions CI/CD",
      ],
      github: "https://github.com/sumit966/mlops-loan-default",
    },

    "product-recommender": {
      title: "Product Recommendation System with Embeddings",
      faIcon: "fa-lightbulb",
      category: "ai-ml",
      prototype: "embedding-search",
      year: "2024",
      tech: "Python, PyTorch, Sentence Transformers, FAISS, FastAPI",
      desc: "Recommender combining collaborative filtering with embedding-based similarity search in FAISS.",
      bullets: [
        "Combines collaborative filtering with embedding-based similarity search in FAISS",
        "Evaluated with precision@k and recall@k against a popularity baseline",
        "Exposed through FastAPI",
      ],
      github: "https://github.com/sumit966/product-recommender-faiss",
    },

    "rag-clinical-qa": {
      title: "RAG-Based Clinical Question Answering System",
      faIcon: "fa-comments",
      category: "genai",
      prototype: "rag-pipeline",
      year: "2025",
      tech: "Python, LangChain, ChromaDB, FastAPI, Docker, GitHub Actions",
      desc: "RAG pipeline for clinical document retrieval reaching 92% answer relevance with hybrid search.",
      bullets: [
        "RAG pipeline for clinical document retrieval with LangChain and ChromaDB",
        "Reached 92% answer relevance on a 100-question benchmark",
        "Hybrid search (BM25 + dense embeddings) with Reciprocal Rank Fusion improved retrieval by 18%",
        "Deployed with FastAPI, Docker, GitHub Actions CI/CD at under 500 ms latency",
      ],
      github: "https://github.com/sumit966/rag-clinical-qa",
    },

    "llm-security-analyzer": {
      title: "LLM-Powered Security Log Analyzer",
      faIcon: "fa-search",
      category: "genai",
      prototype: "log-stream",
      year: "2025",
      tech: "Python, LangGraph, OpenAI API",
      desc: "LangGraph agent analyzing 50K+ security logs with self-reflection loop keeping hallucination under 3%.",
      bullets: [
        "LangGraph agent workflow with OpenAI API to analyze 50K+ security logs",
        "Generated natural-language threat summaries",
        "Self-reflection evaluation loop kept hallucination under 3% on 200 curated test cases",
      ],
      github: "https://github.com/sumit966/llm-security-analyzer",
    },

    "military-vehicle-detection": {
      title: "Military Vehicle Detection & Face Authentication",
      faIcon: "fa-shield-alt",
      category: "ai-ml",
      prototype: "bounding-box",
      year: "Academic",
      tech: "Python, YOLOv8, OpenCV, Haar Cascade",
      desc: "Real-time surveillance system with Haar Cascade face authentication at 95% accuracy and YOLOv8 vehicle tracking.",
      bullets: [
        "Real-time surveillance system with Haar Cascade face authentication at ~95% detection accuracy",
        "Detected and tracked military vehicles with YOLOv8 and OpenCV",
        "Automated email alerts for security events",
      ],
      github: "https://github.com/sumit966/military-vehicle-detection",
    },

    "brain-tumor-detection": {
      title: "Brain Tumor Detection from MRI Scans",
      faIcon: "fa-microscope",
      category: "ai-ml",
      prototype: "mri-scan",
      year: "2024",
      tech: "Python, Deep Learning",
      desc: "Deep learning model to classify brain tumors on 3,000+ MRI scans.",
      bullets: [
        "Trained a deep learning model to classify brain tumors",
        "Dataset of 3,000+ MRI scans",
      ],
      github: "https://github.com/sumit966/brain-tumor-detection",
    },

    "android-botnet-detection": {
      title: "Mobile Botnet Detection System",
      faIcon: "fa-robot",
      category: "ai-ml",
      prototype: "network-graph",
      year: "2024",
      tech: "Python, Scikit-learn",
      desc: "ML model detecting malicious bot communications with C&C servers via Android network traffic patterns.",
      bullets: [
        "Detected malicious bot communications with C&C servers",
        "Analyzed Android network traffic patterns",
      ],
      github: "https://github.com/sumit966/-android-botnet-detection",
    },

    "multi-agent-research": {
      title: "Multi-Agent Research Assistant",
      faIcon: "fa-users-cog",
      category: "genai",
      prototype: "agent-flow",
      year: "2025",
      tech: "Python, LangGraph, LangChain, OpenAI API, FastAPI",
      desc: "LangGraph multi-agent workflow with planner, researcher, and writer agents producing cited research reports.",
      bullets: [
        "LangGraph multi-agent workflow with planner, researcher and writer agents",
        "Agents use tool calling to produce cited research reports",
        "Evaluation step checks each answer against sources before returning it",
        "Served through FastAPI and Docker",
      ],
      github: "https://github.com/sumit966/multi-agent-research",
    },

    "llm-lora-finetuning": {
      title: "Domain-Specific LLM Fine-Tuning with LoRA",
      faIcon: "fa-sliders-h",
      category: "genai",
      prototype: "lora-layers",
      year: "2025",
      tech: "Python, Hugging Face, PEFT, PyTorch",
      desc: "Fine-tuned open-source LLM with LoRA on a domain Q&A dataset and compared against base model.",
      bullets: [
        "Fine-tuned an open-source LLM with LoRA on a domain question-answer dataset",
        "Compared fine-tuned model with base model on a fixed evaluation set",
        "Published training code, results and model card on GitHub",
      ],
      github: "https://github.com/sumit966/llm-lora-finetuning",
    },

    "ecommerce-analytics": {
      title: "E-commerce Sales & Customer Analytics Dashboard",
      faIcon: "fa-chart-line",
      category: "data",
      prototype: "dashboard-charts",
      year: "2024",
      tech: "SQL, PostgreSQL, Python, Pandas, Power BI",
      desc: "Interactive dashboard with RFM segmentation, cohort retention, and business KPIs.",
      bullets: [
        "Cleaned and modeled retail transactions dataset with SQL and Pandas into one analysis-ready table",
        "Segmented customers with RFM analysis",
        "Tracked cohort retention and monthly revenue trends",
        "Built interactive Power BI dashboard with KPIs (revenue, AOV, repeat purchase rate) and business insights",
      ],
      github: "https://github.com/sumit966/ecommerce-analytics",
    },

    "customer-churn-analysis": {
      title: "Customer Churn Analysis and Prediction",
      faIcon: "fa-user-slash",
      category: "data",
      prototype: "churn-funnel",
      year: "2024",
      tech: "Python, SQL, Pandas, Scikit-learn, Matplotlib, Power BI",
      desc: "Logistic regression churn model + Power BI retention dashboard ranking churn drivers.",
      bullets: [
        "Analyzed telecom churn dataset with SQL and Python to find churn factors",
        "Trained a logistic regression model",
        "Ranked churn drivers with feature importance",
        "Presented findings and retention recommendations in a Power BI dashboard",
      ],
      github: "https://github.com/sumit966/customer-churn-analysis",
    },

    "ai-document-chat": {
      title: "AI Document Chat Web App",
      faIcon: "fa-comment-dots",
      category: "full-stack",
      prototype: "chat-window",
      year: "2024",
      tech: "React.js, Node.js, FastAPI, PostgreSQL, JWT, Docker",
      desc: "Full-stack app where users upload PDFs and chat with their documents through a RAG backend.",
      bullets: [
        "Full-stack app with JWT login where users upload PDFs and chat with documents through a RAG backend",
        "Developed React frontend with chat history and REST APIs backed by PostgreSQL",
        "Containerized with Docker and deployed to GCP Cloud Run through GitHub Actions CI/CD",
      ],
      github: "https://github.com/sumit966/ai-document-chat",
    },

    "collab-task-board": {
      title: "Real-Time Collaborative Task Board",
      faIcon: "fa-tasks",
      category: "full-stack",
      prototype: "kanban-board",
      year: "2024",
      tech: "React.js, Node.js, MongoDB, WebSockets, Docker",
      desc: "Kanban-style task board with live updates over WebSockets, JWT auth, and role-based access.",
      bullets: [
        "Built a Kanban-style task board where team members create, assign and move tasks with live updates over WebSockets",
        "Developed Node.js REST APIs with MongoDB storage, JWT authentication and role-based access",
        "Set up GitHub Actions CI and Docker deployment",
      ],
      github: "https://github.com/sumit966/collab-task-board",
    },

    "url-shortener-service": {
      title: "Scalable URL Shortener Service",
      faIcon: "fa-link",
      category: "backend",
      prototype: "redirect-flow",
      year: "2024",
      tech: "Python, FastAPI, PostgreSQL, Redis, Docker",
      desc: "REST API that creates and resolves short links with Redis caching and rate limiting.",
      bullets: [
        "Built REST API that creates and resolves short links with PostgreSQL storage and Redis caching for fast redirects",
        "Added rate limiting, input validation and typed unit tests",
        "Containerized with Docker and set up GitHub Actions CI/CD",
      ],
      github: "https://github.com/sumit966/url-shortener-service",
    },

    "background-job-queue": {
      title: "Background Job Queue and Task Scheduler Service",
      faIcon: "fa-clock",
      category: "backend",
      prototype: "job-queue",
      year: "2024",
      tech: "Python, FastAPI, PostgreSQL, Docker",
      desc: "Background job queue with retries, priorities and status tracking exposed through REST APIs.",
      bullets: [
        "Designed a background job queue with retries, priorities and status tracking",
        "Exposed through REST APIs",
        "Applied object-oriented design and unit tests",
        "Containerized the service with Docker",
      ],
      github: "https://github.com/sumit966/background-job-queue",
    },
  },

  // ============================================================
  // PROTOTYPE ANIMATION TYPES (used by prototypes.js in Step 3)
  // ============================================================
  prototypes: {
    "dashboard-charts":    "Animated bar + line chart (Power BI style)",
    "churn-funnel":        "Funnel chart with drop-off segments",
    "chat-window":         "Chat UI with typing dots + streaming answer",
    "kanban-board":        "Cards sliding between 3 columns",
    "redirect-flow":       "Terminal typing curl → arrow → redirect",
    "job-queue":           "Job nodes flowing through queue pipeline",
    "training-loss":       "Loss curve drawing live + best model saved",
    "embedding-search":    "Vector dots with nearest-neighbor lines",
    "rag-pipeline":        "Document → chunk → embed → retrieve → answer flow",
    "log-stream":          "Scrolling log lines → threat summary",
    "agent-flow":          "4 agent nodes with data flowing between them",
    "lora-layers":         "Frozen base model + trainable LoRA adapters highlighting",
    "bounding-box":        "Moving bounding box + face mesh on image",
    "mri-scan":            "MRI slice rotating + tumor region highlighted",
    "network-graph":       "Nodes connecting to C&C server + threat alert",
  },

  // ============================================================
  // CERTIFICATIONS (from all 5 resumes)
  // ============================================================
  certifications: [
    { name: "Google Cloud: Cloud Fundamentals", icon: "fab fa-google" },
    { name: "Google Cloud: Cloud Security", icon: "fas fa-lock" },
    { name: "Microsoft: Threat Modeling", icon: "fab fa-microsoft" },
    { name: "HackerRank: 5-Star Java (Gold)", icon: "fas fa-code" },
    { name: "HackerRank: 4-Star C++", icon: "fas fa-code" },
    { name: "HackerRank: 3-Star Algorithms", icon: "fas fa-code" },
    { name: "Microsoft Power BI Data Analyst (PL-300)", icon: "fas fa-chart-line" },
    { name: "DeepLearning.AI: Generative AI with LLMs (in progress)", icon: "fas fa-brain" },
    { name: "Coursera: Deep Learning Specialization (in progress)", icon: "fas fa-graduation-cap" },
    { name: "Docker Mastery, Udemy (in progress)", icon: "fab fa-docker" },
  ],

  themes: {
    blue:   { primary: "#3b82f6", secondary: "#2563eb", accent: "#60a5fa" },
    cyan:   { primary: "#06b6d4", secondary: "#0891b2", accent: "#22d3ee" },
    purple: { primary: "#8b5cf6", secondary: "#7c3aed", accent: "#a78bfa" },
    green:  { primary: "#10b981", secondary: "#059669", accent: "#34d399" },
    orange: { primary: "#f97316", secondary: "#ea580c", accent: "#fb923c" },
    pink:   { primary: "#ec4899", secondary: "#db2777", accent: "#f472b6" },
    red:    { primary: "#ef4444", secondary: "#dc2626", accent: "#f87171" },
  },
};
