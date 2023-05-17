import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Dropdown } from "@nextui-org/react";
import { onLogout } from "../../features/auth/utils/services";
import { State, useUser } from "src/hooks/useUser";
import { shallow } from "zustand/shallow";

import styles from "../../styles/Header.module.scss";

import UserProfile from "src/svg/profile-circle.svg";
import Admin from "src/svg/admin.svg";
// import MySquad from "src/svg/flash.svg";
// import Search from "src/svg/search.svg";

export default function Header() {
  const router = useRouter();
  const path = router.pathname.split("/")[1];
  const myProfilePage =
    router.pathname === "/profile/[uid]" && router.query.uid === "me";

  const { userId, userRole, isLoggedIn, userLogout } = useUser(
    (state: State) => ({
      userId: state.userId,
      userRole: state.userRole,
      isLoggedIn: state.isLoggedIn,
      userLogout: state.logout,
    }),
    shallow
  );

  const isLogged = isLoggedIn && userId;
  const isAdmin = isLoggedIn && userRole === "ADMIN";

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
            <Link href={"/business/search/all/all"}>
              <p className={path === "business" ? styles.active : ""}>
                Annuaire
              </p>
            </Link>
            <Link href={"/myrollerblog"}>
              <p className={path === "myrollerblog" ? styles.active : ""}>
                Flow
              </p>
            </Link>

            {isLogged ? (
              <Dropdown>
                <Dropdown.Button color="secondary" light>
                  <UserProfile
                    className={
                      myProfilePage ? styles.icon : styles.iconInactive
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
                      Mes publications
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link href={`/profile/favs/${userId}`}>Mes favoris</Link>
                  </Dropdown.Item>
                  <Dropdown.Item withDivider color="error">
                    <span
                      role="button"
                      tabIndex={0}
                      onKeyDown={() => onLogout(userLogout, router)}
                      onClick={() => onLogout(userLogout, router)}
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
