import React, { useState } from "react";
import Star from "views/svg/star.svg";

interface Props {
  label: string;
  currentLevel: number;
  dispatchUserDataToUpdate: React.Dispatch<any>;
  type: string;
}

export default function UpdateRollerSkateLevel({
  label,
  currentLevel,
  dispatchUserDataToUpdate,
  type,
}: Props) {
  const rating = currentLevel + 1;
  const [hover, setHover] = useState(0);
  const levels = [1, 2, 3, 4, 5];

  const handleLevel = (level: number) => {
    const objectLevel = {} as any;
    objectLevel[type] = level;
    dispatchUserDataToUpdate({
      type: "UPDATE_USER_ROLLER_SKATE_LEVEL",
      payload: objectLevel,
    });
  };

  const resetLevel = () => {
    const objectLevel = {} as any;
    objectLevel[type] = 0;
    dispatchUserDataToUpdate({
      type: "UPDATE_USER_ROLLER_SKATE_LEVEL",
      payload: objectLevel,
    });
    setHover(0);
  };

  return (
    <div className="spaceBetween mt5">
      <p className="rollerLevelTitle">{label}</p>
      <div className="flexStart">
        {levels.map((star) => (
          <Star
            key={star}
            role="button"
            className={
              star < (hover || rating)
                ? "updateRollerStarIcon"
                : "updateRollerNoStarIcon"
            }
            width={20}
            height={20}
            onClick={() => handleLevel(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(rating)}
          />
        ))}
        <div
          style={{ cursor: "pointer" }}
          role="button"
          tabIndex={0}
          onClick={resetLevel}
          onKeyDown={resetLevel}
        >
          -
        </div>
      </div>
    </div>
  );
}
