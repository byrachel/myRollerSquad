export const STORY = 1;
export const TUTORIAL = 2;
export const SALE = 3;
export const SPOT = 4;
export const OTHER = 5;

export const getCategoryName = (category: number) => {
  switch (category) {
    case STORY:
      return "Story";
    case TUTORIAL:
      return "Tuto";
    case SALE:
      return "[re]vente";
    case SPOT:
      return "Spot";
    default:
      return "Autre";
  }
};

export const flowCategories = [
  {
    id: STORY,
    name: "Story",
  },
  {
    id: TUTORIAL,
    name: "Tuto",
  },
  {
    id: SALE,
    name: "[re]vente",
  },
  {
    id: SPOT,
    name: "Spot",
  },
  {
    id: OTHER,
    name: "Autre",
  },
];
