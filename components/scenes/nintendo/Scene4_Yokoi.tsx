"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

// Scene duration: 52.44s — Yokoi origin, lateral thinking, Game Boy proof point
const TIMELINE_ITEMS = [
  { year: "1965", event: "Gunpei Yokoi joins Nintendo as a maintenance engineer." },
  { year: "1989", event: "Game Boy launches — monochrome, underpowered, cheaper. Crushes full-color rivals." },
  { year: "1997", event: "Yokoi dies. His philosophy lives on through Miyamoto and Iwata." },
  { year: "2002", event: "Satoru Iwata becomes president. Makes lateral thinking company doctrine." },
];

export default function Scene4_Yokoi() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    gsap.set(el.querySelector(".n4-eyebrow"), { opacity: 0, y: 10 });
    gsap.set(el.querySelector(".n4-quote"),   { opacity: 0, y: 24 });
    gsap.set(el.querySelector(".n4-attr"),    { opacity: 0 });
    gsap.set(el.querySelector(".n4-tl-line"), { scaleY: 0, transformOrigin: "top center" });
    gsap.set(el.querySelectorAll(".n4-tl-item"), { opacity: 0, x: -24 });
    gsap.set(el.querySelector(".n4-gb"),      { opacity: 0, scale: 0.95 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl
      // Eyebrow + quote as narrator introduces Yokoi
      .to(el.querySelector(".n4-eyebrow"), { opacity: 1, y: 0, duration: 0.5 })
      .to(el.querySelector(".n4-quote"),   { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 17.8)
      .to(el.querySelector(".n4-attr"),    { opacity: 1, duration: 0.7, ease: "power2.out" }, 20.9)
      // Timeline line draws as narrator moves to chronology
      .to(el.querySelector(".n4-tl-line"), { scaleY: 1, duration: 1.2, ease: "power2.inOut" }, 3.5)
      // Each timeline item appears as its year is mentioned
      .to(el.querySelectorAll(".n4-tl-item")[0], { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, 3.5)
      .to(el.querySelectorAll(".n4-tl-item")[1], { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, 28.4)
      .to(el.querySelectorAll(".n4-tl-item")[2], { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, 37.0)
      .to(el.querySelectorAll(".n4-tl-item")[3], { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, 44.0)
      // Game Boy card arrives on "118 million units."
      .to(el.querySelector(".n4-gb"), { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.3)" }, 47.0);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene bg-cream" style={{ flexDirection: "row", padding: 0, alignItems: "stretch" }}>
      <div style={{ width: 520, display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px 60px 72px 100px", borderRight: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="n4-eyebrow f-inter t-small" style={{ color: "#999", marginBottom: 20 }}>The Origin · Gunpei Yokoi</div>
        <div className="n4-quote f-oswald c-dark" style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.25, letterSpacing: -0.5, fontStyle: "italic", marginBottom: 20 }}>
          &ldquo;Lateral thinking with withered technology.&rdquo;
        </div>
        <div className="n4-attr f-inter" style={{ fontSize: 15, color: "#666", lineHeight: 1.7, marginBottom: 32 }}>
          Don&apos;t chase the bleeding edge. Take cheap, well-understood,
          &ldquo;boring&rdquo; technology — and apply it in a creative way.
        </div>
        <div className="n4-gb" style={{ background: "#fff", borderRadius: 8, padding: "18px 24px", borderLeft: "4px solid #FF3B30" }}>
          <div className="f-oswald c-dark" style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Game Boy · 1989</div>
          <div className="f-inter" style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>
            Monochrome screen. Weaker than competitors. Lighter, cheaper, 10-hour battery.
            Sold <strong>118 million units.</strong> Won by refusing to compete on specs.
          </div>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px 80px", position: "relative" }}>
        <div style={{ position: "relative", paddingLeft: 32 }}>
          <div className="n4-tl-line" style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 2, background: "rgba(0,0,0,0.15)", borderRadius: 2 }} />
          {TIMELINE_ITEMS.map((t, i) => (
            <div key={i} className="n4-tl-item" style={{ position: "relative", marginBottom: i < TIMELINE_ITEMS.length - 1 ? 36 : 0 }}>
              <div style={{
                position: "absolute", left: -32 + 2, top: 6,
                width: 12, height: 12, borderRadius: "50%",
                background: t.year === "1989" ? "#FF3B30" : "#0A0A14",
                border: "2px solid " + (t.year === "1989" ? "#FF3B30" : "rgba(0,0,0,0.2)"),
              }} />
              <div className="f-oswald c-dark" style={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}>{t.year}</div>
              <div className="f-inter" style={{ fontSize: 14, color: "#555", marginTop: 5, lineHeight: 1.5, maxWidth: 280 }}>{t.event}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
