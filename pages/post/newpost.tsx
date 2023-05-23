import React, { useReducer } from "react";
import { shallow } from "zustand/shallow";

import { PostReducer } from "src/reducers/PostReducer";
import { newPostInitialState } from "src/features/Flow/addPost/utils/newPostInitialState";
import { useUser } from "src/hooks/useUser";
import NewPostForm from "src/features/Flow/addPost/NewPostForm";
import SidebarLayout from "src/components/layouts/SidebarLayout";
import NewPostSidebar from "@/components/sidebar/NewPostSidebar";
import LoginForm from "src/features/auth/LoginForm";

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
        <LoginForm />
      )}
    </>
  );
};
export default NewPost;
