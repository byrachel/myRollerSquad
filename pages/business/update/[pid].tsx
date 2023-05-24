import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import SidebarLayout from "src/components/layouts/SidebarLayout";
import UnloggedUserSidebar from "@/components/sidebar/UnloggedUserSidebar";
import UpdateBusinessProfile from "src/features/Business/UpdateBusinessProfile";
import UnloggedUser from "@/components/layouts/UnloggedUser";

const UpdateBusiness = () => {
  const router = useRouter();
  const { pid } = router.query;
  const placeId = typeof pid === "string" ? parseInt(pid) : null;

  const { data: session } = useSession() as any;
  const userId = session?.user?.id;
  const userRole = session?.user?.role;

  return (
    <SidebarLayout
      sidebar={<UnloggedUserSidebar />}
      content={
        userRole === "PRO" && userId && placeId ? (
          <UpdateBusinessProfile placeId={placeId} userConnectedId={userId} />
        ) : (
          <UnloggedUser />
        )
      }
    />
  );
};
export default UpdateBusiness;
