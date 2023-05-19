import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import RegularButton from "@/components/buttons/RegularButton";
import { PlaceInterface } from "src/interfaces/userInterfaces";

import Pin from "src/svg/pin.svg";
import AddToFav from "./AddToFav";

interface Props {
  place: PlaceInterface;
}

export default function SingleBusinessPlace({ place }: Props) {
  const router = useRouter();

  return (
    <div className="singlePlaceContainer">
      <div className="spaceBetween">
        <div></div>

        <RegularButton
          text="retour"
          type="button"
          style="full"
          onClick={() => router.back()}
        />
      </div>

      <div className="singlePlace">
        <Image
          src={
            place.logo
              ? `https://myrollerbusinesslogo.s3.eu-west-3.amazonaws.com/${place.logo}`
              : "/img/myrollersquad_avatar.jpeg"
          }
          alt="Club de Roller Quad Logo"
          width={140}
          height={140}
          className="singlePlaceLogo"
        />
        <div className="singlePlaceDescription">
          <h1>{place.name}</h1>
          <p className="metaIconText">
            <Pin className="placeLocation" width={16} height={16} />
            {place.county ? `${place.county}, ` : null} {place.city}
          </p>
          <p className="mt5">{place.description}</p>
          <br />
          {place.website ? (
            <a href={place.website} className="textLink">
              {place.website}
            </a>
          ) : null}
          <div className="placeFavoriteCounter mt5">
            <AddToFav placeId={place.id} favorites={place.favorites} /> skaters
            l'ont mis en favoris.
          </div>
        </div>
      </div>
    </div>
  );
}
