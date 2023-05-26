import React from "react";
import { Dropdown, Navbar } from "@nextui-org/react";
import { useRouter } from "next/router";

import UserIcon from "src/svg/people-tag.svg";

interface Props {
  userId: number;
  logout: () => void;
  path: string;
}

export default function MyAccountDropdownMenu({ logout, userId, path }: Props) {
  const router = useRouter();

  const goTo = (actionKey: string) => {
    switch (actionKey) {
      case "myAccount":
        router.push(`/profile/me`);
        break;
      case "myFavs":
        router.push(`/profile/favs/${userId}`);
        break;
      case "myPosts":
        router.push(`/profile/posts/${userId}`);
        break;
      case "logout":
        logout();
        break;
      default:
        router.push("/");
    }
  };

  return (
    <Dropdown isBordered>
      <Navbar.Item isActive={path === "profile"}>
        <Dropdown.Button
          auto
          light
          css={{
            px: 0,
            dflex: "center",
            svg: { pe: "none" },
          }}
          ripple={false}
        >
          <UserIcon width={30} height={30} stroke="#28152b" fill="none" />
        </Dropdown.Button>
      </Navbar.Item>
      <Dropdown.Menu
        aria-label="Mon compte"
        css={{
          $$dropdownMenuWidth: "300px",
          $$dropdownItemHeight: "50px",
          "& .nextui-dropdown-item": {
            "& .nextui-dropdown-item-content": {
              w: "100%",
              fontWeight: "$semibold",
            },
          },
        }}
        onAction={(actionKey: any) => goTo(actionKey)}
      >
        <Dropdown.Item key="myAccount">Mon compte</Dropdown.Item>
        <Dropdown.Item key="myPosts" withDivider>
          Mes publications
        </Dropdown.Item>
        <Dropdown.Item key="myFavs" withDivider>
          Mes favoris
        </Dropdown.Item>
        <Dropdown.Item key="logout" withDivider>
          Me déconnecter
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
