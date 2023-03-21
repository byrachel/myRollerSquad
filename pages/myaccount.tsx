import React, { useEffect, useState } from "react";
import axios from "axios";

import RollerStylesbar from "@/components/layouts/RollerStylesBar";
import UserInfos from "@/components/userProfile/UserInfos";
import { UserInterface } from "app/interfaces/userInterfaces";

export default function MyAccount() {
  const [myProfile, setMyProfile] = useState<{
    loading: boolean;
    error: boolean;
    user: UserInterface | null;
  }>({
    loading: true,
    error: false,
    user: null,
  });

  console.log(myProfile);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios(`/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
        .then(res =>
          setMyProfile({ loading: false, error: false, user: res.data.user })
        )
        .catch(err => {
          console.log(err);
          setMyProfile({ loading: false, error: true, user: null });
        });
    }
  }, []);

  return (
    <>
      <RollerStylesbar />
      {myProfile.user ? (
        <UserInfos user={myProfile.user} />
      ) : myProfile.loading ? (
        <div className="loader" />
      ) : null}
    </>
  );
}
