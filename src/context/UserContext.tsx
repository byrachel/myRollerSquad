import { createContext, useEffect, useReducer } from "react";
import UserReducer, { UserStateInterface } from "../reducers/UserReducer";

export const initialState: UserStateInterface = {
  id: null,
  role: "USER",
  county: null,
  isLoggedIn: false,
  businessCategory: null,
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = JSON.parse(localStorage.getItem("userId") as string);
      if (id) {
        userDispatch({
          type: "LOGIN",
          payload: {
            id,
            role: "USER",
            isLoggedIn: true,
            county: null,
            businessCategory: null,
          },
        });
      }
    }
  }, []);

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
