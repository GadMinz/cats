import React, { useEffect, useState } from "react";
import { useFavoritesStore } from "../../store/favorites.ts";
import Cats from "../../components/Cats/Cats.tsx";
import Select from "../../components/Select/Select.tsx";
import { ISelectItem } from "../../types.ts";
import { sortCats } from "../../functions/sortCats.ts";
import { filterPrice } from "../../functions/filterCats.ts";
import MinMax from "../../components/MinMax/MinMax.tsx";

const sortFavorites: ISelectItem[] = [
  { id: "-date", title: "date(desc)" },
  { id: "date", title: "date(asc)" },
  { id: "price", title: "price(asc)" },
  { id: "-price", title: "price(desc)" },
];
const Favorites: React.FC = () => {
  const { cats, sort, setSort, filter,setFilterPrice } = useFavoritesStore();
  const [filteredCats, setFilteredCats] = useState(cats);

  useEffect(() => {
    setFilteredCats(
      sortCats(
        filterPrice(cats, filter.price.min, filter.price.max),
        sort,
        "favoritesAt",
      ),
    );
  }, [cats, sort, filter.price]);
  const render = () => {
    if (cats.length === 0) {
      return <div style={{ textAlign: "center" }}>Favorites is empty</div>;
    }
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            gap: "20px",
          }}
        >
          <MinMax onSubmit={setFilterPrice}/>
          <Select items={sortFavorites} onSelect={setSort} />
        </div>
        <Cats cats={filteredCats} />
      </div>
    );
  };
  return render();
};

export default Favorites;
