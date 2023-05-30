import React from "react";
import SidebarLayout from "src/components/layouts/SidebarLayout";
import SinglePostSidebar from "@/components/sidebar/SinglePostSidebar";
import SinglePost from "src/features/Flow/singlePost/SinglePost";
import Loader from "src/components/layouts/Loader";
import { PostInterface } from "src/entities/flow.entity";
import UnloggedUserSidebar from "@/components/sidebar/UnloggedUserSidebar";
import { FlowRepository } from "@/server/repositories/Flow.repository";
import Avatar from "src/features/Flow/getPosts/Avatar";

interface Props {
  post: PostInterface | null;
}

export default function Post({ post }: Props) {
  return (
    <>
      {post ? (
        window.innerWidth > 860 ? (
          <SidebarLayout
            sidebar={
              post.user ? (
                <SinglePostSidebar user={post.user} place={post.place} />
              ) : (
                <UnloggedUserSidebar />
              )
            }
            content={<SinglePost post={post} />}
          />
        ) : (
          <div style={{ padding: "1em" }}>
            <SinglePost post={post} />
            {post.user ? (
              <div className="center mt5">
                <Avatar
                  userId={post.user.id}
                  userAvatar={post.user.avatar}
                  color="pink"
                  placeId={post.place ? post.place.id : null}
                  logo={post.place ? post.place.logo : null}
                />
                <h3>{post.user.name}</h3>
              </div>
            ) : null}
          </div>
        )
      ) : (
        <Loader />
      )}
    </>
  );
}

export async function getServerSideProps(params: any) {
  const { id } = params.query;
  if (!id) return { props: { post: null } };
  const flowRepo = new FlowRepository();
  const selectedPost = await flowRepo.getPostById(parseInt(id));
  if (!selectedPost) return { props: { post: null } };
  const post = JSON.parse(JSON.stringify(selectedPost));
  return { props: { post } };
}
