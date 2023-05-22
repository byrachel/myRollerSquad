export const cardColor = (categoryId: number) => {
  switch (categoryId) {
    case 1:
      return "green";
    case 2:
      return "pink";
    case 3:
      return "blue";
    case 4:
      return "purple";
    case 5:
      return "dark";
    default:
      return "grey";
  }
};
