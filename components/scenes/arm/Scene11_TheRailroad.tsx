"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene11_TheRailroad() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".title"), { opacity: 0, y: 20 });
    gsap.set(el.querySelectorAll(".infrastructure-line"), { scaleX: 0, transformOrigin: "left" });
    gsap.set(el.querySelectorAll(".strike-word"), { opacity: 0, x: -20 });
    gsap.set(el.querySelectorAll(".strike-line"), { scaleX: 0, transformOrigin: "left" });
    gsap.set(el.querySelector(".permanence"), { opacity: 0, scale: 1.5, filter: "blur(20px)" });

    const tl = gsap.timeline({ delay: 0.5 });
    
    // 8:15.92 "Railroad tracks"
    tl.to(el.querySelector(".title"), { opacity: 1, y: 0, duration: 0.8 }, 0)
      .to(el.querySelectorAll(".infrastructure-line"), { scaleX: 1, stagger: 0.1, duration: 1.5, ease: "power2.inOut" }, 0.5);

    // Data pulses
    gsap.to(el.querySelectorAll(".pulse"), {
      x: 1400, duration: 1.2, stagger: { each: 0.4, repeat: -1 }, ease: "none"
    });

    // 8:22 "Give up glamour, brand recognition, high margins"
    tl.to(el.querySelectorAll(".strike-word")[0], { opacity: 1, x: 0, duration: 0.4 }, 6.5)
      .to(el.querySelectorAll(".strike-line")[0], { scaleX: 1, duration: 0.3, ease: "power2.out" }, 6.8)
      .to(el.querySelectorAll(".strike-word")[1], { opacity: 1, x: 0, duration: 0.4 }, 7.5)
      .to(el.querySelectorAll(".strike-line")[1], { scaleX: 1, duration: 0.3, ease: "power2.out" }, 7.8)
      .to(el.querySelectorAll(".strike-word")[2], { opacity: 1, x: 0, duration: 0.4 }, 9.0)
      .to(el.querySelectorAll(".strike-line")[2], { scaleX: 1, duration: 0.3, ease: "power2.out" }, 9.3);

    // 8:28 "Permanence"
    tl.to(el.querySelector(".permanence"), { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out" }, 12.0)
      .to(el.querySelector(".title"), { opacity: 0, duration: 1 }, 12.0)
      .to(el.querySelector(".sacrifices"), { opacity: 0, duration: 1 }, 12.0);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#FAFAFA", padding: 0, overflow: "hidden" }}>
      
      {/* Infrastructure Lines */}
      <div style={{ position: "absolute", top: "20%", width: "100%", height: "60%", display: "flex", flexDirection: "column", justifyContent: "space-between", zIndex: 0, opacity: 0.4 }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{ position: "relative", width: "100%", height: 2 }}>
            <div className="infrastructure-line" style={{ width: "100%", height: "100%", background: "#D4D4D8" }} />
            <div className="pulse" style={{ position: "absolute", top: -2, left: -100, width: 100, height: 6, background: "#2563EB", borderRadius: 3, boxShadow: "0 0 10px #2563EB" }} />
          </div>
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 10, width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "80px 100px" }}>
        
        <div className="title f-oswald" style={{ fontSize: 80, fontWeight: 700, color: "#18181B", letterSpacing: -2, lineHeight: 1.1 }}>
          THE INFRASTRUCTURE<br/>OF MODERN COMPUTING
        </div>

        <div className="sacrifices" style={{ marginTop: "auto", display: "flex", gap: 60, paddingBottom: 40 }}>
          {["GLAMOUR", "BRAND RECOGNITION", "HIGH MARGINS"].map((word, i) => (
            <div key={i} className="strike-word" style={{ position: "relative" }}>
              <div className="f-inter" style={{ fontSize: 28, color: "#71717A", fontWeight: 600, letterSpacing: 2 }}>{word}</div>
              <div className="strike-line" style={{ position: "absolute", top: "50%", left: -10, right: -10, height: 4, background: "#EF4444" }} />
            </div>
          ))}
        </div>

        <div className="permanence f-oswald" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: 160, fontWeight: 900, color: "#18181B", letterSpacing: -4 }}>
          PERMANENCE
        </div>

      </div>
    </div>
  );
}