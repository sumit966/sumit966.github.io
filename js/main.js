// 6D Background with Rotating Geometric Shapes (NO Torus Knot)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Particle System - Floating stars
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

// Rotating Cube Group
const cubeGroup = new THREE.Group();
const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const edgesGeometry = new THREE.EdgesGeometry(cubeGeometry);
const cubeMaterial = new THREE.LineBasicMaterial({ color: 0x8b5cf6 });
const wireframe = new THREE.LineSegments(edgesGeometry, cubeMaterial);
cubeGroup.add(wireframe);

// Add smaller cubes around
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
const backLight = new THREE.PointLight(0x8b5cf6, 0.3);
backLight.position.set(0, 0, -15);
scene.add(backLight);

camera.position.z = 18;

let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.008;
    
    // Rotate cube group
    cubeGroup.rotation.x = time * 0.5;
    cubeGroup.rotation.y = time * 0.8;
    cubeGroup.rotation.z = time * 0.3;
    
    // Rotate particle system
    particleSystem.rotation.y = time * 0.05;
    particleSystem.rotation.x = time * 0.03;
    
    // Rotate sphere group
    sphereGroup.rotation.y = time * 0.1;
    sphereGroup.rotation.x = Math.sin(time * 0.2) * 0.2;
    
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
        cursorFollower.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
    });
}

// Typed.js
const typed = new Typed('.typed-text', {
    strings: ['AI/ML Engineer', 'DevOps Architect', 'Data Analyst', 'Full Stack Developer', 'Cloud Engineer'],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 2000,
    loop: true
});

// GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);
gsap.from('.hero-text', { duration: 0.8, y: 50, opacity: 0, ease: 'power3.out' });
gsap.from('.hero-stats-card', { duration: 0.8, scale: 0.9, opacity: 0, delay: 0.3, ease: 'back.out(1.2)' });
gsap.utils.toArray('.resume-card, .role-card, .skill-category, .project-detailed-card, .timeline-item, .activity-card, .edu-card, .cert-card, .contact-card').forEach((el, i) => {
    gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        duration: 0.5,
        y: 30,
        opacity: 0,
        delay: i * 0.05
    });
});

// Parallax
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const codeBg = document.querySelector('.code-background');
    if (codeBg) codeBg.style.transform = `translateY(${scrolled * 0.2}px)`;
});

// Vanilla Tilt
VanillaTilt.init(document.querySelectorAll('[data-tilt]'), { max: 10, speed: 400, glare: true, 'max-glare': 0.2 });

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu ul');
if (hamburger) {
    hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
}
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Active Nav Link
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) current = section.getAttribute('id');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
});

// Project Modal Data
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

// Modal functionality
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');

document.querySelectorAll('.view-project').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = btn.closest('.project-detailed-card');
        const projectId = card.getAttribute('data-project');
        const project = projectDetails[projectId];
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
    });
});

modalClose.addEventListener('click', () => { modal.style.display = 'none'; });
window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

// Fetch GitHub Repos - Clean design
async function fetchGitHubRepos() {
    const reposContainer = document.getElementById('github-repos');
    if (!reposContainer) return;
    try {
        const response = await fetch('https://api.github.com/users/sumit966/repos?sort=updated&per_page=6');
        const repos = await response.json();
        if (repos.message) throw new Error(repos.message);
        reposContainer.innerHTML = repos.map(repo => `
            <div class="github-repo-card">
                <h4>${repo.name.replace(/-/g, ' ').toUpperCase()}</h4>
                <p>${repo.description || 'No description available'}</p>
                <div class="github-stats-small">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🍴 ${repo.forks_count}</span>
                    <span>📅 ${new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
                <a href="${repo.html_url}" target="_blank" class="btn-small" style="margin-top:0.5rem; display:inline-block">View Code →</a>
            </div>
        `).join('');
    } catch (error) {
        reposContainer.innerHTML = '<p>Visit <a href="https://github.com/sumit966" target="_blank" style="color:var(--primary)">GitHub</a> to see my repos</p>';
    }
}
fetchGitHubRepos();

// Contact Form
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✨ Thank you for reaching out! I will get back to you within 24 hours.');
    e.target.reset();
});

// Download Resume
document.querySelectorAll('.download-resume').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('📄 Resume will be available for download soon. Please contact me directly for now!');
    });
});

// Animate skill bars
const observerOptions = { threshold: 0.5 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.skill-level');
            bars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => { bar.style.width = width; }, 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);
document.querySelectorAll('.skill-category').forEach(el => observer.observe(el));

console.log('🚀 Ultimate Portfolio Loaded - 13 Projects | Modal Popups | Rotating Cube | All Activities');
