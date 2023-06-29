import React, { useEffect, useState } from "react";
import { Modal, Text } from "@nextui-org/react";
import axios from "axios";

import RegularButton from "@/components/buttons/RegularButton";
import CommentsList from "./CommentsList";
import { CommentInterface } from "src/entities/flow.entity";

interface Props {
  counter: number;
  postId: number;
  userId: number;
  setCommentsCounter: any;
  show: boolean;
  setShow: (arg: boolean) => void;
}

export default function CommentModal({
  counter,
  postId,
  userId,
  setCommentsCounter,
  show,
  setShow,
}: Props) {
  const [comments, setComments] = useState<CommentInterface[]>([]);

  useEffect(() => {
    if (postId && counter > 0 && show) {
      axios({
        method: "GET",
        url: `/api/comment/${postId}`,
        withCredentials: true,
      })
        .then((res) => setComments(res.data.comments))
        .catch(() => setComments([]));
    }
  }, [postId, counter, show]);

  const addComment = (e: any) => {
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
        .then((res) => {
          setComments((prevState) => [res.data.comment, ...prevState]);
          setCommentsCounter((prevState: number) => prevState + 1);
        })
        .finally(() => e.target.reset());
    }
  };

  return (
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
        <CommentsList
          userId={userId}
          comments={comments}
          setComments={setComments}
          setCommentsCounter={setCommentsCounter}
        />
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
          <div>
            <RegularButton
              type="button"
              style="light"
              text="Annuler"
              onClick={() => setShow(false)}
            />
            <RegularButton type="submit" style="full" text="Commenter" />
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
