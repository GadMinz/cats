import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header.tsx";
import s from "./Layout.module.scss";
import { useModalStore } from "../../store/modal.ts";

const Layout: React.FC = () => {
  const isOpen = useModalStore((state) => state.isModalOpen);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  return (
    <div className={s.wrapper}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
