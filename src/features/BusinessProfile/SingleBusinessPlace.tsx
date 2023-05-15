import React from "react";
import { PlaceInterface } from "src/interfaces/userInterfaces";

interface Props {
  place: PlaceInterface;
}

export default function SingleBusinessPlace({ place }: Props) {
  console.log(place);
  return <div>SingleBusinessPlace</div>;
}
