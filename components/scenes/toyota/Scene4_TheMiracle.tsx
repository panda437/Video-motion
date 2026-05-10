"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene4_TheMiracle() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".t4-title"), { opacity: 0, y: 20 });
    gsap.set(el.querySelectorAll(".t4-worker"), { opacity: 0, scale: 0.5 });
    gsap.set(el.querySelector(".t4-stats"), { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(el.querySelector(".t4-title"), { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
      .to(el.querySelectorAll(".t4-worker"), { opacity: 1, scale: 1, duration: 0.4, stagger: 0.02, ease: "back.out(2)" }, 6.84)
      
      // The Pivot (Match Cut)
      .to(el.querySelectorAll(".t4-node"), { fill: "#2D5A27", stroke: "rgba(45,90,39,0.5)", duration: 0.8, ease: "power2.inOut" }, 13.44)
      .to(el.querySelector(".t4-stats"), { opacity: 1, duration: 0.6 }, 19.56);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#050608", alignItems: "center", justifyContent: "center", padding: "60px 100px" }}>
      <div className="t4-title f-inter" style={{ fontSize: 24, color: "rgba(255,255,255,0.5)", letterSpacing: 4, marginBottom: 60 }}>
        1984: THE NUMMI EXPERIMENT
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 16, marginBottom: 60 }}>
        {[...Array(30)].map((_, i) => {
          const isSame = i < 24; // 80% same workers
          return (
            <div key={i} className="t4-worker t4-node" style={{
              width: 40, height: 40, borderRadius: 6,
              background: isSame ? "rgba(255,59,48,0.15)" : "rgba(255,255,255,0.05)",
              border: isSame ? "2px solid rgba(255,59,48,0.4)" : "2px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <svg width="16" height="20" viewBox="0 0 16 20">
                <circle cx="8" cy="6" r="4" fill="rgba(255,255,255,0.8)" />
                <path d="M2,20 C2,14 14,14 14,20" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />
              </svg>
            </div>
          );
        })}
      </div>

      <div className="t4-stats" style={{ display: "flex", gap: 60, alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div className="f-oswald c-white" style={{ fontSize: 72, fontWeight: 700, lineHeight: 1 }}>80%</div>
          <div className="f-inter" style={{ fontSize: 20, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>SAME WORKERS</div>
        </div>
        <div style={{ width: 2, height: 60, background: "rgba(255,255,255,0.1)" }} />
        <div style={{ textAlign: "center" }}>
          <div className="f-oswald" style={{ fontSize: 72, fontWeight: 700, lineHeight: 1, color: "#00E676" }}>#1</div>
          <div className="f-inter" style={{ fontSize: 20, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>QUALITY IN NA</div>
        </div>
      </div>
    </div>
  );
}
