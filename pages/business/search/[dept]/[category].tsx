import React from "react";
import prisma from "server/prisma/db/client";

import BusinessPlaces from "views/features/Business/BusinessPlaces";
import BusinessProfileCTA from "views/features/Business/BusinessProfileCTA";
import PlacesFilters from "views/features/Business/PlacesFilters";
import Loader from "views/components/layouts/Loader";
import { MiniPlaceInterface } from "models/entities/business.entity";

interface Props {
  places: MiniPlaceInterface[];
  dept: string;
  category: string;
}

export default function Places({ places, dept, category }: Props) {
  return (
    <>
      <div className="coloredSeparator" />
      <PlacesFilters dept={dept} categorySelected={category} />
      {places ? (
        places.length > 0 ? (
          <BusinessPlaces places={places} />
        ) : (
          <p className="meta mt-large center">
            Aucune association ou entreprise n'est référencée pour le moment.
          </p>
        )
      ) : (
        <Loader text="Recherche en cours..." />
      )}
      <BusinessProfileCTA />
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
      params: { category: place.category, dept: place.county },
    }));
    return { paths, fallback: true };
  } catch (error) {
    return { paths: [], fallback: true };
  }
}

export async function getStaticProps(context: any) {
  const { dept, category } = context.params;

  const data = await prisma.place.findMany({
    where: {
      active: true,
      ...(dept === "all" || !dept ? {} : { county: dept }),
      ...(category === "all" || !category ? {} : { category }),
    },
    include: {
      favorites: {
        select: {
          id: true,
        },
      },
      _count: {
        select: {
          posts: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  if (!data) return { props: { places: [], dept, category } };
  const places = JSON.parse(JSON.stringify(data));
  return { props: { places, dept, category }, revalidate: 360 };
}
