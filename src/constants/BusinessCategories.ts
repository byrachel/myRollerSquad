export const LEARN = 1;
export const BUY = 2;
export const PLAY = 3;
// export const OTHER = 4;

export const businessCategories = [
  {
    id: LEARN,
    value: "LEARN",
    name: "S'entraîner",
  },
  {
    id: BUY,
    value: "BUY",
    name: "S'équiper",
  },
  {
    id: PLAY,
    value: "PLAY",
    name: "S'amuser",
  },
  // {
  //   id: OTHER,
  //   value: "OTHER",
  //   name: "Autre",
  // },
];

export const businessCategory = (value: string) => {
  switch (value) {
    case "LEARN":
      return {
        id: LEARN,
        value: "LEARN",
        name: "S'entraîner",
      };
    case "BUY":
      return {
        id: BUY,
        value: "BUY",
        name: "S'équiper",
      };
    default:
      return {
        id: PLAY,
        value: "PLAY",
        name: "S'amuser",
      };
    // default:
    //   return {
    //     id: OTHER,
    //     value: "OTHER",
    //     name: "Autre",
    //   };
  }
};
