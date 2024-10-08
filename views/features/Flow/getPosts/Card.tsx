import React, { useMemo, useState } from "react";
import Link from "next/link";

import { PostInterface } from "models/entities/flow.entity";
import { cardColor } from "views/utils/colorManager";
import { displayLightDateTime } from "views/utils/handleDates";
import { parseContent } from "views/utils/parseContent";
import { SALE, getCategoryName } from "views/constants/PostCategories";
import Avatar from "./Avatar";
import CardFeaturedPict from "./CardFeaturedPict";
import AlertButton from "views/components/buttons/AlertButton";
import LikeIcon from "./LikeIcon";
import CommentIcon from "../comment/CommentIcon";

import Pin from "views/svg/pin.svg";
import Arrow from "views/svg/arrow-right.svg";
import Roller from "views/svg/rollerquad.svg";
import PostLink from "./PostLink";

interface Props {
  post: PostInterface;
  cardRef?: React.RefObject<HTMLDivElement>;
  displayAvatar: boolean;
  userConnectedId: number | null;
}

export default function Card({
  post,
  cardRef,
  displayAvatar,
  userConnectedId,
}: Props) {
  const color = useMemo(() => cardColor(post.category_id), [post.category_id]);
  const [commentsCounter, setCommentsCounter] = useState(post.comments.length);

  return (
    <div className={`cardContainer ${color}`} key={post.id} ref={cardRef}>
      <div className="flexStart">
        {displayAvatar ? (
          <Avatar
            userId={post.user ? post.user.id : null}
            userAvatar={post.user ? post.user.avatar : null}
            color={color}
            placeId={post.place ? post.place.id : null}
            logo={post.place ? post.place.logo : null}
          />
        ) : null}
        <div className="cardTitle">
          <div className={`staticOutlineBadge ${color}`}>
            {getCategoryName(post.category_id)}
          </div>

          <h2 className={displayAvatar ? "title mb5" : "title"}>
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </h2>
          {displayAvatar ? (
            <h3 className="userName">
              {post.place ? post.place.name : post.user?.name}
            </h3>
          ) : null}
        </div>
      </div>
      {post.pictures.length > 0 ? (
        <CardFeaturedPict urlPicts={post.pictures} color={color} />
      ) : null}

      {post.distance || post.duration ? (
        <div className="sessionTracking">
          <Roller className="sessionIcon" width={36} height={36} />
          {post.duration ? <p>{post.duration} </p> : null}
          {post.distance ? <p>{post.distance} km </p> : null}
        </div>
      ) : null}

      {post.category_id === SALE && post.price ? (
        <div className="sessionTracking">
          <Roller className="sessionIcon" width={36} height={36} />
          <p data-testid="price">{post.price} €</p>
        </div>
      ) : null}

      <div className="cardContent">
        {post.content ? parseContent(post.content) : null}
      </div>

      <div className="cardMeta">
        <p className="cardMetaText">
          {displayLightDateTime(post.created_at)}
          <Pin width={12} height={12} className="metaIcon" />
          {post.city ? `${post.city}, ` : null}
          {post.country}
        </p>
      </div>

      {post.link ? (
        <PostLink link={post.link} />
      ) : (
        <div className="cardSeparator" />
      )}

      <div className="cardIcons">
        <AlertButton postId={post.id} />
        <LikeIcon
          color={color}
          counter={post.user_likes.length}
          postId={post.id}
          likedBy={post.user_likes.map((like) => like.user_id)}
          userConnectedId={userConnectedId}
        />
        <CommentIcon
          postId={post.id}
          userId={userConnectedId}
          counter={commentsCounter}
          setCommentsCounter={setCommentsCounter}
          color={color}
        />
        <Link href={`/post/${post.id}`}>
          <Arrow className={`linksIcon ${color}`} width={30} height={30} />
        </Link>
      </div>
    </div>
  );
}
