import React, { useState } from "react";
import Heart from "src/svg/heart.svg";
import axios from "axios";

interface Props {
  counter: number;
  postId: number;
  likedBy: number[];
  color: string;
  userConnectedId: number | null;
}

export default function LikeIcon({
  counter,
  postId,
  likedBy,
  color,
  userConnectedId,
}: Props) {
  const [likes, setLikes] = useState<number>(counter);
  const liked = userConnectedId ? likedBy.includes(userConnectedId) : false;

  const addLike = (id: number, userConnectedId: number) => {
    if (!userConnectedId) return;
    const data = {
      post_id: id,
      user_id: userConnectedId,
    };
    if (id) {
      axios({
        method: "post",
        url: `/api/flow/post/like`,
        data,
        withCredentials: true,
      })
        .then(res => {
          if (res.data.liked) {
            setLikes(likes + 1);
          } else {
            setLikes(likes - 1);
          }
        })
        .catch(err => console.log(err));
    }
  };
  return userConnectedId ? (
    <div
      role="button"
      tabIndex={0}
      className="socialIconContainer"
      onClick={() => addLike(postId, userConnectedId)}
      onKeyDown={() => addLike(postId, userConnectedId)}
    >
      <Heart
        className={liked ? `fullLinksIcon ${color}` : `linksIcon ${color}`}
        width={38}
        height={38}
      />
      <p className="cardMetaText">{likes}</p>
    </div>
  ) : (
    <Heart className={`linksIcon ${color}`} width={38} height={38} />
  );
}
