// Types
import type { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";
// Functions
import clsx from "clsx";
// Styles
import "./TextInput.css";

export type TextInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  rootProps?: DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
};

export const TextInput = ({
  rootProps,
  startAdornment,
  endAdornment,
  ...props
}: TextInputProps) => {
  return (
    <div
      {...rootProps}
      className={clsx("text-input__root", rootProps?.className)}
    >
      {startAdornment}
      <input
        {...props}
        className={clsx("text-input", props.className)}
        type="text"
      />
      {endAdornment}
    </div>
  );
};
