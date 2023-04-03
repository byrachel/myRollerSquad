import React, { useState } from "react";
import Heart from "app/svg/heart.svg";
import axios from "axios";

interface Props {
  color: string;
  counter: number;
  postId: number;
}

export default function LikeIcon({ color, counter, postId }: Props) {
  const [likes, setLikes] = useState<number>(counter);

  const addLike = (id: number) => {
    const token = localStorage.getItem("token");
    if (id) {
      axios({
        method: "post",
        url: `/api/post/like/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }).then(() => setLikes(prevState => prevState + 1));
    }
  };
  return (
    <div className="socialIconContainer" onClick={() => addLike(postId)}>
      <Heart className={`icon ${color}`} width={38} height={38} />
      <p className="cardMetaText">{likes}</p>
    </div>
  );
}
