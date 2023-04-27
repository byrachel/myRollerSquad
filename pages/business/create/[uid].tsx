import { useRouter } from "next/router";

import Login from "@/components/auth/Login";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import UnloggedUserSidebar from "@/components/layouts/UnloggedUserSidebar";
import BusinessProfileForm from "src/features/BusinessProfile/BusinessProfileForm";

const BusinessSignup = () => {
  const router = useRouter();
  const { uid } = router.query;
  const ownerId = typeof uid === "string" ? parseInt(uid) : null;

  return ownerId ? (
    <SidebarLayout
      sidebar={<UnloggedUserSidebar />}
      content={<BusinessProfileForm ownerId={ownerId} />}
    />
  ) : (
    <Login />
  );
};
export default BusinessSignup;
