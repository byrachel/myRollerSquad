import React, { useEffect, useReducer } from "react";
import Image from "next/image";
import axios from "axios";
import BusinessProfileCard from "./BusinessProfileCard";
import UserBusinessLogo from "./UserBusinessLogo";

const initialState = null;

const PlaceReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_PLACE":
      return action.payload;
    case "ADD_TO_MY_FAV":
      return {
        ...state,
        favorites: action.payload.favorites,
      };
    default:
      return state;
  }
};

interface Props {
  userToDisplayId: number;
  userConnectedId: number | null;
  placeId: number;
}

export default function UserBusinessCard({
  userToDisplayId,
  userConnectedId,
  placeId,
}: Props) {
  const [place, placeDispatch] = useReducer(PlaceReducer, initialState);

  useEffect(() => {
    axios(`/api/business/place/${placeId}`, {
      method: "GET",
      withCredentials: true,
    }).then((res) => {
      placeDispatch({
        type: "SET_PLACE",
        payload: res.data.place,
      });
    });
    // eslint-disable-next-line
  }, [placeId]);

  return (
    <>
      {place ? (
        <div className="rollerSkaterBusinessBox">
          <div className="rollerBusinessLogo">
            {userConnectedId === userToDisplayId ? (
              <UserBusinessLogo
                placeDispatch={placeDispatch}
                placeId={placeId}
                placeLogo={place.logo ? place.logo : null}
              />
            ) : (
              <Image
                src="/img/myrollersquad_avatar.jpeg"
                alt="Club de Roller Quad"
                className="businessLogo"
                width={140}
                height={140}
              />
            )}
          </div>
          <BusinessProfileCard
            place={place}
            isOwner={userConnectedId === userToDisplayId}
            userConnectedId={userConnectedId}
            placeDispatch={placeDispatch}
          />
        </div>
      ) : null}
    </>
  );
}
