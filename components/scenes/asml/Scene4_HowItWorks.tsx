"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const STEPS = [
  { num: "①", title: "Tin droplet",   body: "30 µm of molten tin drops through a vacuum.",        color: "#C0C0C0" },
  { num: "②", title: "CO₂ laser",     body: "Two pulses — flattens, then vaporises.",              color: "#FF6B00" },
  { num: "③", title: "Plasma burst",  body: "Hotter than the sun. Emits EUV light.",               color: "#FFD700" },
  { num: "④", title: "EUV — 13.5nm",  body: "50,000 pulses per second.",                          color: "#00C8F5" },
  { num: "⑤", title: "Zeiss mirrors", body: "Atom-level polish. Scaled to Germany: bumps < 1mm.",color: "#B0BEC5" },
  { num: "⑥", title: "Wafer printed", body: "100+ billion transistors per chip.",                 color: "#00E676" },
];

export default function Scene4_HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    // --- Initial states ---
    gsap.set(el.querySelector(".a4-headline"), { opacity: 0, y: 20 });
    gsap.set(el.querySelectorAll(".a4-step"),  { opacity: 0, x: -28 });
    gsap.set(el.querySelectorAll(".a4-node"),  { opacity: 0, scale: 0.5 });
    gsap.set(el.querySelector("#a4-photon"),   { opacity: 0 });
    gsap.set(el.querySelector("#a4-halo"),     { opacity: 0 });

    // --- Main reveal timeline ---
    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(el.querySelector(".a4-headline"), { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });

    STEPS.forEach((_, i) => {
      const t = 3.0 + i * 8.5;
      tl
        .to(el.querySelectorAll(".a4-node")[i], { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, t)
        .to(el.querySelectorAll(".a4-step")[i], { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, t + 0.15);
    });

    // --- Photon (particle of light) loop ---
    // Path: laser left edge → tin droplet → plasma → mirror1 → mirror2 → wafer
    const photon = el.querySelector("#a4-photon");
    const halo   = el.querySelector("#a4-halo");

    const photonTL = gsap.timeline({ repeat: -1, delay: 4, repeatDelay: 1.8 });
    photonTL
      // Reset: orange (CO₂ laser), off-screen left at laser height
      .set(photon, { attr: { cx: -12, cy: 90, r: 5, fill: "#FF8844" }, opacity: 1 })
      .set(halo,   { attr: { cx: -12, cy: 90, r: 13 }, opacity: 0.5 })

      // CO₂ laser enters from left → hits tin droplet
      .to([photon, halo], { attr: { cx: 120 }, duration: 0.65, ease: "none" })
      // Flash at droplet
      .to(photon, { attr: { r: 22 }, duration: 0.08, ease: "power2.out" })
      .to(photon, { attr: { r: 5 }, duration: 0.18, ease: "power3.in" })

      // Photon descends to plasma
      .to([photon, halo], { attr: { cy: 168 }, duration: 0.42, ease: "none" }, "+=0.12")
      // Flash at plasma + convert to cyan (EUV wavelength)
      .to(photon, { attr: { r: 24, fill: "#00C8F5" }, duration: 0.1 })
      .to(halo,   { attr: { r: 20, fill: "rgba(0,200,245,0.35)" }, duration: 0.1 }, "<")
      .to(photon, { attr: { r: 4 }, duration: 0.22 })

      // EUV photon travels straight down to mirror 1
      .to([photon, halo], { attr: { cy: 264 }, duration: 0.45, ease: "none" }, "+=0.08")
      // Brief mirror flash then diagonal bounce toward mirror 2
      .to([photon, halo], { attr: { cx: 160, cy: 322 }, duration: 0.32, ease: "none" })
      // Final leg down to wafer
      .to([photon, halo], { attr: { cx: 120, cy: 378 }, duration: 0.28, ease: "none" })
      // Hit wafer — flare then fade
      .to(photon, { attr: { r: 18 }, duration: 0.1 })
      .to([photon, halo], { opacity: 0, duration: 0.35 });

    // --- Plasma inner pulse loop (once plasma is revealed at t≈20) ---
    gsap.to(el.querySelector("#a4-plasma-inner"), {
      attr: { r: 18 },
      opacity: 0.9,
      duration: 0.65,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      delay: 22,
    });

    // --- Tin droplet slow drip ---
    gsap.to(el.querySelector("#a4-droplet"), {
      attr: { cy: 100 },
      duration: 0.9,
      ease: "power1.in",
      repeat: -1,
      repeatDelay: 2.4,
      delay: 4,
      onRepeat() {
        gsap.set(el.querySelector("#a4-droplet"), { attr: { cy: 70 }, opacity: 0.9 });
      },
    });

    return () => {
      tl.kill();
      photonTL.kill();
      gsap.killTweensOf([
        el.querySelector("#a4-plasma-inner"),
        el.querySelector("#a4-droplet"),
      ]);
    };
  }, []);

  return (
    <div ref={ref} className="scene" style={{
      background: "#040810", flexDirection: "row", padding: 0, alignItems: "stretch",
    }}>
      {/* Left: step cards */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "40px 40px 40px 80px",
      }}>
        <div className="a4-headline f-oswald c-white" style={{
          fontSize: 44, fontWeight: 700, lineHeight: 1.1, marginBottom: 24, letterSpacing: -1,
        }}>
          How EUV Actually Works
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {STEPS.map((s, i) => (
            <div key={i} className="a4-step" style={{
              display: "flex", gap: 14, alignItems: "flex-start",
              background: "rgba(255,255,255,0.03)",
              borderLeft: `3px solid ${s.color}`,
              borderRadius: 8, padding: "12px 16px",
            }}>
              <div className="f-oswald" style={{
                fontSize: 32, fontWeight: 700, color: s.color, flexShrink: 0, lineHeight: 1,
              }}>{s.num}</div>
              <div>
                <div className="f-oswald" style={{ fontSize: 32, fontWeight: 700, color: s.color, lineHeight: 1.1 }}>
                  {s.title}
                </div>
                <div className="f-inter" style={{ fontSize: 30, color: "rgba(255,255,255,0.58)", lineHeight: 1.35, marginTop: 4 }}>
                  {s.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: animated machine diagram */}
      <div style={{
        width: 320, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "48px 24px",
        background: "rgba(0,200,245,0.025)",
        borderLeft: "1px solid rgba(0,200,245,0.1)",
      }}>
        <svg viewBox="0 0 240 520" width="240" height="520">
          <defs>
            <filter id="a4-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="a4-glow-sm" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Vacuum chamber border */}
          <rect x="20" y="10" width="200" height="500" rx="12"
            fill="rgba(0,200,245,0.03)" stroke="rgba(0,200,245,0.2)" strokeWidth="1.5" />

          {/* Laser input line */}
          <line x1="0" y1="90" x2="110" y2="90" stroke="#FF6B00" strokeWidth="3" />
          <polygon points="106,84 120,90 106,96" fill="#FF6B00" />
          <text x="30" y="80" fill="#FF6B00" fontSize="14" fontFamily="Inter">CO₂ LASER</text>

          {/* Tin droplet — animated drip */}
          <circle id="a4-droplet" className="a4-node" cx="120" cy="80" r="13"
            fill="rgba(192,192,192,0.75)" filter="url(#a4-glow-sm)" />
          <circle className="a4-node" cx="120" cy="90" r="22"
            fill="none" stroke="rgba(200,200,200,0.2)" strokeWidth="1" strokeDasharray="3 3" />

          {/* Pulse arrow */}
          <line x1="120" y1="112" x2="120" y2="148"
            stroke="rgba(255,215,0,0.5)" strokeWidth="2" strokeDasharray="4 4" />

          {/* Plasma outer ring */}
          <circle className="a4-node" cx="120" cy="168" r="26"
            fill="rgba(255,200,0,0.18)" stroke="rgba(255,200,0,0.6)" strokeWidth="1.5" />
          {/* Plasma inner — pulsing */}
          <circle id="a4-plasma-inner" cx="120" cy="168" r="12"
            fill="rgba(255,220,0,0.45)" />
          <text x="152" y="172" fill="rgba(255,200,0,0.75)" fontSize="14" fontFamily="Inter">PLASMA</text>

          {/* EUV ray (dashed) */}
          <line x1="120" y1="194" x2="120" y2="248"
            stroke="#00C8F5" strokeWidth="2.5" strokeDasharray="5 4" />
          <polygon points="113,246 127,246 120,260" fill="#00C8F5" />
          <text x="128" y="228" fill="#00C8F5" fontSize="13" fontFamily="Inter">EUV 13.5nm</text>

          {/* Mirror 1 */}
          <rect className="a4-node" x="86" y="264" width="68" height="10" rx="2"
            fill="rgba(176,190,197,0.85)" transform="rotate(-28 120 269)" />

          {/* Bounce line */}
          <line x1="110" y1="278" x2="160" y2="320"
            stroke="rgba(0,200,245,0.4)" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Mirror 2 */}
          <rect className="a4-node" x="132" y="322" width="60" height="10" rx="2"
            fill="rgba(176,190,197,0.85)" transform="rotate(22 162 327)" />
          <text x="34" y="300" fill="rgba(176,190,197,0.6)" fontSize="13" fontFamily="Inter">Zeiss mirrors</text>
          <text x="34" y="318" fill="rgba(176,190,197,0.4)" fontSize="12" fontFamily="Inter">(atom-level polish)</text>

          {/* Final ray to wafer */}
          <line x1="148" y1="338" x2="120" y2="378"
            stroke="rgba(0,200,245,0.5)" strokeWidth="2" strokeDasharray="4 4" />

          {/* Wafer */}
          <ellipse className="a4-node" cx="120" cy="400" rx="60" ry="22"
            fill="rgba(0,200,245,0.12)" stroke="#00C8F5" strokeWidth="2" />
          <ellipse cx="120" cy="400" rx="42" ry="15"
            fill="none" stroke="rgba(0,200,245,0.3)" strokeWidth="1" />
          <ellipse cx="120" cy="400" rx="22" ry="8"
            fill="none" stroke="rgba(0,200,245,0.5)" strokeWidth="1" />
          <text x="120" y="404" textAnchor="middle" fill="#00C8F5" fontSize="14" fontFamily="Inter">SILICON WAFER</text>

          <text x="30" y="460" fill="rgba(0,200,245,0.3)" fontSize="13" fontFamily="Inter">[ vacuum chamber ]</text>

          {/* === PHOTON PARTICLE === */}
          {/* Halo (soft glow ring) */}
          <circle id="a4-halo" cx="-12" cy="90" r="13"
            fill="rgba(255,136,68,0.3)" opacity="0" />
          {/* Core photon — animated by GSAP */}
          <circle id="a4-photon" cx="-12" cy="90" r="5"
            fill="#FF8844" opacity="0" filter="url(#a4-glow)" />
        </svg>
      </div>
    </div>
  );
}
