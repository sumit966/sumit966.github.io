// ============================================================
// MAIN - Landing page logic (index.html)
// ============================================================

// ---------- Particle Background ----------
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
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2.2 + 0.8,
      baseAlpha: Math.random() * 0.4 + 0.2
    });
  }

  document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  document.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000; });

  function hexA(hex, alpha) {
    if (!hex || hex[0] !== '#') return 'rgba(59,130,246,' + alpha + ')';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

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
      const r = parseInt(c.primary.slice(1, 3), 16);
      const g = parseInt(c.primary.slice(3, 5), 16);
      const b = parseInt(c.primary.slice(5, 7), 16);
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
    const r = parseInt(c.primary.slice(1, 3), 16);
    const g = parseInt(c.primary.slice(3, 5), 16);
    const b = parseInt(c.primary.slice(5, 7), 16);
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
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => menu.classList.remove('open'));
  });
}

// ---------- Render Hero Stats ----------
function renderHeroStats() {
  const el = document.getElementById('heroStats');
  if (!el) return;
  el.innerHTML = `
    <div class="stat"><span>15</span><label>Projects</label></div>
    <div class="stat"><span>5</span><label>Roles</label></div>
    <div class="stat"><span>300+</span><label>DSA Solved</label></div>
    <div class="stat"><span>10</span><label>Certifications</label></div>
  `;
}

// ---------- Render Role Grid (landing page) ----------
function renderRoleGrid() {
  const grid = document.getElementById('roleGrid');
  if (!grid) return;

  grid.innerHTML = Object.entries(PROFILE_DATA.roles).map(([key, role]) => `
    <a href="roles/${role.slug}.html" class="role-card" data-role="${key}">
      <i class="fas ${role.faIcon} role-card-icon"></i>
      <div class="role-card-title">${role.title}</div>
      <div class="role-card-tagline">${role.tagline}</div>
      <span class="role-card-cta">View Role →</span>
    </a>
  `).join('');
}

// ---------- GSAP Animations ----------
function initAnimations() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero-content', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' });
  gsap.utils.toArray('.role-card').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      duration: 0.5, y: 30, opacity: 0, delay: i * 0.08
    });
  });
}

// ---------- Init Landing Page ----------
document.addEventListener('DOMContentLoaded', () => {
  initParticleBackground();
  initCursorGlow();
  initTheme();
  initMobileNav();
  renderHeroStats();
  renderRoleGrid();
  initAnimations();
  console.log('✅ Landing page ready');
});

// ---------- Add fade-in class handling ----------
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  setTimeout(() => body.classList.add('loaded'), 100);
});
