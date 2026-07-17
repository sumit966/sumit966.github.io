// ============================================
// AI BACKGROUND - Interactive Particles
// ============================================
const canvas = document.getElementById('ai-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let mouseX = 0, mouseY = 0;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
resize();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
        ctx.fill();
    }
}

for (let i = 0; i < 150; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    drawConnections();
    requestAnimationFrame(animateParticles);
}

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - dist / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

animateParticles();

window.addEventListener('resize', resize);
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// ============================================
// TYPED TEXT - AI-Powered Roles
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
// ANIMATED STATS - Counter Animation
// ============================================
function animateCounters() {
    const stats = document.querySelectorAll('.ai-stat');
    stats.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        const span = stat.querySelector('span');
        let current = 0;
        const increment = Math.ceil(target / 60);
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            span.textContent = current;
        }, 50);
    });
}

// Trigger counter animation when section is visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const homeStats = document.querySelector('.home-ai-stats');
if (homeStats) observer.observe(homeStats);

// ============================================
// ROLE CARDS - Progress Bar Animation
// ============================================
function animateRoleProgress() {
    document.querySelectorAll('.role-card').forEach(card => {
        const bar = card.querySelector('.role-progress-bar');
        const percent = card.querySelector('.role-percent');
        if (bar && percent) {
            const targetWidth = percent.textContent;
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 300);
        }
    });
}

const roleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateRoleProgress();
            roleObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const rolesSection = document.querySelector('.roles-section');
if (rolesSection) roleObserver.observe(rolesSection);

// ============================================
// ROLE MODAL - Show Role Details
// ============================================
const roleModal = document.getElementById('roleModal');
const roleModalBody = document.getElementById('roleModalBody');
const roleModalClose = document.querySelector('.role-modal-close');

const roleDetails = {
    'ai-ml': {
        title: '🤖 AI/ML Engineer',
        description: 'Expert in building and deploying machine learning models for computer vision, healthcare, and security applications.',
        skills: ['Python', 'TensorFlow', 'Keras', 'PyTorch', 'YOLOv8', 'OpenCV', 'CNN', 'RNN', 'LSTM'],
        projects: ['Brain Tumor Detection', 'Military Security System', 'NLP Sentiment Analysis'],
        experience: 'M.Tech in Applied AI & ML @ VNIT Nagpur',
        resume: 'Download AI/ML Engineer Resume'
    },
    'backend': {
        title: '⚙️ Backend Developer',
        description: 'Building robust, scalable backend systems with Spring Boot, Flask, Django, and Node.js.',
        skills: ['Java', 'Python', 'Spring Boot', 'Flask', 'Node.js', 'SQL', 'MongoDB', 'REST APIs'],
        projects: ['E-Commerce API', 'Real-Time Security Backend', 'Task Management System'],
        experience: 'Software Engineer Intern @ Salesforce',
        resume: 'Download Backend Developer Resume'
    },
    'data-analyst': {
        title: '📊 Data Analyst',
        description: 'Transforming raw data into actionable insights using SQL, Power BI, Tableau, and Python.',
        skills: ['SQL', 'Power BI', 'Tableau', 'Python', 'Pandas', 'Excel', 'Statistics', 'EDA'],
        projects: ['Healthcare Analytics', 'Security Analytics Dashboard', 'Botnet Traffic Analysis'],
        experience: 'Data Analysis @ Salesforce',
        resume: 'Download Data Analyst Resume'
    },
    'data-scientist': {
        title: '📈 Data Scientist',
        description: 'Building predictive models and extracting insights from complex datasets using ML/DL techniques.',
        skills: ['Python', 'ML', 'DL', 'Scikit-learn', 'XGBoost', 'Regression', 'Classification', 'Statistics'],
        projects: ['Brain Tumor Detection', 'Mobile Botnet Detection', 'Customer Churn Prediction'],
        experience: 'M.Tech in Applied AI & ML',
        resume: 'Download Data Scientist Resume'
    },
    'fullstack': {
        title: '💻 Full Stack Developer',
        description: 'Building end-to-end web applications with modern technologies including React, Node.js, and cloud platforms.',
        skills: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'REST APIs'],
        projects: ['Personal Portfolio', 'Real-Time Dashboard', 'CI/CD Application'],
        experience: 'Founder @ Fintech IT Solutions',
        resume: 'Download Full Stack Developer Resume'
    },
    'mlops': {
        title: '☁️ MLOps/DevOps Engineer',
        description: 'Bridging the gap between ML development and production deployment with CI/CD, containerization, and cloud.',
        skills: ['GCP', 'Docker', 'Kubernetes', 'Terraform', 'MLflow', 'CI/CD', 'Jenkins', 'Git'],
        projects: ['CI/CD Pipeline', 'Kubernetes Cluster', 'Terraform IaC', 'MLOps Pipeline'],
        experience: 'DevOps Automation @ Fintech IT Solutions',
        resume: 'Download MLOps Resume'
    },
    'data-validation': {
        title: '✅ Data Validation & Compliance',
        description: 'Ensuring data quality, accuracy, and compliance with KYC, AML, CDD regulations.',
        skills: ['KYC', 'AML', 'CDD', 'Data Quality', 'Risk Assessment', 'Compliance', 'SQL', 'Excel'],
        projects: ['Customer Data Verification', 'Healthcare Analytics', 'Compliance Reporting'],
        experience: 'Data Validation @ Salesforce',
        resume: 'Download Data Validation Resume'
    }
};

document.querySelectorAll('.role-select').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.role-card');
        const roleKey = card.dataset.role;
        const details = roleDetails[roleKey];
        if (details) {
            roleModalBody.innerHTML = `
                <h2 style="color:var(--primary); font-size:1.8rem; margin-bottom:0.5rem">${details.title}</h2>
                <p style="color:var(--text-muted); margin-bottom:1rem">${details.description}</p>
                <h4 style="color:var(--primary); margin-bottom:0.5rem">🛠️ Key Skills</h4>
                <div class="project-tech" style="margin-bottom:1rem">${details.skills.map(s => `<span>${s}</span>`).join('')}</div>
                <h4 style="color:var(--primary); margin-bottom:0.5rem">📁 Projects</h4>
                <ul style="color:var(--text-muted); margin-bottom:1rem">${details.projects.map(p => `<li>${p}</li>`).join('')}</ul>
                <p style="color:var(--text-muted); margin-bottom:1rem"><strong>🎯 Experience:</strong> ${details.experience}</p>
                <a href="#" class="btn-download" style="display:inline-block; padding:10px 30px; text-decoration:none">📥 ${details.resume}</a>
            `;
            roleModal.style.display = 'flex';
            
            // Add download handler
            roleModalBody.querySelector('.btn-download').addEventListener('click', (e) => {
                e.preventDefault();
                alert(`📄 ${details.title} resume download will be available soon!\n\nPlease contact me directly for the complete resume.`);
            });
        }
    });
});

roleModalClose.addEventListener('click', () => roleModal.style.display = 'none');
window.addEventListener('click', (e) => { if (e.target === roleModal) roleModal.style.display = 'none'; });

// ============================================
// PROJECTS DATA - 13 Projects
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
// GSAP SCROLL ANIMATIONS
// ============================================
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.role-card, .skill-category, .project-card, .exp-card, .resume-card, .edu-card, .cert-card, .contact-card').forEach((el, i) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.6,
        y: 40,
        opacity: 0,
        scale: 0.95,
        delay: i * 0.08,
        ease: 'power3.out'
    });
});

// ============================================
// VANILLA TILT
// ============================================
VanillaTilt.init(document.querySelectorAll('.role-card, .skill-category, .project-card, .edu-card, .cert-card, .resume-card, .contact-card'), {
    max: 8,
    speed: 400,
    glare: true,
    'max-glare': 0.15,
    gyroscope: true
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
// ACTIVE NAV LINK
// ============================================
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
document.querySelectorAll('.btn-download').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const resume = btn.dataset.resume;
        const resumeNames = {
            'ai-ml': 'AI/ML Engineer',
            'backend': 'Backend Developer',
            'data-analyst': 'Data Analyst',
            'data-scientist': 'Data Scientist',
            'fullstack': 'Full Stack Developer',
            'mlops': 'MLOps/DevOps Engineer',
            'data-validation': 'Data Validation & Compliance'
        };
        alert(`📄 ${resumeNames[resume] || 'Resume'} download will be available soon!\n\nPlease contact me directly for the complete resume.`);
    });
});

// ============================================
// SKILL BARS ANIMATION
// ============================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-fill').forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => { bar.style.width = width; }, 200);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));

console.log('🤖 AI-Powered Portfolio Loaded!');
console.log('📄 7 Resumes | 7 Roles | 13 Projects');
console.log('✨ All animations active!');
