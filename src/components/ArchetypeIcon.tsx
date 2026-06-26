import { ImageWithFallback } from "@/components/ImageWithFallback";
import type { ArchetypeId } from "@/lib/quizData";

import imgStriker from "@/assets/archetype-striker.png";
import imgVanguard from "@/assets/archetype-vanguard.png";
import imgOverseer from "@/assets/archetype-overseer.png";

// Re-exporting assets for use in pages
export { imgStriker, imgVanguard, imgOverseer };

// --- High-Fidelity Archetype Icons ---
export function ArchetypeIcon({ type, size = 132 }: { type: ArchetypeId; size?: number }) {
  const src = type === "striker" ? imgStriker : type === "vanguard" ? imgVanguard : imgOverseer;
  return (
    <div style={{ width: size, height: size }} className="relative shrink-0">
      <ImageWithFallback
        src={src}
        alt={type}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export function ArchetypeIconSm({ type, size = 32 }: { type: ArchetypeId; size?: number }) {
  return <ArchetypeIcon type={type} size={size} />;
}
