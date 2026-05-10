"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene12_TheFoundation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelectorAll(".portrait-card"), { opacity: 0, y: 40 });
    gsap.set(el.querySelector(".hero-quote"), { opacity: 0, scale: 0.9 });
    gsap.set(el.querySelector(".epilogue-box"), { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.5 });
    tl.to(el.querySelector(".hero-quote"), { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }, 0)
      .to(el.querySelectorAll(".portrait-card"), { opacity: 1, y: 0, stagger: 0.3, duration: 0.8, ease: "power2.out" }, 1.0)
      .to(el.querySelector(".epilogue-box"), { opacity: 1, duration: 1.5 }, 4.0);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene" style={{ background: "#FAFAFA", padding: "0 60px", alignItems: "center", justifyContent: "center" }}>
      
      <div className="main-container" style={{ textAlign: "center", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="hero-quote f-oswald" style={{ fontSize: 100, fontWeight: 900, color: "#18181B", letterSpacing: -5, marginBottom: 40, lineHeight: 0.85 }}>
          BE THE<br/><span style={{ color: "#2563EB" }}>FOUNDATION</span>
        </div>

        <div style={{ display: "flex", gap: 20, width: "100%", justifyContent: "center" }}>
          {[
            { name: "SOPHIE WILSON", title: "THE DESIGNER", img: "/wilson.jpg" },
            { name: "STEVE FURBER", title: "THE ENGINEER", img: "/furber.jpg" },
            { name: "ROBIN SAXBY", title: "THE ARCHITECT", img: "/saxby.jpg" }
          ].map((p, i) => (
            <div key={i} className="portrait-card" style={{ flex: 1, maxWidth: 280, background: "#fff", border: "1px solid #E4E4E7", borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.05)" }}>
              <div style={{ height: 280, width: "100%", background: "#F4F4F5" }}>
                 <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "16px" }}>
                <div className="f-oswald" style={{ fontSize: 20, color: "#18181B", fontWeight: 800, textTransform: "uppercase" }}>{p.name}</div>
                <div className="f-inter" style={{ fontSize: 11, color: "#2563EB", fontWeight: 900, letterSpacing: 2, marginTop: 4 }}>{p.title}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="epilogue-box f-inter" style={{ marginTop: 50, fontSize: 18, color: "#71717A", maxWidth: 850, lineHeight: 1.5, fontWeight: 500 }}>
          Twelve people in a converted barn, and one CEO who refused to play the industry's game, ended up underneath almost every device on Earth.
        </div>
      </div>
    </div>
  );
}
