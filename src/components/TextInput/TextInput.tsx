// Types
import type { DetailsHTMLAttributes } from "react";
// Functions
import clsx from "clsx";
// Styles
import "./TextInput.css";

export type TextInputProps = DetailsHTMLAttributes<HTMLInputElement> & {};

export const TextInput = ({ ...props }: TextInputProps) => {
  return (
    <input
      {...props}
      className={clsx("text-input", props.className)}
      type="text"
    />
  );
};
