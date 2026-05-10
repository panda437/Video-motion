"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const STATS = [
  { value: "$120–200M", label: "Per machine", color: "#00C8F5", icon: "💰" },
  { value: "200 tons",  label: "Per machine", color: "#F5A623", icon: "⚖️" },
  { value: "100,000",   label: "Parts per machine", color: "#00E676", icon: "🔩" },
  { value: "5,000",     label: "Global suppliers", color: "#FF6B6B", icon: "🌐" },
];

export default function Scene2_Machine() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".a2-headline"), { opacity: 0, y: 24 });
    gsap.set(el.querySelectorAll(".a2-stat"),  { opacity: 0, y: 40 });
    gsap.set(el.querySelector(".a2-machine"), { opacity: 0, x: 40 });
    gsap.set(el.querySelector(".a2-footnote"), { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl
      .to(el.querySelector(".a2-headline"), { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
      .to(el.querySelector(".a2-machine"),  { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }, 0.5)
      .to(el.querySelectorAll(".a2-stat"),  { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", stagger: 3.5 }, 1.5)
      .to(el.querySelector(".a2-footnote"), { opacity: 1, duration: 0.8 }, 17.0);

    // Looping photon through the machine path
    const ph  = el.querySelector("#a2-photon");
    const hal = el.querySelector("#a2-halo");
    if (ph && hal) {
      const photonTL = gsap.timeline({ repeat: -1, delay: 3, repeatDelay: 2 });
      photonTL
        .set(ph,  { attr: { cx: 140, cy: 56, r: 5, fill: "#FF8844" }, opacity: 1 })
        .set(hal, { attr: { cx: 140, cy: 56, r: 13 }, opacity: 0.5 })
        // Drop through laser zone to tin droplet
        .to([ph, hal], { attr: { cy: 140 }, duration: 0.7, ease: "power1.in" })
        // Flash at droplet
        .to(ph, { attr: { r: 20 }, duration: 0.1 })
        .to(ph, { attr: { r: 5 }, duration: 0.2 })
        // Descend to plasma
        .to([ph, hal], { attr: { cy: 200 }, duration: 0.4, ease: "none" }, "+=0.1")
        // Flash cyan at plasma
        .to(ph,  { attr: { r: 22, fill: "#00C8F5" }, duration: 0.1 })
        .to(hal, { attr: { r: 18, fill: "rgba(0,200,245,0.35)" }, duration: 0.1 }, "<")
        .to(ph, { attr: { r: 4 }, duration: 0.2 })
        // EUV ray down to mirror 1
        .to([ph, hal], { attr: { cy: 292 }, duration: 0.5, ease: "none" }, "+=0.08")
        // Bounce off mirror 1 (diagonal to mirror 2 area)
        .to([ph, hal], { attr: { cx: 168, cy: 342 }, duration: 0.35, ease: "none" })
        // Final bounce to wafer
        .to([ph, hal], { attr: { cx: 140, cy: 408 }, duration: 0.3, ease: "none" })
        // Hit wafer, fade
        .to(ph, { attr: { r: 16 }, duration: 0.1 })
        .to([ph, hal], { opacity: 0, duration: 0.35 });
    }

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{
      background: "#080D1E", flexDirection: "row", padding: 0, alignItems: "stretch",
    }}>
      {/* Left: stats */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "64px 56px 64px 96px",
      }}>
        <div className="a2-headline f-oswald c-white" style={{
          fontSize: 48, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1, marginBottom: 40,
        }}>
          The EUV Machine
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {STATS.map((s, i) => (
            <div key={i} className="a2-stat" style={{
              display: "flex", alignItems: "center", gap: 24,
              background: "rgba(255,255,255,0.04)", borderLeft: `4px solid ${s.color}`,
              borderRadius: 10, padding: "20px 28px",
            }}>
              <div style={{ fontSize: 44 }}>{s.icon}</div>
              <div>
                <div className="f-oswald" style={{ fontSize: 54, fontWeight: 700, color: s.color, lineHeight: 1 }}>
                  {s.value}
                </div>
                <div className="f-inter" style={{ fontSize: 32, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="a2-footnote f-inter" style={{
          marginTop: 28, fontSize: 30, color: "rgba(255,255,255,0.35)", lineHeight: 1.6,
        }}>
          Delivery takes months. Installation requires weeks.
        </div>
      </div>

      {/* Right: machine diagram */}
      <div className="a2-machine" style={{
        width: 420, display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", padding: "64px 40px",
        background: "rgba(0,200,245,0.03)", borderLeft: "1px solid rgba(0,200,245,0.1)",
      }}>
        {/* Stylised EUV machine cross-section */}
        <svg viewBox="0 0 280 460" width="280" height="460" style={{ overflow: "visible" }}>
          <defs>
            <filter id="a2-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          {/* Outer casing */}
          <rect x="40" y="20" width="200" height="420" rx="14"
            fill="rgba(0,200,245,0.05)" stroke="rgba(0,200,245,0.3)" strokeWidth="2" />

          {/* Top module — laser input */}
          <rect x="80" y="40" width="120" height="48" rx="6"
            fill="rgba(245,166,35,0.15)" stroke="#F5A623" strokeWidth="1.5" />
          <text x="140" y="70" textAnchor="middle" fill="#F5A623" fontSize="16" fontFamily="Inter">CO₂ LASER</text>

          {/* Tin droplet zone */}
          <circle cx="140" cy="140" r="16" fill="rgba(192,192,192,0.7)" />
          <circle cx="140" cy="140" r="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" />
          <text x="170" y="145" fill="rgba(255,255,255,0.5)" fontSize="13" fontFamily="Inter">Sn droplet</text>

          {/* Plasma burst */}
          <circle cx="140" cy="200" r="24"
            fill="rgba(255,200,0,0.2)" stroke="rgba(255,200,0,0.6)" strokeWidth="1.5" />
          <circle cx="140" cy="200" r="12" fill="rgba(255,220,0,0.5)" />
          <text x="172" y="205" fill="rgba(255,200,0,0.8)" fontSize="13" fontFamily="Inter">PLASMA</text>

          {/* EUV ray downward */}
          <line x1="140" y1="224" x2="140" y2="280" stroke="#00C8F5" strokeWidth="3" strokeDasharray="6 3" />
          <polygon points="134,278 146,278 140,290" fill="#00C8F5" />

          {/* Mirror 1 */}
          <rect x="100" y="290" width="80" height="10" rx="2"
            fill="rgba(176,190,197,0.8)" transform="rotate(-25 140 295)" />
          <text x="60" y="302" fill="rgba(176,190,197,0.7)" fontSize="13" fontFamily="Inter">Zeiss mirror</text>

          {/* Mirror 2 */}
          <rect x="108" y="340" width="64" height="8" rx="2"
            fill="rgba(176,190,197,0.8)" transform="rotate(20 140 344)" />

          {/* Wafer */}
          <ellipse cx="140" cy="420" rx="52" ry="18"
            fill="rgba(0,200,245,0.15)" stroke="#00C8F5" strokeWidth="2" />
          <ellipse cx="140" cy="420" rx="36" ry="12"
            fill="none" stroke="rgba(0,200,245,0.35)" strokeWidth="1" />
          <ellipse cx="140" cy="420" rx="18" ry="6"
            fill="none" stroke="rgba(0,200,245,0.5)" strokeWidth="1" />
          <text x="140" y="424" textAnchor="middle" fill="#00C8F5" fontSize="13" fontFamily="Inter">WAFER</text>

          {/* Photon particle */}
          <circle id="a2-halo"   cx="140" cy="56" r="13" fill="rgba(255,136,68,0.3)" opacity="0" />
          <circle id="a2-photon" cx="140" cy="56" r="5"  fill="#FF8844" opacity="0" filter="url(#a2-glow)" />
        </svg>

        <div className="f-inter" style={{
          marginTop: 16, fontSize: 30, color: "rgba(0,200,245,0.6)",
          textAlign: "center", lineHeight: 1.5,
        }}>
          Size of a small bus
        </div>
      </div>
    </div>
  );
}
