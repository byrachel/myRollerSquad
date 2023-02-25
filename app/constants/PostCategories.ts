export const STORY = 1;
export const TUTORIAL = 2;
export const SALE = 3;
export const QUESTION = 4;
export const OTHER = 5;

export const getCategoryName = (category: number) => {
  switch (category) {
    case STORY:
      return "Story";
    case TUTORIAL:
      return "Tuto";
    case SALE:
      return "[re]vente";
    case QUESTION:
      return "Question";
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
    id: QUESTION,
    name: "Question",
  },
  {
    id: OTHER,
    name: "Autre",
  },
];
