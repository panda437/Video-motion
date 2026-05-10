"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

// Scene duration: 27.90s — dominant axis, new audience, battlefield line
const AUDIENCE = [
  { label: "GRANDPARENTS",  note: "who'd never touched a controller" },
  { label: "PARENTS",       note: "who wanted to play with their kids" },
  { label: "5-YEAR-OLDS",   note: "too young for complex inputs" },
  { label: "EVERYONE ELSE", note: "who found gaming intimidating" },
];

export default function Scene3_Pivot() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    gsap.set(el.querySelectorAll(".n3-l1, .n3-l2"), { yPercent: 110 });
    gsap.set(el.querySelector(".n3-q"),    { opacity: 0, y: 16 });
    gsap.set(el.querySelectorAll(".n3-chip"), { opacity: 0, scale: 0.85, y: 12 });
    gsap.set(el.querySelector(".n3-close"), { opacity: 0, x: -20 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl
      .to(el.querySelectorAll(".n3-l1"), { yPercent: 0, duration: 0.85, ease: "power3.out" })
      .to(el.querySelectorAll(".n3-l2"), { yPercent: 0, duration: 0.85, ease: "power3.out" }, 0.4)
      // Question appears on "Nintendo asked a different question."
      .to(el.querySelector(".n3-q"), { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 6.8)
      // Audience chips land on "Mothers, grandparents, casual players..."
      .to(el.querySelectorAll(".n3-chip"), {
        opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "back.out(1.6)", stagger: 0.75,
      }, 12.6)
      // Close line: "They walked off the battlefield."
      .to(el.querySelector(".n3-close"), { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, 22.9);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene bg-white" style={{ justifyContent: "center", padding: "72px 100px" }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ overflow: "hidden", marginBottom: 4 }}>
          <div className="n3-l1 f-oswald c-dark" style={{ fontSize: 22, fontWeight: 400, letterSpacing: 3, textTransform: "uppercase", color: "#FF3B30", lineHeight: 1 }}>
            The Grand Idea
          </div>
        </div>
        <div style={{ overflow: "hidden" }}>
          <div className="n3-l2 f-oswald c-dark" style={{ fontSize: 62, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1.5 }}>
            Don&apos;t compete on the<br />same axis.
          </div>
        </div>
      </div>
      <div className="n3-q" style={{ background: "#f5f5f5", borderRadius: 8, padding: "18px 28px", borderLeft: "4px solid #FF3B30", marginBottom: 32 }}>
        <div className="f-oswald c-dark" style={{ fontSize: 22, fontWeight: 600 }}>
          Nintendo&apos;s question: &ldquo;Who <em>isn&apos;t</em> playing video games yet — and why?&rdquo;
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 36 }}>
        {AUDIENCE.map((a, i) => (
          <div key={i} className="n3-chip" style={{ background: "#0A0A14", borderRadius: 8, padding: "14px 22px" }}>
            <div className="f-oswald c-white" style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>{a.label}</div>
            <div className="f-inter" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>{a.note}</div>
          </div>
        ))}
      </div>
      <div className="n3-close" style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ width: 4, height: 52, background: "#FF3B30", borderRadius: 2, flexShrink: 0 }} />
        <div className="f-oswald c-dark" style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2 }}>
          They didn&apos;t lose the console war.<br />
          They <span style={{ color: "#FF3B30" }}>walked off the battlefield.</span>
        </div>
      </div>
    </div>
  );
}
