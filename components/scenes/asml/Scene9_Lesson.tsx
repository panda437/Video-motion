"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Scene9_Lesson() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    // All beats start invisible
    const beats = el.querySelectorAll(".beat");
    gsap.set(beats, { opacity: 0 });
    gsap.set(el.querySelector(".b2-text"), { filter: "blur(12px)", y: 20 });
    gsap.set(el.querySelector(".b3-text"), { filter: "blur(8px)", y: 16 });
    gsap.set(el.querySelectorAll(".b4-line"), { opacity: 0, x: -24 });
    gsap.set(el.querySelector(".b5-bar"), { scaleX: 0, transformOrigin: "left center" });
    gsap.set(el.querySelector(".b5-text"), { opacity: 0, y: 20 });
    gsap.set(el.querySelector(".b6-credit"), { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.4 });

    // BEAT 1 (0-5s): "30 YEARS · $9 BILLION · 1 COMPANY"
    tl.to(el.querySelector(".beat1"), { opacity: 1, duration: 1.0, ease: "power2.out" }, 0)
      .to(el.querySelector(".beat1"), { opacity: 0, duration: 0.8 }, 4.0);

    // BEAT 4 (5-14s): Three conditions — mentioned first in audio
    tl.to(el.querySelector(".beat4"), { opacity: 1, duration: 0.4 }, 5.2)
      .to(el.querySelectorAll(".b4-line"), { opacity: 1, x: 0, duration: 0.6, ease: "power3.out", stagger: 1.8 }, 5.5)
      .to(el.querySelector(".beat4"), { opacity: 0, duration: 0.8 }, 13.5);

    // BEAT 3 (14-27s): "None of that is normal" — conditions are rare
    tl.to(el.querySelector(".beat3"), { opacity: 1, duration: 0.3 }, 14.2)
      .to(el.querySelector(".b3-text"), { filter: "blur(0px)", y: 0, duration: 1.0, ease: "power3.out" }, 14.2)
      .to(el.querySelector(".beat3"), { opacity: 0, duration: 0.8 }, 27.5);

    // BEAT 2 (28-36s): "The deepest lesson — not just long bets"
    tl.to(el.querySelector(".beat2"), { opacity: 1, duration: 0.3 }, 28.2)
      .to(el.querySelector(".b2-text"), { filter: "blur(0px)", y: 0, duration: 1.0, ease: "power3.out" }, 28.2)
      .to(el.querySelector(".beat2"), { opacity: 0, duration: 0.8 }, 35.5);

    // BEAT 5 (36-44s): Gold bar + "couldn't be built today"
    tl.to(el.querySelector(".beat5"), { opacity: 1, duration: 0.4 }, 36.2)
      .to(el.querySelector(".b5-bar"), { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, 36.5)
      .to(el.querySelector(".b5-text"), { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }, 37.5)
      .to(el.querySelector(".beat5"), { opacity: 0, duration: 0.8 }, 43.5);

    // BEAT 6 (44-50s): Episode credit
    tl.to(el.querySelector(".beat6"), { opacity: 1, duration: 1.2, ease: "power2.out" }, 44.2);

    return () => { tl.kill(); };
  }, []);

  const beatStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 120px",
  };

  return (
    <div ref={ref} className="scene" style={{
      background: "#030509",
      position: "relative",
      overflow: "hidden",
      height: "100%",
    }}>
      {/* Grid background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(0,200,245,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,245,0.04) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        pointerEvents: "none",
      }} />

      {/* BEAT 1: The setup stat */}
      <div className="beat beat1" style={beatStyle}>
        <div className="f-inter" style={{
          fontSize: 28, color: "rgba(255,255,255,0.4)", letterSpacing: 6,
          textTransform: "uppercase", textAlign: "center",
        }}>
          30 years · $9 billion · 1 company
        </div>
      </div>

      {/* BEAT 2: The first thesis */}
      <div className="beat beat2" style={beatStyle}>
        <div className="b2-text f-oswald c-white" style={{
          fontSize: 62, fontWeight: 700, lineHeight: 1.1,
          letterSpacing: -1.5, textAlign: "center",
        }}>
          The lesson isn&apos;t just that<br />
          <span style={{ color: "#00C8F5" }}>long bets</span> sometimes pay off.
        </div>
      </div>

      {/* BEAT 3: The harder truth */}
      <div className="beat beat3" style={beatStyle}>
        <div className="b3-text f-oswald" style={{
          fontSize: 52, fontWeight: 600, color: "#00C8F5",
          lineHeight: 1.2, textAlign: "center",
        }}>
          It&apos;s that the conditions<br />
          under which a long bet<br />
          <span style={{ color: "rgba(255,255,255,0.9)" }}>can even be made</span><br />
          are increasingly rare.
        </div>
      </div>

      {/* BEAT 4: The three conditions */}
      <div className="beat beat4" style={{ ...beatStyle, alignItems: "flex-start", padding: "0 180px" }}>
        {[
          "Philips kept funding through near-bankruptcy.",
          "Customers became the investors.",
          "The Dutch government waited decades.",
        ].map((line, i) => (
          <div key={i} className="b4-line" style={{
            display: "flex", alignItems: "center", gap: 20,
            marginBottom: i < 2 ? 28 : 0,
          }}>
            <div style={{ width: 4, height: 40, background: "#00C8F5", flexShrink: 0, borderRadius: 2 }} />
            <div className="f-inter" style={{
              fontSize: 34, color: "rgba(255,255,255,0.85)", lineHeight: 1.4,
            }}>
              {line}
            </div>
          </div>
        ))}
      </div>

      {/* BEAT 5: The final verdict */}
      <div className="beat beat5" style={{ ...beatStyle }}>
        <div className="b5-bar" style={{
          width: 320, height: 3, background: "#F5A623",
          marginBottom: 32, alignSelf: "center",
        }} />
        <div className="b5-text f-oswald c-white" style={{
          fontSize: 54, fontWeight: 700, lineHeight: 1.1,
          letterSpacing: -1.5, textAlign: "center",
        }}>
          The most important tech company<br />
          in the world{" "}
          <span style={{ color: "#F5A623" }}>couldn&apos;t be built today.</span>
        </div>
      </div>

      {/* BEAT 6: Credit */}
      <div className="beat beat6" style={beatStyle}>
        <div className="b6-credit f-inter" style={{
          fontSize: 24, letterSpacing: 4, textTransform: "uppercase",
          color: "rgba(255,255,255,0.2)", textAlign: "center",
        }}>
          Vox Videos · Strategy · Episode 003
        </div>
      </div>
    </div>
  );
}
