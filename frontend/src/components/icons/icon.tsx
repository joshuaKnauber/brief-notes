import { twMerge } from "tailwind-merge";

type IconProps = {
  icon: React.ReactNode;
  className?: string;
  size?: "small" | "medium";
  filled?: boolean;
};

export function Icon({ icon, className, size = "medium", filled }: IconProps) {
  return (
    <div
      className={twMerge(
        "[&_svg]:text-black",
        filled && "[&_svg]:fill-black",
        size === "small"
          ? "[&_svg]:size-4"
          : size === "medium"
            ? "[&_svg]:size-5"
            : undefined,
        className
      )}
    >
      {icon}
    </div>
  );
}
