import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { QUESTIONS, getArchetypeFromCounts, type ArchetypeId } from "@/lib/quizData";
import { saveParticipant } from "@/lib/api";

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
        sessionStorage.setItem(`result_${id}`, JSON.stringify({
          archetype: winner,
          name,
          points: newTotal,
          technic: newCounts.striker,
          empathic: newCounts.vanguard,
          strategic: newCounts.overseer,
        }));

        saveParticipant(name, role, winner, newTotal, id, newCounts.striker, newCounts.vanguard, newCounts.overseer)
          .catch((err) => console.error("Failed to save participant to Supabase:", err));

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

  return (
    <div
      className="min-h-screen bg-white flex flex-col max-w-[390px] mx-auto"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Header */}
      <header className="flex flex-col gap-2 px-4 pt-6 pb-4 shrink-0">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-1 bg-[#1e1e1e]/[0.12] rounded-[6px] px-3 py-2 text-[16px] font-medium text-[#1e1e1e] tracking-[-0.32px] cursor-pointer"
          >
            <ArrowLeft size={16} strokeWidth={2} />
            Back
          </button>
          <span className="text-[16px] font-medium text-[#1e1e1e] tracking-[-0.32px]">
            {currentQ + 1} of {QUESTIONS.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-[4px] rounded-[4px] bg-[rgba(30,30,30,0.12)] w-full overflow-hidden">
          <div
            className="h-full bg-[#2fb228] rounded-[4px] transition-all duration-300"
            style={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </header>

      {/* Real-time stats 
      <div className="px-4 py-2">
        <StatRow
          technic={counts.striker}
          empathic={counts.vanguard}
          strategic={counts.overseer}
        />
      </div>*/}

      {/* Question text */}
      <div className="flex-1 flex items-start justify-center px-4 pt-14 pb-6">
        <p className="text-[32px] font-medium text-[#1e1e1e] text-center tracking-[-0.64px] leading-[1.1]">
          {question.text}
        </p>
      </div>

      {/* Answers */}
      <div className="flex flex-col gap-3 shrink-0 px-[16px] pt-[24px] pb-[92px]">
        {question.answers.map((answer, i) => {
          const label = ["A", "B", "C"][i];
          const isSelected = selected === i;
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={selected !== null}
              className={`
                w-full min-h-[52px] rounded-[6px]
                flex items-center gap-3 p-4
                border border-solid border-[#4d49fc] bg-[#4d49fc]/[0.12]
                text-[#1e1e1e] transition-all duration-200 cursor-pointer text-left
                ${isSelected ? "opacity-75 scale-[0.98]" : ""}
                ${selected !== null && !isSelected ? "opacity-40" : ""}
              `}
            >
              {/* Letter badge */}
              <span className="shrink-0 size-6 rounded-[4px] bg-[rgba(77,73,252,0.24)] border border-[#4d49fc] flex items-center justify-center text-[12px] font-semibold text-[#4d49fc] tracking-[-0.24px] leading-none">
                {label}
              </span>
              <span className="flex-1 text-[16px] font-medium tracking-[-0.32px] leading-[1.3]">
                {answer.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
