import React, { useState } from "react";
import { Card, Grid, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import CategoryFilters from "@/components/buttons/CategoryFilters";

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
  const router = useRouter();
  const [userFavs, setUserFavs] = useState(favs);
  const [categorySelected, setCategorySelected] = useState("all");

  const onSelectCategory = (category: string) => {
    console.log(category);
    setCategorySelected(category);
    if (category === "all") return setUserFavs(favs);
    const filteredFavs = favs.filter(
      (fav: any) => fav.category === category.toUpperCase()
    );
    setUserFavs(filteredFavs);
  };

  return (
    <div className="userFavsContainer">
      <h2 className="title">Favoris</h2>
      <div className="mt5" />
      <CategoryFilters
        onSelectCategory={onSelectCategory}
        categorySelected={categorySelected}
      />
      <div className="flowContainer">
        <Grid.Container gap={2} justify="flex-start">
          {userFavs.map((item: any) => (
            <Grid xs={6} sm={3} key={item.id}>
              <Card isPressable onPress={() => router.push("/")}>
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={
                      item.logo
                        ? `https://myrollerbusinesslogo.s3.eu-west-3.amazonaws.com/${item.logo}`
                        : "/img/myrollersquad_avatar.jpeg"
                    }
                    objectFit="cover"
                    width="100%"
                    height={140}
                    alt={item.title}
                  />
                </Card.Body>
                <Card.Footer
                  css={{ justifyItems: "center", flexDirection: "column" }}
                >
                  <Row justify="center" align="center">
                    <Text b>{item.name}</Text>
                  </Row>
                  <Row justify="center" align="center">
                    <Text
                      css={{
                        color: "$accents7",
                        fontWeight: "$semibold",
                        fontSize: "$sm",
                      }}
                    >
                      {getBusinessCategoryName(item.category)}
                    </Text>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid>
          ))}
        </Grid.Container>
      </div>
    </div>
  );
}
