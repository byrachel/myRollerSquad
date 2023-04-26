import { useMemo } from "react";
import Image from "next/image";

import { getCategoryName } from "src/constants/PostCategories";
import { PostInterface } from "src/interfaces/flowInterfaces";
import { cardColor } from "src/utils/colorManager";
import { displayLightDateTime } from "src/utils/handleDates";
import { parseContent } from "src/utils/parseContent";
import CommentIcon from "../getPosts/CommentIcon";
import LikeIcon from "../getPosts/LikeIcon";

import Pin from "src/svg/pin.svg";
import Roller from "src/svg/rollerquad.svg";
import Edit from "src/svg/edit.svg";
import { getStyleName } from "src/constants/RollerSkateStyles";

interface Props {
  post: PostInterface;
  userConnectedId: number | null;
}

export default function SinglePost({ post, userConnectedId }: Props) {
  const color = useMemo(() => cardColor(post.category_id), [post.category_id]);

  return (
    <>
      <div className="spaceBetween">
        <div className={`staticBadge ${color}`}>
          {getCategoryName(post.category_id)}
        </div>
        {post.user.id === userConnectedId ? (
          <Edit width={28} height={28} className="metaIcon" />
        ) : null}
      </div>
      {post.style.length > 0 ? (
        <div className="flexStart">
          {post.style.map((elt) => (
            <div className={`staticOutlineBadge ${color}`} key={elt.style_id}>
              {getStyleName(elt.style_id)}
            </div>
          ))}
        </div>
      ) : null}

      <h1>{post.title}</h1>

      <div className="singleCardMeta">
        <p className="cardMetaText">
          {displayLightDateTime(post.created_at)}
          <Pin width={12} height={12} className="metaIcon" />
          {post.city ? `${post.city}, ` : null}
          {post.country}
        </p>
      </div>
      {post.distance || post.duration ? (
        <div className="sessionTracking">
          <Roller className="sessionIcon" width={28} height={28} />
          {post.distance ? <p>{post.distance} km</p> : null}
          {post.duration ? <p>{post.duration}</p> : null}
        </div>
      ) : null}

      <div className="postContent mt5">
        {post.content ? parseContent(post.content) : null}
      </div>

      <div className="singlePostPicts">
        {post.pictures.length > 0
          ? post.pictures.map((pict, index) => (
              <Image
                src={`https://myrollersquadflow.s3.eu-west-3.amazonaws.com/${pict}`}
                alt="Roller Skateur"
                className="pict"
                fill
                key={index}
              />
            ))
          : null}
      </div>
      <div className="lightBox">
        <div className="flexStart">
          <LikeIcon
            color={color}
            counter={post.user_likes.length}
            postId={post.id}
            likedBy={post.user_likes.map((like) => like.user_id)}
            userConnectedId={userConnectedId}
          />
        </div>
        <CommentIcon counter={post.comments.length} color={color} />
      </div>
    </>
  );
}