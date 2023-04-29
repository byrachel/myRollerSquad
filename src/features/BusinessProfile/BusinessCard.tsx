import Link from "next/link";
import React, { useState } from "react";
import { PlaceInterface } from "src/interfaces/userInterfaces";

import Pending from "src/svg/hourglass.svg";
import Edit from "src/svg/edit.svg";
import Cancel from "src/svg/cancel.svg";
import axios from "axios";

interface Props {
  place: PlaceInterface;
  isOwner: boolean;
  userConnectedId: number;
}

export default function BusinessCard({
  place,
  isOwner,
  userConnectedId,
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
            <>
              <div>
                <h3>{place.name}</h3>
                <p className="meta">{place.website}</p>
                <p className="mt5">{place.description}</p>
              </div>
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
            </>
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
      <div className="addBusinessLink">
        <Link href={`/business/create/${userConnectedId}`}>
          <p>+ ajouter</p>
        </Link>
      </div>
    </>
  );
}
