export interface UserStateInterface {
  id: number | null;
  role: "USER" | "PRO" | "ADMIN";
  avatar: string | null;
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
        place: null,
        avatar: null,
      };
    default:
      return state;
  }
};

export default UserReducer;
