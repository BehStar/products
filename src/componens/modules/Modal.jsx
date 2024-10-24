import { useRef, useEffect } from "react";
import { useModal } from "../../providers-contexts/ModalContext";

import styles from "./Modal.module.css";

const Modal = () => {
  const { modal, toggleModal } = useModal();
  const modalRef = useRef(null);

  const closeModal = () => {
    modalRef.current.classList.add(styles.out);
    setTimeout(() => {
      toggleModal(false, "", "", null);
      modalRef.current.classList.remove(styles.out);
    }, 500);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.modal}`)
      ) {
        closeModal();
      }
    };

    if (modal.isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [modal.isVisible]);

  const handleClose = (e) => {
    e.stopPropagation();
    closeModal();
  };

  const handleConfirm = (e) => {
    e.stopPropagation();
    if (modal.isVisible && modal.onConfirm) {
      modal.onConfirm();
    }
    closeModal();
  };

  return (
    <div className={styles.modalContainer} ref={modalRef} onClick={handleClose}>
      <div className={styles.modalBackground}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>{modal.header}</div>
          <p>{modal.message}</p>
          <div className={styles.btnsWrapper}>
            <button onClick={handleConfirm}>تایید</button>
            <button onClick={handleClose}>لغو</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
