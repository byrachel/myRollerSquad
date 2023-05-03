import React from "react";
import Comment from "src/svg/multi-bubble.svg";

interface Props {
  counter: number;
  color: string;
}

export default function CommentIcon({ counter, color }: Props) {
  return (
    <div className="socialIconContainer">
      <Comment className={`linksIcon ${color}`} width={38} height={38} />
      <p className="cardMetaText">{counter}</p>
    </div>
  );
}