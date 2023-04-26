import SidebarLayout from "@/components/layouts/SidebarLayout";
import UnloggedUserSidebar from "@/components/layouts/UnloggedUserSidebar";
import React from "react";

export default function Places() {
  return (
    <>
      <div className="coloredSeparator" />
      <SidebarLayout
        sidebar={<UnloggedUserSidebar />}
        content={<h1>Places</h1>}
      />
    </>
  );
}
