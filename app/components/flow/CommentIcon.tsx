import React from "react";
import Comment from "../../svg/multi-bubble.svg";

interface Props {
  color: string;
}

export default function CommentIcon({ color }: Props) {
  return (
    <div className="socialIconContainer">
      <Comment className={`icon ${color}`} width={38} height={38} />
      <p className="cardMetaText">0</p>
    </div>
  );
}
