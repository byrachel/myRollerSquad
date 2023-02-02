import Image from "next/image";
import Link from 'next/link'

import styles from "../../styles/Header.module.scss";

import Calendar from "../icons/svg/agenda.svg"
import Directory from "../icons/svg/annuaire.svg"
import Roller from "../icons/svg/rollerquad.svg"
import Blog from "../icons/svg/infos.svg"
import Skater from "../icons/svg/rollerskater.svg"

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Image className={styles.logo} src="/logo_myrollersquad_web.png" alt="Logo My Roller Squad" width="240" height="78" />
        <div className={styles.navigation}>
            <div className={styles.iconContainer}>
          <Link href="/">
              <Calendar className={styles.icon} width={42} height={42} />
          </Link>
              <p className={styles.iconText}>Agenda</p>
            </div>
            <div className={styles.iconContainer}>
          <Link href="/">
              <Directory className={styles.icon} width={42} height={42} />
          </Link>
              <p className={styles.iconText}>Annuaire</p>
            </div>
            <div className={styles.iconContainer}>
          <Link href="/">
              <Roller className={styles.icon} width={42} height={42} />
          </Link>
              <p className={styles.iconText}>Ma squad</p>
            </div>
          <div className={styles.iconContainer}>
            <Link href="/">
              <Blog className={styles.icon} width={42} height={42} />
            </Link>
            <p className={styles.iconText}>Infos</p>
          </div>
          <div className={styles.iconContainer}>
            <Link href="/">
              <Skater className={styles.icon} width={42} height={42} />
            </Link>
            <p className={styles.iconText}>Profil</p>
          </div>
        </div>
      </div>
    </header>
  )
}
