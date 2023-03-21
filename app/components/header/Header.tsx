import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { UserContext } from "../../context/UserContext";
import styles from "../../styles/Header.module.scss";

import UserProfile from "../../svg/profile-circle.svg";
import MySquad from "../../svg/flash.svg";
import Menu from "../../svg/menu.svg";
import Cancel from "../../svg/cancel.svg";
import axios from "axios";

export default function Header() {
  const router = useRouter();
  const { userDispatch } = useContext(UserContext);
  const [displayResponsiveMenu, setDisplayResponsiveMenu] = useState(false);

  const goTo = (link: string) => {
    setDisplayResponsiveMenu(false);
    router.push(link);
  };

  const goToMyAccount = () => {
    const token = localStorage.getItem("token");
    axios(`/api/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then(res => {
        const token = res.headers["authorization"];
        if (token) {
          localStorage.setItem("token", token);
        }
        console.log("res.data.user", res.data.user);
        userDispatch({ type: "SET_USER", payload: res.data.user });
        router.push("/myaccount");
      })
      .catch(() => router.push("/signin"));
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/">
            <Image
              className={styles.logo}
              src="/logo_myrollersquad_web.png"
              alt="Logo My Roller Squad"
              width="240"
              height="78"
              priority
            />
          </Link>
          <div className={styles.navigation}>
            <div
              className={styles.responsiveNavigationIcon}
              onClick={() => setDisplayResponsiveMenu(prevState => !prevState)}
            >
              {displayResponsiveMenu ? (
                <Cancel className={styles.icon} width={42} height={42} />
              ) : (
                <Menu className={styles.icon} width={42} height={42} />
              )}
            </div>
            <div className={styles.navigationText}>
              <Link href="/calendar">
                <p className={styles.iconText}>Agenda</p>
              </Link>
              <Link href="/places">
                <p className={styles.iconText}>Annuaire</p>
              </Link>
              <Link href="/blog">
                <p className={styles.iconText}>Blog</p>
              </Link>
            </div>
            <div className={styles.navigationIcon}>
              <Link href="/flow">
                <MySquad className={styles.icon} width={42} height={42} />
              </Link>

              <UserProfile
                className={styles.icon}
                width={38}
                height={38}
                onClick={goToMyAccount}
                role="button"
              />
            </div>
          </div>
        </div>
      </header>
      {displayResponsiveMenu ? (
        <div className={styles.responsiveNavigationText}>
          <p className={styles.iconText} onClick={() => goTo("/flow")}>
            My Roller Squad
          </p>
          <p className={styles.iconText} onClick={() => goTo("/calendar")}>
            Agenda
          </p>
          <p className={styles.iconText} onClick={() => goTo("/places")}>
            Annuaire
          </p>
          <p className={styles.iconText} onClick={() => goTo("/blog")}>
            Blog
          </p>
          <p className={styles.iconText} onClick={goToMyAccount}>
            Mon compte
          </p>
        </div>
      ) : null}
    </>
  );
}
