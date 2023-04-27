import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import html2canvas from "html2canvas";
import RegularButton from "src/components/buttons/RegularButton";

interface Props {
  dispatch: React.Dispatch<any>;
  setShowMap: (arg: boolean) => void;
}

interface BlobImageInterface {
  preview?: string;
  size?: number;
  type?: string;
  width?: number;
  height?: number;
  name?: string;
}

export default function DisplayLocation({ dispatch, setShowMap }: Props) {
  const Map = dynamic(() => import("./Map"), { ssr: false });
  const [location, setLocation] = useState<string | null>(null);
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
    // eslint-disable-next-line
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

  const canvasConfig = {
    useCORS: true,
    backgroundColor: null,
    logging: true,
    imageTimeout: 0,
  };

  const saveAsImage = async () => {
    const canvas = document.getElementsByClassName(
      "leaflet-container"
    )[0] as HTMLCanvasElement;
    await html2canvas(canvas, canvasConfig).then((canvas: any) => {
      canvas.toBlob((blob: any) => {
        const image: BlobImageInterface = {};
        image.preview = URL.createObjectURL(blob);
        image.size = blob.size;
        image.type = blob.type;
        image.name = "map.png";
        dispatch({ type: "SAVE_PICTURES", payload: [image] });
        dispatch({ type: "SAVE_MAP", payload: blob });
        setShowMap(false);
      });
    });
  };

  return position ? (
    <>
      <div className="mapContainer">
        <Map
          position={position}
          setPosition={setPosition}
          dispatch={dispatch}
        />
      </div>
      <div className="spaceBetween">
        {location ? <p className="meta">{location}</p> : null}
        <RegularButton
          type="button"
          style="full"
          text="Ajouter à la publication"
          onClick={saveAsImage}
        />
      </div>
    </>
  ) : null;
}
