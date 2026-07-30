import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { toJpeg } from "html-to-image";
import { ARCHETYPE_DATA, type ArchetypeId } from "@/lib/quizData";
import { getResult } from "@/lib/api";
import { rememberResultId } from "@/lib/session";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { StatRow } from "@/components/StatRow";
import { ArchetypeIcon } from "@/components/ArchetypeIcon";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { TertiaryButton } from "@/components/TertiaryButton";
import { DownloadOverlay } from "@/components/DownloadOverlay";
import ShareCard from "@/components/ShareCard";

import imgStarburst from "@/assets/starburst.svg";
import imgGizalab from "@/assets/gizalab-logo.png";

const RUBIK = "Rubik, sans-serif";

const SKY_GRADIENT =
  "linear-gradient(to bottom, #98d4fe 35.096%, rgba(152,212,254,0) 100%)";

// Shared easing with the rest of the app's motion language.
const EASE = [0.22, 1, 0.36, 1] as const;
const MOVE = { duration: 0.6, ease: EASE } as const;
const POP = { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } as const;

// How long the centered intro holds before the hero travels to its result position.
const INTRO_HOLD_MS = 1500;

// Seconds per full revolution of the background starburst. Slow enough to read as
// ambient light rather than a spinner.
const STAR_SPIN_SECONDS = 90;

export default function ResultPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const id = params.get("id") ?? "";

  const stored = id ? sessionStorage.getItem(`result_${id}`) : null;
  const localResult = stored ? JSON.parse(stored) : null;

  const [result, setResult] = useState<{
    archetype: string;
    name: string;
    points: number;
    technic: number;
    empathic: number;
    strategic: number;
  } | null>(localResult);
  const [fetching, setFetching] = useState(!localResult && !!id);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (localResult || !id) return;
    setFetching(true);
    getResult(id)
      .then((remote) => {
        if (!remote) { setNotFound(true); return; }
        setResult({
          archetype: remote.archetype,
          name: remote.name,
          points: remote.points,
          technic: remote.technic ?? 0,
          empathic: remote.empathic ?? 0,
          strategic: remote.strategic ?? 0,
        });
      })
      .catch((err) => {
        console.error("Failed to fetch result from server:", err);
        setNotFound(true);
      })
      .finally(() => setFetching(false));
  }, [id]);

  const raw = result?.archetype ?? "striker";
  const archetype: ArchetypeId = ["striker", "vanguard", "overseer"].includes(raw)
    ? (raw as ArchetypeId)
    : "striker";

  const strikerCount  = Number(result?.technic  ?? 0);
  const vanguardCount = Number(result?.empathic ?? 0);
  const overseerCount = Number(result?.strategic ?? 0);
  const hasTraitData  = strikerCount + vanguardCount + overseerCount > 0;

  const data = ARCHETYPE_DATA[archetype];

  // true = centered intro screen, false = settled result layout
  const [intro, setIntro] = useState(true);
  const reduceMotion = useReducedMotion();
  const [generating, setGenerating] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  // Hold the intro only once the archetype is actually known, so the hero that
  // scales in is the correct one.
  useEffect(() => {
    if (!result) return;
    const t = setTimeout(() => setIntro(false), INTRO_HOLD_MS);
    return () => clearTimeout(t);
  }, [result]);

  // Remember this result so /archetypes can navigate back to it — covers both a
  // freshly finished quiz and a shared result link opened directly.
  useEffect(() => {
    if (result && id) rememberResultId(id);
  }, [result, id]);

  const handleShare = async () => {
    if (generating) return;
    setGenerating(true);

    try {
      const node = shareCardRef.current;
      if (!node) throw new Error("Share card not mounted");

      const opts = {
        quality: 1.0,
        pixelRatio: 4, // Increased for high-resolution mobile exports
        backgroundColor: "#ffffff",
        cacheBust: true,
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
        },
      };

      // Ensure all images and fonts are loaded by doing a warm-up pass
      await toJpeg(node, { ...opts, quality: 0.1 });
      await new Promise(resolve => setTimeout(resolve, 150)); // Tiny delay for filter rendering

      const dataUrl = await toJpeg(node, opts);
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `archetype-${archetype}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("Failed to generate share image:", err);
      alert("Gagal membuat gambar. Coba lagi.");
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyUrl = async () => {
    const url = window.location.href;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Clipboard API needs a secure context; fall back for plain http.
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy result URL:", err);
      alert("Gagal menyalin URL. Coba lagi.");
    }
  };

  // Reset the copied confirmation so the button can be used again.
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const handleSeeAll = () => navigate("/archetypes");

  const credit = (
    <footer className="mt-auto h-[72px] flex items-center justify-center gap-[4px] shrink-0 relative">
      <span
        className="text-[12px] font-medium text-[#404040] tracking-[-0.24px] leading-[1.05] text-center"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Made by
      </span>
      <div className="w-[77px] h-[20px] relative">
        <ImageWithFallback src={imgGizalab} alt="Gizalab" className="w-full h-full object-contain" />
      </div>
    </footer>
  );

  if (fetching) {
    return (
      <div className="relative min-h-screen bg-white overflow-hidden">
        <div aria-hidden className="absolute top-0 left-0 right-0 h-[560px] pointer-events-none" style={{ backgroundImage: SKY_GRADIENT }} />
        <div className="relative flex flex-col min-h-screen max-w-[390px] mx-auto">
          <div className="flex-1 flex items-center justify-center">
            <span className="text-[20px] font-medium text-[#727272] tracking-[-0.4px]" style={{ fontFamily: RUBIK }}>
              Memuat…
            </span>
          </div>
          {credit}
        </div>
      </div>
    );
  }

  if (notFound || !result) {
    return (
      <div className="relative min-h-screen bg-white overflow-hidden">
        <div aria-hidden className="absolute top-0 left-0 right-0 h-[560px] pointer-events-none" style={{ backgroundImage: SKY_GRADIENT }} />
        <div className="relative flex flex-col min-h-screen max-w-[390px] mx-auto">
          <div className="flex-1 flex flex-col items-center justify-center gap-[16px] px-[16px] text-center">
            <p className="text-[18px] font-normal text-[#404040] tracking-[-0.54px] leading-[1.3]" style={{ fontFamily: RUBIK }}>
              Hasil tidak ditemukan
            </p>
            <PrimaryButton onClick={() => navigate("/")} fullWidth={false} className="px-[24px]">
              Mulai Quiz
            </PrimaryButton>
          </div>
          {credit}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* ── Hidden share card rendered off-screen for html-to-image ── */}
      <div style={{ position: "fixed", left: -9999, top: 0, pointerEvents: "none", zIndex: 0 }}>
        <div ref={shareCardRef}>
          <ShareCard
            name={result?.name ?? ""}
            archetype={archetype}
            archetypeName={data.name}
            description={data.description}
            nextMove={data.nextMove}
            striker={strikerCount}
            vanguard={vanguardCount}
            overseer={overseerCount}
          />
        </div>
      </div>

      {/* Sky gradient — taller on the intro screen, shorter once settled */}
      <motion.div
        aria-hidden
        className="absolute top-0 left-0 right-0 pointer-events-none"
        initial={false}
        animate={{ height: intro ? 560 : 295 }}
        transition={MOVE}
        style={{ backgroundImage: SKY_GRADIENT }}
      />

      {/* Starburst — rises as the hero travels up */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 size-[1020px] pointer-events-none"
        style={{ x: "-50%" }}
        initial={false}
        animate={{ top: intro ? -88 : -402 }}
        transition={MOVE}
      >
        {/* Continuous spin on its own layer, pivoting on the 1020px box centre so it
            stays independent of the outer element's centring + travel transforms. */}
        <motion.div
          className="absolute inset-0"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: STAR_SPIN_SECONDS, ease: "linear", repeat: Infinity }}
        >
          {/* Leaf sits slightly outside the 1020px box so the glow's blur bleed is
              preserved at the asset's natural aspect ratio. */}
          <div
            className="absolute"
            style={{ top: "-0.98%", right: "-0.88%", bottom: "-0.59%", left: "-0.88%" }}
          >
            <img src={imgStarburst} alt="" className="block size-full max-w-none" />
          </div>
        </motion.div>
      </motion.div>

      {/* ── Content ── */}
      <div className="relative flex flex-col min-h-screen max-w-[390px] mx-auto">
        <div
          className={
            intro
              ? "flex-1 flex flex-col items-center justify-center px-[16px]"
              : "flex flex-col items-center gap-[24px] px-[16px] pt-[32px] pb-[24px]"
          }
        >
          {/* Hero — scales up in place, then travels to its result position */}
          <motion.div layout transition={MOVE} className="flex flex-col items-center gap-[16px] w-full">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={POP}>
              <ArchetypeIcon type={archetype} size={132} />
            </motion.div>

            <div className="flex flex-col items-center gap-[4px] w-full text-center whitespace-nowrap">
              <AnimatePresence initial={false}>
                {!intro && (
                  <motion.p
                    key="label"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={MOVE}
                    className="text-[16px] font-normal text-[#404040] tracking-[-0.48px] leading-[1.3] overflow-hidden"
                    style={{ fontFamily: RUBIK }}
                  >
                    {result?.name ? `Archetype ${result.name}` : "Archetype kamu"}
                  </motion.p>
                )}
              </AnimatePresence>
              <p
                className="text-[40px] font-bold text-[#383838] tracking-[-0.8px] leading-[1.05] text-center"
                style={{ fontFamily: RUBIK }}
              >
                {data.name}
              </p>
            </div>
          </motion.div>

          {/* Everything below the hero fades up once the hero has settled */}
          <AnimatePresence>
            {!intro && (
              <motion.div
                key="rest"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...MOVE, delay: 0.15 }}
                className="flex flex-col items-center gap-[24px] w-full"
              >
                <div className="flex flex-col items-center gap-[32px] w-full">
                  {hasTraitData && (
                    <StatRow
                      technic={strikerCount}
                      empathic={vanguardCount}
                      strategic={overseerCount}
                    />
                  )}

                  <div className="flex flex-col gap-[16px] w-full">
                    <p
                      className="w-full text-center text-[18px] font-normal text-[#383838] tracking-[-0.54px] leading-[1.3]"
                      style={{ fontFamily: RUBIK }}
                    >
                      {data.description}
                    </p>

                    {/* Next Move card */}
                    <div className="w-full bg-white border-2 border-solid border-[#e5e5e3] rounded-[12px] overflow-hidden flex flex-col items-center">
                      <div className="w-full bg-[#e5e5e3] flex items-center justify-center py-[8px]">
                        <p
                          className="flex-1 min-w-px text-center text-[16px] font-bold text-[#404040] tracking-[-0.48px] leading-[1.3]"
                          style={{ fontFamily: RUBIK }}
                        >
                          Next Move
                        </p>
                      </div>
                      <div className="w-full flex items-center justify-center p-[12px]">
                        <p
                          className="flex-1 min-w-px text-center text-[18px] font-normal text-[#383838] tracking-[-0.54px] leading-[1.3]"
                          style={{ fontFamily: RUBIK }}
                        >
                          {data.nextMove}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-[12px] w-full">
                  <PrimaryButton onClick={() => { setCopied(false); setSheetOpen(true); }}>
                    Simpan
                  </PrimaryButton>
                  <SecondaryButton onClick={handleSeeAll}>
                    Lihat Semua Archetype
                  </SecondaryButton>
                  <TertiaryButton onClick={() => navigate("/")}>
                    Kembali ke Home
                  </TertiaryButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {credit}
      </div>

      {/* ── Save / share sheet ── */}
      <AnimatePresence>
        {sheetOpen && (
          <DownloadOverlay
            key="download-sheet"
            name={result?.name ?? ""}
            archetype={archetype}
            archetypeName={data.name}
            saving={generating}
            saveLabel={generating ? "Membuat gambar…" : "Simpan Gambar"}
            copyLabel={copied ? "URL Tersalin!" : "Salin URL"}
            onSaveImage={handleShare}
            onCopyUrl={handleCopyUrl}
            onClose={() => setSheetOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
