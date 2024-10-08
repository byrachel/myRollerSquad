import React from "react";
import { useRouter } from "next/router";

import UserBusinessLogo from "../UserProfile/UserBusiness/UserBusinessLogo";
import UpdateDeleteIcons from "views/components/buttons/UpdateDeleteIcons";
import { getBusinessCategoryName } from "views/constants/BusinessCategories";
import { parseContent } from "views/utils/parseContent";
import { removeUserPlace } from "../UserProfile/utils/services";
import { PlaceInterface } from "models/entities/business.entity";

import Pin from "views/svg/pin.svg";
import Fav from "views/svg/bookmark-empty.svg";

interface Props {
  place: PlaceInterface;
  userId: number;
  updateUserPlace: (place: PlaceInterface) => void;
  deleteUserPlace: (placeId: number) => void;
}

export default function MyBusinessPlace({
  place,
  userId,
  updateUserPlace,
  deleteUserPlace,
}: Props) {
  const router = useRouter();

  const deleteBusiness = async (id: number) => {
    const removed = await removeUserPlace(id);
    if (removed === "SUCCESS") deleteUserPlace(id);
  };

  return (
    <div className="rollerSkaterBusinessBox">
      <div className="rollerBusinessLogo">
        <UserBusinessLogo
          updateUserPlace={updateUserPlace}
          placeId={place.id}
          placeLogo={place.logo ? place.logo : null}
          userId={userId}
        />
      </div>
      <div className="rollerBusinessResume">
        <UpdateDeleteIcons
          onUpdate={() => router.push(`/business/update/${place.id}`)}
          onDelete={() => deleteBusiness(place.id)}
        />

        <h2 className="mt5">{place.name}</h2>

        <div className="flexStart">
          <div className="staticOutlineBadge purple">
            {getBusinessCategoryName(place.category)}
          </div>
          <div className="businessLocation">
            <Pin stroke="grey" fill="none" width={21} height={21} />
            <p
              style={{
                marginLeft: 5,
                marginRight: 15,
                display: "flex",
                alignItems: "center",
              }}
            >
              {place.county} {place.city} - {place.country}
            </p>
          </div>
        </div>

        <div className="mt5">
          {place.active ? null : (
            <p className="meta">Espace en attente de validation...</p>
          )}

          {place.description ? (
            <p className="businessDescription ">
              {parseContent(place.description)}
            </p>
          ) : (
            <br />
          )}
        </div>

        {place.website ? (
          <div className="mt5">
            <a href={place.website} className="textLink">
              {place.website}
            </a>
          </div>
        ) : null}

        <div className="mt5 flexStart">
          <Fav stroke="black" fill="none" width={24} height={24} />
          <p
            style={{
              marginLeft: 5,
              marginRight: 15,
              display: "flex",
              alignItems: "center",
            }}
          >
            {place.favorites ? place.favorites.length : 0}
          </p>
        </div>
      </div>
    </div>
  );
}
