"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene5_PDABet() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".chart-arm"), { scaleY: 0, transformOrigin: "bottom" });
    gsap.set(el.querySelector(".chart-other"), { scaleY: 0, transformOrigin: "bottom" });
    gsap.set(el.querySelector(".hero-text"), { opacity: 0, y: 20 });
    gsap.set(el.querySelector(".apple-box"), { opacity: 0, scale: 0.9 });

    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.to(el.querySelector(".hero-text"), { opacity: 1, y: 0, duration: 0.8 }, 2.0)
      .to(el.querySelector(".chart-other"), { scaleY: 1, duration: 1, ease: "power3.out" }, 5.0)
      .to(el.querySelector(".chart-arm"), { scaleY: 1, duration: 1, ease: "power3.out" }, 6.0)
      .to(el.querySelector(".apple-box"), { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" }, 8.0);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#FAFAFA", padding: "0 100px", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      
      <div style={{ flex: 1 }}>
        <div className="hero-text f-oswald" style={{ fontSize: 80, fontWeight: 700, color: "#18181B", lineHeight: 1.1, letterSpacing: -2 }}>
          THE APPLE NEWTON<br/>NEEDED BATTERY LIFE
        </div>
        
        <div className="apple-box" style={{ marginTop: 60, background: "#fff", border: "1px solid #E4E4E7", padding: "32px", borderRadius: 12, width: 400, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
          <div className="f-inter" style={{ fontSize: 16, color: "#71717A", fontWeight: 600, letterSpacing: 2, marginBottom: 8 }}>THE PROPOSAL</div>
          <div className="f-oswald" style={{ fontSize: 40, fontWeight: 700, color: "#18181B", lineHeight: 1.2 }}>
            $3 MILLION FOR A<br/><span style={{ color: "#2563EB" }}>30% STAKE</span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-end", height: 400, gap: 40, borderBottom: "2px solid #E4E4E7", paddingBottom: 0 }}>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div className="f-inter" style={{ fontSize: 18, color: "#71717A", fontWeight: 600 }}>INTEL / MOTOROLA</div>
          <div className="chart-other" style={{ width: 120, height: 100, background: "#E4E4E7", borderRadius: "8px 8px 0 0" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div className="f-inter" style={{ fontSize: 18, color: "#2563EB", fontWeight: 600 }}>ARM DESIGN</div>
          <div className="chart-arm" style={{ width: 120, height: 300, background: "#2563EB", borderRadius: "8px 8px 0 0", boxShadow: "0 -10px 30px rgba(37,99,235,0.2)" }} />
        </div>

      </div>

    </div>
  );
}