import React from "react";
import s from "./Modal.module.scss";
import { useModalStore } from "../../store/modal.ts";

type ModalProps = {
  children: React.ReactNode;
};
const Modal: React.FC<ModalProps> = ({ children }) => {
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isModalOpen,
    state.closeModal,
  ]);
  return (
    isOpen && (
      <div className={s.modal} onClick={closeModal}>
        <div className={s.modal_wrapper} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
