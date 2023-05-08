export interface UserStateInterface {
  id: number | null;
  role: "USER" | "PRO" | "ADMIN";
  county: string | null;
  isLoggedIn: boolean;
  place: { id: number; name: string }[] | null;
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
        place: null,
        county: null,
      };
    default:
      return state;
  }
};

export default UserReducer;
