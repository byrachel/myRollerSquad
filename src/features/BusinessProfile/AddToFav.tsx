import React, { useState } from "react";
import axios from "axios";

import Favorite from "src/svg/bookmark-empty.svg";
import { State, useStore } from "src/hooks/useStore";

interface Props {
  favorites: any;
  placeId: number;
}

const AddToFav = ({ favorites, placeId }: Props) => {
  const favs = favorites.map((elt: any) => elt.id);
  const [favCounter, setFavCounter] = useState(favorites.length);
  const userId = useStore((state: State) => state.userId);

  const addToMyFav = (id: number) => {
    if (!id) return;
    axios({
      method: "put",
      url: `/api/business/fav/${id}`,
    }).then((res) => setFavCounter(res.data.favorites.length));
  };

  return (
    <div className="placeFavoriteCounter">
      <Favorite
        className={favs.includes(userId) ? "favIconChecked" : "favIcon"}
        width={24}
        height={24}
        onClick={() => addToMyFav(placeId)}
      />
      <p>{favCounter}</p>
    </div>
  );
};
export default AddToFav;
