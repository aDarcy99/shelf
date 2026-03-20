// Types
import {
  useEffect,
  useState,
  type ChangeEvent,
  type DetailedHTMLProps,
  type HTMLAttributes,
} from "react";
// Components
import { TextInput } from "../TextInput/TextInput";
import { Button } from "../Button/Button";
// Assets
import { LeftArrowIcon } from "../../../assets/icons/LeftArrowIcon";
import { RightArrowIcon } from "../../../assets/icons/RightArrowIcon";
// Styles
import "./Pagination.css";
import clsx from "clsx";

type PaginationProps = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "onChange"
> & {
  onChange: (page: number) => void;
  page: number;
  totalPages: number;
};

export const Pagination = ({
  onChange,
  page,
  totalPages,
  ...props
}: PaginationProps) => {
  const [paginationValue, setPaginationValue] = useState(page.toString());

  useEffect(() => {
    setPaginationValue(page.toString());
  }, [page]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaginationValue(e.target.value);
  };

  const handleInputBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setPaginationValue(page.toString());
      return;
    }

    const parsedNumber = Number(value);

    if (Number.isNaN(parsedNumber)) {
      setPaginationValue(page.toString());
      return;
    }

    const clampedNumber = Math.min(Math.max(parsedNumber, 1), totalPages);

    setPaginationValue(clampedNumber.toString());
    onChange(clampedNumber);
  };

  const onPageChange = (direction: "previous" | "next") => {
    return () => {
      switch (direction) {
        case "previous":
          if (page <= 1) {
            return;
          }

          onChange(page - 1);
          break;

        case "next":
        default:
          if (page >= totalPages) {
            return;
          }

          onChange(page + 1);
          break;
      }
    };
  };

  return (
    <div {...props} className={clsx("pagination", props.className)}>
      <Button
        className="pagination__button"
        isIconOnly
        aria-label="Go to previous page"
        onClick={onPageChange("previous")}
      >
        <LeftArrowIcon />
      </Button>

      <TextInput
        aria-label="Go to page"
        className="pagination__input"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        value={paginationValue}
        type="number"
      />

      <div className="pagination__total">of {totalPages} pages</div>

      <Button
        className="pagination__button"
        isIconOnly
        aria-label="Go to next page"
        onClick={onPageChange("next")}
      >
        <RightArrowIcon />
      </Button>
    </div>
  );
};
