import React, { useEffect } from "react";
import { shallow } from "zustand/shallow";
import { useProfile } from "src/hooks/useProfile";
import Loader from "src/components/layouts/Loader";
import UpdateUserProfile from "./UpdateUserProfile";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import UpdateUserSidebar from "@/components/sidebar/UpdateUserSidebar";

interface Props {
  userConnectedId: number;
}

export default function UpdateUserProfileContainer({ userConnectedId }: Props) {
  const { userProfileLoading, userProfile, getUserProfile, updateUserProfile } =
    useProfile(
      (state) => ({
        userProfileLoading: state.userProfileLoading,
        userProfile: state.userProfile,
        getUserProfile: state.getUserProfile,
        updateUserProfile: state.updateUserProfile,
      }),
      shallow
    );

  useEffect(() => {
    if (userConnectedId && !userProfile) {
      getUserProfile(userConnectedId);
    }
    // eslint-disable-next-line
  }, [userConnectedId, userProfile]);

  if (userProfileLoading) return <Loader />;

  return userProfile ? (
    window.innerWidth > 860 ? (
      <SidebarLayout
        sidebar={
          <UpdateUserSidebar avatar={userProfile.avatar} id={userConnectedId} />
        }
        content={
          <UpdateUserProfile
            userProfile={userProfile}
            updateUserProfile={updateUserProfile}
          />
        }
      />
    ) : (
      <div style={{ padding: "1em" }}>
        <UpdateUserProfile
          userProfile={userProfile}
          updateUserProfile={updateUserProfile}
        />
      </div>
    )
  ) : null;
}
