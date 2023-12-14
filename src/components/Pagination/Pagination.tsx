import React, { useEffect, useState } from "react";
import s from "./Pagination.module.scss";
import { Link } from "react-router-dom";

interface IPaginationProps {
  lastPage: number;
  startPage: number;
  onChangePage: (page: number) => void;
}
interface IPaginationLink {
  symbol: string;
  link: string;
  page: number;
}
function createLinkObject(
  symbol: string | number,
  page: number,
): IPaginationLink {
  return {
    symbol: symbol.toString(),
    link: page === 1 ? "" : `?page=${page}`,
    page,
  };
}
const Pagination: React.FC<IPaginationProps> = ({
  lastPage,
  onChangePage,
  startPage,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(startPage);
  const [paginationLinks, setPaginationLinks] = useState<IPaginationLink[]>([]);
  const handleClick = (page: number) => {
    setCurrentPage(page);
    onChangePage(page);
  };
  useEffect(() => {
    setPaginationLinks([]);
    if (lastPage <= 1 || startPage > lastPage) return;
    if (currentPage <= 3) {
      for (let i = 1; i <= Math.min(lastPage, 3); i++) {
        setPaginationLinks((prev) => [...prev, createLinkObject(i, i)]);
      }
      if (lastPage > 4) {
        setPaginationLinks((prev) => [...prev, createLinkObject("...", 4)]);
        setPaginationLinks((prev) => [
          ...prev,
          createLinkObject(lastPage, lastPage),
        ]);
      }
      if (lastPage === 4) {
        setPaginationLinks((prev) => [...prev, createLinkObject(4, 4)]);
      }
    } else if (currentPage >= lastPage - 2) {
      setPaginationLinks((prev) => [...prev, createLinkObject(1, 1)]);
      setPaginationLinks((prev) => [
        ...prev,
        createLinkObject("...", lastPage - 3),
      ]);
      for (let i = Math.max(1, lastPage - 2); i <= lastPage; i++) {
        setPaginationLinks((prev) => [...prev, createLinkObject(i, i)]);
      }
    } else {
      setPaginationLinks((prev) => [...prev, createLinkObject(1, 1)]);
      setPaginationLinks((prev) => [
        ...prev,
        createLinkObject("...", currentPage - 2),
      ]);
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        setPaginationLinks((prev) => [...prev, createLinkObject(i, i)]);
      }
      setPaginationLinks((prev) => [
        ...prev,
        createLinkObject("...", currentPage + 2),
      ]);
      setPaginationLinks((prev) => [
        ...prev,
        createLinkObject(lastPage, lastPage),
      ]);
    }
  }, [currentPage, lastPage]);
  return (
    <div className={s.pagination}>
      {paginationLinks.map((item, i) => (
        <Link
          to={item.link}
          onClick={() => handleClick(item.page)}
          key={i}
          className={`${s.pagination_item} ${
            currentPage === item.page ? s.active : ""
          }`}
        >
          {item.symbol}
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
