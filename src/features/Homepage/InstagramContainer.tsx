import React from "react";
import styles from "../../styles/Home.module.scss";
import Instagram from "src/svg/instagram.svg";

export default function InstagramContainer() {
  return (
    <div className={styles.darkBox}>
      <a
        href={"https://www.instagram.com/myrollersquad/"}
        aria-label="Lien vers la page Instagram de myRollerSquad"
        target="_blank"
        rel="noreferrer"
      >
        <div className="center">
          <Instagram style={{ stroke: "white" }} width={42} height={42} />
        </div>
        <div className={styles.underliner} />
        <h2 className={styles.boxTitle}>
          myRollerSquad est aussi sur Instagram !
        </h2>
        <p className={styles.boxText}>
          Partage ton set-up, ta squad et tes prouesses avec la communauté.
        </p>
      </a>
    </div>
  );
}
