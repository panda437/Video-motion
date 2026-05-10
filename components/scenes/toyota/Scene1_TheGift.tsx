"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene1_TheGift() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelectorAll(".t1-l1, .t1-l2"), { yPercent: 115 });
    gsap.set(el.querySelector(".t1-ep"), { opacity: 0 });
    gsap.set(el.querySelector(".t1-bar"), { scaleX: 0, transformOrigin: "left center" });
    gsap.set(el.querySelector(".t1-tag"), { opacity: 0, y: 14 });
    
    // SVG book drawing effect
    gsap.set(el.querySelectorAll(".t1-path"), { strokeDasharray: 400, strokeDashoffset: 400 });
    gsap.set(el.querySelector(".t1-book-glow"), { opacity: 0, scale: 0.8 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl
      .to(el.querySelector(".t1-ep"), { opacity: 1, duration: 0.6, ease: "power2.out" })
      .to(el.querySelectorAll(".t1-l1"), { yPercent: 0, duration: 0.75, ease: "power3.out" }, 8.12)
      .to(el.querySelectorAll(".t1-l2"), { yPercent: 0, duration: 0.75, ease: "power3.out" }, 8.62)
      .to(el.querySelector(".t1-bar"), { scaleX: 1, duration: 0.7, ease: "power3.out" }, 9.3)
      .to(el.querySelector(".t1-tag"), { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 9.8)
      
      // Draw the playbook
      .to(el.querySelectorAll(".t1-path"), { strokeDashoffset: 0, duration: 2, ease: "power2.inOut", stagger: 0.2 }, 12.88)
      .to(el.querySelector(".t1-book-glow"), { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }, 14.5);

    // Micro-drift background
    gsap.to(el.querySelector(".bg-grid"), { x: -40, y: -20, duration: 20, repeat: -1, ease: "linear" });

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#050805", paddingLeft: 100, position: "relative", overflow: "hidden" }}>
      {/* Background grid */}
      <div className="bg-grid" style={{
        position: "absolute", inset: "-20%",
        backgroundImage: "linear-gradient(rgba(45,90,39,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(45,90,39,0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px", zIndex: 0
      }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", paddingRight: 100 }}>
        <div>
          <div className="t1-ep f-inter t-small" style={{ opacity: 0, marginBottom: 32, color: "rgba(255,255,255,0.4)", letterSpacing: 3, textTransform: "uppercase" }}>
            Strategy · Episode 004
          </div>
          <div style={{ overflow: "hidden", marginBottom: 6 }}>
            <div className="t1-l1 f-oswald c-white" style={{ fontSize: 108, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>
              THE PLAYBOOK
            </div>
          </div>
          <div style={{ overflow: "hidden" }}>
            <div className="t1-l2 f-oswald" style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1, color: "#2D5A27" }}>
              WAS FREE
            </div>
          </div>
          <div className="t1-bar" style={{ height: 3, width: 450, background: "rgba(45,90,39,0.5)", marginTop: 38 }} />
          <div className="t1-tag f-inter" style={{ marginTop: 20, fontSize: 24, color: "rgba(255,255,255,0.6)", letterSpacing: 0.5, maxWidth: 500, lineHeight: 1.4 }}>
            Toyota taught General Motors every secret. GM still went bankrupt.
          </div>
        </div>

        {/* Playbook SVG Graphic */}
        <div style={{ position: "relative", width: 300, height: 300, marginRight: 80 }}>
          <div className="t1-book-glow" style={{
            position: "absolute", inset: -50, background: "radial-gradient(circle, rgba(45,90,39,0.3) 0%, transparent 70%)", borderRadius: "50%"
          }} />
          <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%", position: "relative", zIndex: 2 }}>
            {/* Pages / Blueprint */}
            <path className="t1-path" d="M30,160 L30,40 L90,20 L90,140 Z" fill="rgba(45,90,39,0.05)" stroke="#2D5A27" strokeWidth="2" strokeLinejoin="round" />
            <path className="t1-path" d="M170,160 L170,40 L110,20 L110,140 Z" fill="rgba(45,90,39,0.05)" stroke="#2D5A27" strokeWidth="2" strokeLinejoin="round" />
            <path className="t1-path" d="M90,20 L110,20 L110,140 L90,140 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            {/* Grid on the left page */}
            <path className="t1-path" d="M40,50 L80,35 M40,70 L80,55 M40,90 L80,75 M40,110 L80,95 M40,130 L80,115" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            {/* Geometric diagram on right page */}
            <circle className="t1-path" cx="140" cy="80" r="15" fill="none" stroke="#fff" strokeWidth="2" />
            <path className="t1-path" d="M140,95 L140,130" stroke="#2D5A27" strokeWidth="2" strokeDasharray="4 4" />
            <rect className="t1-path" x="125" y="130" width="30" height="8" fill="none" stroke="#fff" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
