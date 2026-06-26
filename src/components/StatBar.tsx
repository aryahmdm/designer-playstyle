import { useId } from "react";
import svgPaths from "./statbar-paths";
type StatRowProps = {
  className?: string;
  property1?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7";
};

function StatRow({ className, property1 = "0" }: StatRowProps) {
  const id = useId();
  const is0 = property1 === "0";
  const is1 = property1 === "1";
  const is1Or0 = ["1", "0"].includes(property1);
  const is2Or1Or0 = ["2", "1", "0"].includes(property1);
  const is3Or2Or1Or0 = ["3", "2", "1", "0"].includes(property1);
  const is4Or3Or2Or1Or0 = ["4", "3", "2", "1", "0"].includes(property1);
  const is5Or4Or3Or2Or1Or0 = ["5", "4", "3", "2", "1", "0"].includes(property1);
  const is6Or5Or4Or3Or2Or1Or0 = ["6", "5", "4", "3", "2", "1", "0"].includes(property1);

  // Use unique IDs for all filters and paints to avoid collisions during image export
  const fId0 = `f0-${id}`;
  const fId1 = `f1-${id}`;
  const fId2 = `f2-${id}`;
  const fId3 = `f3-${id}`;
  const fId4 = `f4-${id}`;
  const fId5 = `f5-${id}`;
  const fId6 = `f6-${id}`;
  
  const pId0 = `p0-${id}`;
  const pId1 = `p1-${id}`;
  const pId2 = `p2-${id}`;
  const pId3 = `p3-${id}`;
  const pId4 = `p4-${id}`;
  const pId5 = `p5-${id}`;
  const pId6 = `p6-${id}`;

  return (
    <div className={className || "relative size-[84px]"}>
      <div className={`absolute ${is0 ? "inset-[0_0.05%_0.05%_0]" : "left-0 size-[83.955px] top-0"}`}>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 83.9546 83.9546">
          <g filter={`url(#${fId0})`} id="Ellipse 25">
            <path d={svgPaths.p14a5b00} fill={`url(#${pId0})`} />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="83.9546" id={fId0} width="83.9546" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0.16 0" />
              <feBlend in2="shape" mode="normal" result="effect1_innerShadow_2005_911" />
            </filter>
            <radialGradient cx="0" cy="0" gradientTransform="translate(42 42) rotate(90) scale(42)" gradientUnits="userSpaceOnUse" id={pId0} r="1">
              <stop offset="0.8" stopColor="#DADADA" />
              <stop offset="1" stopColor="#F4F4F4" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className={`absolute ${is0 ? "inset-[77.6%_51.92%_2.62%_21%]" : "h-[16.614px] left-[17.64px] top-[65.19px] w-[22.749px]"}`}>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.7492 16.6137">
          <g filter={`url(#${fId1})`} id="Ellipse 28">
            <path d={is1 ? svgPaths.p20480000 : svgPaths.p2f5bf900} fill={is0 ? "var(--fill-0, #F5F5F5)" : is1 ? `url(#${pId1})` : `url(#${pId1})`} />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="16.6137" id={fId1} width="22.7492" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation={is0 ? "0.5" : "1"} />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values={is0 ? "0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0.24 0" : "0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0.32 0"} />
              <feBlend in2="shape" mode="normal" result={is0 ? "effect1_innerShadow_2005_919" : is1 ? "effect1_innerShadow_2005_913" : "effect1_innerShadow_2005_901"} />
            </filter>
            {["7", "6", "5", "4", "3", "2", "1"].includes(property1) && (
              <radialGradient cx="0" cy="0" gradientTransform="translate(24.3584 -23.187) rotate(-180) scale(40)" gradientUnits="userSpaceOnUse" id={pId1} r="1">
                <stop offset="0.79841" stopColor="#2FB228" />
                <stop offset="1" stopColor="#2CCB24" />
              </radialGradient>
            )}
          </defs>
        </svg>
      </div>
      <div className={`absolute ${is0 ? "inset-[58.19%_73.47%_15.04%_4.11%]" : "h-[22.485px] left-[3.45px] top-[48.88px] w-[18.835px]"}`}>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.8351 22.4854">
          <g filter={`url(#${fId2})`} id="Ellipse 29">
            <path d={svgPaths.p3910a7f0} fill={is1Or0 ? "var(--fill-0, #F5F5F5)" : `url(#${pId2})`} />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="22.4854" id={fId2} width="18.8351" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation={is1Or0 ? "0.5" : "1"} />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values={is1Or0 ? "0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0.24 0" : "0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0.32 0"} />
              <feBlend in2="shape" mode="normal" result={is1Or0 ? "effect1_innerShadow_2005_917" : "effect1_innerShadow_2005_899"} />
            </filter>
            {["7", "6", "5", "4", "3", "2"].includes(property1) && (
              <radialGradient cx="0" cy="0" gradientTransform="translate(38.5486 -6.87695) rotate(-180) scale(40)" gradientUnits="userSpaceOnUse" id={pId2} r="1">
                <stop offset="0.79841" stopColor="#2FB228" />
                <stop offset="1" stopColor="#2CCB24" />
              </radialGradient>
            )}
          </defs>
        </svg>
      </div>
      <div className={`absolute ${is0 ? "inset-[30.66%_81.83%_41.32%_2.38%]" : "h-[23.535px] left-[2px] top-[25.75px] w-[13.264px]"}`}>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.2635 23.5351">
          <g filter={`url(#${fId3})`} id="Ellipse 30">
            <path d={svgPaths.p8faab00} fill={is2Or1Or0 ? "var(--fill-0, #F5F5F5)" : `url(#${pId3})`} />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="23.5351" id={fId3} width="13.2635" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation={is2Or1Or0 ? "0.5" : "1"} />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values={is2Or1Or0 ? "0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0.24 0" : "0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0.32 0"} />
              <feBlend in2="shape" mode="normal" result={is2Or1Or0 ? "effect1_innerShadow_2005_895" : "effect1_innerShadow_2005_897"} />
            </filter>
            {["7", "6", "5", "4", "3"].includes(property1) && (
              <radialGradient cx="0" cy="0" gradientTransform="translate(40 16.2471) rotate(-180) scale(40 40)" gradientUnits="userSpaceOnUse" id={pId3} r="1">
                <stop offset="0.79841" stopColor="#2FB228" />
                <stop offset="1" stopColor="#2CCB24" />
              </radialGradient>
            )}
          </defs>
        </svg>
      </div>
      <div className={`absolute ${is0 ? "inset-[8.41%_66.39%_66.39%_8.41%]" : "left-[7.06px] size-[21.173px] top-[7.06px]"}`}>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.1732 21.1731">
          <g filter={`url(#${fId4})`} id="Ellipse 31">
            <path d={svgPaths.p30a9be00} fill={is3Or2Or1Or0 ? "var(--fill-0, #F5F5F5)" : `url(#${pId4})`} />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="21.1731" id={fId4} width="21.1732" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation={is3Or2Or1Or0 ? "0.5" : "1"} />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values={is3Or2Or1Or0 ? "0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0.24 0" : "0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0.32 0"} />
              <feBlend in2="shape" mode="normal" result={is3Or2Or1Or0 ? "effect1_innerShadow_2005_915" : "effect1_innerShadow_2005_893"} />
            </filter>
            {["7", "6", "5", "4"].includes(property1) && (
              <radialGradient cx="0" cy="0" gradientTransform="translate(34.9375 34.9375) rotate(-180) scale(40 40)" gradientUnits="userSpaceOnUse" id={pId4} r="1">
                <stop offset="0.79841" stopColor="#2FB228" />
                <stop offset="1" stopColor="#2CCB24" />
              </radialGradient>
            )}
          </defs>
        </svg>
      </div>
      <div className={`absolute ${is0 ? "inset-[2.38%_41.32%_81.83%_30.66%]" : "h-[13.264px] left-[25.75px] top-[2px] w-[23.535px]"}`}>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.5351 13.2635">
          <g filter={`url(#${fId5})`} id="Ellipse 32">
            <path d={svgPaths.p2286c480} fill={is4Or3Or2Or1Or0 ? "var(--fill-0, #F5F5F5)" : `url(#${pId5})`} />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="13.2635" id={fId5} width="23.5351" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation={is4Or3Or2Or1Or0 ? "0.5" : "1"} />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values={is4Or3Or2Or1Or0 ? "0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0.24 0" : "0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0.32 0"} />
              <feBlend in2="shape" mode="normal" result={is4Or3Or2Or1Or0 ? "effect1_innerShadow_2005_907" : "effect1_innerShadow_2005_909"} />
            </filter>
            {["7", "6", "5"].includes(property1) && (
              <radialGradient cx="0" cy="0" gradientTransform="translate(16.2471 40) rotate(-180) scale(40 40)" gradientUnits="userSpaceOnUse" id={pId5} r="1">
                <stop offset="0.79841" stopColor="#2FB228" />
                <stop offset="1" stopColor="#2CCB24" />
              </radialGradient>
            )}
          </defs>
        </svg>
      </div>
      <div className={`absolute ${is0 ? "inset-[4.11%_15.04%_73.47%_58.19%]" : "h-[18.835px] left-[48.88px] top-[3.45px] w-[22.485px]"}`}>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.4854 18.8351">
          <g filter={`url(#${fId6})`} id="Ellipse 33">
            <path d={svgPaths.p12e8200} fill={is5Or4Or3Or2Or1Or0 ? "var(--fill-0, #F5F5F5)" : `url(#${pId6})`} />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="18.8351" id={fId6} width="22.4854" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation={is5Or4Or3Or2Or1Or0 ? "0.5" : "1"} />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values={is5Or4Or3Or2Or1Or0 ? "0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0.24 0" : "0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0.32 0"} />
              <feBlend in2="shape" mode="normal" result={is5Or4Or3Or2Or1Or0 ? "effect1_innerShadow_2005_903" : "effect1_innerShadow_2005_891"} />
            </filter>
            {["7", "6"].includes(property1) && (
              <radialGradient cx="0" cy="0" gradientTransform="translate(-6.87695 38.5486) rotate(-180) scale(40)" gradientUnits="userSpaceOnUse" id={pId6} r="1">
                <stop offset="0.79841" stopColor="#2FB228" />
                <stop offset="1" stopColor="#2CCB24" />
              </radialGradient>
            )}
          </defs>
        </svg>
      </div>
      <div className={`absolute ${is0 ? "inset-[21%_2.62%_51.92%_77.6%]" : "h-[22.749px] left-[65.19px] top-[17.64px] w-[16.614px]"}`}>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6137 22.7492">
          <g filter={is6Or5Or4Or3Or2Or1Or0 ? `url(#f7-${id})` : `url(#f7-${id})`} id="Ellipse 34">
            <path d={svgPaths.p248f700} fill={is6Or5Or4Or3Or2Or1Or0 ? "var(--fill-0, #F5F5F5)" : `url(#p7-${id})`} />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="22.7492" id={`f7-${id}`} width="16.6137" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation={is6Or5Or4Or3Or2Or1Or0 ? "0.5" : "1"} />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values={is6Or5Or4Or3Or2Or1Or0 ? "0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0.24 0" : "0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0.32 0"} />
              <feBlend in2="shape" mode="normal" result={is6Or5Or4Or3Or2Or1Or0 ? "effect1_innerShadow_2005_905" : "effect1_innerShadow_2005_889"} />
            </filter>
            {property1 === "7" && (
              <radialGradient cx="0" cy="0" gradientTransform="translate(-23.187 24.3584) rotate(-180) scale(40 40)" gradientUnits="userSpaceOnUse" id={`p7-${id}`} r="1">
                <stop offset="0.79841" stopColor="#2FB228" />
                <stop offset="1" stopColor="#2CCB24" />
              </radialGradient>
            )}
          </defs>
        </svg>
      </div>
    </div>
  );
}
type StatBarProps = {
  className?: string;
  property1?: "Empathic" | "Strategic" | "Technic";
  value?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7";
};

export default function StatBar({ className, property1 = "Technic", value = "0" }: StatBarProps) {
  const id = useId();
  const isEmpathic = property1 === "Empathic";
  const isStrategic = property1 === "Strategic";
  const isTechnicOrStrategic = ["Technic", "Strategic"].includes(property1);
  return (
    <div className={className || "relative size-[84px]"}>
      <StatRow className="absolute left-0 size-[84px] top-0" property1={value === "7" ? "7" : value === "6" ? "6" : value === "5" ? "5" : value === "4" ? "4" : value === "3" ? "3" : value === "2" ? "2" : value === "1" ? "1" : undefined} />
      <div className="absolute left-[50px] overflow-clip size-[32px] top-[50px]" data-name="Frame">
        <div className={`absolute ${isStrategic ? "inset-[4.37%_4.41%]" : isEmpathic ? "inset-[6.76%_0]" : "inset-[-2.97%_-2.96%_0.04%_0.02%]"}`} data-name="Group">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox={isStrategic ? "0 0 29.1797 29.2003" : isEmpathic ? "0 0 32 27.6758" : "0 0 32.9425 32.9374"}>
            <g filter={isStrategic ? `url(#f-strat-${id})` : isEmpathic ? `url(#f-emp-${id})` : `url(#f-tech-${id})`} id="Group">
              <path d={isStrategic ? svgPaths.pfc931f0 : isEmpathic ? svgPaths.p225a2b00 : svgPaths.p10d47880} fill={isStrategic ? `url(#p0-strat-${id})` : isEmpathic ? `url(#p0-emp-${id})` : `url(#p0-tech-${id})`} id="Vector" />
              {isTechnicOrStrategic && <path d={isStrategic ? svgPaths.p285d0e40 : svgPaths.p36b6d280} fill={isStrategic ? `url(#p1-strat-${id})` : `url(#p1-tech-${id})`} id="Vector_2" />}
              {isStrategic && <path d={svgPaths.p29928700} fill={`url(#p2-strat-${id})`} id="Vector_3" />}
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height={isStrategic ? "29.2003" : isEmpathic ? "27.6758" : "31.9905"} id={isStrategic ? `f-strat-${id}` : isEmpathic ? `f-emp-${id}` : `f-tech-${id}`} width={isStrategic ? "29.1797" : isEmpathic ? "32" : "31.9958"} x="0" y={["Empathic", "Strategic"].includes(property1) ? "0" : "0.946774"}>
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset />
                <feGaussianBlur stdDeviation="1" />
                <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0.24 0" />
                <feBlend in2="shape" mode="normal" result={isStrategic ? "effect1_innerShadow_2002_256" : isEmpathic ? "effect1_innerShadow_2002_237" : "effect1_innerShadow_2002_242"} />
              </filter>
              <linearGradient gradientUnits="userSpaceOnUse" id={isStrategic ? `p0-strat-${id}` : isEmpathic ? `p0-emp-${id}` : `p0-tech-${id}`} x1={isStrategic ? "13.8907" : isEmpathic ? "16" : "11.3476"} x2={isStrategic ? "13.8907" : isEmpathic ? "16" : "11.3476"} y1={isStrategic ? "1.41881" : isEmpathic ? "0" : "10.2489"} y2={isStrategic ? "29.2003" : isEmpathic ? "27.6758" : "32.9373"}>
                <stop stopColor="#2CCB24" />
                <stop offset="1" stopColor="#20A25C" />
              </linearGradient>
              {isTechnicOrStrategic && (
                <linearGradient gradientUnits="userSpaceOnUse" id={isStrategic ? `p1-strat-${id}` : `p1-tech-${id}`} x1={isStrategic ? "20.1573" : "26.7467"} x2={isStrategic ? "20.1573" : "20.2559"} y1={isStrategic ? "0" : "6.19587"} y2={isStrategic ? "18.0529" : "12.6867"}>
                  <stop stopColor="#2CCB24" />
                  <stop offset="1" stopColor="#20A25C" />
                </linearGradient>
              )}
              {isStrategic && (
                <linearGradient gradientUnits="userSpaceOnUse" id={`p2-strat-${id}`} x1="13.8908" x2="13.8908" y1="7.01731" y2="23.6018">
                  <stop stopColor="#2CCB24" />
                  <stop offset="1" stopColor="#20A25C" />
                </linearGradient>
              )}
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}