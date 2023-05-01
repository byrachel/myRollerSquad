export interface UserStateInterface {
  id: number | null;
  role: "USER" | "PRO" | "ADMIN";
  county: string | null;
  isLoggedIn: boolean;
  businessCategory: string | null;
}

const UserReducer = (
  state: UserStateInterface,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return {
        id: null,
        role: "USER",
        isLoggedIn: false,
        county: null,
        businessCategory: null,
      };
    case "SELECT_DEPT":
      return {
        ...state,
        county: action.payload,
      };
    case "SELECT_BUSINESS_CATEGORY":
      return {
        ...state,
        businessCategory: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
