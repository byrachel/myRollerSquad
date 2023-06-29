import React from "react";
import Link from "next/link";
import axios from "axios";
import { format } from "date-fns";

import RegularButton from "@/components/buttons/RegularButton";
import { CommentInterface } from "src/entities/flow.entity";

interface Props {
  userId: number | null;
  comments: CommentInterface[];
  setComments: (arg: CommentInterface[]) => void;
  setCommentsCounter: any;
}

export default function CommentsList({
  userId,
  comments,
  setComments,
  setCommentsCounter,
}: Props) {
  const deleteComment = (uid: number, cid: number) => {
    axios
      .delete(`/api/comment/delete/${uid}/${cid}`, {
        withCredentials: true,
      })
      .then(() => {
        const commentsList = comments.filter(
          (comment: CommentInterface) => comment.id !== cid
        );
        setComments(commentsList);
        setCommentsCounter((prevState: number) => prevState - 1);
      });
  };

  return (
    <>
      {comments && comments.length > 0
        ? comments.map((comment: CommentInterface) => (
            <div className="commentContainer" key={comment.id}>
              <div className="spaceBetween">
                <Link href={`/profile/${comment.author.id}`}>
                  <p className="textLink">{comment.author.name}</p>
                </Link>
                <p className="meta">
                  {format(new Date(comment.published_at), "dd/MM/yyyy HH:mm")}
                </p>
              </div>
              <div className="divider" />
              <p>{comment.comment}</p>
              {userId && userId === comment.author.id ? (
                <div className="spaceBetween">
                  <div></div>
                  <RegularButton
                    type="button"
                    text="Supprimer"
                    style="light"
                    onClick={() => deleteComment(userId, comment.id)}
                  />
                </div>
              ) : null}
            </div>
          ))
        : null}
    </>
  );
}
