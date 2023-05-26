import React from "react";
import { useRouter } from "next/router";
import BusinessAddToFav from "../../Business/BusinessAddToFav";
import { PlaceInterface } from "src/entities/business.entity";

import Pin from "src/svg/pin.svg";

interface Props {
  place: PlaceInterface;
  isOwner: boolean;
  userConnectedId: number | null;
  placeDispatch: React.Dispatch<any>;
}

export default function BusinessProfileCard({
  place,
  userConnectedId,
  placeDispatch,
}: Props) {
  const router = useRouter();
  return (
    <>
      {place.active ? (
        <div className="rollerBusinessResume">
          <div
            role="button"
            tabIndex={0}
            onKeyDown={() => router.push(`/business/${place.id}`)}
            onClick={() => router.push(`/business/${place.id}`)}
          >
            <h3 style={{ cursor: "pointer" }}>{place.name}</h3>
          </div>

          {place.description ? (
            <p className="businessDescription">
              {place.description.substring(0, 175) + "..."}
            </p>
          ) : (
            <br />
          )}
          <div className="mt5 flexStart">
            <Pin stroke="black" fill="none" width={24} height={24} />
            <p
              style={{
                marginLeft: 5,
                marginRight: 15,
                display: "flex",
                alignItems: "center",
              }}
            >
              {place.city}
            </p>
            <BusinessAddToFav
              dispatch={placeDispatch}
              userConnectedId={userConnectedId}
              placeId={place.id}
              favorites={place.favorites}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
