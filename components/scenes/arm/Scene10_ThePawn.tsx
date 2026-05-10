"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene10_ThePawn() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".arm-node"), { opacity: 0, scale: 0 });
    gsap.set(el.querySelectorAll(".giant-node"), { opacity: 0, y: -50 });
    gsap.set(el.querySelectorAll(".attack-line"), { scaleY: 0, transformOrigin: "top" });
    gsap.set(el.querySelectorAll(".block-stamp"), { opacity: 0, scale: 3 });

    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.to(el.querySelector(".arm-node"), { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" }, 0)
      .to(el.querySelectorAll(".giant-node")[0], { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 5.56) // Softbank
      .to(el.querySelectorAll(".attack-line")[0], { scaleY: 1, duration: 0.4 }, 6.5)
      .to(el.querySelectorAll(".giant-node")[1], { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 12.24) // Nvidia
      .to(el.querySelectorAll(".attack-line")[1], { scaleY: 1, duration: 0.4 }, 13.0)
      .to(el.querySelectorAll(".block-stamp")[1], { opacity: 1, scale: 1, duration: 0.3, ease: "power4.in" }, 16.0); // Blocked

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#FAFAFA", padding: 0, alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      
      <div className="f-oswald" style={{ position: "absolute", top: 60, fontSize: 80, fontWeight: 700, color: "#18181B", letterSpacing: -2 }}>
        THE GEOPOLITICAL PAWN
      </div>

      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        
        {/* Giants */}
        <div style={{ display: "flex", gap: 300, position: "absolute", top: 250 }}>
          
          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="giant-node f-inter" style={{ background: "#fff", border: "2px solid #18181B", padding: "16px 32px", borderRadius: 8, fontSize: 24, fontWeight: 600, color: "#18181B", zIndex: 10 }}>
              SOFTBANK ($30B)
            </div>
            <div className="attack-line" style={{ width: 4, height: 150, background: "#18181B", zIndex: 0 }} />
          </div>

          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="giant-node f-inter" style={{ background: "#fff", border: "2px solid #18181B", padding: "16px 32px", borderRadius: 8, fontSize: 24, fontWeight: 600, color: "#18181B", zIndex: 10 }}>
              NVIDIA ($40B)
            </div>
            <div className="attack-line" style={{ width: 4, height: 150, background: "#18181B", zIndex: 0 }} />
            <div className="block-stamp f-oswald" style={{ position: "absolute", top: 100, color: "#EF4444", border: "6px solid #EF4444", padding: "8px 24px", fontSize: 40, fontWeight: 900, background: "#fff", transform: "rotate(-10deg)", zIndex: 20 }}>
              BLOCKED
            </div>
          </div>

        </div>

        {/* Target */}
        <div className="arm-node" style={{ position: "absolute", bottom: 150, background: "#2563EB", padding: "40px 80px", borderRadius: 16, boxShadow: "0 20px 40px rgba(37,99,235,0.2)", zIndex: 10 }}>
          <div className="f-oswald" style={{ fontSize: 64, fontWeight: 700, color: "#fff", letterSpacing: 2 }}>ARM ARCHITECTURE</div>
        </div>

      </div>
    </div>
  );
}