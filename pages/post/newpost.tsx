import React, { useReducer } from "react";
import { shallow } from "zustand/shallow";

import { PostReducer } from "client/reducers/PostReducer";
import { newPostInitialState } from "client/features/Flow/addPost/utils/newPostInitialState";
import NewPostForm from "client/features/Flow/addPost/NewPostForm";
import SidebarLayout from "client/components/layouts/SidebarLayout";
import NewPostSidebar from "client/features/Flow/addPost/NewPostSidebar";
import Login from "client/features/auth/Login";
import { useUser } from "client/hooks/useUser";

const NewPost = () => {
  const [post, postDispatch] = useReducer(PostReducer, newPostInitialState);
  const { userId, userRole } = useUser(
    (state) => ({ userId: state.userId, userRole: state.userRole }),
    shallow
  );

  return (
    <>
      <div className="coloredSeparator" />

      {userId ? (
        <SidebarLayout
          sidebar={<NewPostSidebar />}
          content={
            <NewPostForm
              userConnectedId={userId}
              isPro={userRole === "PRO"}
              post={post}
              postDispatch={postDispatch}
              editMode={false}
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
