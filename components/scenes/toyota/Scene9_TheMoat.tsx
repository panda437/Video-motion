"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene9_TheMoat() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".t9-title"), { opacity: 0, y: 30, filter: "blur(10px)" });
    gsap.set(el.querySelector(".t9-factory"), { opacity: 0, y: 50 });
    gsap.set(el.querySelector(".t9-tesla"), { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.5 });
    tl.to(el.querySelector(".t9-title"), { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out" })
      .to(el.querySelector(".t9-factory"), { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }, 1.0)
      .to(el.querySelector(".t9-tesla"), { opacity: 1, duration: 1.5 }, 5.0);

    // Subtle lens breath
    gsap.to(el.querySelector(".t9-container"), { scale: 1.03, duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut" });

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#030403", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      
      <div className="t9-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <div className="t9-title f-oswald c-white" style={{ fontSize: 160, fontWeight: 900, lineHeight: 1, letterSpacing: -5, textAlign: "center" }}>
          THE MOAT<br/>IS THE CULTURE
        </div>

        {/* Minimalist Factory Graphic */}
        <div className="t9-factory" style={{ marginTop: 80, position: "relative", width: 600, height: 120 }}>
          <svg viewBox="0 0 600 120" style={{ width: "100%", height: "100%" }}>
            <path d="M50,120 L50,60 L150,20 L150,60 L250,20 L250,60 L350,20 L350,60 L450,20 L450,60 L550,60 L550,120 Z" 
                  fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinejoin="round" />
            <rect x="100" y="80" width="40" height="40" fill="rgba(255,255,255,0.05)" />
            <rect x="200" y="80" width="40" height="40" fill="rgba(255,255,255,0.05)" />
            <rect x="300" y="80" width="40" height="40" fill="rgba(255,255,255,0.05)" />
            <rect x="400" y="80" width="40" height="40" fill="rgba(255,255,255,0.05)" />
          </svg>
          
          {/* Tesla fade in */}
          <div className="t9-tesla f-inter" style={{ 
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, color: "#fff", letterSpacing: 8, textTransform: "uppercase",
            background: "radial-gradient(ellipse, rgba(255,0,0,0.1) 0%, transparent 60%)"
          }}>
            Sold to Tesla
          </div>
        </div>
      </div>

    </div>
  );
}
