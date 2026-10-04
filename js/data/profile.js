// ========================================
// PROFILE DATA - Source of Truth
// ========================================
const PROFILE_DATA = {
  name: "Sumit Raj",
  title: "AI/ML & Generative AI Engineer",
  tagline: "Building intelligent systems with LLMs, computer vision, and MLOps",
  location: "Patna, India",
  phone: "+91 9472441137",
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
    'ai-ml': {
      title: "AI/ML Engineer",
      faIcon: "fa-robot",
      summary: "Deep learning, computer vision, and NLP systems.",
      skills: ["Python", "PyTorch", "TensorFlow", "Keras", "Scikit-learn", "CNN", "RNN", "LSTM", "Vision Transformers", "Transfer Learning", "OpenCV", "YOLOv8", "Object Detection", "Image Classification", "Face Detection", "Haar Cascade", "ONNX", "Grad-CAM", "NumPy", "Pandas", "Matplotlib", "Seaborn", "Git", "Docker"],
      projects: [1, 6, 7, 5],
      resume: "Sumit_Raj_AI_ML_Engineer1.pdf"
    },
    'genai': {
      title: "Generative AI Engineer",
      faIcon: "fa-brain",
      summary: "LLM-powered apps with RAG, agents, and prompt engineering.",
      skills: ["Python", "SQL", "LLMs", "RAG", "LangChain", "LangGraph", "Prompt Engineering", "OpenAI API", "Hugging Face", "Transformers", "LoRA Fine-tuning", "Embeddings", "ChromaDB", "FAISS", "Sentence Transformers", "Hybrid Search", "PyTorch", "TensorFlow", "FastAPI", "Docker", "Git", "GitHub Actions"],
      projects: [1, 2, 6],
      resume: "Sumit_GenAI_Engineer.pdf"
    },
    'data-engineer': {
      title: "Data Engineer",
      faIcon: "fa-database",
      summary: "Scalable data pipelines, ETL workflows, and cloud infrastructure.",
      skills: ["Python", "SQL", "Bash", "ETL", "Data Pipelines", "Pandas", "NumPy", "MySQL", "PostgreSQL", "MongoDB", "SQLite", "GCP", "Docker", "GitHub Actions", "Terraform", "Kubernetes", "Linux", "Git"],
      projects: [3, 4, 2],
      resume: "Sumit_Raj_Data_Engineer_new.pdf"
    },
    'data-analyst': {
      title: "Data Analyst",
      faIcon: "fa-chart-bar",
      summary: "Transforming data into insights with SQL, Python, and BI tools.",
      skills: ["SQL", "Python", "Pandas", "NumPy", "EDA", "Statistics", "Probability", "Power BI", "Matplotlib", "Seaborn", "MySQL", "PostgreSQL", "SQLite", "R", "Excel"],
      projects: [2, 7, 6, 5],
      resume: "Sumit__Data_Analyst.pdf"
    },
    'fullstack': {
      title: "Full Stack Developer",
      faIcon: "fa-laptop-code",
      summary: "End-to-end web apps with React, Node.js, and FastAPI.",
      skills: ["React.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Node.js", "FastAPI", "REST APIs", "Python", "Java", "SQL", "MySQL", "PostgreSQL", "MongoDB", "Git", "GitHub", "Docker", "GitHub Actions"],
      projects: [1, 3, 5, 7],
      resume: "Sumit_Raj_Full_Stack.pdf"
    },
    'software-engineer': {
      title: "Software Engineer",
      faIcon: "fa-cogs",
      summary: "Clean, scalable software with strong DSA and OOP foundations.",
      skills: ["Java", "Python", "JavaScript", "C++", "SQL", "REST APIs", "FastAPI", "Node.js", "OOP", "Microservices", "MySQL", "PostgreSQL", "MongoDB", "SQLite", "Docker", "GitHub Actions", "Git", "Linux", "GCP", "DSA", "SDLC", "Problem Solving"],
      projects: [1, 3, 5, 6, 7],
      resume: "Sumit_Software_Engineer.pdf"
    },
    'mlops': {
      title: "MLOps/DevOps Engineer",
      faIcon: "fa-cloud",
      summary: "Deploying and automating ML/software on cloud infrastructure.",
      skills: ["GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "CI/CD", "MLflow", "Linux", "Bash", "Git", "Python", "FastAPI", "Cloud Run", "Compute Engine", "IAM"],
      projects: [3, 4, 1, 5],
      resume: "Sumit_MLOps_DevOps.pdf"
    },
    'backend': {
      title: "Backend Developer",
      faIcon: "fa-server",
      summary: "Secure, performant backend systems and REST APIs.",
      skills: ["Python", "Java", "Node.js", "FastAPI", "REST APIs", "MySQL", "PostgreSQL", "MongoDB", "SQLite", "SQL", "Docker", "GitHub Actions", "Git", "Linux", "GCP", "OOP", "System Design"],
      projects: [1, 3, 2, 7],
      resume: "Sumit_Raj_Backend_Developer.pdf"
    }
  },

  projects: {
    1: { title: "RAG-Based Clinical QA System", year: "2025", category: "genai", faIcon: "fa-brain", tech: "Python, LangChain, ChromaDB, FastAPI, Docker, GitHub Actions", desc: "RAG pipeline for clinical docs with 92% answer relevance.", overview: "Retrieval-Augmented Generation pipeline that answers clinical questions with high accuracy.", problem: "Clinical documents are vast and require quick, accurate answers with source attribution.", solution: "RAG with LangChain, ChromaDB, hybrid search (BM25 + dense), Reciprocal Rank Fusion.", architecture: "Documents to Chunking to Embeddings to ChromaDB to Hybrid Search to RRF to LLM to Answer", features: ["92% answer relevance on 100-question benchmark", "Hybrid search improved retrieval by 18%", "Sub-500ms inference latency", "FastAPI + Docker deployment", "GitHub Actions CI/CD"], results: "92% answer relevance with 18% retrieval improvement. Less than 500ms latency.", github: "https://github.com/sumit966" },
    2: { title: "LLM-Powered Security Log Analyzer", year: "2025", category: "genai", faIcon: "fa-search", tech: "Python, LangGraph, OpenAI API", desc: "LangGraph agent analyzing 50K+ logs with natural-language summaries.", overview: "Agentic AI system that analyzes security logs and generates threat summaries.", problem: "Security teams manually review thousands of logs, missing critical threats.", solution: "LangGraph agent workflow with OpenAI API and self-reflection loop.", architecture: "Logs to Preprocessing to LangGraph Agent to OpenAI to Self-Reflection to Summary", features: ["50K+ logs analyzed", "Less than 3% hallucination rate", "200 test cases validated", "Real-time alerts", "70% less manual review"], results: "70% reduction in manual log review. Under 3% hallucination.", github: "https://github.com/sumit966" },
    3: { title: "CI/CD Pipeline with Docker & GCP", year: "2024", category: "devops", faIcon: "fa-cogs", tech: "GitHub Actions, Docker, GCP Compute Engine", desc: "Automated deployment pipeline reducing manual work by 70%.", overview: "End-to-end CI/CD for containerized Python app on GCP.", problem: "Manual deployments were slow, error-prone, not scalable.", solution: "GitHub Actions + Docker multi-stage builds + GCP deployment.", architecture: "Git Push to GitHub Actions to Build/Test to Docker to GCP Deploy", features: ["Automated build/test on push", "Multi-stage Docker builds", "Zero-downtime deployment", "70% faster deployments", "Rollback capability"], results: "70% reduction in deployment time.", github: "https://github.com/sumit966" },
    4: { title: "Terraform Infrastructure Automation", year: "2024", category: "devops", faIcon: "fa-cubes", tech: "Terraform, GCP", desc: "Infrastructure as Code for GCP with remote state.", overview: "Automated GCP provisioning with Terraform modules.", problem: "Manual cloud setup was slow and inconsistent.", solution: "Terraform for VPC, Compute Engine, Cloud SQL with remote state.", architecture: "Terraform Config to VPC + Compute + Cloud SQL to Remote State", features: ["VPC/subnet/firewall automation", "Compute Engine provisioning", "Cloud SQL setup", "Remote state with GCS", "VM startup scripts"], results: "Reproducible infrastructure with version control.", github: "https://github.com/sumit966" },
    5: { title: "Military Vehicle Detection & Face Auth", year: "Academic", category: "ai-ml", faIcon: "fa-shield-alt", tech: "Python, YOLOv8, OpenCV, Haar Cascade, Docker, GCP Cloud Run", desc: "Real-time surveillance with 95% face auth and YOLOv8 tracking.", overview: "Real-time military surveillance combining face auth + vehicle detection.", problem: "Military zones need automated threat detection and personnel auth.", solution: "Haar Cascade (95% accuracy) + YOLOv8 + GCP Cloud Run deployment.", architecture: "Camera to Haar Face Auth to YOLOv8 Detection to Email Alerts to GCP Cloud Run", features: ["95% face auth accuracy", "Real-time vehicle detection", "Automated email alerts", "Docker containerized", "GCP Cloud Run serverless", "Cloud Logging"], results: "95% face auth accuracy with real-time tracking.", github: "https://github.com/sumit966" },
    6: { title: "Brain Tumor Detection from MRI", year: "2024", category: "ai-ml", faIcon: "fa-microscope", tech: "Python, PyTorch, Vision Transformers, ONNX, Grad-CAM", desc: "94.2% accuracy Vision Transformer on 3,000+ MRI scans.", overview: "Deep learning for medical image classification with ViT.", problem: "Manual tumor detection is slow and error-prone.", solution: "Fine-tuned ViT with Grad-CAM visualization and ONNX optimization.", architecture: "MRI to Preprocessing to ViT to Classification to Grad-CAM to ONNX", features: ["94.2% accuracy, 0.91 F1", "3,000+ MRI scans", "Grad-CAM visualization", "60% smaller via ONNX", "Transfer learning from ViT"], results: "94.2% accuracy with 60% smaller model.", github: "https://github.com/sumit966" },
    7: { title: "Mobile Botnet Detection System", year: "2024", category: "ai-ml", faIcon: "fa-robot", tech: "Python, TensorFlow, Scikit-learn, SQL", desc: "96.5% precision model for Android botnet C&C detection.", overview: "ML system to detect malicious Android bot communications.", problem: "Android botnets communicate with C&C servers undetected.", solution: "200+ engineered features + deep neural network achieving 96.5% precision.", architecture: "Network Logs to Feature Engineering to DNN to Bot Classification to C&C Detection", features: ["96.5% precision", "200+ features", "DNN classifier", "C&C detection", "Android traffic analysis"], results: "96.5% precision in bot detection.", github: "https://github.com/sumit966" }
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
