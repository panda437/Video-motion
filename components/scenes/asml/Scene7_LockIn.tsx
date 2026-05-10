"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const INVESTORS = [
  { name: "Intel",   flag: "🇺🇸", amount: "€277M",        color: "#0071C5" },
  { name: "TSMC",    flag: "🇹🇼", amount: "€276M",        color: "#FF6B00" },
  { name: "Samsung", flag: "🇰🇷", amount: "equity stake", color: "#1428A0" },
];

export default function Scene7_LockIn() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".a7-headline"), { opacity: 0, y: 20 });
    gsap.set(el.querySelector(".a7-context"),  { opacity: 0 });
    gsap.set(el.querySelectorAll(".a7-card"),  { opacity: 0, y: 28 });
    gsap.set(el.querySelector(".a7-stake"),    { opacity: 0, scale: 0.9 });
    gsap.set(el.querySelector(".a7-nikon"),    { opacity: 0 });
    gsap.set(el.querySelector(".a7-lock"),     { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl
      .to(el.querySelector(".a7-headline"), { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(el.querySelector(".a7-context"),  { opacity: 1, duration: 0.7 }, 4.0)
      .to(el.querySelectorAll(".a7-card"),  { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 4.5 }, 8.0)
      .to(el.querySelector(".a7-stake"),    { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)" }, 28.0)
      .to(el.querySelector(".a7-nikon"),    { opacity: 1, duration: 0.6 }, 42.0)
      .to(el.querySelector(".a7-lock"),     { opacity: 1, duration: 0.6 }, 56.0);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{
      background: "#040912", flexDirection: "column",
      justifyContent: "center", padding: "36px 80px",
    }}>
      <div className="a7-headline f-oswald c-white" style={{
        fontSize: 44, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1, marginBottom: 14,
      }}>
        The Customers Became the Investors
      </div>

      <div className="a7-context" style={{
        background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.3)",
        borderRadius: 8, padding: "12px 20px", marginBottom: 16,
      }}>
        <div className="f-inter" style={{ fontSize: 30, color: "#F5A623", lineHeight: 1.4 }}>
          2012: Bleeding cash, no commercial EUV. ASML sold 23% of itself to their three biggest customers.
        </div>
      </div>

      {/* 3-column investor cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
        {INVESTORS.map((inv, i) => (
          <div key={i} className="a7-card" style={{
            display: "flex", alignItems: "center", gap: 16,
            background: `rgba(${inv.color === "#0071C5" ? "0,113,197" : inv.color === "#FF6B00" ? "255,107,0" : "20,40,160"},0.1)`,
            border: `1px solid ${inv.color}40`,
            borderLeft: `4px solid ${inv.color}`,
            borderRadius: 10, padding: "14px 18px",
          }}>
            <div style={{ fontSize: 40 }}>{inv.flag}</div>
            <div style={{ flex: 1 }}>
              <div className="f-oswald c-white" style={{ fontSize: 38, fontWeight: 700, lineHeight: 1 }}>
                {inv.name}
              </div>
            </div>
            <div className="f-oswald" style={{ fontSize: 30, fontWeight: 700, color: inv.color, textAlign: "right" }}>
              {inv.amount}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom info row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        <div className="a7-stake" style={{
          background: "rgba(0,200,245,0.08)", border: "2px solid rgba(0,200,245,0.3)",
          borderRadius: 10, padding: "16px 20px", textAlign: "center",
        }}>
          <div className="f-oswald" style={{ fontSize: 60, fontWeight: 700, color: "#00C8F5", lineHeight: 1 }}>23%</div>
          <div className="f-inter" style={{ fontSize: 30, color: "rgba(255,255,255,0.55)", marginTop: 6 }}>
            of ASML sold
          </div>
        </div>

        <div className="a7-nikon" style={{
          background: "rgba(255,68,68,0.08)", border: "1px solid rgba(255,68,68,0.3)",
          borderRadius: 10, padding: "16px 20px",
        }}>
          <div className="f-oswald" style={{ fontSize: 32, fontWeight: 700, color: "#FF4444", marginBottom: 8 }}>
            Nikon gave up
          </div>
          <div className="f-inter" style={{ fontSize: 30, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
            2013: "EUV off plan"<br />
            2014: silent
          </div>
        </div>

        <div className="a7-lock" style={{
          background: "rgba(0,230,118,0.08)", border: "1px solid rgba(0,230,118,0.3)",
          borderRadius: 10, padding: "16px 20px",
        }}>
          <div className="f-oswald" style={{ fontSize: 32, fontWeight: 700, color: "#00E676", marginBottom: 8 }}>
            The payoff
          </div>
          <div className="f-inter" style={{ fontSize: 30, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
            2017 — 10 machines<br />
            2019 — chips in phones
          </div>
        </div>
      </div>
    </div>
  );
}
