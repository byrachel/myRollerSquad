import React, { useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { UserContext } from "src/context/UserContext";
import styles from "../../styles/Profile.module.scss";

import Logout from "src/svg/logout.svg";

export default function LogoutButton() {
  const { userDispatch } = useContext(UserContext);
  const router = useRouter();

  const logout = () => {
    axios({
      method: "post",
      url: `/api/auth/logout`,
      data: {},
    }).then(() => {
      userDispatch({ type: "LOGOUT" });
      router.push("/");
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
