import { useRouter } from "next/router";

import Login from "src/features/auth/Login";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import UnloggedUserSidebar from "@/components/layouts/UnloggedUserSidebar";
import AddBusinessProfile from "src/features/BusinessProfile/AddBusinessProfile";

const BusinessSignup = () => {
  const router = useRouter();
  const { uid } = router.query;
  const ownerId = typeof uid === "string" ? parseInt(uid) : null;

  return ownerId ? (
    <SidebarLayout
      sidebar={<UnloggedUserSidebar />}
      content={<AddBusinessProfile ownerId={ownerId} />}
    />
  ) : (
    <Login />
  );
};
export default BusinessSignup;
