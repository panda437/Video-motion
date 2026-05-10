"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const COLS = [
  {
    cls: "a6-c1",
    label: "THE INDUSTRY'S BET",
    title: "157nm lithography",
    body: "Nikon & Canon bet billions on squeezing more from visible light.",
    mark: "✕", markBg: "#FF4444", markColor: "#fff",
    border: "rgba(255,68,68,0.35)", bg: "rgba(255,68,68,0.07)", labelColor: "rgba(255,68,68,0.8)",
  },
  {
    cls: "a6-c2",
    label: "ASML BET #1",
    title: "Water immersion",
    body: "Put water under the lens. Shortens 193nm wavelength. Simpler. It worked.",
    mark: "✓", markBg: "#00E676", markColor: "#040810",
    border: "rgba(0,200,245,0.35)", bg: "rgba(0,200,245,0.07)", labelColor: "#00C8F5",
  },
  {
    cls: "a6-c3",
    label: "ASML BET #2 — THE BIG ONE",
    title: "EUV — 20 years",
    body: "Prototype 2006: 1 wafer/23 hrs. First commercial chips: 2019.",
    mark: "✓", markBg: "#F5A623", markColor: "#040810",
    border: "rgba(245,166,35,0.35)", bg: "rgba(245,166,35,0.07)", labelColor: "#F5A623",
  },
];

export default function Scene6_TwoBets() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".a6-title"),  { opacity: 0, y: 20 });
    gsap.set(el.querySelectorAll(".a6-col"), { opacity: 0, y: 24 });
    gsap.set(el.querySelectorAll(".a6-mark"),{ opacity: 0, scale: 0.4 });
    gsap.set(el.querySelector(".a6-result"),{ opacity: 0, scale: 0.92 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl
      .to(el.querySelector(".a6-title"), { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(el.querySelectorAll(".a6-col"), { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 3.5 }, 1.5)
      .to(el.querySelectorAll(".a6-mark"), { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)", stagger: 3.5 }, 4.5)
      .to(el.querySelector(".a6-result"), { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.3)" }, 30.0);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{
      background: "#050A14", flexDirection: "column",
      justifyContent: "center", padding: "32px 80px",
    }}>
      <div className="a6-title f-oswald c-white" style={{
        fontSize: 44, fontWeight: 700, letterSpacing: -1, marginBottom: 20,
      }}>
        ASML Made Two Non-Obvious Bets
      </div>

      {/* 3-column grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 16 }}>
        {COLS.map((c, i) => (
          <div key={i} className="a6-col" style={{
            background: c.bg,
            border: `1px solid ${c.border}`,
            borderTop: `3px solid ${c.border}`,
            borderRadius: 12, padding: "22px 24px",
            position: "relative",
          }}>
            <div className="f-inter" style={{
              fontSize: 28, color: c.labelColor, letterSpacing: 2,
              textTransform: "uppercase", marginBottom: 12, lineHeight: 1.3,
            }}>
              {c.label}
            </div>
            <div className="f-oswald c-white" style={{
              fontSize: 38, fontWeight: 700, lineHeight: 1.1, marginBottom: 12,
            }}>
              {c.title}
            </div>
            <div className="f-inter" style={{
              fontSize: 30, color: "rgba(255,255,255,0.55)", lineHeight: 1.5,
            }}>
              {c.body}
            </div>
            <div className="a6-mark" style={{
              position: "absolute", top: 16, right: 16,
              width: 44, height: 44, borderRadius: "50%",
              background: c.markBg, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26, color: c.markColor, fontWeight: 700,
            }}>{c.mark}</div>
          </div>
        ))}
      </div>

      {/* Result */}
      <div className="a6-result" style={{
        display: "flex", gap: 28, alignItems: "center",
        background: "rgba(0,230,118,0.08)", border: "2px solid rgba(0,230,118,0.35)",
        borderRadius: 12, padding: "14px 28px",
      }}>
        <div className="f-oswald" style={{ fontSize: 64, fontWeight: 700, color: "#00E676", lineHeight: 1 }}>
          100%
        </div>
        <div style={{ width: 2, height: 64, background: "rgba(0,230,118,0.25)" }} />
        <div>
          <div className="f-oswald c-white" style={{ fontSize: 34, fontWeight: 600, lineHeight: 1.2 }}>
            EUV monopoly today
          </div>
          <div className="f-inter" style={{ fontSize: 30, color: "rgba(255,255,255,0.55)", lineHeight: 1.5, marginTop: 4 }}>
            Nikon&apos;s 2014 annual report didn&apos;t mention EUV once. <span style={{ color: "#FF4444" }}>They had quietly given up.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
