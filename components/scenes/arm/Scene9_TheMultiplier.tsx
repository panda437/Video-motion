"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene9_TheMultiplier() {
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const counter = { val: 0 };

    gsap.set(el.querySelector(".hero-text"), { opacity: 0, y: 20 });
    gsap.set(el.querySelector(".royalty-box"), { opacity: 0, scale: 0.9 });
    gsap.set(el.querySelectorAll(".penny-grid div"), { opacity: 0, scale: 0 });

    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.to(el.querySelector(".hero-text"), { opacity: 1, y: 0, duration: 0.8 }, 0)
      .to(el.querySelector(".royalty-box"), { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" }, 8.0)
      .to(el.querySelectorAll(".penny-grid div"), { opacity: 1, scale: 1, stagger: 0.01, duration: 2 }, 11.0)
      .to(counter, {
        val: 250, duration: 3, ease: "power2.out",
        onUpdate: () => { if (countRef.current) countRef.current.innerText = Math.floor(counter.val).toString(); }
      }, 11.0);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#FAFAFA", padding: "0 100px", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      
      <div className="hero-text f-oswald" style={{ position: "absolute", top: 80, fontSize: 80, fontWeight: 700, color: "#18181B", letterSpacing: -2 }}>
        THE MULTIPLIER EFFECT
      </div>

      <div className="penny-grid" style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "repeat(20, 1fr)", gap: 10, padding: 40, zIndex: 0, opacity: 0.1 }}>
        {[...Array(300)].map((_, i) => (
          <div key={i} style={{ background: "#2563EB", borderRadius: "50%", width: "100%", aspectRatio: "1/1" }} />
        ))}
      </div>

      <div className="royalty-box" style={{ position: "relative", zIndex: 10, background: "#fff", border: "2px solid #18181B", padding: "60px 100px", borderRadius: 24, textAlign: "center", boxShadow: "20px 20px 0 #E4E4E7" }}>
        <div className="f-inter" style={{ fontSize: 24, color: "#71717A", fontWeight: 600, letterSpacing: 4, marginBottom: 20 }}>
          A TINY ROYALTY ON
        </div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 16 }}>
          <span ref={countRef} className="f-oswald" style={{ fontSize: 140, fontWeight: 900, color: "#18181B", lineHeight: 1, letterSpacing: -4 }}>0</span>
          <span className="f-oswald" style={{ fontSize: 60, fontWeight: 700, color: "#2563EB" }}>BILLION CHIPS</span>
        </div>
      </div>

    </div>
  );
}