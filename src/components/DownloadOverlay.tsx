import { useEffect } from "react";
import { motion } from "motion/react";
import type { ArchetypeId } from "@/lib/quizData";
import { ArchetypeIcon } from "@/components/ArchetypeIcon";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";

import imgStarburst from "@/assets/starburst.svg";

const RUBIK = "Rubik, sans-serif";

const SKY_GRADIENT =
  "linear-gradient(to bottom, #98d4fe 35.096%, rgba(152,212,254,0) 100%)";

const EASE = [0.22, 1, 0.36, 1] as const;

interface DownloadOverlayProps {
  name: string;
  archetype: ArchetypeId;
  archetypeName: string;
  /** Label flips to a copied-confirmation, so the parent owns the text. */
  copyLabel: string;
  saving: boolean;
  saveLabel: string;
  onSaveImage: () => void;
  onCopyUrl: () => void;
  onClose: () => void;
}

export function DownloadOverlay({
  name,
  archetype,
  archetypeName,
  copyLabel,
  saving,
  saveLabel,
  onSaveImage,
  onCopyUrl,
  onClose,
}: DownloadOverlayProps) {
  // The design has no close affordance, so Escape + scrim click keep the sheet
  // dismissible rather than trapping the user.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-[16px] bg-[rgba(56,56,56,0.52)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Simpan hasil"
    >
      <motion.div
        className="w-full max-w-[358px] bg-white rounded-[12px] overflow-hidden flex flex-col items-center
                   shadow-[0px_4px_0px_0px_#cbcaff]"
        initial={{ opacity: 0, scale: 0.94, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 8 }}
        transition={{ duration: 0.3, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — archetype recap over the sky gradient + starburst */}
        <div className="relative w-full h-[152px] flex flex-col items-center justify-center gap-[12px] p-[12px] overflow-hidden">
          <div aria-hidden className="absolute top-0 left-0 right-0 h-[128px]" style={{ backgroundImage: SKY_GRADIENT }} />
          <div aria-hidden className="absolute left-1/2 -translate-x-1/2 size-[444px] top-[-178px] pointer-events-none">
            <div
              className="absolute"
              style={{ top: "-2.25%", right: "-2.15%", bottom: "-1.86%", left: "-2.15%" }}
            >
              <img src={imgStarburst} alt="" className="block size-full max-w-none" />
            </div>
          </div>

          <div className="relative shrink-0">
            <ArchetypeIcon type={archetype} size={64} />
          </div>

          <div className="relative w-full flex flex-col items-center text-center leading-[1.3]" style={{ fontFamily: RUBIK }}>
            <p className="w-full text-[16px] font-normal text-[#404040] tracking-[-0.48px]">
              {name ? `Archetype ${name}` : "Archetype kamu"}
            </p>
            <p className="w-full text-[24px] font-semibold text-[#383838] tracking-[-0.72px]">
              {archetypeName}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col items-center p-[16px]">
          <div className="w-full flex flex-col gap-[12px]">
            <PrimaryButton onClick={onSaveImage} disabled={saving}>
              {saveLabel}
            </PrimaryButton>
            <SecondaryButton onClick={onCopyUrl}>
              {copyLabel}
            </SecondaryButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
