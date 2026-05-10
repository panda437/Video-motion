"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene6_TurkeyBarn() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelector(".saxby-frame"), { opacity: 0, x: -40 });
    gsap.set(el.querySelectorAll(".engineer-node"), { opacity: 0, scale: 0 });
    gsap.set(el.querySelectorAll(".badge"), { opacity: 0, y: 10 });
    gsap.set(el.querySelector(".barn-title"), { opacity: 0, y: 20 });

    const tl = gsap.timeline({ delay: 0.3 });
    
    // 3:57.12 - 12 Engineers
    tl.to(el.querySelector(".barn-title"), { opacity: 1, y: 0, duration: 0.8 }, 0)
      .to(el.querySelectorAll(".engineer-node"), { opacity: 1, scale: 1, stagger: 0.05, duration: 0.5 }, 0.5);

    // 4:01.44 - Robin Saxby
    tl.to(el.querySelector(".saxby-frame"), { opacity: 1, x: 0, duration: 1, ease: "power3.out" }, 4.3)
      .to(el.querySelectorAll(".badge")[0], { opacity: 1, y: 0, duration: 0.4 }, 9.8)
      .to(el.querySelectorAll(".badge")[1], { opacity: 1, y: 0, duration: 0.4 }, 11.0)
      .to(el.querySelectorAll(".badge")[2], { opacity: 1, y: 0, duration: 0.4 }, 12.5);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#FAFAFA", padding: "0 100px", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      
      <div style={{ flex: 1 }}>
        <div className="saxby-frame" style={{ position: "relative", width: 400, height: 500, borderRadius: 12, overflow: "hidden", border: "1px solid #E4E4E7", boxShadow: "0 30px 60px rgba(0,0,0,0.1)" }}>
          <img src="/saxby.jpg" alt="Robin Saxby" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", padding: "30px" }}>
            <div className="f-oswald" style={{ color: "#fff", fontSize: 32, fontWeight: 700 }}>ROBIN SAXBY</div>
            <div className="f-inter" style={{ color: "#2563EB", fontSize: 14, fontWeight: 900, letterSpacing: 3, marginTop: 4 }}>CEO · THE ARCHITECT</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, paddingLeft: 80 }}>
        <div className="barn-title f-inter" style={{ fontSize: 20, color: "#71717A", letterSpacing: 4, marginBottom: 20, fontWeight: 700 }}>THE CONVERTED TURKEY BARN</div>
        <div className="f-oswald" style={{ fontSize: 64, color: "#18181B", fontWeight: 800, lineHeight: 1, marginBottom: 40 }}>12 ENGINEERS.<br/><span style={{ color: "#2563EB" }}>ONE VISION.</span></div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16, marginBottom: 40 }}>
           {[...Array(12)].map((_, i) => (
             <div key={i} className="engineer-node" style={{ width: 40, height: 40, background: "#2563EB", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: "bold" }}>{i+1}</div>
           ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
           {["OUTSIDER", "SALESMAN", "INDUSTRY VETERAN"].map((t, i) => (
             <div key={i} className="badge f-inter" style={{ background: "#18181B", color: "#fff", padding: "10px 20px", borderRadius: 4, fontSize: 12, fontWeight: 800, letterSpacing: 1 }}>{t}</div>
           ))}
        </div>
      </div>

    </div>
  );
}
