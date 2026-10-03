// ========================================
// STATE
// ========================================
let currentRole = 'ai-ml';
let currentFilter = 'all';

// ========================================
// CINEMATIC INTRO
// ========================================
let currentScene = 0;
const totalScenes = 5;
let introInterval;
const introOverlay = document.getElementById('introOverlay');
const scenes = document.querySelectorAll('.intro-scene');
const dots = document.querySelectorAll('.intro-dot');
const skipBtn = document.querySelector('.intro-skip-btn');
const enterBtn = document.querySelector('.intro-enter-btn');

function goToScene(index) {
  scenes.forEach((s, i) => s.classList.toggle('active', i === index));
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
  currentScene = index;
}

function nextScene() {
  if (currentScene < totalScenes - 1) {
    goToScene(currentScene + 1);
  } else {
    clearInterval(introInterval);
  }
}

setTimeout(() => { introInterval = setInterval(nextScene, 3500); }, 1000);

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    clearInterval(introInterval);
    goToScene(index);
    introInterval = setInterval(nextScene, 3500);
  });
});

skipBtn.addEventListener('click', () => {
  clearInterval(introInterval);
  goToScene(totalScenes - 1);
  setTimeout(enterPortfolio, 800);
});

enterBtn.addEventListener('click', enterPortfolio);

function enterPortfolio() {
  clearInterval(introInterval);
  introOverlay.classList.add('hidden');
  document.getElementById('mainContent').style.display = 'block';
  initMainContent();
}

// ========================================
// INTRO NEURAL NETWORK
// ========================================
let neuralScene, neuralCamera, neuralRenderer;
let neuralNodes = [], neuralEdges = [];

function initIntroNeural() {
  const canvas = document.getElementById('introNeuralCanvas');
  if (!canvas || neuralScene) return;

  const container = canvas.parentElement;
  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  neuralScene = new THREE.Scene();
  neuralCamera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  neuralRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  neuralRenderer.setSize(width, height);
  neuralRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  neuralCamera.position.z = 15;

  const nodePositions = [];
  for (let i = 0; i < 30; i++) {
    const x = (Math.random() - 0.5) * 20;
    const y = (Math.random() - 0.5) * 15;
    const z = (Math.random() - 0.5) * 10;
    nodePositions.push({ x, y, z });
    const geometry = new THREE.SphereGeometry(0.15 + Math.random() * 0.2, 12, 12);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(0.5 + Math.random() * 0.2, 0.8, 0.6),
      emissive: new THREE.Color().setHSL(0.5 + Math.random() * 0.2, 0.8, 0.3),
      emissiveIntensity: 0.5
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x, y, z);
    neuralScene.add(sphere);
    neuralNodes.push(sphere);
  }

  for (let i = 0; i < 80; i++) {
    const a = Math.floor(Math.random() * nodePositions.length);
    let b = Math.floor(Math.random() * nodePositions.length);
    while (b === a) b = Math.floor(Math.random() * nodePositions.length);
    const start = nodePositions[a];
    const end = nodePositions[b];
    const points = [
      new THREE.Vector3(start.x, start.y, start.z),
      new THREE.Vector3(end.x, end.y, end.z)
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color().setHSL(0.5 + Math.random() * 0.2, 0.8, 0.5),
      transparent: true,
      opacity: 0.3 + Math.random() * 0.3
    });
    const line = new THREE.Line(geometry, material);
    neuralScene.add(line);
    neuralEdges.push(line);
  }

  const light = new THREE.PointLight(0x06b6d4, 1);
  light.position.set(10, 10, 10);
  neuralScene.add(light);
  const ambientLight = new THREE.AmbientLight(0x404060);
  neuralScene.add(ambientLight);

  let neuralTime = 0;
  function animateNeural() {
    if (!document.getElementById('introNeuralCanvas')) return;
    requestAnimationFrame(animateNeural);
    neuralTime += 0.01;
    neuralNodes.forEach((node, i) => {
      const speed = 0.5 + (i % 3) * 0.3;
      node.position.x += Math.sin(neuralTime * speed + i) * 0.005;
      node.position.y += Math.cos(neuralTime * speed * 0.7 + i * 0.5) * 0.005;
      const scale = 1 + Math.sin(neuralTime * 2 + i) * 0.2;
      node.scale.set(scale, scale, scale);
    });
    neuralEdges.forEach((edge, i) => {
      edge.material.opacity = 0.2 + Math.sin(neuralTime * 1.5 + i * 0.5) * 0.2;
    });
    neuralScene.rotation.x = Math.sin(neuralTime * 0.1) * 0.1;
    neuralScene.rotation.y = neuralTime * 0.1;
    neuralRenderer.render(neuralScene, neuralCamera);
  }
  animateNeural();
}

const sceneObserver = new MutationObserver(() => {
  const scene4 = document.querySelector('.intro-scene[data-scene="3"]');
  if (scene4 && scene4.classList.contains('active')) {
    setTimeout(initIntroNeural, 300);
  }
});
document.querySelectorAll('.intro-scene').forEach(s => {
  sceneObserver.observe(s, { attributes: true, attributeFilter: ['class'] });
});

// ========================================
// THEME SWITCHER
// ========================================
const themes = {
  default: { primary: '#06b6d4', secondary: '#0284c7', accent: '#67e8f9' },
  purple: { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#a78bfa' },
  green: { primary: '#10b981', secondary: '#059669', accent: '#34d399' },
  gold: { primary: '#f59e0b', secondary: '#d97706', accent: '#fbbf24' },
  pink: { primary: '#ec4899', secondary: '#db2777', accent: '#f472b6' }
};

document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const colors = themes[btn.dataset.theme];
    if (colors) {
      document.documentElement.style.setProperty('--primary', colors.primary);
      document.documentElement.style.setProperty('--secondary', colors.secondary);
      document.documentElement.style.setProperty('--accent', colors.accent);
      document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      localStorage.setItem('theme', btn.dataset.theme);
    }
  });
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme && themes[savedTheme]) {
  const c = themes[savedTheme];
  document.documentElement.style.setProperty('--primary', c.primary);
  document.documentElement.style.setProperty('--secondary', c.secondary);
  document.documentElement.style.setProperty('--accent', c.accent);
  document.querySelectorAll('.theme-btn').forEach(b => b.classList.toggle('active', b.dataset.theme === savedTheme));
}

// ========================================
// CHATBOT
// ========================================
const chatbotContainer = document.getElementById('chatbot');
const chatFloat = document.getElementById('chatFloat');
const chatbotClose = document.getElementById('chatbotClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');

const botResponses = {
  skills: "Sumit's skills: Python, Java, C++, SQL, PyTorch, TensorFlow, LangChain, LangGraph, RAG, Docker, Kubernetes, GCP, FastAPI, React, Node.js 🚀",
  experience: "Sumit worked as Software Engineer Intern at Salesforce (Feb-May 2022), where he built Python pipelines reducing manual work by 40%. 💼",
  projects: "7 projects: RAG Clinical QA, LLM Security Log Analyzer, CI/CD Pipeline, Terraform IaC, Military Vehicle Detection, Brain Tumor Detection, Mobile Botnet Detection 🧠",
  education: "M.Tech in Applied AI & ML from VNIT Nagpur (CGPA: 6.53). B.E. CS from Dr. D.Y. Patil Institute (CGPA: 7.89). 🎓",
  genai: "Sumit's GenAI skills: LLMs, RAG, LangChain, LangGraph, Prompt Engineering, OpenAI API, Hugging Face, Transformers, ChromaDB, FAISS 🧠",
  contact: "Email: info.sr0909@gmail.com | Phone: +91 9472441137 📧",
  resume: "8 role-specific resumes available for download at the 'Resumes' section! 📄",
};

function getBotResponse(input) {
  const lower = input.toLowerCase();
  if (lower.includes('skill') || lower.includes('language')) return botResponses.skills;
  if (lower.includes('experience') || lower.includes('work') || lower.includes('salesforce')) return botResponses.experience;
  if (lower.includes('project')) return botResponses.projects;
  if (lower.includes('education') || lower.includes('study') || lower.includes('college')) return botResponses.education;
  if (lower.includes('gen') || lower.includes('llm') || lower.includes('rag')) return botResponses.genai;
  if (lower.includes('contact') || lower.includes('email')) return botResponses.contact;
  if (lower.includes('resume') || lower.includes('cv')) return botResponses.resume;
  return "Great question! You can email Sumit at info.sr0909@gmail.com for more details. 😊";
}

chatFloat.addEventListener('click', () => {
  chatbotContainer.classList.toggle('open');
  chatFloat.style.display = 'none';
});

chatbotClose.addEventListener('click', () => {
  chatbotContainer.classList.remove('open');
  chatFloat.style.display = 'block';
});

function sendChat() {
  const text = chatInput.value.trim();
  if (!text) return;
  const userMsg = document.createElement('div');
  userMsg.className = 'message user';
  userMsg.textContent = text;
  chatMessages.appendChild(userMsg);
  chatInput.value = '';
  chatMessages.scrollTop = chatMessages.scrollHeight;
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'message bot';
    botMsg.textContent = getBotResponse(text);
    chatMessages.appendChild(botMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 500);
}

chatSend.addEventListener('click', sendChat);
chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendChat(); });

// ========================================
// TYPED TEXT
// ========================================
function initTyped() {
  const el = document.querySelector('.typed-text');
  if (!el) return;
  const roles = ["AI/ML Engineer", "Generative AI Engineer", "Data Engineer", "Data Analyst", "Full Stack Developer", "Software Engineer", "MLOps Engineer", "Backend Developer"];
  let idx = 0, char = 0, deleting = false;
  function type() {
    const current = roles[idx];
    if (deleting) { el.textContent = current.substring(0, char - 1); char--; }
    else { el.textContent = current.substring(0, char + 1); char++; }
    if (!deleting && char === current.length) { deleting = true; setTimeout(type, 2000); return; }
    if (deleting && char === 0) { deleting = false; idx = (idx + 1) % roles.length; setTimeout(type, 400); return; }
    setTimeout(type, deleting ? 60 : 90);
  }
  type();
}

// ========================================
// RENDER ROLES
// ========================================
function renderRoles() {
  const grid = document.getElementById('rolesGrid');
  if (!grid) return;
  grid.innerHTML = Object.entries(PROFILE_DATA.roles).map(([key, role]) => `
    <div class="role-card ${key === currentRole ? 'active' : ''}" data-role="${key}">
      <div class="role-icon">${role.icon}</div>
      <h3>${role.title}</h3>
      <p>${role.summary}</p>
    </div>
  `).join('');
  grid.querySelectorAll('.role-card').forEach(card => {
    card.addEventListener('click', () => {
      currentRole = card.dataset.role;
      renderRoles();
      renderSkills();
      renderProjects();
    });
  });
}

// ========================================
// RENDER SKILLS (dynamic based on role)
// ========================================
function renderSkills() {
  const container = document.getElementById('skillsContainer');
  if (!container) return;
  const role = PROFILE_DATA.roles[currentRole];
  const skills = role.skills;

  // Group skills by category
  const categories = {
    "Languages": ["Python", "Java", "C++", "SQL", "JavaScript", "TypeScript", "Bash", "R"],
    "AI / ML / GenAI": ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "CNN", "RNN", "LSTM", "Vision Transformers", "Transfer Learning", "LLMs", "RAG", "LangChain", "LangGraph", "Prompt Engineering", "OpenAI API", "Hugging Face", "Transformers", "LoRA Fine-tuning", "Embeddings", "Sentence Transformers", "Hybrid Search", "ChromaDB", "FAISS", "ONNX", "Grad-CAM", "NLP"],
    "Computer Vision": ["OpenCV", "YOLOv8", "Object Detection", "Image Classification", "Face Detection", "Haar Cascade"],
    "Data & Analytics": ["Pandas", "NumPy", "EDA", "Statistics", "Probability", "Power BI", "Matplotlib", "Seaborn"],
    "Backend & APIs": ["FastAPI", "Node.js", "REST APIs", "OOP", "Microservices", "MLflow"],
    "Databases": ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
    "Cloud & DevOps": ["GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "CI/CD", "Cloud Run", "Compute Engine", "IAM", "Linux", "Git"],
    "Frontend": ["React.js"]
  };

  container.innerHTML = Object.entries(categories).map(([catName, catSkills]) => {
    const filtered = catSkills.filter(s => skills.includes(s));
    if (filtered.length === 0) return '';
    return `
      <div class="skills-category">
        <h3>${catName}</h3>
        <div class="skills-tags">
          ${filtered.map(s => `<span class="skill-tag">${s}</span>`).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// ========================================
// RENDER PROJECTS
// ========================================
const CATEGORY_LABELS = {
  'all': 'All',
  'genai': 'Generative AI',
  'ai-ml': 'AI/ML',
  'devops': 'DevOps'
};

function renderProjectFilters() {
  const container = document.getElementById('projectFilters');
  if (!container) return;
  container.innerHTML = Object.entries(CATEGORY_LABELS).map(([key, label]) => `
    <button class="filter-btn ${key === currentFilter ? 'active' : ''}" data-filter="${key}">${label}</button>
  `).join('');
  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      renderProjectFilters();
      renderProjects();
    });
  });
}

function renderProjects() {
  const container = document.getElementById('projectsGrid');
  if (!container) return;
  const roleProjects = PROFILE_DATA.roles[currentRole].projects;
  let allProjects = Object.entries(PROFILE_DATA.projects).map(([id, p]) => ({ id, ...p }));

  let filtered = allProjects.filter(p => roleProjects.includes(parseInt(p.id)));
  if (currentFilter !== 'all') filtered = filtered.filter(p => p.category === currentFilter);

  container.innerHTML = filtered.map(p => `
    <div class="project-card" data-project="${p.id}">
      <div class="project-icon">${p.icon}</div>
      <div class="project-category-badge">${CATEGORY_LABELS[p.category] || p.category}</div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="project-tags">${p.tech.split(',').slice(0, 3).map(t => `<span>${t.trim()}</span>`).join('')}</div>
      <button class="btn-small view-project">View Details →</button>
    </div>
  `).join('') || '<p style="text-align:center;color:var(--text-muted);grid-column:1/-1">No projects in this category for this role.</p>';

  const modal = document.getElementById('projectModal');
  const body = document.getElementById('modal-body');

  container.querySelectorAll('.view-project').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.closest('.project-card').dataset.project;
      const p = PROFILE_DATA.projects[id];
      if (p) {
        body.innerHTML = `
          <span class="modal-close">&times;</span>
          <h2 style="color:var(--primary);margin-bottom:0.5rem">${p.title}</h2>
          <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:1rem">${p.year} · ${p.tech}</div>

          <div class="modal-section"><h4>📋 Overview</h4><p>${p.overview}</p></div>
          <div class="modal-section"><h4>❗ Problem</h4><p>${p.problem}</p></div>
          <div class="modal-section"><h4>💡 Solution</h4><p>${p.solution}</p></div>
          <div class="modal-section"><h4>🏗️ Architecture</h4><p>${p.architecture}</p></div>
          <div class="modal-section"><h4>✨ Key Features</h4><ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul></div>
          <div class="modal-section"><h4>📊 Results</h4><p>${p.results}</p></div>
          <a href="${p.github}" target="_blank" class="btn-small" style="margin-top:1rem">View on GitHub →</a>
        `;
        modal.style.display = 'flex';
        body.querySelector('.modal-close').addEventListener('click', () => modal.style.display = 'none');
      }
    });
  });
  window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
}

// ========================================
// RENDER EDUCATION
// ========================================
function renderEducation() {
  const eduGrid = document.getElementById('eduGrid');
  if (eduGrid) {
    eduGrid.innerHTML = PROFILE_DATA.education.map(e => `
      <div class="edu-card">
        <span class="edu-year">${e.year}</span>
        <h3>${e.degree}</h3>
        <p>${e.institution} · CGPA: ${e.cgpa}</p>
        <div class="edu-courses">${e.courses.map(c => `<span>${c}</span>`).join('')}</div>
      </div>
    `).join('');
  }

  const certGrid = document.getElementById('certGrid');
  if (certGrid) {
    certGrid.innerHTML = PROFILE_DATA.certifications.map(c => `
      <div class="cert-card"><i class="${c.icon}"></i><span>${c.name}</span></div>
    `).join('');
  }
}

// ========================================
// RENDER EXPERIENCE
// ========================================
function renderExperience() {
  const timeline = document.getElementById('experienceTimeline');
  if (!timeline) return;
  timeline.innerHTML = PROFILE_DATA.experience.map(exp => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <h3>${exp.role}</h3>
        <h4>${exp.company}</h4>
        <span class="timeline-date">${exp.duration}</span>
        <ul>${exp.points.map(p => `<li>${p}</li>`).join('')}</ul>
        <div class="timeline-tags">${exp.tech.map(t => `<span>${t}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');
}

// ========================================
// RENDER RESUMES
// ========================================
function renderResumes() {
  const grid = document.getElementById('resumesGrid');
  if (!grid) return;
  grid.innerHTML = PROFILE_DATA.resumes.map(r => `
    <div class="resume-card">
      <div class="resume-icon">${r.icon}</div>
      <h3>${r.title}</h3>
      <div class="resume-tags">${r.tags.map(t => `<span>${t}</span>`).join('')}</div>
      <a href="assets/resumes/${r.file}" class="btn-download" download>📥 Download</a>
    </div>
  `).join('');
}

// ========================================
// CONTACT FORM
// ========================================
function initContactForm() {
  document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("✨ Thank you for reaching out! I'll respond within 24 hours.");
    e.target.reset();
  });
}

// ========================================
// MOBILE NAV
// ========================================
function initMobileNav() {
  document.querySelector('.nav-toggle')?.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.remove('open');
      document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
  window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(s => {
      if (scrollY >= s.offsetTop - 200) current = s.getAttribute('id');
    });
    document.querySelectorAll('.nav-links a').forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === `#${current}`) l.classList.add('active');
    });
  });
}

// ========================================
// GSAP ANIMATIONS
// ========================================
function initAnimations() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.about-card, .role-card, .skills-category, .project-card, .resume-card, .timeline-item, .edu-card, .cert-card, .contact-card').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
      duration: 0.5, y: 30, opacity: 0, delay: i * 0.03, ease: 'power2.out'
    });
  });
  gsap.from('.hero-text', { duration: 0.8, y: 50, opacity: 0, ease: 'power3.out' });
  gsap.from('.hero-3d-box', { duration: 1, scale: 0.5, opacity: 0, delay: 0.3, ease: 'back.out(1.7)' });
}

// ========================================
// INIT MAIN CONTENT
// ========================================
function initMainContent() {
  initTyped();
  renderRoles();
  renderSkills();
  renderProjectFilters();
  renderProjects();
  renderEducation();
  renderExperience();
  renderResumes();
  initContactForm();
  initMobileNav();
  initAnimations();

  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.about-card, .role-card, .skills-category, .project-card, .resume-card, .edu-card, .cert-card, .contact-card'), {
      max: 8, speed: 400, glare: true, 'max-glare': 0.15
    });
  }
}

console.log('🚀 Portfolio loaded - Data-driven from resume!');
console.log('📄 8 Resumes | 7 Projects | 8 Roles');
