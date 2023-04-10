import React from "react";
import styles from "../../styles/Profile.module.scss";
import Star from "app/svg/star.svg";

export default function RollerStylesbar() {
  return (
    <div className={styles.rollerStylesSeparator}>
      <div className={styles.rollerStylesContent}>
        <p>Roller Dance</p>
        <Star className={styles.rollerStylesIcon} width={15} height={15} />
        <p>Patinage Artistique</p>
        <Star className={styles.rollerStylesIcon} width={15} height={15} />
        <p>Roller Derby</p>
        <Star className={styles.rollerStylesIcon} width={15} height={15} />
        <p>Freestyle</p>
        <Star className={styles.rollerStylesIcon} width={15} height={15} />
        <p>Skate Park</p>
        <Star className={styles.rollerStylesIcon} width={15} height={15} />
        <p>Roller Urbain</p>
      </div>
    </div>
  );
}
