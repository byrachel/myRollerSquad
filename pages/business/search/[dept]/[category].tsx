import React from "react";
import BusinessPlaces from "src/features/BusinessProfile/BusinessPlaces";
import BusinessProfileCTA from "src/features/BusinessProfile/BusinessProfileCTA";
import PlacesFilters from "src/features/BusinessProfile/PlacesFilters";
import prisma from "server/prisma/db/client";

export default function Places({ places, dept, category }: any) {
  return (
    <>
      <div className="coloredSeparator" />
      <PlacesFilters dept={dept} categorySelected={category} />
      {places && places.length > 0 ? (
        <BusinessPlaces places={places} />
      ) : (
        <p className="meta mt-large center">
          Aucune association ou entreprise n'est référencée pour le moment.
        </p>
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
