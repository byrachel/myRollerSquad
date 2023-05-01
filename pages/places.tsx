import React, { useContext } from "react";
import { UserContext } from "src/context/UserContext";
import Business from "src/features/BusinessProfile/Business";
import PlacesFilters from "src/features/BusinessProfile/PlacesFilters";

export default function Places() {
  const { userState, userDispatch } = useContext(UserContext);

  return (
    <>
      <div className="coloredSeparator" />
      <PlacesFilters
        userDept={userState.county}
        businessCategory={userState.businessCategory}
        userDispatch={userDispatch}
      />
      <Business
        dept={userState.county}
        businessCategory={userState.businessCategory}
      />
    </>
  );
}
