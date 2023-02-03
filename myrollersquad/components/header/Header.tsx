import Image from "next/image";
import Link from 'next/link'

import styles from "../../styles/Header.module.scss";

import UserProfile from "../icons/svg/profile-circle.svg";
import MySquad from "../icons/svg/flash.svg";


export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Image className={styles.logo} src="/logo_myrollersquad_web.png" alt="Logo My Roller Squad" width="240" height="78" />
        <div className={styles.navigation}>
          <div className={styles.navigationText}>
            <Link href="/">
              <p className={styles.iconText}>Agenda</p>
            </Link>
            <Link href="/">
              <p className={styles.iconText}>Annuaire</p>
            </Link>
            <Link href="/">
              <p className={styles.iconText}>Blog</p>
            </Link>
          </div>
          <div className={styles.navigationIcon}>
            <Link href="/">
              <MySquad className={styles.icon} width={42} height={42} />
            </Link>
            <Link href="/">
              <UserProfile className={styles.icon} width={38} height={38} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
