"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const EVENTS = [
  { year: "1984", text: "Founded in a leaky shed next to Philips, Eindhoven.", sub: "Joint venture between Philips and ASM International.", color: "#00C8F5", highlight: false },
  { year: "1992", text: "Near bankruptcy — emergency 36M guilder loan from Philips.", sub: "Losing badly to Nikon and Canon.",                          color: "#FF4444", highlight: true  },
  { year: "1995", text: "IPO. Still a distant underdog.",                             sub: "Nikon and Canon dominate the market.",                       color: "#F5A623", highlight: false },
  { year: "2000s", text: "Water immersion bet pays off. Nikon's 157nm investment collapses.", sub: "ASML captures ~70% of the lithography market by 2009.", color: "#00E676", highlight: false },
  { year: "2017", text: "First 10 commercial EUV machines shipped.",                 sub: "2019: first EUV-printed chips in consumer phones.",          color: "#00C8F5", highlight: false },
];

export default function Scene5_Origin() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".a5-title"),    { opacity: 0, y: 20 });
    gsap.set(el.querySelector(".a5-tl-line"), { scaleY: 0, transformOrigin: "top center" });
    gsap.set(el.querySelectorAll(".a5-dot"),   { opacity: 0, scale: 0.2, transformOrigin: "center center" });
    gsap.set(el.querySelectorAll(".a5-event"), { opacity: 0, x: -24 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl
      .to(el.querySelector(".a5-title"),   { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(el.querySelector(".a5-tl-line"), { scaleY: 1, duration: 1.6, ease: "power2.inOut" }, 0.8);

    // Each event: dot pops in first, then card slides in
    EVENTS.forEach((_, i) => {
      const t = 1.2 + i * 5.0;
      tl
        .to(el.querySelectorAll(".a5-dot")[i],   { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(3)" }, t)
        .to(el.querySelectorAll(".a5-event")[i], { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, t + 0.2);
    });

    // 1992 near-bankruptcy dot pulses aggressively while its card shows
    const crisisDot = el.querySelectorAll(".a5-dot")[1];
    gsap.to(crisisDot, {
      scale: 1.5, duration: 0.45, ease: "power2.inOut",
      repeat: -1, yoyo: true, delay: 1.2 + 1 * 5.0 + 0.4,
    });

    return () => {
      tl.kill();
      gsap.killTweensOf(crisisDot);
    };
  }, []);

  return (
    <div ref={ref} className="scene" style={{
      background: "#06081A", flexDirection: "column",
      justifyContent: "center", padding: "44px 100px",
    }}>
      <div className="a5-title f-oswald c-white" style={{
        fontSize: 50, fontWeight: 700, letterSpacing: -1, lineHeight: 1.0, marginBottom: 36,
      }}>
        From Leaky Shed to Monopoly
      </div>

      <div style={{ position: "relative", paddingLeft: 40 }}>
        <div className="a5-tl-line" style={{
          position: "absolute", left: 10, top: 6, bottom: 6,
          width: 3, background: "rgba(0,200,245,0.2)", borderRadius: 2,
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {EVENTS.map((e, i) => (
            <div key={i} className="a5-event" style={{ position: "relative", display: "flex", gap: 24, alignItems: "flex-start" }}>
              {/* dot */}
              <div className="a5-dot" style={{
                position: "absolute", left: -40 + 4, top: 10,
                width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                background: e.highlight ? "#FF4444" : e.color,
                boxShadow: e.highlight ? "0 0 14px rgba(255,68,68,0.9), 0 0 4px rgba(255,68,68,1)" : `0 0 8px ${e.color}60`,
              }} />

              {/* year badge */}
              <div className="f-oswald" style={{
                fontSize: 40, fontWeight: 700, color: e.color, lineHeight: 1,
                width: 96, flexShrink: 0,
              }}>
                {e.year}
              </div>

              {/* content */}
              <div style={{
                flex: 1,
                background: e.highlight ? "rgba(255,68,68,0.08)" : "rgba(255,255,255,0.03)",
                border: e.highlight ? "1px solid rgba(255,68,68,0.3)" : "1px solid rgba(255,255,255,0.06)",
                borderLeft: `3px solid ${e.color}`,
                borderRadius: 8, padding: "10px 18px",
              }}>
                <div className="f-oswald" style={{ fontSize: 34, fontWeight: 600, color: "rgba(255,255,255,0.9)", lineHeight: 1.2 }}>
                  {e.text}
                </div>
                <div className="f-inter" style={{ fontSize: 30, color: "rgba(255,255,255,0.45)", lineHeight: 1.4, marginTop: 4 }}>
                  {e.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
