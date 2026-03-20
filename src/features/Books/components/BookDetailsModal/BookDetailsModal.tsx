// Types
import { useQuery } from "@tanstack/react-query";
import type { ModalProps } from "../../../../components/reusable/Modal/Modal";
import type { OpenLibrarySearchBook } from "../../../OpenLibrary/openLibrary.schema";
// Components
import { Modal } from "../../../../components/reusable/Modal/Modal";
import { openLibraryQueries } from "../../../OpenLibrary/openLibrary.query";
import { OPEN_LIBRARY_BASE_URL } from "../../../OpenLibrary/openLibrary.constants";
import { BookCover } from "../BookCover/BookCover";
import { Tag } from "../../../../components/reusable/Tag/Tag";
// Styles
import "./BookDetailsModal.css";

type BookModalProps = Omit<ModalProps, "children"> & {
  book: OpenLibrarySearchBook;
};

export const BookModal = ({ book, isOpen, onClose }: BookModalProps) => {
  const { data: bookDetails } = useQuery(
    openLibraryQueries.getBookDetailsByKey({ key: book?.key }),
  );

  const renderBookDescription = () => {
    if (typeof bookDetails?.description === "string") {
      return bookDetails?.description;
    }

    if (typeof bookDetails?.description === "object") {
      return bookDetails.description.value;
    }

    return "No description available...";
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentProps={{ className: "book-modal" }}
    >
      <div className="book-modal__aside">
        <BookCover book={book} />
      </div>
      <div className="book-modal__main">
        <h2 className="book-modal__title">{book?.title}</h2>
        <p className="book-modal__authors">
          by {book?.author_name?.join(",") ?? "No author listed"}
        </p>
        <div className="book-modal__published-section">
          <div className="book-modal__published">
            <h3 className="book-modal__published-header">First published</h3>
            <p>{book.first_publish_year ?? "Unknown"}</p>
          </div>
          <div className="book-modal__published">
            <h3 className="book-modal__published-header">Editions</h3>
            <p>{book.edition_count ?? "Unknown"}</p>
          </div>
        </div>
        <div className="book-modal__tags">
          {!bookDetails?.subjects ? (
            <p>No tags available...</p>
          ) : (
            bookDetails.subjects.map((tag) => <Tag>{tag}</Tag>)
          )}
        </div>

        <div className="book-modal__description">{renderBookDescription()}</div>

        <a href={`${OPEN_LIBRARY_BASE_URL}${book?.key}`} target="_blank">
          View on Open Library ↗
        </a>
      </div>
    </Modal>
  );
};
