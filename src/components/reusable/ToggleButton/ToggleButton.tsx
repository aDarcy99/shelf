// Types
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
// Functions
import clsx from "clsx";
// Styles
import "./ToggleButton.css";

type ToggleButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  isIconOnly?: boolean;
  isToggled?: boolean;
};

export const ToggleButton = ({
  children,
  isIconOnly = false,
  isToggled = false,
  ...props
}: ToggleButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        "toggle-button",
        isIconOnly && "toggle-button--icon-only",
        props.className,
      )}
      aria-pressed={isToggled}
    >
      {children}
    </button>
  );
};
