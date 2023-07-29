import { useEffect } from "react";
import dynamic from "next/dynamic";
import Loader from "views/components/layouts/Loader";

interface Props {
  dispatch: React.Dispatch<any>;
  position: [number, number] | null;
  setPosition: (arg: [number, number]) => void;
  status: { loading: boolean; error: boolean };
  setStatus: (arg: { loading: boolean; error: boolean }) => void;
  location: string | null;
  setLocation: (arg: string) => void;
}

export default function DisplayMap({
  dispatch,
  position,
  setPosition,
  status,
  setStatus,
  location,
  setLocation,
}: Props) {
  const Map = dynamic(() => import("./Map"), { ssr: false });

  useEffect(() => {
    if ("geolocation" in navigator) {
      setStatus({ loading: true, error: false });
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setStatus({ loading: false, error: false });
          setPosition([coords.latitude, coords.longitude]);
        },
        () => setStatus({ loading: false, error: true })
      );
    }
  }, []);

  useEffect(() => {
    if (position) {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position[0]}&lon=${position[1]}`
      )
        .then((res) => res.json())
        .then((data) => {
          const currentLocation = {
            country: data.address.country,
            county: data.address.county,
            city: data.address.town,
          };
          dispatch({ type: "SAVE_LOCATION", payload: currentLocation });
          const address = `${
            data.address.town ? data.address.town : data.address.municipality
          }, ${data.address.county}`;
          setLocation(address);
        });
    }
    // eslint-disable-next-line
  }, [position]);

  return (
    <>
      <h3>Localiser un spot</h3>
      {!position && status.loading ? (
        <Loader text="Mais... ou es-tu ?" />
      ) : position ? (
        <div className="mapContainer">
          {location ? <p className="meta">{location}</p> : <br />}
          <Map
            position={position}
            setPosition={setPosition}
            dispatch={dispatch}
          />
          <p className="blackMeta mt5">
            Déplace le pointeur, zoum & dézoume la carte pour positionner ton
            spot !
          </p>
        </div>
      ) : null}
    </>
  );
}
