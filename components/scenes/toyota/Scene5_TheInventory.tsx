"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene5_TheInventory() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".t5-water"), { scaleY: 1, transformOrigin: "bottom" });
    gsap.set(el.querySelectorAll(".t5-rock"), { opacity: 0, y: 20 });
    gsap.set(el.querySelector(".t5-text1"), { opacity: 0, y: 20 });
    gsap.set(el.querySelector(".t5-text2"), { opacity: 0, y: 20 });

    const tl = gsap.timeline({ delay: 0.5 });
    tl
      .to(el.querySelector(".t5-text1"), { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 6.8)
      .to(el.querySelector(".t5-water"), { scaleY: 0.25, duration: 4, ease: "power2.inOut" }, 19.0)
      .to(el.querySelectorAll(".t5-rock"), { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "back.out(1.5)" }, 21.32)
      .to(el.querySelector(".t5-text2"), { opacity: 1, y: 0, duration: 0.8 }, 28.48);

    // Water shimmer
    gsap.to(el.querySelector(".t5-water-surface"), { x: -50, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#03080C", overflow: "hidden", padding: 0 }}>
      
      {/* Header */}
      <div style={{ position: "absolute", top: 80, left: 100, zIndex: 10 }}>
        <div className="t5-text1 f-oswald c-white" style={{ fontSize: 80, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2 }}>
          INVENTORY<br/>IS A BUFFER
        </div>
      </div>

      <div style={{ position: "absolute", top: 260, left: 100, zIndex: 10 }}>
        <div className="t5-text2 f-oswald" style={{ fontSize: 80, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2, color: "#FF3B30" }}>
          INVENTORY<br/>HIDES DEFECTS
        </div>
      </div>

      {/* Visual Metaphor */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 500 }}>
        
        {/* Rocks (Defects) */}
        <div style={{ position: "absolute", bottom: 0, left: 400, display: "flex", gap: 80, alignItems: "flex-end" }}>
          <svg width="120" height="180" className="t5-rock">
            <path d="M10,180 L40,80 L80,100 L110,20 L120,180 Z" fill="#FF3B30" opacity="0.8" />
            <text x="60" y="150" fill="#fff" fontSize="16" fontFamily="Inter" textAnchor="middle">DEFECTS</text>
          </svg>
          <svg width="160" height="120" className="t5-rock">
            <path d="M0,120 L50,40 L100,60 L140,10 L160,120 Z" fill="#FF3B30" opacity="0.8" />
            <text x="80" y="100" fill="#fff" fontSize="16" fontFamily="Inter" textAnchor="middle">DELAYS</text>
          </svg>
          <svg width="100" height="220" className="t5-rock">
            <path d="M0,220 L30,50 L70,90 L90,10 L100,220 Z" fill="#FF3B30" opacity="0.8" />
            <text x="50" y="180" fill="#fff" fontSize="16" fontFamily="Inter" textAnchor="middle">POOR QA</text>
          </svg>
        </div>

        {/* Water */}
        <div className="t5-water" style={{ position: "absolute", inset: 0, zIndex: 5 }}>
          <div className="t5-water-surface" style={{ 
            height: 10, width: "150%", background: "rgba(0,200,245,0.6)", 
            boxShadow: "0 0 20px rgba(0,200,245,0.5)"
          }} />
          <div style={{ height: "100%", background: "linear-gradient(to bottom, rgba(0,100,150,0.8), rgba(0,40,80,0.95))" }} />
        </div>

      </div>
    </div>
  );
}
