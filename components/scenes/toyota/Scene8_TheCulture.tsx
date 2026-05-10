"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene8_TheCulture() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelectorAll(".t8-box"), { opacity: 0, scale: 0.9 });
    gsap.set(el.querySelectorAll(".t8-line"), { scaleX: 0, transformOrigin: "left" });
    gsap.set(el.querySelector(".t8-particle"), { opacity: 0, x: -50 });
    gsap.set(el.querySelector(".t8-conclusion"), { opacity: 0, y: 20 });

    const tl = gsap.timeline({ delay: 0.4 });
    
    // Build the diagram
    tl.to(el.querySelectorAll(".t8-box")[0], { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, 10.92)
      .to(el.querySelectorAll(".t8-line")[0], { scaleX: 1, duration: 0.5, ease: "power1.inOut" }, 11.5)
      .to(el.querySelectorAll(".t8-box")[1], { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, 12.0)
      .to(el.querySelectorAll(".t8-line")[1], { scaleX: 1, duration: 0.5, ease: "power1.inOut" }, 12.5)
      .to(el.querySelectorAll(".t8-box")[2], { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, 13.0);

    // Send the particle
    tl.to(el.querySelector(".t8-particle"), { opacity: 1, duration: 0.2 }, 13.5)
      .to(el.querySelector(".t8-particle"), { x: 750, duration: 3.5, ease: "none" }, 13.5)
      .to(el.querySelector(".t8-particle"), { opacity: 0, duration: 0.2 }, 17.0);

    // Illuminate Culture & Text
    tl.to(el.querySelectorAll(".t8-box")[2], { borderColor: "#2D5A27", background: "rgba(45,90,39,0.2)", duration: 0.5 }, 25.0)
      .to(el.querySelector(".t8-conclusion"), { opacity: 1, y: 0, duration: 0.8 }, 25.5)
      .to(el.querySelector(".t8-conclusion"), { scale: 1.1, color: "#fff", duration: 1, ease: "power2.out" }, 35.64);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#050505", alignItems: "center", justifyContent: "center" }}>
      
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 0 }}>
        
        {/* Particle */}
        <div className="t8-particle" style={{ 
          position: "absolute", left: 0, width: 12, height: 12, background: "#00E676",
          borderRadius: "50%", boxShadow: "0 0 20px #00E676", zIndex: 10
        }} />

        <div className="t8-box" style={{ 
          width: 200, height: 80, border: "2px solid rgba(255,255,255,0.2)", borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.03)"
        }}>
          <div className="f-inter" style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", letterSpacing: 2 }}>BEHAVIOR</div>
        </div>

        <div className="t8-line" style={{ width: 80, height: 2, background: "rgba(255,255,255,0.2)" }} />

        <div className="t8-box" style={{ 
          width: 200, height: 80, border: "2px solid rgba(255,255,255,0.2)", borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.03)"
        }}>
          <div className="f-inter" style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", letterSpacing: 2 }}>SYSTEM</div>
        </div>

        <div className="t8-line" style={{ width: 80, height: 2, background: "rgba(255,255,255,0.2)" }} />

        <div className="t8-box" style={{ 
          width: 200, height: 80, border: "2px solid rgba(255,255,255,0.2)", borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.03)",
          transition: "all 0.5s"
        }}>
          <div className="f-oswald" style={{ fontSize: 28, color: "#fff", letterSpacing: 1 }}>CULTURE</div>
        </div>

      </div>

      <div className="t8-conclusion f-oswald c-white" style={{ marginTop: 80, fontSize: 72, fontWeight: 700, letterSpacing: -1 }}>
        CULTURE IS THE <span style={{ color: "#2D5A27" }}>OUTPUT</span>
      </div>

    </div>
  );
}
