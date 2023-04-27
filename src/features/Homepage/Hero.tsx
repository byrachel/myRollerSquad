import { useState } from "react";
import Image from "next/image";

import BigButton from "../../components/buttons/BigButton";
import styles from "../../styles/Home.module.scss";
import RegisterForm from "../../components/auth/RegisterForm";

export default function Hero() {
  const [displayRegisterForm, setDisplayRegisterForm] = useState(false);
  return (
    <div className={styles.homeHero}>
      <div className={styles.heroCta}>
        <h1 className={styles.ctaTitle}>
          Fan de
          <br /> Roller Quad
        </h1>
        {displayRegisterForm ? (
          <RegisterForm />
        ) : (
          <>
            <p className={styles.ctaText}>
              Tu cherches des <b>roller skaters près de chez toi</b> ?
            </p>
            <p className={styles.ctaText}>
              Tu veux participer à une{" "}
              <b>rando roller sur ton lieu de vacances</b> ou en organiser une ?
            </p>
            <p className={styles.ctaText}>
              Tu revends ton matériel ou cherches de la "seconde main" ?
            </p>
            <h2 className={styles.cta}>
              Quelque soit ton style ou ton niveau, rejoins-nous !
            </h2>
            <div className={styles.ctaButton}>
              <BigButton
                text="Créer un compte"
                type="button"
                style="outline"
                onClick={() => setDisplayRegisterForm(true)}
              />
            </div>
          </>
        )}
      </div>
      <div className={styles.heroImage}>
        <Image
          src="/img/pexels-airam-datoon-rollerskater.jpg"
          alt="Patins à roulettes au Skate Park"
          className={styles.image}
          width={768}
          height={724}
        />
      </div>
    </div>
  );
}
