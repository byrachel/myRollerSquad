import React, { Suspense } from "react";
import SingleBusinessPlace from "src/features/Business/SingleBusinessPlace";
import { PlaceInterface } from "src/entities/business.entity";
import prisma from "server/prisma/db/client";
import SingleBusinessPosts from "src/features/Business/SingleBusinessPosts";
import Loader from "src/components/layouts/Loader";

interface Props {
  place: PlaceInterface;
}

export default function Post({ place }: Props) {
  return (
    <>
      <div className="coloredSeparator" />
      {place ? (
        <Suspense fallback={<Loader />}>
          <SingleBusinessPlace place={place} />
          {place.posts ? <SingleBusinessPosts posts={place.posts} /> : null}
        </Suspense>
      ) : (
        <p className="meta mt5">Oups ! Il n'y a rien par ici :-(</p>
      )}
    </>
  );
}

export async function getStaticPaths() {
  try {
    const places = await prisma.place.findMany({
      where: {
        active: true,
      },
    });
    const data = places.length > 0 ? places : [];
    const paths = data.map((place: any) => ({
      params: { pid: place.id.toString() },
    }));
    return { paths, fallback: true };
  } catch (error) {
    return { paths: [], fallback: true };
  }
}

export async function getStaticProps(context: any) {
  const { pid } = context.params;
  if (!pid) return { props: { place: null } };
  const data = await prisma.place.findUnique({
    where: {
      id: parseInt(pid),
    },
    include: {
      favorites: {
        select: {
          id: true,
        },
      },
      posts: {
        take: 3,
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
