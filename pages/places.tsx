import PlacesSidebar from "@/components/layouts/PlacesSidebar";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import React, { useContext } from "react";
import { UserContext } from "src/context/UserContext";
import Business from "src/features/BusinessProfile/Business";

export default function Places() {
  const { userState, userDispatch } = useContext(UserContext);

  return (
    <>
      <div className="coloredSeparator" />

      <SidebarLayout
        sidebar={
          <PlacesSidebar userState={userState} userDispatch={userDispatch} />
        }
        content={<Business dept={userState.county} />}
      />
    </>
  );
}
