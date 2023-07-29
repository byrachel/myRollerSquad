import React from "react";
import Star from "views/svg/star.svg";

export default function RollerStylesbar() {
  const displayStar = (
    <Star className="rollerStylesIcon" width={12} height={12} />
  );
  return (
    <div className="rollerStylesSeparator">
      <div className="rollerStylesContent">
        <p>Roller Dance</p>
        {displayStar}
        <p>Patinage Artistique</p>
        {displayStar}
        <p>Roller Derby</p>
        {displayStar}
        <p>Freestyle</p>
        {displayStar}
        <p>Skate Park</p>
        {displayStar}
        <p>Roller Urbain</p>
      </div>
    </div>
  );
}
