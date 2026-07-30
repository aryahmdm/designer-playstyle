import { useState } from "react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ArchetypeIcon } from "@/components/ArchetypeIcon";
import { PrimaryButton } from "@/components/PrimaryButton";

import imgOnboardingBg from "@/assets/onboarding-bg.webp";
import imgGizalab from "@/assets/gizalab-logo.png";

const RUBIK = "Rubik, sans-serif";

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

  const inputClass =
    "w-full h-[52px] bg-white border-2 border-solid border-[#e5e5e3] rounded-[12px] px-3 " +
    "text-[18px] text-[#383838] placeholder:text-[#aeaeae] text-center tracking-[-0.36px] outline-none " +
    "focus:border-[#6663fe] transition-colors";

  return (
    <div className="relative min-h-screen bg-[#98d4fe] overflow-hidden">
      {/* Background illustration — spans the full viewport, anchored to the bottom
          so the landscape stays grounded while the sky fills any extra height. */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <ImageWithFallback
          src={imgOnboardingBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        />
        {/* Sky fade so the form area keeps a clean backdrop at any viewport size */}
        <div
          className="absolute top-0 left-0 w-full h-[62%]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #98d4fe 35.096%, rgba(152,212,254,0) 100%)",
          }}
        />
      </div>

      {/* Foreground — centered 390px column */}
      <div className="relative flex flex-col min-h-screen max-w-[390px] mx-auto">
        <main className="flex flex-col gap-[48px] px-[16px] pt-[116px]">
          {/* Archetype icons + title */}
          <div className="flex flex-col gap-[16px] items-center w-full">
            {/* Overlapping icons: Striker / Overseer / Vanguard */}
            <div className="flex items-center isolate">
              <div className="relative z-[3] -mr-[12px]">
                <ArchetypeIcon type="striker" size={48} />
              </div>
              <div className="relative z-[2] -mr-[12px]">
                <ArchetypeIcon type="overseer" size={48} />
              </div>
              <div className="relative z-[1]">
                <ArchetypeIcon type="vanguard" size={48} />
              </div>
            </div>

            <div className="flex flex-col gap-[12px] items-center text-center w-full break-words">
              <h1
                className="text-[32px] font-bold text-[#383838] tracking-[-0.64px] leading-[1.05] w-full"
                style={{ fontFamily: RUBIK }}
              >
                Designer Playstyle
              </h1>
              <p
                className="text-[16px] font-normal text-[#404040] tracking-[-0.48px] leading-[1.3] w-full"
                style={{ fontFamily: RUBIK }}
              >
                Cara kamu main game bisa mencerminkan cara kamu kerja. Temukan archetype desainmu di sini.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-[24px] items-center w-full">
            <div className="flex flex-col gap-[14px] w-full">
              <input
                type="text"
                placeholder="Nama Kamu"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && canStart && handleStart()}
                className={inputClass}
                style={{ fontFamily: RUBIK }}
              />
              <input
                type="text"
                placeholder="Role Kamu"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && canStart && handleStart()}
                className={inputClass}
                style={{ fontFamily: RUBIK }}
              />
            </div>

            <PrimaryButton onClick={handleStart} disabled={!canStart}>
              Mulai
            </PrimaryButton>
          </div>
        </main>

        {/* Credit */}
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
