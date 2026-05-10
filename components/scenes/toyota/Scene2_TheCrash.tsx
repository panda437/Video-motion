"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene2_TheCrash() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".t2-headline"), { opacity: 0, y: 24 });
    gsap.set(el.querySelectorAll(".t2-digit"), { opacity: 0, y: 50, scale: 0.8 });
    gsap.set(el.querySelector(".t2-chart-path"), { strokeDasharray: 1000, strokeDashoffset: 1000 });
    gsap.set(el.querySelector(".t2-sub"), { opacity: 0 });
    gsap.set(el.querySelector(".t2-glow"), { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.4 });
    tl
      .to(el.querySelector(".t2-headline"), { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(el.querySelectorAll(".t2-digit"), { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.5)", stagger: 0.05 }, 0.5)
      .to(el.querySelector(".t2-chart-path"), { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, 1.0)
      
      // The "Crash" moment
      .to(el.querySelector(".t2-chart-path"), { stroke: "#FF3B30", duration: 0.2 }, 5.7)
      .to(el.querySelector(".t2-glow"), { opacity: 0.6, duration: 0.2 }, 5.7)
      .to(el.querySelector(".t2-digits-container"), { y: 15, duration: 0.1, ease: "power4.in" }, 5.7)
      .to(el.querySelector(".t2-digits-container"), { y: 0, duration: 0.4, ease: "bounce.out" }, 5.8)
      .to(el, { x: -10, duration: 0.05, yoyo: true, repeat: 5 }, 5.7)
      
      .to(el.querySelector(".t2-sub"), { opacity: 1, duration: 0.8 }, 8.2);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#0A0505", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <div className="t2-glow" style={{
        position: "absolute", bottom: "-20%", left: "50%", transform: "translateX(-50%)",
        width: "80%", height: "50%", background: "radial-gradient(ellipse, rgba(255,59,48,0.2) 0%, transparent 70%)",
        filter: "blur(40px)"
      }} />

      <div className="t2-headline f-inter t-small" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: 4, textTransform: "uppercase", marginBottom: 30 }}>
        The largest industrial bankruptcy in history
      </div>

      <div className="t2-digits-container" style={{ display: "flex", gap: 4, overflow: "hidden", padding: "10px 0" }}>
        {["$", "5", "0", ",", "0", "0", "0", ",", "0", "0", "0", ",", "0", "0", "0"].map((char, i) => (
          <div key={i} className={`t2-digit f-oswald ${char === "$" || char === "," ? "c-white" : ""}`} 
               style={{ fontSize: 130, fontWeight: 700, lineHeight: 1, color: char === "$" || char === "," ? "rgba(255,255,255,0.3)" : "#fff", letterSpacing: -2 }}>
            {char}
          </div>
        ))}
      </div>

      <div style={{ position: "relative", width: 600, height: 150, marginTop: 40 }}>
        <svg viewBox="0 0 600 150" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          <path className="t2-chart-path" d="M0,20 L100,25 L200,40 L300,50 L400,60 L450,120 L500,180 L600,200" 
                fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="t2-sub f-inter" style={{ marginTop: 20, fontSize: 24, color: "rgba(255,59,48,0.8)" }}>
        IN TAXPAYER BAILOUTS
      </div>
    </div>
  );
}
