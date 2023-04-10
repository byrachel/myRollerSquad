import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { UserContext } from "../../context/UserContext";
import styles from "../../styles/Header.module.scss";

import UserProfile from "app/svg/profile-circle.svg";
import MySquad from "app/svg/flash.svg";
import Menu from "app/svg/menu.svg";
import Cancel from "app/svg/cancel.svg";
import Admin from "app/svg/admin.svg";

export default function Header() {
  const router = useRouter();
  const { userState } = useContext(UserContext);
  const [displayResponsiveMenu, setDisplayResponsiveMenu] = useState(false);
  const isAdmin = userState.user ? userState.user.role === "ADMIN" : false;

  const goTo = (link: string) => {
    setDisplayResponsiveMenu(false);
    router.push(link);
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
              onKeyDown={() =>
                setDisplayResponsiveMenu(prevState => !prevState)
              }
              role="button"
              tabIndex={0}
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
            </div>
            <div className={styles.navigationIcon}>
              <MySquad
                className={styles.icon}
                width={42}
                height={42}
                onClick={() => goTo("/flow")}
                role="button"
              />
              <UserProfile
                className={styles.icon}
                width={38}
                height={38}
                onClick={() =>
                  userState.user && userState.user.id
                    ? goTo(`/profile/${userState.user.id}`)
                    : goTo("/signin")
                }
                role="button"
              />
              {isAdmin ? (
                <Admin
                  className={styles.icon}
                  width={38}
                  height={38}
                  onClick={() => goTo("/board/manager")}
                  role="button"
                />
              ) : null}
            </div>
          </div>
        </div>
      </header>
      {displayResponsiveMenu ? (
        <div className={styles.responsiveNavigationText}>
          <div
            role="button"
            tabIndex={0}
            onKeyDown={() => goTo("/calendar")}
            className={styles.iconText}
            onClick={() => goTo("/calendar")}
          >
            Agenda
          </div>
          <div
            role="button"
            tabIndex={0}
            className={styles.iconText}
            onClick={() => goTo("/places")}
            onKeyDown={() => goTo("/places")}
          >
            Annuaire
          </div>
          <div
            role="button"
            tabIndex={0}
            className={styles.iconText}
            onClick={() => goTo("/flow")}
            onKeyDown={() => goTo("/flow")}
          >
            My Roller Squad
          </div>
          <div
            role="button"
            tabIndex={0}
            className={styles.iconText}
            onClick={() =>
              userState.user && userState.user.id
                ? goTo(`/profile/${userState.user.id}`)
                : goTo("/signin")
            }
            onKeyDown={() =>
              userState.user && userState.user.id
                ? goTo(`/profile/${userState.user.id}`)
                : goTo("/signin")
            }
          >
            Mon compte
          </div>
          {isAdmin ? (
            <div
              role="button"
              tabIndex={0}
              className={styles.iconText}
              onClick={() => goTo("/board/manager")}
              onKeyDown={() => goTo("/board/manager")}
            >
              Manager Board
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
