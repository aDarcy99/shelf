import clsx from "clsx";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
// Styles
import "./Button.css";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {};

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={clsx("button", props.className)}>
      {children}
    </button>
  );
};

export default Button;
