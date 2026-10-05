// ============================================================
// ROLE PAGE - Renders one role's skills, projects, prototypes
// Expects: window.CURRENT_ROLE = "ai-ml" (set in each role HTML)
// ============================================================

function getRoleKeyFromURL() {
  // Extract role from URL like: roles/ai-ml.html
  const path = window.location.pathname;
  const match = path.match(/roles\/([^\/]+)\.html/);
  return match ? match[1] : (window.CURRENT_ROLE || 'ai-ml');
}

// ---------- Particle Background (same as main) ----------
function initParticleBackground() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  const isMobile = window.innerWidth < 768;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const count = isMobile ? 25 : 60;
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 0.6, baseAlpha: Math.random() * 0.4 + 0.2
    });
  }

  function getColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#3b82f6';
  }
  function hexA(hex, alpha) {
    if (!hex || hex[0] !== '#') return 'rgba(59,130,246,' + alpha + ')';
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const color = getColor();
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = hexA(color, (1 - dist / 120) * 0.15);
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
    }
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.fillStyle = hexA(color, p.baseAlpha);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize', () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; });
}

// ---------- Cursor Glow ----------
function initCursorGlow() {
  const cursor = document.querySelector('.cursor-glow');
  if (!cursor) return;
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
}

// ---------- Theme Switcher ----------
function initTheme() {
  const themes = PROFILE_DATA.themes;
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = themes[btn.dataset.theme];
      if (!c) return;
      document.documentElement.style.setProperty('--primary', c.primary);
      document.documentElement.style.setProperty('--secondary', c.secondary);
      document.documentElement.style.setProperty('--accent', c.accent);
      const r = parseInt(c.primary.slice(1, 3), 16), g = parseInt(c.primary.slice(3, 5), 16), b = parseInt(c.primary.slice(5, 7), 16);
      document.documentElement.style.setProperty('--glow', `rgba(${r},${g},${b},0.3)`);
      document.querySelectorAll('.theme-btn').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
      localStorage.setItem('theme', btn.dataset.theme);
    });
  });

  const saved = localStorage.getItem('theme');
  if (saved && themes[saved]) {
    const c = themes[saved];
    document.documentElement.style.setProperty('--primary', c.primary);
    document.documentElement.style.setProperty('--secondary', c.secondary);
    document.documentElement.style.setProperty('--accent', c.accent);
    const r = parseInt(c.primary.slice(1, 3), 16), g = parseInt(c.primary.slice(3, 5), 16), b = parseInt(c.primary.slice(5, 7), 16);
    document.documentElement.style.setProperty('--glow', `rgba(${r},${g},${b},0.3)`);
    document.querySelectorAll('.theme-btn').forEach(x => x.classList.toggle('active', x.dataset.theme === saved));
  }
}

// ---------- Mobile Nav ----------
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-links');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => menu.classList.toggle('open'));
}

// ---------- Render Skills ----------
function renderSkills(role) {
  const el = document.getElementById('skillsGrid');
  if (!el) return;
  el.innerHTML = Object.entries(role.skills).map(([category, skills]) => `
    <div class="skill-category">
      <h3><i class="fas fa-layer-group"></i> ${category}</h3>
      <div class="skill-tags">
        ${skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// ---------- Render Projects ----------
function renderProjects(role) {
  const el = document.getElementById('projectsGrid');
  if (!el) return;

  const projects = role.projectIds
    .map(id => ({ id, ...PROFILE_DATA.projects[id] }))
    .filter(p => p.title);

  el.innerHTML = projects.map(p => `
    <div class="project-card">
      ${window.renderPrototype(p.prototype)}
      <i class="fas ${p.faIcon} project-icon"></i>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="project-tech">
        ${p.tech.split(',').slice(0, 4).map(t => `<span>${t.trim()}</span>`).join('')}
      </div>
      <div class="project-links">
        <a href="${p.github}" target="_blank"><i class="fab fa-github"></i> View Code</a>
      </div>
    </div>
  `).join('');
}

// ---------- Render Resume Button (force download) ----------
function renderResume(role) {
  const el = document.getElementById('resumeBtn');
  if (!el) return;

  // Adjust filename: assets/resumes/<filename> from role page
  const resumePath = `../assets/resumes/${role.resume}`;
  el.href = resumePath;
  el.setAttribute('download', role.resume);

  // Force download (works even if browser ignores the download attribute)
  el.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(resumePath);
      if (!res.ok) throw new Error('Not found');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = role.resume;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      // Fallback: open in new tab
      window.open(resumePath, '_blank');
    }
  });
}

// ---------- Render Hero Text ----------
function renderHeroText(role) {
  const titleEl = document.getElementById('roleTitle');
  const tagEl = document.getElementById('roleTagline');
  const iconEl = document.getElementById('roleIcon');
  if (titleEl) titleEl.textContent = role.title;
  if (tagEl) tagEl.textContent = role.tagline;
  if (iconEl) iconEl.className = `fas ${role.faIcon} role-card-icon`;
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  const roleKey = getRoleKeyFromURL();
  const role = PROFILE_DATA.roles[roleKey];
  if (!role) {
    console.error('Unknown role:', roleKey);
    return;
  }

  document.title = `${role.title} | Sumit Raj`;

  initParticleBackground();
  initCursorGlow();
  initTheme();
  initMobileNav();

  renderHeroText(role);
  renderSkills(role);
  renderProjects(role);
  renderResume(role);

  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.role-hero', { duration: 0.8, y: 40, opacity: 0, ease: 'power3.out' });
    gsap.utils.toArray('.skill-category, .project-card').forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 88%' },
        duration: 0.5, y: 30, opacity: 0, delay: i * 0.05
      });
    });
  }

  console.log(`✅ Role page ready: ${role.title}`);
});

