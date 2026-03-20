// Types
import {
  useEffect,
  useRef,
  type DetailedHTMLProps,
  type HTMLAttributes,
  type ReactNode,
} from "react";
// Functions
import clsx from "clsx";
import { createPortal } from "react-dom";
import { noop } from "../../../utilities/function.utilities";
// Components
import { Button } from "../Button/Button";
// Assets
import { CloseIcon } from "../../../assets/icons/CloseIcon";
// Styles
import "./Modal.css";

export type ModalProps = {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
  isOverlayCloseable?: boolean;
  hasCloseButton?: boolean;
  contentProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
};

export const Modal = ({
  children,
  isOpen,
  onClose,
  isOverlayCloseable = true,
  hasCloseButton = true,
  contentProps,
}: ModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Lock scroll outside of modal while open.
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "initial";
    };
  });

  // Accessibility focus on content.
  useEffect(() => {
    if (isOpen) {
      contentRef.current?.focus();
    }
  }, [isOpen]);

  // Accessibility close modal when pressing escape.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return isOpen
    ? createPortal(
        <div className="modal" role="dialog" aria-modal="true">
          <div
            className="modal__overlay"
            onClick={isOverlayCloseable ? onClose : noop}
          />
          <div
            {...contentProps}
            ref={contentRef}
            className={clsx("modal__content", contentProps?.className)}
            tabIndex={-1}
          >
            {hasCloseButton && (
              <Button
                className="modal__close-button"
                isIconOnly
                onClick={onClose}
                aria-label="Close modal"
              >
                <CloseIcon />
              </Button>
            )}
            {children}
          </div>
        </div>,
        document.body,
      )
    : null;
};
