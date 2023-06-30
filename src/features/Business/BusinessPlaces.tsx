import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MiniPlaceInterface } from "src/entities/business.entity";
import AddToFav from "./AddToFav";

import MySquad from "src/svg/flash.svg";
import Pin from "src/svg/pin.svg";
import Arrow from "src/svg/nav-arrow-right.svg";
import { parseContent } from "src/utils/parseContent";
import depts from "src/utils/frenchDepartments.json";

interface Props {
  places: MiniPlaceInterface[];
}

export default function BusinessPlaces({ places }: Props) {
  const departementToDisplay = (dept: string) => {
    interface FrenchDept {
      num_dep: string;
      dep_name: string;
    }
    const departement = depts.find(
      (item) => item.num_dep === dept
    ) as FrenchDept;
    return departement ? departement.dep_name : "";
  };

  return (
    <div className="placeGrid">
      {places.map((place: MiniPlaceInterface) => (
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
              {departementToDisplay(place.county)}
            </p>
          </div>

          {place.description ? (
            <div className="mt5">
              {parseContent(place.description.substring(0, 200) + " ...")}
            </div>
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
