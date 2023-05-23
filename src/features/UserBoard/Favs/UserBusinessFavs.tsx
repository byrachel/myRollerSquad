import React, { useEffect, useState } from "react";
import Link from "next/link";
import CategoryFilters from "src/components/buttons/CategoryFilters";
import Image from "next/image";
import { PlaceInterface } from "src/entities/business.entity";

interface Props {
  favs: any;
  fromMyProfile: boolean;
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

export default function UserBusinessFavs({ favs, fromMyProfile }: Props) {
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
      {favs.length === 0 ? (
        fromMyProfile ? (
          <div className="center mt5">
            <h2 className="title">Shops & clubs favoris</h2>
            <p className="meta">Oups ! ta liste est vide :-(</p>
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
        ) : null
      ) : (
        <>
          <div className={fromMyProfile ? "" : "userFavsContainer"}>
            <h2 className="title center mt5">Shops & clubs favoris</h2>
            <CategoryFilters
              onSelectCategory={(category) => setCategorySelected(category)}
              categorySelected={categorySelected}
            />
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
                      <p className="meta">
                        {getBusinessCategoryName(item.category)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p>Pas de favori dans cette catégorie !</p>
            )}
          </div>
        </>
      )}
    </>
  );
}
