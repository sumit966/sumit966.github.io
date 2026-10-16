export const SITE = {
  name: "Sumit Raj",
  tagline: "Engineering intelligence. Building useful products.",
  intro:
    "I design and ship systems across machine learning, generative AI, data, and full-stack software — with an emphasis on clear architecture, measurable evaluation, and interfaces people can actually use.",
  location: "Patna, India",
  email: "info.sr0909@gmail.com",
  phone: "+91 9472441137",
  whatsapp: "https://wa.me/919472441137",
  github: "https://github.com/sumit966",
  linkedin: "https://www.linkedin.com/in/er-sumit-raj-/",
  portfolio: "https://sumit966-github-io.vercel.app",
  githubPages: "https://sumit966.github.io",
} as const;

export const EDUCATION = [
  {
    id: "mtech",
    title: "M.Tech, Applied AI and Machine Learning",
    org: "VNIT Nagpur",
    period: "2024 — May 2026",
    detail: "CGPA 6.53/10",
    kind: "education" as const,
  },
  {
    id: "be",
    title: "B.E., Computer Science",
    org: "Dr. D.Y. Patil Institute of Technology, Pune",
    period: "2019 — 2023",
    detail: "CGPA 7.89/10",
    kind: "education" as const,
  },
];

export const EXPERIENCE = [
  {
    id: "salesforce",
    title: "Software Engineer Intern",
    org: "Salesforce (Remote)",
    period: "Feb 2022 — May 2022",
    points: [
      "Built Python bulk data-processing pipelines",
      "Integrated Salesforce APIs into backend workflows",
      "Wrote SQL queries with joins and aggregations for CRM analysis",
      "Built Power BI dashboards for stakeholders",
    ],
    tech: ["Python", "Java", "SQL", "Salesforce APIs", "Power BI"],
    kind: "experience" as const,
  },
];

/** Publication stated on the android-botnet-detection repository. */
export const PUBLICATIONS = [
  {
    id: "ijraset-2023",
    title: "Android botnet detection research (SVM, 342 static app features)",
    org: "IJRASET 2023",
    period: "2023",
    detail: "DOI: 10.22214/ijraset.2023.49506 — as listed on github.com/sumit966/-android-botnet-detection",
    kind: "research" as const,
  },
];

export const CERTIFICATIONS = [
  "Google Cloud: Cloud Fundamentals",
  "Google Cloud: Cloud Security",
  "Microsoft: Threat Modeling",
  "HackerRank: 5-Star Java (Gold)",
  "HackerRank: 4-Star C++",
  "HackerRank: 3-Star Algorithms",
  "Microsoft Power BI Data Analyst (PL-300)",
  "DeepLearning.AI: Generative AI with LLMs (in progress)",
  "Coursera: Deep Learning Specialization (in progress)",
  "Docker Mastery, Udemy (in progress)",
];

export const JOURNEY = [
  ...EDUCATION,
  ...EXPERIENCE,
  ...PUBLICATIONS,
];
