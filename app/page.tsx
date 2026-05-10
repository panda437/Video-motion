import Link from "next/link";

export default function HomePage() {
  return (
    <div className="index-page">
      <div style={{ textAlign: "center" }}>
        <div className="index-title">VOX VIDEOS</div>
        <div className="index-subtitle" style={{ marginTop: 8 }}>Motion-graphic video engine</div>
      </div>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/videos/costco" className="video-card">
          <div className="video-card-tag">Business · Episode 001</div>
          <div className="video-card-title">Why Costco Refuses To Make Money</div>
          <div className="video-card-meta">8 scenes · ~2 minutes · 1280×720</div>
        </Link>

        <Link href="/videos/nintendo" className="video-card">
          <div className="video-card-tag">Strategy · Episode 002</div>
          <div className="video-card-title">Why Nintendo Refuses To Compete</div>
          <div className="video-card-meta">8 scenes · ~2 minutes · 1280×720</div>
        </Link>
      </div>

      <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "rgba(255,255,255,0.25)", textAlign: "center", maxWidth: 480 }}>
        Open any video · resize browser to 1280×720 · screen-record · press ▶ play.<br />
        Both videos run on the same server — no audio needed yet.
      </div>
    </div>
  );
}
