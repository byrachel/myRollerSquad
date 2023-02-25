import React from "react";
import Comment from "../../../svg/multi-bubble.svg";

interface Props {
  color: string;
  counter: number;
}

export default function CommentIcon({ color, counter }: Props) {
  return (
    <div className="socialIconContainer">
      <Comment className={`icon ${color}`} width={38} height={38} />
      <p className="cardMetaText">{counter}</p>
    </div>
  );
}
