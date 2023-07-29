import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import UpdateBusinessProfile from "views/features/Business/UpdateBusinessProfile";
import UnloggedUser from "views/components/layouts/UnloggedUser";

const UpdateBusiness = () => {
  const router = useRouter();
  const { pid } = router.query;
  const placeId = typeof pid === "string" ? parseInt(pid) : null;

  const { data: session } = useSession() as any;
  const userId = session?.user?.id;

  return (
    <>
      <div className="coloredSeparator" />

      <div style={{ padding: "1.5em" }}>
        {userId && placeId ? (
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
