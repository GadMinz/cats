import React from "react";
import s from "./CatModal.module.scss";
import Modal from "../Modal.tsx";
import { useModalStore } from "../../../store/modal.ts";

const CatModal: React.FC = () => {
  const content = useModalStore((state) => state.modalContent);
  const { tags, img } = content;
  return (
    <Modal>
      <div className={s.cat_modal}>
          <div className={s.tags}>
              {tags?.map((tag: string, i: number) => (
                  <div className={s.tags_item} key={i}>{tag}</div>
              ))}
          </div>
        <div className={s.cat_modal_img}>
          <img src={img} alt="" />
        </div>
      </div>
    </Modal>
  );
};

export default CatModal;
