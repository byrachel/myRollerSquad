import React from "react";

import { Radio } from "@nextui-org/react";

interface LightPlaceInterface {
  id: number;
  active: boolean;
  name: string;
}

interface Props {
  userConnectedId: number;
  userPlaces: LightPlaceInterface[];
  userName: string;
}

export default function SelectAuthor({
  userConnectedId,
  userPlaces,
  userName,
}: Props) {
  const userPlacesActive = userPlaces?.filter(
    (place: LightPlaceInterface) => place.active
  );

  return userPlacesActive && userPlacesActive.length > 0 ? (
    <>
      <label htmlFor="author" className="authorLabel">
        Publier en tant que :
      </label>
      <Radio.Group
        name="author"
        defaultValue={`user_${userConnectedId}`}
        orientation="horizontal"
        aria-label="author"
      >
        <Radio value={`user_${userConnectedId}`} size="xs" color="secondary">
          {userName}
        </Radio>
        {userPlacesActive.map((elt: { id: number; name: string }) => (
          <Radio
            key={elt.id}
            value={`place_${elt.id}`}
            size="xs"
            color="secondary"
          >
            {elt.name}
          </Radio>
        ))}
      </Radio.Group>
    </>
  ) : null;
}
