"use client";

import { useState, useEffect, useRef, useCallback, ComponentType } from "react";
import gsap from "gsap";

interface SceneConfig {
  id: string;
  label: string;
  duration: number;
  Component: ComponentType;
}

interface Props {
  scenes: SceneConfig[];
}

export default function VideoEngine({ scenes }: Props) {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sceneKey, setSceneKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [cinema, setCinema] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const currentRef = useRef(current);
  currentRef.current = current;

  // Detect cinema mode (?cinema=1) — auto-play, no controls, no letterbox
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("cinema") === "1") {
      setCinema(true);
      setIsPlaying(true);
    }
  }, []);

  // Scale stage to fit viewport while preserving 1280×720
  useEffect(() => {
    const resize = () => {
      if (!stageRef.current) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // In cinema mode: fill viewport exactly (browser should be 1280×720)
      const scale = cinema
        ? Math.min(vw / 1280, vh / 720)
        : Math.min(vw / 1280, vh / 720);
      const x = (vw - 1280 * scale) / 2;
      const y = (vh - 720 * scale) / 2;
      stageRef.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [cinema]);

  const clearTimers = () => {
    if (timerRef.current)    clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  const goToScene = useCallback((index: number) => {
    if (index < 0 || index >= scenes.length) return;
    clearTimers();

    if (!overlayRef.current) {
      setCurrent(index);
      setSceneKey(k => k + 1);
      setProgress(0);
      return;
    }
    setTransitioning(true);
    // Faster transition in cinema mode for crisper cuts
    const fadeOut = cinema ? 0.18 : 0.25;
    const fadeIn  = cinema ? 0.22 : 0.35;
    gsap.to(overlayRef.current, { opacity: 1, duration: fadeOut, ease: "power2.in", onComplete: () => {
      setCurrent(index);
      setSceneKey(k => k + 1);
      setProgress(0);
      gsap.to(overlayRef.current!, { opacity: 0, duration: fadeIn, ease: "power2.out", onComplete: () => {
        setTransitioning(false);
      }});
    }});
  }, [scenes.length, cinema]);

  const advance = useCallback(() => {
    const next = currentRef.current + 1;
    if (next < scenes.length) {
      goToScene(next);
    } else {
      setIsPlaying(false);
      setProgress(1);
    }
  }, [scenes.length, goToScene]);

  // Auto-advance + progress tick
  useEffect(() => {
    if (!isPlaying || transitioning) return;
    const duration = scenes[current].duration;
    startTimeRef.current = Date.now();

    timerRef.current = setTimeout(advance, duration);

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setProgress(Math.min(elapsed / duration, 1));
    }, 50);

    return clearTimers;
  }, [isPlaying, current, transitioning, scenes, advance]);

  // Keyboard shortcuts (disabled in cinema mode)
  useEffect(() => {
    if (cinema) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") { e.preventDefault(); setIsPlaying(p => !p); }
      if (e.code === "ArrowRight") goToScene(currentRef.current + 1);
      if (e.code === "ArrowLeft")  goToScene(currentRef.current - 1);
      if (e.code === "KeyR") { goToScene(0); setIsPlaying(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goToScene, cinema]);

  const totalProgress = (current + progress) / scenes.length;
  const { Component } = scenes[current];

  return (
    <div className="video-wrapper">
      <div ref={stageRef} className="video-stage">

        {/* Current scene — key forces remount on scene change */}
        <div key={sceneKey} style={{ position: "absolute", inset: 0 }}>
          <Component />
        </div>

        {/* Fade-to-black transition overlay */}
        <div ref={overlayRef} className="transition-overlay" style={{ opacity: 0 }} />

        {/* Controls bar — hidden in cinema mode */}
        {!cinema && (
          <div className="controls">
            <button className="ctrl-btn" onClick={() => goToScene(current - 1)} disabled={current === 0}
              style={{ opacity: current === 0 ? 0.3 : 1 }}>◀</button>

            <button className={`ctrl-btn ${isPlaying ? "active" : ""}`} onClick={() => setIsPlaying(p => !p)}>
              {isPlaying ? "⏸ pause" : "▶ play"}
            </button>

            <button className="ctrl-btn" onClick={() => goToScene(current + 1)} disabled={current === scenes.length - 1}
              style={{ opacity: current === scenes.length - 1 ? 0.3 : 1 }}>▶</button>

            <div className="progress-track" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              goToScene(Math.min(Math.floor(pct * scenes.length), scenes.length - 1));
            }}>
              <div className="progress-fill" style={{ width: `${totalProgress * 100}%` }} />
            </div>

            <span className="scene-counter">{scenes[current].label} · {current + 1}/{scenes.length}</span>

            <button className="ctrl-btn" onClick={() => { goToScene(0); setIsPlaying(false); }}>↺ restart</button>
            <button className="ctrl-btn" onClick={() => stageRef.current?.requestFullscreen?.()}>⛶ fullscreen</button>
          </div>
        )}
      </div>

      {!cinema && (
        <div style={{
          position: "fixed", bottom: 12, right: 16,
          fontFamily: "var(--font-inter)", fontSize: 11,
          color: "rgba(255,255,255,0.2)", letterSpacing: "0.5px",
        }}>
          space · ← → · r
        </div>
      )}
    </div>
  );
}
