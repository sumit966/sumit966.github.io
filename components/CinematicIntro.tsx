"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { SITE } from "@/data/site";

const INTRO_KEY = "sr-intro-seen";

export default function CinematicIntro() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"black" | "field" | "name" | "out">("black");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(INTRO_KEY) === "1";
    if (reduced || seen) return;

    setVisible(true);
    const timers = [
      window.setTimeout(() => setPhase("field"), 280),
      window.setTimeout(() => setPhase("name"), 1100),
      window.setTimeout(() => finish(), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  function finish() {
    sessionStorage.setItem(INTRO_KEY, "1");
    setPhase("out");
    window.setTimeout(() => setVisible(false), 520);
  }

  if (!visible) return null;

  return (
    <div
      className={`intro-root ${phase === "out" ? "intro-root-exit" : ""}`}
      role="dialog"
      aria-label="Cinematic introduction"
    >
      <div className={`intro-field ${phase !== "black" ? "is-on" : ""}`} aria-hidden>
        {Array.from({ length: 36 }).map((_, i) => (
          <span key={i} style={{ "--i": i } as CSSProperties} />
        ))}
      </div>
      <div className="intro-sweep" aria-hidden />
      <div className={`intro-copy ${phase === "name" || phase === "out" ? "is-on" : ""}`}>
        <p className="intro-kicker">Portfolio</p>
        <h1 className="intro-name">{SITE.name.toUpperCase()}</h1>
        <p className="intro-sub">{SITE.tagline}</p>
      </div>
      <button type="button" className="intro-skip" onClick={finish}>
        Skip intro
      </button>
    </div>
  );
}
