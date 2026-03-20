// Functions
import clsx from "clsx";
// Components
import { Link } from "react-router";
// Styles
import "./ShelfLogo.css";

type ShelfLogoProps = {
  className?: string;
};

export const ShelfLogo = ({ className }: ShelfLogoProps) => {
  return (
    <Link className={clsx("shelf-logo", className)} to="/">
      <span>Shelf</span>
      <div className="shelf-logo__dot"></div>
    </Link>
  );
};
