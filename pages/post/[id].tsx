import React from "react";
import SidebarLayout from "views/components/layouts/SidebarLayout";
import SinglePostSidebar from "views/components/sidebar/SinglePostSidebar";
import SinglePost from "views/features/Flow/singlePost/SinglePost";
import Loader from "views/components/layouts/Loader";
import { PostInterface } from "models/entities/flow.entity";
import UnloggedUserSidebar from "views/components/sidebar/UnloggedUserSidebar";
import { FlowRepository } from "@/server/repositories/Flow.repository";

interface Props {
  post: PostInterface | null;
}

export default function Post({ post }: Props) {
  return (
    <>
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

export async function getStaticPaths() {
  try {
    const posts = await prisma.post.findMany();
    const data = posts.length > 0 ? posts : [];
    const paths = data.map((post: any) => ({
      params: { id: post.id.toString() },
    }));
    return { paths, fallback: true };
  } catch (error) {
    return { paths: [], fallback: true };
  }
}

export async function getStaticProps(context: any) {
  const { id } = context.params;
  if (!id) return { props: { post: null } };
  const flowRepo = new FlowRepository();
  const selectedPost = await flowRepo.getPostById(parseInt(id));
  if (!selectedPost) return { props: { post: null } };
  const post = JSON.parse(JSON.stringify(selectedPost));
  return { props: { post } };
}
