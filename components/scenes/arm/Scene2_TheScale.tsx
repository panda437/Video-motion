"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene2_TheScale() {
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const counter = { val: 0 };

    gsap.set(el.querySelectorAll(".device-box"), { opacity: 0, y: 40 });
    gsap.set(el.querySelector(".hero-container"), { opacity: 0 });
    gsap.set(el.querySelector(".strange-part"), { opacity: 0, y: 20 });

    const tl = gsap.timeline({ delay: 0.1 });
    
    // retention fix: start immediately
    tl.to(el.querySelectorAll(".device-box")[0], { opacity: 1, y: 0, duration: 0.6 }, 0.5)
      .to(el.querySelectorAll(".device-box")[1], { opacity: 1, y: 0, duration: 0.6 }, 1.5)
      .to(el.querySelectorAll(".device-box")[2], { opacity: 1, y: 0, duration: 0.6 }, 2.5)
      .to(el.querySelectorAll(".device-box")[3], { opacity: 1, y: 0, duration: 0.6 }, 3.5)
      .to(el.querySelectorAll(".device-box")[4], { opacity: 1, y: 0, duration: 0.6 }, 4.5)
      .to(el.querySelectorAll(".device-box")[5], { opacity: 1, y: 0, duration: 0.6 }, 5.5);

    // Counter Reveal
    tl.to(el.querySelector(".hero-container"), { opacity: 1, duration: 0.8 }, 21.04)
      .to(counter, {
        val: 250, duration: 4, ease: "power2.out",
        onUpdate: () => { if (countRef.current) countRef.current.innerText = Math.floor(counter.val).toString(); }
      }, 21.5);

    tl.to(el.querySelector(".strange-part"), { opacity: 1, y: 0, duration: 1 }, 28.72);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#FAFAFA", padding: 0, overflow: "hidden" }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", maxWidth: 1000, marginBottom: 60 }}>
          {["IPHONES", "ANDROID", "MACBOOKS", "SMART WATCHES", "CARS", "ROBOTS"].map((d, i) => (
            <div key={i} className="device-box f-inter" style={{ background: "#fff", border: "1px solid #E4E4E7", padding: "12px 20px", borderRadius: 6, fontSize: 13, fontWeight: 800, color: "#18181B", letterSpacing: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>{d}</div>
          ))}
        </div>

        <div className="hero-container" style={{ textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 16 }}>
            <span ref={countRef} className="f-oswald" style={{ fontSize: 160, fontWeight: 900, color: "#18181B", letterSpacing: -5 }}>0</span>
            <span className="f-oswald" style={{ fontSize: 80, fontWeight: 700, color: "#2563EB" }}>BILLION</span>
          </div>
          <div className="f-inter" style={{ fontSize: 24, color: "#71717A", letterSpacing: 4, textTransform: "uppercase", marginTop: -20, fontWeight: 600 }}>CHIPS DISTRIBUTED</div>
        </div>

        <div className="strange-part f-oswald" style={{ marginTop: 80, fontSize: 42, color: "#EF4444", fontWeight: 700, border: "4px solid #EF4444", padding: "10px 40px", borderRadius: 8 }}>THEY MANUFACTURE ZERO CHIPS.</div>
      </div>
    </div>
  );
}
