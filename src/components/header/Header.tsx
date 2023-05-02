import { useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { UserContext } from "../../context/UserContext";
import styles from "../../styles/Header.module.scss";

import UserProfile from "src/svg/profile-circle.svg";
import MySquad from "src/svg/flash.svg";
import Admin from "src/svg/admin.svg";
import Search from "src/svg/search.svg";

export default function Header() {
  const router = useRouter();
  const { userState } = useContext(UserContext);
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
            <Link href={"/myrollerblog"}>
              <MySquad
                className={
                  path === "myrollerblog" ? styles.icon : styles.iconInactive
                }
                width={42}
                height={42}
              />
            </Link>
            <Link href={"/profile/me"}>
              <UserProfile
                className={
                  path === "profile" ? styles.icon : styles.iconInactive
                }
                width={38}
                height={38}
              />
            </Link>
            {isAdmin ? (
              <Link href={"/board/manager"}>
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
