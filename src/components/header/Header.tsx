import { useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Dropdown } from "@nextui-org/react";

import { UserContext } from "../../context/UserContext";
import styles from "../../styles/Header.module.scss";

import UserProfile from "src/svg/profile-circle.svg";
import MySquad from "src/svg/flash.svg";
import Admin from "src/svg/admin.svg";
import Search from "src/svg/search.svg";
import { onLogout } from "../auth/utils/services";

export default function Header() {
  const router = useRouter();
  const { userState, userDispatch } = useContext(UserContext);
  const isLogged = userState.isLoggedIn && userState.id;
  const isAdmin = userState.role === "ADMIN";
  const dept = userState.county ? userState.county : "all";
  const path = router.pathname.split("/")[1];

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
                    <Link href={`/profile/posts/${userState.id}`}>
                      Tableau de bord
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>Notifications</Dropdown.Item>
                  <Dropdown.Item withDivider color="error">
                    <span
                      role="button"
                      tabIndex={0}
                      onKeyDown={() => onLogout(userDispatch)}
                      onClick={() => onLogout(userDispatch)}
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
