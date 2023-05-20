import axios from "axios";
import { useEffect } from "react";
import { State, useUser } from "./useUser";
import { shallow } from "zustand/shallow";

export default function useLoggedUser() {
  const { userId, setUser, isLoading, setIsLoading } = useUser(
    (state: State) => ({
      setUser: state.setUser,
      userId: state.userId,
      isLoading: state.isLoading,
      setIsLoading: state.setIsLoading,
    }),
    shallow
  );

  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/user/islogged").then((res) => {
      setUser(res.data.isLoggedIn, res.data.user.id, res.data.user.role);
    });
  }, [setUser, setIsLoading]);

  return { isLoading, userId };
}
