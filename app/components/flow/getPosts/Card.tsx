import React, { useMemo } from "react";

import { PostInterface } from "app/interfaces/flowInterfaces";
import { cardColor } from "app/utils/colorManager";
import { displayLightDateTime } from "app/utils/handleDates";
import { parseContent } from "app/utils/parseContent";

import Avatar from "./Avatar";
import LikeIcon from "./LikeIcon";
import CommentIcon from "./CommentIcon";

import Pin from "app/svg/pin.svg";
import Arrow from "app/svg/nav-arrow-right.svg";
import Roller from "app/svg/rollerquad.svg";

import { SALE, getCategoryName } from "app/constants/PostCategories";
import { getStyleName } from "app/constants/RollerSkateStyles";
import CardFeaturedPict from "./CardFeaturedPict";
import Link from "next/link";

interface Props {
  post: PostInterface;
  cardRef?: React.RefObject<HTMLDivElement>;
  isAuthor?: boolean;
}

export default function Card({ post, cardRef, isAuthor }: Props) {
  const color = useMemo(() => cardColor(post.category_id), [post.category_id]);

  console.log(post);

  return (
    <div className={`cardContainer ${color}`} key={post.id} ref={cardRef}>
      <div className="flexStart">
        {isAuthor ? null : <Avatar userId={post.user.id} />}
        <div className="cardTitle">
          <div className="flexStart">
            <div className={`badge ${color}`}>
              {getCategoryName(post.category_id)}
            </div>
            <div className={`outlineBadge ${color}`}>
              {getStyleName(post.style_id)}
            </div>
          </div>
          <h2 className="title">{post.title}</h2>
          {isAuthor ? null : (
            <h3 className={`userName ${color}`}>{post.user.name}</h3>
          )}
        </div>
      </div>
      <div className="cardMeta">
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

      {post.category_id === SALE && post.price ? (
        <div className="sessionTracking">
          <p>{post.price} €</p>
        </div>
      ) : null}

      {post.pictures.length > 0 ? (
        <CardFeaturedPict urlPicts={post.pictures} color={color} />
      ) : null}
      <div className="cardContent">
        {post.content ? parseContent(post.content) : null}

        {post.link ? (
          <div className="linkContainer">
            <p className="linkText">{post.link}</p>
          </div>
        ) : null}
        <div className="cardSeparator" />
      </div>
      <div className="cardIcons">
        <div className="cardSocialIcons">
          <LikeIcon
            color={color}
            counter={post.user_likes.length}
            postId={post.id}
            likedBy={post.user_likes.map(like => like.user_id)}
          />
          {/* TO UPDATE !!! */}
          <CommentIcon color={color} counter={2} />
        </div>
        <Link href={`/post/${post.id}`}>
          <Arrow className="linkIcon" width={38} height={38} />
        </Link>
      </div>
    </div>
  );
}
