import React from "react";
import Image from "next/image";
// import { parseContent } from "src/utils/parseContent";
import { PlaceInterface } from "src/interfaces/userInterfaces";
import AddToFav from "./AddToFav";
import MySquad from "src/svg/flash.svg";

import Pin from "src/svg/pin.svg";

interface Props {
  places: PlaceInterface[];
}

export default function BusinessPlaces({ places }: Props) {
  console.log("places", places);
  return (
    <div className="placeContainer">
      {places.map((place: PlaceInterface) => (
        <div className="placeCard" key={place.id}>
          <Image
            src={
              place.logo
                ? `https://myrollerbusinesslogo.s3.eu-west-3.amazonaws.com/${place.logo}`
                : "/img/myrollersquad_avatar.jpeg"
            }
            alt="Club de Roller Quad Logo"
            className="rollerPlaceLogo"
            width={140}
            height={140}
          />
          <h2 className="placeCardName">{place.name}</h2>
          <div className="center">
            <p className="metaIconText">
              <Pin className="placeLocation" width={16} height={16} />
              {place.city}
            </p>
          </div>
          <p className="mt5">
            {/* {parseContent(place.description)} */}
            {place.description.substring(0, 150) + " ..."}
          </p>

          <div className="center">
            <a href={place.website} className="placeUrl">
              {place.website}
            </a>
            <div className="placeFavoriteCounter">
              <AddToFav placeId={place.id} favorites={place.favorites} />
              <MySquad
                className="favIcon"
                width={24}
                height={24}
                style={{ marginLeft: 20, stroke: "#3abff8" }}
              />
              <p>{place.posts.length}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
