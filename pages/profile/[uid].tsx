import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import UserInfosContainer from "src/features/UserProfile/UserInfosContainer";
import MyInfosContainer from "src/features/UserProfile/MyInfosContainer";
import UnloggedUser from "@/components/layouts/UnloggedUser";

const UserProfile = () => {
  const router = useRouter();
  const { uid } = router.query;
  const { data: session } = useSession() as any;
  const userId = session?.user?.id;

  const userToDisplay = userId
    ? uid === "me"
      ? userId
      : parseInt(uid as string)
    : null;

  return uid === "me" ? (
    userId ? (
      <MyInfosContainer userConnectedId={userId} />
    ) : (
      <UnloggedUser />
    )
  ) : userToDisplay && userId ? (
    <UserInfosContainer
      userConnectedId={userId}
      userToDisplay={userToDisplay}
    />
  ) : (
    <UnloggedUser />
  );
};
export default UserProfile;
