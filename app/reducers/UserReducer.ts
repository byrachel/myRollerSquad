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
        user: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: {},
        // isLogged: false,
      };

    default:
      return state;
  }
};

export default UserReducer;
