import { ImageWithFallback } from "@/components/ImageWithFallback";

import imgGizalab from "@/assets/gizalab-logo.png";
import imgGlyphs from "@/assets/glyphs-bg.png";

// --- Unified Footer ---
export function PageFooter() {
  return (
    <footer className="mt-auto flex flex-col items-center gap-[16px] h-[208px] relative overflow-hidden shrink-0 bg-white p-[0px]">
      {/* Date & Location */}
      <div className="flex flex-col items-center gap-[4px] relative z-10">
        <div className="text-[12px] font-medium text-[#1e1e1e] tracking-[-0.24px] leading-[1.05] text-center">
          June 27, 2026
        </div>
        <div className="text-[12px] font-medium text-[#1e1e1e] tracking-[-0.24px] leading-[1.05] text-center">
          at CONFIG Watch Party, Jakarta
        </div>
      </div>
      
      {/* Credit */}
      <div className="flex items-center gap-[4px] relative z-10">
        <div className="text-[12px] font-medium text-[#1e1e1e] tracking-[-0.24px] leading-[1.05]">
          Made by
        </div>
        <div className="w-[77px] h-[20px] relative">
          <ImageWithFallback src={imgGizalab} alt="Gizalab" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Background Glyphs - Exactly matching Figma positioning from Footer-1 */}
      <div className="absolute aspect-[390/142] bottom-0 left-0 right-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <ImageWithFallback 
            src={imgGlyphs} 
            alt="" 
            className="absolute h-[193.25%] left-[-4.62%] max-w-none top-0 w-[134.03%] object-cover mx-[0px] mt-[0px] mb-[-24px]" 
          />
        </div>
      </div>
    </footer>
  );
}
