import { useState } from "react";
import { useNavigate } from "react-router";
import { FriendsOfFigmaHeader } from "@/components/FriendsOfFigmaHeader";
import { PageFooter } from "@/components/PageFooter";
import { ArchetypeIcon } from "@/components/ArchetypeIcon";

export default function OnboardingPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const canStart =
    name.trim().length > 0 && role.trim().length > 0;

  const handleStart = () => {
    if (!canStart) return;
    sessionStorage.setItem("participant_name", name.trim());
    sessionStorage.setItem("participant_role", role.trim());
    navigate("/quiz");
  };

  return (
    <div
      className="min-h-screen bg-white flex flex-col max-w-[390px] mx-auto"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Header */}
      <header className="flex items-center justify-center px-4 pt-6 shrink-0">
        <FriendsOfFigmaHeader />
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col gap-12 px-[16px] pt-[40px] pb-[24px]">
        {/* Archetype icons + title */}
        <div className="flex flex-col gap-4 items-center">
          {/* Overlapping icons: Striker / Overseer / Vanguard */}
          <div className="flex items-center">
            <div className="relative z-[3] -mr-3">
              <ArchetypeIcon type="striker" size={64} />
            </div>
            <div className="relative z-[2] -mr-3">
              <ArchetypeIcon type="overseer" size={64} />
            </div>
            <div className="relative z-[1]">
              <ArchetypeIcon type="vanguard" size={64} />
            </div>
          </div>

          <div className="flex flex-col gap-3 items-center text-center">
            <h1 className="text-[32px] font-bold text-[#1e1e1e] tracking-[-0.64px] leading-[1.05]">
              Designer Playstyle
            </h1>
            <p className="text-[16px] font-normal text-[#1e1e1e] tracking-[-0.48px] leading-[1.3]">
              Cara kamu main game bisa mencerminkan cara kamu
              kerja. Temukan archetype desainmu di sini.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6 items-center">
          <div className="flex flex-col gap-[14px] w-full">
            <div className="relative bg-white border-[1px] border-solid border-[#1e1e1e] rounded-[6px] h-[52px]">
              <input
                type="text"
                placeholder="Nama Kamu"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && canStart && handleStart()
                }
                className="absolute inset-0 w-full h-full bg-transparent px-3 text-[18px] text-[#1e1e1e] placeholder:text-black/30 text-center tracking-[-0.36px] outline-none"
                style={{ fontFamily: "Inter, sans-serif" }}
              />
            </div>
            <div className="relative bg-white border-[1px] border-solid border-[#1e1e1e] rounded-[6px] h-[52px]">
              <input
                type="text"
                placeholder="Role Kamu"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && canStart && handleStart()
                }
                className="absolute inset-0 w-full h-full bg-transparent px-3 text-[18px] text-[#1e1e1e] placeholder:text-black/30 text-center tracking-[-0.36px] outline-none"
                style={{ fontFamily: "Inter, sans-serif" }}
              />
            </div>
          </div>

          <button
            onClick={handleStart}
            disabled={!canStart}
            className="w-full h-[52px] bg-[#1e1e1e] rounded-[6px] text-[#f5f5f5] text-[16px] font-medium tracking-[-0.32px] capitalize disabled:opacity-40 transition-opacity cursor-pointer"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Mulai
          </button>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}