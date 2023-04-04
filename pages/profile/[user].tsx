import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import RollerStylesbar from "@/components/layouts/RollerStylesBar";
import UserInfos from "@/components/userProfile/UserInfos";
import { UserInterface } from "app/interfaces/userInterfaces";
import RollerSkateLevel from "@/components/userProfile/RollerSkateLevel";
import withAuth from "app/utils/withAuth";

const UserProfile = () => {
  const router = useRouter();
  const { user } = router.query;

  console.log(user);

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
    if (user) {
      const token = localStorage.getItem("token");
      if (token) {
        axios(`/api/${user}/userprofile`, {
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
  }, [user]);

  return (
    <>
      <RollerStylesbar />
      {userProfile.user ? (
        <>
          <UserInfos user={userProfile.user} />
          <RollerSkateLevel
            rollerDanceLevel={userProfile.user.roller_dance_level}
            skateParkLevel={userProfile.user.skatepark_level}
            artisticLevel={userProfile.user.artistic_level}
            freestyleLevel={userProfile.user.freestyle_level}
            urbanLevel={userProfile.user.urban_level}
          />
        </>
      ) : userProfile.loading ? (
        <div className="loader" />
      ) : null}
    </>
  );
};
export default withAuth(UserProfile);
