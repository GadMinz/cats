import React from "react";
import s from "./Cats.module.scss";
import CatsItem from "./CatsItem.tsx";
import { ICat } from "../../types.ts";
import CatsLoader from "./CatsLoader.tsx";
import CatModal from "../Modals/CatModal/CatModal.tsx";
import { useModalStore } from "../../store/modal.ts";

interface ICatsProps {
  cats: ICat[];
  isLoading?: boolean;
}
const Cats: React.FC<ICatsProps> = ({ cats, isLoading = false }) => {
  const modalName = useModalStore((state) => state.modalName);
  const render = () => {
    if (isLoading) {
      return (
        <div className={s.cats}>
          {[...new Array(12)].map((_, i) => (
            <CatsLoader customClass={s.cats__item} key={i} />
          ))}
        </div>
      );
    }
    if (cats.length === 0) {
      return <div style={{textAlign: 'center'}}>Not found</div>;
    }
    return (
      <>
        <div className={s.cats}>
          {cats.map((item: ICat) => (
            <CatsItem key={item.id} cat={item} />
          ))}
        </div>
        {modalName === "cat" && <CatModal />}
      </>
    );
  };
  return render();
};

export default Cats;
