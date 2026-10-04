// ========================================
// STATE
// ========================================
let currentRole = 'ai-ml';
let currentFilter = 'all';
let searchQuery = '';

// ========================================
// FLOATING BUBBLES / PARTICLES BACKGROUND
// ========================================
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

  function getPrimaryColor() {
    const c = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    return c || '#3b82f6';
  }

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2.2 + 0.8,
      baseAlpha: Math.random() * 0.4 + 0.2
    });
  }

  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  document.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000; });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const color = getPrimaryColor();

    // Draw connections
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

    // Draw particles
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      // Mouse attraction glow
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

  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
}

function hexA(hex, alpha) {
  if (!hex || hex[0] !== '#') return `rgba(59,130,246,${alpha})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

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
// THEME SWITCHER
// ========================================
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

// ========================================
// CHATBOT
// ========================================
const chatbot = document.getElementById('chatbot');
const chatFloat = document.getElementById('chatFloat');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');

const BOT = {
  skills: "Sumit's skills include Python, Java, C++, SQL, PyTorch, TensorFlow, LangChain, LangGraph, RAG, Docker, Kubernetes, GCP, FastAPI, React, Node.js",
  projects: "Sumit has 7 projects: RAG Clinical QA (92% relevance), LLM Security Log Analyzer (<3% hallucination), CI/CD Pipeline (70% faster), Terraform IaC, Military Vehicle Detection (95% accuracy), Brain Tumor Detection (94.2% accuracy), Mobile Botnet Detection (96.5% precision)",
  genai: "Sumit's GenAI work: RAG systems with LangChain + ChromaDB, LLM agents with LangGraph, prompt engineering, hybrid search (BM25 + dense embeddings), and self-reflection loops to reduce hallucination",
  education: "M.Tech in Applied AI & ML from VNIT Nagpur (CGPA: 6.53). B.E. in Computer Science from Dr. D.Y. Patil Institute (CGPA: 7.89)",
  experience: "Sumit was a Software Engineer Intern at Salesforce (Feb-May 2022). Built Python data pipelines (-40% manual effort), integrated Salesforce APIs (+25% efficiency)",
  resume: "8 role-specific resumes available! Click the 'Resumes' section to download the one matching your needs",
  contact: "Email: info.sr0909@gmail.com | Phone: +91 9472441137 | LinkedIn: linkedin.com/in/er-sumit-raj-"
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
  return "Great question! Email Sumit at info.sr0909@gmail.com for more details";
}
chatFloat.addEventListener('click', () => {
  chatbot.classList.toggle('open');
  chatFloat.style.display = chatbot.classList.contains('open') ? 'none' : 'block';
});
document.getElementById('chatbotClose').addEventListener('click', () => {
  chatbot.classList.remove('open');
  chatFloat.style.display = 'block';
});
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
    <div class="stat"><span>5/5</span><label>HackerRank Java</label></div>
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
// RENDER SKILLS
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
      <button class="btn-small view-project">View Details</button>
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
        <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:1rem">${p.year} &middot; ${p.tech}</div>
        <div class="modal-section"><h4>Overview</h4><p>${p.overview}</p></div>
        <div class="modal-section"><h4>Problem</h4><p>${p.problem}</p></div>
        <div class="modal-section"><h4>Solution</h4><p>${p.solution}</p></div>
        <div class="modal-section"><h4>Architecture</h4><p>${p.architecture}</p></div>
        <div class="modal-section"><h4>Key Features</h4><ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul></div>
        <div class="modal-section"><h4>Results</h4><p>${p.results}</p></div>
        <a href="${p.github}" target="_blank" class="btn-small" style="margin-top:1rem">View on GitHub</a>
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
      <p>${e.institution} &middot; CGPA: ${e.cgpa}</p>
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
      <a href="assets/resumes/${r.file}" class="btn-download" download>Download</a>
    </div>
  `).join('');
}

// ========================================
// INIT
// ========================================
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

  document.getElementById('projectSearch').addEventListener('input', e => {
    searchQuery = e.target.value.toLowerCase();
    renderProjects();
  });

  document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you! I will respond within 24 hours.');
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

console.log('Portfolio loaded - Particles + all fixes active');
