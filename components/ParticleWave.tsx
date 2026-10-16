"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  accent?: string;
};

export default function ParticleWave({ accent = "#7dd3fc" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let raf = 0;
    let disposed = false;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 1.4, 6.2);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    wrap.appendChild(renderer.domElement);

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const cols = isMobile ? 48 : 90;
    const rows = isMobile ? 28 : 48;
    const count = cols * rows;
    const positions = new Float32Array(count * 3);
    const bases = new Float32Array(count * 2);

    let i = 0;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const px = (x / (cols - 1) - 0.5) * 14;
        const pz = (y / (rows - 1) - 0.5) * 8;
        positions[i * 3] = px;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = pz;
        bases[i * 2] = px;
        bases[i * 2 + 1] = pz;
        i++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const color = new THREE.Color(accent);
    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.035 : 0.028,
      color,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const linePositions: number[] = [];
    const step = isMobile ? 6 : 5;
    for (let y = 0; y < rows; y += step) {
      for (let x = 0; x < cols - 1; x++) {
        const a = y * cols + x;
        const b = a + 1;
        linePositions.push(
          positions[a * 3],
          0,
          positions[a * 3 + 2],
          positions[b * 3],
          0,
          positions[b * 3 + 2]
        );
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const lineMat = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.12,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    function resize() {
      if (!renderer || !wrap) return;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
    }

    function onPointer(e: PointerEvent) {
      const rect = wrap!.getBoundingClientRect();
      pointer.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }

    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const linePos = lineGeo.attributes.position as THREE.BufferAttribute;

    function tick(t: number) {
      if (disposed || !renderer) return;
      const time = t * 0.001;
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;

      for (let n = 0; n < count; n++) {
        const x = bases[n * 2];
        const z = bases[n * 2 + 1];
        const wave =
          Math.sin(x * 0.55 + time * 0.9) * 0.28 +
          Math.cos(z * 0.7 + time * 0.65) * 0.22 +
          Math.sin((x + z) * 0.25 + time * 0.4) * 0.12;
        pos.setY(n, wave);
      }
      pos.needsUpdate = true;

      let li = 0;
      for (let y = 0; y < rows; y += step) {
        for (let x = 0; x < cols - 1; x++) {
          const a = y * cols + x;
          const b = a + 1;
          linePos.setXYZ(li, pos.getX(a), pos.getY(a), pos.getZ(a));
          linePos.setXYZ(li + 1, pos.getX(b), pos.getY(b), pos.getZ(b));
          li += 2;
        }
      }
      linePos.needsUpdate = true;

      camera.position.x = pointer.x * 0.55;
      camera.position.y = 1.4 + pointer.y * -0.25;
      camera.lookAt(0, 0.1, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }

    function onVisibility() {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, [accent]);

  return <div ref={wrapRef} className="particle-wave" aria-hidden />;
}
