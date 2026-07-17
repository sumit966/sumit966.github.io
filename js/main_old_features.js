// ========================================
// CINEMATIC INTRO CONTROL
// ========================================
let currentSlide = 0;
const totalSlides = 5;
let slideInterval;
const introOverlay = document.getElementById('introOverlay');
const slides = document.querySelectorAll('.intro-slide');
const dots = document.querySelectorAll('.intro-dots .dot');
const skipBtn = document.querySelector('.intro-skip');
const enterBtn = document.querySelector('.intro-enter');

function goToSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  currentSlide = index;
}

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    goToSlide(currentSlide + 1);
  } else {
    // Last slide - stop auto-play
    clearInterval(slideInterval);
  }
}

// Auto-play slides
setTimeout(() => {
  slideInterval = setInterval(nextSlide, 3500);
}, 1000);

// Click dots to navigate
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    clearInterval(slideInterval);
    goToSlide(index);
    // Restart auto-play from current slide
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3500);
  });
});

// Skip button
skipBtn.addEventListener('click', () => {
  clearInterval(slideInterval);
  goToSlide(totalSlides - 1);
  setTimeout(enterPortfolio, 800);
});

// Enter button (on final slide)
enterBtn.addEventListener('click', enterPortfolio);

// Click on final slide to enter
document.addEventListener('click', (e) => {
  if (currentSlide === totalSlides - 1) {
    const finalSlide = slides[totalSlides - 1];
    if (finalSlide.contains(e.target) && e.target !== enterBtn) {
      enterPortfolio();
    }
  }
});

// Keyboard controls
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    clearInterval(slideInterval);
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
      slideInterval = setInterval(nextSlide, 3500);
    }
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    clearInterval(slideInterval);
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
      slideInterval = setInterval(nextSlide, 3500);
    }
  } else if (e.key === ' ' || e.key === 'Enter') {
    if (currentSlide === totalSlides - 1) {
      e.preventDefault();
      enterPortfolio();
    }
  }
});

function enterPortfolio() {
  clearInterval(slideInterval);
  introOverlay.classList.add('hidden');
  document.getElementById('mainContent').style.display = 'block';
  // Initialize main content
  initMainContent();
}

// ========================================
// INTRO NEURAL NETWORK (Three.js)
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

// Start intro neural network when slide 4 becomes active
const slideObserver = new MutationObserver(() => {
  const slide4 = document.querySelector('.intro-slide[data-slide="3"]');
  if (slide4 && slide4.classList.contains('active')) {
    setTimeout(initIntroNeural, 300);
  }
});
document.querySelectorAll('.intro-slide').forEach(s => {
  slideObserver.observe(s, { attributes: true, attributeFilter: ['class'] });
});

// ========================================
// PARTICLES BACKGROUND
// ========================================
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.width = (Math.random() * 4 + 2) + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDelay = (Math.random() * 10) + 's';
    particle.style.animationDuration = (12 + Math.random() * 8) + 's';
    container.appendChild(particle);
  }
}
createParticles();

// ========================================
// TYPED TEXT
// ========================================
function initTyped() {
  const typedElement = document.querySelector('.typed-text');
  if (!typedElement) return;
  const roles = [
    'AI/ML Engineer',
    'DevOps Architect',
    'Data Analyst',
    'Data Scientist',
    'Full Stack Developer',
    'Backend Developer',
    'MLOps Engineer'
  ];
  let idx = 0, char = 0, deleting = false;

  function type() {
    const current = roles[idx];
    if (deleting) {
      typedElement.textContent = current.substring(0, char - 1);
      char--;
    } else {
      typedElement.textContent = current.substring(0, char + 1);
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
  1: { title: "Military Security System", tech: "Python, YOLOv8, OpenCV", desc: "Real-time surveillance with face recognition and vehicle detection.", what: "Implemented Haar Cascade for face recognition (95% accuracy), integrated YOLOv8 for vehicle tracking, configured email alerts." },
  2: { title: "Brain Tumor Detection", tech: "TensorFlow, Keras, CNN", desc: "CNN-based MRI classification with 92% accuracy.", what: "Built CNN architecture, preprocessed 3,000+ MRI scans, used transfer learning (VGG16, ResNet50)." },
  3: { title: "Mobile Botnet Detection", tech: "Python, SVM, SQLite", desc: "Android malware detection with 88% accuracy.", what: "Implemented SVM classifier, analyzed network traffic patterns, detected C&C server communication." },
  4: { title: "CI/CD Pipeline", tech: "GitHub Actions, Docker, GCP", desc: "Automated build and deployment pipeline.", what: "Built GitHub Actions workflow, created multi-stage Dockerfile, deployed on GCP Compute Engine." },
  5: { title: "MLOps Pipeline", tech: "MLflow, FastAPI, Docker", desc: "End-to-end MLOps for model deployment.", what: "Implemented MLflow tracking, built FastAPI wrapper, containerized with Docker, deployed on Cloud Run." },
  6: { title: "Real-Time Dashboard", tech: "React, Node.js, Socket.io", desc: "Live analytics dashboard with real-time updates.", what: "Built React frontend with Chart.js, WebSocket connections, MongoDB aggregation, JWT authentication." },
  7: { title: "Kubernetes Deployment", tech: "Kubernetes, Docker, GKE", desc: "Deployed containerized apps on GKE cluster.", what: "Created K8s manifests, implemented HPA, set up load balancing, used Helm charts." },
  8: { title: "Terraform IaC", tech: "Terraform, GCP, HCL", desc: "Automated GCP infrastructure provisioning.", what: "Wrote Terraform configs for VPC/subnets/firewall/instances, implemented remote state with GCS." },
  9: { title: "URL Shortener", tech: "Node.js, Express, MongoDB", desc: "High-performance URL shortening with analytics.", what: "Built REST API, implemented click tracking with geolocation, used Redis for caching." },
  10: { title: "Fintech IT Solutions", tech: "React, Node.js, AWS", desc: "SaaS platform helping startups launch MVPs.", what: "Built complete platform, integrated Stripe payments, implemented CI/CD to AWS." },
  11: { title: "NLP Sentiment Analysis", tech: "Python, BERT, FastAPI", desc: "Sentiment analysis using BERT transformer.", what: "Fine-tuned BERT on 50k reviews, achieved 88% accuracy, deployed as FastAPI REST API." },
  12: { title: "ETL Data Pipeline", tech: "Python, Airflow, PostgreSQL", desc: "Automated ETL for large-scale data batches.", what: "Built DAGs in Apache Airflow, extracted from REST APIs, transformed with Pandas, loaded to PostgreSQL." },
  13: { title: "Customer Support Chatbot", tech: "Python, Rasa, Docker", desc: "AI-powered chatbot for customer support.", what: "Built Rasa NLU pipeline, trained custom intents, integrated with Slack/WhatsApp." }
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
// MAIN CONTENT INITIALIZATION
// ========================================
function initMainContent() {
  initTyped();
  renderProjects();
  fetchGitHubRepos();
  
  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.about-card, .role-card, .skill-category, .project-card, .resume-card, .timeline-item, .edu-card, .cert-card, .contact-card, .github-repo-card').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none reverse'
      },
      duration: 0.6,
      y: 40,
      opacity: 0,
      scale: 0.95,
      delay: i * 0.05,
      ease: 'power2.out'
    });
  });
  
  gsap.from('.hero-text', {
    duration: 1,
    y: 60,
    opacity: 0,
    ease: 'power3.out'
  });
  
  gsap.from('.hero-3d-box', {
    duration: 1.2,
    scale: 0.5,
    opacity: 0,
    delay: 0.3,
    ease: 'back.out(1.7)'
  });
  
  // Vanilla Tilt
  VanillaTilt.init(document.querySelectorAll('.about-card, .role-card, .skill-category, .project-card, .resume-card, .edu-card, .cert-card, .contact-card'), {
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
  
  // Active Nav
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
  
  // Contact Form
  document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✨ Thank you for reaching out! I\'ll respond within 24 hours.');
    e.target.reset();
  });
  
  // Resume Download
  document.querySelectorAll('.btn-download').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const role = btn.dataset.resume;
      const names = {
        'ai-ml': 'AI/ML Engineer',
        'backend': 'Backend Developer',
        'data-analyst': 'Data Analyst',
        'data-scientist': 'Data Scientist',
        'fullstack': 'Full Stack Developer',
        'mlops': 'MLOps/DevOps Engineer',
        'data-validation': 'Data Validation & Compliance'
      };
      alert(`📄 ${names[role] || 'Resume'} will be available soon.\nPlease contact me directly for the complete resume.`);
    });
  });
}

console.log('🎬 Cinematic Portfolio Loaded!');
console.log('🚶 Scene 1: Walking into office');
console.log('💻 Scene 2: Laptop opening');
console.log('💻 Scene 3: Code materializing');
console.log('🧠 Scene 4: Neural Network');
console.log('👋 Scene 5: Welcome!');
