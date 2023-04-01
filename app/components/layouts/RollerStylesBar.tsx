import React from "react";
import styles from "../../styles/Profile.module.scss";
import Star from "app/svg/star.svg";

export default function RollerStylesbar() {
  return (
    <div className={styles.rollerStylesSeparator}>
      <p>Roller Dance</p>
      <Star className={styles.rollerStylesIcon} width={20} height={20} />
      <p>Patinage artistique</p>
      <Star className={styles.rollerStylesIcon} width={20} height={20} />
      <p>Roller Derby</p>
      <Star className={styles.rollerStylesIcon} width={20} height={20} />
      <p>Freestyle</p>
      <Star className={styles.rollerStylesIcon} width={20} height={20} />
      <p>Skate Park</p>
      <Star className={styles.rollerStylesIcon} width={20} height={20} />
      <p>Roller randonnée</p>
    </div>
  );
}
