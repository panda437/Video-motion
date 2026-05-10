"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const BANS = [
  { label: "EUV",      text: "Never shipped to China",               color: "#FF4444", bg: "rgba(255,68,68,0.08)" },
  { label: "DUV 2025", text: "Older machines now need export licence", color: "#F5A623", bg: "rgba(245,166,35,0.08)" },
  { label: "Software", text: "Updates to sold machines: blocked",     color: "#FF6B6B", bg: "rgba(255,68,68,0.06)" },
];

const ALLIES = ["🇺🇸 USA", "🇳🇱 NL", "🇯🇵 Japan", "🇰🇷 Korea", "🇹🇼 Taiwan"];

export default function Scene8_Geopolitics() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".a8-headline"), { opacity: 0, y: 20 });
    gsap.set(el.querySelector(".a8-weapon"),   { opacity: 0 });
    gsap.set(el.querySelector(".a8-map"),      { opacity: 0, scale: 0.95 });
    gsap.set(el.querySelector(".a8-ban"),      { opacity: 0, x: 20 });
    gsap.set(el.querySelector(".a8-china"),    { opacity: 0, y: 16 });
    gsap.set(el.querySelector(".a8-question"), { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl
      .to(el.querySelector(".a8-headline"), { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(el.querySelector(".a8-weapon"),   { opacity: 1, duration: 0.7 }, 2.0)
      .to(el.querySelector(".a8-map"),      { opacity: 1, scale: 1, duration: 0.7 }, 4.5)
      .to(el.querySelector(".a8-ban"),      { opacity: 1, x: 0, duration: 0.7 }, 7.0)
      .to(el.querySelector(".a8-china"),    { opacity: 1, y: 0, duration: 0.7 }, 18.0)
      .to(el.querySelector(".a8-question"), { opacity: 1, duration: 0.8 }, 28.0);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{
      background: "#080612", flexDirection: "column",
      justifyContent: "center", padding: "22px 72px",
    }}>
      <div className="a8-headline f-oswald c-white" style={{
        fontSize: 46, fontWeight: 700, letterSpacing: -1, lineHeight: 1.1, marginBottom: 8,
      }}>
        A Monopoly as a Geopolitical Weapon
      </div>

      <div className="a8-weapon" style={{
        background: "rgba(255,68,68,0.08)", border: "1px solid rgba(255,68,68,0.25)",
        borderRadius: 8, padding: "10px 20px", marginBottom: 12,
      }}>
        <div className="f-inter" style={{ fontSize: 30, color: "#FF6B6B", lineHeight: 1.35 }}>
          The US weaponised ASML&apos;s monopoly to cut China off from advanced chips.
        </div>
      </div>

      {/* Middle row: map | ban details */}
      <div style={{ display: "flex", gap: 20, marginBottom: 8 }}>
        {/* Access map */}
        <div className="a8-map" style={{
          flex: 1, background: "rgba(0,200,245,0.04)",
          border: "1px solid rgba(0,200,245,0.12)",
          borderRadius: 12, padding: "14px 18px",
        }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
            {ALLIES.map((a, i) => (
              <div key={i} style={{
                background: "rgba(0,200,245,0.1)", border: "1px solid rgba(0,200,245,0.25)",
                borderRadius: 6, padding: "5px 10px",
                fontSize: 26, color: "#00C8F5", whiteSpace: "nowrap",
              }}>{a} <span style={{ color: "rgba(0,200,245,0.6)", fontSize: 22 }}>PARTNER</span></div>
            ))}
          </div>
          <div style={{
            background: "rgba(255,68,68,0.15)", border: "2px solid rgba(255,68,68,0.5)",
            borderRadius: 8, padding: "10px 16px", textAlign: "center",
          }}>
            <div style={{ fontSize: 30 }}>🇨🇳 <span className="f-oswald" style={{ fontSize: 38, fontWeight: 700, color: "#FF4444" }}>BLOCKED</span></div>
            <div className="f-inter" style={{ fontSize: 28, color: "rgba(255,100,100,0.8)", marginTop: 4 }}>
              No EUV. No DUV. No software updates.
            </div>
          </div>
        </div>

        {/* Ban cards — wide enough for 1-line body text */}
        <div className="a8-ban" style={{
          width: 560, display: "flex", flexDirection: "column", gap: 10,
        }}>
          {BANS.map((b, i) => (
            <div key={i} style={{
              background: b.bg, border: `1px solid ${b.color}40`,
              borderLeft: `3px solid ${b.color}`,
              borderRadius: 8, padding: "10px 16px",
              display: "flex", alignItems: "center", gap: 16,
            }}>
              <div className="f-oswald" style={{ fontSize: 30, fontWeight: 700, color: b.color, flexShrink: 0, width: 110 }}>
                {b.label}
              </div>
              <div className="f-inter" style={{ fontSize: 30, color: "rgba(255,255,255,0.75)", lineHeight: 1.3 }}>
                {b.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: "flex", gap: 20 }}>
        <div className="a8-china" style={{
          flex: 1, background: "rgba(255,68,68,0.06)", border: "1px solid rgba(255,68,68,0.2)",
          borderRadius: 10, padding: "12px 20px",
        }}>
          <div className="f-oswald c-white" style={{ fontSize: 32, fontWeight: 700, marginBottom: 6 }}>
            China&apos;s Response
          </div>
          <div className="f-inter" style={{ fontSize: 30, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>
            Billions spent on domestic EUV. Most analysts: still 10+ years behind.
          </div>
        </div>
        <div className="a8-question" style={{
          flex: 1, background: "rgba(245,166,35,0.07)", border: "1px solid rgba(245,166,35,0.28)",
          borderRadius: 10, padding: "12px 20px",
        }}>
          <div className="f-oswald" style={{ fontSize: 32, fontWeight: 700, color: "#F5A623", marginBottom: 6 }}>
            The Open Question
          </div>
          <div className="f-inter" style={{ fontSize: 30, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>
            Whether that gap can close is the defining question in chip geopolitics.
          </div>
        </div>
      </div>
    </div>
  );
}
