import React from "react";
import Heart from "app/svg/heart.svg";

interface Props {
  color: string;
  counter: number;
}

export default function LikeIcon({ color, counter }: Props) {
  return (
    <div className="socialIconContainer">
      <Heart className={`icon ${color}`} width={38} height={38} />
      <p className="cardMetaText">{counter}</p>
    </div>
  );
}
