import React, { useState } from "react";
import Star from "app/svg/star.svg";
import styles from "../../styles/Profile.module.scss";

interface Props {
  rollerDanceLevel: number;
  skateParkLevel: number;
  artisticLevel: number;
  freestyleLevel: number;
  urbanLevel: number;
}

export default function RollerSkateLevel({
  rollerDanceLevel,
  skateParkLevel,
  artisticLevel,
  freestyleLevel,
  urbanLevel,
}: Props) {
  const handleRollerSkateLevel = (level: number) => {
    const maxLevel = 5;
    let stars = [];
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
        className={star === 1 ? styles.rollerStarIcon : styles.rollerNoStarIcon}
        width={20}
        height={20}
      />
    ));
  };
  return (
    <div className={styles.rollerLevelContainer}>
      <div className="spaceBetween">
        <p>Roller Dance</p>
        <div className="flexStart">
          {handleRollerSkateLevel(rollerDanceLevel)}
        </div>
      </div>
      <div className="spaceBetween">
        <p>Skate Park</p>
        <div className="flexStart">
          {handleRollerSkateLevel(skateParkLevel)}
        </div>
      </div>
      <div></div>
    </div>
  );
}
