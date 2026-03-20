// Functions
import clsx from "clsx";
// Styles
import "./ShelfLogo.css";

type ShelfLogoProps = {
  className?: string;
};

export const ShelfLogo = ({ className }: ShelfLogoProps) => {
  return (
    <a className={clsx("shelf-logo", className)} href="/">
      <span>Shelf</span>
      <div className="shelf-logo__dot"></div>
    </a>
  );
};
