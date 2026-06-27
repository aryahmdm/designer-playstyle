import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { toJpeg } from "html-to-image";
import { ARCHETYPE_DATA, type ArchetypeId } from "@/lib/quizData";
import { getResult } from "@/lib/api";
import { FriendsOfFigmaHeader } from "@/components/FriendsOfFigmaHeader";
import { PageFooter } from "@/components/PageFooter";
import { StatRow } from "@/components/StatRow";
import { ArchetypeIcon } from "@/components/ArchetypeIcon";
import ShareCard from "@/components/ShareCard";

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

  // 0 = overlay visible & archetype entering, 1 = rest sliding up, 2 = overlay gone
  const [phase, setPhase]         = useState<0 | 1 | 2>(0);
  const [generating, setGenerating] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!result && !fetching) return;
    const t1 = setTimeout(() => setPhase(1), 1200);
    const t2 = setTimeout(() => setPhase(2), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [result]);

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

  const handleSeeAll = () => navigate("/archetypes");

  if (fetching) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center max-w-[390px] mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
        <span className="text-[20px] font-medium text-[rgba(30,30,30,0.3)] tracking-[-0.4px]">Memuat…</span>
      </div>
    );
  }

  if (notFound || !result) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 max-w-[390px] mx-auto px-6 text-center" style={{ fontFamily: "Inter, sans-serif" }}>
        <span className="text-[48px] font-bold text-[rgba(30,30,30,0.15)] tracking-[-1px]">—</span>
        <p className="text-[16px] font-medium text-[rgba(30,30,30,0.5)] tracking-[-0.32px]">Hasil tidak ditemukan</p>
        <button onClick={() => navigate("/")} className="mt-2 px-6 h-[44px] bg-[#1e1e1e] rounded-[6px] text-white text-[15px] font-medium tracking-[-0.3px] cursor-pointer">
          Mulai Quiz
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white flex flex-col max-w-[390px] mx-auto overflow-x-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* ── Hidden share card rendered off-screen for html2canvas ── */}
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

      {/* ── Phase 0/1 overlay: archetype centered on screen ── */}
      {phase < 2 && (
        <div
          className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center pointer-events-none"
          style={{
            transition: "opacity 800ms ease, transform 400ms ease",
            opacity: phase === 1 ? 0 : 1,
            transform: phase === 1 ? "translateY(-40px)" : "translateY(0)",
          }}
        >
          <div
            className="flex flex-col items-center gap-4"
            style={{
              transition: "opacity 500ms ease",
              opacity: 1,
              animation: "resultHeroIn 150ms ease both",
            }}
          >
            <ArchetypeIcon type={archetype} />
            <div className="flex flex-col items-center text-center">
              <p className="text-[14px] font-normal text-[#1e1e1e] tracking-[-0.42px] leading-[1.3]">
                {result?.name ? `${result.name}'s archetype is` : "Archetype kamu"}
              </p>
              <h1 className="text-[32px] font-bold text-[#1e1e1e] tracking-[-0.64px] leading-[1.05]">
                {data.name}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* ── Main page content ── */}
      <div
        className="flex-1 flex flex-col gap-6 px-[16px] py-[24px]"
        style={{
          transition: "opacity 400ms ease, transform 400ms ease",
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "translateY(0)" : "translateY(80px)",
        }}
      >
        <FriendsOfFigmaHeader />

        <div className="flex flex-col items-center gap-4">
          <ArchetypeIcon type={archetype} />
          <div className="flex flex-col items-center text-center">
            <p className="text-[14px] font-normal text-[#1e1e1e] tracking-[-0.42px] leading-[1.3]">
              {result?.name ? `${result.name}'s archetype is` : "Archetype kamu"}
            </p>
            <h1 className="text-[32px] font-bold text-[#1e1e1e] tracking-[-0.64px] leading-[1.05]">
              {data.name}
            </h1>
          </div>
        </div>

        {hasTraitData && (
          <StatRow
            technic={strikerCount}
            empathic={vanguardCount}
            strategic={overseerCount}
          />
        )}

        <p className="text-[16px] font-normal text-[#1e1e1e] tracking-[-0.48px] leading-[1.3] text-center">
          {data.description}
        </p>

        <div className="bg-white border-[1px] border-solid border-[#1e1e1e] rounded-[6px] p-3 text-center">
          <p className="text-[16px] font-bold text-[#1e1e1e] tracking-[-0.48px] leading-[1.3]">
            Next Move:
          </p>
          <p className="text-[16px] font-normal text-[#1e1e1e] tracking-[-0.48px] leading-[1.3] mt-1">
            {data.nextMove}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleShare}
            disabled={generating}
            className="w-full h-[52px] bg-[#1e1e1e] rounded-[6px] text-[#f5f5f5] text-[16px] font-medium tracking-[-0.32px] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-opacity duration-150"
          >
            {generating ? "Membuat gambar…" : "Bagikan"}
          </button>
          <button
            onClick={handleSeeAll}
            className="w-full h-[48px] border-[1px] border-solid border-[#1e1e1e]/20 rounded-[6px] text-[#1e1e1e] text-[16px] font-medium tracking-[-0.32px] cursor-pointer hover:bg-[#1e1e1e]/[0.04] transition-colors duration-150"
          >
            Lihat semua archetype
          </button>
        </div>
      </div>

      <PageFooter />

      <style>{`
        @keyframes resultHeroIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
