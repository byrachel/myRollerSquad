import React from "react";

import SidebarLayout from "@/components/layouts/SidebarLayout";
import UnloggedUserSidebar from "@/components/sidebar/UnloggedUserSidebar";
import LoginForm from "src/features/auth/LoginForm";

export default function Signin() {
  return (
    <SidebarLayout sidebar={<UnloggedUserSidebar />} content={<LoginForm />} />
  );
}
