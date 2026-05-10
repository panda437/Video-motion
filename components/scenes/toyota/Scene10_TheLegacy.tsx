"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const LEGACY = [
  { label: "LEAN", sub: "Manufacturing" },
  { label: "AGILE", sub: "Software" },
  { label: "AMAZON", sub: "Logistics" }
];

export default function Scene10_TheLegacy() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".t10-headline"), { opacity: 0, y: 20 });
    gsap.set(el.querySelectorAll(".t10-card"), { opacity: 0, x: -30 });

    const tl = gsap.timeline({ delay: 0.4 });
    tl
      .to(el.querySelector(".t10-headline"), { opacity: 1, y: 0, duration: 0.6 })
      .to(el.querySelectorAll(".t10-card"), { opacity: 1, x: 0, stagger: 0.3, duration: 0.8, ease: "power3.out" }, 2.5);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#050805", padding: "0 120px", justifyContent: "center" }}>
      <div className="t10-headline f-inter t-small" style={{ marginBottom: 60, color: "rgba(255,255,255,0.4)", letterSpacing: 4 }}>
        A LEGACY BEYOND CARS
      </div>

      <div style={{ display: "flex", gap: 30 }}>
        {LEGACY.map((item, i) => (
          <div key={i} className="t10-card" style={{ 
            flex: 1, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
            borderLeft: "4px solid #2D5A27", padding: "40px 30px", borderRadius: 12
          }}>
            <div className="f-oswald c-white" style={{ fontSize: 60, fontWeight: 700, lineHeight: 1 }}>{item.label}</div>
            <div className="f-inter" style={{ fontSize: 20, color: "rgba(255,255,255,0.5)", marginTop: 12, textTransform: "uppercase", letterSpacing: 2 }}>{item.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
