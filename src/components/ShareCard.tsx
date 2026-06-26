import type { ArchetypeId } from "@/lib/quizData";
import StatBar from "@/components/StatBar";

// Assets
import imgFofjakartalogo from "@/assets/fof-jakarta-logo.png";
import imgGlyph211       from "@/assets/share-card-glyph.png";
import imgOverseer       from "@/assets/archetype-overseer.png";
import imgStriker        from "@/assets/archetype-striker.png";
import imgVanguard       from "@/assets/archetype-vanguard.png";
import imgGizalab        from "@/assets/gizalab-logo.png";

const ARCHETYPE_IMG: Record<ArchetypeId, string> = {
  striker:  imgStriker,
  vanguard: imgVanguard,
  overseer: imgOverseer,
};

// Figma frame: 390 × 693 (9:16)
const W = 390;
const H = 693;

interface ShareCardProps {
  archetype:     ArchetypeId;
  archetypeName: string;
  description:   string;
  nextMove:      string;
  striker:       number;
  vanguard:      number;
  overseer:      number;
}

export default function ShareCard({
  archetype,
  archetypeName,
  description,
  nextMove,
  striker,
  vanguard,
  overseer,
}: ShareCardProps) {
  return (
    // Root — matches Figma: bg-white relative, fixed 390×693
    <div
      style={{
        width: W,
        height: H,
        backgroundColor: "#ffffff",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* ── Footer — matches Figma exactly: absolute bottom-0, h-140, flex-col gap-16, items-center, overflow-clip ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: W,
          height: 140,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          overflow: "hidden",
          boxSizing: "border-box",
          paddingTop: 0,
        }}
      >
        {/* Date + location (Frame7) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            textAlign: "center",
            width: "100%",
            flexShrink: 0,
            position: "relative",
            zIndex: 1,
          }}
        >
          <p style={{ margin: 0, fontSize: 12, fontWeight: 500, color: "#1e1e1e", letterSpacing: "-0.24px", lineHeight: "1.05" }}>
            June 27, 2026
          </p>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 500, color: "#1e1e1e", letterSpacing: "-0.24px", lineHeight: "1.05" }}>
            at CONFIG Watch Party, Jakarta
          </p>
        </div>

        {/* Made by Gizalab (Frame6) */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0, position: "relative", zIndex: 1 }}>
          <span style={{ fontSize: 12, fontWeight: 400, color: "#1e1e1e", letterSpacing: "-0.12px", lineHeight: "1.15", whiteSpace: "nowrap" }}>
            Made by
          </span>
          <img src={imgGizalab} alt="Gizalab" style={{ width: 77, height: 20, display: "block" }} />
        </div>

        {/* Glyph — absolute bottom-0, aspect-ratio matches Figma 1080/233 */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            aspectRatio: "1080 / 233",
          }}
        >
          <img
            alt=""
            src={imgGlyph211}
            style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }}
          />
        </div>
      </div>

      {/* ── Main content (absolute, centered, top-90, w-318) ── */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: "50%",
          transform: "translateX(-50%)",
          width: 318,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Archetype icon + label/title */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>
          {/* Icon: 132×132 with circle background */}
          <div style={{ position: "relative", width: 132, height: 132, flexShrink: 0 }}>
            {/* Purple circle bg */}
            <div style={{ position: "absolute", left: 6, top: 6, width: 120, height: 120 }}>
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="60" fill="none" />
                <defs>
                  <radialGradient id="archetypeBg" cx="0" cy="0" gradientTransform="translate(60 60) rotate(90) scale(60)" gradientUnits="userSpaceOnUse" r="1">
                    <stop offset="0.388156" stopColor="#6663FE" />
                    <stop offset="1" stopColor="#3F3CDF" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
            {/* Archetype image */}
            <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
              <img
                alt={archetypeName}
                src={ARCHETYPE_IMG[archetype]}
                style={{ position: "absolute", left: "-2.27%", top: "-2.27%", width: "104.55%", height: "104.55%", objectFit: "contain" }}
              />
            </div>
          </div>

          {/* "Saya adalah" + archetype name */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: "#1e1e1e", letterSpacing: "-0.42px", lineHeight: "1.3" }}>
              Saya adalah
            </p>
            <p style={{ margin: 0, fontSize: 32, fontWeight: 700, color: "#1e1e1e", letterSpacing: "-0.64px", lineHeight: "1.05", textAlign: "center" }}>
              {archetypeName}
            </p>
          </div>
        </div>

        {/* Stat bars row — 80% scale, justify-between, px-32 */}
        <div style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: 32, paddingRight: 32, width: "100%", boxSizing: "border-box" }}>
            {(["Technic", "Empathic", "Strategic"] as const).map((label, i) => {
              const val = [striker, vanguard, overseer][i];
              const prop = label as "Technic" | "Empathic" | "Strategic";
              return (
                <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 9.143, width: 60.952 }}>
                  <div style={{ transform: "scale(0.78)", transformOrigin: "center center", width: 60.952, height: 60.952, flexShrink: 0 }}>
                    <StatBar property1={prop} value={String(val) as any} />
                  </div>
                  <p style={{ margin: 4, fontSize: 9.905, fontWeight: 600, fontStyle: "italic", color: "rgba(30,30,30,0.64)", letterSpacing: "-0.2971px", lineHeight: 1.1, textAlign: "center" }}>
                    {label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Description + Next Move card */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start", width: "100%" }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: "#1e1e1e", letterSpacing: "-0.42px", lineHeight: "1.3", textAlign: "center", width: "100%" }}>
            {description}
          </p>
          {/* Next Move card */}
          <div style={{ position: "relative", backgroundColor: "#ffffff", borderRadius: 6, width: "100%", boxSizing: "border-box" }}>
            <div style={{ position: "absolute", inset: 0, border: "1px solid #1e1e1e", borderRadius: 6, pointerEvents: "none" }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 8, gap: 4, boxSizing: "border-box" }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#1e1e1e", letterSpacing: "-0.42px", lineHeight: "1.3", textAlign: "center", width: "100%" }}>
                Next Move:
              </p>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: "#1e1e1e", letterSpacing: "-0.42px", lineHeight: "1.3", textAlign: "center", width: "100%" }}>
                {nextMove}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Header logo (absolute, top-47, centered) ── */}
      <div
        style={{
          position: "absolute",
          top: 47,
          left: 16,
          right: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ height: 24, width: 182, position: "relative", flexShrink: 0 }}>
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
            <img alt="" src={imgFofjakartalogo} style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
