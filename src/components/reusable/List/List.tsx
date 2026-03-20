// Types
import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
// Functions
import clsx from "clsx";
// Styles
import "./List.css";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  variant?: "row" | "grid";
  children?: ReactNode;
};

export const List = ({
  variant = "row",
  className,
  children,
  ...props
}: Props) => {
  return (
    <div
      {...props}
      className={clsx("list", `list--variant-${variant}`, className)}
    >
      {children}
    </div>
  );
};
