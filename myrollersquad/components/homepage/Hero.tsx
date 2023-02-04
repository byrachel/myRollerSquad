import Image from "next/image";

import styles from "../../styles/Home.module.scss";
import RegularButton from "../buttons/RegularButton";

export default function Hero() {
  return (
    <div className={styles.homeHero}>
      <div className={styles.heroCta}>
        <h1 className={styles.cta}>
          Fan de
          <br /> Roller Quad
        </h1>
        <h2 className={styles.ctaText}>
          Quelque soit ton style ou ton niveau, rejoins-nous !
        </h2>
        <p>
          Créons ensemble la plus grande communauté de passionnés et
          professionnels de roller skaters.
        </p>
        <div className={styles.ctaButton}>
          <RegularButton text="Créer un compte" type="full" />
        </div>
      </div>
      <div className={styles.heroImage}>
        <Image
          src="/img/pexels-airam-datoon-rollerskater.jpg"
          alt="Patins à roulettes au Skate Park"
          className={styles.image}
          fill
        />
      </div>
    </div>
  );
}
