// ========================================
// PROFILE DATA - Source of Truth
// ========================================
const PROFILE_DATA = {
  name: "Sumit Raj",
  title: "AI/ML & Generative AI Engineer",
  tagline: "Building intelligent systems with LLMs, computer vision, and MLOps",
  location: "Patna, India",
  phone: "+91 9472441137",
  whatsapp: "+91 9472441137",
  whatsappLink: "https://wa.me/919472441137",
  email: "info.sr0909@gmail.com",
  linkedin: "https://www.linkedin.com/in/er-sumit-raj-/",
  github: "https://github.com/sumit966",
  portfolio: "https://sumit966-github-io.vercel.app",

  education: [
    { degree: "M.Tech Applied AI & Machine Learning", institution: "VNIT Nagpur", year: "2024 - May 2026", cgpa: "6.53/10", courses: ["Deep Learning", "Computer Vision", "NLP", "Generative AI"] },
    { degree: "B.E. Computer Science", institution: "Dr. D.Y. Patil Institute of Technology, Pune", year: "2019 - 2023", cgpa: "7.89/10", courses: ["Cloud Computing", "DevOps", "Data Science", "DSA"] }
  ],

  experience: [
    {
      role: "Software Engineer Intern",
      company: "Salesforce (Remote)",
      duration: "Feb 2022 - May 2022",
      points: [
        "Built Python bulk data-processing pipelines, cutting manual data handling by ~40%",
        "Managed data pipelines and optimized database performance for bulk operations",
        "Integrated Salesforce APIs into optimized backend workflows, improving efficiency by ~25%",
        "Wrote SQL queries with joins and aggregations for CRM data analysis",
        "Designed secure data-management modules using OOP principles"
      ],
      tech: ["Python", "SQL", "Salesforce", "REST APIs"]
    }
  ],

  roles: {
    'ai-ml': { title: "AI/ML Engineer", faIcon: "fa-robot", summary: "Deep learning, computer vision, and NLP systems.", skills: ["Python", "PyTorch", "TensorFlow", "Keras", "Scikit-learn", "CNN", "RNN", "LSTM", "Vision Transformers", "Transfer Learning", "OpenCV", "YOLOv8", "Object Detection", "Image Classification", "Face Detection", "Haar Cascade", "LBPH", "ONNX", "Grad-CAM", "NumPy", "Pandas", "Matplotlib", "Seaborn", "Git", "Docker"], projects: [1, 4, 5, 3], resume: "Sumit_Raj_AI_ML_Engineer1.pdf" },
    'genai': { title: "Generative AI Engineer", faIcon: "fa-brain", summary: "LLM-powered apps with RAG, agents, and prompt engineering.", skills: ["Python", "SQL", "LLMs", "RAG", "LangChain", "LangGraph", "Prompt Engineering", "OpenAI API", "Hugging Face", "Transformers", "LoRA Fine-tuning", "Embeddings", "ChromaDB", "FAISS", "Sentence Transformers", "Hybrid Search", "BM25", "Reciprocal Rank Fusion", "PyTorch", "TensorFlow", "FastAPI", "Docker", "Git", "GitHub Actions"], projects: [1, 2, 3], resume: "Sumit_GenAI_Engineer.pdf" },
    'data-engineer': { title: "Data Engineer", faIcon: "fa-database", summary: "Scalable data pipelines, ETL workflows, and cloud infrastructure.", skills: ["Python", "SQL", "Bash", "ETL", "Data Pipelines", "Pandas", "NumPy", "MySQL", "PostgreSQL", "MongoDB", "SQLite", "GCP", "Docker", "GitHub Actions", "Terraform", "Kubernetes", "Linux", "Git"], projects: [6, 7, 2], resume: "Sumit_Raj_Data_Engineer_new.pdf" },
    'data-analyst': { title: "Data Analyst", faIcon: "fa-chart-bar", summary: "Transforming data into insights with SQL, Python, and BI tools.", skills: ["SQL", "Python", "Pandas", "NumPy", "EDA", "Statistics", "Probability", "Power BI", "Matplotlib", "Seaborn", "MySQL", "PostgreSQL", "SQLite", "R", "Excel"], projects: [2, 5, 4, 3], resume: "Sumit__Data_Analyst.pdf" },
    'fullstack': { title: "Full Stack Developer", faIcon: "fa-laptop-code", summary: "End-to-end web apps with React, Node.js, and FastAPI.", skills: ["React.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Node.js", "FastAPI", "REST APIs", "Python", "Java", "SQL", "MySQL", "PostgreSQL", "MongoDB", "Git", "GitHub", "Docker", "GitHub Actions"], projects: [1, 6, 3, 8], resume: "Sumit_Raj_Full_Stack.pdf" },
    'software-engineer': { title: "Software Engineer", faIcon: "fa-cogs", summary: "Clean, scalable software with strong DSA and OOP foundations.", skills: ["Java", "Python", "JavaScript", "C++", "SQL", "REST APIs", "FastAPI", "Node.js", "OOP", "Microservices", "MySQL", "PostgreSQL", "MongoDB", "SQLite", "Docker", "GitHub Actions", "Git", "Linux", "GCP", "DSA", "SDLC", "Problem Solving"], projects: [1, 6, 3, 4, 5], resume: "Sumit_Software_Engineer.pdf" },
    'mlops': { title: "MLOps/DevOps Engineer", faIcon: "fa-cloud", summary: "Deploying and automating ML/software on cloud infrastructure.", skills: ["GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "CI/CD", "MLflow", "Linux", "Bash", "Git", "Python", "FastAPI", "Cloud Run", "Compute Engine", "IAM"], projects: [6, 7, 1, 3], resume: "Sumit_MLOps_DevOps.pdf" },
    'backend': { title: "Backend Developer", faIcon: "fa-server", summary: "Secure, performant backend systems and REST APIs.", skills: ["Python", "Java", "Node.js", "FastAPI", "REST APIs", "MySQL", "PostgreSQL", "MongoDB", "SQLite", "SQL", "Docker", "GitHub Actions", "Git", "Linux", "GCP", "OOP", "System Design"], projects: [1, 6, 2, 3], resume: "Sumit_Raj_Backend_Developer.pdf" }
  },

  projects: {
    1: {
      title: "RAG-Based Clinical Question Answering System",
      year: "2025",
      category: "genai",
      faIcon: "fa-brain",
      tech: "Python, LangChain, ChromaDB, FastAPI, Docker, GitHub Actions",
      desc: "RAG pipeline for clinical docs with 92% answer relevance using hybrid search.",
      readme: "RAG-based clinical question answering system with hybrid search (BM25 + dense embeddings) achieving 92% answer relevance.",
      overview: "A Retrieval-Augmented Generation (RAG) system that answers clinical questions from medical documents with high accuracy, using hybrid search (BM25 + dense embeddings) and Reciprocal Rank Fusion (RRF) for superior retrieval.",
      problem: "Clinical documents are vast and require quick, accurate answers with source attribution. Traditional keyword search misses semantic context, while pure vector search misses exact term matching.",
      solution: "Implemented RAG using LangChain + ChromaDB for vector storage, hybrid search combining BM25 (lexical) with dense embeddings (semantic), and Reciprocal Rank Fusion for optimal ranking. Deployed as a FastAPI service with Docker and CI/CD.",
      architecture: "Documents -> Chunking -> Sentence Transformer Embeddings -> ChromaDB + BM25 Index -> Hybrid Retrieval (RRF) -> LLM (OpenAI) -> Answer + Sources",
      features: [
        "92% answer relevance on 100-question benchmark",
        "Hybrid search (BM25 + dense) improved retrieval accuracy by 18%",
        "Reciprocal Rank Fusion (RRF) for optimal ranking",
        "Sub-500ms inference latency",
        "FastAPI REST API with automatic OpenAPI docs",
        "Dockerized deployment + GitHub Actions CI/CD",
        "MIT Licensed open source"
      ],
      results: "Achieved 92% answer relevance with 18% retrieval improvement over baseline. Deployed at under 500ms latency with full CI/CD automation.",
      github: "https://github.com/sumit966/rag-clinical-qa",
      language: "Python",
      license: "MIT"
    },
    2: {
      title: "LLM-Powered Security Log Analyzer",
      year: "2025",
      category: "genai",
      faIcon: "fa-search",
      tech: "Python, LangGraph, OpenAI API, FastAPI",
      desc: "LangGraph agent analyzing 50K+ security logs with hallucination under 3%.",
      readme: "LLM-powered security log analyzer using LangGraph agents and OpenAI API with self-reflection (hallucination < 3%).",
      overview: "An agentic AI system that analyzes security logs in real-time and generates natural-language threat summaries. Built with LangGraph for agent orchestration and OpenAI API for generation, with a self-reflection evaluation loop to keep hallucination under 3%.",
      problem: "Security teams manually review thousands of logs daily, missing critical threats due to volume and fatigue. Existing rules-based systems generate too many false positives.",
      solution: "Built a LangGraph agent workflow that preprocesses logs, generates threat summaries via OpenAI API, then runs a self-reflection evaluation loop that validates and refines the output to reduce hallucination.",
      architecture: "Raw Logs -> Preprocessing & Filtering -> LangGraph Agent (Tools + Memory) -> OpenAI GPT -> Self-Reflection Loop -> Validated Threat Summary + Dashboard",
      features: [
        "Analyzed 50,000+ security logs end-to-end",
        "Self-reflection loop keeps hallucination under 3%",
        "Validated against 200 curated test cases",
        "Real-time alerts with severity scoring",
        "Reduced manual log review time by 70%",
        "MIT Licensed open source"
      ],
      results: "70% reduction in manual log review time. Under 3% hallucination rate verified on 200 curated test cases.",
      github: "https://github.com/sumit966/llm-security-analyzer",
      language: "Python",
      license: "MIT"
    },
    3: {
      title: "Brain Tumor Detection from MRI Scans",
      year: "2024",
      category: "ai-ml",
      faIcon: "fa-microscope",
      tech: "Python, TensorFlow, Keras, CNN, Jupyter",
      desc: "CNN-based brain tumor classification with 93.18% accuracy on 4 tumor types.",
      readme: "CNN-based brain tumor classification from MRI scans achieving 93.18% accuracy on 4 tumor types using TensorFlow/Keras.",
      overview: "Deep learning model that classifies MRI brain scans into 4 tumor types (glioma, meningioma, pituitary, no tumor) with 93.18% accuracy using a custom CNN architecture.",
      problem: "Manual tumor detection from MRI scans is time-consuming and prone to human error. Radiologists need a reliable second opinion tool for faster triage.",
      solution: "Built a CNN with multiple convolutional + pooling layers, trained on a large MRI dataset (3,000+ images), and evaluated against a held-out test set. Used data augmentation to improve generalization.",
      architecture: "MRI Scans -> Preprocessing (Resize, Normalize) -> Data Augmentation -> CNN (Conv2D + MaxPool + Dropout) -> Dense Layers -> Softmax (4 classes) -> Prediction + Confidence",
      features: [
        "93.18% classification accuracy",
        "4 tumor types classified: Glioma, Meningioma, Pituitary, No Tumor",
        "3,000+ MRI scans trained",
        "Data augmentation for robustness",
        "Built with TensorFlow / Keras",
        "Jupyter Notebook for reproducible experiments"
      ],
      results: "93.18% accuracy on test set across 4 tumor classes.",
      github: "https://github.com/sumit966/brain-tumor-detection",
      language: "Jupyter Notebook",
      license: "Open"
    },
    4: {
      title: "Military Vehicle Detection & Face Authentication",
      year: "Academic",
      category: "ai-ml",
      faIcon: "fa-shield-alt",
      tech: "Python, YOLOv8, OpenCV, Haar Cascade, LBPH, Docker, GCP Cloud Run",
      desc: "Real-time military surveillance with YOLOv8 vehicle detection + face auth.",
      readme: "AI-powered military surveillance system using YOLOv8 for vehicle detection and Haar Cascade + LBPH for face authentication.",
      overview: "A real-time military surveillance system combining YOLOv8 for military vehicle detection and tracking with Haar Cascade + LBPH for personnel face authentication. Deployed on GCP Cloud Run with email alerting.",
      problem: "Military zones need automated, real-time threat detection with personnel authentication to prevent unauthorized access while maintaining 24/7 situational awareness.",
      solution: "Integrated YOLOv8 for real-time vehicle detection, Haar Cascade + LBPH for face authentication (95% accuracy), and an automated email alert system with images and timestamps. Containerized with Docker and deployed to GCP Cloud Run.",
      architecture: "Camera Feed -> Frame Extraction -> YOLOv8 Vehicle Detection + Haar Cascade Face Detection -> LBPH Recognition -> Alert Engine -> Email + Cloud Logging",
      features: [
        "95% face authentication accuracy (Haar Cascade + LBPH)",
        "Real-time military vehicle detection and tracking (YOLOv8)",
        "Automated email alerts with images and timestamps",
        "Docker containerized for portability",
        "GCP Cloud Run serverless deployment",
        "Cloud Logging for monitoring and audit trails"
      ],
      results: "Deployed real-time surveillance system with 95% face auth accuracy and automated alerting.",
      github: "https://github.com/sumit966/military-vehicle-detection",
      language: "Python",
      license: "Open"
    },
    5: {
      title: "Android Botnet Detection System",
      year: "2023",
      category: "ai-ml",
      faIcon: "fa-robot",
      tech: "Python, Scikit-learn, SVM, SQLite, Machine Learning",
      desc: "SVM classifier on 342 static app features. Published in IJRASET 2023.",
      readme: "Android botnet detection using SVM on 342 static app features. Published in IJRASET 2023 (DOI: 10.22214/ijraset.2023.49506).",
      overview: "Machine learning system that detects Android botnets by analyzing 342 static features extracted from APK files. Achieved 96.5% precision using an SVM classifier. Research work published in IJRASET 2023.",
      problem: "Android botnets communicate with Command & Control (C&C) servers to perform malicious activities. Traditional signature-based detection fails against new/obfuscated variants.",
      solution: "Extracted 342 static features (permissions, API calls, intents, etc.) from Android APKs, trained an SVM classifier with feature selection, and validated against real botnet samples.",
      architecture: "APK Files -> Feature Extraction (342 static features) -> Feature Selection -> SVM Classifier -> Bot/Benign Classification -> C&C Detection Alert",
      features: [
        "96.5% precision on botnet classification",
        "342 static features extracted from APKs",
        "SVM classifier with feature selection",
        "Detects C&C server communication patterns",
        "Published research in IJRASET 2023",
        "DOI: 10.22214/ijraset.2023.49506"
      ],
      results: "96.5% precision in detecting malicious Android botnet communications. Published in IJRASET 2023.",
      github: "https://github.com/sumit966/-android-botnet-detection",
      language: "Python",
      license: "Open",
      publication: "IJRASET 2023 (DOI: 10.22214/ijraset.2023.49506)"
    },
    6: {
      title: "CI/CD Pipeline with Docker & GCP",
      year: "2024",
      category: "devops",
      faIcon: "fa-cogs",
      tech: "GitHub Actions, Docker, GCP Compute Engine, Bash",
      desc: "Production CI/CD pipeline reducing deployments by 70%.",
      readme: "Production CI/CD pipeline with Docker, GitHub Actions, and GCP Compute Engine — 70% faster deployments.",
      overview: "A production-grade CI/CD pipeline that builds, tests, and deploys containerized Python applications to GCP Compute Engine using GitHub Actions.",
      problem: "Manual deployments were slow, error-prone, and not reproducible. Every release required extensive manual steps that risked downtime.",
      solution: "Built a GitHub Actions workflow that runs tests, builds a multi-stage Docker image, pushes to registry, and deploys to GCP Compute Engine with rolling updates and rollback support.",
      architecture: "Git Push -> GitHub Actions Trigger -> Install Deps -> Run Tests -> Build Docker Image -> Push to Registry -> SSH to GCP VM -> Pull & Restart Container -> Health Check",
      features: [
        "Automated build + test on every push",
        "Multi-stage Docker builds for smaller images",
        "Zero-downtime rolling deployment",
        "70% reduction in manual deployment time",
        "Automatic rollback on health check failure",
        "MIT Licensed"
      ],
      results: "Reduced deployment time by 70% with zero manual steps.",
      github: "https://github.com/sumit966/cicd-pipeline-gcp",
      language: "Python / YAML",
      license: "MIT"
    },
    7: {
      title: "Terraform GCP Infrastructure Automation",
      year: "2024",
      category: "devops",
      faIcon: "fa-cubes",
      tech: "Terraform, GCP, HCL, Cloud SQL",
      desc: "Infrastructure as Code for GCP with VPC, Compute, and Cloud SQL.",
      readme: "Terraform infrastructure automation for GCP - VPC, Compute Engine, Cloud SQL with remote state management.",
      overview: "Automated provisioning of GCP infrastructure using Terraform modules for VPC networking, Compute Engine VMs, and Cloud SQL databases, with remote state in GCS.",
      problem: "Manual cloud infrastructure setup was slow, inconsistent across environments, and hard to version control.",
      solution: "Wrote reusable Terraform modules for VPC, Compute Engine, and Cloud SQL. Used GCS remote backend for state, IAM for access control, and VM startup scripts for automated configuration.",
      architecture: "Terraform Config -> Terraform Plan -> Apply to GCP -> VPC + Subnets + Firewall -> Compute Engine VM -> Cloud SQL -> Remote State in GCS Bucket",
      features: [
        "Modular VPC, subnet, and firewall automation",
        "Compute Engine VM provisioning with startup scripts",
        "Cloud SQL database setup",
        "Remote state management with GCS backend",
        "Environment-specific variables (dev/staging/prod)",
        "IAM + service account configuration"
      ],
      results: "Fully reproducible GCP infrastructure with version control and team collaboration.",
      github: "https://github.com/sumit966/terraform-gcp-infrastructure",
      language: "HCL / Terraform",
      license: "Open"
    },
    8: {
      title: "Fintech AI Portal",
      year: "2024",
      category: "fullstack",
      faIcon: "fa-chart-line",
      tech: "JavaScript, React, Node.js, Fintech, AI",
      desc: "Full-stack fintech portal with AI-powered insights.",
      readme: "Full-stack fintech AI portal built with JavaScript / React and Node.js.",
      overview: "A full-stack fintech web application that provides AI-powered insights for financial data analysis.",
      problem: "Small businesses need affordable, modern tools for understanding their financial data quickly.",
      solution: "Built a JavaScript-based full-stack portal with React frontend and Node.js backend, integrating AI models for insights.",
      architecture: "React Frontend -> REST API (Node.js) -> Business Logic -> Database -> AI Insights Module",
      features: [
        "Full-stack JavaScript (React + Node.js)",
        "Modern responsive UI",
        "REST API integration",
        "AI-powered insights module",
        "Fintech-focused design"
      ],
      results: "Delivered full-stack fintech portal with AI integration.",
      github: "https://github.com/sumit966/fintech-ai-portal",
      language: "JavaScript",
      license: "Open"
    }
  },

  resumes: [
    { id: "ai-ml", title: "AI/ML Engineer", faIcon: "fa-robot", file: "Sumit_Raj_AI_ML_Engineer1.pdf", tags: ["PyTorch", "TensorFlow", "CV", "ViT"] },
    { id: "genai", title: "Generative AI Engineer", faIcon: "fa-brain", file: "Sumit_GenAI_Engineer.pdf", tags: ["LLMs", "RAG", "LangChain"] },
    { id: "data-engineer", title: "Data Engineer", faIcon: "fa-database", file: "Sumit_Raj_Data_Engineer_new.pdf", tags: ["ETL", "SQL", "GCP"] },
    { id: "data-analyst", title: "Data Analyst", faIcon: "fa-chart-bar", file: "Sumit__Data_Analyst.pdf", tags: ["Power BI", "SQL", "Pandas"] },
    { id: "fullstack", title: "Full Stack Developer", faIcon: "fa-laptop-code", file: "Sumit_Raj_Full_Stack.pdf", tags: ["React", "Node.js", "FastAPI"] },
    { id: "software-engineer", title: "Software Engineer", faIcon: "fa-cogs", file: "Sumit_Software_Engineer.pdf", tags: ["Java", "Python", "DSA"] },
    { id: "mlops", title: "MLOps/DevOps", faIcon: "fa-cloud", file: "Sumit_MLOps_DevOps.pdf", tags: ["GCP", "Docker", "Terraform"] },
    { id: "backend", title: "Backend Developer", faIcon: "fa-server", file: "Sumit_Raj_Backend_Developer.pdf", tags: ["FastAPI", "Node.js", "SQL"] }
  ],

  certifications: [
    { name: "Google Cloud: Cloud Fundamentals", icon: "fab fa-google" },
    { name: "Google Cloud: Cloud Security", icon: "fas fa-lock" },
    { name: "HackerRank: 5-Star Java", icon: "fas fa-code" },
    { name: "HackerRank: 4-Star C++", icon: "fas fa-code" },
    { name: "HackerRank: 3-Star Algorithms", icon: "fas fa-code" },
    { name: "Power BI Data Analyst (PL-300)", icon: "fas fa-chart-line" },
    { name: "Gen AI with LLMs (in progress)", icon: "fas fa-brain" },
    { name: "Deep Learning Specialization (in progress)", icon: "fas fa-graduation-cap" }
  ]
};

const THEMES = {
  blue:   { primary: "#3b82f6", secondary: "#2563eb", accent: "#60a5fa" },
  cyan:   { primary: "#06b6d4", secondary: "#0891b2", accent: "#22d3ee" },
  purple: { primary: "#8b5cf6", secondary: "#7c3aed", accent: "#a78bfa" },
  green:  { primary: "#10b981", secondary: "#059669", accent: "#34d399" },
  orange: { primary: "#f97316", secondary: "#ea580c", accent: "#fb923c" },
  pink:   { primary: "#ec4899", secondary: "#db2777", accent: "#f472b6" },
  red:    { primary: "#ef4444", secondary: "#dc2626", accent: "#f87171" }
};
