import { useRouter } from "next/router";
import { shallow } from "zustand/shallow";

import Login from "client/features/auth/Login";
import SidebarLayout from "client/components/layouts/SidebarLayout";
import UnloggedUserSidebar from "client/components/layouts/UnloggedUserSidebar";
import UpdateBusinessProfile from "client/features/BusinessProfile/UpdateBusinessProfile";
import { State, useUser } from "client/hooks/useUser";

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
