import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "../../styles/Modal.module.scss";

interface Props {
  show: boolean;
  setShow: (arg: boolean) => void;
  children: JSX.Element;
  title?: string;
}

function Modal({ show, setShow, children, title }: Props) {
  const [isBrowser, setIsBrowser] = useState(false);
  const modalWrapperRef = useRef(null);
  const modalRoot = isBrowser
    ? (document.getElementById("modal-root") as HTMLElement)
    : null;

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = () => {
    setShow(false);
  };

  const modalContent = show ? (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWrapper} ref={modalWrapperRef}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            {title && <h2 className={styles.modalTitle}>{title}</h2>}
            <div
              role="button"
              className={styles.modalCloseIcon}
              tabIndex={0}
              onClick={handleCloseClick}
              onKeyDown={handleCloseClick}
            >
              x
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  ) : null;

  return isBrowser && modalRoot
    ? ReactDOM.createPortal(modalContent, modalRoot)
    : null;
}

export default Modal;
