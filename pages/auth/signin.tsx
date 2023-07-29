import React from "react";

import SidebarLayout from "views/components/layouts/SidebarLayout";
import UnloggedUserSidebar from "views/components/sidebar/UnloggedUserSidebar";
import LoginForm from "views/features/Authentication/LoginForm";

export default function Signin() {
  return (
    <SidebarLayout sidebar={<UnloggedUserSidebar />} content={<LoginForm />} />
  );
}
