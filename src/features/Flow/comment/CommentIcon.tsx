import RegularButton from "@/components/buttons/RegularButton";
import { Modal, Text } from "@nextui-org/react";
import axios from "axios";
import React, { useState } from "react";

import Comment from "src/svg/chat-bubble.svg";
import CommentsList from "./CommentsList";

interface Props {
  counter: number;
  color: string;
  postId: number;
  userId: number | null;
}

export default function CommentIcon({ counter, color, postId, userId }: Props) {
  const [show, setShow] = useState(false);

  const addComment = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const comment = (e.target as HTMLFormElement).comment.value;
    if (comment.length > 1 && postId) {
      const data = {
        comment,
        postId,
        userId,
      };
      axios({
        method: "post",
        url: `/api/comment/add/comment`,
        data,
        withCredentials: true,
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {userId ? (
        <div
          className="socialIconContainer"
          role="button"
          tabIndex={0}
          onKeyDown={() => setShow(true)}
          onClick={() => setShow(true)}
        >
          <Comment
            className={counter > 0 ? `linksIcon ${color}` : "linksIcon grey"}
            width={30}
            height={30}
          />
          <p className="cardMetaText">{counter}</p>
        </div>
      ) : null}

      <Modal
        closeButton
        width="75%"
        scroll
        aria-labelledby="modal-title"
        open={show}
        onClose={() => setShow(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Commentaires
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className="metaUnderliner" />
          <CommentsList postId={postId} />
        </Modal.Body>
        <form onSubmit={addComment}>
          <Modal.Footer>
            <textarea
              className="input"
              name="comment"
              required={true}
              rows={2}
              placeholder="Laisse un commentaire..."
            />
            <RegularButton type="submit" style="full" text="Commenter" />
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
