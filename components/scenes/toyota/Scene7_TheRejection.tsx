"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene7_TheRejection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".t7-title"), { opacity: 0, y: 20 });
    gsap.set(el.querySelectorAll(".t7-commando"), { opacity: 0, x: -100 });
    gsap.set(el.querySelector(".t7-gm-wall"), { opacity: 0, scale: 0.9 });
    gsap.set(el.querySelectorAll(".t7-fade"), { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl
      .to(el.querySelector(".t7-title"), { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
      .to(el.querySelector(".t7-gm-wall"), { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }, 0.5)
      
      // Commandos arrive
      .to(el.querySelectorAll(".t7-commando"), { opacity: 1, x: 0, stagger: 0.03, duration: 0.6, ease: "power2.out" }, 2.4)
      
      // Rejection
      .to(el.querySelectorAll(".t7-commando"), { 
        x: 50, opacity: 0.2, filter: "blur(4px)", stagger: 0.02, duration: 0.8, ease: "power2.in" 
      }, 7.88)
      
      .to(el.querySelectorAll(".t7-fade"), { opacity: 1, duration: 0.8 }, 8.5);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#07080A", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
      
      <div style={{ position: "absolute", top: 60, left: 100 }}>
        <div className="t7-title f-oswald c-white" style={{ fontSize: 60, fontWeight: 700, letterSpacing: -1 }}>
          THE NUMMI COMMANDOS
        </div>
        <div className="t7-fade f-inter" style={{ fontSize: 24, color: "#FF3B30", marginTop: 8 }}>
          The transplant rejected itself.
        </div>
      </div>

      {/* Left: 16 Managers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginRight: 100 }}>
        {[...Array(16)].map((_, i) => (
          <div key={i} className="t7-commando" style={{ 
            width: 40, height: 40, background: "rgba(45,90,39,0.8)", borderRadius: "50%",
            border: "2px solid #2D5A27", display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <div style={{ width: 16, height: 16, background: "#fff", borderRadius: "50%" }} />
          </div>
        ))}
      </div>

      {/* Right: GM Corporate Structure */}
      <div className="t7-gm-wall" style={{ 
        width: 300, height: 400, background: "rgba(255,255,255,0.03)", 
        border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
        display: "flex", flexDirection: "column", padding: 24, gap: 12
      }}>
        <div className="f-oswald" style={{ fontSize: 32, color: "rgba(255,255,255,0.4)", textAlign: "center", marginBottom: 20 }}>
          CORPORATE
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ height: 40, background: "rgba(255,255,255,0.05)", borderRadius: 6 }} />
        ))}
      </div>

    </div>
  );
}
