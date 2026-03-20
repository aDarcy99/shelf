import clsx from "clsx";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
// Styles
import "./Button.css";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  isIconOnly?: boolean;
  variant?: "primary" | "unset";
};

export const Button = ({
  children,
  isIconOnly = false,
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        "button",
        isIconOnly && "button--icon-only",
        variant && `button--variant-${variant}`,
        props.className,
      )}
    >
      {children}
    </button>
  );
};
