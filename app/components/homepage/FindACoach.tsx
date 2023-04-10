import Image from "next/image";
// import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.scss";

export default function FindACoach() {
  // const [userLocation, setUserLocation] = useState(null);

  // useEffect(() => {
  //   fetch(`https://geolocation-db.com/json/`)
  //     .then(res => res.json())
  //     .then(data => setUserLocation(data.city));
  // }, []);

  return (
    <div className={styles.blueBox}>
      <h2 className={styles.blueBoxTitle}>
        Envie de te lancer, de dépasser tes limites ?
      </h2>
      <div className={styles.underliner} />
      <p className={styles.blueBoxText}>
        Découvre les cours & formateurs de ta région et passe au niveau
        supérieur !
      </p>
      <form>
        <input type="search" placeholder={"Dans quel département es-tu ?"} />
        <button type="submit">Rechercher</button>
      </form>
      <div className={styles.fourRoundImages}>
        <div className={styles.roundImage}>
          <Image
            src="/img/pexels-rodnae-productions-7335311.jpg"
            alt="Formateur Roller Quad"
            className={styles.yellowImage}
            width={512}
            height={768}
          />
        </div>
        <div className={styles.roundImage}>
          <Image
            src="/img/pexels-airam-datoon-11990101.jpg"
            alt="Formateur Roller Quad"
            className={styles.pinkImage}
            width={614}
            height={768}
          />
        </div>
        <div className={styles.roundImage}>
          <Image
            src="/img/pexels-airam-datoon-11990083.jpg"
            alt="Formateur Roller Quad"
            className={styles.yellowImage}
            width={512}
            height={768}
          />
        </div>
        <div className={styles.roundImage}>
          <Image
            src="/img/pexels-katya-wolf-8734228.jpg"
            alt="Formateur Roller Quad"
            className={styles.pinkImage}
            width={512}
            height={768}
          />
        </div>
      </div>
    </div>
  );
}
