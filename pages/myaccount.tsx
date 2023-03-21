import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import RollerStylesbar from "@/components/layouts/RollerStylesBar";
import UserInfos from "@/components/userProfile/UserInfos";
import LoginForm from "@/components/homepage/LoginForm";
import { UserContext } from "app/context/UserContext";

export default function MyAccount() {
  const [myProfile, setMyProfile] = useState({
    loading: true,
    error: false,
    data: {},
  });

  console.log(myProfile);

  const { userState } = useContext(UserContext);

  console.log("USERSTATE", userState);

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
          setMyProfile({ loading: false, error: false, data: res.data.user })
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
    <LoginForm />
  ) : (
    <>
      <RollerStylesbar />
      <UserInfos myProfile={myProfile} />
    </>
  );
}
