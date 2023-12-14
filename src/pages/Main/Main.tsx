import React, { useEffect, useState } from "react";
import Cats from "../../components/Cats/Cats.tsx";
import { useCatsStore } from "../../store/cats.ts";
import Pagination from "../../components/Pagination/Pagination.tsx";
import { useSearchParams } from "react-router-dom";

const itemsOnPage: number = 12;
const Main: React.FC = () => {
  const [cats, isLoading, fetchCats, count] = useCatsStore((state) => [
    state.cats,
    state.isLoading,
    state.fetchCats,
    state.count,
  ]);
  const [lastPage, setLastPage] = useState(0);
  const [searchParams] = useSearchParams();
  const startPage: number = Number(searchParams.get("page")) || 1;
  const getCats = (page: number) => {
    fetchCats(itemsOnPage, itemsOnPage * (+page-1));
  };
  useEffect(() => {
    setLastPage(Math.ceil(count / itemsOnPage));
  }, [count]);
  useEffect(() => {
    getCats(startPage);
  }, []);
  return (
    <div>
      <Cats cats={cats} isLoading={isLoading} />
      {!isLoading && (
        <Pagination
          startPage={startPage}
          lastPage={lastPage}
          onChangePage={getCats}
        />
      )}
    </div>
  );
};

export default Main;
