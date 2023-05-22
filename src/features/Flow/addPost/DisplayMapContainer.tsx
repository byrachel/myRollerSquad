import React, { useState } from "react";
import { Modal } from "@nextui-org/react";
import DisplayMap from "./DisplayMap";

import Map from "src/svg/map.svg";

interface Props {
  postDispatch: React.Dispatch<any>;
}

export default function DisplayMapContainer({ postDispatch }: Props) {
  const [showMap, setShowMap] = useState(false);
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
          <DisplayMap dispatch={postDispatch} setShowMap={setShowMap} />
        </Modal.Body>
      </Modal>
    </>
  );
}
