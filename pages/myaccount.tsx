import React, { useEffect, useState } from "react";
import axios from "axios";

import RollerStylesbar from "@/components/layouts/RollerStylesBar";
import UserInfos from "@/components/userProfile/UserInfos";
import LoginForm from "@/components/homepage/LoginForm";

export default function MyAccount() {
  const [myProfile, setMyProfile] = useState({
    loading: true,
    error: false,
    data: {},
  });

  console.log(myProfile);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios(`/api/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
        .then(res =>
          setMyProfile({ loading: false, error: false, data: res.data })
        )
        .catch(err => {
          console.log(err);
          setMyProfile({ loading: false, error: true, data: {} });
        });
    }
  }, []);

  return myProfile.loading ? (
    <div className="loader" />
  ) : myProfile.error ? (
    <LoginForm setShowLoginForm={() => console.log("haha")} />
  ) : (
    <>
      <RollerStylesbar />
      <UserInfos myProfile={myProfile} />
    </>
  );
}
