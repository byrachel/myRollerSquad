import React, { useEffect, useRef } from "react";
import { PostInterface } from "../../interfaces/Flow";
import { cardColor } from "../../utils/colorManager";
import { displayLightDateTime } from "../../utils/handleDates";

import Avatar from "./Avatar";
import PicturesSlider from "./PicturesSlider";
import LikeIcon from "./LikeIcon";
import CommentIcon from "./CommentIcon";

import Pin from "../../svg/pin.svg";
import Arrow from "../../svg/nav-arrow-right.svg";

interface Props {
  post: PostInterface;
  isLast: boolean;
  newLimit: any;
}

export default function Card({ post, isLast, newLimit }: Props) {
  const color = cardColor(post.category.id);
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
          <div className={`categoryBadge ${color}`}>{post.category.name}</div>
          <h2 className="title">{post.title}</h2>
          <h3 className={`userName ${color}`}>Rachel Nething</h3>
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
            Cannes, France
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
          <LikeIcon color={color} />
          <CommentIcon color={color} />
        </div>
        <Arrow className="linkIcon" width={38} height={38} />
      </div>
    </div>
  );
}
