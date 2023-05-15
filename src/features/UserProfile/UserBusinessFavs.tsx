import React, { useState } from "react";
import Link from "next/link";
import CategoryFilters from "@/components/buttons/CategoryFilters";
import Image from "next/image";
import { PlaceInterface } from "src/interfaces/userInterfaces";

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
      return "S'amuser'";
    default:
      return "Autre";
  }
};

export default function UserBusinessFavs({ favs }: Props) {
  const [userFavs, setUserFavs] = useState(favs);
  const [categorySelected, setCategorySelected] = useState("all");

  const onSelectCategory = (category: string) => {
    setCategorySelected(category);
    if (category === "all") return setUserFavs(favs);
    const filteredFavs = favs.filter(
      (fav: any) => fav.category === category.toUpperCase()
    );
    setUserFavs(filteredFavs);
  };

  return (
    <>
      <div className="mt5" />
      <CategoryFilters
        onSelectCategory={onSelectCategory}
        categorySelected={categorySelected}
      />
      <div className="favCardContainer">
        {userFavs.map((item: PlaceInterface) => (
          <Link href={`/business/${item.id}`} className="favCard" key={item.id}>
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
    </>
  );
}
