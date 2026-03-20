// Types
import type { OpenLibrarySearchBook } from "../../../OpenLibrary/openLibrary.schema";
// Assets
// Styles
import "./BookCard.css";
import { Fragment } from "react/jsx-runtime";
import clsx from "clsx";
import { BookCover } from "../BookCover/BookCover";

type Props = { book: OpenLibrarySearchBook; variant: "row" | "grid" };

export const BookCard = ({ book, variant = "grid" }: Props) => {
  return (
    <div className={clsx("book-card", variant && `book-card--${variant}`)}>
      <div className="book-card__image-section">
        <BookCover book={book} />
      </div>
      <div className="book-card__text-section">
        <div className="book-card__title" title={book.title}>
          {book.title}
        </div>
        <p
          className="book-card__authors"
          title={book.author_name?.join(",") ?? "No author listed"}
        >
          {book.author_name?.map((author, authorIdx) => (
            <Fragment key={authorIdx}>
              <span className="book-card__author">{author}</span>
              {authorIdx < book.author_name!.length - 1 ? ", " : null}
            </Fragment>
          )) ?? <span className="book-card__author">No author listed</span>}
        </p>
      </div>
    </div>
  );
};
