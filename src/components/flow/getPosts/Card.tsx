import React, { useMemo } from "react";

import { PostInterface } from "src/interfaces/flowInterfaces";
import { cardColor } from "src/utils/colorManager";
import { displayLightDateTime } from "src/utils/handleDates";
import { parseContent } from "src/utils/parseContent";

import Avatar from "./Avatar";
import LikeIcon from "./LikeIcon";
import CommentIcon from "./CommentIcon";

import Pin from "src/svg/pin.svg";
import Arrow from "src/svg/arrow-right.svg";
import Roller from "src/svg/rollerquad.svg";

import { SALE, getCategoryName } from "src/constants/PostCategories";
import CardFeaturedPict from "./CardFeaturedPict";
import Link from "next/link";

interface Props {
  post: PostInterface;
  cardRef?: React.RefObject<HTMLDivElement>;
  isAuthor?: boolean;
  flowDispatch?: React.Dispatch<any>;
  userConnectedId: number;
}

export default function Card({
  post,
  cardRef,
  isAuthor,
  userConnectedId,
  flowDispatch,
}: Props) {
  const color = useMemo(() => cardColor(post.category_id), [post.category_id]);

  const categoryFilter = (category: number) => {
    if (flowDispatch === undefined) return;
    flowDispatch({
      type: "SET_CATEGORY",
      payload: category,
    });
  };

  const styleFilter = (style: number) => {
    if (flowDispatch === undefined) return;
    flowDispatch({
      type: "SET_STYLE",
      payload: style,
    });
  };

  return (
    <div className={`cardContainer ${color}`} key={post.id} ref={cardRef}>
      <div className="flexStart">
        {isAuthor ? null : (
          <Avatar userId={post.user.id} userAvatar={post.user.avatar} />
        )}
        <div className="cardTitle">
          <div
            className={`badge ${color}`}
            onClick={() => categoryFilter(post.category_id)}
            onKeyDown={() => categoryFilter(post.category_id)}
            role="button"
            tabIndex={0}
          >
            {getCategoryName(post.category_id)}
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
        {post.style.length > 0 ? (
          <div className="flexStart">
            {post.style.map(style => (
              <div
                className={`outlineBadge ${color}`}
                onClick={() => styleFilter(style.id)}
                onKeyDown={() => styleFilter(style.id)}
                role="button"
                tabIndex={0}
                key={style.id}
              >
                {style.name}
              </div>
            ))}
          </div>
        ) : null}
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
        <LikeIcon
          color={color}
          counter={post.user_likes.length}
          postId={post.id}
          likedBy={post.user_likes.map(like => like.user_id)}
          userConnectedId={userConnectedId}
        />
        <CommentIcon counter={post.comments.length} color={color} />
        <Link href={`/post/${post.id}`}>
          <Arrow className={`linksIcon ${color}`} width={38} height={38} />
        </Link>
      </div>
    </div>
  );
}
