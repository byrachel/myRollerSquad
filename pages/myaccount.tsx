import React, { useEffect, useState } from "react";
import axios from "axios";

import RollerStylesbar from "@/components/layouts/RollerStylesBar";
import UserInfos from "@/components/userProfile/UserInfos";

export default function MyAccount() {
  const [myProfile, setMyProfile] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios(`/api/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
      .then(res => console.log(res.data))
      // .then(data => setMyProfile(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <RollerStylesbar />
      <UserInfos myProfile={myProfile} />
    </>
  );
}
