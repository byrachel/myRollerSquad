import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import withAuth from "app/utils/withAuth";
import RollerStylesbar from "@/components/layouts/RollerStylesBar";
import UserInfos from "@/components/userProfile/UserInfos";
import { UserInterface } from "app/interfaces/userInterfaces";
import { UserContext } from "app/context/UserContext";

const UpdateAccount = () => {
  const { userState } = useContext(UserContext);
  const userConnectedId = userState.user?.id;

  const [userProfile, setUserProfile] = useState<{
    loading: boolean;
    error: boolean;
    user: UserInterface | null;
  }>({
    loading: true,
    error: false,
    user: null,
  });

  useEffect(() => {
    if (userConnectedId) {
      const token = localStorage.getItem("token");
      if (token) {
        axios(`/api/${userConnectedId}/userprofile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
          .then(res =>
            setUserProfile({
              loading: false,
              error: false,
              user: res.data.user,
            })
          )
          .catch(err => {
            console.log(err);
            setUserProfile({ loading: false, error: true, user: null });
          });
      }
    }
  }, [userConnectedId]);

  return (
    <>
      <RollerStylesbar />
      {userProfile.user ? (
        <>
          <UserInfos user={userProfile.user} />
        </>
      ) : userProfile.loading ? (
        <div className="loader" />
      ) : null}
    </>
  );
};
export default withAuth(UpdateAccount);
