// ============================================
// 3D BACKGROUND
// ============================================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 2000;
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100 - 50;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particlesMaterial = new THREE.PointsMaterial({ color: 0x6366f1, size: 0.12, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending });
const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particleSystem);

const cubeGroup = new THREE.Group();
const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const edgesGeometry = new THREE.EdgesGeometry(cubeGeometry);
const cubeMaterial = new THREE.LineBasicMaterial({ color: 0x8b5cf6 });
const wireframe = new THREE.LineSegments(edgesGeometry, cubeMaterial);
cubeGroup.add(wireframe);
scene.add(cubeGroup);

const light = new THREE.PointLight(0x6366f1, 1);
light.position.set(10, 10, 10);
scene.add(light);
const ambientLight = new THREE.AmbientLight(0x404060);
scene.add(ambientLight);

camera.position.z = 18;

let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.008;
    cubeGroup.rotation.x = time * 0.5;
    cubeGroup.rotation.y = time * 0.8;
    particleSystem.rotation.y = time * 0.05;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================================
// TYPED TEXT
// ============================================
const typedElement = document.querySelector('.typed-text');
if (typedElement) {
    const roles = [
        '🤖 AI/ML Engineer',
        '☁️ DevOps Architect',
        '📊 Data Analyst',
        '📈 Data Scientist',
        '💻 Full Stack Developer',
        '⚙️ Backend Developer',
        '🔐 MLOps Engineer'
    ];
    let index = 0, charIndex = 0, isDeleting = false;
    
    function typeEffect() {
        const currentRole = roles[index];
        if (isDeleting) {
            typedElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % roles.length;
            setTimeout(typeEffect, 500);
            return;
        }
        setTimeout(typeEffect, isDeleting ? 80 : 120);
    }
    typeEffect();
}

// ============================================
// PROJECTS DATA - 13 PROJECTS
// ============================================
const projectDetails = {
    1: { title: "Military Security System", tech: "Python, YOLOv8, OpenCV, Haar Cascade", desc: "Real-time surveillance with face recognition and vehicle detection.", what: "Implemented Haar Cascade for face recognition (95% accuracy), integrated YOLOv8 for vehicle tracking, configured email alerts. Reduced human dependency by 60%." },
    2: { title: "Brain Tumor Detection", tech: "TensorFlow, Keras, CNN, NumPy", desc: "CNN-based MRI classification with 92% accuracy.", what: "Built CNN architecture with multiple layers, preprocessed 3,000+ MRI scans, used transfer learning (VGG16, ResNet50), achieved 92% accuracy." },
    3: { title: "Mobile Botnet Detection", tech: "Python, SVM, SQLite, Scikit-learn", desc: "Android malware detection with 88% accuracy.", what: "Implemented SVM classifier, analyzed network traffic patterns, detected C&C server communication, reduced detection latency by 60%." },
    4: { title: "CI/CD Pipeline with Docker & GCP", tech: "GitHub Actions, Docker, GCP", desc: "Automated build and deployment pipeline.", what: "Built GitHub Actions workflow, created multi-stage Dockerfile, deployed on GCP Compute Engine, reduced manual deployment by 70%." },
    5: { title: "MLOps Pipeline with MLflow", tech: "MLflow, FastAPI, Docker, GCP", desc: "End-to-end MLOps for model deployment.", what: "Implemented MLflow tracking, built FastAPI wrapper, containerized with Docker, deployed on Cloud Run with 99.5% uptime." },
    6: { title: "Real-Time Dashboard", tech: "React, Node.js, Socket.io, MongoDB", desc: "Live analytics dashboard with real-time updates.", what: "Built React frontend with Chart.js, WebSocket connections, MongoDB aggregation, JWT authentication." },
    7: { title: "Kubernetes Cluster Deployment", tech: "Kubernetes, Docker, GKE, Helm", desc: "Deployed containerized apps on GKE cluster.", what: "Created K8s manifests, implemented HPA, set up load balancing, used Helm charts for package management." },
    8: { title: "Terraform Infrastructure as Code", tech: "Terraform, GCP, HCL", desc: "Automated GCP infrastructure provisioning.", what: "Wrote Terraform configs for VPC/subnets/firewall/instances, implemented remote state with GCS bucket." },
    9: { title: "URL Shortener with Analytics", tech: "Node.js, Express, MongoDB, Redis", desc: "High-performance URL shortening with analytics.", what: "Built REST API, implemented click tracking with geolocation, used Redis for caching, JWT authentication." },
    10: { title: "Fintech IT Solutions Platform", tech: "React, Node.js, AWS, PostgreSQL", desc: "SaaS platform helping startups launch MVPs.", what: "Built complete platform from scratch, integrated Stripe payments, implemented CI/CD to AWS, serving 3 active startup clients." },
    11: { title: "NLP Sentiment Analysis", tech: "Python, NLTK, Transformers, BERT", desc: "Sentiment analysis using BERT transformer.", what: "Fine-tuned BERT on 50k reviews, preprocessed with NLTK, achieved 88% accuracy, deployed as FastAPI REST API." },
    12: { title: "ETL Data Pipeline", tech: "Python, Apache Airflow, PostgreSQL", desc: "Automated ETL for large-scale data batches.", what: "Built DAGs in Apache Airflow, extracted from REST APIs, transformed with Pandas, loaded to PostgreSQL, scheduled daily runs." },
    13: { title: "Customer Support Chatbot", tech: "Python, Rasa, Docker, GCP", desc: "AI-powered chatbot for customer support.", what: "Built Rasa NLU pipeline, trained custom intents, integrated with Slack/WhatsApp, containerized with Docker, deployed on GCP." }
};

function renderProjects() {
    const container = document.getElementById('projectsGrid');
    if (!container) return;
    const icons = ['🔐','🧠','🤖','⚙️','📊','📈','☸️','🏗️','🔗','📈','💬','🔄','🤖'];
    container.innerHTML = Object.keys(projectDetails).map(id => `
        <div class="project-card" data-project="${id}">
            <div class="project-icon">${icons[id-1]}</div>
            <h3>${projectDetails[id].title}</h3>
            <p>${projectDetails[id].desc}</p>
            <div class="project-tech">${projectDetails[id].tech.split(',').slice(0,3).map(t => `<span>${t.trim()}</span>`).join('')}</div>
            <button class="btn-small view-project">View Details →</button>
        </div>
    `).join('');
    
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.querySelector('.modal-close');
    
    document.querySelectorAll('.view-project').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.project-card');
            const id = card.dataset.project;
            const project = projectDetails[id];
            if (project) {
                modalBody.innerHTML = `
                    <span class="modal-close">&times;</span>
                    <h2 style="color:var(--primary); margin-bottom:1rem">${project.title}</h2>
                    <div class="project-tech" style="margin-bottom:1rem">${project.tech.split(',').map(t => `<span>${t.trim()}</span>`).join('')}</div>
                    <p style="margin-bottom:1rem"><strong>📋 Description:</strong> ${project.desc}</p>
                    <p style="margin-bottom:1rem"><strong>⚙️ How I Made It:</strong> ${project.what}</p>
                    <a href="https://github.com/sumit966" target="_blank" class="btn-small">View on GitHub →</a>
                `;
                modal.style.display = 'flex';
                modal.querySelector('.modal-close').addEventListener('click', () => modal.style.display = 'none');
            }
        });
    });
    window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
}
renderProjects();

// ============================================
// GITHUB REPOS
// ============================================
async function fetchGitHubRepos() {
    const container = document.getElementById('github-repos');
    if (!container) return;
    try {
        const response = await fetch('https://api.github.com/users/sumit966/repos?sort=updated&per_page=4');
        const repos = await response.json();
        if (repos.message) throw new Error(repos.message);
        container.innerHTML = repos.map(repo => `
            <div class="github-repo-card">
                <h4>${repo.name.replace(/-/g, ' ').toUpperCase()}</h4>
                <p>${repo.description || 'No description'}</p>
                <div class="github-stats">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🍴 ${repo.forks_count}</span>
                </div>
                <a href="${repo.html_url}" target="_blank" class="btn-small" style="margin-top:0.5rem">View Code →</a>
            </div>
        `).join('');
    } catch {
        container.innerHTML = '<p>Visit <a href="https://github.com/sumit966" target="_blank" style="color:var(--primary)">GitHub</a></p>';
    }
}
fetchGitHubRepos();

// ============================================
// GSAP ANIMATIONS
// ============================================
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.about-card, .role-card, .skill-category, .project-card, .timeline-item, .edu-card, .cert-card, .resume-card, .contact-card').forEach((el, i) => {
    gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        duration: 0.5,
        y: 30,
        opacity: 0,
        delay: i * 0.05
    });
});

// ============================================
// VANILLA TILT
// ============================================
VanillaTilt.init(document.querySelectorAll('.about-card, .role-card, .skill-category, .project-card, .edu-card, .cert-card, .resume-card, .contact-card'), {
    max: 10,
    speed: 400,
    glare: true,
    'max-glare': 0.2
});

// ============================================
// MOBILE NAV
// ============================================
document.querySelector('.hamburger')?.addEventListener('click', () => {
    document.querySelector('.nav-menu ul').classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-menu ul').classList.remove('active');
    });
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// CONTACT FORM
// ============================================
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✨ Thank you! I will get back to you within 24 hours.');
    e.target.reset();
});

// ============================================
// RESUME DOWNLOAD
// ============================================
document.querySelectorAll('.download-resume').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const role = btn.getAttribute('data-resume');
        const roleNames = {
            'ai-ml': 'AI/ML Engineer',
            'backend': 'Backend Developer',
            'data-analyst': 'Data Analyst',
            'data-scientist': 'Data Scientist',
            'fullstack': 'Full Stack Developer',
            'mlops': 'MLOps/DevOps Engineer',
            'data-validation': 'Data Validation & Compliance'
        };
        alert(`📄 ${roleNames[role] || 'Resume'} download will be available soon!\n\nPlease contact me directly for the complete resume.`);
    });
});

// ============================================
// SKILL BARS
// ============================================
const observerOptions = { threshold: 0.5 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-fill').forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => { bar.style.width = width; }, 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);
document.querySelectorAll('.skill-category').forEach(el => observer.observe(el));

console.log('🎬 Complete Portfolio Loaded!');
console.log('📄 7 Resumes Available for Download');
console.log('🚀 13 Projects | 7 Roles | All Skills');
