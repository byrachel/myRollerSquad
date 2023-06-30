import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import RegularButton from "src/components/buttons/RegularButton";
import { PlaceInterface } from "src/entities/business.entity";

import Pin from "src/svg/pin.svg";
import AddToFav from "./AddToFav";
import { parseContent } from "src/utils/parseContent";
import depts from "src/utils/frenchDepartments.json";

interface Props {
  place: PlaceInterface;
}

export default function SingleBusinessPlace({ place }: Props) {
  const router = useRouter();

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
    <div className="singlePlaceContainer">
      <div className="spaceBetween">
        <h1>{place.name}</h1>

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
          <p className="metaIconText">
            <Pin className="placeLocation" width={16} height={16} />
            {place.county
              ? `${departementToDisplay(place.county)}, `
              : null}{" "}
            {place.city} {place.country}
          </p>
          {place.description ? (
            <p className="mt5">{parseContent(place.description)}</p>
          ) : null}
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
