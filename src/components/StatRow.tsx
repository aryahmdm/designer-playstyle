import StatBar from "@/components/StatBar";

const RUBIK = "Rubik, sans-serif";

const STATS = [
  { key: "Technic", label: "Technic" },
  { key: "Empathic", label: "Empathic" },
  { key: "Strategic", label: "Strategic" },
] as const;

// --- Stat Bar Row ---
export function StatRow({
  technic,
  empathic,
  strategic,
}: {
  technic: number;
  empathic: number;
  strategic: number;
}) {
  const values: Record<(typeof STATS)[number]["key"], number> = {
    Technic: technic,
    Empathic: empathic,
    Strategic: strategic,
  };

  return (
    <div className="flex items-center justify-between px-[16px] w-full">
      {STATS.map(({ key, label }) => (
        <div key={key} className="flex flex-col gap-[12px] items-center shrink-0 w-[80px]">
          {/* 80px slot; the gauge ring overflows it by 2px on each side, per the design */}
          <div className="h-[80px] w-full relative">
            <StatBar
              className="absolute left-[-2px] top-[-2px] size-[84px]"
              property1={key}
              value={String(Math.max(0, Math.min(7, values[key]))) as any}
            />
          </div>
          <p
            className="w-full text-center text-[14px] font-semibold italic text-[rgba(30,30,30,0.64)] tracking-[-0.42px] leading-none"
            style={{ fontFamily: RUBIK }}
          >
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
