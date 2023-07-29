import React, { useReducer } from "react";
import { useSession } from "next-auth/react";

import { PostReducer } from "views/reducers/PostReducer";
import { newPostInitialState } from "views/features/Flow/addPost/utils/newPostInitialState";
import NewPostForm from "views/features/Flow/addPost/NewPostForm";
import SidebarLayout from "views/components/layouts/SidebarLayout";
import NewPostSidebar from "views/components/sidebar/NewPostSidebar";
import UnloggedUser from "views/components/layouts/UnloggedUser";

const NewPost = () => {
  const [post, postDispatch] = useReducer(PostReducer, newPostInitialState);
  const { data: session } = useSession() as any;
  const userId = session?.user?.id;

  return (
    <>
      <div className="coloredSeparator" />
      <SidebarLayout
        sidebar={<NewPostSidebar />}
        content={
          userId ? (
            <NewPostForm
              userConnectedId={userId}
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
