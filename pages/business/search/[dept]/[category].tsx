import React from "react";
import BusinessPlaces from "src/features/Business/BusinessPlaces";
import BusinessProfileCTA from "src/features/Business/BusinessProfileCTA";
import PlacesFilters from "src/features/Business/PlacesFilters";
import prisma from "server/prisma/db/client";
import { PlaceInterface } from "src/entities/business.entity";
import Loader from "src/components/layouts/Loader";

interface Props {
  places: PlaceInterface[];
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
        <Loader />
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

  const places = await prisma.place.findMany({
    where: {
      active: true,
      ...(dept === "all" || !dept ? {} : { county: dept }),
      ...(category === "all" || !category ? {} : { category }),
    },
    select: {
      id: true,
      name: true,
      description: true,
      logo: true,
      city: true,
      category: true,
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
  });
  if (!places) return { props: { places: [], dept, category } };
  return { props: { places, dept, category } };
}
