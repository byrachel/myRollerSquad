export interface UserStateInterface {
  user: { id: number | null; role: "USER" | "PRO" | "ADMIN" };
  isLogged: boolean;
}

const UserReducer = (
  state: UserStateInterface,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isLogged: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: {},
        isLogged: false,
      };

    default:
      return state;
  }
};

export default UserReducer;
