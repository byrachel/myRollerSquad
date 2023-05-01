import { UserInterface } from "src/interfaces/userInterfaces";

export interface UserProfileInterface {
  user: UserInterface;
  loading: boolean;
  error: boolean;
  updateProfile: boolean;
}

const UserProfileReducer = (
  state: UserProfileInterface,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SET_USER":
      return {
        ...state,
        loading: false,
        error: false,
        user: {
          ...action.payload,
          place:
            action.payload.place.length > 0
              ? action.payload.place.map((elt: { id: number }) => elt.id)
              : [],
        },
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "HIDE_ERROR":
      return {
        ...state,
        error: false,
      };
    case "UPDATE_USER_PROFILE":
      return {
        ...state,
        updateProfile: action.payload,
      };
    case "SAVE_CONTENT":
      return {
        ...state,
        user: { ...state.user, resume: action.payload },
      };
    case "UPDATE_USER_ROLLER_SKATE_LEVEL":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    case "USER_PROFILE_UPDATED":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        updateProfile: false,
      };

    // case "ADD_TO_MY_FAV":
    //   return {
    //     ...state,

    //     places: {
    //       ...state.places,
    //       places: state.places.map((place: any) => {
    //         if (place.id === action.payload.id) {
    //           return {
    //             ...place,
    //             favorites: action.payload.favorites,
    //           };
    //         }
    //         return place;
    //       }),
    //     },
    //   };

    default:
      return state;
  }
};

export default UserProfileReducer;
