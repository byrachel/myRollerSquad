import React, { useContext } from "react";
import { UserContext } from "src/context/UserContext";

export default function Places() {
  const { userState } = useContext(UserContext);
  const dept = userState.county;
  console.log(dept);
  return (
    <>
      <div className="coloredSeparator" />

      <div className="centeredContainer">
        <div className="container">
          <h1>Places</h1>
        </div>
      </div>
    </>
  );
}
