"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

// Scene duration: 39.00s — broader impact, Switch counter, and tech strategy parallels
const FOLLOWERS = [
  { name: "Tesla",   lesson: "Didn't try to out-engine Ford. Reinvented the car as software.", color: "#CC0000" },
  { name: "Airbnb",  lesson: "Didn't try to out-hotel Marriott. Made the host the product.",  color: "#FF5A5F" },
  { name: "Spotify", lesson: "Didn't try to out-sell iTunes. Made ownership feel pointless.",  color: "#1DB954" },
];

export default function Scene7_Impact() {
  const ref = useRef<HTMLDivElement>(null);
  const switchCounterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    gsap.set(el.querySelector(".n7-headline"), { opacity: 0, y: 20 });
    gsap.set(el.querySelector(".n7-sub"),      { opacity: 0 });
    gsap.set(el.querySelector(".n7-stat-row"), { opacity: 0, y: 18 });
    gsap.set(el.querySelectorAll(".n7-company"), { opacity: 0, x: 30 });
    gsap.set(el.querySelector(".n7-close"),    { opacity: 0 });

    const switchCount = { val: 0 };
    const tl = gsap.timeline({ delay: 0.3 });
    tl
      .to(el.querySelector(".n7-headline"), { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
      .to(el.querySelector(".n7-sub"),      { opacity: 1, duration: 0.6 }, 2.5)
      // Switch counter as narrator says "Switch alone has sold over 140 million"
      .to(el.querySelector(".n7-stat-row"), { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 8.4)
      .to(switchCount, {
        val: 140, duration: 2.0, ease: "power2.out",
        onUpdate() { if (switchCounterRef.current) switchCounterRef.current.textContent = Math.round(switchCount.val) + "M"; },
      }, 8.7)
      // Each company appears as narrator names the pattern
      .to(el.querySelector(".n7-company-0"), { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, 20.3)
      .to(el.querySelector(".n7-company-1"), { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, 25.6)
      .to(el.querySelector(".n7-company-2"), { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, 29.9)
      .to(el.querySelector(".n7-close"),     { opacity: 1, duration: 0.8, ease: "power2.out" }, 35.8);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene bg-navy" style={{ flexDirection: "row", padding: 0, alignItems: "stretch" }}>
      <div style={{ width: 440, display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px 48px 72px 100px", borderRight: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
        <div className="n7-headline f-oswald c-white" style={{ fontSize: 50, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, marginBottom: 16 }}>
          Nintendo wrote this playbook in 1989.
        </div>
        <div className="n7-sub f-inter" style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 32 }}>
          The broader lesson — don&apos;t fight on the dominant axis — became gospel in tech strategy.
        </div>
        <div className="n7-stat-row" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "20px 24px", marginBottom: 16 }}>
          <div className="f-inter" style={{ fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 8 }}>Nintendo Switch · Units Sold</div>
          <div className="f-oswald c-white" style={{ fontSize: 52, fontWeight: 700, lineHeight: 1 }}>
            <span ref={switchCounterRef}>0M</span>
          </div>
          <div className="f-inter" style={{ fontSize: 13, color: "#30D158", marginTop: 6 }}>Top 3 best-selling consoles ever made</div>
        </div>
        <div className="n7-close f-inter" style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
          More profit per employee than almost any company in entertainment.
          They survived mobile gaming, streaming, and the death of the game store.
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px 80px", gap: 20 }}>
        <div className="f-oswald" style={{ fontSize: 16, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>
          Companies that ran the same play:
        </div>
        {FOLLOWERS.map((c, i) => (
          <div key={i} className={`n7-company n7-company-${i}`} style={{
            background: "rgba(255,255,255,0.04)", border: `1px solid ${c.color}30`,
            borderLeft: `3px solid ${c.color}`, borderRadius: 8, padding: "20px 24px",
          }}>
            <div className="f-oswald" style={{ fontSize: 22, fontWeight: 700, color: c.color, marginBottom: 6 }}>{c.name}</div>
            <div className="f-inter" style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{c.lesson}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
