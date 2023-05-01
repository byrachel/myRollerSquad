import React, { useState } from "react";
import axios from "axios";

import Pending from "src/svg/hourglass.svg";
import Edit from "src/svg/edit.svg";
import Cancel from "src/svg/cancel.svg";
import BusinessAddToFav from "./BusinessAddToFav";
import { PlaceInterface } from "src/interfaces/userInterfaces";
import Pin from "src/svg/pin.svg";

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
                  <div className="flexStart">
                    <Edit
                      className="linkIcon"
                      width={22}
                      height={22}
                      style={{ marginRight: 8 }}
                    />
                    <Cancel
                      onClick={() => deleteBusiness(place.id)}
                      className="linkIcon"
                      width={22}
                      height={22}
                    />
                  </div>
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
          <p className="metaBox">
            <Pending className="metaIcon" width={16} height={16} /> Validation
            en cours
          </p>
        </div>
      ) : null}

      {/* <div className="addBusinessLink">
        <Link href={`/business/create/${userConnectedId}`}>
          <p>+ ajouter</p>
        </Link>
      </div> */}
    </>
  );
}
