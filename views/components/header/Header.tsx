import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { Navbar, Text } from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

import MyAccountDropdownMenu from "./MyAccountDropdownMenu";
import UserIcon from "views/svg/people-tag.svg";
import AddPost from "views/svg/add-circle.svg";

export default function Header() {
  const router = useRouter();
  const path = router.pathname.split("/")[1];
  const navbarToggleRef = useRef() as any;
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<any>(false);

  const { data: session } = useSession() as any;
  const userId = session?.user?.id;
  const userRole = session?.user?.role;
  const isAdmin = userRole === "ADMIN";

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

  return (
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
          width="200"
          height="65"
          priority
          style={{ marginTop: "10px", cursor: "pointer" }}
          onClick={() => router.push("/")}
        />
      </Navbar.Brand>
      <Navbar.Content activeColor="secondary" variant="underline" hideIn="xs">
        <Navbar.Link
          color="inherit"
          isActive={path === "business"}
          href="/business/search/all/all"
        >
          Annuaire
        </Navbar.Link>
        <Navbar.Link
          color="inherit"
          isActive={path === "myrollerblog"}
          href="/myrollerblog"
        >
          Flow
        </Navbar.Link>
        {isAdmin ? (
          <Navbar.Link color="inherit" href="/board/manager">
            Admin
          </Navbar.Link>
        ) : null}
      </Navbar.Content>
      <Navbar.Content activeColor="secondary" variant="underline">
        {userId ? (
          <>
            <MyAccountDropdownMenu
              logout={signOut}
              userId={userId}
              path={path}
            />
            <Navbar.Link
              color="inherit"
              isActive={path === "post"}
              href="/post/newpost"
            >
              <AddPost
                width={30}
                height={30}
                fill={path === "post" ? "white" : "#e4287d"}
                stroke={path === "post" ? "#e4287d" : "white"}
              />
            </Navbar.Link>
          </>
        ) : (
          <Navbar.Link color="inherit" href="/profile/me">
            <UserIcon width={34} height={34} stroke="#28152b" fill="none" />
          </Navbar.Link>
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
  );
}
