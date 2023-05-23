import React from "react";
import NewPostBar from "src/components/layouts/NewPostBar";
import SidebarLayout from "src/components/layouts/SidebarLayout";
import SinglePostSidebar from "@/components/sidebar/SinglePostSidebar";
import SinglePost from "src/features/Flow/singlePost/SinglePost";
import Loader from "src/components/layouts/Loader";
import { PostInterface } from "src/entities/flow.entity";
import UnloggedUserSidebar from "@/components/sidebar/UnloggedUserSidebar";

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

  const data = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      title: true,
      content: true,
      category_id: true,
      style: {
        select: {
          style_id: true,
        },
      },
      created_at: true,
      pictures: true,
      link: true,
      comments: true,
      user: {
        select: {
          avatar: true,
          id: true,
          name: true,
        },
      },
      place: {
        select: {
          id: true,
          name: true,
          logo: true,
        },
      },
      city: true,
      county: true,
      country: true,
      user_likes: {
        select: {
          user_id: true,
        },
      },
      price: true,
      distance: true,
      duration: true,
    },
  });
  if (!data) return { props: { post: null } };
  const post = JSON.parse(JSON.stringify(data));
  return { props: { post } };
}
