import React, { useEffect, useState } from "react";
import Link from "next/link";
import CategoryFilters from "@/components/buttons/CategoryFilters";
import Image from "next/image";
import { PlaceInterface } from "src/entities/business.entity";

interface Props {
  favs: any;
}

const getBusinessCategoryName = (category: string) => {
  switch (category) {
    case "LEARN":
      return "S'entrainer";
    case "BUY":
      return "S'équiper";
    case "PLAY":
      return "S'amuser";
    default:
      return "Autre";
  }
};

export default function UserBusinessFavs({ favs }: Props) {
  const [userFavs, setUserFavs] = useState(favs);
  const [categorySelected, setCategorySelected] = useState("all");

  useEffect(() => {
    if (categorySelected === "all") {
      setUserFavs(favs);
    } else {
      const favsByCategory = favs.filter(
        (fav: any) => fav.category === categorySelected
      );
      setUserFavs(favsByCategory);
    }
  }, [favs, categorySelected]);

  return (
    <>
      <div className="mt5" />
      {favs ? (
        <CategoryFilters
          onSelectCategory={(category) => setCategorySelected(category)}
          categorySelected={categorySelected}
        />
      ) : null}
      {userFavs.length > 0 ? (
        <div className="favCardContainer">
          {userFavs.map((item: PlaceInterface) => (
            <Link
              href={`/business/${item.id}`}
              className="favCard"
              key={item.id}
            >
              <Image
                src={
                  item.logo
                    ? `https://myrollerbusinesslogo.s3.eu-west-3.amazonaws.com/${item.logo}`
                    : "/img/myrollersquad_avatar.jpeg"
                }
                alt="Club de Roller Quad Logo"
                className="favCardLogo"
                width={80}
                height={80}
              />
              <div className="favCardInfo">
                <h2>{item.name}</h2>
                <p className="meta">{getBusinessCategoryName(item.category)}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="center mt5">
          {favs.length === 0 ? (
            <p className="meta">Oups ! ta liste est vide :-(</p>
          ) : (
            <p>Tu n'as pas de favori dans cette catégorie :-(</p>
          )}
          <Link
            href={
              favs.length === 0
                ? "/business/search/all/all"
                : `/business/search/all/${categorySelected}`
            }
            className="textLink mt5"
          >
            Fais un tour dans l'annuaire pour trouver ton bonheur.
          </Link>
        </div>
      )}
    </>
  );
}
