export const PostReducer = (
  state: any,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "SAVE_STYLE":
      return {
        ...state,
        style: state.style.includes(action.payload)
          ? state.style.filter((elt: number) => elt !== action.payload)
          : [...state.style, action.payload],
      };
    case "SAVE_MAP":
      return {
        ...state,
        map: action.payload,
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

    case "PICTURES_LENGTH_ERROR":
      return {
        ...state,
        error: {
          status: true,
          message: "Oups ! Garde seulement les meilleures photos, 5 maximum !",
          input: "pictures",
        },
      };
    case "SAVE_LOCATION":
      return {
        ...state,
        country: action.payload.country,
        county: action.payload.county,
        city: action.payload.city,
      };
    case "SAVE_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };

    case "SAVE_PICTURES":
      return {
        ...state,
        pictures:
          state.pictures.length > 0
            ? [...state.pictures, ...action.payload]
            : action.payload,
      };
    case "SAVE_ONLY_THIS_PICTURES":
      return {
        ...state,
        pictures: action.payload,
      };
    case "SAVE_ONLY_THIS_INITIAL_PICTURES":
      return {
        ...state,
        initialPictures: action.payload,
      };
    case "DISPLAY_LOCATION":
      return {
        ...state,
        displayLocation: action.payload,
      };

    case "SAVE_CONTENT":
      return {
        ...state,
        content: action.payload,
      };

    case "LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "ERROR":
      return {
        ...state,
        loading: false,
        error: {
          status: true,
          message: action.payload,
        },
      };

    case "HIDE_ERROR":
      return {
        ...state,
        loading: false,
        error: {
          status: false,
          message: null,
          input: "",
        },
      };

    default:
      return {
        ...state,
      };
  }
};
