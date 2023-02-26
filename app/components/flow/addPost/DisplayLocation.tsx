import { useEffect } from "react";
import dynamic from "next/dynamic";
import html2canvas from "html2canvas";
import RegularButton from "@/components/buttons/RegularButton";

interface Props {
  position: [number, number] | undefined;
  dispatch: React.Dispatch<any>;
  setShowMap: (arg: boolean) => void;
}

export default function DisplayLocation({
  position,
  dispatch,
  setShowMap,
}: Props) {
  const Map = dynamic(() => import("./Map"), { ssr: false });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      dispatch({
        type: "SAVE_POSITION",
        payload: [position.coords.latitude, position.coords.longitude],
      });
    });
  }, []);

  useEffect(() => {
    if (position) {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position[0]}&lon=${position[1]}`
      )
        .then(res => res.json())
        .then(data => console.log(data));
    }
  }, [position]);

  interface BlobImageInterface {
    preview?: string;
    size?: number;
    type?: string;
    width?: number;
    height?: number;
    name?: string;
  }

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
    let image: BlobImageInterface = {};
    await html2canvas(canvas, canvasConfig).then((canvas: any) => {
      canvas.toBlob((blob: any) => {
        image.preview = URL.createObjectURL(blob);
        image.size = blob.size;
        image.type = blob.type;
        image.name = "map.png";
        dispatch({ type: "SAVE_PICTURES", payload: [image] });
        setShowMap(false);
      });
    });
  };

  return location ? (
    <>
      <div className="mapContainer">
        <Map position={position} dispatch={dispatch} />
      </div>
      <RegularButton
        type="button"
        style="full"
        text="Ajouter à la publication"
        onClick={saveAsImage}
      />
    </>
  ) : null;
}
