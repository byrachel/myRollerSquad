import React, { useEffect, useState } from "react";
import Image from "next/image";

import RollerStylesbar from "@/components/layouts/RollerStylesBar";
import UserInfos from "@/components/userProfile/UserInfos";

export default function MyAccount() {
  const [myProfile, setMyProfile] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`/api/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "same-origin",
    })
      .then(res => res.json())
      .then(data => setMyProfile(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <RollerStylesbar />
      <UserInfos myProfile={myProfile} />
    </>
  );
}
