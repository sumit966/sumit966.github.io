// ========================================
// CINEMATIC INTRO - FIXED
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

// Auto-play
setTimeout(() => {
  introInterval = setInterval(nextScene, 3500);
}, 1000);

// Dots click
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    clearInterval(introInterval);
    goToScene(index);
    introInterval = setInterval(nextScene, 3500);
  });
});

// Skip button
skipBtn.addEventListener('click', () => {
  clearInterval(introInterval);
  goToScene(totalScenes - 1);
  setTimeout(enterPortfolio, 800);
});

// Enter button
enterBtn.addEventListener('click', enterPortfolio);

// Click on final scene to enter
document.addEventListener('click', (e) => {
  if (currentScene === totalScenes - 1) {
    const final = scenes[totalScenes - 1];
    if (final.contains(e.target) && e.target !== enterBtn) {
      enterPortfolio();
    }
  }
});

// Keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    clearInterval(introInterval);
    if (currentScene < totalScenes - 1) {
      goToScene(currentScene + 1);
      introInterval = setInterval(nextScene, 3500);
    }
  } else if (e.key === ' ' || e.key === 'Enter') {
    if (currentScene === totalScenes - 1) {
      e.preventDefault();
      enterPortfolio();
    }
  }
});

function enterPortfolio() {
  clearInterval(introInterval);
  introOverlay.classList.add('hidden');
  document.getElementById('mainContent').style.display = 'block';
  initMainContent();
}

// ========================================
// INTRO NEURAL NETWORK
// ========================================
let introNeuralScene, introNeuralCamera, introNeuralRenderer;
let introNeuralNodes = [], introNeuralEdges = [];

function initIntroNeural() {
  const canvas = document.getElementById('introNeuralCanvas');
  if (!canvas || introNeuralScene) return;
  
  const container = canvas.parentElement;
  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;
  
  introNeuralScene = new THREE.Scene();
  introNeuralCamera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  introNeuralRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  introNeuralRenderer.setSize(width, height);
  introNeuralRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  introNeuralCamera.position.z = 15;
  
  const nodePositions = [];
  for (let i = 0; i < 30; i++) {
    const x = (Math.random() - 0.5) * 20;
    const y = (Math.random() - 0.5) * 15;
    const z = (Math.random() - 0.5) * 10;
    nodePositions.push({x, y, z});
    const geometry = new THREE.SphereGeometry(0.15 + Math.random() * 0.2, 12, 12);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(0.5 + Math.random() * 0.2, 0.8, 0.6),
      emissive: new THREE.Color().setHSL(0.5 + Math.random() * 0.2, 0.8, 0.3),
      emissiveIntensity: 0.5
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x, y, z);
    introNeuralScene.add(sphere);
    introNeuralNodes.push(sphere);
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
    introNeuralScene.add(line);
    introNeuralEdges.push(line);
  }
  
  const light = new THREE.PointLight(0x06b6d4, 1);
  light.position.set(10, 10, 10);
  introNeuralScene.add(light);
  const ambientLight = new THREE.AmbientLight(0x404060);
  introNeuralScene.add(ambientLight);
  
  let neuralTime = 0;
  function animateIntroNeural() {
    if (!document.getElementById('introNeuralCanvas')) return;
    requestAnimationFrame(animateIntroNeural);
    neuralTime += 0.01;
    introNeuralNodes.forEach((node, i) => {
      const speed = 0.5 + (i % 3) * 0.3;
      node.position.x += Math.sin(neuralTime * speed + i) * 0.005;
      node.position.y += Math.cos(neuralTime * speed * 0.7 + i * 0.5) * 0.005;
      const scale = 1 + Math.sin(neuralTime * 2 + i) * 0.2;
      node.scale.set(scale, scale, scale);
    });
    introNeuralEdges.forEach((edge, i) => {
      edge.material.opacity = 0.2 + Math.sin(neuralTime * 1.5 + i * 0.5) * 0.2;
    });
    introNeuralScene.rotation.x = Math.sin(neuralTime * 0.1) * 0.1;
    introNeuralScene.rotation.y = neuralTime * 0.1;
    introNeuralRenderer.render(introNeuralScene, introNeuralCamera);
  }
  animateIntroNeural();
}

// Check when scene 4 becomes active
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
    const theme = btn.dataset.theme;
    const colors = themes[theme];
    if (colors) {
      document.documentElement.style.setProperty('--primary', colors.primary);
      document.documentElement.style.setProperty('--secondary', colors.secondary);
      document.documentElement.style.setProperty('--accent', colors.accent);
      document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      localStorage.setItem('theme', theme);
    }
  });
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme && themes[savedTheme]) {
  const colors = themes[savedTheme];
  document.documentElement.style.setProperty('--primary', colors.primary);
  document.documentElement.style.setProperty('--secondary', colors.secondary);
  document.documentElement.style.setProperty('--accent', colors.accent);
  document.querySelectorAll('.theme-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.theme === savedTheme);
  });
}

// ========================================
// CHATBOT
// ========================================
const chatbotContainer = document.getElementById('chatbot');
const chatFloat = document.getElementById('chatFloat');
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotClose = document.getElementById('chatbotClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');

const botResponses = {
  'skills': "Sumit has expertise in Python, Java, TensorFlow, Docker, Kubernetes, GCP, React, Node.js! 🚀",
  'experience': "He worked as Software Engineer Intern at Salesforce and is now Founder of Fintech IT Solutions. 💼",
  'projects': "He has 13+ projects including Military Security System, Brain Tumor Detection, and CI/CD Pipeline! 🔐",
  'education': "Sumit has M.Tech in Applied AI & ML from VNIT Nagpur and B.E. in Computer Science. 🎓",
  'roles': "He works as AI/ML Engineer, DevOps Architect, Data Analyst, Data Scientist, Full Stack, Backend, MLOps! 💪",
  'contact': "Email: info.sr0909@gmail.com | Phone: +91 9472441137 📧",
};

function getBotResponse(input) {
  const lower = input.toLowerCase();
  if (lower.includes('skill') || lower.includes('language')) return botResponses.skills;
  if (lower.includes('experience') || lower.includes('work')) return botResponses.experience;
  if (lower.includes('project')) return botResponses.projects;
  if (lower.includes('education') || lower.includes('study')) return botResponses.education;
  if (lower.includes('role') || lower.includes('position')) return botResponses.roles;
  if (lower.includes('contact') || lower.includes('email')) return botResponses.contact;
  return "That's a great question! I'm still learning. You can contact Sumit directly for more details. 😊";
}

chatFloat.addEventListener('click', () => {
  chatbotContainer.classList.toggle('open');
  chatFloat.style.display = 'none';
});

chatbotToggle.addEventListener('click', () => {
  chatbotContainer.classList.toggle('open');
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
  }, 600);
}

chatSend.addEventListener('click', sendChat);
chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendChat(); });

// ========================================
// TYPED TEXT
// ========================================
function initTyped() {
  const el = document.querySelector('.typed-text');
  if (!el) return;
  const roles = ['AI/ML Engineer', 'DevOps Architect', 'Data Analyst', 'Data Scientist', 'Full Stack Developer', 'Backend Developer', 'MLOps Engineer'];
  let idx = 0, char = 0, deleting = false;
  function type() {
    const current = roles[idx];
    if (deleting) {
      el.textContent = current.substring(0, char - 1);
      char--;
    } else {
      el.textContent = current.substring(0, char + 1);
      char++;
    }
    if (!deleting && char === current.length) {
      deleting = true;
      setTimeout(type, 2000);
      return;
    }
    if (deleting && char === 0) {
      deleting = false;
      idx = (idx + 1) % roles.length;
      setTimeout(type, 400);
      return;
    }
    setTimeout(type, deleting ? 60 : 90);
  }
  type();
}

// ========================================
// PROJECTS
// ========================================
const projects = {
  1: { title: "Military Security System", tech: "Python, YOLOv8, OpenCV", desc: "Real-time surveillance with face recognition.", what: "Implemented Haar Cascade (95% accuracy), integrated YOLOv8, configured email alerts." },
  2: { title: "Brain Tumor Detection", tech: "TensorFlow, Keras, CNN", desc: "CNN-based MRI classification with 92% accuracy.", what: "Built CNN, preprocessed 3,000+ MRI scans, used transfer learning." },
  3: { title: "Mobile Botnet Detection", tech: "Python, SVM, SQLite", desc: "Android malware detection with 88% accuracy.", what: "Implemented SVM classifier, analyzed network traffic patterns." },
  4: { title: "CI/CD Pipeline", tech: "GitHub Actions, Docker, GCP", desc: "Automated build and deployment pipeline.", what: "Built GitHub Actions workflow, created multi-stage Dockerfile." },
  5: { title: "MLOps Pipeline", tech: "MLflow, FastAPI, Docker", desc: "End-to-end MLOps for model deployment.", what: "Implemented MLflow tracking, built FastAPI wrapper." },
  6: { title: "Real-Time Dashboard", tech: "React, Node.js, Socket.io", desc: "Live analytics dashboard with real-time updates.", what: "Built React frontend, WebSocket connections, MongoDB aggregation." },
  7: { title: "Kubernetes Deployment", tech: "Kubernetes, Docker, GKE", desc: "Deployed containerized apps on GKE cluster.", what: "Created K8s manifests, implemented HPA, set up load balancing." },
  8: { title: "Terraform IaC", tech: "Terraform, GCP, HCL", desc: "Automated GCP infrastructure provisioning.", what: "Wrote Terraform configs for VPC/subnets/firewall/instances." },
  9: { title: "URL Shortener", tech: "Node.js, Express, MongoDB", desc: "High-performance URL shortening with analytics.", what: "Built REST API, implemented click tracking, used Redis." },
  10: { title: "Fintech IT Solutions", tech: "React, Node.js, AWS", desc: "SaaS platform helping startups launch MVPs.", what: "Built complete platform, integrated Stripe, implemented CI/CD." },
  11: { title: "NLP Sentiment Analysis", tech: "Python, BERT, FastAPI", desc: "Sentiment analysis using BERT transformer.", what: "Fine-tuned BERT on 50k reviews, achieved 88% accuracy." },
  12: { title: "ETL Data Pipeline", tech: "Python, Airflow, PostgreSQL", desc: "Automated ETL for large-scale data batches.", what: "Built DAGs in Airflow, extracted from REST APIs." },
  13: { title: "Customer Support Chatbot", tech: "Python, Rasa, Docker", desc: "AI-powered chatbot for customer support.", what: "Built Rasa NLU pipeline, trained custom intents." }
};

function renderProjects() {
  const container = document.getElementById('projectsGrid');
  if (!container) return;
  const icons = ['🔐','🧠','🤖','⚙️','📊','📈','☸️','🏗️','🔗','📈','💬','🔄','🤖'];
  container.innerHTML = Object.keys(projects).map(id => `
    <div class="project-card" data-project="${id}">
      <div class="project-icon">${icons[id-1]}</div>
      <h3>${projects[id].title}</h3>
      <p>${projects[id].desc}</p>
      <div class="project-tags">${projects[id].tech.split(',').slice(0,3).map(t => `<span>${t.trim()}</span>`).join('')}</div>
      <button class="btn-small view-project">View Details →</button>
    </div>
  `).join('');

  const modal = document.getElementById('projectModal');
  const body = document.getElementById('modal-body');
  const close = document.querySelector('.modal-close');

  document.querySelectorAll('.view-project').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.project-card');
      const id = card.dataset.project;
      const p = projects[id];
      if (p) {
        body.innerHTML = `
          <span class="modal-close">&times;</span>
          <h2 style="color:var(--primary)">${p.title}</h2>
          <div class="project-tags" style="margin:0.5rem 0">${p.tech.split(',').map(t => `<span>${t.trim()}</span>`).join('')}</div>
          <p><strong>📋 Description:</strong> ${p.desc}</p>
          <p><strong>⚙️ How I Made It:</strong> ${p.what}</p>
          <a href="https://github.com/sumit966" target="_blank" class="btn-small" style="margin-top:1rem">View on GitHub →</a>
        `;
        modal.style.display = 'flex';
        modal.querySelector('.modal-close').addEventListener('click', () => modal.style.display = 'none');
      }
    });
  });
  window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
}

// ========================================
// GITHUB
// ========================================
async function fetchGitHubRepos() {
  const container = document.getElementById('github-repos');
  if (!container) return;
  try {
    const res = await fetch('https://api.github.com/users/sumit966/repos?sort=updated&per_page=4');
    const repos = await res.json();
    if (repos.message) throw new Error(repos.message);
    container.innerHTML = repos.map(repo => `
      <div class="github-repo-card">
        <h4>${repo.name.replace(/-/g, ' ').toUpperCase()}</h4>
        <p>${repo.description || 'No description'}</p>
        <div class="github-stats">
          <span>⭐ ${repo.stargazers_count}</span>
          <span>🍴 ${repo.forks_count}</span>
        </div>
        <a href="${repo.html_url}" target="_blank" class="btn-small" style="margin-top:0.5rem">View →</a>
      </div>
    `).join('');
  } catch {
    container.innerHTML = '<p>Visit <a href="https://github.com/sumit966" target="_blank" style="color:var(--primary)">GitHub</a></p>';
  }
}

// ========================================
// MAIN CONTENT INIT
// ========================================
function initMainContent() {
  initTyped();
  renderProjects();
  fetchGitHubRepos();
  
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.about-card, .role-card, .skill-category, .project-card, .resume-card, .timeline-item, .edu-card, .cert-card, .contact-card, .testimonial-card').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
      duration: 0.5,
      y: 30,
      opacity: 0,
      delay: i * 0.05,
      ease: 'power2.out'
    });
  });
  
  gsap.from('.hero-text', { duration: 0.8, y: 50, opacity: 0, ease: 'power3.out' });
  gsap.from('.hero-3d-box', { duration: 1, scale: 0.5, opacity: 0, delay: 0.3, ease: 'back.out(1.7)' });
  
  VanillaTilt.init(document.querySelectorAll('.about-card, .role-card, .skill-category, .project-card, .resume-card, .edu-card, .cert-card, .contact-card, .testimonial-card'), {
    max: 8,
    speed: 400,
    glare: true,
    'max-glare': 0.15
  });
  
  // Mobile Nav
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
    document.querySelectorAll('section').forEach(section => {
      const top = section.offsetTop - 200;
      if (scrollY >= top) current = section.getAttribute('id');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  });
  
  document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✨ Thank you for reaching out! I\'ll respond within 24 hours.');
    e.target.reset();
  });
  
  document.querySelectorAll('.btn-download').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const names = {
        'ai-ml': 'AI/ML Engineer',
        'backend': 'Backend Developer',
        'data-analyst': 'Data Analyst',
        'data-scientist': 'Data Scientist',
        'fullstack': 'Full Stack Developer',
        'mlops': 'MLOps/DevOps Engineer'
      };
      alert(`📄 ${names[btn.dataset.resume] || 'Resume'} will be available soon!\nPlease contact me directly.`);
    });
  });
}

console.log('🎬 Cinematic Portfolio LOADED!');
console.log('✨ Working features: Intro, Theme Switcher, Chatbot, Projects, and more!');
// ========================================
// ADD GENERATIVE AI PROJECTS
// ========================================

// Update projects with Generative AI projects
const genAIProjects = {
  14: { title: "RAG-Powered Document Q&A System", tech: "LangChain, OpenAI, ChromaDB, Python", desc: "Retrieval-Augmented Generation system for document question-answering using vector databases and LLMs.", what: "Built a RAG pipeline using LangChain with ChromaDB for embeddings, integrated OpenAI GPT-4 for generation, deployed as FastAPI service with Streamlit UI." },
  15: { title: "Prompt Engineering Playground", tech: "React, FastAPI, OpenAI, Python", desc: "Interactive platform for testing and optimizing prompts for various LLM models with chain-of-thought reasoning.", what: "Built React frontend with real-time prompt testing, FastAPI backend with multiple LLM integrations, implemented few-shot learning and chain-of-thought examples." },
  16: { title: "AI-Powered Code Assistant", tech: "Python, LangChain, Docker, FastAPI", desc: "Intelligent code assistant that helps with debugging, code generation, and documentation using LLMs.", what: "Built LangChain agent with code-specific tools, integrated with OpenAI API, containerized with Docker, deployed as API service." },
  17: { title: "Text-to-SQL Generator", tech: "Python, LangChain, PostgreSQL, Streamlit", desc: "Convert natural language questions to SQL queries using LLMs with schema-aware prompting.", what: "Fine-tuned prompts for SQL generation, built Streamlit UI, integrated with PostgreSQL for query execution, implemented error handling." },
  18: { title: "AI Meeting Summarizer", tech: "Python, Whisper, LangChain, FastAPI", desc: "Transcribe and summarize meeting recordings using Whisper and LLMs with RAG for context.", what: "Integrated Whisper for transcription, built LangChain summarization chain, created FastAPI endpoints, deployed with Docker." }
};

// Merge with existing projects
const allProjects = { ...projects, ...genAIProjects };

// Update renderProjects function
function renderProjects() {
  const container = document.getElementById('projectsGrid');
  if (!container) return;
  const icons = ['🔐','🧠','🤖','⚙️','📊','📈','☸️','🏗️','🔗','📈','💬','🔄','🤖','📚','✍️','💻','🗄️','📝'];
  const allKeys = Object.keys(allProjects);
  container.innerHTML = allKeys.map(id => `
    <div class="project-card" data-project="${id}">
      <div class="project-icon">${icons[id-1]}</div>
      <h3>${allProjects[id].title}</h3>
      <p>${allProjects[id].desc}</p>
      <div class="project-tags">${allProjects[id].tech.split(',').slice(0,3).map(t => `<span>${t.trim()}</span>`).join('')}</div>
      <button class="btn-small view-project">View Details →</button>
    </div>
  `).join('');

  const modal = document.getElementById('projectModal');
  const body = document.getElementById('modal-body');
  const close = document.querySelector('.modal-close');

  document.querySelectorAll('.view-project').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.project-card');
      const id = card.dataset.project;
      const p = allProjects[id];
      if (p) {
        body.innerHTML = `
          <span class="modal-close">&times;</span>
          <h2 style="color:var(--primary)">${p.title}</h2>
          <div class="project-tags" style="margin:0.5rem 0">${p.tech.split(',').map(t => `<span>${t.trim()}</span>`).join('')}</div>
          <p><strong>📋 Description:</strong> ${p.desc}</p>
          <p><strong>⚙️ How I Made It:</strong> ${p.what}</p>
          <a href="https://github.com/sumit966" target="_blank" class="btn-small" style="margin-top:1rem">View on GitHub →</a>
        `;
        modal.style.display = 'flex';
        modal.querySelector('.modal-close').addEventListener('click', () => modal.style.display = 'none');
      }
    });
  });
  window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
}

// Override the projects object with allProjects
Object.assign(projects, genAIProjects);

console.log('🧠 Generative AI Projects Added!');
console.log('📚 Total Projects:', Object.keys(allProjects).length);
