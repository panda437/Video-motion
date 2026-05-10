"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene1_Title() {
  const ref = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const counter = { val: 0 };

    gsap.set(el.querySelectorAll(".a1-fade"), { opacity: 0, y: 30 });
    gsap.set(el.querySelector(".a1-badge"), { opacity: 0, scale: 0.85 });
    gsap.set(el.querySelector(".a1-sub"), { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl
      .to(el.querySelector(".a1-eyebrow"), { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
      .to(el.querySelector(".a1-title"),   { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.5)
      .to(el.querySelector(".a1-tagline"), { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 1.2)
      .to(el.querySelector(".a1-badge"),   { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.4)" }, 2.2)
      .to(counter, {
        val: 100, duration: 1.6, ease: "power2.out",
        onUpdate() { if (pctRef.current) pctRef.current.textContent = Math.round(counter.val) + "%"; },
      }, 2.2)
      .to(el.querySelector(".a1-sub"), { opacity: 1, duration: 0.8 }, 4.5);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{
      background: "#03060F", justifyContent: "center", padding: "56px 100px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Circuit grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(0,200,245,0.10) 1.5px, transparent 1.5px)",
        backgroundSize: "30px 30px",
      }} />
      {/* Glow orb */}
      <div style={{
        position: "absolute", right: -120, top: "50%", transform: "translateY(-50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,200,245,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
        <div className="a1-fade a1-eyebrow f-inter" style={{
          fontSize: 32, letterSpacing: 5, textTransform: "uppercase",
          color: "#00C8F5", marginBottom: 18,
        }}>
          The company you&apos;ve never heard of
        </div>

        <div className="a1-fade a1-title f-oswald c-white" style={{
          fontSize: 120, fontWeight: 700, lineHeight: 0.88, letterSpacing: -4, marginBottom: 24,
        }}>
          ASML
        </div>

        <div className="a1-fade a1-tagline f-oswald" style={{
          fontSize: 46, fontWeight: 600, lineHeight: 1.2,
          color: "rgba(255,255,255,0.75)", marginBottom: 44,
        }}>
          decides who gets to make<br />
          <span style={{ color: "#00C8F5" }}>the world&apos;s most advanced chips.</span>
        </div>

        <div className="a1-badge" style={{
          display: "inline-flex", alignItems: "center", gap: 28,
          background: "rgba(0,200,245,0.08)", border: "2px solid rgba(0,200,245,0.35)",
          borderRadius: 16, padding: "20px 36px",
        }}>
          <div>
            <div className="f-oswald" style={{ fontSize: 76, fontWeight: 700, color: "#00C8F5", lineHeight: 1 }}>
              <span ref={pctRef}>0%</span>
            </div>
            <div className="f-inter" style={{ fontSize: 30, color: "rgba(255,255,255,0.55)" }}>
              EUV market share
            </div>
          </div>
          <div style={{ width: 2, height: 76, background: "rgba(0,200,245,0.25)" }} />
          <div className="f-inter" style={{ fontSize: 30, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
            No second<br />supplier.<br />No backup.
          </div>
        </div>

        <div className="a1-sub f-inter" style={{
          marginTop: 24, fontSize: 30, color: "rgba(255,255,255,0.35)", lineHeight: 1.6,
        }}>
          No Apple silicon &nbsp;·&nbsp; No Nvidia GPUs &nbsp;·&nbsp; No frontier AI
        </div>
      </div>
    </div>
  );
}
