import React from "react";
import { PlaceInterface } from "src/interfaces/userInterfaces";

import Pending from "src/svg/hourglass.svg";

interface Props {
  place: PlaceInterface;
  isOwner: boolean;
}

export default function BusinessCard({ place, isOwner }: Props) {
  console.log(place);
  return place.active ? (
    <div className="ctaBox">
      <h3>{place.name}</h3>
    </div>
  ) : isOwner ? (
    <div className="ctaBox">
      <div>
        <h3>{place.name}</h3>
        <p>{place.website}</p>
      </div>
      <p className="metaBox">
        <Pending className="metaIcon" width={16} height={16} /> Validation en
        cours
      </p>
    </div>
  ) : null;
}
