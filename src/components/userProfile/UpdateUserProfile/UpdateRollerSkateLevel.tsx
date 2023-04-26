import React, { useState } from "react";
import Star from "src/svg/star.svg";
import styles from "src/styles/Profile.module.scss";

interface Props {
  label: string;
  currentLevel: number;
  userProfileDispatch: React.Dispatch<any>;
  type: string;
}

export default function UpdateRollerSkateLevel({
  label,
  currentLevel,
  userProfileDispatch,
  type,
}: Props) {
  const rating = currentLevel + 1;
  const [hover, setHover] = useState(0);
  const levels = [1, 2, 3, 4, 5];

  const handleLevel = (level: number) => {
    const objectLevel = {} as any;
    objectLevel[type] = level;
    userProfileDispatch({
      type: "UPDATE_USER_ROLLER_SKATE_LEVEL",
      payload: objectLevel,
    });
  };

  return (
    <>
      <div className="spaceBetween mt5">
        <p className={styles.rollerLevelTitle}>{label}</p>
        <div className="flexStart">
          {levels.map(star => (
            <Star
              key={star}
              role="button"
              className={
                star < (hover || rating)
                  ? styles.updateRollerStarIcon
                  : styles.updateRollerNoStarIcon
              }
              width={20}
              height={20}
              onClick={() => handleLevel(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(rating)}
            />
          ))}
        </div>
      </div>
    </>
  );
}