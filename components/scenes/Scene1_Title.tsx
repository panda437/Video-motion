"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene1_Title() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelectorAll(".s1-l1, .s1-l2"), { yPercent: 110 });
    gsap.set(el.querySelector(".s1-bar"),  { scaleX: 0, transformOrigin: "left center" });
    gsap.set(el.querySelector(".s1-tag"),  { opacity: 0, y: 16 });
    gsap.set(el.querySelector(".s1-ep"),   { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl
      .to(el.querySelector(".s1-ep"),  { opacity: 1, duration: 0.5, ease: "power2.out" })
      .to(el.querySelectorAll(".s1-l1"), { yPercent: 0, duration: 0.85, ease: "power3.out" }, 0.4)
      .to(el.querySelectorAll(".s1-l2"), { yPercent: 0, duration: 0.85, ease: "power3.out" }, 0.72)
      .to(el.querySelector(".s1-bar"),  { scaleX: 1, duration: 0.7, ease: "power3.out" }, 1.3)
      .to(el.querySelector(".s1-tag"),  { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 1.6);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene bg-red" style={{ justifyContent: "center", paddingLeft: 100 }}>
      {/* Episode label */}
      <div className="s1-ep f-inter t-small c-white" style={{
        opacity: 0, marginBottom: 32,
        color: "rgba(255,255,255,0.6)",
      }}>
        Business · Episode 001
      </div>

      {/* Line 1 */}
      <div style={{ overflow: "hidden", marginBottom: 8 }}>
        <div className="s1-l1 f-oswald c-white" style={{ fontSize: 104, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>
          WHY COSTCO
        </div>
      </div>

      {/* Line 2 */}
      <div style={{ overflow: "hidden" }}>
        <div className="s1-l2 f-oswald c-white" style={{
          fontSize: 62, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1,
          color: "rgba(255,255,255,0.92)",
        }}>
          REFUSES TO MAKE MONEY
        </div>
      </div>

      {/* Accent bar */}
      <div className="s1-bar" style={{
        height: 3, width: 480, background: "rgba(255,255,255,0.35)",
        marginTop: 36,
      }} />

      {/* Tagline */}
      <div className="s1-tag f-inter c-white" style={{
        marginTop: 20, fontSize: 18, fontWeight: 400,
        color: "rgba(255,255,255,0.65)", letterSpacing: 0.5,
      }}>
        The dumbest-looking business model in retail — and why nobody can copy it.
      </div>
    </div>
  );
}
