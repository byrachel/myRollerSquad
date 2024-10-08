import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseContent } from "views/utils/parseContent";
import RegularButton from "views/components/buttons/RegularButton";
import { UserStateInterface } from "views/reducers/UserReducer";

interface Props {
  user: UserStateInterface;
}

export default function PlacesBoard({ user }: Props) {
  const [placesToModerate, setPlacesToModerate] = useState([]);
  const [placeActivated, setPlaceActivated] = useState(false);
  const isAdmin = user.id && user.role === "ADMIN";

  useEffect(() => {
    if (isAdmin) {
      axios({
        method: "get",
        url: `/api/business/activation/tomoderate`,
        withCredentials: true,
      })
        .then((res) => setPlacesToModerate(res.data.places))
        .catch(() => setPlacesToModerate([]));
    }
  }, [isAdmin, placeActivated]);

  const placeActivation = (id: number) => {
    if (id) {
      axios({
        method: "put",
        url: `/api/business/activation/${id}`,
        withCredentials: true,
      })
        .then(() => setPlaceActivated(!placeActivated))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <h2>Business à modérer</h2>
      <ul>
        {placesToModerate.map((place: any) => (
          <li key={place.id} className="mt-large">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>
                <b>{place.name}</b>
              </p>
              <p>{place.siren}</p>
              <p>{place.website}</p>
            </div>
            {place.description ? (
              <div className="mt5">
                <p>{parseContent(place.description)}</p>
              </div>
            ) : (
              <br />
            )}
            <RegularButton
              type="button"
              text="Activer"
              style="outline"
              onClick={() => placeActivation(place.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
