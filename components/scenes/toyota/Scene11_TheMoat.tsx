"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene11_TheMoat() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".t11-moat"), { opacity: 0, scale: 0.9, filter: "blur(10px)" });
    gsap.set(el.querySelector(".t11-culture"), { opacity: 0, y: 30 });
    gsap.set(el.querySelector(".t11-epilogue"), { opacity: 0 });
    gsap.set(el.querySelector(".t11-tesla"), { opacity: 0, x: 20 });

    const tl = gsap.timeline({ delay: 0.5 });
    tl
      .to(el.querySelector(".t11-moat"), { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }, 2.32)
      .to(el.querySelector(".t11-culture"), { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 3.32)
      .to(el.querySelector(".t11-epilogue"), { opacity: 1, duration: 1.0 }, 7.6)
      .to(el.querySelector(".t11-tesla"), { opacity: 0.3, x: 0, duration: 1.5 }, 17.6)
      .to(el.querySelector(".t11-moat"), { scale: 1.1, duration: 2, ease: "power2.inOut" }, 21.36);

    // Lens Breath
    gsap.to(el.querySelector(".t11-container"), { scale: 1.05, duration: 20, repeat: -1, yoyo: true, ease: "sine.inOut" });

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#030403", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      
      <div className="t11-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 100px" }}>
        <div className="t11-moat f-oswald c-white" style={{ fontSize: 130, fontWeight: 900, lineHeight: 0.9, letterSpacing: -5, marginBottom: 20 }}>
          THE MOAT IS<br/>NOT THE SYSTEM
        </div>
        
        <div className="t11-culture f-oswald" style={{ fontSize: 72, fontWeight: 700, color: "#2D5A27", letterSpacing: -2 }}>
          THE MOAT IS THE CULTURE
        </div>

        <div className="t11-epilogue f-inter" style={{ marginTop: 60, fontSize: 24, color: "rgba(255,255,255,0.4)", maxWidth: 800, lineHeight: 1.6 }}>
          You can hand a competitor every page of your playbook. If they can’t change how their people behave, they will never figure out why you win.
        </div>
      </div>

      <div className="t11-tesla" style={{ position: "absolute", bottom: 60, right: 80, display: "flex", alignItems: "center", gap: 20 }}>
        <div className="f-inter" style={{ fontSize: 18, color: "rgba(255,255,255,0.3)", letterSpacing: 4 }}>NUMMI 2010</div>
        <div style={{ width: 40, height: 2, background: "rgba(255,255,255,0.2)" }} />
        <div className="f-inter" style={{ fontSize: 24, color: "#fff", letterSpacing: 8 }}>TESLA</div>
      </div>
    </div>
  );
}
