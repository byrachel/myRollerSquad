import { withSessionSsr } from "app/utils/withSession";
import NewPostBar from "@/components/layouts/NewPostBar";
import Flow from "@/components/flow/Flow";
import { useRouter } from "next/router";

const MyRollerBlog = ({ user }: any) => {
  console.log("MyRollerBlog", user);
  const router = useRouter();

  if (!user) return router.push("/signin");
  return (
    <>
      <NewPostBar />
      <Flow />
    </>
  );
};
export default MyRollerBlog;

export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  const user = req.session;

  console.log("BLOG USER", user);

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: { user },
  };
});
