import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

import styles from "../../styles/Profile.module.scss";

import Logout from "app/svg/logout.svg";
import { API_URL } from "app/constants/URL";

interface Props {
  userId: number;
}

export default function LogoutButton({ userId }: Props) {
  const router = useRouter();

  const logout = (userId: number) => {
    const token = localStorage.getItem("token");
    if (userId && token) {
      axios({
        method: "post",
        url: `${API_URL}/api/logout`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
        .then(() => {
          localStorage.removeItem("token");
          router.push("/");
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <Logout
      className={styles.logoutIcon}
      width={30}
      height={30}
      onClick={() => logout(userId)}
    />
  );
}
