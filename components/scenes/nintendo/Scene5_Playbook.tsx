"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

// Scene duration: 45.68s — Wii / DS / Switch playbook and pattern
const DEVICES = [
  { name: "WII",    year: "2006", innovation: "Motion controls",          price: "$249", criticLine: "\"Underpowered. Gimmicky. A toy.\"",               units: "101M", color: "#FF3B30" },
  { name: "DS",     year: "2004", innovation: "Dual screen + touchscreen", price: "$149", criticLine: "\"Two mediocre screens instead of one good one.\"", units: "154M", color: "#FFB800" },
  { name: "SWITCH", year: "2017", innovation: "Console + handheld hybrid", price: "$299", criticLine: "\"Weaker than a phone. Doomed.\"",                  units: "140M+", color: "#30D158" },
];

export default function Scene5_Playbook() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    gsap.set(el.querySelector(".n5-headline"), { opacity: 0, y: 20 });
    gsap.set(el.querySelectorAll(".n5-card"),  { opacity: 0, y: 36 });
    gsap.set(el.querySelector(".n5-pattern"), { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl
      .to(el.querySelector(".n5-headline"), { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      // Each device card appears roughly when its name is mentioned in narration
      .to(el.querySelector(".n5-card-0"), { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 1.9)
      .to(el.querySelector(".n5-card-1"), { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 14.2)
      .to(el.querySelector(".n5-card-2"), { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 26.0)
      // Pattern callout after all three are shown
      .to(el.querySelector(".n5-pattern"), { opacity: 1, duration: 0.8, ease: "power2.out" }, 35.2);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#0A0A14", justifyContent: "center", padding: "56px 80px" }}>
      <div className="n5-headline f-oswald" style={{ fontSize: 18, fontWeight: 400, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 32 }}>
        The Same Playbook. Three Times.
      </div>
      <div style={{ display: "flex", gap: 20, marginBottom: 32 }}>
        {DEVICES.map((d, i) => (
          <div key={i} className={`n5-card n5-card-${i}`} style={{
            flex: 1, background: "#13131F", border: `1px solid rgba(255,255,255,0.07)`,
            borderTop: `3px solid ${d.color}`, borderRadius: 10, padding: "24px 22px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div className="f-oswald c-white" style={{ fontSize: 28, fontWeight: 700, letterSpacing: 1 }}>{d.name}</div>
              <div className="f-inter" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: 1 }}>{d.year}</div>
            </div>
            <div className="f-inter" style={{ fontSize: 13, color: d.color, marginBottom: 4, fontWeight: 600 }}>{d.innovation}</div>
            <div className="f-oswald" style={{ fontSize: 28, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: 16 }}>{d.price}</div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 14 }} />
            <div className="f-inter" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontStyle: "italic", lineHeight: 1.5, marginBottom: 14 }}>{d.criticLine}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <div className="f-oswald" style={{ fontSize: 36, fontWeight: 700, color: d.color, lineHeight: 1 }}>{d.units}</div>
              <div className="f-inter" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>units sold</div>
            </div>
          </div>
        ))}
      </div>
      <div className="n5-pattern" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "16px 28px", textAlign: "center" }}>
        <div className="f-oswald c-white" style={{ fontSize: 20, fontWeight: 600 }}>
          Each time: critics called it gimmicky. Each time: it sold over 100 million units.
        </div>
      </div>
    </div>
  );
}
