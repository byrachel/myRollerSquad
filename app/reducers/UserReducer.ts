interface UserStateInterface {
  user: any;
  // isLogged: boolean;
}

const UserReducer = (
  state: UserStateInterface,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
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
