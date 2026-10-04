let currentRole = 'ai-ml';
let currentFilter = 'all';
let searchQuery = '';

function initParticleBackground() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  const isMobile = window.innerWidth < 768;
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) return;
  const count = isMobile ? 30 : 70;
  const particles = [];
  const mouse = { x: -1000, y: -1000 };
  function getColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#3b82f6';
  }
  for (let i = 0; i < count; i++) {
    particles.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: Math.random() * 2.2 + 0.8, baseAlpha: Math.random() * 0.4 + 0.2 });
  }
  document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  document.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000; });
  function draw() {
    ctx.clearRect(0, 0, W, H);
    const color = getColor();
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = hexA(color, (1 - dist / 130) * 0.18);
          ctx.lineWidth = 0.6;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const dMouse = Math.sqrt(dx * dx + dy * dy);
      const alphaBoost = dMouse < 150 ? (1 - dMouse / 150) * 0.5 : 0;
      ctx.beginPath();
      ctx.fillStyle = hexA(color, p.baseAlpha + alphaBoost);
      ctx.arc(p.x, p.y, p.r + alphaBoost * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize', () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; });
}
function hexA(hex, alpha) {
  if (!hex || hex[0] !== '#') return 'rgba(59,130,246,' + alpha + ')';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}

const cursorGlow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', e => { if (cursorGlow) { cursorGlow.style.left = e.clientX + 'px'; cursorGlow.style.top = e.clientY + 'px'; } });

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
function nextScene() { if (currentScene < totalScenes - 1) goToScene(currentScene + 1); else clearInterval(introInterval); }
setTimeout(() => { introInterval = setInterval(nextScene, 3500); }, 1000);
dots.forEach((dot, index) => { dot.addEventListener('click', () => { clearInterval(introInterval); goToScene(index); introInterval = setInterval(nextScene, 3500); }); });
skipBtn.addEventListener('click', () => { clearInterval(introInterval); goToScene(totalScenes - 1); setTimeout(enterPortfolio, 800); });
enterBtn.addEventListener('click', enterPortfolio);
function enterPortfolio() {
  clearInterval(introInterval);
  introOverlay.classList.add('hidden');
  document.getElementById('mainContent').style.display = 'block';
  initMainContent();
}

let neuralScene, neuralCamera, neuralRenderer;
function initIntroNeural() {
  const canvas = document.getElementById('introNeuralCanvas');
  if (!canvas || neuralScene) return;
  const c = canvas.parentElement;
  const w = c.clientWidth || window.innerWidth;
  const h = c.clientHeight || window.innerHeight;
  neuralScene = new THREE.Scene();
  neuralCamera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
  neuralRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  neuralRenderer.setSize(w, h);
  neuralRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  neuralCamera.position.z = 15;
  const pos = [];
  const nodes = [];
  for (let i = 0; i < 30; i++) {
    const x = (Math.random() - 0.5) * 20, y = (Math.random() - 0.5) * 15, z = (Math.random() - 0.5) * 10;
    pos.push({ x, y, z });
    const geo = new THREE.SphereGeometry(0.15 + Math.random() * 0.2, 12, 12);
    const mat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, emissive: 0x2563eb, emissiveIntensity: 0.5 });
    const s = new THREE.Mesh(geo, mat);
    s.position.set(x, y, z);
    neuralScene.add(s);
    nodes.push(s);
  }
  const edges = [];
  for (let i = 0; i < 80; i++) {
    const a = Math.floor(Math.random() * pos.length);
    let b = Math.floor(Math.random() * pos.length);
    while (b === a) b = Math.floor(Math.random() * pos.length);
    const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(pos[a].x, pos[a].y, pos[a].z), new THREE.Vector3(pos[b].x, pos[b].y, pos[b].z)]);
    const m = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.3 });
    const l = new THREE.Line(g, m);
    neuralScene.add(l);
    edges.push(l);
  }
  neuralScene.add(new THREE.PointLight(0x3b82f6, 1));
  neuralScene.add(new THREE.AmbientLight(0x404060));
  let t = 0;
  function animate() {
    if (!document.getElementById('introNeuralCanvas')) return;
    requestAnimationFrame(animate);
    t += 0.01;
    nodes.forEach((n, i) => {
      const s = 0.5 + (i % 3) * 0.3;
      n.position.x += Math.sin(t * s + i) * 0.005;
      n.position.y += Math.cos(t * s * 0.7 + i * 0.5) * 0.005;
      const sc = 1 + Math.sin(t * 2 + i) * 0.2;
      n.scale.set(sc, sc, sc);
    });
    edges.forEach((e, i) => { e.material.opacity = 0.2 + Math.sin(t * 1.5 + i * 0.5) * 0.2; });
    neuralScene.rotation.x = Math.sin(t * 0.1) * 0.1;
    neuralScene.rotation.y = t * 0.1;
    neuralRenderer.render(neuralScene, neuralCamera);
  }
  animate();
}
const sceneObs = new MutationObserver(() => {
  const s = document.querySelector('.intro-scene[data-scene="3"]');
  if (s && s.classList.contains('active')) setTimeout(initIntroNeural, 300);
});
document.querySelectorAll('.intro-scene').forEach(s => sceneObs.observe(s, { attributes: true, attributeFilter: ['class'] }));

document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const c = THEMES[btn.dataset.theme];
    if (c) {
      document.documentElement.style.setProperty('--primary', c.primary);
      document.documentElement.style.setProperty('--secondary', c.secondary);
      document.documentElement.style.setProperty('--accent', c.accent);
      document.documentElement.style.setProperty('--glow', hexA(c.primary, 0.3));
      document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      localStorage.setItem('theme', btn.dataset.theme);
    }
  });
});
const savedTheme = localStorage.getItem('theme');
if (savedTheme && THEMES[savedTheme]) {
  const c = THEMES[savedTheme];
  document.documentElement.style.setProperty('--primary', c.primary);
  document.documentElement.style.setProperty('--secondary', c.secondary);
  document.documentElement.style.setProperty('--accent', c.accent);
  document.documentElement.style.setProperty('--glow', hexA(c.primary, 0.3));
  document.querySelectorAll('.theme-btn').forEach(b => b.classList.toggle('active', b.dataset.theme === savedTheme));
}

const chatbot = document.getElementById('chatbot');
const chatFloat = document.getElementById('chatFloat');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');
const BOT = {
  skills: "Skills: Python, Java, C++, SQL, PyTorch, TensorFlow, LangChain, LangGraph, RAG, Docker, Kubernetes, GCP, FastAPI, React, Node.js",
  projects: "8 projects: RAG Clinical QA (92% relevance), LLM Security Analyzer (<3% hallucination), Brain Tumor Detection (93.18%), Military Vehicle Detection (95%), Android Botnet Detection (96.5%, published IJRASET 2023), CI/CD Pipeline (70% faster), Terraform GCP IaC, Fintech AI Portal",
  genai: "GenAI work: RAG with LangChain + ChromaDB, LangGraph agents, prompt engineering, hybrid search, self-reflection loops",
  education: "M.Tech Applied AI & ML at VNIT Nagpur (CGPA: 6.53). B.E. CS at Dr. D.Y. Patil (CGPA: 7.89)",
  experience: "Software Engineer Intern at Salesforce (Feb-May 2022). Python data pipelines (-40%), Salesforce API integration (+25%)",
  resume: "8 role-specific resumes available in the Resumes section",
  contact: "Email: info.sr0909@gmail.com | WhatsApp: +91 9472441137 | LinkedIn: linkedin.com/in/er-sumit-raj-"
};
function getBotResponse(input) {
  const l = input.toLowerCase();
  if (l.includes('skill') || l.includes('tech')) return BOT.skills;
  if (l.includes('project')) return BOT.projects;
  if (l.includes('gen') || l.includes('llm') || l.includes('rag')) return BOT.genai;
  if (l.includes('education') || l.includes('study')) return BOT.education;
  if (l.includes('experience') || l.includes('work')) return BOT.experience;
  if (l.includes('resume') || l.includes('cv')) return BOT.resume;
  if (l.includes('contact') || l.includes('email')) return BOT.contact;
  return "Email Sumit at info.sr0909@gmail.com or WhatsApp at +91 9472441137";
}
chatFloat.addEventListener('click', () => { chatbot.classList.toggle('open'); chatFloat.style.display = chatbot.classList.contains('open') ? 'none' : 'block'; });
document.getElementById('chatbotClose').addEventListener('click', () => { chatbot.classList.remove('open'); chatFloat.style.display = 'block'; });
function sendChat() {
  const t = chatInput.value.trim();
  if (!t) return;
  addMsg('user', t);
  chatInput.value = '';
  setTimeout(() => addMsg('bot', getBotResponse(t)), 500);
}
function addMsg(type, text) {
  const m = document.createElement('div');
  m.className = 'message ' + type;
  m.textContent = text;
  chatMessages.appendChild(m);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
chatSend.addEventListener('click', sendChat);
chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendChat(); });
document.querySelectorAll('.suggestion').forEach(s => {
  s.addEventListener('click', () => {
    addMsg('user', s.textContent);
    setTimeout(() => addMsg('bot', getBotResponse(s.dataset.q)), 500);
  });
});

function initTyped() {
  const el = document.querySelector('.typed-text');
  if (!el) return;
  const roles = Object.values(PROFILE_DATA.roles).map(r => r.title);
  let i = 0, c = 0, del = false;
  function type() {
    const cur = roles[i];
    if (del) { el.textContent = cur.substring(0, c - 1); c--; }
    else { el.textContent = cur.substring(0, c + 1); c++; }
    if (!del && c === cur.length) { del = true; setTimeout(type, 2000); return; }
    if (del && c === 0) { del = false; i = (i + 1) % roles.length; setTimeout(type, 400); return; }
    setTimeout(type, del ? 50 : 80);
  }
  type();
}

function renderHero() {
  document.getElementById('heroTagline').textContent = PROFILE_DATA.tagline + '. Currently pursuing M.Tech at VNIT Nagpur.';
  document.getElementById('heroStats').innerHTML =
    '<div class="stat"><span>8</span><label>Projects</label></div>' +
    '<div class="stat"><span>300+</span><label>DSA Solved</label></div>' +
    '<div class="stat"><span>5/5</span><label>HackerRank Java</label></div>' +
    '<div class="stat"><span>8</span><label>Resumes</label></div>';
}

function renderAbout() {
  document.getElementById('aboutGrid').innerHTML =
    '<div class="about-card"><div class="about-icon"><i class="fas fa-user-graduate"></i></div><h3>Education</h3><p>M.Tech in Applied AI & ML at VNIT Nagpur (2024-2026). B.E. in Computer Science from Dr. D.Y. Patil Institute, Pune (CGPA: 7.89).</p></div>' +
    '<div class="about-card"><div class="about-icon"><i class="fas fa-briefcase"></i></div><h3>Experience</h3><p>Software Engineer Intern at Salesforce (Feb-May 2022). Built Python data pipelines reducing manual work by 40%, optimized backend workflows, integrated Salesforce APIs.</p></div>' +
    '<div class="about-card"><div class="about-icon"><i class="fas fa-lightbulb"></i></div><h3>Specialization</h3><p>AI/ML, Generative AI (LLMs, RAG, LangChain), Computer Vision (YOLOv8, ViT), MLOps (Docker, GCP, CI/CD), and Data Engineering.</p></div>' +
    '<div class="about-card"><div class="about-icon"><i class="fas fa-star"></i></div><h3>Achievements</h3><p>HackerRank 5-Star Java, 4-Star C++, 3-Star Algorithms. 300+ DSA problems solved. Published research in IJRASET 2023. Google Cloud & Microsoft certified.</p></div>';
}

function renderRoles() {
  const grid = document.getElementById('rolesGrid');
  grid.innerHTML = Object.entries(PROFILE_DATA.roles).map(([k, r]) =>
    '<div class="role-card ' + (k === currentRole ? 'active' : '') + '" data-role="' + k + '">' +
    '<div class="role-icon"><i class="fas ' + r.faIcon + '"></i></div>' +
    '<h3>' + r.title + '</h3><p>' + r.summary + '</p></div>'
  ).join('');
  grid.querySelectorAll('.role-card').forEach(card => {
    card.addEventListener('click', () => { currentRole = card.dataset.role; renderRoles(); renderSkills(); renderProjects(); });
  });
}

const SKILL_CATS = {
  "Languages": ["Python", "Java", "C++", "SQL", "JavaScript", "TypeScript", "Bash", "R"],
  "AI / ML / GenAI": ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "CNN", "RNN", "LSTM", "Vision Transformers", "Transfer Learning", "LLMs", "RAG", "LangChain", "LangGraph", "Prompt Engineering", "OpenAI API", "Hugging Face", "Transformers", "LoRA Fine-tuning", "Embeddings", "Sentence Transformers", "Hybrid Search", "BM25", "Reciprocal Rank Fusion", "ChromaDB", "FAISS", "ONNX", "Grad-CAM", "NLP", "MLflow"],
  "Computer Vision": ["OpenCV", "YOLOv8", "Object Detection", "Image Classification", "Face Detection", "Haar Cascade", "LBPH"],
  "Data & Analytics": ["Pandas", "NumPy", "EDA", "Statistics", "Probability", "Power BI", "Matplotlib", "Seaborn", "Excel"],
  "Backend & APIs": ["FastAPI", "Node.js", "REST APIs", "OOP", "Microservices", "System Design"],
  "Frontend": ["React.js", "HTML5", "CSS3"],
  "Databases": ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
  "Cloud & DevOps": ["GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "CI/CD", "Cloud Run", "Compute Engine", "IAM", "Linux", "Git"],
  "Core CS": ["DSA", "SDLC", "Problem Solving"]
};
function renderSkills() {
  const role = PROFILE_DATA.roles[currentRole];
  document.getElementById('skillsSubtitle').textContent = 'Showing skills for: ' + role.title;
  const container = document.getElementById('skillsContainer');
  container.innerHTML = Object.entries(SKILL_CATS).map(([cat, skills]) => {
    const filtered = skills.filter(s => role.skills.includes(s));
    if (!filtered.length) return '';
    return '<div class="skills-category"><h3><i class="fas fa-layer-group"></i> ' + cat + '</h3><div class="skills-tags">' + filtered.map(s => '<span class="skill-tag">' + s + '</span>').join('') + '</div></div>';
  }).join('');
}

const CAT_LABELS = { all: 'All', genai: 'Generative AI', 'ai-ml': 'AI/ML', devops: 'DevOps', fullstack: 'Full Stack' };
function renderFilters() {
  document.getElementById('projectFilters').innerHTML = Object.entries(CAT_LABELS).map(([k, l]) =>
    '<button class="filter-btn ' + (k === currentFilter ? 'active' : '') + '" data-filter="' + k + '">' + l + '</button>'
  ).join('');
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.addEventListener('click', () => { currentFilter = b.dataset.filter; renderFilters(); renderProjects(); });
  });
}
function renderProjects() {
  const role = PROFILE_DATA.roles[currentRole];
  let list = Object.entries(PROFILE_DATA.projects).map(([id, p]) => ({ id, ...p }));
  list = list.filter(p => role.projects.includes(parseInt(p.id)));
  if (currentFilter !== 'all') list = list.filter(p => p.category === currentFilter);
  if (searchQuery) list = list.filter(p => (p.title + p.desc + p.tech).toLowerCase().includes(searchQuery));
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = list.map(p =>
    '<div class="project-card" data-project="' + p.id + '">' +
    '<div class="project-icon"><i class="fas ' + p.faIcon + '"></i></div>' +
    '<div class="project-category-badge">' + (CAT_LABELS[p.category] || p.category) + '</div>' +
    '<h3>' + p.title + '</h3><p>' + p.desc + '</p>' +
    '<div class="project-tags">' + p.tech.split(',').slice(0, 3).map(t => '<span>' + t.trim() + '</span>').join('') + '</div>' +
    '<button class="btn-small view-project">View Details <i class="fas fa-arrow-right"></i></button></div>'
  ).join('') || '<p style="text-align:center;color:var(--text-muted);grid-column:1/-1">No projects match this filter.</p>';

  const modal = document.getElementById('projectModal');
  const body = document.getElementById('modal-body');
  grid.querySelectorAll('.view-project').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.closest('.project-card').dataset.project;
      const p = PROFILE_DATA.projects[id];
      body.innerHTML =
        '<span class="modal-close">&times;</span>' +
        '<h2 style="color:var(--primary);margin-bottom:0.5rem">' + p.title + '</h2>' +
        '<div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:0.3rem">' + p.year + ' &middot; ' + p.language + ' &middot; ' + p.license + ' License</div>' +
        '<div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:1rem"><i class="fas fa-code"></i> ' + p.tech + '</div>' +
        '<div class="modal-section"><h4><i class="fas fa-info-circle"></i> Overview</h4><p>' + p.overview + '</p></div>' +
        '<div class="modal-section"><h4><i class="fas fa-exclamation-triangle"></i> Problem</h4><p>' + p.problem + '</p></div>' +
        '<div class="modal-section"><h4><i class="fas fa-lightbulb"></i> Solution</h4><p>' + p.solution + '</p></div>' +
        '<div class="modal-section"><h4><i class="fas fa-sitemap"></i> Architecture</h4><p>' + p.architecture + '</p></div>' +
        '<div class="modal-section"><h4><i class="fas fa-star"></i> Key Features</h4><ul>' + p.features.map(f => '<li>' + f + '</li>').join('') + '</ul></div>' +
        '<div class="modal-section"><h4><i class="fas fa-chart-line"></i> Results</h4><p>' + p.results + '</p></div>' +
        (p.publication ? '<div class="modal-section"><h4><i class="fas fa-book"></i> Publication</h4><p>' + p.publication + '</p></div>' : '') +
        '<a href="' + p.github + '" target="_blank" class="btn-small" style="margin-top:1rem"><i class="fab fa-github"></i> View on GitHub</a>';
      modal.style.display = 'flex';
      body.querySelector('.modal-close').addEventListener('click', () => modal.style.display = 'none');
    });
  });
  window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
}

function renderEducation() {
  document.getElementById('eduGrid').innerHTML = PROFILE_DATA.education.map(e =>
    '<div class="edu-card"><span class="edu-year">' + e.year + '</span><h3>' + e.degree + '</h3><p>' + e.institution + ' &middot; CGPA: ' + e.cgpa + '</p><div class="edu-courses">' + e.courses.map(c => '<span>' + c + '</span>').join('') + '</div></div>'
  ).join('');
  document.getElementById('certGrid').innerHTML = PROFILE_DATA.certifications.map(c =>
    '<div class="cert-card"><i class="' + c.icon + '"></i><span>' + c.name + '</span></div>'
  ).join('');
}

function renderExperience() {
  document.getElementById('experienceTimeline').innerHTML = PROFILE_DATA.experience.map(e =>
    '<div class="timeline-item"><div class="timeline-dot"></div><div class="timeline-content"><h3>' + e.role + '</h3><h4>' + e.company + '</h4><span class="timeline-date">' + e.duration + '</span><ul>' + e.points.map(p => '<li>' + p + '</li>').join('') + '</ul><div class="timeline-tags">' + e.tech.map(t => '<span>' + t + '</span>').join('') + '</div></div></div>'
  ).join('');
}

function renderResumes() {
  document.getElementById('resumesGrid').innerHTML = PROFILE_DATA.resumes.map(r =>
    '<div class="resume-card"><div class="resume-icon"><i class="fas ' + r.faIcon + '"></i></div><h3>' + r.title + '</h3><div class="resume-tags">' + r.tags.map(t => '<span>' + t + '</span>').join('') + '</div><a href="assets/resumes/' + r.file + '" class="btn-download" download><i class="fas fa-download"></i> Download</a></div>'
  ).join('');
}

function renderContactExtra() {
  const container = document.querySelector('.contact-info');
  if (!container) return;
  if (!container.querySelector('.whatsapp-card')) {
    const wa = document.createElement('div');
    wa.className = 'contact-card whatsapp-card';
    wa.innerHTML = '<i class="fab fa-whatsapp"></i><h4>WhatsApp</h4><p>' + PROFILE_DATA.whatsapp + '</p><a href="' + PROFILE_DATA.whatsappLink + '" target="_blank" class="btn-whatsapp">Chat Now</a>';
    container.appendChild(wa);
  }
}

function initMainContent() {
  initParticleBackground();
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
  renderContactExtra();

  document.getElementById('projectSearch').addEventListener('input', e => { searchQuery = e.target.value.toLowerCase(); renderProjects(); });
  document.getElementById('contact-form').addEventListener('submit', e => { e.preventDefault(); alert('Thank you! I will respond within 24 hours.'); e.target.reset(); });
  document.querySelector('.nav-toggle').addEventListener('click', () => { document.querySelector('.nav-links').classList.toggle('open'); });
  document.querySelectorAll('.nav-links a').forEach(l => { l.addEventListener('click', () => { document.querySelector('.nav-links').classList.remove('open'); document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active')); l.classList.add('active'); }); });
  window.addEventListener('scroll', () => { let cur = ''; document.querySelectorAll('section').forEach(s => { if (scrollY >= s.offsetTop - 200) cur = s.id; }); document.querySelectorAll('.nav-links a').forEach(l => { l.classList.remove('active'); if (l.getAttribute('href') === '#' + cur) l.classList.add('active'); }); });

  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.about-card, .role-card, .skills-category, .project-card, .resume-card, .timeline-item, .edu-card, .cert-card, .contact-card').forEach((el, i) => {
      gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }, duration: 0.5, y: 30, opacity: 0, delay: i * 0.03, ease: 'power2.out' });
    });
  }
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.about-card, .role-card, .skill-category, .project-card, .resume-card, .edu-card, .cert-card, .contact-card'), { max: 6, speed: 400, glare: true, 'max-glare': 0.1 });
  }
}
console.log('Portfolio loaded - Real projects + WhatsApp + Font Awesome icons');
