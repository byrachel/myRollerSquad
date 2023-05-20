import axios from "axios";
import { useEffect } from "react";
import { State, useUser } from "./useUser";
import { shallow } from "zustand/shallow";

export default function useLoggedUser() {
  const { userId, setUser } = useUser(
    (state: State) => ({
      setUser: state.setUser,
      userId: state.userId,
    }),
    shallow
  );

  console.log("hook isLoggedIn", userId);

  useEffect(() => {
    axios.get("/api/user/islogged").then((res) => {
      console.log("hook data", res.data);
      setUser(res.data.isLoggedIn, res.data.user.id, res.data.user.role);
    });
  }, [setUser]);

  return { userId };
}
