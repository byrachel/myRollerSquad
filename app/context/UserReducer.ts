import { UserStateInterface } from "./UserContext";

const UserReducer = (
  state: UserStateInterface,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
      };

    case "LOGOUT":
      return {
        ...state,
        // isLogged: false,
      };

    default:
      return state;
  }
};

export default UserReducer;
