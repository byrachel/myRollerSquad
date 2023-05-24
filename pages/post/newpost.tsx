import React, { useReducer } from "react";
import { useSession } from "next-auth/react";

import { PostReducer } from "src/reducers/PostReducer";
import { newPostInitialState } from "src/features/Flow/addPost/utils/newPostInitialState";
import NewPostForm from "src/features/Flow/addPost/NewPostForm";
import SidebarLayout from "src/components/layouts/SidebarLayout";
import NewPostSidebar from "@/components/sidebar/NewPostSidebar";
import UnloggedUser from "@/components/layouts/UnloggedUser";

const NewPost = () => {
  const [post, postDispatch] = useReducer(PostReducer, newPostInitialState);
  const { data: session } = useSession() as any;
  const userId = session?.user?.id;
  const userRole = session?.user?.role;

  return (
    <>
      <div className="coloredSeparator" />
      <SidebarLayout
        sidebar={<NewPostSidebar />}
        content={
          userId ? (
            <NewPostForm
              userConnectedId={userId}
              isPro={userRole === "PRO"}
              post={post}
              postDispatch={postDispatch}
              editMode={false}
            />
          ) : (
            <UnloggedUser />
          )
        }
      />
    </>
  );
};
export default NewPost;
