import React from "react";
import Avatar from "../flow/Avatar";
import Pin from "../icons/svg/pin.svg";
import { PostInterface } from "../../interface/Flow";
import { cardColor } from "../../utils/colorManager";
import { displayLightDateTime } from "../../utils/handleDates";
import PicturesSlider from "./PicturesSlider";

interface Props {
  post: PostInterface;
}

export default function Card({ post }: Props) {
  const color = cardColor(post.category.id);
  return (
    <div className={`cardContainer ${color}`} key={post.id}>
      <div className="flexStart">
        <Avatar />
        <div className="cardTitle">
          <div className={`categoryBadge ${color}`}>{post.category.name}</div>
          <h2 className="title">{post.title}</h2>
          <h3 className={`userName ${color}`}>Rachel Nething</h3>
        </div>
      </div>
      <div className="cardMeta">
        <p className="meta">
        {displayLightDateTime(post.created_at)}
          <Pin width={12} height={12} className="metaIcon" />
          Cannes, France
        </p>
        <div className={`separator ${color}`} />
        {post.hashtags.length > 0
          ? post.hashtags.map((hashtag, index) => (
              <p className="hashtags" key={index}>
                #{hashtag}
              </p>
            ))
          : null}
      </div>
      <PicturesSlider urlPict={post.pictures.length > 0 ? post.pictures[0] : "pexels-rodnae-productions-7335311.jpg"} />
      <div className="cardContent">
        <p>{post.content}</p>
      </div>
    </div>
  );
}
