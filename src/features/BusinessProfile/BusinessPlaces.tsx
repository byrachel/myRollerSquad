import React from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { parseContent } from "src/utils/parseContent";

import Pin from "src/svg/pin.svg";
import AddToFav from "./AddToFav";

const breakpointColumnsObj = {
  default: 3,
  1600: 2,
  768: 1,
};

export default function BusinessPlaces({ places }: any) {
  return (
    <div className="placeContainer">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {places.length > 0
          ? places.map((place: any) => (
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
                  <AddToFav placeId={place.id} favorites={place.favorites} />
                </div>
              </div>
            ))
          : null}
      </Masonry>
    </div>
  );
}
