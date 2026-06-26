import { Link } from "react-router";
import { ImageWithFallback } from "@/components/ImageWithFallback";

import imgLockup from "@/assets/fof-jakarta-logo.png";

// --- Unified Header ---
export function FriendsOfFigmaHeader() {
  return (
    <div className="flex items-center justify-center py-[24px]">
      <Link to="/" className="w-[182px] h-[24px] relative block cursor-pointer transition-opacity hover:opacity-80">
        <ImageWithFallback
          src={imgLockup}
          alt="Friends of Figma Jakarta"
          className="w-full h-full object-contain"
        />
      </Link>
    </div>
  );
}

