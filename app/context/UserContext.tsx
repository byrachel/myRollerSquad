import { createContext, useReducer } from "react";
import UserReducer from "../reducers/UserReducer";

interface UserStateInterface {
  user: {
    id: number;
    name: string;
    role: "ADMIN" | "USER" | "PRO";
  } | null;
}

export const initialState: UserStateInterface = {
  user: null,
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
