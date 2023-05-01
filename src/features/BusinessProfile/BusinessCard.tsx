import React, { useContext } from "react";
import Image from "next/image";
import { parseContent } from "src/utils/parseContent";

import Pin from "src/svg/pin.svg";
import { UserContext } from "src/context/UserContext";
import BusinessAddToFav from "./BusinessAddToFav";

interface Props {
  place: any;
  businessDispatch: React.Dispatch<any>;
}

const BusinessCard = ({ place, businessDispatch }: Props) => {
  const { userState } = useContext(UserContext);

  return (
    <div className="placeCard">
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
        <BusinessAddToFav
          dispatch={businessDispatch}
          userConnectedId={userState.id}
          placeId={place.id}
          favorites={place.favorites}
        />
      </div>
    </div>
  );
};
export default BusinessCard;
