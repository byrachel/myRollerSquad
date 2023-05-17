import Login from "src/features/auth/Login";
import { withSessionSsr } from "@/server/middleware/auth/withSession";
import { UserStateInterface } from "src/reducers/UserReducer";
import MyFavs from "src/features/UserBoard/Favs/MyFavs";

interface Props {
  user: UserStateInterface;
  uid: string;
}

const UserFavs = ({ user, uid }: Props) => {
  const userId = parseInt(uid);

  return user.isLoggedIn && user.id && user.id === userId ? (
    <div className="myFavsContainer">
      <h2 className="center mt5">Mes shops & clubs favoris</h2>
      <div className="underliner" />
      <MyFavs userConnectedId={user.id} />
    </div>
  ) : (
    <Login />
  );
};
export default UserFavs;

export const getServerSideProps = withSessionSsr(async ({ req, query }) => {
  const session = req.session as any;
  const uid = query.uid;
  return {
    props: {
      user: session.user,
      uid,
    },
  };
});
