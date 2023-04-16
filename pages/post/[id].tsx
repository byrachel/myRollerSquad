import React from "react";
import prisma from "../../server/prisma/db/client";
import NewPostBar from "@/components/layouts/NewPostBar";
import { PostInterface } from "app/interfaces/flowInterfaces";

interface Props {
  post: PostInterface;
}

export default function Post({ post }: Props) {
  console.log(post);
  return (
    <>
      <NewPostBar />
      <div>
        <h1>{post.title}</h1>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const posts = await prisma.post.findMany();

  const paths = posts.map(post => ({
    params: {
      id: post.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

interface IParams {
  params: {
    id: string;
  };
}

export async function getStaticProps({ params: { id } }: IParams) {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      comments: true,
      user_likes: true,
    },
  });

  const data = {
    ...post,
    created_at: post ? post.created_at.toISOString() : null,
    user_likes: post ? post.user_likes.length : [],
  };

  return {
    props: {
      post: data,
    },
  };
}
