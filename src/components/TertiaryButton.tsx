import type { ComponentProps } from "react";

const RUBIK = "Rubik, sans-serif";

/**
 * Tertiary (ghost) action button — white, grey label, no border or shadow.
 *
 * The design specifies only the resting state, so the hover/pressed/disabled
 * treatments below are minimal additions for interactive feedback.
 * `enabled:` guards them so they never fight `disabled:`.
 */
export function TertiaryButton({
  className = "",
  style,
  fullWidth = true,
  ...props
}: ComponentProps<"button"> & { fullWidth?: boolean }) {
  return (
    <button
      {...props}
      style={{ fontFamily: RUBIK, ...style }}
      className={[
        fullWidth ? "w-full" : "w-auto",
        "h-[52px] rounded-[12px] px-[10px]",
        "flex items-center justify-center gap-[10px]",
        "text-[18px] font-medium tracking-[-0.36px] leading-none capitalize whitespace-nowrap",
        "transition-[background-color,color] duration-150",
        // default
        "bg-white text-[#727272]",
        // hover / pressed
        "enabled:hover:bg-[#f5f5f5] enabled:hover:text-[#383838]",
        "enabled:active:bg-[#ededed] enabled:active:text-[#383838]",
        // disabled
        "disabled:text-[#c9c9c9] disabled:cursor-not-allowed",
        "enabled:cursor-pointer",
        className,
      ].join(" ")}
    />
  );
}
