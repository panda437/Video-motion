"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene4_RISC() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".paper-grid"), { opacity: 0 });
    gsap.set(el.querySelectorAll(".draw-path"), { strokeDasharray: 1000, strokeDashoffset: 1000 });
    gsap.set(el.querySelector(".hero-text"), { opacity: 0, y: 20 });
    gsap.set(el.querySelector(".silicon-overlay"), { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.to(el.querySelector(".paper-grid"), { opacity: 1, duration: 1 }, 0)
      .to(el.querySelectorAll(".draw-path"), { strokeDashoffset: 0, duration: 4, ease: "sine.inOut" }, 1)
      .to(el.querySelector(".hero-text"), { opacity: 1, y: 0, duration: 1 }, 2)
      .to(el.querySelector(".silicon-overlay"), { opacity: 1, duration: 1.5, ease: "power2.inOut" }, 6);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#FAFAFA", padding: 0, overflow: "hidden" }}>
      {/* Light Blue Graph Paper */}
      <div className="paper-grid" style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(#DBEAFE 1px, transparent 1px), linear-gradient(90deg, #DBEAFE 1px, transparent 1px)",
        backgroundSize: "20px 20px"
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        
        <svg viewBox="0 0 800 600" style={{ position: "absolute", width: "80%", height: "80%" }}>
          <path className="draw-path" d="M100,300 L700,300 M400,100 L400,500" stroke="#18181B" strokeWidth="2" fill="none" />
          <rect className="draw-path" x="200" y="150" width="400" height="300" stroke="#18181B" strokeWidth="4" fill="none" rx="8" />
          <circle className="draw-path" cx="400" cy="300" r="80" stroke="#2563EB" strokeWidth="3" fill="none" />
          <path className="draw-path" d="M200,200 L400,300 L600,200" stroke="#18181B" strokeWidth="2" fill="none" />
        </svg>

        <div className="silicon-overlay" style={{ position: "absolute", inset: 0, background: "rgba(250,250,250,0.9)", backdropFilter: "blur(5px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#18181B", width: 300, height: 300, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}>
            <div className="f-oswald" style={{ color: "#fff", fontSize: 80, fontWeight: 700, letterSpacing: 4 }}>ARM<span style={{ color: "#2563EB" }}>1</span></div>
          </div>
        </div>

        <div className="hero-text" style={{ position: "absolute", bottom: 80, textAlign: "center", zIndex: 10 }}>
          <div className="f-oswald" style={{ fontSize: 80, fontWeight: 700, color: "#18181B", letterSpacing: -2, lineHeight: 1 }}>
            DRAWN ON PAPER
          </div>
          <div className="f-inter" style={{ fontSize: 24, color: "#71717A", marginTop: 12, letterSpacing: 2 }}>
            Low power was just a "nice-to-have"
          </div>
        </div>
      </div>
    </div>
  );
}