"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene1_TheSpark() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".intro-1"), { opacity: 0, scale: 0.9, y: 20 });
    gsap.set(el.querySelector(".intro-stack"), { opacity: 0, y: 30 });
    gsap.set(el.querySelector(".sophie-img"), { opacity: 0, scale: 1.1 });
    gsap.set(el.querySelector(".date-label"), { opacity: 0, x: -20 });
    gsap.set(el.querySelectorAll(".chip-path"), { strokeDasharray: 500, strokeDashoffset: 500 });
    gsap.set(el.querySelector(".hero-title"), { opacity: 0, scale: 0.95 });

    const tl = gsap.timeline({ delay: 0.1 });
    
    // Bold Fast Intro (0-8s)
    tl.to(el.querySelector(".intro-1"), { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }, 0.2)
      .to(el.querySelector(".intro-1"), { opacity: 0, scale: 1.1, duration: 0.4 }, 3.0)
      .to(el.querySelector(".intro-stack"), { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 3.4)
      .to(el.querySelector(".intro-stack"), { opacity: 0, duration: 0.5 }, 7.5);

    // Sophie Reveal (Starts at 8.16s)
    tl.to(el.querySelector(".sophie-img"), { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, 8.16)
      .to(el.querySelector(".date-label"), { opacity: 1, x: 0, duration: 0.8 }, 8.5)
      .to(el.querySelectorAll(".chip-path"), { strokeDashoffset: 0, duration: 1.5, stagger: 0.1, ease: "power2.inOut" }, 13.84)
      .to(el.querySelector(".hero-title"), { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }, 22.2);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#FAFAFA", padding: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, #E4E4E7 1.5px, transparent 1.5px)", backgroundSize: "40px 40px" }} />

      <div className="main-ui" style={{ position: "relative", zIndex: 1, display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
        
        {/* Fast Intro Overlay */}
        <div className="intro-1 f-oswald" style={{ position: "absolute", fontSize: 90, fontWeight: 900, color: "#18181B", textAlign: "center", textTransform: "uppercase" }}>
          IDEAS THAT SHAPED<br/>COMPANIES
        </div>
        
        <div className="intro-stack" style={{ position: "absolute", textAlign: "center" }}>
           <div className="f-inter" style={{ fontSize: 24, fontWeight: 700, color: "#2563EB", letterSpacing: 8, textTransform: "uppercase" }}>STRATEGY · EPISODE 005</div>
           <div className="f-oswald" style={{ fontSize: 50, fontWeight: 700, color: "#18181B", marginTop: 20, maxWidth: 900, lineHeight: 1.1 }}>
             The company that makes money<br/>
             <span style={{ color: "#2563EB" }}>every time you buy an electronic device</span>
           </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
          <div style={{ position: "relative" }}>
            <div className="date-label f-oswald" style={{ position: "absolute", top: -60, left: 0, fontSize: 32, color: "#2563EB", fontWeight: 700, letterSpacing: 2 }}>APRIL 1985</div>
            <div className="sophie-img" style={{ position: "relative", width: 380, height: 480, overflow: "hidden", borderRadius: 16, border: "1px solid #E4E4E7", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
              <img src="/sophie.webp" alt="Sophie Wilson" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", padding: "24px" }}>
                <div className="f-inter" style={{ color: "#fff", fontSize: 16, fontWeight: 800, letterSpacing: 2 }}>SOPHIE WILSON</div>
                <div className="f-inter" style={{ color: "#2563EB", fontSize: 12, fontWeight: 700, marginTop: 4 }}>THE DESIGNER</div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ position: "relative", width: 240, height: 240, marginBottom: 20 }}>
              <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
                <rect className="chip-path" x="40" y="40" width="120" height="120" fill="none" stroke="#18181B" strokeWidth="2" rx="4" />
                <rect className="chip-path" x="75" y="75" width="50" height="50" fill="none" stroke="#2563EB" strokeWidth="4" rx="2" />
                {[40, 60, 80, 100, 120, 140, 160].map(p => <line key={p} className="chip-path" x1={p} y1="40" x2={p} y2="160" stroke="#D4D4D8" strokeWidth="1" />)}
              </svg>
            </div>
            <div className="hero-title f-oswald" style={{ color: "#18181B", fontSize: 64, fontWeight: 900, letterSpacing: -2, lineHeight: 1 }}>
              BOOTED ON<br/><span style={{ color: "#2563EB" }}>THE FIRST TRY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
