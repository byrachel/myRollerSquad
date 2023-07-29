import React from "react";
import { useSession } from "next-auth/react";

import UpdateUserProfileContainer from "views/features/UserProfile/UpdateUserProfile/UpdateUserProfileContainer";
import UnloggedUser from "views/components/layouts/UnloggedUser";

export default function UpdateMyAccount() {
  const { data: session } = useSession() as any;
  const userId = session?.user?.id;

  return userId ? (
    <UpdateUserProfileContainer userConnectedId={userId} />
  ) : (
    <UnloggedUser />
  );
}
