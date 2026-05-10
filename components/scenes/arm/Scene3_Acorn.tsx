"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene3_Acorn() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".acorn-logo"), { opacity: 0, x: -50 });
    gsap.set(el.querySelector(".computer-svg"), { opacity: 0, x: 50 });
    gsap.set(el.querySelectorAll(".code-line"), { opacity: 0, x: -20 });
    gsap.set(el.querySelector(".hero-text"), { opacity: 0, y: 20 });
    gsap.set(el.querySelector(".intro-msg"), { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });
    
    tl.to(el.querySelector(".intro-msg"), { opacity: 1, duration: 0.8 }, 4.84)
      .to(el.querySelector(".intro-msg"), { opacity: 0, duration: 0.5 }, 9.5);

    tl.to(el.querySelector(".acorn-logo"), { opacity: 1, x: 0, duration: 1, ease: "power3.out" }, 10.12)
      .to(el.querySelector(".computer-svg"), { opacity: 1, x: 0, duration: 1, ease: "power3.out" }, 15.0)
      .to(el.querySelectorAll(".code-line"), { opacity: 1, x: 0, stagger: 0.1, duration: 0.6 }, 18.0)
      .to(el.querySelector(".hero-text"), { opacity: 1, y: 0, duration: 0.8 }, 21.0);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#FAFAFA", padding: "0 100px" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#E4E4E7 1px, transparent 1px), linear-gradient(90deg, #E4E4E7 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.5 }} />
      
      <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 40 }}>
          <div className="intro-msg f-inter" style={{ position: "absolute", top: 80, fontSize: 24, color: "#71717A", letterSpacing: 2, textTransform: "uppercase" }}>
            To understand the decision...
          </div>

          <div className="acorn-logo f-oswald" style={{ fontSize: 48, fontWeight: 700, color: "#18181B", letterSpacing: 2 }}>
            <span style={{ color: "#2563EB" }}>ACORN</span> COMPUTERS (1978)
          </div>

          <div className="hero-text f-oswald" style={{ fontSize: 80, fontWeight: 700, color: "#18181B", lineHeight: 1.1, letterSpacing: -2 }}>
            THE MACHINE A<br/>GENERATION LEARNED ON
          </div>

          <div style={{ background: "#fff", border: "1px solid #E4E4E7", padding: "24px", borderRadius: 8, width: 400, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            {["10 PRINT 'HELLO WORLD'", "20 GOTO 10", "RUN"].map((line, i) => (
              <div key={i} className="code-line f-inter" style={{ color: "#18181B", fontSize: 20, fontFamily: "monospace", marginBottom: 8 }}>
                {line}
              </div>
            ))}
          </div>
        </div>

        <div className="computer-svg" style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <div style={{ width: 400, height: 300, background: "#fff", border: "2px solid #18181B", borderRadius: 16, position: "relative", boxShadow: "20px 20px 0 #E4E4E7" }}>
             <div style={{ position: "absolute", top: 20, left: 20, right: 20, height: 200, background: "#F4F4F5", border: "2px solid #18181B", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
               <div className="f-inter" style={{ fontSize: 24, fontWeight: "bold", color: "#A1A1AA", letterSpacing: 4 }}>BBC MICRO</div>
             </div>
             <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, height: 40, borderTop: "2px solid #18181B", display: "flex", gap: 4, paddingTop: 10 }}>
               {[...Array(12)].map((_, i) => <div key={i} style={{ flex: 1, background: "#E4E4E7", borderRadius: 2 }} />)}
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}