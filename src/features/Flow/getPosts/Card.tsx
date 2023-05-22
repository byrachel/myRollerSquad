import React, { useMemo } from "react";
import Link from "next/link";

import { PostWithAuthorInterface } from "src/entities/flow.entity";
import { cardColor } from "src/utils/colorManager";
import { displayLightDateTime } from "src/utils/handleDates";
import { parseContent } from "src/utils/parseContent";
import { SALE, getCategoryName } from "src/constants/PostCategories";
import Avatar from "./Avatar";
import LikeIcon from "./LikeIcon";
import CommentIcon from "./CommentIcon";
import CardFeaturedPict from "./CardFeaturedPict";
import AlertButton from "@/components/buttons/AlertButton";

import Pin from "src/svg/pin.svg";
import Arrow from "src/svg/arrow-right.svg";
import Roller from "src/svg/rollerquad.svg";

interface Props {
  post: PostWithAuthorInterface;
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

  return (
    <div className={`cardContainer ${color}`} key={post.id} ref={cardRef}>
      <div className="flexStart">
        {displayAvatar ? (
          <Avatar
            userId={post.user.id}
            userAvatar={post.user.avatar}
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
          <p>{post.price} €</p>
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
        <div className="linkContainer">
          <p className="linkText">{post.link}</p>
        </div>
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
        <CommentIcon counter={post.comments?.length || 0} color={color} />
        <Link href={`/post/${post.id}`}>
          <Arrow className={`linksIcon ${color}`} width={30} height={30} />
        </Link>
      </div>
    </div>
  );
}
