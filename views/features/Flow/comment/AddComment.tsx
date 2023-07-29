import React from "react";
import axios from "axios";

import RegularButton from "views/components/buttons/RegularButton";
import { CommentInterface } from "models/entities/flow.entity";

interface Props {
  postId: number;
  userId: number;
  setComments: React.Dispatch<React.SetStateAction<CommentInterface[]>>;
  setCommentsCounter: React.Dispatch<React.SetStateAction<any>>;
}

export default function AddComment({
  postId,
  userId,
  setComments,
  setCommentsCounter,
}: Props) {
  const postComment = (e: any) => {
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
    <form onSubmit={postComment}>
      <textarea
        className="input"
        name="comment"
        required={true}
        rows={2}
        placeholder="Laisse un commentaire..."
      />
      <RegularButton type="submit" style="full" text="Commenter" />
    </form>
  );
}
