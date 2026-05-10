"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function ARMShort() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const sections = el.querySelectorAll(".s-sec");
    gsap.set(sections, { opacity: 0, y: 50, scale: 0.9 });
    
    const tl = gsap.timeline({ repeat: -1 });

    // 0-5s: The Ghost Hook
    tl.to(sections[0], { opacity: 1, y: 0, scale: 1, duration: 0.4 })
      .to(el.querySelector(".iphone-icon"), { scale: 1.2, duration: 2, yoyo: true, repeat: 1 }, 0)
      .to(sections[0], { opacity: 0, y: -50, duration: 0.3 }, 5);

    // 5-13s: Sophie & 1985
    tl.to(sections[1], { opacity: 1, y: 0, scale: 1, duration: 0.4 }, 5)
      .fromTo(el.querySelector(".sophie-img"), { filter: "grayscale(100%) blur(10px)" }, { filter: "grayscale(0%) blur(0px)", duration: 1 }, 5.5)
      .to(sections[1], { opacity: 0, y: -50, duration: 0.3 }, 13);

    // 13-22s: The Pivot / Blueprints
    tl.to(sections[2], { opacity: 1, y: 0, scale: 1, duration: 0.4 }, 13)
      .to(el.querySelectorAll(".bp-copy"), { opacity: 1, x: (i) => (i % 2 ? 100 : -100), y: (i) => i * 50 - 100, duration: 1, stagger: 0.1 }, 14)
      .to(sections[2], { opacity: 0, y: -50, duration: 0.3 }, 22);

    // 22-32s: The 250 Billion Scale
    const counter = { val: 0 };
    tl.to(sections[3], { opacity: 1, y: 0, scale: 1, duration: 0.4 }, 22)
      .to(counter, { val: 250, duration: 4, onUpdate: () => {
        const c = el.querySelector(".short-count");
        if (c) c.innerText = Math.floor(counter.val).toString();
      }}, 23)
      .to(sections[3], { opacity: 0, y: -50, duration: 0.3 }, 32);

    // 32-40s: Final Moat
    tl.to(sections[4], { opacity: 1, y: 0, scale: 1, duration: 0.4 }, 32)
      .to(el.querySelector(".rail-line"), { scaleX: 1, duration: 1.5, ease: "power2.out" }, 33);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="short-stage">
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(#E4E4E7 1.5px, transparent 1.5px)", backgroundSize: "30px 30px", opacity: 0.5 }} />

      {/* SECTION 1: THE GHOST */}
      <div className="short-scene s-sec">
        <div className="iphone-icon" style={{ fontSize: 180, marginBottom: 40 }}>📱</div>
        <div className="f-oswald" style={{ fontSize: 100, fontWeight: 900, color: "#18181B", lineHeight: 0.9 }}>THE GHOST<br/>EMPIRE</div>
        <div className="f-inter" style={{ fontSize: 24, marginTop: 40, color: "#EF4444", fontWeight: 700, letterSpacing: 4 }}>MANUFACTURES NOTHING</div>
      </div>

      {/* SECTION 2: SOPHIE 1985 */}
      <div className="short-scene s-sec">
        <div className="f-oswald" style={{ fontSize: 120, color: "#2563EB", fontWeight: 900, marginBottom: 20 }}>1985</div>
        <div className="sophie-img" style={{ width: 400, height: 500, borderRadius: 20, overflow: "hidden", border: "8px solid #fff", boxShadow: "0 20px 50px rgba(0,0,0,0.1)" }}>
          <img src="/sophie.webp" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div className="f-inter" style={{ fontSize: 28, marginTop: 40, color: "#18181B", fontWeight: 800 }}>SOPHIE WILSON</div>
        <div className="f-inter" style={{ fontSize: 20, color: "#71717A" }}>DESIGNED ON PAPER</div>
      </div>

      {/* SECTION 3: THE PIVOT */}
      <div className="short-scene s-sec">
        <div className="f-oswald" style={{ fontSize: 80, color: "#18181B", fontWeight: 900, marginBottom: 60 }}>THE CRAZY BET</div>
        <div style={{ position: "relative", width: 200, height: 200 }}>
           <div style={{ background: "#2563EB", width: "100%", height: "100%", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, position: "relative", color: "#fff", fontSize: 12, fontWeight: 900 }}>BLUEPRINT</div>
           {[...Array(6)].map((_, i) => <div key={i} className="bp-copy" style={{ position: "absolute", inset: 0, background: "rgba(37,99,235,0.2)", border: "1px solid #2563EB", borderRadius: 8, opacity: 0 }} />)}
        </div>
        <div className="f-oswald" style={{ fontSize: 110, marginTop: 60, color: "#18181B" }}>LICENSE<br/>ONLY.</div>
      </div>

      {/* SECTION 4: 250 BILLION */}
      <div className="short-scene s-sec">
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
           <span className="short-count f-oswald" style={{ fontSize: 200, fontWeight: 900 }}>0</span>
           <span className="f-oswald" style={{ fontSize: 60, color: "#2563EB" }}>B</span>
        </div>
        <div className="f-inter" style={{ fontSize: 32, fontWeight: 800, color: "#18181B", letterSpacing: 4 }}>CHIPS DISTRIBUTED</div>
        <div style={{ marginTop: 40, display: "flex", gap: 10 }}>
           {["🍎", "🤖", "🎨", "☁️"].map((e, i) => <div key={i} style={{ fontSize: 60 }}>{e}</div>)}
        </div>
      </div>

      {/* SECTION 5: FINAL MOAT */}
      <div className="short-scene s-sec">
        <div className="rail-line" style={{ width: 500, height: 12, background: "#18181B", borderRadius: 6, transform: "scaleX(0)" }} />
        <div className="f-oswald" style={{ fontSize: 120, fontWeight: 900, marginTop: 40, lineHeight: 0.85 }}>BE THE<br/><span style={{ color: "#2563EB" }}>FOUNDATION</span></div>
        <div className="f-inter" style={{ fontSize: 24, marginTop: 60, color: "#71717A", maxWidth: 500 }}>The railroad tracks underneath everyone's trains.</div>
        <div style={{ marginTop: 80, background: "#18181B", color: "#fff", padding: "16px 40px", borderRadius: 50, fontSize: 20, fontWeight: 900 }}>SUBSCRIBE</div>
      </div>

    </div>
  );
}
