import React, { useState } from "react";
import { Modal } from "@nextui-org/react";
import html2canvas from "html2canvas";

import DisplayMap from "./DisplayMap";
import RegularButton from "@/components/buttons/RegularButton";

import Map from "views/svg/map.svg";

interface BlobImageInterface {
  preview?: string;
  size?: number;
  type?: string;
  width?: number;
  height?: number;
  name?: string;
}

interface Props {
  postDispatch: React.Dispatch<any>;
}

export default function DisplayMapContainer({ postDispatch }: Props) {
  const [showMap, setShowMap] = useState(false);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [status, setStatus] = useState({ loading: false, error: false });
  const [location, setLocation] = useState<string | null>(null);

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
        postDispatch({ type: "SAVE_PICTURES", payload: [image] });
        postDispatch({ type: "SAVE_MAP", payload: blob });
        setShowMap(false);
      });
    });
  };

  return (
    <>
      <Map
        className="newPostPinIcon"
        width={45}
        height={45}
        onClick={() => setShowMap(true)}
      />
      <Modal
        closeButton
        width="70%"
        scroll
        aria-labelledby="modal-title"
        open={showMap}
        onClose={() => setShowMap(false)}
      >
        <Modal.Body>
          <DisplayMap
            dispatch={postDispatch}
            position={position}
            setPosition={setPosition}
            status={status}
            setStatus={setStatus}
            location={location}
            setLocation={setLocation}
          />
        </Modal.Body>

        <Modal.Footer>
          {status.error ? (
            <p className="meta">Impossible de récupérer votre position :-(</p>
          ) : status.loading ? null : (
            <RegularButton
              type="button"
              style="full"
              text="Ajouter à la publication"
              onClick={saveAsImage}
            />
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
