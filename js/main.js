// ========================================
// STATE
// ========================================
let currentRole = 'ai-ml';
let currentFilter = 'all';
let searchQuery = '';

// ========================================
// CURSOR GLOW
// ========================================
const cursorGlow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
  if (cursorGlow) {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  }
});

// ========================================
// INTRO
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
  if (currentScene < totalScenes - 1) goToScene(currentScene + 1);
  else clearInterval(introInterval);
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
// INTRO NEURAL
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
    const geo = new THREE.SphereGeometry(0.15 + Math.random() * 0.2, 12, 12);
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(0.6, 0.8, 0.6),
      emissive: new THREE.Color().setHSL(0.6, 0.8, 0.3),
      emissiveIntensity: 0.5
    });
    const sphere = new THREE.Mesh(geo, mat);
    sphere.position.set(x, y, z);
    neuralScene.add(sphere);
    neuralNodes.push(sphere);
  }
  for (let i = 0; i < 80; i++) {
    const a = Math.floor(Math.random() * nodePositions.length);
    let b = Math.floor(Math.random() * nodePositions.length);
    while (b === a) b = Math.floor(Math.random() * nodePositions.length);
    const pts = [new THREE.Vector3(nodePositions[a].x, nodePositions[a].y, nodePositions[a].z), new THREE.Vector3(nodePositions[b].x, nodePositions[b].y, nodePositions[b].z)];
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.3 });
    const line = new THREE.Line(geo, mat);
    neuralScene.add(line);
    neuralEdges.push(line);
  }
  neuralScene.add(new THREE.PointLight(0x3b82f6, 1));
  neuralScene.add(new THREE.AmbientLight(0x404060));
  let t = 0;
  function animate() {
    if (!document.getElementById('introNeuralCanvas')) return;
    requestAnimationFrame(animate);
    t += 0.01;
    neuralNodes.forEach((n, i) => {
      const s = 0.5 + (i % 3) * 0.3;
      n.position.x += Math.sin(t * s + i) * 0.005;
      n.position.y += Math.cos(t * s * 0.7 + i * 0.5) * 0.005;
      const sc = 1 + Math.sin(t * 2 + i) * 0.2;
      n.scale.set(sc, sc, sc);
    });
    neuralEdges.forEach((e, i) => { e.material.opacity = 0.2 + Math.sin(t * 1.5 + i * 0.5) * 0.2; });
    neuralScene.rotation.x = Math.sin(t * 0.1) * 0.1;
    neuralScene.rotation.y = t * 0.1;
    neuralRenderer.render(neuralScene, neuralCamera);
  }
  animate();
}
const sceneObserver = new MutationObserver(() => {
  const s4 = document.querySelector('.intro-scene[data-scene="3"]');
  if (s4 && s4.classList.contains('active')) setTimeout(initIntroNeural, 300);
});
document.querySelectorAll('.intro-scene').forEach(s => sceneObserver.observe(s, { attributes: true, attributeFilter: ['class'] }));

// ========================================
// THEME SWITCHER
// ========================================
document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const c = THEMES[btn.dataset.theme];
    if (c) {
      document.documentElement.style.setProperty('--primary', c.primary);
      document.documentElement.style.setProperty('--secondary', c.secondary);
      document.documentElement.style.setProperty('--accent', c.accent);
      document.documentElement.style.setProperty('--glow', hexToRgba(c.primary, 0.3));
      document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      localStorage.setItem('theme', btn.dataset.theme);
    }
  });
});
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
const savedTheme = localStorage.getItem('theme');
if (savedTheme && THEMES[savedTheme]) {
  const c = THEMES[savedTheme];
  document.documentElement.style.setProperty('--primary', c.primary);
  document.documentElement.style.setProperty('--secondary', c.secondary);
  document.documentElement.style.setProperty('--accent', c.accent);
  document.documentElement.style.setProperty('--glow', hexToRgba(c.primary, 0.3));
  document.querySelectorAll('.theme-btn').forEach(b => b.classList.toggle('active', b.dataset.theme === savedTheme));
}

// ========================================
// CHATBOT
// ========================================
const chatbot = document.getElementById('chatbot');
const chatFloat = document.getElementById('chatFloat');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');

const BOT = {
  skills: "Sumit's skills include Python, Java, C++, SQL, PyTorch, TensorFlow, LangChain, LangGraph, RAG, Docker, Kubernetes, GCP, FastAPI, React, Node.js 🚀",
  projects: "Sumit has 7 projects: RAG Clinical QA (92% relevance), LLM Security Log Analyzer (<3% hallucination), CI/CD Pipeline (70% faster), Terraform IaC, Military Vehicle Detection (95% accuracy), Brain Tumor Detection (94.2% accuracy), Mobile Botnet Detection (96.5% precision) 🧠",
  genai: "Sumit's GenAI work: RAG systems with LangChain + ChromaDB, LLM agents with LangGraph, prompt engineering, hybrid search (BM25 + dense embeddings), and self-reflection loops to reduce hallucination 🧠",
  education: "M.Tech in Applied AI & ML from VNIT Nagpur (CGPA: 6.53). B.E. in Computer Science from Dr. D.Y. Patil Institute (CGPA: 7.89) 🎓",
  experience: "Sumit was a Software Engineer Intern at Salesforce (Feb-May 2022). Built Python data pipelines (-40% manual effort), integrated Salesforce APIs (+25% efficiency) 💼",
  resume: "8 role-specific resumes available! Click the 'Resumes' section to download the one matching your needs 📄",
  contact: "Email: info.sr0909@gmail.com | Phone: +91 9472441137 | LinkedIn: linkedin.com/in/er-sumit-raj 📧"
};
function getBotResponse(input) {
  const l = input.toLowerCase();
  if (l.includes('skill') || l.includes('tech')) return BOT.skills;
  if (l.includes('project')) return BOT.projects;
  if (l.includes('gen') || l.includes('llm') || l.includes('rag')) return BOT.genai;
  if (l.includes('education') || l.includes('study') || l.includes('college')) return BOT.education;
  if (l.includes('experience') || l.includes('work') || l.includes('salesforce')) return BOT.experience;
  if (l.includes('resume') || l.includes('cv')) return BOT.resume;
  if (l.includes('contact') || l.includes('email')) return BOT.contact;
  return "Great question! Email Sumit at info.sr0909@gmail.com for more details 😊";
}
chatFloat.addEventListener('click', () => { chatbot.classList.toggle('open'); chatFloat.style.display = chatbot.classList.contains('open') ? 'none' : 'block'; });
document.getElementById('chatbotClose').addEventListener('click', () => { chatbot.classList.remove('open'); chatFloat.style.display = 'block'; });
function sendChat() {
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage('user', text);
  chatInput.value = '';
  setTimeout(() => addMessage('bot', getBotResponse(text)), 500);
}
function addMessage(type, text) {
  const msg = document.createElement('div');
  msg.className = 'message ' + type;
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
chatSend.addEventListener('click', sendChat);
chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendChat(); });
document.querySelectorAll('.suggestion').forEach(s => {
  s.addEventListener('click', () => {
    addMessage('user', s.textContent);
    setTimeout(() => addMessage('bot', getBotResponse(s.dataset.q)), 500);
  });
});

// ========================================
// TYPED
// ========================================
function initTyped() {
  const el = document.querySelector('.typed-text');
  if (!el) return;
  const roles = Object.values(PROFILE_DATA.roles).map(r => r.title);
  let i = 0, c = 0, del = false;
  function type() {
    const cur = roles[i];
    if (del) { el.textContent = cur.substring(0, c-1); c--; }
    else { el.textContent = cur.substring(0, c+1); c++; }
    if (!del && c === cur.length) { del = true; setTimeout(type, 2000); return; }
    if (del && c === 0) { del = false; i = (i+1) % roles.length; setTimeout(type, 400); return; }
    setTimeout(type, del ? 50 : 80);
  }
  type();
}

// ========================================
// RENDER HERO
// ========================================
function renderHero() {
  document.getElementById('heroTagline').textContent = PROFILE_DATA.tagline + '. Currently pursuing M.Tech at VNIT Nagpur.';
  document.getElementById('heroStats').innerHTML = `
    <div class="stat"><span>7</span><label>Projects</label></div>
    <div class="stat"><span>300+</span><label>DSA Solved</label></div>
    <div class="stat"><span>5⭐</span><label>HackerRank</label></div>
    <div class="stat"><span>8</span><label>Resumes</label></div>
  `;
}

// ========================================
// RENDER ABOUT
// ========================================
function renderAbout() {
  document.getElementById('aboutGrid').innerHTML = `
    <div class="about-card"><div class="about-icon"><i class="fas fa-user-graduate"></i></div><h3>Education</h3><p>M.Tech in Applied AI & ML at VNIT Nagpur (2024-2026). B.E. in Computer Science from Dr. D.Y. Patil Institute, Pune (CGPA: 7.89).</p></div>
    <div class="about-card"><div class="about-icon"><i class="fas fa-briefcase"></i></div><h3>Experience</h3><p>Software Engineer Intern at Salesforce (Feb-May 2022). Built Python data pipelines reducing manual work by 40%, optimized backend workflows, integrated Salesforce APIs.</p></div>
    <div class="about-card"><div class="about-icon"><i class="fas fa-lightbulb"></i></div><h3>Specialization</h3><p>AI/ML, Generative AI (LLMs, RAG, LangChain), Computer Vision (YOLOv8, ViT), MLOps (Docker, GCP, CI/CD), and Data Engineering.</p></div>
    <div class="about-card"><div class="about-icon"><i class="fas fa-star"></i></div><h3>Achievements</h3><p>HackerRank 5-Star Java, 4-Star C++, 3-Star Algorithms. 300+ DSA problems solved. Google Cloud & Microsoft certified.</p></div>
  `;
}

// ========================================
// RENDER ROLES
// ========================================
function renderRoles() {
  const grid = document.getElementById('rolesGrid');
  grid.innerHTML = Object.entries(PROFILE_DATA.roles).map(([k, r]) => `
    <div class="role-card ${k === currentRole ? 'active' : ''}" data-role="${k}">
      <div class="role-icon">${r.icon}</div>
      <h3>${r.title}</h3>
      <p>${r.summary}</p>
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
const SKILL_CATEGORIES = {
  "Languages": ["Python", "Java", "C++", "SQL", "JavaScript", "TypeScript", "Bash", "R"],
  "AI / ML / GenAI": ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "CNN", "RNN", "LSTM", "Vision Transformers", "Transfer Learning", "LLMs", "RAG", "LangChain", "LangGraph", "Prompt Engineering", "OpenAI API", "Hugging Face", "Transformers", "LoRA Fine-tuning", "Embeddings", "Sentence Transformers", "Hybrid Search", "ChromaDB", "FAISS", "ONNX", "Grad-CAM", "NLP", "MLflow"],
  "Computer Vision": ["OpenCV", "YOLOv8", "Object Detection", "Image Classification", "Face Detection", "Haar Cascade"],
  "Data & Analytics": ["Pandas", "NumPy", "EDA", "Statistics", "Probability", "Power BI", "Matplotlib", "Seaborn"],
  "Backend & APIs": ["FastAPI", "Node.js", "REST APIs", "OOP", "Microservices"],
  "Databases": ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
  "Cloud & DevOps": ["GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "CI/CD", "Cloud Run", "Compute Engine", "IAM", "Linux", "Git"],
  "Frontend": ["React.js"]
};
function renderSkills() {
  const role = PROFILE_DATA.roles[currentRole];
  document.getElementById('skillsSubtitle').textContent = `Showing skills for: ${role.title}`;
  const container = document.getElementById('skillsContainer');
  container.innerHTML = Object.entries(SKILL_CATEGORIES).map(([cat, skills]) => {
    const filtered = skills.filter(s => role.skills.includes(s));
    if (!filtered.length) return '';
    return `<div class="skills-category"><h3>${cat}</h3><div class="skills-tags">${filtered.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div></div>`;
  }).join('');
}

// ========================================
// PROJECTS
// ========================================
const CAT_LABELS = { all: 'All', genai: 'Generative AI', 'ai-ml': 'AI/ML', devops: 'DevOps' };
function renderFilters() {
  document.getElementById('projectFilters').innerHTML = Object.entries(CAT_LABELS).map(([k, l]) => `
    <button class="filter-btn ${k === currentFilter ? 'active' : ''}" data-filter="${k}">${l}</button>
  `).join('');
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.addEventListener('click', () => {
      currentFilter = b.dataset.filter;
      renderFilters();
      renderProjects();
    });
  });
}
function renderProjects() {
  const role = PROFILE_DATA.roles[currentRole];
  let list = Object.entries(PROFILE_DATA.projects).map(([id, p]) => ({ id, ...p }));
  list = list.filter(p => role.projects.includes(parseInt(p.id)));
  if (currentFilter !== 'all') list = list.filter(p => p.category === currentFilter);
  if (searchQuery) list = list.filter(p => (p.title + p.desc + p.tech).toLowerCase().includes(searchQuery));

  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = list.map(p => `
    <div class="project-card" data-project="${p.id}">
      <div class="project-icon">${p.icon}</div>
      <div class="project-category-badge">${CAT_LABELS[p.category] || p.category}</div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="project-tags">${p.tech.split(',').slice(0,3).map(t => `<span>${t.trim()}</span>`).join('')}</div>
      <button class="btn-small view-project">View Details →</button>
    </div>
  `).join('') || '<p style="text-align:center;color:var(--text-muted);grid-column:1/-1">No projects match this filter for the current role.</p>';

  const modal = document.getElementById('projectModal');
  const body = document.getElementById('modal-body');
  grid.querySelectorAll('.view-project').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.closest('.project-card').dataset.project;
      const p = PROFILE_DATA.projects[id];
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
    });
  });
  window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
}

// ========================================
// RENDER EDUCATION
// ========================================
function renderEducation() {
  document.getElementById('eduGrid').innerHTML = PROFILE_DATA.education.map(e => `
    <div class="edu-card">
      <span class="edu-year">${e.year}</span>
      <h3>${e.degree}</h3>
      <p>${e.institution} · CGPA: ${e.cgpa}</p>
      <div class="edu-courses">${e.courses.map(c => `<span>${c}</span>`).join('')}</div>
    </div>
  `).join('');
  document.getElementById('certGrid').innerHTML = PROFILE_DATA.certifications.map(c => `
    <div class="cert-card"><i class="${c.icon}"></i><span>${c.name}</span></div>
  `).join('');
}

// ========================================
// RENDER EXPERIENCE
// ========================================
function renderExperience() {
  document.getElementById('experienceTimeline').innerHTML = PROFILE_DATA.experience.map(e => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <h3>${e.role}</h3>
        <h4>${e.company}</h4>
        <span class="timeline-date">${e.duration}</span>
        <ul>${e.points.map(p => `<li>${p}</li>`).join('')}</ul>
        <div class="timeline-tags">${e.tech.map(t => `<span>${t}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');
}

// ========================================
// RENDER RESUMES
// ========================================
function renderResumes() {
  document.getElementById('resumesGrid').innerHTML = PROFILE_DATA.resumes.map(r => `
    <div class="resume-card">
      <div class="resume-icon">${r.icon}</div>
      <h3>${r.title}</h3>
      <div class="resume-tags">${r.tags.map(t => `<span>${t}</span>`).join('')}</div>
      <a href="assets/resumes/${r.file}" class="btn-download" download>📥 Download</a>
    </div>
  `).join('');
}

// ========================================
// INIT
// ========================================
function initMainContent() {
  initTyped();
  renderHero();
  renderAbout();
  renderRoles();
  renderSkills();
  renderFilters();
  renderProjects();
  renderEducation();
  renderExperience();
  renderResumes();

  document.getElementById('projectSearch').addEventListener('input', e => {
    searchQuery = e.target.value.toLowerCase();
    renderProjects();
  });

  document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('✨ Thank you! I will respond within 24 hours.');
    e.target.reset();
  });

  document.querySelector('.nav-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(l => {
    l.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.remove('open');
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      l.classList.add('active');
    });
  });
  window.addEventListener('scroll', () => {
    let cur = '';
    document.querySelectorAll('section').forEach(s => { if (scrollY >= s.offsetTop - 200) cur = s.id; });
    document.querySelectorAll('.nav-links a').forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === '#' + cur) l.classList.add('active');
    });
  });

  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.about-card, .role-card, .skills-category, .project-card, .resume-card, .timeline-item, .edu-card, .cert-card, .contact-card').forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        duration: 0.5, y: 30, opacity: 0, delay: i * 0.03, ease: 'power2.out'
      });
    });
  }
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.about-card, .role-card, .skill-category, .project-card, .resume-card, .edu-card, .cert-card, .contact-card'), {
      max: 6, speed: 400, glare: true, 'max-glare': 0.1
    });
  }
}

console.log('🚀 Premium portfolio loaded - Data-driven from resume');
