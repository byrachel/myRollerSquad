import React from "react";
import styles from "../../styles/Profile.module.scss";
import Star from "app/svg/star.svg";

export default function RollerStylesbar() {
  return (
    <div className={styles.rollerStylesSeparator}>
      <div className={styles.rollerStylesContent}>
        <p>Roller Dance</p>
        <Star className={styles.rollerStylesIcon} width={18} height={18} />
        <p>Patinage Artistique</p>
        <Star className={styles.rollerStylesIcon} width={18} height={18} />
        <p>Roller Derby</p>
        <Star className={styles.rollerStylesIcon} width={18} height={18} />
        <p>Freestyle</p>
        <Star className={styles.rollerStylesIcon} width={18} height={18} />
        <p>Skate Park</p>
        <Star className={styles.rollerStylesIcon} width={18} height={18} />
        <p>Roller Urbain</p>
      </div>
    </div>
  );
}
