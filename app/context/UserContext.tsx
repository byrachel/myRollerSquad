import { createContext, useReducer } from "react";
import UserReducer from "./UserReducer";

export interface UserStateInterface {
  accessToken: string | null;
}

export const initialState: UserStateInterface = {
  accessToken: null,
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
