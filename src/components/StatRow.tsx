import StatBar from "@/components/StatBar";

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
  return (
    <div className="flex items-start justify-between w-full px-2">
      <div className="flex flex-col items-center gap-[12px]">
        <StatBar property1="Technic" value={String(technic) as any} />
        <p className="text-[13px] font-semibold italic text-[rgba(30,30,30,0.64)] tracking-[-0.39px] leading-none text-center">
          Technic
        </p>
      </div>
      <div className="flex flex-col items-center gap-[12px]">
        <StatBar property1="Empathic" value={String(empathic) as any} />
        <p className="text-[13px] font-semibold italic text-[rgba(30,30,30,0.64)] tracking-[-0.39px] leading-none text-center">
          Empathic
        </p>
      </div>
      <div className="flex flex-col items-center gap-[12px]">
        <StatBar property1="Strategic" value={String(strategic) as any} />
        <p className="text-[13px] font-semibold italic text-[rgba(30,30,30,0.64)] tracking-[-0.39px] leading-none text-center">
          Strategic
        </p>
      </div>
    </div>
  );
}
