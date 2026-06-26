import { useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getStats, type Stats } from "@/lib/api";
import { ARCHETYPE_DATA, type ArchetypeId } from "@/lib/quizData";
import { FriendsOfFigmaHeader } from "@/components/FriendsOfFigmaHeader";
import { PageFooter } from "@/components/PageFooter";
import { ArchetypeIconSm } from "@/components/ArchetypeIcon";

const ARCHETYPES: ArchetypeId[] = ["striker", "vanguard", "overseer"];

// Donut geometry
const INNER_R  = 120;
const OUTER_R  = 139;
const MID_R    = (INNER_R + OUTER_R) / 2; // 129.5
const THICKNESS = OUTER_R - INNER_R;       // 19
const CIRCUMF  = 2 * Math.PI * MID_R;     // ≈ 813.9
const GAP_DEG  = 3;

function polarToCartesian(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeDonutSegment(
  cx: number, cy: number,
  innerR: number, outerR: number,
  startDeg: number, endDeg: number,
) {
  const os = polarToCartesian(cx, cy, outerR, endDeg);
  const oe = polarToCartesian(cx, cy, outerR, startDeg);
  const is = polarToCartesian(cx, cy, innerR, endDeg);
  const ie = polarToCartesian(cx, cy, innerR, startDeg);
  const large = endDeg - startDeg <= 180 ? "0" : "1";
  return [
    "M", os.x, os.y,
    "A", outerR, outerR, 0, large, 0, oe.x, oe.y,
    "L", ie.x, ie.y,
    "A", innerR, innerR, 0, large, 1, is.x, is.y,
    "Z",
  ].join(" ");
}

export default function ArchetypesPage() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    counts: { striker: 0, vanguard: 0, overseer: 0 },
  });
  const [loading, setLoading]   = useState(true);
  const [focused, setFocused]   = useState<ArchetypeId | null>(null);

  const fetchStats = () => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 8000);
    getStats()
      .then((s) => setStats(s))
      .catch((err) => console.error("Stats refresh error:", err))
      .finally(() => {
        clearTimeout(timeout);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 10000); // 10s polling
    return () => clearInterval(interval);
  }, []);

  const total = stats.total;

  const segments = useMemo(() => {
    if (total === 0) return [];

    const rawValues = ARCHETYPES.map(id => stats.counts[id]);
    const totalVal = rawValues.reduce((a, b) => a + b, 0);
    
    // Ensure every category with data is visually visible (min width)
    const MIN_ANGLE = GAP_DEG + 8;
    let angles = rawValues.map(v => (v / totalVal) * 360);
    
    // Adjust small segments
    let adjusted = false;
    const nonZeroCount = angles.filter(a => a > 0).length;
    
    if (nonZeroCount > 0) {
      angles = angles.map(a => {
        if (a > 0 && a < MIN_ANGLE) {
          adjusted = true;
          return MIN_ANGLE;
        }
        return a;
      });

      if (adjusted) {
        const adjustedSum = angles.reduce((a, b) => a + b, 0);
        angles = angles.map(a => (a / adjustedSum) * 360);
      }
    }

    let currentAngle = 0;
    return ARCHETYPES.map((id, index) => {
      const angleDeg   = angles[index];
      if (angleDeg <= 0) return null;

      const startDeg   = currentAngle + GAP_DEG / 2;
      const endDeg     = currentAngle + angleDeg - GAP_DEG / 2;
      currentAngle    += angleDeg;

      const startOffset = (startDeg / 360) * CIRCUMF;
      const segLength   = Math.max(0, ((endDeg - startDeg) / 360) * CIRCUMF);

      return { id, startDeg, endDeg, startOffset, segLength, index };
    }).filter((s): s is NonNullable<typeof s> => s !== null);
  }, [stats, total]);

  const pct = (id: ArchetypeId) =>
    total > 0 ? Math.round((stats.counts[id] / total) * 100) : 0;

  const handleFocus = (id: ArchetypeId) =>
    setFocused(focused === id ? null : id);

  return (
    <div
      className="min-h-screen bg-white flex flex-col max-w-[390px] mx-auto overflow-x-hidden relative"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <FriendsOfFigmaHeader />

      <div className="flex-1 flex flex-col gap-7 px-[16px] pt-[8px] pb-[24px]">
        <h1 className="text-[32px] font-bold text-[#1e1e1e] tracking-[-0.64px] leading-[1.05] text-center">
          Designer Playstyle
        </h1>

        {/* Donut chart */}
        <div className="relative flex items-center justify-center h-[280px] shrink-0">
          <svg
            width="280" height="280" viewBox="0 0 280 280"
            fill="none" className="cursor-pointer"
            onClick={() => setFocused(null)}
          >
            <defs>
              {/* ── Inner shadow + glow filters ── */}
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"
                id="filterBlue" x="-20" y="-20" width="320" height="320">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset /><feGaussianBlur stdDeviation="5.73913" />
                <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0.32 0" />
                <feBlend in2="shape" mode="normal" result="effect1" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="-7.17391" /><feGaussianBlur stdDeviation="5.73913" />
                <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.439327 0 0 0 0 0.427885 0 0 0 0 1 0 0 0 1 0" />
                <feBlend in2="effect1" mode="normal" result="effect2" />
              </filter>

              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"
                id="filterRed" x="-20" y="-20" width="320" height="320">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset /><feGaussianBlur stdDeviation="5.73913" />
                <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0.32 0" />
                <feBlend in2="shape" mode="normal" result="effect1" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="-7.17391" /><feGaussianBlur stdDeviation="5.73913" />
                <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.600962 0 0 0 0 0.201923 0 0 0 0.32 0" />
                <feBlend in2="effect1" mode="normal" result="effect2" />
              </filter>

              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"
                id="filterOrange" x="-20" y="-20" width="320" height="320">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset /><feGaussianBlur stdDeviation="5.73913" />
                <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0.32 0" />
                <feBlend in2="shape" mode="normal" result="effect1" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="-7.17391" /><feGaussianBlur stdDeviation="5.73913" />
                <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.747276 0 0 0 0 0.201923 0 0 0 0.32 0" />
                <feBlend in2="effect1" mode="normal" result="effect2" />
              </filter>

              {/* ── Radial gradients (matched to Figma) ── */}
              <radialGradient id="paintBlue" cx="140" cy="140" r="139" gradientUnits="userSpaceOnUse">
                <stop offset="0.388156" stopColor="#6663FE" />
                <stop offset="1" stopColor="#3F3CDF" />
              </radialGradient>
              <radialGradient id="paintRed" cx="140" cy="140" r="139" gradientUnits="userSpaceOnUse">
                <stop offset="0.388156" stopColor="#DE201A" />
                <stop offset="1" stopColor="#FE4423" />
              </radialGradient>
              <radialGradient id="paintOrange" cx="140" cy="140" r="139" gradientUnits="userSpaceOnUse">
                <stop offset="0.79841" stopColor="#FFC420" />
                <stop offset="1" stopColor="#FF8E4E" />
              </radialGradient>

              {/* ── Sweep masks — one animated circle per segment ── */}
              {segments.map((seg) => {
                const targetDash = !loading ? seg.segLength : 0;
                return (
                  <mask key={`mask-${seg.id}`} id={`mask-${seg.id}`}>
                    <circle
                      cx="140" cy="140" r={MID_R}
                      fill="none" stroke="white"
                      strokeWidth={THICKNESS + 4}
                      strokeDasharray={`${targetDash} ${CIRCUMF}`}
                      strokeDashoffset={-seg.startOffset}
                      transform="rotate(-90 140 140)"
                      style={{
                        transition: `stroke-dasharray 500ms ease-out ${seg.index * 80}ms`,
                      }}
                    />
                  </mask>
                );
              })}
            </defs>

            {/* Grey background ring */}
            <circle
              cx="140" cy="140" r={MID_R}
              fill="none" stroke="rgba(30,30,30,0.08)"
              strokeWidth={THICKNESS}
            />

            {/* Gradient-filled segments revealed by their sweep mask */}
            {segments.map((seg) => {
              const isFocused      = focused === seg.id;
              const isOtherFocused = focused !== null && focused !== seg.id;
              const innerR         = isFocused ? 104 : INNER_R;
              const filterId       = seg.id === "overseer" ? "filterBlue"
                                   : seg.id === "striker"  ? "filterRed"
                                   : "filterOrange";
              const fillId         = seg.id === "overseer" ? "paintBlue"
                                   : seg.id === "striker"  ? "paintRed"
                                   : "paintOrange";

              return (
                <path
                  key={seg.id}
                  d={describeDonutSegment(140, 140, innerR, OUTER_R, seg.startDeg + 2, seg.endDeg - 2)}
                  fill={`url(#${fillId})`}
                  filter={`url(#${filterId})`}
                  mask={`url(#mask-${seg.id})`}
                  onClick={(e) => { e.stopPropagation(); handleFocus(seg.id); }}
                  style={{
                    cursor: "pointer",
                    opacity: isOtherFocused ? 0.28 : 1,
                    transition: "opacity 150ms ease, d 150ms ease",
                  }}
                />
              );
            })}
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                    transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.2 }
                  }}
                  className="flex flex-col items-center justify-center"
                >
                  <span className="text-[64px] font-bold text-[#1e1e1e] leading-[1.05] tracking-[-1.28px]">
                    ...
                  </span>
                  <span className="text-[20px] font-medium text-[rgba(30,30,30,0.5)] tracking-[-0.4px] leading-[1.05]">
                    Loading
                  </span>
                </motion.div>
              ) : total > 0 ? (
                <motion.div
                  key={focused || "total"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center"
                >
                  <span className="text-[64px] font-bold text-[#1e1e1e] leading-[1.05] tracking-[-1.28px]">
                    {focused ? stats.counts[focused] : total}
                  </span>
                  <span className="text-[20px] font-medium text-[rgba(30,30,30,0.5)] tracking-[-0.4px] leading-[1.05]">
                    {focused ? ARCHETYPE_DATA[focused].name : "Partisipan"}
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-[64px] font-bold text-[rgba(30,30,30,0.3)] leading-[1.05] tracking-[-1.28px]">
                    —
                  </span>
                  <button
                    onClick={fetchStats}
                    className="pointer-events-auto text-[13px] font-medium text-[rgba(30,30,30,0.6)] hover:text-[#1e1e1e] tracking-[-0.26px] underline underline-offset-2 cursor-pointer"
                  >
                    Refresh
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white border-[1px] border-solid border-[#1e1e1e] rounded-[6px] px-3">
          {ARCHETYPES.map((id, i) => (
            <div key={id}>
              <div
                onClick={() => handleFocus(id)}
                className={`flex items-center gap-4 py-2 cursor-pointer transition-colors duration-150 ${
                  focused === id ? "bg-[#1e1e1e]/[0.04]" : "hover:bg-[#1e1e1e]/[0.02]"
                }`}
              >
                <ArchetypeIconSm type={id} size={32} />
                <span className="flex-1 text-[16px] font-normal text-[#1e1e1e] tracking-[-0.32px] leading-[1.05]">
                  {ARCHETYPE_DATA[id].name}
                </span>
                <span className="text-[16px] font-bold text-[#1e1e1e] tracking-[-0.32px] leading-[1.05] whitespace-nowrap">
                  {total > 0 ? `${pct(id)}%` : "0%"}
                </span>
              </div>
              {i < ARCHETYPES.length - 1 && (
                <div className="h-[1px] bg-[#1e1e1e]/[0.12] w-full" />
              )}
            </div>
          ))}
        </div>
      </div>

      <PageFooter />
    </div>
  );
}
