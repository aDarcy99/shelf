// Types
import type { OpenLibrarySearchBook } from "../../../OpenLibrary/openLibrary.schema";
// Assets
import { BookIcon } from "../../../../assets/icons/BookIcon";
// Styles
import "./BookCover.css";
import clsx from "clsx";

type BookCoverProps = {
  className?: string;
  book: OpenLibrarySearchBook;
};

export const BookCover = ({ book, className }: BookCoverProps) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : undefined;

  if (!coverUrl) {
    return (
      <div className={clsx("book-cover", "book-cover--placeholder", className)}>
        <BookIcon />
        <p>{book.title}</p>
      </div>
    );
  }

  return (
    <img
      className={clsx("book-cover", className)}
      src={coverUrl}
      alt={`${book.title} Cover`}
    />
  );
};
