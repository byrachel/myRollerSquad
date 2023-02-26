import { NewPostInterface } from "app/interfaces/flowInterfaces";

export const flowReducer = (
  state: NewPostInterface,
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
        pictures:
          state.pictures.length > 0
            ? [...state.pictures, ...action.payload]
            : action.payload,
      };
    case "DISPLAY_LOCATION":
      return {
        ...state,
        displayLocation: action.payload,
      };
    case "SAVE_POSITION":
      return {
        ...state,
        position: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
