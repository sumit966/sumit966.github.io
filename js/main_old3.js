// ============================================
// INTRO SYSTEM
// ============================================
let introScene = 0;
const totalIntroScenes = 5;
let introInterval;

const introOverlay = document.getElementById('introOverlay');
const introScenes = document.querySelectorAll('.intro-scene');
const introDots = document.querySelectorAll('.intro-dot');
const introSkip = document.querySelector('.intro-skip');

function goToIntroScene(index) {
    introScenes.forEach((scene, i) => {
        scene.classList.toggle('active', i === index);
    });
    introDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    introScene = index;
}

function nextIntroScene() {
    if (introScene < totalIntroScenes - 1) {
        goToIntroScene(introScene + 1);
    } else {
        // Intro complete - show main content
        clearInterval(introInterval);
        setTimeout(hideIntro, 500);
    }
}

function hideIntro() {
    introOverlay.classList.add('hidden');
    document.getElementById('mainContent').style.display = 'block';
    // Initialize main content
    initMainContent();
}

// Auto-play intro
setTimeout(() => {
    introInterval = setInterval(nextIntroScene, 3000);
}, 1500);

// Skip intro
introSkip.addEventListener('click', () => {
    clearInterval(introInterval);
    goToIntroScene(totalIntroScenes - 1);
    setTimeout(hideIntro, 500);
});

// Click to skip (anywhere)
introOverlay.addEventListener('click', (e) => {
    if (e.target === introOverlay) {
        clearInterval(introInterval);
        goToIntroScene(totalIntroScenes - 1);
        setTimeout(hideIntro, 500);
    }
});

// Keyboard skip
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
        if (!introOverlay.classList.contains('hidden')) {
            clearInterval(introInterval);
            goToIntroScene(totalIntroScenes - 1);
            setTimeout(hideIntro, 500);
        }
    }
});

// ============================================
// INTRO NEURAL NETWORK (Three.js)
// ============================================
let introNeuralScene, introNeuralCamera, introNeuralRenderer;
let introNeuralNodes = [], introNeuralEdges = [];

function initIntroNeural() {
    const canvas = document.getElementById('introNeural');
    if (!canvas || introNeuralScene) return;
    
    const container = canvas.parentElement;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 250;
    
    introNeuralScene = new THREE.Scene();
    introNeuralCamera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    introNeuralRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    introNeuralRenderer.setSize(width, height);
    introNeuralRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    introNeuralCamera.position.z = 12;
    
    const nodePositions = [];
    for (let i = 0; i < 20; i++) {
        const x = (Math.random() - 0.5) * 16;
        const y = (Math.random() - 0.5) * 10;
        const z = (Math.random() - 0.5) * 8;
        nodePositions.push({x, y, z});
        const geometry = new THREE.SphereGeometry(0.15 + Math.random() * 0.15, 12, 12);
        const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(0.7 + Math.random() * 0.2, 0.8, 0.6),
            emissive: new THREE.Color().setHSL(0.7 + Math.random() * 0.2, 0.8, 0.3),
            emissiveIntensity: 0.5
        });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(x, y, z);
        introNeuralScene.add(sphere);
        introNeuralNodes.push(sphere);
    }
    
    for (let i = 0; i < 50; i++) {
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
        introNeuralScene.add(line);
        introNeuralEdges.push(line);
    }
    
    const light = new THREE.PointLight(0x6366f1, 1);
    light.position.set(10, 10, 10);
    introNeuralScene.add(light);
    const ambientLight = new THREE.AmbientLight(0x404060);
    introNeuralScene.add(ambientLight);
    
    let neuralTime = 0;
    function animateIntroNeural() {
        if (!document.getElementById('introNeural')) return;
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

// Start intro neural network
setTimeout(initIntroNeural, 500);

// ============================================
// MAIN CONTENT - Initialize after intro
// ============================================
function initMainContent() {
    // 3D Background
    init3DBackground();
    // Typed text
    initTyped();
    // Projects
    renderProjects();
    // GitHub repos
    fetchGitHubRepos();
    // GSAP animations
    initGSAPAnimations();
    // Vanilla Tilt
    VanillaTilt.init(document.querySelectorAll('.about-card, .project-card, .skill-category, .edu-card, .cert-card, .contact-card'), {
        max: 10,
        speed: 400,
        glare: true,
        'max-glare': 0.2
    });
    // Mobile nav
    initMobileNav();
    // Smooth scroll
    initSmoothScroll();
    // Contact form
    initContactForm();
    // Resume download
    initResumeDownload();
    // Skill bars
    initSkillBars();
}

// ============================================
// 3D BACKGROUND
// ============================================
function init3DBackground() {
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
}

// ============================================
// TYPED TEXT
// ============================================
function initTyped() {
    const typedElement = document.querySelector('.typed-text');
    if (!typedElement) return;
    const roles = [
        '🤖 AI/ML Engineer',
        '☁️ DevOps Architect',
        '📊 Data Analyst',
        '💻 Full Stack Developer',
        '🚀 Cloud Engineer'
    ];
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    
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
// PROJECTS DATA
// ============================================
const projectDetails = {
    1: { title: "Military Security System", tech: "Python, YOLOv8, OpenCV, Haar Cascade", desc: "Real-time surveillance with face recognition and vehicle detection.", what: "Implemented Haar Cascade for face recognition, integrated YOLOv8 for vehicle detection, configured email alerts. Reduced human dependency by 60%." },
    2: { title: "Brain Tumor Detection", tech: "TensorFlow, Keras, CNN, NumPy", desc: "CNN-based MRI classification with 95% accuracy.", what: "Built CNN architecture with multiple layers, preprocessed MRI datasets, achieved high accuracy through tuning." },
    3: { title: "Mobile Botnet Detection", tech: "Python, SVM, SQLite, Scikit-learn", desc: "Android malware detection with 92% accuracy.", what: "Implemented SVM for bot classification, detected C&C server communication, used SQLite for storage." },
    4: { title: "CI/CD Pipeline", tech: "GitHub Actions, Docker, GCP", desc: "Automated build and deployment pipeline.", what: "Built GitHub Actions workflow, created multi-stage Dockerfile, deployed on GCP Compute Engine." },
    5: { title: "MLOps Pipeline", tech: "MLflow, FastAPI, Docker, GCP", desc: "End-to-end MLOps for model deployment.", what: "Implemented MLflow tracking, built FastAPI wrapper, containerized with Docker, deployed on Cloud Run." },
    6: { title: "Real-Time Dashboard", tech: "React, Node.js, Socket.io, MongoDB", desc: "Live analytics dashboard with real-time updates.", what: "Built React frontend with Chart.js, WebSocket connections, MongoDB aggregation, JWT auth." }
};

function renderProjects() {
    const container = document.getElementById('projectsGrid');
    if (!container) return;
    container.innerHTML = Object.keys(projectDetails).map(id => `
        <div class="project-card" data-project="${id}">
            <div class="project-icon">${['🔐','🧠','🤖','⚙️','📊','📈'][id-1]}</div>
            <h3>${projectDetails[id].title}</h3>
            <p>${projectDetails[id].desc}</p>
            <div class="project-tech">${projectDetails[id].tech.split(',').slice(0,3).map(t => `<span>${t.trim()}</span>`).join('')}</div>
            <button class="btn-small view-project">View Details →</button>
        </div>
    `).join('');
    
    // Project modal
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

// ============================================
// GSAP ANIMATIONS
// ============================================
function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.about-card, .project-card, .skill-category, .timeline-item, .edu-card, .cert-card, .contact-card').forEach((el, i) => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
            duration: 0.5,
            y: 30,
            opacity: 0,
            delay: i * 0.05
        });
    });
}

// ============================================
// MOBILE NAV
// ============================================
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu ul');
    if (hamburger) {
        hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
    }
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('active'));
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    document.getElementById('contact-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✨ Thank you! I will get back to you within 24 hours.');
        e.target.reset();
    });
}

// ============================================
// RESUME DOWNLOAD
// ============================================
function initResumeDownload() {
    document.querySelectorAll('.download-resume').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('📄 Resume download will be available soon. Contact me directly!');
        });
    });
}

// ============================================
// SKILL BARS
// ============================================
function initSkillBars() {
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
}

console.log('🎬 AI Portfolio Loaded! Intro complete.');
