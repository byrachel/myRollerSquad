import React from "react";
import BusinessPlaces from "src/features/BusinessProfile/BusinessPlaces";
import PlacesFilters from "src/features/BusinessProfile/PlacesFilters";
import { PlaceInterface } from "src/interfaces/userInterfaces";

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
    </>
  );
}

export async function getStaticPaths() {
  const API_URL =
    process.env.NODE_ENV === "production"
      ? "https://myrollersquad.vercel.app"
      : "http://localhost:3000";
  const res = await fetch(`${API_URL}/api/business/all?category=all`);
  const data = await res.json();

  const places = data.places.length > 0 ? data.places : [];
  const paths = places.map((place: PlaceInterface) => ({
    params: { category: place.category, dept: place.county },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps(context: any) {
  const { dept, category } = context.params;

  const API_URL =
    process.env.NODE_ENV === "production"
      ? "https://myrollersquad.vercel.app"
      : "http://localhost:3000";

  const res = await fetch(
    `${API_URL}/api/business/${dept}?category=${category}`
  );
  const data = await res.json();
  return { props: { places: data.places, dept, category } };
}
