import React, { useState } from "react";
import { Button, Modal, Text } from "@nextui-org/react";

import Danger from "src/svg/warning-triangle.svg";
import axios from "axios";

interface Props {
  postId: number;
}

export default function AlertButton({ postId }: Props) {
  const [showModal, setShowModal] = useState(false);

  const sendAlert = () => {
    axios
      .post(`/api/flow/post/alert/${postId}`)
      .then(() => setShowModal(false))
      .catch(() => setShowModal(false));
  };

  return (
    <>
      <Danger
        className={`linksIcon grey`}
        width={30}
        height={30}
        onClick={() => setShowModal(true)}
      />
      <Modal
        closeButton
        width="75%"
        scroll
        aria-labelledby="modal-title"
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Alerte
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className="underliner" />
          <p className="meta center">
            Signaler un contenu choquant / inaproprié
          </p>
          <p>Etes-vous sûre de signaler cette publication ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="secondary"
            onPress={() => setShowModal(false)}
          >
            Annuler
          </Button>
          <Button auto color="secondary" onPress={sendAlert}>
            Signaler
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
