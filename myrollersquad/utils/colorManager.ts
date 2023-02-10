export const cardColor = (categoryName: string) => {
  switch (categoryName) {
    case "annonce":
      return "green";
    case "story":
      return "pink";
    case "tuto":
      return "blue";
    case "vente":
      return "yellow";
    default:
      return "dark";
  }
};
