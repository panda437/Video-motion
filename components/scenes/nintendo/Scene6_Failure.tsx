"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

// Scene duration: 43.78s — Wii U failure and the three requirements
const BARS = [
  { label: "Wii",   units: 101, color: "#30D158" },
  { label: "Wii U", units: 13,  color: "#FF3B30" },
];

const REQUIREMENTS = [
  { icon: "①", text: "A genuinely different platform concept" },
  { icon: "②", text: "Killer first-party software (Mario, Zelda, Pokémon)" },
  { icon: "③", text: "A price point that justifies the trade-off" },
];

export default function Scene6_Failure() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    gsap.set(el.querySelector(".n6-headline"), { opacity: 0, y: 20 });
    gsap.set(el.querySelectorAll(".n6-bar-fill"), { scaleX: 0, transformOrigin: "left center" });
    gsap.set(el.querySelectorAll(".n6-bar-label, .n6-bar-val"), { opacity: 0, x: -12 });
    gsap.set(el.querySelectorAll(".n6-req"), { opacity: 0, x: -20 });
    gsap.set(el.querySelector(".n6-close"), { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl
      .to(el.querySelector(".n6-headline"), { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
      // Bar chart — shows as narrator describes the Wii U failure numbers
      .to(el.querySelectorAll(".n6-bar-label"), { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", stagger: 0.4 }, 6.5)
      .to(el.querySelector(".n6-bar-0"),  { scaleX: 1, duration: 1.1, ease: "power3.out" }, 7.4)
      .to(el.querySelector(".n6-val-0"),  { opacity: 1, x: 0, duration: 0.4 }, 8.4)
      .to(el.querySelector(".n6-bar-1"),  { scaleX: 1, duration: 0.5, ease: "power3.out" }, 9.6)
      .to(el.querySelector(".n6-val-1"),  { opacity: 1, x: 0, duration: 0.4 }, 10.1)
      // Requirements appear one by one as narrator lists them
      .to(el.querySelector(".n6-req-0"),  { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, 19.0)
      .to(el.querySelector(".n6-req-1"),  { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, 22.1)
      .to(el.querySelector(".n6-req-2"),  { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, 26.3)
      // Close line as narrator delivers the "just underpowered" line
      .to(el.querySelector(".n6-close"),  { opacity: 1, duration: 0.8, ease: "power2.out" }, 38.8);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#120C00", flexDirection: "row", padding: 0, alignItems: "stretch" }}>
      <div style={{ width: 480, display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px 56px 72px 100px", borderRight: "1px solid rgba(255,165,0,0.1)" }}>
        <div className="n6-headline f-oswald" style={{ fontSize: 20, fontWeight: 400, letterSpacing: 3, textTransform: "uppercase", color: "#FFB800", marginBottom: 12 }}>
          The strategy doesn&apos;t always work.
        </div>
        <div className="f-oswald c-white" style={{ fontSize: 50, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, marginBottom: 40 }}>
          The Wii U was a disaster.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {BARS.map((b, i) => (
            <div key={i}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
                <div className={`n6-bar-label f-oswald`} style={{ width: 52, fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: 1 }}>{b.label}</div>
                <div style={{ flex: 1, height: 28, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
                  <div className={`n6-bar-fill n6-bar-${i}`} style={{ height: "100%", width: `${(b.units / 101) * 100}%`, background: b.color, borderRadius: 3 }} />
                </div>
                <div className={`n6-bar-val n6-val-${i} f-oswald`} style={{ width: 60, fontSize: 20, fontWeight: 700, color: b.color, textAlign: "right" }}>{b.units}M</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px 80px" }}>
        <div className="f-oswald" style={{ fontSize: 18, color: "#FFB800", letterSpacing: 2, textTransform: "uppercase", marginBottom: 28 }}>
          The strategy requires all three:
        </div>
        {REQUIREMENTS.map((r, i) => (
          <div key={i} className={`n6-req n6-req-${i}`} style={{
            display: "flex", gap: 18, alignItems: "flex-start",
            marginBottom: 24, paddingBottom: 24,
            borderBottom: i < REQUIREMENTS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
          }}>
            <div className="f-oswald" style={{ fontSize: 22, color: "#FFB800", fontWeight: 700, flexShrink: 0, lineHeight: 1 }}>{r.icon}</div>
            <div className="f-inter c-white" style={{ fontSize: 16, lineHeight: 1.5, color: "rgba(255,255,255,0.75)" }}>{r.text}</div>
          </div>
        ))}
        <div className="n6-close" style={{ borderLeft: "3px solid #FFB800", paddingLeft: 20, marginTop: 8 }}>
          <div className="f-oswald c-white" style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.3 }}>
            Without Mario, Zelda, and Pokémon —<br />
            <span style={{ color: "#FFB800" }}>&ldquo;different but underpowered&rdquo; is just underpowered.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
