import Image from "next/image";

import styles from "../../styles/Home.module.scss";
import AddEventToFav from "../buttons/AddEventToFav";
import GoTo from "../buttons/GoTo";

export default function NextEvent() {
  return (
    <div className={styles.homeNextEvent}>
      <div className={styles.nextEventLogo}>
        <Image
          src="/img/logo_dates_slb23.png"
          alt="Logo Skate Love Barcelona"
          width={154}
          height={139}
        />
      </div>
      <div className={styles.nextEventCard}>
        <h2 className={styles.nextEventTitle}>Prochain événement</h2>
        <div className={styles.card}>
          <p className="meta">14 - 17 septembre 2023</p>
          <h2 className="title">Skate Love Barcelona</h2>
          <p className="slogan">International Skate Music Festival</p>
          <div className="pinkUnderliner" />
          <div className="spaceBetween">
            <AddEventToFav userFav={true} favCounter={2} />
            <GoTo page={"/calendar"} />
          </div>
        </div>
      </div>
    </div>
  );
}
