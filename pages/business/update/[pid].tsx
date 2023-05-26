import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

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
    <>
      <div className="coloredSeparator" />

      <div style={{ padding: "1.5em" }}>
        {userRole === "PRO" && userId && placeId ? (
          <>
            <p className="meta center">Modifier mon espace business</p>
            <div className="metaUnderliner" />
            <UpdateBusinessProfile placeId={placeId} userConnectedId={userId} />
          </>
        ) : (
          <UnloggedUser />
        )}
      </div>
    </>
  );
};
export default UpdateBusiness;
