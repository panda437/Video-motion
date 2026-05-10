"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene8_Close() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el.querySelectorAll(".s8-l1, .s8-l2, .s8-l3, .s8-l4, .s8-l5"), { opacity: 0, y: 30 });
    gsap.set(el.querySelector(".s8-bar"), { scaleX: 0, transformOrigin: "left center" });
    gsap.set(el.querySelector(".s8-hotdog"), { opacity: 0, scale: 0.85 });
    gsap.set(el.querySelector(".s8-final"), { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.8 });
    tl
      .to(el.querySelector(".s8-l1"), { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(el.querySelector(".s8-l2"), { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 1.4)
      .to(el.querySelector(".s8-bar"), { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, 2.8)
      .to(el.querySelector(".s8-l3"), { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 3.6)
      .to(el.querySelector(".s8-hotdog"), { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.3)" }, 4.8)
      .to(el.querySelector(".s8-l4"), { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 7.0)
      .to(el.querySelector(".s8-l5"), { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 8.4)
      .to(el.querySelector(".s8-final"), { opacity: 1, duration: 1.2, ease: "power2.out" }, 11.0);

    return () => { tl.kill(); };
  }, []);

  return (
    <div ref={ref} className="scene bg-black scene-center" style={{
      padding: "72px 180px", alignItems: "center",
    }}>

      <div className="s8-l1 f-oswald c-white" style={{
        fontSize: 36, fontWeight: 400, lineHeight: 1.4, textAlign: "center",
        color: "rgba(255,255,255,0.7)",
      }}>
        Costco&apos;s real product was never the merchandise.
      </div>

      <div className="s8-l2 f-oswald c-white" style={{
        fontSize: 72, fontWeight: 700, lineHeight: 1.0, letterSpacing: -2,
        textAlign: "center", marginTop: 16,
      }}>
        It was trust.
      </div>

      <div className="s8-bar" style={{
        height: 2, width: 240, background: "#E31837",
        borderRadius: 2, margin: "32px auto",
      }} />

      <div className="s8-l3 f-inter" style={{
        fontSize: 17, color: "rgba(255,255,255,0.5)", textAlign: "center",
        lineHeight: 1.8, maxWidth: 560,
      }}>
        The customer&apos;s belief that nobody inside that warehouse is trying<br />
        to extract maximum margin from them.
        <br /><em>That trust is the moat.</em>
      </div>

      {/* Hot dog price */}
      <div className="s8-hotdog" style={{
        marginTop: 36,
        display: "flex", alignItems: "baseline", gap: 12,
      }}>
        <span className="f-oswald" style={{ fontSize: 22, color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>
          Hot dog + soda:
        </span>
        <span className="f-oswald" style={{ fontSize: 42, fontWeight: 700, color: "#F59E0B", letterSpacing: -1 }}>
          $1.50
        </span>
        <span className="f-inter" style={{ fontSize: 15, color: "rgba(255,255,255,0.3)" }}>
          since 1985.
        </span>
      </div>

      <div className="s8-l4 f-oswald" style={{
        marginTop: 48, fontSize: 28, fontWeight: 700, textAlign: "center",
        color: "rgba(255,255,255,0.85)", lineHeight: 1.3,
      }}>
        Refusing to make money on the front-end<br />
        was the most profitable decision in retail history.
      </div>

      <div className="s8-l5 f-oswald" style={{
        marginTop: 16, fontSize: 24, fontWeight: 700, textAlign: "center",
        color: "#E31837",
      }}>
        The dumbest-looking strategy was the smartest one in the room.
      </div>

      {/* End card */}
      <div className="s8-final f-inter" style={{
        marginTop: 40, fontSize: 12, letterSpacing: 2, textTransform: "uppercase",
        color: "rgba(255,255,255,0.2)", textAlign: "center",
      }}>
        Vox Videos · Business · Episode 001
      </div>
    </div>
  );
}
