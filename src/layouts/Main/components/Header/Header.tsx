// Types
import type { ChangeEvent } from "react";
// Functions
import { useEffect, useState } from "react";
import { useDebouncedState } from "../../../../utilities/hooks/useDebouncedState";
import { useNavigate, useSearchParams } from "react-router";
// Components
import { SearchIcon } from "../../../../assets/icons/SearchIcon";
import { TextInput } from "../../../../components/reusable/TextInput/TextInput";
import { ShelfLogo } from "../../../../components/ShelfLogo/ShelfLogo";
// Styles
import "./Header.css";

type HeaderProps = object;

export const Header = ({ ...props }: HeaderProps) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [searchInputValue, setSearchInputValue] = useState(
    searchParams.get("search") || "",
  );
  const debouncedSearchInputValue = useDebouncedState({
    value: searchInputValue,
    delay: 500,
  });

  const onSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value);
  };

  useEffect(() => {
    if (!debouncedSearchInputValue) {
      return;
    }
    const searchParams = new URLSearchParams();

    searchParams.append("search", debouncedSearchInputValue);

    navigate(`/books/?${searchParams.toString()}`);
  }, [debouncedSearchInputValue, navigate]);

  return (
    <header {...props} className="header">
      <div className="header__inner">
        <ShelfLogo className="header__logo" />
        <TextInput
          rootProps={{ className: "header__input" }}
          placeholder="Search books, authors, subjects..."
          startAdornment={<SearchIcon />}
          value={searchInputValue}
          onChange={onSearchInputChange}
        />
      </div>
    </header>
  );
};
