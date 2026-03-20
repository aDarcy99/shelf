// Types
import type { DetailedHTMLProps, HTMLAttributes } from "react";
// Functions
import clsx from "clsx";
// Styles
import "./Tag.css";

type TagProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

export const Tag = ({ children, className, ...props }: TagProps) => {
  return (
    <div {...props} className={clsx("tag", className)}>
      {children}
    </div>
  );
};
