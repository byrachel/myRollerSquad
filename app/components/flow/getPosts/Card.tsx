import React, { useEffect, useRef } from "react";
import { PostInterface } from "../../../interfaces/flowInterfaces";
import { cardColor } from "../../../utils/colorManager";
import { displayLightDateTime } from "../../../utils/handleDates";

import Avatar from "./Avatar";
import PicturesSlider from "./PicturesSlider";
import LikeIcon from "./LikeIcon";
import CommentIcon from "./CommentIcon";

import Pin from "../../../svg/pin.svg";
import Arrow from "../../../svg/nav-arrow-right.svg";
import { getCategoryName } from "app/constants/PostCategories";
import { getStyleName } from "app/constants/RollerSkateStyles";

interface Props {
  post: PostInterface;
  isLast: boolean;
  newLimit: any;
}

export default function Card({ post, isLast, newLimit }: Props) {
  const color = cardColor(post.category_id);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
  }, [isLast]);

  return (
    <div className={`cardContainer ${color}`} key={post.id} ref={cardRef}>
      <div className="flexStart">
        <Avatar />
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
          <h3 className={`userName ${color}`}>{post.user.name}</h3>
        </div>
      </div>
      {post.pictures.length > 0 ? (
        <PicturesSlider urlPict={post.pictures[0]} />
      ) : null}
      <div className="cardContent">
        <div className="cardMeta">
          <p className="cardMetaText">
            {displayLightDateTime(post.created_at)}
            <Pin width={12} height={12} className="metaIcon" />
            {post.city ? `${post.city}, ` : null}
            {post.country}
          </p>
          {/* {post.hashtags.length > 0
        ? post.hashtags.map((hashtag, index) => (
            <p className="hashtags" key={index}>
              #{hashtag}
            </p>
          ))
        : null} */}
        </div>
        <p>{post.content}</p>
        {post.link ? (
          <div className="linkContainer">
            <p className="linkText">{post.link}</p>
          </div>
        ) : (
          <div className="cardSeparator" />
        )}
      </div>
      <div className="cardIcons">
        <div className="cardSocialIcons">
          <LikeIcon color={color} counter={post.likes} />
          {/* TO UPDATE !!! */}
          <CommentIcon color={color} counter={2} />
        </div>
        <Arrow className="linkIcon" width={38} height={38} />
      </div>
    </div>
  );
}
