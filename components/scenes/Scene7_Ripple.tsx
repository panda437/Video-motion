"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

const COMPANIES = [
  { name: "Amazon Prime", note: "More profit than all of Amazon retail", color: "#FF9900", top: "8%",  left: "38%" },
  { name: "Sam's Club",   note: "Direct Costco blueprint copy",          color: "#0071CE", top: "30%", left: "68%" },
  { name: "BJ's Wholesale", note: "East coast warehouse club",           color: "#e53935", top: "58%", left: "72%" },
  { name: "Apple One",    note: "Subscription bundles the whole stack",  color: "#888",    top: "68%", left: "38%" },
  { name: "Spotify Family", note: "Pay once, bring everyone in",         color: "#1DB954", top: "80%", left: "10%" },
  { name: "Costco",       note: "The original. The template.",           color: "#E31837", top: "44%", left: "18%" },
];

export default function Scene7_Ripple() {
  const ref = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".s7-headline"), { opacity: 0, y: 24 });
    gsap.set(el.querySelector(".s7-sub"),      { opacity: 0 });
    gsap.set(el.querySelectorAll(".s7-node"),  { scale: 0, opacity: 0 });
    gsap.set(el.querySelector(".s7-cap-row"),  { opacity: 0, y: 20 });
    gsap.set(el.querySelector(".s7-close"),    { opacity: 0 });

    const counter = { val: 0 };
    const tl = gsap.timeline({ delay: 0.3 });
    tl
      .to(el.querySelector(".s7-headline"), { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
      .to(el.querySelector(".s7-sub"),      { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.6)
      .to(el.querySelectorAll(".s7-node"), {
        scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.6)", stagger: 0.2,
      }, 1.2)
      .to(el.querySelector(".s7-cap-row"), { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 4.5)
      .to(counter, {
        val: 400,
        duration: 1.8,
        ease: "power2.out",
        onUpdate() {
          if (counterRef.current) {
            counterRef.current.textContent = "$" + Math.round(counter.val) + "B";
          }
        },
      }, 4.8)
      .to(el.querySelector(".s7-close"), { opacity: 1, duration: 0.8, ease: "power2.out" }, 7.5);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene bg-navy" style={{ flexDirection: "row", padding: 0, alignItems: "stretch" }}>

      {/* Left: text */}
      <div style={{
        width: 420, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "72px 48px 72px 100px",
        borderRight: "1px solid rgba(255,255,255,0.07)", flexShrink: 0,
      }}>
        <div className="s7-headline f-oswald c-white" style={{
          fontSize: 54, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, marginBottom: 20,
        }}>
          Costco changed how everyone thinks about retail.
        </div>
        <div className="s7-sub f-inter" style={{
          fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 40,
        }}>
          The &ldquo;membership as the actual product&rdquo; idea now powers some of the biggest businesses on Earth.
        </div>

        <div className="s7-cap-row" style={{
          background: "rgba(255,255,255,0.06)", borderRadius: 10,
          padding: "20px 24px", border: "1px solid rgba(255,255,255,0.1)",
        }}>
          <div className="f-inter" style={{ fontSize: 12, letterSpacing: 2, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 8 }}>
            Costco Market Cap
          </div>
          <div className="f-oswald" style={{ fontSize: 52, fontWeight: 700, lineHeight: 1 }}>
            <span ref={counterRef} style={{ color: "#fff" }}>$0B</span>
          </div>
        </div>

        <div className="s7-close f-inter" style={{
          marginTop: 20, fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.7,
        }}>
          The hot dog is still $1.50. The membership is $65.<br />
          The business is worth $400 billion.
        </div>
      </div>

      {/* Right: constellation */}
      <div style={{ flex: 1, position: "relative" }}>
        {COMPANIES.map((c, i) => (
          <div key={i} className="s7-node" style={{
            position: "absolute", top: c.top, left: c.left,
            transformOrigin: "center center",
          }}>
            <div style={{
              background: c.name === "Costco" ? c.color : "rgba(255,255,255,0.05)",
              border: `1.5px solid ${c.color}`,
              borderRadius: 10, padding: "14px 20px",
              minWidth: 160,
            }}>
              <div className="f-oswald" style={{
                fontSize: c.name === "Costco" ? 20 : 17,
                fontWeight: 700, color: c.name === "Costco" ? "#fff" : c.color,
                letterSpacing: 0.5,
              }}>
                {c.name}
              </div>
              <div className="f-inter" style={{
                fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 4, lineHeight: 1.4,
              }}>
                {c.note}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
