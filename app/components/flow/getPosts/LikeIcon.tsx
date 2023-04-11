import React, { useContext, useState } from "react";
import Heart from "app/svg/heart.svg";
import axios from "axios";
import { UserContext } from "app/context/UserContext";

interface Props {
  color: string;
  counter: number;
  postId: number;
  likedBy: number[];
}

export default function LikeIcon({ color, counter, postId, likedBy }: Props) {
  const [likes, setLikes] = useState<number>(counter);
  const { userState } = useContext(UserContext);
  const userConnectId = userState.user?.id;
  const liked = userConnectId ? likedBy.includes(userConnectId) : false;

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
    <div
      role="button"
      tabIndex={0}
      className="socialIconContainer"
      onClick={() => addLike(postId)}
      onKeyDown={() => addLike(postId)}
    >
      <Heart
        className={liked ? `iconfilled ${color}` : `icon ${color}`}
        width={38}
        height={38}
      />
      <p className="cardMetaText">{likes}</p>
    </div>
  );
}
