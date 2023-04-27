export interface UserStateInterface {
  id: number | null;
  role: "USER" | "PRO" | "ADMIN";
  county: string | null;
  isLoggedIn: boolean;
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
      };
    default:
      return state;
  }
};

export default UserReducer;
