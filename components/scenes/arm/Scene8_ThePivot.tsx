"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene8_ThePivot() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".hero-title"), { opacity: 0, y: 30 });
    gsap.set(el.querySelectorAll(".rule-box"), { opacity: 0, x: -40 });
    gsap.set(el.querySelector(".blueprint-box"), { opacity: 0, scale: 0.9 });

    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.to(el.querySelector(".hero-title"), { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 0)
      .to(el.querySelectorAll(".rule-box")[0], { opacity: 1, x: 0, duration: 0.6 }, 15.0)
      .to(el.querySelectorAll(".rule-box")[1], { opacity: 1, x: 0, duration: 0.6 }, 17.5)
      .to(el.querySelector(".blueprint-box"), { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.2)" }, 20.0);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#FAFAFA", padding: "0 100px", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div className="hero-title f-oswald" style={{ fontSize: 90, fontWeight: 700, color: "#18181B", lineHeight: 1, letterSpacing: -2, marginBottom: 80 }}>
        THE DECISION THAT<br/><span style={{ color: "#2563EB" }}>DEFINED 35 YEARS</span>
      </div>
      
      <div style={{ display: "flex", gap: 32, width: "100%", alignItems: "stretch" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="rule-box" style={{ background: "#fff", borderLeft: "8px solid #EF4444", padding: "24px", borderRadius: 8, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
            <div className="f-oswald" style={{ fontSize: 26, fontWeight: 700, color: "#18181B", lineHeight: 1.1, textTransform: "uppercase" }}>NEVER MANUFACTURE CHIPS.</div>
          </div>
          <div className="rule-box" style={{ background: "#fff", borderLeft: "8px solid #EF4444", padding: "24px", borderRadius: 8, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
            <div className="f-oswald" style={{ fontSize: 26, fontWeight: 700, color: "#18181B", lineHeight: 1.1, textTransform: "uppercase" }}>NEVER COMPETE WITH CUSTOMERS.</div>
          </div>
        </div>

        <div className="blueprint-box" style={{ flex: 0.7, background: "#18181B", padding: "32px", borderRadius: 16, color: "#fff", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
          <div className="f-inter" style={{ fontSize: 12, color: "#A1A1AA", fontWeight: 800, letterSpacing: 4, marginBottom: 12 }}>THE NEW MODEL</div>
          <div className="f-oswald" style={{ fontSize: 44, fontWeight: 900, color: "#2563EB", lineHeight: 1 }}>LICENSE THE<br/>BLUEPRINTS</div>
        </div>
      </div>
    </div>
  );
}
