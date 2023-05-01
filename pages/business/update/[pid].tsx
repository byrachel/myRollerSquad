import { useRouter } from "next/router";

import Login from "@/components/auth/Login";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import UnloggedUserSidebar from "@/components/layouts/UnloggedUserSidebar";
import UpdateBusinessProfile from "src/features/BusinessProfile/UpdateBusinessProfile";
import { useContext } from "react";
import { UserContext } from "src/context/UserContext";

const UpdateBusiness = () => {
  const router = useRouter();
  const { pid } = router.query;
  const placeId = typeof pid === "string" ? parseInt(pid) : null;
  const { userState } = useContext(UserContext);

  return userState.isLoggedIn && userState.id && placeId ? (
    <SidebarLayout
      sidebar={<UnloggedUserSidebar />}
      content={
        <UpdateBusinessProfile
          placeId={placeId}
          userConnectedId={userState.id}
        />
      }
    />
  ) : (
    <Login />
  );
};
export default UpdateBusiness;
