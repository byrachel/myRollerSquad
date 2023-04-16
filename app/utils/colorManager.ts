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
    default:
      return "dark";
  }
};
