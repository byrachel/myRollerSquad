import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Avatar, Button, Dropdown, Navbar, Text } from "@nextui-org/react";
import { onLogout } from "../../features/auth/utils/services";
import { State, useUser } from "src/hooks/useUser";
import { shallow } from "zustand/shallow";

import styles from "../../styles/Header.module.scss";

// import UserProfile from "src/svg/profile-circle.svg";
// import MySquad from "src/svg/flash.svg";
// import Search from "src/svg/search.svg";

export default function Header() {
  const router = useRouter();
  const navbarToggleRef = useRef() as any;
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<any>(false);

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

  const collapseItems = [
    { id: 1, name: "Annuaire", link: "/business/search/all/all" },
    { id: 2, name: "Blog", link: "/myrollerblog" },
  ];

  const adminItems = [
    ...collapseItems,
    { id: 4, name: "Admin", link: "/board/manager" },
  ];

  const handleSideMenu = (link: string) => {
    router.push(link);
    isSideMenuOpen && navbarToggleRef.current.click();
  };

  const goTo = (actionKey: string) => {
    switch (actionKey) {
      case "myProfile":
        router.push(`/profile/me`);
        break;
      case "myFavs":
        router.push(`/profile/favs/${userId}`);
        break;
      case "myPosts":
        router.push(`/profile/posts/${userId}`);
        break;
      case "logout":
        onLogout(userLogout, router);
        break;
      default:
        router.push("/");
    }
  };

  return (
    <Navbar isBordered variant="sticky">
      <Navbar.Toggle
        showIn="xs"
        ref={navbarToggleRef}
        onChange={(isSelected) => setIsSideMenuOpen(isSelected)}
      />
      <Navbar.Brand>
        <Image
          className={styles.logo}
          src="/logo_myrollersquad_web.png"
          alt="Logo My Roller Squad"
          width="240"
          height="78"
          priority
        />
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        activeColor="error"
        hideIn="xs"
        variant="highlight"
      >
        <Navbar.Link
          isActive={path === "business"}
          href="/business/search/all/all"
        >
          Annuaire
        </Navbar.Link>
        <Navbar.Link isActive={path === "myrollerblog"} href="/myrollerblog">
          Blog
        </Navbar.Link>
        {isAdmin ? (
          <Navbar.Link href="/board/manager">
            <Text weight="bold">Admin</Text>
          </Navbar.Link>
        ) : null}
      </Navbar.Content>

      <Navbar.Content
        css={{
          "@xs": {
            w: "12%",
            jc: "flex-end",
          },
        }}
      >
        {isLogged ? (
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered={myProfilePage}
                  as="button"
                  color="secondary"
                  size="lg"
                  src="/img/myrollersquad_avatar.jpeg"
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey: any) => goTo(actionKey)}
            >
              <Dropdown.Item key="myProfile">Mon compte</Dropdown.Item>
              <Dropdown.Item key="myPosts">Mes publications</Dropdown.Item>
              <Dropdown.Item key="myFavs">Mes favoris</Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                Se déconnecter
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Navbar.Item>
            <Button auto flat as={Link} color="error" href="/signin">
              Se connecter
            </Button>
          </Navbar.Item>
        )}
      </Navbar.Content>
      <Navbar.Collapse>
        {isAdmin
          ? adminItems.map((item) => (
              <Navbar.CollapseItem key={item.id}>
                <Text
                  color="inherit"
                  weight="bold"
                  onClick={() => handleSideMenu(item.link)}
                >
                  {item.name}
                </Text>
              </Navbar.CollapseItem>
            ))
          : collapseItems.map((item) => (
              <Navbar.CollapseItem key={item.id}>
                <Text
                  color="inherit"
                  weight="bold"
                  css={{
                    cursor: "pointer",
                  }}
                  onClick={() => handleSideMenu(item.link)}
                >
                  {item.name}
                </Text>
              </Navbar.CollapseItem>
            ))}
      </Navbar.Collapse>
    </Navbar>

    // <header className={styles.header}>
    //   <div className={styles.container}>
    //     <Link href="/">
    //       <Image
    //         className={styles.logo}
    //         src="/logo_myrollersquad_web.png"
    //         alt="Logo My Roller Squad"
    //         width="240"
    //         height="78"
    //         priority
    //       />
    //     </Link>
    //     <div className={styles.navigation}>
    //       <div className={styles.navigationIcon}>
    //         <Link href={"/business/search/all/all"}>
    //           <p className={path === "business" ? styles.active : ""}>
    //             Annuaire
    //           </p>
    //         </Link>
    //         <Link href={"/myrollerblog"}>
    //           <p className={path === "myrollerblog" ? styles.active : ""}>
    //             Flow
    //           </p>
    //         </Link>

    //         {isLogged ? (
    //           <Dropdown>
    //             <Dropdown.Button color="secondary" light>
    //               <UserProfile
    //                 className={
    //                   myProfilePage ? styles.icon : styles.iconInactive
    //                 }
    //                 width={38}
    //                 height={38}
    //               />
    //             </Dropdown.Button>
    //             <Dropdown.Menu aria-label="Static Actions">
    //               <Dropdown.Item>
    //                 <Link href={"/profile/me"}>Mon compte</Link>
    //               </Dropdown.Item>
    //               <Dropdown.Item>
    //                 <Link href={`/profile/posts/${userId}`}>
    //                   Mes publications
    //                 </Link>
    //               </Dropdown.Item>
    //               <Dropdown.Item>
    //                 <Link href={`/profile/favs/${userId}`}>Mes favoris</Link>
    //               </Dropdown.Item>
    //               <Dropdown.Item withDivider color="error">
    //                 <span
    //                   role="button"
    //                   tabIndex={0}
    //                   onKeyDown={() => onLogout(userLogout, router)}
    //                   onClick={() => onLogout(userLogout, router)}
    //                 >
    //                   Se déconnecter
    //                 </span>
    //               </Dropdown.Item>
    //             </Dropdown.Menu>
    //           </Dropdown>
    //         ) : (
    //           <Link href={"/signin"}>
    //             <UserProfile
    //               className={
    //                 path === "profile" ? styles.icon : styles.iconInactive
    //               }
    //               width={38}
    //               height={38}
    //             />
    //           </Link>
    //         )}

    //         {isAdmin ? (
    //           <Link href={isLogged ? "/board/manager" : "/signin"}>
    //             <Admin
    //               className={
    //                 path === "board" ? styles.icon : styles.iconInactive
    //               }
    //               width={38}
    //               height={38}
    //             />
    //           </Link>
    //         ) : null}
    //       </div>
    //     </div>
    //   </div>
    // </header>
  );
}
