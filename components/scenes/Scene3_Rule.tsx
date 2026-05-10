"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

const BARS = [
  { label: "COSTCO",          pct: 14,  maxPct: 14,  color: "#E31837", highlight: true },
  { label: "GROCERY STORES",  pct: 37,  maxPct: 50,  color: "#ccc",    highlight: false },
  { label: "DEPT. STORES",    pct: 60,  maxPct: 60,  color: "#999",    highlight: false },
];

export default function Scene3_Rule() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelectorAll(".s3-l1, .s3-l2"), { yPercent: 110 });
    gsap.set(el.querySelectorAll(".s3-bar-fill"), { scaleX: 0, transformOrigin: "left center" });
    gsap.set(el.querySelectorAll(".s3-bar-label, .s3-bar-pct"), { opacity: 0, x: -12 });
    gsap.set(el.querySelector(".s3-card"), { opacity: 0, y: 20, scale: 0.97 });
    gsap.set(el.querySelector(".s3-footnote"), { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl
      .to(el.querySelectorAll(".s3-l1"), { yPercent: 0, duration: 0.8, ease: "power3.out" }, 0)
      .to(el.querySelectorAll(".s3-l2"), { yPercent: 0, duration: 0.8, ease: "power3.out" }, 0.35)
      .to(el.querySelectorAll(".s3-bar-label"), { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", stagger: 0.18 }, 1.5)
      .to(el.querySelectorAll(".s3-bar-fill"), {
        scaleX: 1, duration: 1.1, ease: "power3.out", stagger: 0.2,
      }, 1.8)
      .to(el.querySelectorAll(".s3-bar-pct"), { opacity: 1, x: 0, duration: 0.4, ease: "power2.out", stagger: 0.18 }, 2.4)
      .to(el.querySelector(".s3-card"), { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.4)" }, 4.0)
      .to(el.querySelector(".s3-footnote"), { opacity: 1, duration: 0.6, ease: "power2.out" }, 5.2);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene bg-white" style={{ justifyContent: "center", padding: "72px 100px" }}>

      {/* Headline */}
      <div style={{ marginBottom: 56 }}>
        <div style={{ overflow: "hidden", marginBottom: 4 }}>
          <div className="s3-l1 f-oswald c-dark" style={{ fontSize: 20, fontWeight: 400, letterSpacing: 3, textTransform: "uppercase", color: "#999" }}>
            The Costco Model
          </div>
        </div>
        <div style={{ overflow: "hidden" }}>
          <div className="s3-l2 f-oswald c-dark" style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            Don&apos;t be a store.<br />Be a club.
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div style={{ width: "100%", marginBottom: 40, display: "flex", flexDirection: "column", gap: 22 }}>
        {BARS.map((bar, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* Label */}
            <div className={`s3-bar-label f-oswald ${bar.highlight ? "c-red" : "c-dark"}`}
              style={{ width: 220, fontSize: 17, fontWeight: 700, letterSpacing: 1, flexShrink: 0 }}>
              {bar.label}
            </div>

            {/* Track */}
            <div style={{
              flex: 1, height: bar.highlight ? 36 : 28,
              background: bar.highlight ? "rgba(227,24,55,0.08)" : "#f0f0f0",
              borderRadius: 3, position: "relative", overflow: "hidden",
            }}>
              <div className="s3-bar-fill" style={{
                height: "100%",
                width: `${(bar.pct / 60) * 100}%`,
                background: bar.color,
                borderRadius: 3,
              }} />
            </div>

            {/* Value */}
            <div className={`s3-bar-pct f-oswald ${bar.highlight ? "c-red" : "c-dark"}`}
              style={{ width: 68, fontSize: bar.highlight ? 26 : 20, fontWeight: 700, flexShrink: 0, textAlign: "right" }}>
              {bar.pct === bar.maxPct ? `${bar.pct}%` : `${bar.pct}–${bar.maxPct}%`}
            </div>
          </div>
        ))}
      </div>

      {/* Membership card */}
      <div className="s3-card" style={{
        background: "#E31837", color: "#fff", borderRadius: 8,
        padding: "22px 36px", display: "flex", alignItems: "center",
        gap: 24, alignSelf: "flex-start",
      }}>
        <div className="f-oswald" style={{ fontSize: 52, fontWeight: 700, letterSpacing: -1 }}>$65</div>
        <div>
          <div className="f-oswald" style={{ fontSize: 22, fontWeight: 600, letterSpacing: 0.5 }}>ANNUAL MEMBERSHIP</div>
          <div className="f-inter" style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", marginTop: 4 }}>
            The actual product. The actual business.
          </div>
        </div>
      </div>

      <div className="s3-footnote f-inter" style={{
        marginTop: 20, fontSize: 14, color: "#bbb",
      }}>
        Markup cap is written into Costco policy. Buyers who exceed it get fired.
      </div>
    </div>
  );
}
