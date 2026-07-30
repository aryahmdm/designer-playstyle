import type { ComponentProps } from "react";

const RUBIK = "Rubik, sans-serif";

/**
 * Secondary (outline) action button.
 *
 * Unlike PrimaryButton's inset lip, the secondary's depth is an *outer*
 * drop-shadow that follows the outline — pressing shrinks it 4px → 2px.
 * `enabled:` guards the interactive states so they never fight `disabled:`.
 *
 * Width is a prop rather than a className override so callers never need
 * tailwind-merge to resolve a `w-full` / `w-auto` conflict.
 */
export function SecondaryButton({
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
        "h-[52px] rounded-[12px] px-[10px] border-2 border-solid",
        "flex items-center justify-center gap-[10px]",
        "text-[18px] font-medium tracking-[-0.36px] leading-none capitalize whitespace-nowrap",
        "transition-[background-color,border-color,color,filter] duration-150",
        // default
        "bg-white border-[#6663fe] text-[#6663fe] drop-shadow-[0px_4px_0px_#cbcaff]",
        // hover
        "enabled:hover:bg-[#e5e4ff] enabled:hover:border-[#4f4ce3] enabled:hover:text-[#4f4ce3]",
        // pressed — shadow shrinks to 2px
        "enabled:active:bg-[#e5e4ff] enabled:active:border-[#4f4ce3] enabled:active:text-[#4f4ce3]",
        "enabled:active:drop-shadow-[0px_2px_0px_#cbcaff]",
        // disabled
        "disabled:bg-white disabled:border-[#d3d2ff] disabled:text-[#dad9ff]",
        "disabled:drop-shadow-[0px_4px_0px_#ededff] disabled:cursor-not-allowed",
        "enabled:cursor-pointer",
        className,
      ].join(" ")}
    />
  );
}
