// Types
import { useState, type ReactNode } from "react";
import type {
  OpenLibrarySearchBook,
  OpenLibrarySortTypes,
} from "../../../OpenLibrary/openLibrary.schema";
// Functions
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { openLibraryQueries } from "../../../OpenLibrary/openLibrary.query";
// Components
import { MainLayout } from "../../../../layouts/Main/Main.layout";
import { List } from "../../../../components/reusable/List/List";
import { BookCard } from "../../components/BookCard/BookCard";
import { SortBy } from "../../../../components/reusable/SortBy/SortBy";
import { ToggleButton } from "../../../../components/reusable/ToggleButton/ToggleButton";
import { Button } from "../../../../components/reusable/Button/Button";
import { Pagination } from "../../../../components/reusable/Pagination/Pagination";
import { BookModal } from "../../components/BookDetailsModal/BookDetailsModal";
// Assets
import { GridIcon } from "../../../../assets/icons/GridIcon";
import { RowIcon } from "../../../../assets/icons/RowIcon";
// Styles
import "./Search.page.css";

const SORT_OPTIONS: Array<{ content: ReactNode; id: OpenLibrarySortTypes }> = [
  { content: <>Relevance</>, id: "default" },
  { content: <>Newest</>, id: "new" },
  { content: <>Oldest</>, id: "old" },
  { content: <>Most editions</>, id: "editions" },
];

export const SearchPage = () => {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [modalBookKey, setModalBookKey] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const [displayBy, setDisplayBy] = useState<"grid" | "row">("grid");

  const pageValue = parseInt(searchParams.get("page") || "1", 10);
  const sortByValue = searchParams.get("sort-by") || "default";
  const searchValue = searchParams.get("search");

  const {
    data: openLibrarySearchBookResults,
    isLoading: isOpenLibrarySearchBookResultsLoading,
  } = useQuery(
    openLibraryQueries.searchBooks({
      query: searchValue || "",
      page: pageValue,
      sortBy: sortByValue as OpenLibrarySortTypes,
    }),
  );

  const modalBook: OpenLibrarySearchBook | undefined =
    openLibrarySearchBookResults?.items.find(
      (book) => book.key === modalBookKey,
    );

  const onSortByChange = (key: string) => {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set("sort-by", key);
      return prevSearchParams;
    });
  };

  const onDisplayByChange = (display: "grid" | "row") => {
    return () => {
      setDisplayBy(display);
    };
  };

  const onCardModalToggle =
    (newSelectedBook: OpenLibrarySearchBook | null) => () => {
      setModalBookKey(newSelectedBook?.key ?? null);
      setIsCardModalOpen(!isCardModalOpen);
    };

  const onPaginationChange = (value: number) => {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set("page", value.toString());

      return prevSearchParams;
    });
  };

  return (
    <>
      <MainLayout className="search-page">
        <div className="search-page__options">
          <SortBy
            className="search-page__sort-by"
            sortOptions={SORT_OPTIONS}
            onSortChange={onSortByChange}
            id={sortByValue}
          />
          <div className="search-page__display-by">
            <ToggleButton
              isIconOnly
              isToggled={displayBy === "row"}
              onClick={onDisplayByChange("row")}
            >
              <RowIcon />
            </ToggleButton>
            <ToggleButton
              isIconOnly
              isToggled={displayBy === "grid"}
              onClick={onDisplayByChange("grid")}
            >
              <GridIcon />
            </ToggleButton>
          </div>
        </div>

        <div className="search-page__header">
          <h2>Search results for "{searchValue}"</h2>
        </div>
        <List className="search-page__list" variant={displayBy}>
          {openLibrarySearchBookResults?.items.map((openLibrarySearchBook) => (
            <Button
              key={openLibrarySearchBook.key}
              variant="unset"
              onClick={onCardModalToggle(openLibrarySearchBook)}
            >
              <BookCard book={openLibrarySearchBook} variant={displayBy} />
            </Button>
          ))}
        </List>
        {!isOpenLibrarySearchBookResultsLoading && (
          <Pagination
            className="search-page__pagination"
            onChange={onPaginationChange}
            page={pageValue}
            totalPages={openLibrarySearchBookResults?.totalPages ?? 1}
          />
        )}
      </MainLayout>
      {!!modalBook && (
        <BookModal
          isOpen={isCardModalOpen}
          onClose={onCardModalToggle(null)}
          book={modalBook}
        />
      )}
    </>
  );
};
