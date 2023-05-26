import React from "react";
import Star from "src/svg/star.svg";

interface Props {
  rollerDanceLevel: number;
  skateParkLevel: number;
  artisticLevel: number;
  freestyleLevel: number;
  urbanLevel: number;
  derbyLevel: number;
}

export default function RollerSkateLevel({
  rollerDanceLevel,
  skateParkLevel,
  artisticLevel,
  freestyleLevel,
  urbanLevel,
  derbyLevel,
}: Props) {
  const handleRollerSkateLevel = (level: number) => {
    const maxLevel = 5;
    const stars = [];
    for (let i = 0; i < maxLevel; i++) {
      if (i < level) {
        stars.push(1);
      } else {
        stars.push(0);
      }
    }
    return stars.map((star, index) => (
      <Star
        key={index}
        className={star === 1 ? "rollerStarIcon" : "rollerNoStarIcon"}
        width={20}
        height={20}
      />
    ));
  };

  const displayStarsLevel = (rollerLevel: number, rollerStyle: string) => (
    <div className="spaceBetween">
      <p className="rollerLevelTitle">{rollerStyle}</p>
      <div className="flexStart">{handleRollerSkateLevel(rollerLevel)}</div>
    </div>
  );
  return (
    <>
      <div className={"rollerLevelContainer"}>
        <div>
          {displayStarsLevel(rollerDanceLevel, "Roller Dance")}
          {displayStarsLevel(skateParkLevel, "Skate Park")}
          {displayStarsLevel(artisticLevel, "Artistique")}
        </div>
        <div>
          {displayStarsLevel(freestyleLevel, "Freestyle")}
          {displayStarsLevel(urbanLevel, "Roller Urbain")}
          {displayStarsLevel(derbyLevel, "Roller Derby")}
        </div>
      </div>
      <div className="coloredSeparator" />
    </>
  );
}
