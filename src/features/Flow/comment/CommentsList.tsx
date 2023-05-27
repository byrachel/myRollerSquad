import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import Link from "next/link";

interface Props {
  postId: number;
}

export default function CommentsList({ postId }: Props) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (postId) {
      axios({
        method: "GET",
        url: `/api/comment/${postId}`,
        withCredentials: true,
      })
        .then((res) => setComments(res.data.comments))
        .catch((err) => console.log(err));
    }
  }, [postId]);

  return (
    <>
      {comments && comments.length > 0
        ? comments.map((comment: any) => (
            <div className="commentContainer" key={comment.id}>
              <div className="spaceBetween">
                <Link href={`/profile/${comment.author.id}`}>
                  <p className="textLink">{comment.author.name}</p>
                </Link>
                <p className="meta">
                  {format(new Date(comment.published_at), "dd/MM/yyyy HH:mm")}
                </p>
              </div>
              <p>{comment.comment}</p>
            </div>
          ))
        : null}
    </>
  );
}
