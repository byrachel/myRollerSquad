import React, { useState } from "react";
import Heart from "views/svg/heart.svg";
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
  const [likedByUserConnected, setLikedByUserConnected] = useState(liked);

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
      }).then((res) => {
        if (res.data.liked) {
          setLikedByUserConnected(true);
          setLikes(likes + 1);
        } else {
          setLikedByUserConnected(false);
          setLikes(likes - 1);
        }
      });
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
        className={
          likedByUserConnected
            ? `fullLinksIcon ${color}`
            : likes > 0
            ? `linksIcon ${color}`
            : "linksIcon grey"
        }
        width={30}
        height={30}
      />
      <p className="cardMetaText">{likes}</p>
    </div>
  ) : (
    <Heart className={`linksIcon ${color}`} width={30} height={30} />
  );
}
