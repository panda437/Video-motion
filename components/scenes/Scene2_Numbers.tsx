"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene2_Numbers() {
  const ref = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelectorAll(".s2-tag, .s2-unit, .s2-sub"), { opacity: 0, y: 24 });
    gsap.set(el.querySelector(".s2-divider"), { scaleX: 0, transformOrigin: "left center" });
    gsap.set(el.querySelectorAll(".s2-stat"), { opacity: 0, x: -40 });
    gsap.set(el.querySelector(".s2-punch"), { opacity: 0, y: 30 });
    gsap.set(el.querySelector(".s2-punchsub"), { opacity: 0 });

    const counter = { val: 0 };
    const tl = gsap.timeline({ delay: 0.4 });

    tl
      // Tag fades in
      .to(el.querySelector(".s2-tag"), { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
      // Big number counts up
      .to(counter, {
        val: 250,
        duration: 2.2,
        ease: "power2.out",
        onUpdate() {
          if (counterRef.current) {
            const n = Math.round(counter.val);
            counterRef.current.textContent = "$" + n.toLocaleString();
          }
        },
      }, 0.5)
      .to(el.querySelector(".s2-unit"), { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.8)
      .to(el.querySelector(".s2-sub"), { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 1.4)
      .to(el.querySelector(".s2-divider"), { scaleX: 1, duration: 0.8, ease: "power3.out" }, 3.0)
      // Three supporting stats stagger in
      .to(el.querySelectorAll(".s2-stat"), { opacity: 1, x: 0, duration: 0.6, ease: "power3.out", stagger: 0.2 }, 3.5)
      // Punch line
      .to(el.querySelector(".s2-punch"), { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 6.5)
      .to(el.querySelector(".s2-punchsub"), { opacity: 1, duration: 0.6, ease: "power2.out" }, 7.4);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene bg-navy" style={{ flexDirection: "row", alignItems: "stretch", padding: 0 }}>

      {/* Left panel — big number */}
      <div style={{
        width: 600, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "80px 80px 80px 100px",
        borderRight: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div className="s2-tag f-inter t-small c-red" style={{ marginBottom: 24 }}>
          Annual Revenue
        </div>

        <div ref={counterRef} className="f-oswald c-white" style={{
          fontSize: 112, fontWeight: 700, lineHeight: 1, letterSpacing: -4,
        }}>
          $0
        </div>

        <div className="s2-unit f-oswald c-white" style={{
          fontSize: 42, fontWeight: 400, letterSpacing: 0,
          color: "rgba(255,255,255,0.5)", marginTop: 8,
        }}>
          BILLION / YEAR
        </div>

        <div className="s2-sub f-inter" style={{
          marginTop: 20, fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.6,
        }}>
          More revenue than Nike, Ford, and Goldman Sachs combined.
        </div>
      </div>

      {/* Right panel — supporting stats + punch */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "80px 80px 80px 72px",
        gap: 0,
      }}>
        <div className="s2-divider" style={{
          height: 2, width: 280, background: "rgba(255,255,255,0.15)", marginBottom: 40,
        }} />

        {[
          { value: "#1", label: "rotisserie chicken seller on Earth" },
          { value: "10×", label: "Costco stock vs S&P over a decade" },
          { value: "~2%", label: "net profit margin on everything sold" },
        ].map((stat, i) => (
          <div key={i} className="s2-stat" style={{
            display: "flex", alignItems: "baseline", gap: 18, marginBottom: 28,
          }}>
            <span className="f-oswald c-white" style={{ fontSize: 52, fontWeight: 700, lineHeight: 1 }}>
              {stat.value}
            </span>
            <span className="f-inter" style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.4, maxWidth: 200 }}>
              {stat.label}
            </span>
          </div>
        ))}

        <div className="s2-punch f-oswald" style={{
          marginTop: 8, fontSize: 34, fontWeight: 700, lineHeight: 1.2,
          color: "#fff", paddingLeft: 20, borderLeft: "4px solid var(--red)",
        }}>
          They make almost nothing<br/>on what they sell.
        </div>
        <div className="s2-punchsub f-inter" style={{
          marginTop: 12, fontSize: 15, color: "rgba(255,255,255,0.45)",
          paddingLeft: 24,
        }}>
          By design. By rule. Written down in policy.
        </div>
      </div>
    </div>
  );
}
