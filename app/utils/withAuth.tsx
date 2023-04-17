import { UserContext } from "app/context/UserContext";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const withAuth = (Component: any) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const { userState, userDispatch } = useContext(UserContext);
    console.log(userState);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        axios(`/api/user/islogged`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
          .then(res => {
            const token = res.headers["authorization"];
            if (token) {
              localStorage.setItem("token", token);
              userDispatch({
                type: "LOGIN",
                payload: { id: res.data.user.id, role: res.data.user.role },
              });
            } else {
              router.push("/signin");
            }
          })
          .catch(() => router.push("/signin"));
      } else {
        router.push("/signin");
      }
      // eslint-disable-next-line
    }, []);

    return userState.isLogged ? <Component /> : <div className="loader" />;
  };

  return AuthenticatedComponent;
};
export default withAuth;
