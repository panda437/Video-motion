"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

// Scene duration: 22.54s — racing metaphor close plus end-card hold
export default function Scene8_Close() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    gsap.set(el.querySelectorAll(".n8-l1,.n8-l2,.n8-l3,.n8-l4,.n8-l5,.n8-l6"), { opacity: 0, y: 28 });
    gsap.set(el.querySelector(".n8-bar1"), { scaleX: 0, transformOrigin: "left center" });
    gsap.set(el.querySelector(".n8-bar2"), { scaleX: 0, transformOrigin: "center center" });
    gsap.set(el.querySelector(".n8-end"),  { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl
      // Each line times with a narration beat
      .to(el.querySelector(".n8-l1"), { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 0)
      .to(el.querySelector(".n8-l2"), { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 2.1)
      .to(el.querySelector(".n8-bar1"), { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, 4.3)
      .to(el.querySelector(".n8-l3"), { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 4.8)
      .to(el.querySelector(".n8-l4"), { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 9.0)
      .to(el.querySelector(".n8-bar2"), { scaleX: 1, duration: 0.4, ease: "power2.inOut" }, 12.0)
      .to(el.querySelector(".n8-l5"), { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 12.3)
      .to(el.querySelector(".n8-l6"), { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 15.6)
      .to(el.querySelector(".n8-end"),  { opacity: 1, duration: 0.8, ease: "power2.out" }, 16.7);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene bg-black scene-center" style={{ padding: "72px 160px" }}>
      <div className="n8-l1 f-oswald" style={{ fontSize: 28, fontWeight: 400, color: "rgba(255,255,255,0.6)", textAlign: "center", lineHeight: 1.4 }}>
        When everyone is racing in the same direction,
      </div>
      <div className="n8-l2 f-oswald c-white" style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.0, letterSpacing: -2, textAlign: "center", marginTop: 10 }}>
        the smartest move<br />isn&apos;t to run faster.
      </div>
      <div className="n8-bar1" style={{ height: 2, width: 200, background: "#FF3B30", borderRadius: 2, margin: "30px auto" }} />
      <div className="n8-l3 f-inter" style={{ fontSize: 18, color: "rgba(255,255,255,0.55)", textAlign: "center", lineHeight: 1.8, maxWidth: 540 }}>
        It&apos;s to ask why everyone is running that way in the first place.
      </div>
      <div className="n8-l4 f-oswald c-white" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2, textAlign: "center", marginTop: 28 }}>
        Nintendo has been asking that question<br />
        <span style={{ color: "#FF3B30" }}>for forty years.</span>
      </div>
      <div className="n8-bar2" style={{ height: 1, width: 320, background: "rgba(255,255,255,0.1)", borderRadius: 2, margin: "24px auto" }} />
      <div className="n8-l5 f-oswald" style={{ fontSize: 24, fontWeight: 600, color: "rgba(255,255,255,0.7)", textAlign: "center", lineHeight: 1.4 }}>
        Four times in a row, they found a different finish line.
      </div>
      <div className="n8-l6 f-oswald" style={{ fontSize: 24, fontWeight: 700, color: "#FF3B30", textAlign: "center", marginTop: 8 }}>
        And got there alone.
      </div>
      <div className="n8-end f-inter" style={{ marginTop: 44, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.18)", textAlign: "center" }}>
        Vox Videos · Strategy · Episode 002
      </div>
    </div>
  );
}
