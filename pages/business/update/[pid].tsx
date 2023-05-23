import { useRouter } from "next/router";
import { shallow } from "zustand/shallow";

import Login from "src/features/auth/Login";
import SidebarLayout from "src/components/layouts/SidebarLayout";
import UnloggedUserSidebar from "@/components/sidebar/UnloggedUserSidebar";
import UpdateBusinessProfile from "src/features/BusinessProfile/UpdateBusinessProfile";
import { State, useUser } from "src/hooks/useUser";

const UpdateBusiness = () => {
  const router = useRouter();
  const { pid } = router.query;
  const placeId = typeof pid === "string" ? parseInt(pid) : null;

  const { userId, userRole } = useUser(
    (state: State) => ({
      userId: state.userId,
      userRole: state.userRole,
    }),
    shallow
  );

  return userRole === "PRO" && userId && placeId ? (
    <SidebarLayout
      sidebar={<UnloggedUserSidebar />}
      content={
        <UpdateBusinessProfile placeId={placeId} userConnectedId={userId} />
      }
    />
  ) : (
    <Login />
  );
};
export default UpdateBusiness;
