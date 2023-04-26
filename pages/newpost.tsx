import React, { useReducer, useState } from "react";

import DisplayLocation from "src/components/flow/addPost/DisplayLocation";
import Modal from "src/components/layouts/Modal";
import { PostReducer } from "src/reducers/PostReducer";
import { newPostInitialState } from "src/components/flow/addPost/utils/newPostInitialState";
import NewPostForm from "src/components/flow/addPost/NewPostForm";
import SidebarLayout from "src/components/layouts/SidebarLayout";
import NewPostSidebar from "src/components/flow/addPost/NewPostSidebar";
import { withSessionSsr } from "@/server/middleware/auth/withSession";
import { UserStateInterface } from "src/reducers/UserReducer";
import Login from "@/components/auth/Login";

interface Props {
  user: UserStateInterface;
}

const NewPost = ({ user }: Props) => {
  const [post, postDispatch] = useReducer(PostReducer, newPostInitialState);
  const [showMap, setShowMap] = useState(false);

  return (
    <>
      <div className="coloredSeparator" />

      {user && user.id ? (
        <SidebarLayout
          sidebar={<NewPostSidebar />}
          content={
            <>
              <NewPostForm
                userConnectedId={user.id}
                post={post}
                postDispatch={postDispatch}
                setShowMap={setShowMap}
              />
              <Modal show={showMap} setShow={setShowMap} title="Localisation">
                <DisplayLocation
                  // position={post.position}
                  dispatch={postDispatch}
                  setShowMap={setShowMap}
                />
              </Modal>
            </>
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
