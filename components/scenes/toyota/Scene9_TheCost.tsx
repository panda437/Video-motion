"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene9_TheCost() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".t9-headline"), { opacity: 0, y: 20 });
    gsap.set(el.querySelectorAll(".t9-node"), { scale: 0, opacity: 0 });
    gsap.set(el.querySelectorAll(".t9-link"), { scaleX: 0, transformOrigin: "left" });
    gsap.set(el.querySelector(".t9-trouble"), { opacity: 0, scale: 0.8 });

    const tl = gsap.timeline({ delay: 0.4 });
    tl
      .to(el.querySelector(".t9-headline"), { opacity: 1, y: 0, duration: 0.6 })
      .to(el.querySelectorAll(".t9-node"), { scale: 1, opacity: 1, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)" }, 3.08)
      .to(el.querySelectorAll(".t9-link"), { scaleX: 1, stagger: 0.1, duration: 0.4 }, 3.5)
      
      // The break
      .to(el.querySelectorAll(".t9-link")[2], { opacity: 0, duration: 0.1 }, 10.0)
      .to(el.querySelectorAll(".t9-node")[3], { background: "#FF3B30", borderColor: "#FF3B30", duration: 0.2 }, 10.0)
      .to(el.querySelector(".t9-trouble"), { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }, 10.5);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#0A0505", alignItems: "center", justifyContent: "center" }}>
      <div className="t9-headline f-inter t-small" style={{ position: "absolute", top: 80, color: "rgba(255,255,255,0.4)", letterSpacing: 4 }}>
        THE COST OF EFFICIENCY
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div className="t9-node" style={{ 
              width: 60, height: 60, border: "2px solid rgba(255,255,255,0.3)", borderRadius: 8,
              background: "rgba(255,255,255,0.05)"
            }} />
            {i < 4 && <div className="t9-link" style={{ width: 80, height: 2, background: "rgba(255,255,255,0.2)" }} />}
          </div>
        ))}
      </div>

      <div className="t9-trouble" style={{ position: "absolute", bottom: 120, textAlign: "center" }}>
        <div className="f-oswald" style={{ fontSize: 90, fontWeight: 700, color: "#FF3B30", lineHeight: 1, letterSpacing: -2 }}>
          JUST-IN-TROUBLE
        </div>
        <div className="f-inter" style={{ fontSize: 24, color: "rgba(255,255,255,0.5)", marginTop: 12 }}>
          Efficiency creates fragility.
        </div>
      </div>
    </div>
  );
}
