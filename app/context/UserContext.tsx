import { createContext, useReducer } from "react";
import UserReducer, { UserStateInterface } from "../reducers/UserReducer";

export const initialState: UserStateInterface = {
  user: {
    id: null,
    role: "USER",
  },
  isLogged: false,
};

export const UserContext = createContext<{
  userState: UserStateInterface;
  userDispatch: React.Dispatch<any>;
}>({
  userState: initialState,
  userDispatch: () => null,
});

export const UserContextProvider = ({ children }: { children: any }) => {
  const [userState, userDispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider
      value={{
        userState,
        userDispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserContextConsumer = UserContext.Consumer;
