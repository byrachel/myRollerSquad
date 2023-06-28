import React from "react";

import SidebarLayout from "@/components/layouts/SidebarLayout";
import UnloggedUserSidebar from "@/components/sidebar/UnloggedUserSidebar";
import LoginForm from "src/features/Authentication/LoginForm";

export default function Signin() {
  return (
    <SidebarLayout sidebar={<UnloggedUserSidebar />} content={<LoginForm />} />
  );
}
