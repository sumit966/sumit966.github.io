// ============================================================
// CINEMATIC INTRO - 5 scenes with auto-play + skip
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
  const SCENE_MS = 3000;

  function goTo(i) {
    scenes.forEach((s, idx) => s.classList.toggle('active', idx === i));
    dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
    current = i;

    // Scene-specific init
    if (i === 1) initCodeRain();
    if (i === 2) initNeuralCanvas();
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
    // Clean up canvas animation if running
    if (window.__introNeuralRunning) window.__introNeuralRunning = false;
  }

  // Manual nav
  dots.forEach((d, i) => {
    d.addEventListener('click', () => {
      clearTimeout(timer);
      goTo(i);
      if (i < total - 1) scheduleNext();
    });
  });

  skipBtn.addEventListener('click', finish);
  if (enterBtn) enterBtn.addEventListener('click', finish);

  // Keyboard
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

  // ---------- Scene 2: Code Rain ----------
  function initCodeRain() {
    const container = document.getElementById('introCodeRain');
    if (!container || container.dataset.filled) return;
    container.dataset.filled = '1';

    const snippets = [
      'import tensorflow as tf',
      'class RAG: pass',
      'SELECT * FROM users',
      'docker build -t app .',
      'kubectl apply -f yaml',
      'def train(): ...',
      'git push origin main',
      'model.fit(X, y)',
      'React.useEffect()',
      'async def main():',
      'npm run build',
      'terraform apply',
    ];

    for (let i = 0; i < 40; i++) {
      const s = document.createElement('span');
      s.textContent = snippets[i % snippets.length];
      s.style.left = Math.random() * 100 + '%';
      s.style.animationDuration = (4 + Math.random() * 4) + 's';
      s.style.animationDelay = (Math.random() * 3) + 's';
      s.style.fontSize = (0.6 + Math.random() * 0.4) + 'rem';
      s.style.opacity = 0.2 + Math.random() * 0.4;
      container.appendChild(s);
    }
  }

  // ---------- Scene 3: Neural Canvas ----------
  function initNeuralCanvas() {
    const canvas = document.getElementById('introNeuralCanvas');
    if (!canvas || canvas.dataset.filled) return;
    canvas.dataset.filled = '1';
    if (window.__introNeuralRunning) return;
    window.__introNeuralRunning = true;

    if (typeof THREE === 'undefined') {
      console.warn('Three.js not loaded — skipping neural scene');
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 15;

    const positions = [];
    const nodes = [];
    const edges = [];
    const count = 40;

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 10;
      positions.push({ x, y, z });

      const geo = new THREE.SphereGeometry(0.14 + Math.random() * 0.18, 12, 12);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        emissive: 0x2563eb,
        emissiveIntensity: 0.6,
      });
      const node = new THREE.Mesh(geo, mat);
      node.position.set(x, y, z);
      scene.add(node);
      nodes.push(node);
    }

    for (let i = 0; i < 90; i++) {
      const a = Math.floor(Math.random() * positions.length);
      let b = Math.floor(Math.random() * positions.length);
      while (b === a) b = Math.floor(Math.random() * positions.length);
      const pts = [
        new THREE.Vector3(positions[a].x, positions[a].y, positions[a].z),
        new THREE.Vector3(positions[b].x, positions[b].y, positions[b].z),
      ];
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.35 });
      const line = new THREE.Line(geo, mat);
      scene.add(line);
      edges.push(line);
    }

    scene.add(new THREE.PointLight(0x3b82f6, 1.2));
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

    // Resize
    window.addEventListener('resize', () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
  }

  // ---------- Start ----------
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    scheduleNext();
  }, 800);

  console.log('🎬 Cinematic intro started');
})();
