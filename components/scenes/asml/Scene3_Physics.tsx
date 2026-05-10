"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene3_Physics() {
  const ref = useRef<HTMLDivElement>(null);
  const txRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const counter = { val: 0 };

    gsap.set(el.querySelector(".a3-headline"), { opacity: 0, y: 24 });
    gsap.set(el.querySelector(".a3-rule"),     { opacity: 0 });
    gsap.set(el.querySelector(".a3-old"),      { opacity: 0, x: -30 });
    gsap.set(el.querySelector(".a3-wall"),     { opacity: 0 });
    gsap.set(el.querySelector(".a3-new"),      { opacity: 0, x: -30 });
    gsap.set(el.querySelector(".a3-result"),   { opacity: 0, scale: 0.9 });

    // Set up EUV wave draw-in
    const euvPath = el.querySelector('#a3-euv-path') as SVGPathElement | null;
    if (euvPath) {
      const len = euvPath.getTotalLength();
      gsap.set(euvPath, { strokeDasharray: len, strokeDashoffset: len });
    }

    const tl = gsap.timeline({ delay: 0.3 });
    tl
      .to(el.querySelector(".a3-headline"), { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
      .to(el.querySelector(".a3-rule"),     { opacity: 1, duration: 0.8 }, 2.0)
      .to(el.querySelector(".a3-old"),      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, 6.0)
      .to(el.querySelector(".a3-wall"),     { opacity: 1, duration: 0.8 }, 23.0)
      .to(el.querySelector(".a3-new"),      { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }, 34.0);

    // EUV wave draws itself in left-to-right
    if (euvPath) {
      tl.to(euvPath, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" }, 34.5);
    }

    tl
      .to(el.querySelector(".a3-result"),   { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.3)" }, 41.0)
      .to(counter, {
        val: 100, duration: 2.5, ease: "power2.out",
        onUpdate() { if (txRef.current) txRef.current.textContent = Math.round(counter.val) + "B+"; },
      }, 41.5);

    // After draw-in: EUV wave shimmers (continuous scroll of dashoffset)
    if (euvPath) {
      const len = euvPath.getTotalLength();
      gsap.to(euvPath, {
        strokeDasharray: `12 0`,
        strokeDashoffset: -12,
        duration: 0.3,
        ease: "none",
        repeat: -1,
        delay: 38,
        onStart() { gsap.set(euvPath, { strokeDasharray: "12 0", strokeDashoffset: 0 }); },
      });
    }

    return () => {
      tl.kill();
      if (euvPath) gsap.killTweensOf(euvPath);
    };
  }, []);

  return (
    <div ref={ref} className="scene" style={{
      background: "#06091A", flexDirection: "row", padding: 0, alignItems: "stretch",
    }}>
      {/* Left: text */}
      <div style={{
        width: 400, display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "40px 40px 40px 80px", borderRight: "1px solid rgba(255,255,255,0.06)",
        flexShrink: 0,
      }}>
        <div className="a3-headline f-oswald c-white" style={{
          fontSize: 46, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, marginBottom: 22,
        }}>
          The Fundamental Constraint
        </div>

        <div className="a3-rule" style={{
          background: "rgba(0,200,245,0.08)", borderLeft: "4px solid #00C8F5",
          borderRadius: 8, padding: "16px 20px", marginBottom: 20,
        }}>
          <div className="f-oswald c-white" style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3 }}>
            You can only draw circuits as small as the wavelength of light you use.
          </div>
        </div>

        <div className="a3-wall" style={{
          background: "rgba(255,68,68,0.1)", border: "1px solid rgba(255,68,68,0.35)",
          borderRadius: 8, padding: "14px 18px",
        }}>
          <div className="f-inter" style={{ fontSize: 30, color: "#FF6B6B", lineHeight: 1.5 }}>
            By the late 1990s, the industry hit a wall at 193nm.
          </div>
        </div>
      </div>

      {/* Right: wave visualisation */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "64px 72px",
      }}>
        {/* Old 193nm wave */}
        <div className="a3-old" style={{ marginBottom: 40 }}>
          <div className="f-inter" style={{
            fontSize: 30, color: "rgba(255,107,107,0.7)", letterSpacing: 3,
            textTransform: "uppercase", marginBottom: 14,
          }}>
            Standard light — 193 nm
          </div>
          <svg viewBox="0 0 500 80" width="100%" style={{ display: "block" }}>
            <path d="M0,40 Q31,0 62,40 Q93,80 124,40 Q155,0 186,40 Q217,80 248,40 Q279,0 310,40 Q341,80 372,40 Q403,0 434,40 Q465,80 496,40"
              stroke="#FF6B6B" strokeWidth="3.5" fill="none" />
          </svg>
          <div className="f-oswald" style={{ fontSize: 34, color: "#FF6B6B", marginTop: 10 }}>
            Too wide. Can&apos;t shrink circuits further.
          </div>
        </div>

        {/* New 13.5nm EUV wave */}
        <div className="a3-new" style={{ marginBottom: 40 }}>
          <div className="f-inter" style={{
            fontSize: 30, color: "#00C8F5", letterSpacing: 3,
            textTransform: "uppercase", marginBottom: 14,
          }}>
            EUV light — 13.5 nm
          </div>
          <svg viewBox="0 0 500 80" width="100%" style={{ display: "block" }}>
            {/* Many tight cycles */}
            <path id="a3-euv-path" d="M0,40 Q6,20 12,40 Q18,60 24,40 Q30,20 36,40 Q42,60 48,40 Q54,20 60,40 Q66,60 72,40 Q78,20 84,40 Q90,60 96,40 Q102,20 108,40 Q114,60 120,40 Q126,20 132,40 Q138,60 144,40 Q150,20 156,40 Q162,60 168,40 Q174,20 180,40 Q186,60 192,40 Q198,20 204,40 Q210,60 216,40 Q222,20 228,40 Q234,60 240,40 Q246,20 252,40 Q258,60 264,40 Q270,20 276,40 Q282,60 288,40 Q294,20 300,40 Q306,60 312,40 Q318,20 324,40 Q330,60 336,40 Q342,20 348,40 Q354,60 360,40 Q366,20 372,40 Q378,60 384,40 Q390,20 396,40 Q402,60 408,40 Q414,20 420,40 Q426,60 432,40 Q438,20 444,40 Q450,60 456,40 Q462,20 468,40 Q474,60 480,40 Q486,20 492,40 Q498,60 500,40"
              stroke="#00C8F5" strokeWidth="3" fill="none" />
          </svg>
          <div className="f-oswald" style={{ fontSize: 34, color: "#00C8F5", marginTop: 10 }}>
            40× shorter wavelength.
          </div>
        </div>

        {/* Result badge */}
        <div className="a3-result" style={{
          background: "rgba(0,230,118,0.1)", border: "2px solid rgba(0,230,118,0.4)",
          borderRadius: 12, padding: "22px 32px",
          display: "flex", alignItems: "center", gap: 28,
        }}>
          {/* Chip die icon */}
          <svg viewBox="0 0 64 64" width="64" height="64" style={{ flexShrink: 0 }}>
            <rect x="8" y="8" width="48" height="48" rx="6" fill="rgba(0,230,118,0.15)" stroke="#00E676" strokeWidth="2" />
            <rect x="16" y="16" width="32" height="32" rx="3" fill="none" stroke="rgba(0,230,118,0.5)" strokeWidth="1.5" />
            <rect x="22" y="22" width="20" height="20" rx="2" fill="rgba(0,230,118,0.2)" stroke="#00E676" strokeWidth="1" />
            {/* Pins */}
            <line x1="20" y1="8" x2="20" y2="2"  stroke="#00E676" strokeWidth="2" />
            <line x1="32" y1="8" x2="32" y2="2"  stroke="#00E676" strokeWidth="2" />
            <line x1="44" y1="8" x2="44" y2="2"  stroke="#00E676" strokeWidth="2" />
            <line x1="20" y1="56" x2="20" y2="62" stroke="#00E676" strokeWidth="2" />
            <line x1="32" y1="56" x2="32" y2="62" stroke="#00E676" strokeWidth="2" />
            <line x1="44" y1="56" x2="44" y2="62" stroke="#00E676" strokeWidth="2" />
          </svg>
          <div>
            <div className="f-oswald" style={{ fontSize: 54, fontWeight: 700, color: "#00E676", lineHeight: 1 }}>
              <span ref={txRef}>0B+</span>
            </div>
            <div className="f-inter" style={{ fontSize: 32, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>
              transistors on a modern chip
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
