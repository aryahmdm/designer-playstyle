import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { QUESTIONS, getArchetypeFromCounts, type ArchetypeId } from "@/lib/quizData";
import { saveParticipant } from "@/lib/api";
import { rememberResultId } from "@/lib/session";

import imgGizalab from "@/assets/gizalab-logo.png";

const RUBIK = "Rubik, sans-serif";

// Slide-down entrance: background sweeps in from above, content follows.
const SLIDE = { duration: 0.6, ease: [0.22, 1, 0.36, 1] } as const;

export default function QuizPage() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [counts, setCounts] = useState<Record<ArchetypeId, number>>({
    striker: 0, vanguard: 0, overseer: 0,
  });
  const [selected, setSelected] = useState<number | null>(null);
  const [answersHistory, setAnswersHistory] = useState<Array<{ archetype: ArchetypeId; points: number }>>([]);

  useEffect(() => {
    const hasName = sessionStorage.getItem("participant_name");
    const hasRole = sessionStorage.getItem("participant_role");
    if (!hasName || !hasRole) navigate("/");
  }, [navigate]);

  const question = QUESTIONS[currentQ];

  const handleAnswer = (i: number) => {
    if (selected !== null) return;
    setSelected(i);

    const answer = question.answers[i];
    const newTotal = totalPoints + answer.points;
    const newCounts = { ...counts, [answer.archetype]: counts[answer.archetype] + 1 };
    setTotalPoints(newTotal);
    setCounts(newCounts);
    setAnswersHistory((h) => [...h, { archetype: answer.archetype, points: answer.points }]);

    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ((q) => q + 1);
        setSelected(null);
      } else {
        const winner = getArchetypeFromCounts(newCounts);
        const name  = sessionStorage.getItem("participant_name") ?? "";
        const role  = sessionStorage.getItem("participant_role") ?? "";

        const id = Array.from({ length: 15 }, () =>
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[
            Math.floor(Math.random() * 62)
          ]
        ).join("");

        sessionStorage.setItem("participant_archetype", winner);
        sessionStorage.setItem("participant_points", String(newTotal));
        rememberResultId(id);
        sessionStorage.setItem(`result_${id}`, JSON.stringify({
          archetype: winner,
          name,
          points: newTotal,
          technic: newCounts.striker,
          empathic: newCounts.vanguard,
          strategic: newCounts.overseer,
        }));

        saveParticipant(name, role, winner, newTotal, id, newCounts.striker, newCounts.vanguard, newCounts.overseer)
          .catch((err) => console.error("Failed to save participant:", err));

        navigate(`/result?id=${id}`);
      }
    }, 420);
  };

  const handleBack = () => {
    if (currentQ === 0) navigate("/");
    else {
      const prev = answersHistory[answersHistory.length - 1];
      if (prev) {
        setTotalPoints((p) => p - prev.points);
        setCounts((c) => ({ ...c, [prev.archetype]: c[prev.archetype] - 1 }));
        setAnswersHistory((h) => h.slice(0, -1));
      }
      setCurrentQ((q) => q - 1);
      setSelected(null);
    }
  };

  const progressPct = ((currentQ + 1) / QUESTIONS.length) * 100;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background — white base with the sky gradient rising from the bottom.
          Settled before the content arrives. */}
      <div aria-hidden className="absolute inset-0 bg-white pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(152,212,254,0) 72.648%, #98d4fe 100%)",
          }}
        />
      </div>

      {/* Foreground — centered 390px column */}
      <div className="relative flex flex-col min-h-screen max-w-[390px] mx-auto">
        {/* Top bar + question slide down from above, over the settled background */}
        <motion.div
          className="flex flex-col"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={SLIDE}
        >
        {/* Top bar: back + progress */}
        <header className="flex items-center gap-[12px] p-[16px] shrink-0">
          <button
            onClick={handleBack}
            aria-label="Back"
            className="flex items-center p-[4px] rounded-[6px] shrink-0 cursor-pointer transition-opacity hover:opacity-70"
          >
            <ArrowLeft size={28} strokeWidth={2.14} color="#727272" />
          </button>

          <div className="flex-1 min-w-px h-[16px] relative rounded-[100px] overflow-hidden">
            {/* Track */}
            <div
              className="absolute inset-0 rounded-[100px]"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, #dededc 0%, #d6d6d4 50%, #cecece 100%)",
              }}
            />
            {/* Filled */}
            <div
              className="absolute left-0 top-0 bottom-0 rounded-[100px] overflow-hidden transition-[width] duration-300 ease-out"
              style={{ width: `${progressPct}%` }}
            >
              <div
                aria-hidden
                className="absolute inset-0 rounded-[100px] pointer-events-none"
                style={{ backgroundImage: "linear-gradient(to top, #2fb228 0%, #2ccb24 100%)" }}
              />
              <div className="absolute top-[4px] left-[8px] right-[8px] h-[3px] rounded-[64px] bg-white opacity-40 blur-[1px]" />
              <div
                aria-hidden
                className="absolute inset-0 rounded-[inherit] pointer-events-none"
                style={{ boxShadow: "inset 0px 0px 4px 0px #219f34" }}
              />
            </div>
          </div>
        </header>

        {/* Question + answers */}
        <main className="flex flex-col gap-[52px] px-[16px] py-[32px]">
          <div className="flex flex-col gap-[12px] w-full break-words" style={{ fontFamily: RUBIK }}>
            <p className="text-[16px] font-medium text-[#727272] tracking-[-0.32px] leading-[1.05] whitespace-nowrap">
              {currentQ + 1} dari {QUESTIONS.length}
            </p>
            <p className="text-[32px] font-medium text-[#383838] tracking-[-0.64px] leading-[1.1] w-full">
              {question.text}
            </p>
          </div>

          <div className="w-full border-2 border-solid border-[#e5e5e3] rounded-[12px] flex flex-col justify-center bg-white/40">
            {question.answers.map((answer, i) => {
              const label = ["A", "B", "C"][i];
              const isSelected = selected === i;
              const isDimmed = selected !== null && !isSelected;
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selected !== null}
                  className={`
                    w-full min-h-[52px] flex items-center justify-center gap-[16px] px-[16px] py-[24px]
                    text-left cursor-pointer transition-all duration-200
                    ${i < question.answers.length - 1 ? "border-b-2 border-solid border-[#e5e5e3]" : ""}
                    ${i === 0 ? "rounded-t-[10px]" : ""}
                    ${i === question.answers.length - 1 ? "rounded-b-[10px]" : ""}
                    ${isSelected ? "bg-[rgba(102,99,254,0.12)]" : "hover:bg-[rgba(102,99,254,0.04)]"}
                    ${isDimmed ? "opacity-40" : ""}
                    disabled:cursor-default
                  `}
                >
                  <span
                    className="shrink-0 flex flex-col items-center justify-center p-[4px] rounded-[8px]
                               bg-[rgba(102,99,254,0.12)] border-2 border-solid border-[#6663fe]"
                  >
                    <span
                      className="w-[16px] text-center text-[16px] font-medium text-[#6663fe] tracking-[-0.32px] leading-none"
                      style={{ fontFamily: RUBIK }}
                    >
                      {label}
                    </span>
                  </span>
                  <span
                    className="flex-1 min-w-px text-[18px] font-normal text-[#404040] tracking-[-0.36px] leading-none"
                    style={{ fontFamily: RUBIK }}
                  >
                    {answer.text}
                  </span>
                </button>
              );
            })}
          </div>
        </main>
        </motion.div>

        {/* Credit — settled with the background, does not slide */}
        <footer className="mt-auto h-[72px] flex items-center justify-center gap-[4px] shrink-0">
          <span
            className="text-[12px] font-medium text-[#404040] tracking-[-0.24px] leading-[1.05] text-center"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Made by
          </span>
          <div className="w-[77px] h-[20px] relative">
            <ImageWithFallback
              src={imgGizalab}
              alt="Gizalab"
              className="w-full h-full object-contain"
            />
          </div>
        </footer>
      </div>
    </div>
  );
}
