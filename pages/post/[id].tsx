import React from "react";
import NewPostBar from "src/components/layouts/NewPostBar";
import SidebarLayout from "src/components/layouts/SidebarLayout";
import SinglePostSidebar from "@/components/sidebar/SinglePostSidebar";
import SinglePost from "src/features/Flow/singlePost/SinglePost";
import Loader from "src/components/layouts/Loader";
import { PostInterface } from "src/entities/flow.entity";
import UnloggedUserSidebar from "@/components/sidebar/UnloggedUserSidebar";
import { FlowRepository } from "@/server/repositories/Flow.repository";

interface Props {
  post: PostInterface | null;
}

export default function Post({ post }: Props) {
  return (
    <>
      <NewPostBar />
      {post ? (
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
