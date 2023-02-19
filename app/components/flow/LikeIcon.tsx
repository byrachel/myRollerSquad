import React from "react";
import Heart from "../../svg/heart.svg";

interface Props {
  color: string;
}

export default function LikeIcon({ color }: Props) {
  return (
    <div className="socialIconContainer">
      <Heart className={`icon ${color}`} width={38} height={38} />
      <p className="cardMetaText">0</p>
    </div>
  );
}
