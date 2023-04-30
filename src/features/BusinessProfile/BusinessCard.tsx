import React, { useContext } from "react";
import axios from "axios";
import Image from "next/image";
import { parseContent } from "src/utils/parseContent";

import Pin from "src/svg/pin.svg";
import Favorite from "src/svg/bookmark-empty.svg";
import { UserContext } from "src/context/UserContext";

interface Props {
  place: any;
  businessDispatch: React.Dispatch<any>;
}

const BusinessCard = ({ place, businessDispatch }: Props) => {
  const { userState } = useContext(UserContext);
  const favs = place.favorites.map((elt: any) => elt.id);

  const addToMyFav = (id: string) => {
    if (!id) return;
    axios({
      method: "put",
      url: `/api/business/fav/${id}`,
    })
      .then((res) => {
        businessDispatch({
          type: "ADD_TO_MY_FAV",
          payload: { id, favorites: res.data.favorites },
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="placeCard">
      <Image
        src="/img/myrollersquad_avatar.jpeg"
        alt="Club de Roller Quad"
        className="rollerPlaceLogo"
        width={140}
        height={140}
      />
      <h2 className="placeCardName">{place.name}</h2>
      <div className="center">
        <p className="meta flexStart">
          <Pin className="placeLocation" width={16} height={16} />
          {place.city}
        </p>
      </div>
      <p className="mt5">{parseContent(place.description)}</p>

      <div className="center">
        <a href={place.website} className="placeUrl">
          {place.website}
        </a>
        <div className="meta placeFavoriteCounter">
          <Favorite
            className={
              favs.includes(userState.id) ? "favIconChecked" : "favIcon"
            }
            width={24}
            height={24}
            onClick={() => addToMyFav(place.id)}
          />
          <p>{place.favorites.length}</p>
        </div>
      </div>
    </div>
  );
};
export default BusinessCard;
