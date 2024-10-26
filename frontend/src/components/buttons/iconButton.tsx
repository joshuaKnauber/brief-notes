import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "small" | "medium";
};

export function IconButton({
  children,
  className,
  size = "medium",
  ...props
}: IconButtonProps) {
  return (
    <button
      className={twMerge(
        "shrink-0 hover:bg-black/10 transition-colors flex items-center justify-center rounded-md",
        size === "small" ? "size-6" : size === "medium" ? "size-8" : undefined,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
