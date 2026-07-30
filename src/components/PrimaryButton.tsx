import type { ComponentProps } from "react";

const RUBIK = "Rubik, sans-serif";

/**
 * Primary action button.
 *
 * The 3D lip is an *inset* bottom shadow, so it lives inside the button's own
 * height rather than casting below it — pressing shrinks the lip 4px → 2px.
 * `enabled:` guards the interactive states so they never fight `disabled:`.
 *
 * Width is a prop rather than a className override so callers never need
 * tailwind-merge to resolve a `w-full` / `w-auto` conflict.
 */
export function PrimaryButton({
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
        "text-[#f5f5f5] text-[18px] font-medium tracking-[-0.36px] leading-none capitalize whitespace-nowrap",
        "transition-[background-color,box-shadow] duration-150",
        // default
        "bg-[#6663fe] shadow-[inset_0px_-4px_0px_0px_#524fce]",
        // hover
        "enabled:hover:bg-[#4f4ce3] enabled:hover:shadow-[inset_0px_-4px_0px_0px_#423fc2]",
        // pressed — lip shrinks to 2px
        "enabled:active:bg-[#4f4ce3] enabled:active:shadow-[inset_0px_-2px_0px_0px_#423fc2]",
        // disabled
        "disabled:bg-[#c0bfff] disabled:shadow-[inset_0px_-4px_0px_0px_#b8b7ff] disabled:cursor-not-allowed",
        "enabled:cursor-pointer",
        className,
      ].join(" ")}
    />
  );
}
