export const flowReducer = (
  state: any,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "SAVE_STYLE":
      return {
        ...state,
        style: action.payload,
      };
    case "SAVE_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };
    case "TITLE_ERROR":
      return {
        ...state,
        error: {
          status: true,
          message: "Veuillez préciser un titre de 4 à 50 caractères maximum.",
          input: "title",
        },
      };
    case "SAVE_PICTURES":
      return {
        ...state,
        pictures: action.payload,
      };
    case "DISPLAY_LOCATION":
      return {
        ...state,
        displayLocation: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
