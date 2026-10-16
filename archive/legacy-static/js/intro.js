// ============================================================
// CINEMATIC INTRO - 10 scenes, 4s each ≈ 40 seconds
// ============================================================
(function () {
  const overlay = document.getElementById('introOverlay');
  if (!overlay) return;

  const scenes = overlay.querySelectorAll('.intro-scene');
  const dots = overlay.querySelectorAll('.intro-dot');
  const skipBtn = overlay.querySelector('.intro-skip');
  const enterBtn = overlay.querySelector('.intro-enter');

  let current = 0;
  const total = scenes.length;
  let timer = null;
  const SCENE_MS = 4000; // 4 seconds per scene

  function goTo(i) {
    scenes.forEach((s, idx) => s.classList.toggle('active', idx === i));
    dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
    current = i;

    // Scene-specific initializers
    if (i === 1) initCodeRain();
    if (i === 2) initNeuralCanvas();
    if (i === 5) startStatsCounter();       // Scene 6
    if (i === 6) initHoloGrid();            // Scene 7
    if (i === 8) initOrbit();               // Scene 9
  }

  function next() {
    if (current < total - 1) {
      goTo(current + 1);
      scheduleNext();
    }
  }

  function scheduleNext() {
    clearTimeout(timer);
    timer = setTimeout(next, SCENE_MS);
  }

  function finish() {
    clearTimeout(timer);
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    window.__introNeuralRunning = false;
    window.__introGridRunning = false;
  }

  dots.forEach((d, i) => {
    d.addEventListener('click', () => {
      clearTimeout(timer);
      goTo(i);
      if (i < total - 1) scheduleNext();
    });
  });

  skipBtn.addEventListener('click', finish);
  if (enterBtn) enterBtn.addEventListener('click', finish);

  document.addEventListener('keydown', (e) => {
    if (overlay.classList.contains('hidden')) return;
    if (e.key === 'Escape' || e.key === ' ') {
      e.preventDefault();
      finish();
    } else if (e.key === 'ArrowRight' && current < total - 1) {
      clearTimeout(timer);
      goTo(current + 1);
      scheduleNext();
    } else if (e.key === 'ArrowLeft' && current > 0) {
      clearTimeout(timer);
      goTo(current - 1);
      scheduleNext();
    }
  });

  // ============================================================
  // Scene 2: Code Rain
  // ============================================================
  function initCodeRain() {
    const container = document.getElementById('introCodeRain');
    if (!container || container.dataset.filled) return;
    container.dataset.filled = '1';

    const snippets = [
      'import tensorflow as tf', 'class RAG: pass', 'SELECT * FROM users',
      'docker build -t app .', 'kubectl apply -f yaml', 'def train(): ...',
      'git push origin main', 'model.fit(X, y)', 'React.useEffect()',
      'async def main():', 'npm run build', 'terraform apply',
      'FROM python:3.11', 'kubectl get pods', 'curl -X POST /shorten',
      'mlflow.log_metric()', 'pip install -r req.txt', 'pnpm dev',
      'go test ./...', 'cargo build --release',
    ];

    for (let i = 0; i < 60; i++) {
      const s = document.createElement('span');
      s.textContent = snippets[i % snippets.length];
      s.style.left = Math.random() * 100 + '%';
      s.style.animationDuration = (4 + Math.random() * 5) + 's';
      s.style.animationDelay = (Math.random() * 3) + 's';
      s.style.fontSize = (0.6 + Math.random() * 0.5) + 'rem';
      s.style.opacity = 0.15 + Math.random() * 0.45;
      container.appendChild(s);
    }
  }

  // ============================================================
  // Scene 3: Neural Network
  // ============================================================
  function initNeuralCanvas() {
    const canvas = document.getElementById('introNeuralCanvas');
    if (!canvas || canvas.dataset.filled) return;
    canvas.dataset.filled = '1';
    if (window.__introNeuralRunning) return;
    window.__introNeuralRunning = true;

    if (typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 15;

    const positions = [];
    const nodes = [];
    const edges = [];
    const count = 45;

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 10;
      positions.push({ x, y, z });

      const geo = new THREE.SphereGeometry(0.14 + Math.random() * 0.18, 12, 12);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x3b82f6, emissive: 0x2563eb, emissiveIntensity: 0.7,
      });
      const node = new THREE.Mesh(geo, mat);
      node.position.set(x, y, z);
      scene.add(node);
      nodes.push(node);
    }

    for (let i = 0; i < 120; i++) {
      const a = Math.floor(Math.random() * positions.length);
      let b = Math.floor(Math.random() * positions.length);
      while (b === a) b = Math.floor(Math.random() * positions.length);
      const pts = [
        new THREE.Vector3(positions[a].x, positions[a].y, positions[a].z),
        new THREE.Vector3(positions[b].x, positions[b].y, positions[b].z),
      ];
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.35 });
      scene.add(new THREE.Line(geo, mat));
      edges.push(scene.children[scene.children.length - 1]);
    }

    scene.add(new THREE.PointLight(0x3b82f6, 1.3));
    scene.add(new THREE.AmbientLight(0x404060));

    let t = 0;
    function animate() {
      if (!window.__introNeuralRunning) return;
      requestAnimationFrame(animate);
      t += 0.01;
      nodes.forEach((n, i) => {
        const s = 0.5 + (i % 3) * 0.3;
        n.position.x += Math.sin(t * s + i) * 0.006;
        n.position.y += Math.cos(t * s * 0.7 + i * 0.5) * 0.006;
        const sc = 1 + Math.sin(t * 2 + i) * 0.2;
        n.scale.set(sc, sc, sc);
      });
      edges.forEach((e, i) => {
        e.material.opacity = 0.2 + Math.sin(t * 1.5 + i * 0.5) * 0.2;
      });
      scene.rotation.x = Math.sin(t * 0.1) * 0.1;
      scene.rotation.y = t * 0.1;
      renderer.render(scene, camera);
    }
    animate();
  }

  // ============================================================
  // Scene 6: Stats Counter
  // ============================================================
  function startStatsCounter() {
    const stats = document.querySelectorAll('.intro-stat .stat-value');
    stats.forEach(el => {
      const target = parseInt(el.dataset.target || '0', 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();
      el.textContent = '0' + suffix;
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);
        el.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(tick);
    });
  }

  // ============================================================
  // Scene 7: Holographic Grid (canvas)
  // ============================================================
  function initHoloGrid() {
    const canvas = document.getElementById('introGridCanvas');
    if (!canvas || canvas.dataset.filled) return;
    canvas.dataset.filled = '1';
    if (window.__introGridRunning) return;
    window.__introGridRunning = true;

    const ctx = canvas.getContext('2d');
    let W = canvas.width = canvas.clientWidth;
    let H = canvas.height = canvas.clientHeight;

    const gridSize = 40;
    const points = [];

    // Create grid points
    for (let x = 0; x <= W; x += gridSize) {
      for (let y = 0; y <= H; y += gridSize) {
        points.push({
          x, y,
          ox: x, oy: y,
          baseAlpha: 0.3 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    // Create data pulses that travel along the grid
    const pulses = [];
    for (let i = 0; i < 8; i++) {
      pulses.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: 3 + Math.random() * 4,
        hue: Math.random() * 40 + 200, // blue-purple range
      });
    }

    let t = 0;
    function animate() {
      if (!window.__introGridRunning) return;
      requestAnimationFrame(animate);
      t += 0.02;

      W = canvas.width = canvas.clientWidth;
      H = canvas.height = canvas.clientHeight;

      ctx.clearRect(0, 0, W, H);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(59,130,246,0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x <= W; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y <= H; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Draw grid points with wave
      points.forEach((p, i) => {
        const dist = Math.sqrt(Math.pow(p.x - W / 2, 2) + Math.pow(p.y - H / 2, 2));
        const wave = Math.sin(t * 2 - dist * 0.02) * 0.5 + 0.5;
        const size = 1 + wave * 2;
        ctx.fillStyle = `rgba(59,130,246,${p.baseAlpha * wave})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw pulses
      pulses.forEach(pulse => {
        pulse.x += pulse.vx;
        pulse.y += pulse.vy;
        if (pulse.x < 0 || pulse.x > W) pulse.vx *= -1;
        if (pulse.y < 0 || pulse.y > H) pulse.vy *= -1;

        const grad = ctx.createRadialGradient(pulse.x, pulse.y, 0, pulse.x, pulse.y, 30);
        grad.addColorStop(0, `hsla(${pulse.hue}, 100%, 70%, 0.9)`);
        grad.addColorStop(1, `hsla(${pulse.hue}, 100%, 70%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, 30, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    animate();
  }

  // ============================================================
  // Scene 9: Orbit (no JS needed, uses CSS animations)
  // ============================================================
  function initOrbit() {
    // CSS handles the animation. Just ensures DOM is ready.
  }

  // ---------- Start ----------
  document.body.style.overflow = 'hidden';
  setTimeout(() => scheduleNext(), 800);

  console.log('🎬 Cinematic intro — 10 scenes @ 4s each ≈ 40s');
})();
