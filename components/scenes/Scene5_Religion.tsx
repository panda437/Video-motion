"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

const RULES = [
  { rule: "14% markup cap.", detail: "Written in policy. Enforced with termination." },
  { rule: "Pay employees 2× industry.", detail: "Lower turnover. Lower training costs. Better service." },
  { rule: "4,000 SKUs — not 140,000.", detail: "Bulk leverage on every single item." },
  { rule: "Never advertise.", detail: "The product does the advertising." },
];

export default function Scene5_Religion() {
  const ref = useRef<HTMLDivElement>(null);
  const hotdogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".s5-headline"), { opacity: 0, y: 20 });
    gsap.set(el.querySelectorAll(".s5-rule"), { opacity: 0, x: -30 });
    gsap.set(el.querySelector(".s5-hotdog-wrap"), { opacity: 0, scale: 0.9 });
    gsap.set(el.querySelector(".s5-year-line"), { scaleX: 0, transformOrigin: "left center" });
    gsap.set(el.querySelector(".s5-quote"), { opacity: 0, y: 16 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl
      .to(el.querySelector(".s5-headline"), { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(el.querySelectorAll(".s5-rule"), {
        opacity: 1, x: 0, duration: 0.55, ease: "power3.out", stagger: 0.35,
      }, 0.7)
      // Hot dog segment
      .to(el.querySelector(".s5-hotdog-wrap"), {
        opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.5)",
      }, 3.2)
      .to(el.querySelector(".s5-year-line"), { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 4.0)
      .to(el.querySelector(".s5-quote"), { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 5.2);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene bg-dark" style={{
      flexDirection: "row", padding: 0, alignItems: "stretch",
    }}>

      {/* Left: The Commandments */}
      <div style={{
        width: 580, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "72px 60px 72px 100px",
        borderRight: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div className="s5-headline f-oswald c-white" style={{
          fontSize: 18, fontWeight: 400, letterSpacing: 3, textTransform: "uppercase",
          color: "#E31837", marginBottom: 36,
        }}>
          Sinegal&apos;s Commandments
        </div>

        {RULES.map((r, i) => (
          <div key={i} className="s5-rule" style={{
            display: "flex", gap: 18, marginBottom: 24,
            paddingBottom: 24,
            borderBottom: i < RULES.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "#E31837", display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, marginTop: 3,
              fontFamily: "var(--font-oswald)", fontWeight: 700, fontSize: 13, color: "#fff",
            }}>
              {i + 1}
            </div>
            <div>
              <div className="f-oswald c-white" style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}>
                {r.rule}
              </div>
              <div className="f-inter" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 4, lineHeight: 1.5 }}>
                {r.detail}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right: The Hot Dog */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: 60, background: "#141414",
      }}>
        <div className="s5-hotdog-wrap" style={{
          background: "#1C1C1E", borderRadius: 12, padding: "36px 48px",
          textAlign: "center", width: "100%", border: "1px solid rgba(255,255,255,0.08)",
        }}>
          <div className="f-oswald" style={{
            fontSize: 13, letterSpacing: 3, textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)", marginBottom: 20,
          }}>
            Hot Dog + Soda
          </div>

          <div className="f-oswald c-white" style={{
            fontSize: 96, fontWeight: 700, lineHeight: 1, letterSpacing: -3,
            color: "#F59E0B",
          }}>
            $1.50
          </div>

          {/* Year timeline */}
          <div className="s5-year-line" style={{
            height: 2, background: "rgba(245,158,11,0.3)", margin: "24px auto",
            width: "80%", borderRadius: 2,
          }} />

          <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8 }}>
            <div className="f-oswald" style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>
              1985
            </div>
            <div className="f-oswald" style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>
              2026
            </div>
          </div>
          <div className="f-inter" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", letterSpacing: 1 }}>
            SAME PRICE. FORTY YEARS.
          </div>
        </div>

        {/* Quote */}
        <div ref={hotdogRef} className="s5-quote" style={{ marginTop: 32, textAlign: "center" }}>
          <div className="f-oswald" style={{
            fontSize: 19, color: "rgba(255,255,255,0.75)", fontStyle: "italic",
            lineHeight: 1.5,
          }}>
            &ldquo;If you raise the price of the hot dog,
          </div>
          <div className="f-oswald" style={{
            fontSize: 19, color: "#E31837", fontStyle: "italic", lineHeight: 1.5,
          }}>
            I will kill you.&rdquo;
          </div>
          <div className="f-inter" style={{
            fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: 1, marginTop: 8,
            textTransform: "uppercase",
          }}>
            — Jim Sinegal, Costco Co-Founder
          </div>
        </div>
      </div>
    </div>
  );
}
