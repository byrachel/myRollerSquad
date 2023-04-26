export const FREESTYLE = 1;
export const SKATEPARK = 2;
export const ARTISTIC = 3;
export const DERBY = 4;
export const STREET = 5;
export const DANCE = 6;
export const RINK = 7;
export const OTHER = 8;

export const getStyleName = (style: number) => {
  switch (style) {
    case FREESTYLE:
      return "Freestyle";
    case SKATEPARK:
      return "Skatepark";
    case ARTISTIC:
      return "Artistique";
    case DERBY:
      return "Derby";
    case STREET:
      return "Randonnée";
    case DANCE:
      return "Roller Dance";
    case RINK:
      return "Rink";
    default:
      return "Autre";
  }
};

export const rollerSkateStyles = [
  {
    id: FREESTYLE,
    name: "Freestyle",
  },
  {
    id: SKATEPARK,
    name: "Skatepark",
  },
  {
    id: ARTISTIC,
    name: "Artistique",
  },
  {
    id: DERBY,
    name: "Roller Derby",
  },
  {
    id: STREET,
    name: "Randonnée",
  },
  {
    id: DANCE,
    name: "Roller Dance",
  },
  {
    id: RINK,
    name: "Rink",
  },
  {
    id: OTHER,
    name: "Autre",
  },
];
