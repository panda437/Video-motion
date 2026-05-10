"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

const RISKS = [
  { title: "Membership dependency", body: "93% renewal today. If that slips to 85%, the profit engine cracks." },
  { title: "Geographic ceiling",    body: "Each warehouse needs a dense, affluent base. No Costcos in small towns." },
  { title: "Locked wage structure", body: "2× pay works when memberships grow. In a deep recession, fewer levers." },
];

export default function Scene6_Fragility() {
  const ref = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const circumference = 2 * Math.PI * 54;
    if (circleRef.current) {
      circleRef.current.style.strokeDasharray = `${circumference}`;
      circleRef.current.style.strokeDashoffset = `${circumference}`;
    }

    gsap.set(el.querySelector(".s6-headline"), { opacity: 0, y: 20 });
    gsap.set(el.querySelector(".s6-sub"), { opacity: 0, y: 14 });
    gsap.set(el.querySelectorAll(".s6-risk"), { opacity: 0, x: 30 });
    gsap.set(el.querySelector(".s6-bottom"), { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl
      .to(el.querySelector(".s6-headline"), { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(el.querySelector(".s6-sub"),     { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.5)
      // Animate the circle (93%)
      .to(circleRef.current, {
        strokeDashoffset: circumference - (circumference * 0.93),
        duration: 1.8, ease: "power2.inOut",
      }, 1.0)
      .to(el.querySelectorAll(".s6-risk"), {
        opacity: 1, x: 0, duration: 0.55, ease: "power3.out", stagger: 0.3,
      }, 3.2)
      .to(el.querySelector(".s6-bottom"), { opacity: 1, duration: 0.7, ease: "power2.out" }, 5.5);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{
      background: "#1A1209", flexDirection: "row", padding: 0, alignItems: "stretch",
    }}>

      {/* Left: headline + circle stat */}
      <div style={{
        width: 460, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "72px 48px 72px 100px",
        borderRight: "1px solid rgba(255,165,0,0.12)",
      }}>
        <div className="s6-headline f-oswald" style={{
          fontSize: 20, fontWeight: 400, letterSpacing: 3, textTransform: "uppercase",
          color: "#F59E0B", marginBottom: 16,
        }}>
          The crack in the foundation
        </div>
        <div className="s6-headline f-oswald c-white" style={{
          fontSize: 54, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, marginBottom: 24,
        }}>
          Elegant.<br />Brittle.
        </div>
        <div className="s6-sub f-inter" style={{
          fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 48,
        }}>
          The model that broke retail has one real lever.
          Pull it the wrong way and everything unravels.
        </div>

        {/* 93% circle */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg width={130} height={130} viewBox="0 0 130 130" style={{ transform: "rotate(-90deg)" }}>
            <circle cx={65} cy={65} r={54} fill="none" stroke="rgba(245,158,11,0.15)" strokeWidth={8} />
            <circle
              ref={circleRef}
              cx={65} cy={65} r={54}
              fill="none" stroke="#F59E0B" strokeWidth={8}
              strokeLinecap="round"
            />
          </svg>
          <div>
            <div className="f-oswald" style={{ fontSize: 48, fontWeight: 700, color: "#F59E0B", lineHeight: 1 }}>
              93%
            </div>
            <div className="f-inter" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 4, lineHeight: 1.5 }}>
              membership<br />renewal rate
            </div>
          </div>
        </div>
      </div>

      {/* Right: risk cards */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "72px 80px",
        gap: 20,
      }}>
        {RISKS.map((r, i) => (
          <div key={i} className="s6-risk" style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(245,158,11,0.2)",
            borderRadius: 8, padding: "22px 28px",
          }}>
            <div className="f-oswald" style={{ fontSize: 20, fontWeight: 700, color: "#F59E0B", marginBottom: 8 }}>
              {r.title}
            </div>
            <div className="f-inter" style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
              {r.body}
            </div>
          </div>
        ))}

        <div className="s6-bottom" style={{
          marginTop: 8,
          borderLeft: "3px solid rgba(245,158,11,0.4)",
          paddingLeft: 20,
        }}>
          <div className="f-oswald c-white" style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.3 }}>
            Costco has fewer levers than Walmart<br />when things get hard.
          </div>
        </div>
      </div>
    </div>
  );
}
