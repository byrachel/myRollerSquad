import React from "react";
import Avatar from "../flow/Avatar";
import Pin from "../icons/svg/pin.svg";
import { PostInterface } from "../../interface/Flow";
import { cardColor } from "../../utils/colorManager";

interface Props {
  post: PostInterface;
}

export default function Card({ post }: Props) {
  const color = cardColor(post.category.name);
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
          31/12/2022 10:00
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
        <div className="cardContent">
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
}
