"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene3_TheChaos() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".t3-title"), { opacity: 0, y: 20 });
    gsap.set(el.querySelectorAll(".t3-door-path"), { strokeDasharray: 800, strokeDashoffset: 800 });
    gsap.set(el.querySelector(".t3-bottle"), { y: -300, opacity: 0, rotate: 15 });
    gsap.set(el.querySelector(".t3-panel"), { opacity: 0, x: -30 });
    gsap.set(el.querySelectorAll(".t3-detail"), { opacity: 0, x: 20 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl
      .to(el.querySelector(".t3-title"), { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 6.28)
      .to(el.querySelectorAll(".t3-door-path"), { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, 7.0)
      
      // Details stagger in
      .to(el.querySelectorAll(".t3-detail")[0], { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, 9.0) // Worst plant
      .to(el.querySelectorAll(".t3-detail")[1], { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, 15.84) // Drank
      .to(el.querySelectorAll(".t3-detail")[2], { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, 20.0) // Sex
      
      // Bottle falls into door
      .to(el.querySelector(".t3-bottle"), { y: 40, opacity: 1, duration: 0.6, ease: "power2.in" }, 22.64)
      .to(el.querySelector(".t3-bottle"), { rotate: 5, y: 45, duration: 0.1, ease: "bounce.out" }, 23.24)
      
      // Panel closes
      .to(el.querySelector(".t3-panel"), { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, 28.88)
      
      .to(el.querySelectorAll(".t3-detail")[3], { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, 34.0) // Absenteeism
      .to(el.querySelectorAll(".t3-detail")[4], { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, 39.6); // Closed 1982

    // Rattle effect
    gsap.to(el.querySelector(".t3-bottle"), {
      x: 2, y: 46, rotate: 6, duration: 0.05, repeat: -1, yoyo: true, delay: 23.24
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#0B0C10", flexDirection: "row", alignItems: "stretch", padding: 0 }}>
      {/* Left: Graphic */}
      <div style={{ flex: 1, position: "relative", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ position: "relative", width: 350, height: 450 }}>
          {/* Car Door Wireframe */}
          <svg viewBox="0 0 350 450" style={{ position: "absolute", inset: 0, zIndex: 1 }}>
            <path className="t3-door-path" d="M50,150 L100,50 L250,50 L300,150 L320,400 L30,400 Z" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
            <path className="t3-door-path" d="M50,150 L300,150" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
            <rect className="t3-door-path" x="220" y="170" width="40" height="10" rx="4" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          </svg>
          
          {/* Bottle SVG */}
          <div className="t3-bottle" style={{ position: "absolute", left: 140, zIndex: 2 }}>
            <svg width="40" height="120" viewBox="0 0 40 120">
              <path d="M15,0 L25,0 L25,30 C25,40 35,50 35,60 L35,110 C35,115 30,120 20,120 C10,120 5,115 5,110 L5,60 C5,50 15,40 15,30 Z" 
                    fill="rgba(0,200,245,0.15)" stroke="#00C8F5" strokeWidth="2" />
              <rect x="5" y="70" width="30" height="20" fill="#00C8F5" />
            </svg>
          </div>

          {/* Door Inner Panel (closes over) */}
          <div className="t3-panel" style={{
            position: "absolute", inset: 0, zIndex: 3, 
            background: "linear-gradient(to right, rgba(15,16,20,0.95), rgba(15,16,20,0.8))",
            clipPath: "polygon(50px 150px, 300px 150px, 320px 400px, 30px 400px)",
            border: "1px solid rgba(255,255,255,0.1)"
          }} />
        </div>
      </div>

      {/* Right: Text */}
      <div style={{ width: 500, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px" }}>
        <div className="t3-title f-inter t-small" style={{ color: "#FF3B30", marginBottom: 24, letterSpacing: 2 }}>
          FREMONT, CALIFORNIA (1982)
        </div>
        <div className="f-oswald c-white t3-detail" style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1, marginBottom: 30 }}>
          WORST PLANT<br/>IN AMERICA
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            "Drinking on the assembly line",
            "Sex inside cars and active sabotage",
            "Absenteeism: dragging workers from the bar",
            "GM closed the plant in 1982"
          ].map((text, i) => (
            <div key={i} className="t3-detail" style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ width: 4, height: 24, background: "#FF3B30", marginTop: 4 }} />
              <div className="f-inter" style={{ fontSize: 24, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>{text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
