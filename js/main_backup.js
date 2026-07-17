// ============================================
// COMPLETE PORTFOLIO - Main Script
// ============================================

// ============================================
// 3D BACKGROUND
// ============================================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 4000;
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100 - 50;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particlesMaterial = new THREE.PointsMaterial({ color: 0x6366f1, size: 0.12, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending });
const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particleSystem);

// Rotating Cube
const cubeGroup = new THREE.Group();
const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const edgesGeometry = new THREE.EdgesGeometry(cubeGeometry);
const cubeMaterial = new THREE.LineBasicMaterial({ color: 0x8b5cf6 });
const wireframe = new THREE.LineSegments(edgesGeometry, cubeMaterial);
cubeGroup.add(wireframe);
for (let i = 0; i < 8; i++) {
    const smallCubeGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const smallCubeMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, emissive: 0x6366f1, emissiveIntensity: 0.5 });
    const smallCube = new THREE.Mesh(smallCubeGeo, smallCubeMat);
    const angle = (i / 8) * Math.PI * 2;
    smallCube.position.set(Math.cos(angle) * 2, Math.sin(angle * 2) * 1.5, Math.sin(angle) * 2);
    cubeGroup.add(smallCube);
}
scene.add(cubeGroup);

// Floating Spheres
const sphereGroup = new THREE.Group();
for (let i = 0; i < 20; i++) {
    const sphereGeo = new THREE.SphereGeometry(0.15, 16, 16);
    const sphereMat = new THREE.MeshStandardMaterial({ color: 0xec4899, emissive: 0xec4899, emissiveIntensity: 0.3 });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 15 - 10);
    sphereGroup.add(sphere);
}
scene.add(sphereGroup);

// Lights
const light = new THREE.PointLight(0x6366f1, 1);
light.position.set(10, 10, 10);
scene.add(light);
const ambientLight = new THREE.AmbientLight(0x404060);
scene.add(ambientLight);
const light2 = new THREE.PointLight(0xec4899, 0.5);
light2.position.set(-5, 5, 10);
scene.add(light2);

camera.position.z = 18;

let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.008;
    cubeGroup.rotation.x = time * 0.5;
    cubeGroup.rotation.y = time * 0.8;
    cubeGroup.rotation.z = time * 0.3;
    particleSystem.rotation.y = time * 0.05;
    sphereGroup.rotation.y = time * 0.1;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================================
// CURSOR
// ============================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
        cursorFollower.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
    });
}

// ============================================
// SCENE NAVIGATION
// ============================================
let currentScene = 0;
const totalScenes = 8;
let isAnimating = false;
let autoPlayTimeout;

const scenes = document.querySelectorAll('.scene');
const dots = document.querySelectorAll('.nav-dot');
const skipBtn = document.querySelector('.skip-btn');

function goToScene(index) {
    if (isAnimating || index === currentScene) return;
    if (index < 0 || index >= totalScenes) return;
    isAnimating = true;
    scenes[currentScene].classList.remove('active');
    dots[currentScene].classList.remove('active');
    currentScene = index;
    scenes[currentScene].classList.add('active');
    dots[currentScene].classList.add('active');
    if (currentScene === 3) initNeuralNetwork();
    if (currentScene === 4) initLogoParticles();
    if (currentScene === 5) initProjects();
    if (currentScene === 6) initCharts();
    setTimeout(() => { isAnimating = false; }, 1500);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearTimeout(autoPlayTimeout);
        goToScene(index);
    });
});

skipBtn.addEventListener('click', () => {
    clearTimeout(autoPlayTimeout);
    goToScene(totalScenes - 1);
});

function autoPlay() {
    if (currentScene < totalScenes - 1) {
        autoPlayTimeout = setTimeout(() => {
            goToScene(currentScene + 1);
            autoPlay();
        }, 3500);
    }
}
setTimeout(autoPlay, 3000);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        clearTimeout(autoPlayTimeout);
        goToScene(Math.min(currentScene + 1, totalScenes - 1));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        clearTimeout(autoPlayTimeout);
        goToScene(Math.max(currentScene - 1, 0));
    } else if (e.key === ' ') {
        e.preventDefault();
        clearTimeout(autoPlayTimeout);
        goToScene(totalScenes - 1);
    }
});

// ============================================
// SCENE 3: Code Rain
// ============================================
function initCodeRain() {
    const container = document.getElementById('codeRain');
    if (!container) return;
    const codeStrings = [
        'def train_model():', 'import numpy as np',
        'from sklearn.ensemble import RandomForestClassifier',
        'model.fit(X_train, y_train)', 'accuracy = 0.95',
        'docker build -t app .', 'kubectl apply -f deployment.yaml',
        'git push origin main', 'terraform plan',
        'python manage.py runserver', 'npm start',
        'pip install -r requirements.txt'
    ];
    for (let i = 0; i < 30; i++) {
        const span = document.createElement('span');
        span.textContent = codeStrings[i % codeStrings.length];
        span.style.left = Math.random() * 95 + '%';
        span.style.fontSize = (0.5 + Math.random() * 0.5) + 'rem';
        span.style.animationDelay = (Math.random() * 5) + 's';
        span.style.animationDuration = (3 + Math.random() * 3) + 's';
        span.style.opacity = 0.2 + Math.random() * 0.4;
        container.appendChild(span);
    }
}
setTimeout(initCodeRain, 3000);

// ============================================
// SCENE 4: Neural Network
// ============================================
let neuralScene, neuralCamera, neuralRenderer;
let neuralNodes = [], neuralEdges = [];

function initNeuralNetwork() {
    const canvas = document.getElementById('neuralCanvas');
    if (!canvas || neuralScene) return;
    const container = canvas.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
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
        nodePositions.push({x, y, z});
        const geometry = new THREE.SphereGeometry(0.15 + Math.random() * 0.2, 16, 16);
        const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(0.7 + Math.random() * 0.2, 0.8, 0.6),
            emissive: new THREE.Color().setHSL(0.7 + Math.random() * 0.2, 0.8, 0.3),
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
            color: new THREE.Color().setHSL(0.7 + Math.random() * 0.2, 0.8, 0.5),
            transparent: true,
            opacity: 0.3 + Math.random() * 0.3
        });
        const line = new THREE.Line(geometry, material);
        neuralScene.add(line);
        neuralEdges.push(line);
    }
    
    const light = new THREE.PointLight(0x6366f1, 1);
    light.position.set(10, 10, 10);
    neuralScene.add(light);
    const ambientLight = new THREE.AmbientLight(0x404060);
    neuralScene.add(ambientLight);
    
    let neuralTime = 0;
    function animateNeural() {
        if (!document.getElementById('neuralCanvas')) return;
        requestAnimationFrame(animateNeural);
        neuralTime += 0.01;
        neuralNodes.forEach((node, i) => {
            const speed = 0.5 + (i % 3) * 0.3;
            node.position.x += Math.sin(neuralTime * speed + i) * 0.005;
            node.position.y += Math.cos(neuralTime * speed * 0.7 + i * 0.5) * 0.005;
            node.position.z += Math.sin(neuralTime * speed * 0.5 + i * 0.3) * 0.005;
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

// ============================================
// SCENE 5: Logo Particles
// ============================================
function initLogoParticles() {
    const container = document.querySelector('.logo-particles');
    if (!container) return;
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(99,102,241,${0.1 + Math.random() * 0.4});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${2 + Math.random() * 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        container.appendChild(particle);
    }
}

// ============================================
// SCENE 6: Projects
// ============================================
function initProjects() {
    document.querySelectorAll('.project-fly').forEach((card, i) => {
        card.style.opacity = '0';
        setTimeout(() => { card.style.opacity = '1'; }, i * 300 + 100);
    });
}

// ============================================
// SCENE 7: Charts
// ============================================
function initCharts() {
    document.querySelectorAll('.chart-bar').forEach((bar, i) => {
        const height = bar.style.height;
        bar.style.height = '0%';
        setTimeout(() => { bar.style.height = height; }, 200 + i * 100);
    });
}

// ============================================
// PROJECTS DATA
// ============================================
const projectDetails = {
    1: { title: "Military Security System", tech: "Python, YOLOv8, OpenCV, Haar Cascade", desc: "Real-time surveillance system with face recognition and vehicle detection for military zones.", what: "Implemented Haar Cascade for face recognition, integrated YOLOv8 for real-time vehicle detection and tracking, configured automated email alerts with images and timestamps. Reduced human dependency by 60%." },
    2: { title: "Brain Tumor Detection", tech: "TensorFlow, Keras, CNN, NumPy", desc: "CNN-based MRI classification for brain tumor detection with 95% accuracy.", what: "Built CNN architecture with multiple convolutional layers, preprocessed and augmented MRI datasets, used TensorFlow/Keras for training, achieved high accuracy through hyperparameter tuning." },
    3: { title: "Mobile Botnet Detection", tech: "Python, SVM, SQLite, Scikit-learn", desc: "Android malware detection system identifying botnet communication with 92% accuracy.", what: "Implemented SVM algorithm for bot classification, detected malicious iBots communicating with C&C servers, used SQLite for data storage, automated threat detection." },
    4: { title: "CI/CD Pipeline with Docker & GCP", tech: "GitHub Actions, Docker, GCP, YAML", desc: "Automated build and deployment pipeline for containerized applications.", what: "Built GitHub Actions workflow, created multi-stage Dockerfile, deployed on GCP Compute Engine, reduced manual deployment effort by 70%." },
    5: { title: "MLOps Pipeline with MLflow", tech: "MLflow, FastAPI, Docker, GCP", desc: "End-to-end MLOps pipeline for model training, versioning, and deployment.", what: "Implemented MLflow for experiment tracking, built FastAPI wrapper for model serving, containerized with Docker, deployed on GCP Cloud Run with 99.5% uptime." },
    6: { title: "Real-Time Dashboard", tech: "React, Node.js, Socket.io, MongoDB", desc: "Real-time analytics dashboard with live data visualization.", what: "Built React frontend with Chart.js, WebSocket connections with Socket.io, MongoDB aggregation pipeline, JWT authentication." },
    7: { title: "Kubernetes Cluster Deployment", tech: "Kubernetes, Docker, GKE, Helm", desc: "Deployed and managed containerized applications on GKE cluster.", what: "Created Kubernetes manifests, implemented HPA based on CPU metrics, set up load balancing and rolling updates, used Helm charts." },
    8: { title: "Terraform Infrastructure as Code", tech: "Terraform, GCP, HCL", desc: "Automated GCP infrastructure provisioning with Terraform.", what: "Wrote Terraform configurations for VPC/subnets/firewall/instances, implemented remote state with GCS bucket, created reusable modules." },
    9: { title: "URL Shortener with Analytics", tech: "Node.js, Express, MongoDB, Redis", desc: "High-performance URL shortening service with click analytics.", what: "Built REST API with Express.js, implemented click tracking with geolocation, used Redis for caching and rate limiting, JWT authentication." },
    10: { title: "Fintech IT Solutions Platform", tech: "React, Node.js, AWS, PostgreSQL", desc: "SaaS platform helping startups launch MVPs quickly.", what: "Built complete platform from scratch, integrated Stripe payments, implemented CI/CD with GitHub Actions to AWS, serving 3 active startup clients." },
    11: { title: "NLP Sentiment Analysis", tech: "Python, NLTK, Transformers, BERT", desc: "Sentiment analysis model for customer reviews using BERT transformer.", what: "Fine-tuned BERT model on 50k customer reviews, preprocessed text data with NLTK, achieved 88% accuracy, deployed as REST API with FastAPI." },
    12: { title: "ETL Data Pipeline", tech: "Python, Apache Airflow, PostgreSQL", desc: "Automated ETL pipeline for processing large-scale data batches.", what: "Built DAGs in Apache Airflow, extracted data from REST APIs, transformed with Pandas, loaded to PostgreSQL, scheduled daily runs with monitoring." },
    13: { title: "Customer Support Chatbot", tech: "Python, Rasa, Docker, GCP", desc: "AI-powered chatbot for customer support automation.", what: "Built Rasa NLU pipeline, trained custom intents and entities, integrated with Slack/WhatsApp, containerized with Docker, deployed on GCP." }
};

// Render projects
function renderProjects() {
    const container = document.getElementById('projectsGrid');
    if (!container) return;
    const projectsHTML = Object.keys(projectDetails).map(id => `
        <div class="project-detailed-card" data-project="${id}">
            <div class="project-header">
                <div class="project-icon">${id <= 3 ? ['🔐','🧠','🤖'][id-1] : id <= 6 ? ['⚙️','📊','📈'][id-4] : id <= 9 ? ['☸️','🏗️','🔗'][id-7] : id <= 12 ? ['📈','💬','🔄'][id-10] : '🤖'}</div>
                <div>
                    <h3>${projectDetails[id].title}</h3>
                    <div class="project-tech-badges">${projectDetails[id].tech.split(',').slice(0,3).map(t => `<span>${t.trim()}</span>`).join('')}</div>
                </div>
            </div>
            <p>${projectDetails[id].desc}</p>
            <button class="btn-small view-project">View Details →</button>
        </div>
    `).join('');
    container.innerHTML = projectsHTML;
}
renderProjects();

// Project Modal
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');

document.addEventListener('click', (e) => {
    const btn = e.target.closest('.view-project');
    if (btn) {
        const card = btn.closest('.project-detailed-card');
        const id = card.getAttribute('data-project');
        const project = projectDetails[id];
        if (project) {
            modalBody.innerHTML = `
                <h2 style="color:var(--primary); margin-bottom:1rem">${project.title}</h2>
                <div class="project-tech-badges" style="margin-bottom:1rem">${project.tech.split(',').map(t => `<span>${t.trim()}</span>`).join('')}</div>
                <p style="margin-bottom:1rem"><strong>📋 Description:</strong> ${project.desc}</p>
                <p style="margin-bottom:1rem"><strong>⚙️ How I Made It:</strong> ${project.what}</p>
                <a href="https://github.com/sumit966" target="_blank" class="btn-small" style="margin-top:1rem">View on GitHub →</a>
            `;
            modal.style.display = 'flex';
        }
    }
});

modalClose.addEventListener('click', () => { modal.style.display = 'none'; });
window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

// ============================================
// GITHUB REPOS
// ============================================
async function fetchGitHubRepos() {
    const container = document.getElementById('github-repos');
    if (!container) return;
    try {
        const response = await fetch('https://api.github.com/users/sumit966/repos?sort=updated&per_page=6');
        const repos = await response.json();
        if (repos.message) throw new Error(repos.message);
        container.innerHTML = repos.map(repo => `
            <div class="github-repo-card">
                <h4>${repo.name.replace(/-/g, ' ').toUpperCase()}</h4>
                <p>${repo.description || 'No description'}</p>
                <div class="github-stats-small">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🍴 ${repo.forks_count}</span>
                    <span>📅 ${new Date(repo.updated_at).toLocaleDateString()}</span>
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
// CONTACT FORM
// ============================================
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✨ Thank you for reaching out! I will get back to you within 24 hours.');
    e.target.reset();
});

// ============================================
// RESUME DOWNLOAD
// ============================================
document.querySelectorAll('.download-resume').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('📄 Resume download will be available soon. Please contact me directly!');
    });
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
// GSAP SCROLL ANIMATIONS
// ============================================
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.role-card, .skill-category, .project-detailed-card, .timeline-item, .activity-card, .edu-card, .cert-card, .contact-card').forEach((el, i) => {
    gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        duration: 0.5,
        y: 30,
        opacity: 0,
        delay: i * 0.05
    });
});

// ============================================
// SKILL BARS ANIMATION
// ============================================
const observerOptions = { threshold: 0.5 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-level').forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => { bar.style.width = width; }, 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);
document.querySelectorAll('.skill-category').forEach(el => observer.observe(el));

console.log('🎬 Complete Cinematic Portfolio Loaded!');
console.log('✨ 13 Projects | 8 Scenes | All Sections');
