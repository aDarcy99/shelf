// Types
import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
// Functions
import clsx from "clsx";
// Components
import { ToggleButton } from "../ToggleButton/ToggleButton";
// Styles
import "./SortBy.css";

type SortByProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  sortOptions: Array<{ content?: ReactNode; id: string }>;
  onSortChange?: (id: string) => void;
  id: string;
};

export const SortBy = ({
  sortOptions,
  onSortChange,
  id,
  ...props
}: SortByProps) => {
  const handleSortChange = (id: string) => {
    return () => {
      if (onSortChange) {
        onSortChange(id);
      }
    };
  };

  return (
    <div {...props} className={clsx("sort-by", props.className)}>
      <p className="sort-by__text">SORT</p>
      <div className="sort-by__buttons">
        {sortOptions.map((sortOption) => (
          <ToggleButton
            isToggled={sortOption.id === id}
            onClick={handleSortChange(sortOption.id)}
            key={sortOption.id}
          >
            {sortOption.content}
          </ToggleButton>
        ))}
      </div>
    </div>
  );
};
