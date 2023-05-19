import React from "react";
import SingleBusinessPlace from "src/features/BusinessProfile/SingleBusinessPlace";
import { PlaceInterface } from "src/interfaces/userInterfaces";
import prisma from "server/prisma/db/client";
import SingleBusinessPosts from "src/features/BusinessProfile/SingleBusinessPosts";

interface Props {
  place: PlaceInterface;
}

export default function Post({ place }: Props) {
  return place ? (
    <>
      <SingleBusinessPlace place={place} />
      <SingleBusinessPosts posts={place.posts} />
    </>
  ) : (
    <p className="meta mt5">Oups ! Il n'y a rien par ici :-(</p>
  );
}

export async function getServerSideProps(params: any) {
  const { pid } = params.query;

  const data = await prisma.place.findUnique({
    where: {
      id: parseInt(pid),
    },
    select: {
      id: true,
      name: true,
      description: true,
      logo: true,
      city: true,
      category: true,
      website: true,
      favorites: {
        select: {
          id: true,
        },
      },
      posts: {
        select: {
          id: true,
          title: true,
          category: {
            select: {
              name: true,
            },
          },
          content: true,
          pictures: true,
          created_at: true,
          comments: true,
          user_likes: {
            select: {
              user_id: true,
            },
          },
        },
      },
    },
  });
  if (!data) return { props: { place: null } };
  const place = JSON.parse(JSON.stringify(data));
  return { props: { place } };
}
