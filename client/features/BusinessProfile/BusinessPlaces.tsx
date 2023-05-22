import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PlaceInterface } from "client/entities/business.entity";
import AddToFav from "./AddToFav";

import MySquad from "src/svg/flash.svg";
import Pin from "src/svg/pin.svg";
import Arrow from "src/svg/nav-arrow-right.svg";

interface Props {
  places: PlaceInterface[];
}

export default function BusinessPlaces({ places }: Props) {
  return (
    <div className="placeGrid">
      {places.map((place: PlaceInterface) => (
        <div className="placeCard" key={place.id}>
          <Link href={`/business/${place.id}`}>
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
          </Link>
          <Link href={`/business/${place.id}`}>
            <h2 className="placeCardName">
              {place.name}
              <Arrow className="placeCardArrow" width={24} height={24} />
            </h2>
          </Link>
          <div className="center">
            <p className="metaIconText">
              <Pin className="placeLocation" width={16} height={16} />
              {place.city}
            </p>
          </div>

          {place.description ? (
            <p className="mt5">
              {place.description.substring(0, 150) + " ..."}
            </p>
          ) : (
            <br />
          )}

          <div className="center">
            <div className="placeFavoriteCounter">
              <AddToFav placeId={place.id} favorites={place.favorites} />
              <MySquad
                className="favIcon"
                width={24}
                height={24}
                style={{ marginLeft: 20, stroke: "#3abff8" }}
              />
              <p>{place._count ? place._count.posts : 0}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
