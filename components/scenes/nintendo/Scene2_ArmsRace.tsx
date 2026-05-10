"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

// Scene duration: 34.68s — PS3/Xbox/Wii comparison through 1989 strategy setup
const CONSOLES = [
  { name: "PlayStation 3", year: "2006", price: "$599", tag: "Blu-ray · Cell processor · PC-rivaling power",    color: "#0070D1", muted: true },
  { name: "Xbox 360",      year: "2005", price: "$399", tag: "Raw horsepower · HD graphics · arms race",        color: "#107C10", muted: true },
  { name: "Nintendo Wii",  year: "2006", price: "$249", tag: "Weaker than last-gen · Critics called it a toy",  color: "#FF3B30", muted: false },
];

export default function Scene2_ArmsRace() {
  const ref = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    gsap.set(el.querySelector(".n2-headline"), { opacity: 0, y: 20 });
    gsap.set(el.querySelectorAll(".n2-card"),   { opacity: 0, y: 30 });
    gsap.set(el.querySelector(".n2-result"),    { opacity: 0, scaleX: 0.96, transformOrigin: "left center" });

    const counter = { val: 0 };
    const tl = gsap.timeline({ delay: 0.2 });
    tl
      .to(el.querySelector(".n2-headline"), { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      // Cards arrive with the price callouts: PS3 16.48s, Xbox 21.02s, Wii 24.66s.
      .to(el.querySelectorAll(".n2-card")[0], { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 0.0)
      .to(el.querySelectorAll(".n2-card")[1], { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 3.7)
      .to(el.querySelectorAll(".n2-card")[2], { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 7.4)
      // Highlight on "Nintendo didn't compete on specs."
      .to(el.querySelectorAll(".n2-card-muted"), { opacity: 0.28, duration: 0.8, ease: "power2.inOut" }, 10.0)
      .to(el.querySelector(".n2-card-highlight"), { scale: 1.04, duration: 0.6, ease: "back.out(1.5)", transformOrigin: "bottom center" }, 10.3)
      // Result lands as "The Wii sold 101 million units."
      .to(el.querySelector(".n2-result"), { opacity: 1, scaleX: 1, duration: 0.7, ease: "power3.out" }, 20.7)
      .to(counter, {
        val: 101, duration: 2.0, ease: "power2.out",
        onUpdate() { if (counterRef.current) counterRef.current.textContent = Math.round(counter.val) + "M"; },
      }, 21.0);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#13131F", justifyContent: "center", padding: "60px 100px", gap: 0 }}>
      <div className="n2-headline f-oswald" style={{ fontSize: 18, fontWeight: 400, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 36 }}>
        The Console War · 2005–2006
      </div>
      <div style={{ display: "flex", gap: 20, marginBottom: 36, alignItems: "flex-end" }}>
        {CONSOLES.map((c, i) => (
          <div key={i} className={`n2-card ${c.muted ? "n2-card-muted" : "n2-card-highlight"}`} style={{
            flex: 1, background: c.muted ? "rgba(255,255,255,0.04)" : "rgba(255,59,48,0.08)",
            border: `1.5px solid ${c.muted ? "rgba(255,255,255,0.1)" : c.color}`,
            borderRadius: 10, padding: "28px 24px 24px", position: "relative",
          }}>
            <div className="f-inter" style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: c.muted ? "rgba(255,255,255,0.35)" : c.color, marginBottom: 12 }}>{c.year}</div>
            <div className="f-oswald c-white" style={{ fontSize: c.muted ? 22 : 26, fontWeight: 700, lineHeight: 1.1, marginBottom: 10 }}>{c.name}</div>
            <div className="f-oswald" style={{ fontSize: c.muted ? 38 : 48, fontWeight: 700, lineHeight: 1, color: c.muted ? "rgba(255,255,255,0.7)" : "#FF3B30", marginBottom: 12 }}>{c.price}</div>
            <div className="f-inter" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{c.tag}</div>
          </div>
        ))}
      </div>
      <div className="n2-result" style={{
        background: "rgba(255,59,48,0.12)", border: "1px solid rgba(255,59,48,0.3)",
        borderRadius: 8, padding: "20px 28px", display: "flex", alignItems: "center", gap: 20,
      }}>
        <div style={{ flex: 1 }}>
          <div className="f-oswald c-white" style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.3 }}>The Wii outsold both of them.</div>
          <div className="f-inter" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>The weakest console. The &ldquo;toy.&rdquo; The winner.</div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div className="f-oswald" style={{ fontSize: 58, fontWeight: 700, color: "#FF3B30", lineHeight: 1 }}>
            <span ref={counterRef}>0M</span>
          </div>
          <div className="f-inter" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: 1, textTransform: "uppercase" }}>units sold</div>
        </div>
      </div>
    </div>
  );
}
