import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Dropdown } from "@nextui-org/react";
import { onLogout } from "../auth/utils/services";
import { State, useStore } from "src/hooks/useStore";
import { shallow } from "zustand/shallow";

import styles from "../../styles/Header.module.scss";

import UserProfile from "src/svg/profile-circle.svg";
import MySquad from "src/svg/flash.svg";
import Admin from "src/svg/admin.svg";
import Search from "src/svg/search.svg";

export default function Header() {
  const router = useRouter();
  const path = router.pathname.split("/")[1];

  const { userId, userRole, userCounty, isLoggedIn, userLogout } = useStore(
    (state: State) => ({
      userId: state.userId,
      userRole: state.userRole,
      isLoggedIn: state.isLoggedIn,
      userCounty: state.county,
      userLogout: state.logout,
    }),
    shallow
  );

  const isLogged = isLoggedIn && userId;
  const isAdmin = userRole === "ADMIN";
  const dept = userCounty ? userCounty : "all";

  return (
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
          <div className={styles.navigationIcon}>
            <Link href={`/business/search/${dept}/all`}>
              <Search
                className={
                  path === "business" ? styles.icon : styles.iconInactive
                }
                width={42}
                height={42}
              />
            </Link>
            <Link href={isLogged ? "/myrollerblog" : "/signin"}>
              <MySquad
                className={
                  path === "myrollerblog" ? styles.icon : styles.iconInactive
                }
                width={42}
                height={42}
              />
            </Link>

            {isLogged ? (
              <Dropdown>
                <Dropdown.Button
                  color={path === "profile" ? "error" : "default"}
                  light
                >
                  <UserProfile
                    className={
                      path === "profile" ? styles.icon : styles.iconInactive
                    }
                    width={38}
                    height={38}
                  />
                </Dropdown.Button>
                <Dropdown.Menu aria-label="Static Actions">
                  <Dropdown.Item>
                    <Link href={"/profile/me"}>Mon compte</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link href={`/profile/posts/${userId}`}>
                      Tableau de bord
                    </Link>
                  </Dropdown.Item>
                  {/* <Dropdown.Item>Notifications</Dropdown.Item> */}
                  <Dropdown.Item withDivider color="error">
                    <span
                      role="button"
                      tabIndex={0}
                      onKeyDown={() => onLogout(userLogout)}
                      onClick={() => onLogout(userLogout)}
                    >
                      Se déconnecter
                    </span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link href={"/signin"}>
                <UserProfile
                  className={
                    path === "profile" ? styles.icon : styles.iconInactive
                  }
                  width={38}
                  height={38}
                />
              </Link>
            )}

            {isAdmin ? (
              <Link href={isLogged ? "/board/manager" : "/signin"}>
                <Admin
                  className={
                    path === "board" ? styles.icon : styles.iconInactive
                  }
                  width={38}
                  height={38}
                />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
