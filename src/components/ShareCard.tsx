import type { ArchetypeId } from "@/lib/quizData";
import StatBar from "@/components/StatBar";

// Assets
import imgStarburst from "@/assets/starburst.svg";
import imgOverseer  from "@/assets/archetype-overseer.png";
import imgStriker   from "@/assets/archetype-striker.png";
import imgVanguard  from "@/assets/archetype-vanguard.png";
import imgGizalab   from "@/assets/gizalab-logo.png";

const ARCHETYPE_IMG: Record<ArchetypeId, string> = {
  striker:  imgStriker,
  vanguard: imgVanguard,
  overseer: imgOverseer,
};

// Figma frame: 390 × 693
const W = 390;
const H = 693;

const RUBIK = "Rubik, sans-serif";

const SKY_GRADIENT =
  "linear-gradient(to bottom, #98d4fe 35.096%, rgba(152,212,254,0) 100%)";

const STATS = [
  { key: "Technic", label: "Technic" },
  { key: "Empathic", label: "Empathic" },
  { key: "Strategic", label: "Strategic" },
] as const;

interface ShareCardProps {
  name:          string;
  archetype:     ArchetypeId;
  archetypeName: string;
  description:   string;
  nextMove:      string;
  striker:       number;
  vanguard:      number;
  overseer:      number;
}

export default function ShareCard({
  name,
  archetype,
  archetypeName,
  description,
  nextMove,
  striker,
  vanguard,
  overseer,
}: ShareCardProps) {
  const values: Record<(typeof STATS)[number]["key"], number> = {
    Technic: striker,
    Empathic: vanguard,
    Strategic: overseer,
  };

  return (
    // Inline styles throughout: html-to-image serialises computed style, so this
    // stays independent of the app's stylesheet during export.
    <div
      style={{
        width: W,
        height: H,
        backgroundColor: "#ffffff",
        position: "relative",
        overflow: "hidden",
        fontFamily: RUBIK,
      }}
    >
      {/* Sky gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 295,
          backgroundImage: SKY_GRADIENT,
        }}
      />

      {/* Starburst */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: -359,
          width: 1020,
          height: 1020,
          transform: "translateX(-50%)",
        }}
      >
        {/* Leaf sits outside the box so the glow's blur bleed is preserved */}
        <div
          style={{
            position: "absolute",
            top: "-0.98%",
            right: "-0.88%",
            bottom: "-0.59%",
            left: "-0.88%",
          }}
        >
          <img src={imgStarburst} alt="" style={{ display: "block", width: "100%", height: "100%" }} />
        </div>
      </div>

      {/* ── Content ── */}
      <div
        style={{
          position: "absolute",
          top: 83,
          left: "50%",
          transform: "translateX(-50%)",
          width: 342,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Archetype badge + title */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, width: "100%" }}>
          {/* The badge art already includes its own backdrop per archetype */}
          <div style={{ position: "relative", width: 132, height: 132, flexShrink: 0 }}>
            <img
              alt={archetypeName}
              src={ARCHETYPE_IMG[archetype]}
              style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", whiteSpace: "nowrap" }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: "#404040", letterSpacing: "-0.42px", lineHeight: 1.3 }}>
              {name ? `${name}’s Designer Playstyle` : "Designer Playstyle"}
            </p>
            <p style={{ margin: 0, fontSize: 32, fontWeight: 700, color: "#383838", letterSpacing: "-0.64px", lineHeight: 1.05, textAlign: "center" }}>
              {archetypeName}
            </p>
          </div>
        </div>

        {/* Gauges — the 80px result-page gauge at 0.9 scale */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 20,
            paddingRight: 20,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {STATS.map(({ key, label }) => (
            <div
              key={key}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: 69.623, flexShrink: 0 }}
            >
              <div style={{ position: "relative", width: 72, height: 72, flexShrink: 0 }}>
                <div
                  style={{
                    position: "absolute",
                    left: -1.8,
                    top: -1.8,
                    width: 84,
                    height: 84,
                    transform: "scale(0.9)",
                    transformOrigin: "top left",
                  }}
                >
                  <StatBar
                    property1={key}
                    value={String(Math.max(0, Math.min(7, values[key]))) as any}
                  />
                </div>
              </div>
              <p
                style={{
                  margin: 0,
                  width: "100%",
                  fontSize: 11.933,
                  fontWeight: 600,
                  fontStyle: "italic",
                  color: "rgba(30,30,30,0.64)",
                  letterSpacing: "-0.358px",
                  lineHeight: 1,
                  textAlign: "center",
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Description */}
        <p
          style={{
            margin: 0,
            width: "100%",
            fontSize: 16,
            fontWeight: 400,
            color: "#383838",
            letterSpacing: "-0.48px",
            lineHeight: 1.3,
            textAlign: "center",
          }}
        >
          {description}
        </p>

        {/* Next Move card */}
        <div
          style={{
            width: "100%",
            backgroundColor: "#ffffff",
            border: "2px solid #e5e5e3",
            borderRadius: 12,
            overflow: "hidden",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              backgroundColor: "#e5e5e3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 8,
              paddingBottom: 8,
              boxSizing: "border-box",
            }}
          >
            <p style={{ margin: 0, flex: "1 0 0", fontSize: 14, fontWeight: 700, color: "#404040", letterSpacing: "-0.42px", lineHeight: 1.3, textAlign: "center" }}>
              Next Move
            </p>
          </div>
          <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: 8, boxSizing: "border-box" }}>
            <p style={{ margin: 0, flex: "1 0 0", fontSize: 16, fontWeight: 400, color: "#383838", letterSpacing: "-0.48px", lineHeight: 1.3, textAlign: "center" }}>
              {nextMove}
            </p>
          </div>
        </div>
      </div>

      {/* ── Credit ── */}
      <div
        style={{
          position: "absolute",
          bottom: 49,
          left: 0,
          right: 0,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 12,
            fontWeight: 500,
            color: "#404040",
            letterSpacing: "-0.24px",
            lineHeight: 1.05,
            whiteSpace: "nowrap",
          }}
        >
          Made by
        </span>
        <img src={imgGizalab} alt="Gizalab" style={{ width: 77, height: 20, display: "block", objectFit: "contain" }} />
      </div>
    </div>
  );
}
