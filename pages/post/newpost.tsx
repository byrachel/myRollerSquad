import React, { useReducer } from "react";

import { PostReducer } from "src/reducers/PostReducer";
import { newPostInitialState } from "src/features/Flow/addPost/utils/newPostInitialState";
import NewPostForm from "src/features/Flow/addPost/NewPostForm";
import SidebarLayout from "src/components/layouts/SidebarLayout";
import NewPostSidebar from "src/features/Flow/addPost/NewPostSidebar";
import { withSessionSsr } from "@/server/middleware/auth/withSession";
import { UserStateInterface } from "src/reducers/UserReducer";
import Login from "@/components/auth/Login";

interface Props {
  user: UserStateInterface;
}

const NewPost = ({ user }: Props) => {
  const [post, postDispatch] = useReducer(PostReducer, newPostInitialState);

  return (
    <>
      <div className="coloredSeparator" />

      {user && user.id ? (
        <SidebarLayout
          sidebar={<NewPostSidebar />}
          content={
            <NewPostForm
              userConnectedId={user.id}
              isPro={user.role === "PRO"}
              post={post}
              postDispatch={postDispatch}
            />
          }
        />
      ) : (
        <Login />
      )}
    </>
  );
};
export default NewPost;

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const user = req.session as any;

  return {
    props: user,
  };
});
