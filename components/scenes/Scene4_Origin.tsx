"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene4_Origin() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".s4-eyebrow"), { opacity: 0, y: 12 });
    gsap.set(el.querySelector(".s4-headline"), { opacity: 0, y: 20 });
    gsap.set(el.querySelector(".s4-line"), { scaleX: 0, transformOrigin: "left center" });
    gsap.set(el.querySelectorAll(".s4-node"), { scale: 0, opacity: 0 });
    gsap.set(el.querySelectorAll(".s4-card"), { opacity: 0, y: 18 });
    gsap.set(el.querySelector(".s4-connector"), { scaleX: 0, transformOrigin: "left center" });
    gsap.set(el.querySelector(".s4-close"), { opacity: 0, y: 16 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl
      .to(el.querySelector(".s4-eyebrow"), { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
      .to(el.querySelector(".s4-headline"), { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.3)
      // Timeline line draws
      .to(el.querySelector(".s4-line"), { scaleX: 1, duration: 1.0, ease: "power2.inOut" }, 1.5)
      // Node 1 pops
      .to(el.querySelector(".s4-node-1"), { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }, 2.3)
      .to(el.querySelector(".s4-card-1"), { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 2.5)
      // Connector to node 2
      .to(el.querySelector(".s4-connector"), { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, 4.2)
      // Node 2 pops
      .to(el.querySelector(".s4-node-2"), { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }, 4.8)
      .to(el.querySelector(".s4-card-2"), { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 5.0)
      // Close statement
      .to(el.querySelector(".s4-close"), { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 7.5);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene bg-cream" style={{ justifyContent: "center", padding: "72px 100px" }}>

      <div className="s4-eyebrow f-inter t-small" style={{ color: "#999", marginBottom: 12 }}>
        The Origin
      </div>
      <div className="s4-headline f-oswald c-dark" style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5, marginBottom: 56 }}>
        The idea didn&apos;t start<br />at Costco.
      </div>

      {/* Timeline track */}
      <div style={{ position: "relative", width: "100%", height: 120, marginBottom: 48 }}>

        {/* The line itself */}
        <div className="s4-line" style={{
          position: "absolute", top: 28, left: 0, right: 0,
          height: 3, background: "#ccc", borderRadius: 2,
        }} />

        {/* Node 1: Price Club */}
        <div style={{ position: "absolute", left: "5%", top: 0 }}>
          <div className="s4-node s4-node-1" style={{
            width: 20, height: 20, borderRadius: "50%",
            background: "#E31837", marginBottom: 16, marginLeft: 0,
            boxShadow: "0 0 0 4px rgba(227,24,55,0.15)",
          }} />
          <div className="s4-card s4-card-1" style={{ maxWidth: 200 }}>
            <div className="f-oswald c-dark" style={{ fontSize: 20, fontWeight: 700 }}>1976</div>
            <div className="f-oswald" style={{ fontSize: 14, color: "#E31837", letterSpacing: 1, textTransform: "uppercase", margin: "4px 0" }}>Price Club</div>
            <div className="f-inter" style={{ fontSize: 13, color: "#666", lineHeight: 1.5 }}>
              San Diego, CA.<br />
              Founded by Sol Price.
            </div>
          </div>
        </div>

        {/* Connector indicator (decorative) */}
        <div className="s4-connector" style={{
          position: "absolute", top: 28, left: "22%", width: "55%",
          height: 3, background: "#E31837", borderRadius: 2,
        }} />

        {/* Node 2: Costco */}
        <div style={{ position: "absolute", left: "72%", top: 0 }}>
          <div className="s4-node s4-node-2" style={{
            width: 20, height: 20, borderRadius: "50%",
            background: "#003087", marginBottom: 16,
            boxShadow: "0 0 0 4px rgba(0,48,135,0.15)",
          }} />
          <div className="s4-card s4-card-2" style={{ maxWidth: 220 }}>
            <div className="f-oswald c-dark" style={{ fontSize: 20, fontWeight: 700 }}>1983</div>
            <div className="f-oswald" style={{ fontSize: 14, color: "#003087", letterSpacing: 1, textTransform: "uppercase", margin: "4px 0" }}>Costco</div>
            <div className="f-inter" style={{ fontSize: 13, color: "#666", lineHeight: 1.5 }}>
              Jim Sinegal — Price&apos;s protégé.<br />
              Same blueprint. New chapter.
            </div>
          </div>
        </div>
      </div>

      {/* Sol Price insight */}
      <div style={{
        background: "#fff", borderRadius: 8, padding: "24px 32px",
        borderLeft: "4px solid #E31837", marginBottom: 24, width: "100%",
      }}>
        <div className="f-oswald c-dark" style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
          Sol Price&apos;s Theory
        </div>
        <div className="f-inter" style={{ fontSize: 16, color: "#444", lineHeight: 1.7 }}>
          Retail margin gets wasted on ads, salespeople, fancy shelving, expensive neighborhoods.
          Strip it all. Concrete floors. Products on pallets. Pass the savings to members only.
          The fee filters out tire-kickers.
        </div>
      </div>

      <div className="s4-close f-oswald c-dark" style={{ fontSize: 30, fontWeight: 700 }}>
        The people who walk in are <span style={{ color: "#E31837" }}>pre-committed</span> to buying.
      </div>
    </div>
  );
}
