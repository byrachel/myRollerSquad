import React from "react";
import axios from "axios";

import Favorite from "views/svg/bookmark-empty.svg";

interface Props {
  favorites: any;
  dispatch: React.Dispatch<any>;
  placeId: number;
  userConnectedId: number | null;
}

const BusinessAddToFav = ({
  favorites,
  dispatch,
  userConnectedId,
  placeId,
}: Props) => {
  const favs = favorites.map((elt: any) => elt.id);

  const addToMyFav = (id: number) => {
    if (!id) return;
    axios({
      method: "put",
      url: `/api/business/fav/${id}`,
    }).then((res) => {
      dispatch({
        type: "ADD_TO_MY_FAV",
        payload: { id, favorites: res.data.favorites },
      });
    });
  };

  return (
    <div className="placeFavoriteCounter">
      <Favorite
        className={
          favs.includes(userConnectedId) ? "favIconChecked" : "favIcon"
        }
        width={24}
        height={24}
        onClick={() => addToMyFav(placeId)}
      />
      <p>{favorites.length}</p>
    </div>
  );
};
export default BusinessAddToFav;
