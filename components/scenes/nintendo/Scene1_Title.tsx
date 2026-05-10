"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

// Scene duration: 16.48s — opening hook through "plastic box with a TV remote"
export default function Scene1_Title() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    gsap.set(el.querySelectorAll(".n1-l1, .n1-l2"), { yPercent: 115 });
    gsap.set(el.querySelector(".n1-ep"),  { opacity: 0 });
    gsap.set(el.querySelector(".n1-bar"), { scaleX: 0, transformOrigin: "left center" });
    gsap.set(el.querySelector(".n1-tag"), { opacity: 0, y: 14 });

    const tl = gsap.timeline({ delay: 0.2 });
    tl
      .to(el.querySelector(".n1-ep"),    { opacity: 1, duration: 0.6, ease: "power2.out" })
      .to(el.querySelectorAll(".n1-l1"), { yPercent: 0, duration: 0.75, ease: "power3.out" }, 0.6)
      .to(el.querySelectorAll(".n1-l2"), { yPercent: 0, duration: 0.75, ease: "power3.out" }, 1.1)
      .to(el.querySelector(".n1-bar"),   { scaleX: 1, duration: 0.7, ease: "power3.out" }, 2.7)
      .to(el.querySelector(".n1-tag"),   { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 12.7);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#0A0A14", justifyContent: "center", paddingLeft: 100 }}>
      <div className="n1-ep f-inter t-small" style={{ opacity: 0, marginBottom: 32, color: "rgba(255,255,255,0.4)", letterSpacing: 3 }}>
        Strategy · Episode 002
      </div>
      <div style={{ overflow: "hidden", marginBottom: 6 }}>
        <div className="n1-l1 f-oswald c-white" style={{ fontSize: 108, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>
          WHY NINTENDO
        </div>
      </div>
      <div style={{ overflow: "hidden" }}>
        <div className="n1-l2 f-oswald" style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1, color: "#FF3B30" }}>
          REFUSES TO COMPETE
        </div>
      </div>
      <div className="n1-bar" style={{ height: 3, width: 500, background: "rgba(255,59,48,0.35)", marginTop: 38 }} />
      <div className="n1-tag f-inter" style={{ marginTop: 20, fontSize: 18, color: "rgba(255,255,255,0.5)", letterSpacing: 0.5 }}>
        How a &ldquo;toy company&rdquo; beat Sony and Microsoft four times in a row.
      </div>
    </div>
  );
}
