"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene6_TheCord() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".t6-title"), { opacity: 0, y: 20 });
    gsap.set(el.querySelector(".t6-handle"), { y: -100, opacity: 0 });
    gsap.set(el.querySelector(".t6-cord"), { scaleY: 0, transformOrigin: "top" });
    gsap.set(el.querySelector(".t6-bg"), { background: "#050505" });
    gsap.set(el.querySelector(".t6-alert"), { opacity: 0, scale: 0.8 });

    const tl = gsap.timeline({ delay: 0.4 });
    tl
      .to(el.querySelector(".t6-title"), { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
      .to(el.querySelector(".t6-handle"), { y: 0, opacity: 1, duration: 1, ease: "bounce.out" }, 3.92)
      .to(el.querySelector(".t6-cord"), { scaleY: 1, duration: 1, ease: "power2.out" }, 3.92)
      
      // Pull the cord
      .to(el.querySelector(".t6-handle"), { y: 60, duration: 0.2, ease: "power4.in" }, 7.56)
      .to(el.querySelector(".t6-cord"), { scaleY: 1.15, duration: 0.2, ease: "power4.in" }, 7.56)
      
      // Flash and Stop
      .to(el.querySelector(".t6-flash"), { opacity: 1, duration: 0.05 }, 10.56)
      .to(el.querySelector(".t6-flash"), { opacity: 0, duration: 0.5 }, 10.61)
      .to(el.querySelector(".t6-bg"), { background: "#1A0505", duration: 0.1 }, 10.56)
      .to(el.querySelector(".t6-alert"), { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, 10.7);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="t6-bg scene" style={{ background: "#050505", padding: 0 }}>
      <div className="t6-flash" style={{ position: "absolute", inset: 0, background: "#fff", opacity: 0, zIndex: 10, pointerEvents: "none" }} />
      
      {/* Title */}
      <div className="t6-title f-inter t-small" style={{ 
        position: "absolute", top: 40, width: "100%", textAlign: "center", 
        color: "rgba(255,255,255,0.4)", letterSpacing: 4, zIndex: 5 
      }}>
        THE ANDON CORD
      </div>

      {/* Cord - hanging from top center */}
      <div style={{ 
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", 
        display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2 
      }}>
        <div className="t6-cord" style={{ width: 4, height: 280, background: "#F5A623", boxShadow: "0 0 10px rgba(245,166,35,0.5)" }} />
        <div className="t6-handle" style={{ 
          width: 80, height: 28, background: "#F5A623", borderRadius: 14, 
          marginTop: -14, border: "2px solid rgba(0,0,0,0.3)" 
        }} />
      </div>

      {/* Alert - bottom center */}
      <div className="t6-alert" style={{ 
        position: "absolute", bottom: 120, left: "50%", transform: "translateX(-50%)",
        border: "2px solid #FF3B30", background: "rgba(255,59,48,0.1)", 
        padding: "32px 64px", borderRadius: 16, textAlign: "center", zIndex: 5,
        minWidth: 500
      }}>
        <div className="f-oswald" style={{ fontSize: 72, fontWeight: 700, color: "#FF3B30", lineHeight: 1, letterSpacing: -1 }}>
          LINE STOPPED
        </div>
        <div className="f-inter" style={{ fontSize: 24, color: "rgba(255,255,255,0.8)", marginTop: 12 }}>
          Fix at the source. Never hide a defect.
        </div>
      </div>
    </div>
  );
}
