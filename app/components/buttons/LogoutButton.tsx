import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

import styles from "../../styles/Profile.module.scss";

import Logout from "app/svg/logout.svg";

interface Props {
  userDispatch: React.Dispatch<any>;
}

export default function LogoutButton({ userDispatch }: Props) {
  const router = useRouter();

  const logout = () => {
    axios({
      method: "post",
      url: `/api/auth/logout`,
      data: {},
    }).then(() => {
      localStorage.removeItem("token");
      userDispatch({ type: "LOGOUT" });
      router.push("/signin");
    });
  };

  return (
    <Logout
      className={styles.logoutIcon}
      width={30}
      height={30}
      onClick={logout}
    />
  );
}
