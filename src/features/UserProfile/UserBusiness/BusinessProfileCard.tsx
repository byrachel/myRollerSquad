import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Pending from "src/svg/hourglass.svg";
import Pin from "src/svg/pin.svg";

import BusinessAddToFav from "../../BusinessProfile/BusinessAddToFav";
import UpdateDeleteIcons from "@/components/buttons/UpdateDeleteIcons";
import { PlaceInterface } from "src/interfaces/userInterfaces";

interface Props {
  place: PlaceInterface;
  isOwner: boolean;
  userConnectedId: number | null;
  placeDispatch: React.Dispatch<any>;
}

export default function BusinessCard({
  place,
  isOwner,
  userConnectedId,
  placeDispatch,
}: Props) {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const router = useRouter();

  const deleteBusiness = (id: number) => {
    axios({
      method: "delete",
      url: `/api/business/delete/${id}`,
      withCredentials: true,
    })
      .then(() => setIsDeleted(true))
      .catch(() => setIsDeleted(false));
  };

  return (
    <>
      {place.active ? (
        <div className="ctaBox">
          {isDeleted ? (
            <p>Supprimé avec succès !</p>
          ) : (
            <div>
              <div className="spaceBetween">
                <h3>{place.name}</h3>
                {isOwner ? (
                  <UpdateDeleteIcons
                    onUpdate={() => router.push(`/business/update/${place.id}`)}
                    onDelete={() => deleteBusiness(place.id)}
                  />
                ) : null}
              </div>
              <a href={place.website} className="placeUrl">
                {place.website}
              </a>
              <p className="meta mt5">{place.description}</p>

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
          )}
        </div>
      ) : isOwner ? (
        <div className="ctaBox">
          <div>
            <h3>{place.name}</h3>
            <p>{place.website}</p>
          </div>
          <p className="metaBox mt5">
            <Pending className="metaIcon" width={16} height={16} /> Validation
            en cours. En attendant, ajoute ton logo en cliquant sur l'image à
            gauche ;-)
          </p>
        </div>
      ) : null}
    </>
  );
}
