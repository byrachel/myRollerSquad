import UserInfosContainer from "src/features/UserProfile/UserInfosContainer";
import Login from "src/features/auth/Login";
import MyInfosContainer from "src/features/UserProfile/MyInfosContainer";
import useLoggedUser from "src/hooks/useLoggedUser";

interface Props {
  uid: string;
}

const UserProfile = ({ uid }: Props) => {
  const { userId } = useLoggedUser();

  const userToDisplay = userId
    ? uid === "me"
      ? userId
      : parseInt(uid as string)
    : null;

  return userId && uid === "me" ? (
    <MyInfosContainer userConnectedId={userId} />
  ) : userToDisplay && userId ? (
    <UserInfosContainer
      userConnectedId={userId}
      userToDisplay={userToDisplay}
    />
  ) : (
    <Login />
  );
};
export default UserProfile;

// export const getServerSideProps = withSessionSsr(async ({ req, query }) => {
//   const session = req.session as any;
//   const uid = query.uid;
//   return {
//     props: {
//       user: session.user,
//       uid,
//     },
//   };
// });
