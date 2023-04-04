import { createContext, useReducer, useEffect } from "react";
import UserReducer from "../reducers/UserReducer";

interface UserStateInterface {
  user: {
    id: number;
    name?: string;
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

  useEffect(() => {
    if (localStorage.getItem("id")) {
      const id = JSON.parse(localStorage.getItem("id")!);
      const role = localStorage.getItem("role")
        ? JSON.parse(localStorage.getItem("role")!)
        : "USER";

      userDispatch({
        type: "LOGIN",
        payload: { id: parseInt(id), role },
      });
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
