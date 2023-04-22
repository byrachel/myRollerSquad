import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import html2canvas from "html2canvas";
import RegularButton from "src/components/buttons/RegularButton";

interface Props {
  position: [number, number] | undefined;
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

export default function DisplayLocation({
  position,
  dispatch,
  setShowMap,
}: Props) {
  const Map = dynamic(() => import("./Map"), { ssr: false });
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      dispatch({
        type: "SAVE_POSITION",
        payload: [position.coords.latitude, position.coords.longitude],
      });
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (position) {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position[0]}&lon=${position[1]}`
      )
        .then(res => res.json())
        .then(data => {
          const currentLocation = {
            country: data.address.country,
            city: data.address.county,
          };
          dispatch({ type: "SAVE_LOCATION", payload: currentLocation });
          const address = `${
            data.address.city ? data.address.city : data.address.municipality
          }, ${data.address.country}`;
          setLocation(address);
        });
    }
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
        <Map position={position} dispatch={dispatch} />
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
