import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Avatar, Button, Dropdown, Navbar, Text } from "@nextui-org/react";
import { onLogout } from "../../features/auth/utils/services";
import { State, useUser } from "src/hooks/useUser";
import { shallow } from "zustand/shallow";

export default function Header() {
  const router = useRouter();
  const navbarToggleRef = useRef() as any;
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<any>(false);

  const path = router.pathname.split("/")[1];

  const { userRole, avatar, userId, userLogout } = useUser(
    (state: State) => ({
      userId: state.userId,
      userRole: state.userRole,
      avatar: state.avatar,
      userLogout: state.logout,
    }),
    shallow
  );

  const isLogged = userId;
  const isAdmin = isLogged && userRole === "ADMIN";

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
    <header>
      <Navbar isBordered variant="sticky">
        <Navbar.Toggle
          showIn="xs"
          ref={navbarToggleRef}
          onChange={(isSelected) => setIsSideMenuOpen(isSelected)}
        />
        <Navbar.Brand>
          <Image
            src="/logo_myrollersquad_web.png"
            alt="Logo MyRollerSquad"
            width="240"
            height="78"
            priority
            style={{ marginTop: "10px" }}
          />
        </Navbar.Brand>
        <Navbar.Content
          enableCursorHighlight
          activeColor="secondary"
          hideIn="xs"
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
            <Dropdown placement="bottom-right" isBordered>
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                    bordered
                    as="button"
                    color="secondary"
                    size="lg"
                    src={
                      "/img/myrollersquad_avatar.jpeg"
                      // src={
                      //   avatar
                      //     ? `https://mys3rollerpicts.s3.eu-west-3.amazonaws.com/${avatar}`
                      //     : "/img/myrollersquad_avatar.jpeg"
                    }
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label="User menu actions"
                color="warning"
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
                <Text color="inherit" weight="bold">
                  Se connecter
                </Text>
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
    </header>
  );
}
