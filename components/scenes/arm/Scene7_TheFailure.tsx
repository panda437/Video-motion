"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene7_TheFailure() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".device-box"), { opacity: 0, y: 50 });
    gsap.set(el.querySelector(".stamp"), { opacity: 0, scale: 3 });
    gsap.set(el.querySelector(".hero-text"), { opacity: 0, y: 20 });

    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.to(el.querySelector(".device-box"), { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 0)
      .to(el.querySelector(".hero-text"), { opacity: 1, y: 0, duration: 0.8 }, 0.5)
      .to(el.querySelector(".stamp"), { opacity: 1, scale: 1, duration: 0.3, ease: "power4.in" }, 2.0)
      .to(el, { x: 10, y: 10, duration: 0.05, repeat: 5, yoyo: true, ease: "none" }, 2.3);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#FAFAFA", padding: 0, alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      
      <div className="hero-text f-oswald" style={{ position: "absolute", top: 100, fontSize: 80, fontWeight: 700, color: "#18181B", letterSpacing: -2, textAlign: "center" }}>
        THE FIRST BET WAS A<br/><span style={{ color: "#EF4444" }}>CRITICAL DISASTER</span>
      </div>

      <div className="device-box" style={{ position: "relative", width: 300, height: 400, background: "#fff", border: "2px solid #18181B", borderRadius: 24, marginTop: 100, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "20px 20px 0 #E4E4E7" }}>
        <div style={{ width: "80%", height: "80%", background: "#F4F4F5", border: "2px solid #18181B", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
           <div className="f-inter" style={{ fontSize: 20, color: "#A1A1AA", fontWeight: 600, letterSpacing: 2 }}>APPLE NEWTON</div>
        </div>

        <div className="stamp f-oswald" style={{ position: "absolute", border: "8px solid #EF4444", color: "#EF4444", fontSize: 60, fontWeight: 900, padding: "10px 30px", transform: "rotate(-15deg)", background: "rgba(255,255,255,0.9)" }}>
          FAILURE
        </div>
      </div>
    </div>
  );
}